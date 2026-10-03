'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { WEDDING_EVENTS as EVENTS, eventArt as ART } from '@/constants/events';
import { EventDate } from '@/components/event-date';

const COUNT = EVENTS.length;
const pad = (n: number) => String(n).padStart(2, '0');
/* Swipe hint: shown on arrival for HINT_MS, hidden by any swipe, and shown again
   whenever the guest rests on one slide for IDLE_MS. */
const HINT_MS = 5200;
const IDLE_MS = 15000;
/* Artwork settle: each slide starts enlarged by ZOOM_FROM and eases to 1:1 over ZOOM_MS. */
const ZOOM_FROM = 1.40;
const ZOOM_MS = 8000;
/* Where the swipe hand sits inside the visible screen (CSS top/left, percent of width/height). */
const HAND_POSITION = { top: '52%', left: '50%' };
/* Peak opacity of the swipe hand (0–1); lower = fainter. */
const HAND_OPACITY = 0.55;
/* Gap between the bottom of the visible screen and the event text block (px).
   Raise it if the fixed music / language buttons overlap the text. */
const TEXT_BOTTOM_PX = 118;
/* Per-artwork horizontal framing (CSS object-position x). 50% = centred; higher %
   slides the picture LEFT (shows more of its right side), lower % slides it right. */
const ART_X: Partial<Record<(typeof EVENTS)[number]['key'], string>> = { 'matra-pujan': '100%' };

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

/* A finger dragging across the screen; `dir` is the direction the hand travels
   (-1 = drag left to reveal the next event, +1 = drag right for the previous). */
const SwipeHand = ({ dir }: { dir: -1 | 1 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.45 }}
    style={HAND_POSITION}
    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
    aria-hidden="true"
  >
    <motion.div
      animate={{ x: [34 * -dir, 34 * dir, 34 * dir, 34 * -dir], opacity: [0, HAND_OPACITY, HAND_OPACITY, 0] }}
      transition={{ duration: 2.1, times: [0, 0.45, 0.6, 0.8], repeat: Infinity, repeatDelay: 0.35, ease: 'easeInOut' }}
    >
      <img src="/assets/images/swipe-hand.png" alt="" className="h-20 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,.45)]" />
    </motion.div>
  </motion.div>
);

/* One full-screen slide per event, swiped horizontally with native scroll-snap
   (no scroll hijacking). The section and artwork are h-lvh so they never resize
   when the mobile browser bars show/hide; text and controls live in a top h-dvh
   box so they always sit at the bottom of whatever is actually visible. */
export const EventCarousel = () => {
  const { t } = useTranslation('home');
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const revealed = useInView(sectionRef, { once: true, amount: 0.15 });
  const onScreen = useInView(sectionRef, { amount: 0.5 });
  const [active, setActive] = useState(0);
  const [hint, setHint] = useState(false);
  const hideTimer = useRef(0);
  const idleTimer = useRef(0);

  useEffect(() => {
    const clear = () => { window.clearTimeout(hideTimer.current); window.clearTimeout(idleTimer.current); };
    if (!onScreen) { clear(); setHint(false); return; }
    const show = () => {
      setHint(true);
      hideTimer.current = window.setTimeout(() => { setHint(false); idleTimer.current = window.setTimeout(show, IDLE_MS); }, HINT_MS);
    };
    show();
    const el = scrollerRef.current;
    const onSwipe = () => { clear(); setHint(false); idleTimer.current = window.setTimeout(show, IDLE_MS); };
    el?.addEventListener('scroll', onSwipe, { passive: true });
    return () => { clear(); el?.removeEventListener('scroll', onSwipe); };
  }, [onScreen]);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || !el.clientWidth) return;
    const i = Math.min(COUNT - 1, Math.max(0, Math.round(el.scrollLeft / el.clientWidth)));
    if (i !== active) setActive(i);
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: Math.min(COUNT - 1, Math.max(0, i)) * el.clientWidth, behavior: 'smooth' });
  };

  const current = EVENTS[active];

  return (
    <section ref={sectionRef} aria-roledescription="carousel" aria-label={t('schedule.title')} className="relative h-lvh min-h-[560px] w-full overflow-hidden bg-[#1a0c0a]">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {EVENTS.map((event, i) => {
          const isActive = i === active;
          return (
            <div key={event.key} role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${COUNT}: ${t(`schedule.${event.key}`)}`} aria-hidden={!isActive} className="relative h-full w-full shrink-0 snap-center snap-always overflow-hidden bg-[#fff8e8]">
              <img
                src={ART(event.art)}
                alt=""
                decoding="async"
                loading={i < 2 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                style={{ objectPosition: `${ART_X[event.key] ?? '50%'} center`, transitionDuration: `${ZOOM_MS}ms`, transform: isActive && revealed ? 'scale(1)' : `scale(${ZOOM_FROM})` }}
                className="absolute inset-0 h-full w-full object-cover transition-transform ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#1a0c0a]/95 via-[#1a0c0a]/60 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-dvh">
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive && revealed ? 1 : 0, y: isActive && revealed ? 0 : 24 }}
                  transition={{ duration: 0.7, delay: isActive ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
                  style={{ paddingBottom: TEXT_BOTTOM_PX }}
                  className="pointer-events-none absolute inset-x-0 bottom-0 px-6 text-center"
                >
                  <h4 className="font-serif text-4xl leading-tight text-[#fff3dc] drop-shadow-[0_4px_18px_rgba(0,0,0,.5)] sm:text-6xl">{t(`schedule.${event.key}`)}</h4>
                  <div className="mt-3 flex items-center justify-center gap-3 text-[#f1c27d]">
                    <span className="h-px w-8 bg-current/60" />
                    <p className="text-xs font-semibold uppercase tracking-[.2em]">
                      <EventDate date={t(`schedule.${event.key}-date`)} time={t(`schedule.${event.key}-time`)} />
                    </p>
                    <span className="h-px w-8 bg-current/60" />
                  </div>
                  <p className="mx-auto mt-3 max-w-md font-serif text-base italic leading-7 text-[#f6e7cf]/90 sm:text-lg">{t(`schedule.${event.key}-desc`)}</p>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fixed chrome over every slide (pointer-events only on controls so swipes pass through). */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-dvh">
        {/* Page colour melts into the artwork so heading and art read as one piece. */}
        <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-[#fff8e8] via-[#fff8e8]/80 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center px-4 pt-8 text-center sm:pt-20"
        >
          <p className="font-serif text-xs uppercase tracking-[.38em] text-[#8b1e1e] sm:text-sm">{t('schedule.eyebrow')}</p>
          <h3 className="mt-2 font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('schedule.title')}</h3>
          <p className="mx-auto mt-2 max-w-xl font-serif text-sm italic text-[#5d4a43] [@media(max-height:700px)]:hidden sm:text-base">{t('schedule.subtitle')}</p>

          {/* Counter + event tag for the slide in view */}
          <div className="mt-4 flex items-center gap-3 px-4 py-1.5 [text-shadow:0_0_8px_#fff8e8,0_0_2px_#fff8e8]">
            <span className="shrink-0 font-serif text-xs tabular-nums tracking-[.2em] text-[#8b1e1e]">{pad(active + 1)} / {pad(COUNT)}</span>
            <span className="h-3 w-px shrink-0 bg-[#b08a3a]/60" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={current.key} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }} className="font-serif text-[11px] uppercase tracking-[.28em] text-[#5a2a12] sm:text-xs">
                {t(`schedule.${current.key}-tag`)}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Swipe coaching: hand gesture + arrows appear together and fade together. */}
        <AnimatePresence>{hint ? <SwipeHand key="hand" dir={active === COUNT - 1 ? 1 : -1} /> : null}</AnimatePresence>
        {[-1, 1].map((step) => {
          const target = active + step;
          const visible = hint && target >= 0 && target < COUNT;
          return (
            <button
              key={step}
              type="button"
              onClick={() => goTo(target)}
              tabIndex={visible ? 0 : -1}
              aria-hidden={!visible}
              aria-label={t(step < 0 ? 'schedule.prev' : 'schedule.next')}
              className={`absolute top-[52%] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#f6d98b]/50 bg-[#1a0c0a]/45 text-[#fff3dc] backdrop-blur-sm transition-opacity duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6d98b] ${step < 0 ? 'left-3' : 'right-3'} ${visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              <Chevron dir={step < 0 ? 'left' : 'right'} />
            </button>
          );
        })}

        {/* Slide dots at the foot of the visible screen, centred between the fixed music / nav buttons. */}
        <ol className="pointer-events-auto absolute inset-x-0 bottom-0 flex items-center justify-center pb-5 sm:pb-8">
          {EVENTS.map((event, i) => (
            <li key={event.key}>
              <button type="button" onClick={() => goTo(i)} aria-label={t(`schedule.${event.key}`)} aria-current={i === active ? 'step' : undefined} className="flex h-8 w-8 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6d98b]">
                <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-[#f6d98b]' : 'w-1.5 bg-[#fff3dc]/50'}`} />
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Build-in: the artwork rises out of the page colour the first time it scrolls into view. */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 z-20 bg-[#fff8e8]"
      />
    </section>
  );
};
