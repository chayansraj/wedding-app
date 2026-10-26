/* Renders the wedding card into an MP4, frame by frame, with a deterministic clock.

   Usage (from the repo root, dev server already running):
     node video-render/render.mjs [--lang en|hi] [--url http://localhost:3000] [--out video-render/out/wedding-card-<lang>.mp4]
                                  [--fps 30] [--width 1080] [--png] [--silent] [--seconds N]

   --lang L      card language, set through the app's `i18next` cookie (default en)
   --seconds N   stop after N seconds of video (quick preview)
   --png         capture lossless PNG frames instead of JPEG q95 (about 7x slower, barely visible after x264)
   --silent      skip the soundtrack (by default: the wedding song from the first frame, faded out at the end)

   How it works: Chromium's headless shell is started with begin-frame control, so the
   compositor only draws when we ask for a frame, and CDP virtual time advances exactly
   1/fps per frame — rAF, CSS/WAAPI animations, timers and scroll effects all move in
   lock-step. <video> clips are swapped for all-intra re-encodes (cache/) and seeked to
   their virtual position each frame. Frames are piped straight into ffmpeg.

   One-time setup: node node_modules/playwright/cli.js install chromium  (add --use-system-ca behind a corporate proxy) */
import { createRequire } from 'node:module';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { once } from 'node:events';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storyboard, CAROUSEL_SCROLLER, CLIP_SECONDS, MUSIC_FADE_OUT, PROTECTED_BLOCKS, SECTION_ORDER, VIDEO_ASSET_PREFIX, VIDEO_CSS, easeInOutCubic } from './storyboard.mjs';

const require = createRequire(new URL('../package.json', import.meta.url));
const { chromium, devices } = require('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const args = parseArgs(process.argv.slice(2));
const URL_ = args.url ?? 'http://localhost:3000';
const LANG = args.lang ?? 'en';
const FPS = Number(args.fps ?? 30);
const WIDTH = Number(args.width ?? 1080);
const OUT = path.resolve(repoRoot, args.out ?? `video-render/out/wedding-card-${LANG}.mp4`);
const MAX_SECONDS = args.seconds ? Number(args.seconds) : Infinity;
const FORMAT = args.png ? { format: 'png' } : { format: 'jpeg', quality: 95 };
const SONG = path.join(repoRoot, 'public/assets/audio/wedding-song.mp3');
const CSS_WIDTH = 390;
const CSS_HEIGHT = 844;
const DT = 1000 / FPS;
const SEEK_RETRY_MS = 0.01;

const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) out[key] = true;
    else { out[key] = next; i++; }
  }
  return out;
}

/* All-intra re-encode so every frame is a keyframe and per-frame seeks are instant.
   Clips listed in CLIP_SECONDS are also cut to that length (film only). */
function intraVersion(publicRelPath) {
  const src = path.join(repoRoot, 'public', publicRelPath);
  if (!existsSync(src)) return null;
  const cacheDir = path.join(here, 'cache');
  mkdirSync(cacheDir, { recursive: true });
  const name = path.basename(publicRelPath);
  const seconds = CLIP_SECONDS[name];
  const dst = path.join(cacheDir, seconds ? name.replace(/\.mp4$/i, `-${seconds}s.mp4`) : name);
  if (!existsSync(dst) || statSync(dst).mtimeMs < statSync(src).mtimeMs) {
    log(`transcoding ${publicRelPath} -> cache (all-intra${seconds ? `, first ${seconds}s` : ''})`);
    const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-i', src, ...(seconds ? ['-t', String(seconds)] : []), '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '16', '-g', '1', '-keyint_min', '1', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dst], { stdio: 'inherit' });
    if (r.status !== 0) throw new Error(`ffmpeg transcode failed for ${publicRelPath}`);
  }
  return readFileSync(dst);
}

function fulfillWithRanges(route, body, contentType) {
  const range = route.request().headers()['range'];
  const m = range && /bytes=(\d+)-(\d*)/.exec(range);
  const headers = { 'Accept-Ranges': 'bytes' };
  if (!m) return route.fulfill({ status: 200, body, contentType, headers: { ...headers, 'Content-Length': String(body.length) } });
  const start = Number(m[1]);
  const end = m[2] ? Math.min(Number(m[2]), body.length - 1) : body.length - 1;
  return route.fulfill({ status: 206, body: body.subarray(start, end + 1), contentType, headers: { ...headers, 'Content-Range': `bytes ${start}-${end}/${body.length}`, 'Content-Length': String(end - start + 1) } });
}

/* The wedding song (looping) under the whole film, faded out at the end. */
function muxSoundtrack(videoPath, seconds) {
  const fade = Math.min(MUSIC_FADE_OUT, seconds);
  const graph = `[1:a]atrim=0:${seconds},asetpts=PTS-STARTPTS,aresample=48000,afade=t=out:st=${seconds - fade}:d=${fade}[a]`;
  const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-i', videoPath, '-stream_loop', '-1', '-i', SONG, '-filter_complex', graph, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', OUT], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('ffmpeg soundtrack mux failed');
}

function startFfmpeg(target) {
  mkdirSync(path.dirname(OUT), { recursive: true });
  const ff = ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0'];
  ff.push('-vf', 'crop=trunc(iw/2)*2:trunc(ih/2)*2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', target);
  const proc = spawn('ffmpeg', ff, { stdio: ['pipe', 'ignore', 'pipe'] });
  let stderr = '';
  proc.stderr.on('data', (d) => { stderr += d; });
  proc.stdin.on('error', () => undefined);
  return { proc, stderr: () => stderr };
}

async function main() {
  const videoBodies = new Map();
  const timeline = [];
  const t0 = Date.now();

  const browser = await chromium.launch({
    headless: true,
    // --force-device-scale-factor makes beginFrame screenshots come out in device pixels (1080 wide).
    args: ['--enable-begin-frame-control', '--run-all-compositor-stages-before-draw', '--disable-new-content-rendering-timeout', '--disable-threaded-animation', '--disable-threaded-scrolling', '--disable-checker-imaging', '--disable-image-animation-resync', '--autoplay-policy=no-user-gesture-required', `--force-device-scale-factor=${WIDTH / CSS_WIDTH}`],
  });
  const context = await browser.newContext({
    ...devices['iPhone 13 Pro'],
    viewport: { width: CSS_WIDTH, height: CSS_HEIGHT },
    deviceScaleFactor: WIDTH / CSS_WIDTH,
    locale: 'en-US',
    timezoneId: 'Asia/Kolkata',
  });
  await context.addInitScript({ path: path.join(here, 'page-hooks.js') });
  await context.addCookies([{ name: 'i18next', value: LANG, url: URL_ }]);
  const page = await context.newPage();
  page.on('pageerror', (e) => log('page error:', e.message));

  await page.route('**/assets/videos/*.mp4', (route) => {
    const rel = new URL(route.request().url()).pathname.replace(/^\//, '');
    if (!videoBodies.has(rel)) videoBodies.set(rel, intraVersion(decodeURIComponent(rel)));
    const body = videoBodies.get(rel);
    return body ? fulfillWithRanges(route, body, 'video/mp4') : route.continue();
  });
  await page.route(`**${VIDEO_ASSET_PREFIX}*`, (route) => {
    const file = path.join(here, 'assets', path.basename(new URL(route.request().url()).pathname));
    return existsSync(file) ? route.fulfill({ path: file }) : route.fulfill({ status: 404 });
  });

  const cdp = await context.newCDPSession(page);
  await cdp.send('HeadlessExperimental.enable');

  // ---- frame clock -------------------------------------------------------
  let virtualMs = 0;
  let ticksBase = 0;
  let frames = 0;
  let lastShot = null;
  const videoOnly = args.silent ? OUT : OUT.replace(/\.mp4$/i, '') + '.video-only.mp4';
  const { proc: ffmpeg, stderr: ffmpegErrors } = startFfmpeg(videoOnly);
  const ffmpegExit = once(ffmpeg, 'close');

  const beginFrame = (screenshot) => cdp.send('HeadlessExperimental.beginFrame', {
    frameTimeTicks: ticksBase ? ticksBase + virtualMs : undefined,
    interval: DT,
    noDisplayUpdates: false,
    screenshot,
  });

  /* Real-time pump: before the virtual clock starts, the page still needs frames to lay out and hydrate. */
  const pumpUntil = async (fn, timeoutMs) => {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      await beginFrame(undefined);
      if (await page.evaluate(fn)) return;
      await sleep(16);
    }
    throw new Error('timed out waiting for page state');
  };

  const advance = async (ms) => {
    const expired = new Promise((r) => cdp.once('Emulation.virtualTimeBudgetExpired', r));
    await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'pauseIfNetworkFetchesPending', budget: ms, maxVirtualTimeTaskStarvationCount: 100000 });
    const won = await Promise.race([expired.then(() => true), sleep(15000).then(() => false)]);
    if (!won) {
      log('warning: a network fetch kept virtual time paused for 15s; forcing time forward');
      const forced = new Promise((r) => cdp.once('Emulation.virtualTimeBudgetExpired', r));
      await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'advance', budget: ms, maxVirtualTimeTaskStarvationCount: 100000 });
      await forced;
    }
    virtualMs += ms;
  };

  const writeFrame = async (buf) => {
    if (!ffmpeg.stdin.write(buf)) await once(ffmpeg.stdin, 'drain');
  };

  let stopped = false;
  const renderFrame = async (cmd) => {
    if (stopped) return;
    await advance(DT);
    await page.evaluate((c) => window.__vt.tick(c), cmd ?? null);
    for (let k = 0; k < 80 && (await page.evaluate(() => window.__vt.seeking())); k++) {
      await sleep(5);
      await advance(SEEK_RETRY_MS);
    }
    let res = await beginFrame(FORMAT);
    // The very first frame can come back without damage (no screenshot); ask again.
    for (let k = 0; k < 5 && !res.screenshotData && !lastShot; k++) res = await beginFrame(FORMAT);
    if (res.screenshotData) lastShot = Buffer.from(res.screenshotData, 'base64');
    if (!lastShot) throw new Error('no frame captured');
    await writeFrame(lastShot);
    frames++;
    if (frames % FPS === 0) {
      const real = (Date.now() - t0) / 1000;
      log(`t=${(virtualMs / 1000).toFixed(1)}s  frames=${frames}  real=${real.toFixed(0)}s  (${(frames / real).toFixed(1)} fps)`);
    }
    if (virtualMs / 1000 >= MAX_SECONDS) stopped = true;
  };

  // ---- camera API used by the storyboard --------------------------------
  const framesFor = (seconds) => Math.max(1, Math.round(seconds * FPS));
  let scrollY = 0;
  const cam = {
    mark: (label) => { timeline.push({ t: +(virtualMs / 1000).toFixed(3), label }); log(`>> ${label}`); },
    log: (msg) => log(`warning: ${msg}`),
    hold: async (seconds) => { for (let i = 0; i < framesFor(seconds) && !stopped; i++) await renderFrame({ scrollY }); },
    tap: async (selector) => { await page.evaluate((s) => { const el = document.querySelector(s); if (!el) throw new Error(`tap: ${s} not found`); el.click(); }, selector); },
    run: (fn) => page.evaluate(fn),
    waitUntil: async (fn, maxSeconds) => {
      for (let i = 0; i < framesFor(maxSeconds) && !stopped; i++) {
        await renderFrame({ scrollY });
        if (await page.evaluate(fn)) return;
      }
      if (!stopped) log('warning: waitUntil condition not met in time');
    },
    measure: () => page.evaluate(([ids, sel, blocks]) => window.__vt.measure(ids, sel, blocks), [SECTION_ORDER, CAROUSEL_SCROLLER, PROTECTED_BLOCKS]),
    scrollTo: async (y, seconds) => {
      const from = scrollY;
      const n = framesFor(seconds);
      for (let i = 1; i <= n && !stopped; i++) {
        scrollY = Math.round(from + (y - from) * easeInOutCubic(i / n));
        await renderFrame({ scrollY });
      }
    },
    swipeTo: async (index, slideWidth, seconds) => {
      const target = index * slideWidth;
      const from = (index - 1) * slideWidth;
      const n = framesFor(seconds);
      for (let i = 1; i <= n && !stopped; i++) {
        const left = Math.round(from + (target - from) * easeInOutCubic(i / n));
        await renderFrame({ scrollY, swipe: { selector: CAROUSEL_SCROLLER, left, done: i === n } });
      }
    },
  };

  // ---- go ------------------------------------------------------------------
  log(`loading ${URL_}`);
  await page.goto(URL_, { waitUntil: 'load' });
  await page.addStyleTag({ content: VIDEO_CSS });
  await pumpUntil(() => !!document.querySelector('button[aria-label="Click to Enter"]') && Array.from(document.querySelectorAll('video')).some((v) => v.readyState >= 2), 60000);
  await sleep(500);
  ({ virtualTimeTicksBase: ticksBase } = await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'pause' }));
  log(`virtual clock started; ${FPS} fps, ${Math.round(CSS_WIDTH * WIDTH / CSS_WIDTH)}x${Math.round(CSS_HEIGHT * WIDTH / CSS_WIDTH)}, ${FORMAT.format}`);

  let failure = null;
  try {
    await storyboard(cam);
  } catch (e) {
    failure = e;
  } finally {
    ffmpeg.stdin.end();
    const [code] = await ffmpegExit;
    await browser.close();
    if (failure) throw failure;
    if (code !== 0) throw new Error(`ffmpeg exited with ${code}: ${ffmpegErrors()}`);
    if (!args.silent) {
      log('muxing soundtrack');
      muxSoundtrack(videoOnly, virtualMs / 1000);
      unlinkSync(videoOnly);
    }
    writeFileSync(OUT.replace(/\.mp4$/i, '') + '.timeline.json', JSON.stringify({ fps: FPS, seconds: virtualMs / 1000, marks: timeline }, null, 2));
    log(`done: ${frames} frames, ${(virtualMs / 1000).toFixed(1)}s of video in ${((Date.now() - t0) / 1000).toFixed(0)}s -> ${OUT}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
