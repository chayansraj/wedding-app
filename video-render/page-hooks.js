/* Injected before any app script. Media elements never really play: play()/pause()
   only record a virtual start time, and the renderer seeks every <video> to its
   virtual position once per frame, so clips advance in lock-step with the
   deterministic frame clock instead of wall-clock time. */
(() => {
  const proto = HTMLMediaElement.prototype;
  const nativePause = proto.pause;
  const nativePaused = Object.getOwnPropertyDescriptor(proto, 'paused').get;
  const state = new WeakMap();
  const now = () => performance.now();
  const get = (el) => {
    let s = state.get(el);
    if (!s) {
      s = { seen: false, playing: false, startVt: 0, offset: 0, lastAudioSeek: -1 };
      state.set(el, s);
    }
    return s;
  };
  const fire = (el, type) => el.dispatchEvent(new Event(type));

  proto.play = function () {
    const s = get(this);
    if (!s.playing) {
      s.playing = true;
      s.startVt = now();
      s.offset = this.currentTime;
      fire(this, 'play');
      fire(this, 'playing');
    }
    return Promise.resolve();
  };
  proto.pause = function () {
    const s = get(this);
    if (s.playing) {
      s.playing = false;
      s.offset = this.currentTime;
      fire(this, 'pause');
    }
  };
  Object.defineProperty(proto, 'paused', { configurable: true, get() { return !get(this).playing; } });

  const position = (el, s) => s.offset + (now() - s.startVt) / 1000;

  window.__vt = {
    /* Called once per frame after virtual time has advanced. */
    tick(cmd) {
      if (cmd && typeof cmd.scrollY === 'number') window.scrollTo(0, cmd.scrollY);
      if (cmd && cmd.swipe) {
        const el = document.querySelector(cmd.swipe.selector);
        if (el) {
          el.style.scrollSnapType = cmd.swipe.done ? '' : 'none';
          el.scrollLeft = cmd.swipe.left;
        }
      }
      for (const el of document.querySelectorAll('video, audio')) {
        const s = get(el);
        if (!s.seen) {
          s.seen = true;
          if (el.autoplay) proto.play.call(el);
        }
        // Chromium starts muted autoplay natively; keep the real pipeline parked.
        if (!nativePaused.call(el)) nativePause.call(el);
        if (!s.playing || !(el.readyState >= 1) || !Number.isFinite(el.duration)) continue;
        let pos = position(el, s);
        if (pos >= el.duration) {
          if (el.loop) {
            pos %= el.duration;
          } else {
            s.playing = false;
            el.currentTime = el.duration;
            fire(el, 'pause');
            fire(el, 'ended');
            continue;
          }
        }
        if (el instanceof HTMLVideoElement) {
          el.currentTime = pos;
        } else if (pos - s.lastAudioSeek >= 1) {
          s.lastAudioSeek = pos;
          el.currentTime = pos;
        }
      }
    },
    seeking() {
      for (const v of document.querySelectorAll('video')) if (v.seeking && v.readyState >= 1) return true;
      return false;
    },
    measure(sectionIds, carouselSelector, blocks) {
      const sections = sectionIds.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { id, top: Math.round(r.top + window.scrollY), height: Math.round(r.height) };
      }).filter(Boolean);
      const scroller = document.querySelector(carouselSelector);
      return {
        viewport: window.innerHeight,
        docHeight: document.documentElement.scrollHeight,
        sections,
        carousel: scroller ? { width: scroller.clientWidth, slides: scroller.querySelectorAll('[aria-roledescription="slide"]').length } : null,
        spans: protectedSpans(sectionIds, blocks),
      };
    },
  };

  /* Clearance (px) kept between a card's outer edge and a screen edge, so no card looks clipped. */
  const EDGE_CLEARANCE = 12;

  /* [top, bottom] (document px) ranges a screen edge must not cross: every rendered line of text and
     every protected card (plus clearance), so a card is either fully on screen or fully off it.
     Sections below the fold still sit at their entrance offsets (motion y/scale), so their transforms
     are neutralised while measuring (not the carousel: its artwork zoom is a CSS transition). */
  function protectedSpans(sectionIds, blocks) {
    const neutral = document.createElement('style');
    neutral.textContent = sectionIds.map((id) => `#${id} *:not([aria-roledescription="carousel"] *)`).join(',') + '{transform:none!important}';
    document.head.appendChild(neutral);
    const range = document.createRange();
    const docY = (r) => [Math.round(r.top + window.scrollY), Math.round(r.bottom + window.scrollY)];
    const spans = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!n.textContent.trim() || !n.parentElement?.checkVisibility({ visibilityProperty: true })) continue;
      range.selectNodeContents(n);
      for (const r of range.getClientRects()) if (r.width > 2 && r.height > 2) spans.push(docY(r));
    }
    for (const selector of blocks) {
      for (const el of document.querySelectorAll(selector)) {
        if (!el.checkVisibility({ visibilityProperty: true })) continue;
        const [top, bottom] = docY(el.getBoundingClientRect());
        spans.push([top - EDGE_CLEARANCE, bottom + EDGE_CLEARANCE]);
      }
    }
    neutral.remove();
    return spans.sort((a, b) => a[0] - b[0]);
  }
})();
