'use client';

import { useRef, useState, type RefObject } from 'react';
import { motion, useMotionTemplate, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';
import { WEDDING_EVENTS as EVENTS, eventArt as ART } from '@/constants/events';
import { EventSchedule } from './event-schedule';

/* Scroll budget per event, in small-viewport heights. Each panel is a normal
   sticky "page": it slides up over the previous one (PIN), then holds for a short
   while (HOLD) during which the artwork dims and the text rises. The page never
   stops moving for long, so it still feels like ordinary scrolling. */
const PIN_SVH = 100;
const HOLD_SVH = 45;
const PANEL_SVH = PIN_SVH + HOLD_SVH;
const COUNT = EVENTS.length;
const TOTAL_SVH = COUNT * PANEL_SVH - PIN_SVH;
const toV = (svh: number) => svh / TOTAL_SVH;
/** Linear ramp of v from a→b, clamped to 0..1. */
const ramp = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
const lerp = (t: number, from: number, to: number) => from + (to - from) * t;

type JourneyEvent = (typeof EVENTS)[number];

interface PanelProps {
  event: JourneyEvent;
  index: number;
  progress: MotionValue<number>;
}

const Panel = ({ event, index, progress }: PanelProps) => {
  const { t } = useTranslation('home');
  const enterStart = toV(PANEL_SVH * index - PIN_SVH);
  const enterEnd = toV(PANEL_SVH * index);
  const settle = toV(PANEL_SVH * index + HOLD_SVH);
  const hold = settle - enterEnd;

  // Function form on purpose: array-form transforms on a lone opacity/scale get
  // promoted to a native ScrollTimeline that ignores the target range.
  const artScale = useTransform(progress, (v) => (v < enterEnd ? lerp(ramp(v, enterStart, enterEnd), 1.12, 1) : lerp(ramp(v, enterEnd, settle), 1, 1.05)));
  const dimOpacity = useTransform(progress, (v) => ramp(v, enterEnd, enterEnd + hold * 0.7));
  const textOpacity = useTransform(progress, (v) => ramp(v, enterEnd + hold * 0.15, enterEnd + hold * 0.85));
  const textY = useTransform(progress, (v) => lerp(ramp(v, enterEnd + hold * 0.15, enterEnd + hold * 0.85), 48, 0));

  return (
    <>
      <section
        className="sticky top-0 h-svh overflow-visible border-t border-[#d3a145]/60 shadow-[0_-24px_70px_rgba(20,8,6,.45)]"
        style={{ zIndex: 10 + index }}
        aria-label={t(`schedule.${event.key}`)}
      >
        {/* Full-bleed artwork — taller than the sticky box so it still fills the
            screen when the mobile URL bar collapses. */}
        <div className="absolute inset-x-0 top-0 h-lvh overflow-hidden bg-[#1a0c0a]">
          <motion.img
            src={ART(event.art)}
            alt=""
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            style={{ scale: artScale }}
            className="h-full w-full object-cover"
          />
          <motion.div style={{ opacity: dimOpacity }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[#2a1410]/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a0c0a]/55 via-transparent to-[#1a0c0a]/80" />
          </motion.div>
        </div>

        {/* Text revealed as the artwork dims */}
        <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-0 flex items-center justify-center pl-14 pr-6 sm:px-6 lg:pl-64 xl:pl-6">
          <div className="max-w-2xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#f6d98b]/70 bg-[#8b1e1e] text-2xl text-[#f6d98b] shadow-[0_8px_22px_rgba(0,0,0,.35)] sm:h-16 sm:w-16">
              {event.symbol}
            </div>
            <p className="font-serif text-xs uppercase tracking-[.38em] text-[#f6d98b] sm:text-sm">{t(`schedule.${event.key}-tag`)}</p>
            <h4 className="mt-3 font-serif text-4xl leading-tight text-[#fff3dc] drop-shadow-[0_4px_18px_rgba(0,0,0,.5)] sm:text-6xl md:text-7xl">{t(`schedule.${event.key}`)}</h4>
            <div className="mt-5 flex items-center justify-center gap-3 text-[#f1c27d]">
              <span className="h-px w-10 bg-current/60" />
              <p className="text-xs font-semibold uppercase tracking-[.28em] sm:text-sm">
                <span className="block sm:inline">{t(`schedule.${event.key}-date`)}</span>
                <span className="mx-2 hidden opacity-60 sm:inline">·</span>
                <span className="block sm:inline">{t(`schedule.${event.key}-time`)}</span>
              </p>
              <span className="h-px w-10 bg-current/60" />
            </div>
            <p className="mx-auto mt-5 max-w-md font-serif text-base italic leading-8 text-[#f6e7cf]/90 sm:text-lg">{t(`schedule.${event.key}-desc`)}</p>
          </div>
        </motion.div>
      </section>
      {/* Hold phase: lets the panel stay pinned while the text settles. */}
      <div aria-hidden="true" style={{ height: `${HOLD_SVH}svh` }} />
    </>
  );
};

interface RailProps {
  progress: MotionValue<number>;
  active: number;
  scrollToEvent: (i: number) => void;
}

/* Persistent chrome: the side event line with a lotus that travels along it,
   the "02 / 05 · Haldi" counter and the scroll hint. */
const Rail = ({ progress, active, scrollToEvent }: RailProps) => {
  const { t } = useTranslation('home');

  // Lotus rests on a node while that panel is pinned and glides to the next
  // one while the next artwork slides in.
  const lotusPct = useTransform(progress, (v) => {
    const svh = v * TOTAL_SVH;
    const i = Math.min(COUNT - 1, Math.max(0, Math.floor(svh / PANEL_SVH)));
    const local = svh - i * PANEL_SVH;
    const glide = i < COUNT - 1 ? ramp(local, HOLD_SVH, PANEL_SVH) : 0;
    return ((i + glide) / (COUNT - 1)) * 100;
  });
  const lotusTop = useMotionTemplate`${lotusPct}%`;

  // Visible on each bright artwork, gone once its text is readable.
  const hintOpacity = useTransform(progress, (v) => {
    const local = (v * TOTAL_SVH) % PANEL_SVH;
    if (local <= HOLD_SVH) return Math.max(0, 1 - local / (HOLD_SVH * 0.5));
    return Math.max(0, (local - (PANEL_SVH - 15)) / 15);
  });

  return (
    // Absolute wrapper = sticky containing block, so the rail scrolls away
    // exactly with the track instead of outliving it.
    <div className="pointer-events-none absolute inset-0 z-40">
      <div className="sticky top-0 h-svh">
      {/* Counter */}
      <div className="absolute inset-x-0 top-4 flex justify-center sm:top-24">
        <div className="flex max-w-[92vw] items-center gap-3 rounded-full border border-[#f6d98b]/40 bg-[#1a0c0a]/55 px-4 py-1.5 shadow-[0_6px_20px_rgba(0,0,0,.25)] backdrop-blur-sm">
          <span className="shrink-0 whitespace-nowrap font-serif text-xs tabular-nums tracking-[.2em] text-[#f6d98b]">{String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}</span>
          <span className="h-3 w-px shrink-0 bg-[#f6d98b]/40" />
          <span className="truncate font-serif text-[11px] uppercase tracking-[.28em] text-[#fff3dc] sm:text-xs">{t(`schedule.${EVENTS[active].key}`)}</span>
        </div>
      </div>

      {/* Side event line */}
      <div className="absolute left-3 top-1/2 h-[44svh] -translate-y-1/2 sm:left-5 lg:left-8 lg:h-[54svh]">
        <div className="absolute bottom-0 left-3.5 top-0 w-px bg-[#fff3dc]/30" />
        <motion.div style={{ height: lotusTop }} className="absolute left-3.5 top-0 w-px bg-gradient-to-b from-[#f6d98b]/40 to-[#f6d98b]" />

        <ol className="absolute inset-0">
          {EVENTS.map((event, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <li key={event.key} className="absolute left-0 -translate-y-1/2" style={{ top: `${(i / (COUNT - 1)) * 100}%` }}>
                <button
                  type="button"
                  onClick={() => scrollToEvent(i)}
                  aria-label={t(`schedule.${event.key}`)}
                  aria-current={isActive ? 'step' : undefined}
                  className="pointer-events-auto group flex items-center gap-3 focus-visible:outline-none"
                >
                  <span className="flex h-7 w-7 items-center justify-center">
                    <span className={`block rounded-full transition-all duration-500 group-focus-visible:ring-2 group-focus-visible:ring-[#fff3dc] ${isActive ? 'h-3.5 w-3.5 bg-[#8b1e1e] ring-2 ring-[#f6d98b] shadow-[0_0_14px_rgba(246,217,139,.8)]' : isPast ? 'h-2.5 w-2.5 bg-[#f6d98b]' : 'h-2.5 w-2.5 bg-[#fff3dc]/45 group-hover:bg-[#fff3dc]/80'}`} />
                  </span>
                  <span className={`hidden text-left transition-all duration-500 lg:block ${isActive ? 'translate-x-1 opacity-100' : 'opacity-60 group-hover:opacity-90'}`}>
                    <span className={`block font-serif text-sm leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,.7)] ${isActive ? 'text-[#fff3dc]' : 'text-[#fff3dc]/90'}`}>{t(`schedule.${event.key}`)}</span>
                    <span className="mt-0.5 block text-[10px] uppercase tracking-[.22em] text-[#f6d98b] drop-shadow-[0_2px_8px_rgba(0,0,0,.7)]">{t(`schedule.${event.key}-date`)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Travelling lotus */}
        <motion.div style={{ top: lotusTop, x: '-50%', y: '-50%' }} className="absolute left-3.5">
          <Lotus className="h-6 w-10 text-[#f6d98b] drop-shadow-[0_0_10px_rgba(246,217,139,.9)] lg:h-7 lg:w-12" />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div style={{ opacity: hintOpacity }} className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-gradient-to-t from-[#1a0c0a]/70 to-transparent pb-6 pt-16 text-[#fff3dc] sm:pb-8">
        <span className="font-serif text-[10px] uppercase tracking-[.32em] drop-shadow-[0_2px_8px_rgba(0,0,0,.7)] sm:text-xs">{t('schedule.scroll-hint')}</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="text-lg leading-none">⌄</motion.span>
      </motion.div>
      </div>
    </div>
  );
};

interface JourneyProps {
  trackRef: RefObject<HTMLDivElement | null>;
  scrollToEvent: (i: number) => void;
}

const Journey = ({ trackRef, scrollToEvent }: JourneyProps) => {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(COUNT - 1, Math.max(0, Math.round((v * TOTAL_SVH) / PANEL_SVH)))));

  return (
    <div ref={trackRef} className="relative">
      <Rail progress={scrollYProgress} active={active} scrollToEvent={scrollToEvent} />
      {EVENTS.map((event, index) => (
        <Panel key={event.key} event={event} index={index} progress={scrollYProgress} />
      ))}
    </div>
  );
};

/* Compact recap of all dates; tapping one jumps back to its panel.
   Kept for later — superseded by the Venue & Location section (addresses lived in both). */
export const DateSummary = ({ scrollToEvent }: Pick<JourneyProps, 'scrollToEvent'>) => {
  const { t } = useTranslation('home');

  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 py-14 sm:py-20">
      <div className="text-center">
        <p className="font-serif text-xs uppercase tracking-[.38em] text-[#8b1e1e] sm:text-sm">{t('schedule.summary-eyebrow')}</p>
        <h3 className="mt-3 font-serif text-3xl text-[#2d2020] sm:text-4xl">{t('schedule.summary-title')}</h3>
        <div className="mt-5"><OrnamentalDivider /></div>
      </div>

      <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {EVENTS.map((event, i) => (
          <li key={event.key} className={i === COUNT - 1 ? 'col-span-2 sm:col-span-1' : ''}>
            <button
              type="button"
              onClick={() => scrollToEvent(i)}
              className="group flex h-full w-full flex-col items-center rounded-[1.4rem] border border-[#c89b3c]/35 bg-[#fffaf0]/80 px-3 py-5 text-center shadow-[0_12px_32px_rgba(75,36,22,.08)] backdrop-blur-[2px] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b1e1e]/60"
            >
              <span className="relative block h-20 w-20 overflow-hidden rounded-full border-2 border-[#d3a145]/80 shadow-[0_8px_18px_rgba(60,20,10,.2)]">
                <img src={ART(event.art, true)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </span>
              <span className="mt-4 block text-[11px] font-semibold uppercase tracking-[.22em] text-[#8b1e1e]">{t(`schedule.${event.key}-date`)}</span>
              <span className="mt-1 block font-serif text-xs tracking-[.18em] text-[#b08a3a]">{t(`schedule.${event.key}-time`)}</span>
              <span className="mt-2 block font-serif text-lg leading-snug text-[#2d2020]">{t(`schedule.${event.key}`)}</span>
              <span className="mt-auto flex items-start justify-center gap-1 pt-3 text-[11px] leading-4 text-[#6e5c55]">
                <svg viewBox="0 0 24 24" className="mt-px h-3 w-3 shrink-0 text-[#b08a3a]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Z" /><circle cx="12" cy="11" r="2" /></svg>
                <span>{t(`schedule.${event.key}-venue`)}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-12 text-center">
        <Lotus className="mx-auto h-10 w-24 text-[#b08a3a]" />
        <p className="mt-3 font-serif text-sm tracking-[.18em] text-[#7b1e1e]">{t('schedule.footer')}</p>
      </div>
    </div>
  );
};

export const EventJourney = () => {
  const { t } = useTranslation('home');
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToEvent = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const svhPx = track.offsetHeight / (COUNT * PANEL_SVH);
    const top = track.getBoundingClientRect().top + window.scrollY;
    // land once the text has settled so the tapped event reads immediately
    window.scrollTo({ top: top + (PANEL_SVH * i + HOLD_SVH * 0.9) * svhPx, behavior: 'smooth' });
  };

  // Scroll-driven motion is the whole point here; fall back to the classic timeline.
  if (reduceMotion) return <EventSchedule />;

  return (
    <>
      <SectionBackdrop className="border-t border-[#b08a3a]/20">
        <div className="relative z-10 mx-auto max-w-5xl px-4 pb-10 pt-10 text-center sm:pt-16">
          <p className="font-serif text-xs uppercase tracking-[.38em] text-[#8b1e1e] sm:text-sm">{t('schedule.eyebrow')}</p>
          <h3 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('schedule.title')}</h3>
          <div className="mt-6"><OrnamentalDivider /></div>
          <p className="mx-auto mt-5 max-w-xl font-serif text-base italic text-[#6e5c55] sm:text-lg">{t('schedule.subtitle')}</p>
        </div>
      </SectionBackdrop>
      {/* Must NOT sit inside SectionBackdrop: its overflow-hidden would defeat position: sticky. */}
      <Journey trackRef={trackRef} scrollToEvent={scrollToEvent} />
      {/* Save-the-dates recap kept for later:
          <SectionBackdrop><DateSummary scrollToEvent={scrollToEvent} /></SectionBackdrop> */}
    </>
  );
};
