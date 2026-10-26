/* The guided tour the camera takes through the card. All durations are seconds of
   video time; tweak these numbers to re-pace the film. */

export const PACE = {
  openingHold: 5,        // letter screen with the looping clip before the "tap"
  heroHold: 5.5,         // after the aisle clip hands over to the site
  scrollSeconds: 1.8,    // one scroll move (to a section or to its next page)
  sectionHold: 4,        // pause at the top of each section
  pageHold: 3.2,         // pause on each further page of a tall section
  swipeSeconds: 0.9,     // one carousel swipe
  slideHold: 4.5,        // pause on each event slide (covers the ZOOM_SECONDS settle)
  venueHold: 6,          // pause on each screen of venue cards
  closingHold: 5,        // final shot
};

/* The live card settles each event artwork over 8s; the film plays the same zoom faster. */
export const ZOOM_SECONDS = 4;

/* Fades the music out over the last N seconds of the film. */
export const MUSIC_FADE_OUT = 2;

/* Film-only clip lengths (first N seconds kept); the live card plays the full clips. */
export const CLIP_SECONDS = { 'Couple_walking_down_wedding_aisle.mp4': 7 };

/* Minimum gap (px) between a held screen's top/bottom edge and any protected span. */
const CUT_MARGIN = 6;

/* Cards a held screen must show whole or not at all. */
export const PROTECTED_BLOCKS = [
  '#venue ol > li',
  '#venue .grid-cols-4',
  '#rsvp aside',
  '#closing .rounded-\\[2rem\\]',
];

/* Film-only asset served by render.mjs from video-render/assets/. */
export const VIDEO_ASSET_PREFIX = '/__video/';

export const SECTION_ORDER = ['details', 'venue', 'gallery', 'rsvp', 'closing'];
export const CAROUSEL_SCROLLER = 'section[aria-roledescription="carousel"] > div:first-child';
export const ENTER_BUTTON = 'button[aria-label="Click to Enter"]';

/* Film-only styling: hides controls that mean nothing in a video. The app itself is untouched. */
export const VIDEO_CSS = `
nextjs-portal { display: none !important; }
${ENTER_BUTTON} { visibility: hidden !important; }
.fixed.bottom-6.left-4,
button[aria-label="Switch to English"], button[aria-label="हिंदी में बदलें"] { display: none !important; }
#hero button:not([aria-pressed]) { display: none !important; }
#couple { display: none !important; }
img[src*="swipe-hand"],
section[aria-roledescription="carousel"] > div > button { display: none !important; }
section[aria-roledescription="carousel"] [aria-roledescription="slide"] > img { transition-duration: ${ZOOM_SECONDS * 1000}ms !important; }
#venue a[target="_blank"] { display: none !important; }
#rsvp form,
#rsvp aside > p:first-child,
#rsvp aside a[href^="tel:"] { display: none !important; }
#rsvp aside > h3 { margin-top: 0 !important; }
/* Venue in two screens: heading + first two cards, then wedding card + countdown. */
#venue .text-center > div.mt-6,
#venue .max-w-3xl .my-5 { display: none !important; }
#venue .max-w-3xl .my-5 + p { margin-top: 12px !important; }
#venue .py-10 { padding-top: 25px !important; padding-bottom: 12px !important; }
#venue .mb-12 { margin-bottom: 24px !important; }
#venue ol { row-gap: 40px !important; }
#venue .py-8 { padding-top: 12px !important; }
/* Hindi cards are shorter, so the wedding card would peek in; push it fully below the first screen. */
html[lang="hi"] #venue ol { row-gap: 64px !important; }
`;

/* Film-only copy edits, run once the site has mounted. */
export function editCopy() {
  // "Where each celebration takes place — tap a venue to open directions" -> drop the tap hint (en + hi).
  for (const p of document.querySelectorAll('#venue p')) {
    const text = p.textContent ?? '';
    if (/\btap\b|टैप/i.test(text) && text.includes(' — ')) p.textContent = text.split(' — ')[0];
  }

  // Google Maps QR (user-supplied image) where the wedding card's "View on Map" button was.
  const hindi = document.documentElement.lang.startsWith('hi');
  const caption = hindi ? 'दिशा-निर्देश के लिए स्कैन करें' : 'Scan for directions';
  // Letter-spacing splits Devanagari conjuncts apart.
  const captionStyle = hindi ? 'font-size:13px;letter-spacing:normal' : 'font-size:11px;letter-spacing:.26em;text-transform:uppercase';
  const card = document.querySelector('#venue img[src*="/events/wedding-thumb"]')?.closest('li');
  if (card && !card.querySelector('[data-video-qr]')) {
    const box = document.createElement('div');
    box.dataset.videoQr = '';
    box.style.cssText = 'margin-top:24px;display:flex;flex-direction:column;align-items:center;gap:10px';
    box.innerHTML = '<img src="/__video/wedding-venue-qr.png" alt="" width="140" height="140" style="display:block;width:140px;height:140px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px rgba(176,138,58,.35)">'
      + `<p style="margin:0;font-weight:600;color:#8b1e1e;${captionStyle}">${caption}</p>`;
    card.appendChild(box);
  }
}

const cuts = (edge, lines) => lines.some(([t, b]) => t - CUT_MARGIN < edge && b + CUT_MARGIN > edge);
const isClean = (y, vh, lines) => !cuts(y, lines) && !cuts(y + vh, lines);

/* Integer scroll position in [lo, hi] closest to `target` whose top and bottom edges cross no protected span. */
function cleanNear(target, lo, hi, vh, lines) {
  for (let d = 0; d <= Math.max(target - lo, hi - target); d++) {
    for (const y of [target - d, target + d]) if (y >= lo && y <= hi && isClean(y, vh, lines)) return y;
  }
  return null;
}

/* Held screens for one section: start at its top, then page on from the first span not yet fully shown,
   nudging every stop so no text line or protected card is cut by the screen edges. */
export function planScreens(section, vh, maxY, lines, warn) {
  const end = section.top + section.height;
  const own = lines.filter(([t, b]) => t >= section.top - 1 && b <= end + 1);
  if (!own.length) return [section.top];
  const last = Math.max(...own.map(([, b]) => b));
  const pick = (target, lo, hi) => {
    lo = Math.round(Math.max(0, lo));
    hi = Math.round(Math.min(maxY, hi));
    if (lo > hi) return null;
    const y = cleanNear(Math.min(hi, Math.max(lo, Math.round(target))), lo, hi, vh, lines);
    if (y === null) warn(`no text-safe stop near y=${Math.round(target)} in #${section.id}`);
    return y ?? Math.min(hi, Math.max(lo, Math.round(target)));
  };
  const screens = [pick(section.top, section.top - vh * 0.4, own[0][0] - CUT_MARGIN) ?? section.top];
  for (let y = screens[0]; last > y + vh - CUT_MARGIN && screens.length < 10;) {
    const nextHidden = Math.min(...own.filter(([, b]) => b > y + vh - CUT_MARGIN).map(([t]) => t));
    const next = pick(Math.min(nextHidden - 24, end - vh), y + 1, nextHidden - CUT_MARGIN);
    if (next === null) break;
    screens.push(y = next);
  }
  return screens;
}

export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Runs the tour using the renderer's helpers (see render.mjs for the `cam` API). */
export async function storyboard(cam) {
  cam.mark('opening');
  await cam.hold(PACE.openingHold);

  cam.mark('tap-enter');
  await cam.tap(ENTER_BUTTON);
  // The aisle clip ends on its own (virtual clock) and the site mounts.
  await cam.waitUntil(() => !!document.getElementById('hero'), 30);
  await cam.run(editCopy);
  cam.mark('hero');
  await cam.hold(PACE.heroHold);

  const layout = await cam.measure();
  const vh = layout.viewport;
  for (const section of layout.sections) {
    if (!SECTION_ORDER.includes(section.id)) continue;
    const pageHold = section.id === 'venue' ? PACE.venueHold : PACE.pageHold;
    const firstHold = { details: PACE.slideHold, venue: PACE.venueHold, closing: PACE.closingHold }[section.id] ?? PACE.sectionHold;
    // The carousel is exactly one screen tall; every other section gets text-safe stops.
    const screens = section.id === 'details' ? [section.top] : planScreens(section, vh, layout.docHeight - vh, layout.spans, cam.log);
    cam.mark(section.id);
    await cam.scrollTo(screens[0], PACE.scrollSeconds);
    await cam.hold(firstHold);

    if (section.id === 'details' && layout.carousel) {
      for (let i = 1; i < layout.carousel.slides; i++) {
        cam.mark(`details-slide-${i + 1}`);
        await cam.swipeTo(i, layout.carousel.width, PACE.swipeSeconds);
        await cam.hold(PACE.slideHold);
      }
      continue;
    }

    for (const [i, y] of screens.slice(1).entries()) {
      cam.mark(`${section.id}-page-${i + 2}`);
      await cam.scrollTo(y, PACE.scrollSeconds);
      await cam.hold(pageHold);
    }
  }
  cam.mark('end');
}
