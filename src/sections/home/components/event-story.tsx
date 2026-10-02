'use client';

import { useRef, useState, type RefObject } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';
import { EventSchedule } from './event-schedule';

const EVENTS = [
  { key: 'matra-pujan', art: 'matra-pujan', symbol: '✦' },
  { key: 'haldi', art: 'haldi', symbol: '❀' },
  { key: 'mehendi', art: 'mehendi', symbol: '✿' },
  { key: 'sangeet', art: 'engagement', symbol: '♫' },
  { key: 'wedding', art: 'wedding', symbol: 'ॐ' },
] as const;

const ART = (name: string, thumb = false) => `/assets/images/events/${name}${thumb ? '-thumb' : ''}.webp`;
/** Scroll distance (in small-viewport heights) devoted to each card. */
const CARD_SCROLL_SVH = 160;

type StoryEvent = (typeof EVENTS)[number];

interface StoryCardProps {
  event: StoryEvent;
  index: number;
  count: number;
  progress: MotionValue<number>;
}

/* One pinned card. Local timeline (0→1 within its scroll segment):
   0–.1 artwork pops in front · .1–.26 hold · .26–.38 artwork recedes into a dimmed
   full-bleed backdrop while the text rises · .4–.92 text holds still · .92–1 fade for the next card. */
const StoryCard = ({ event, index, count, progress }: StoryCardProps) => {
  const { t } = useTranslation('home');
  const start = index / count;
  const span = 1 / count;
  const at = (p: number) => start + p * span;
  const isLast = index === count - 1;
  const exit = isLast ? 1 : 0;

  const frontOpacity = useTransform(progress, [at(0), at(0.07), at(0.26), at(0.38)], [0, 1, 1, 0]);
  const frontScale = useTransform(progress, [at(0), at(0.1), at(0.26), at(0.38)], [0.8, 1, 1, 0.9]);
  const frontY = useTransform(progress, [at(0), at(0.1)], [60, 0]);

  const backOpacity = useTransform(progress, [at(0.26), at(0.38), at(0.92), at(1)], [0, 1, 1, exit]);
  const backScale = useTransform(progress, [at(0.26), at(0.4), at(1)], [1.12, 1.02, 1]);

  const textOpacity = useTransform(progress, [at(0.3), at(0.4), at(0.92), at(1)], [0, 1, 1, exit]);
  const textY = useTransform(progress, [at(0.3), at(0.4)], [50, 0]);

  const first = index === 0;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={!first}>
      {/* Receded, dimmed backdrop — taller than the sticky box so it still fills the
          screen when the mobile URL bar collapses. */}
      <motion.div style={{ opacity: backOpacity, scale: backScale }} className="absolute inset-x-0 top-0 h-lvh origin-center">
        <img src={ART(event.art)} alt="" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#2a1410]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0c0a]/55 via-transparent to-[#1a0c0a]/80" />
      </motion.div>

      {/* Artwork that pops in front */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          style={{ opacity: frontOpacity, scale: frontScale, y: frontY }}
          className="relative w-[min(92vw,calc((100svh-17rem)*1.5))] overflow-hidden rounded-[1.6rem] border-2 border-[#d3a145]/80 shadow-[0_30px_80px_rgba(60,20,10,.45)]"
        >
          <img src={ART(event.art)} alt={t(`schedule.${event.key}`)} decoding="async" fetchPriority={first ? 'high' : 'auto'} className="aspect-[3/2] w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-[#fff3dc]/40" />
        </motion.div>
      </div>

      {/* Text revealed over the backdrop */}
      <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-0 flex items-center justify-center px-6">
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
    </div>
  );
};

interface TrackProps {
  trackRef: RefObject<HTMLDivElement | null>;
  scrollToCard: (i: number) => void;
}

const PinnedStory = ({ trackRef, scrollToCard }: TrackProps) => {
  const { t } = useTranslation('home');
  const [active, setActive] = useState(0);
  const count = EVENTS.length;

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(count - 1, Math.max(0, Math.floor(v * count)))));
  // Function form on purpose: the 2-keyframe array form gets promoted to a native
  // ScrollTimeline that ignores the target range and never fades out.
  const hintOpacity = useTransform(scrollYProgress, (v) => Math.max(0, 1 - v / 0.06));

  return (
      <div ref={trackRef} className="relative" style={{ height: `${count * CARD_SCROLL_SVH}svh` }}>
        <div className="sticky top-0 h-svh overflow-visible">
          {EVENTS.map((event, index) => (
            <StoryCard key={event.key} event={event} index={index} count={count} progress={scrollYProgress} />
          ))}

          {/* Persistent chrome: eyebrow + counter */}
          <div className="pointer-events-none absolute inset-x-0 top-4 z-30 flex justify-center sm:top-24">
            <div className="flex items-center gap-3 rounded-full border border-[#c89b3c]/50 bg-[#fff8e8]/85 px-4 py-1.5 shadow-[0_6px_20px_rgba(60,20,10,.15)] backdrop-blur-sm">
              <span className="font-serif text-[10px] uppercase tracking-[.32em] text-[#8b1e1e] sm:text-xs">{t('schedule.eyebrow')}</span>
              <span className="h-3 w-px bg-[#b08a3a]/50" />
              <span className="font-serif text-xs tabular-nums tracking-[.2em] text-[#b08a3a]">{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Progress dots — tap to jump */}
          <ol className="absolute inset-x-0 bottom-5 z-30 mx-auto flex w-max flex-row gap-3 rounded-full border border-[#c89b3c]/40 bg-[#fff8e8]/75 px-3 py-2 backdrop-blur-sm sm:inset-x-auto sm:bottom-auto sm:right-6 sm:top-1/2 sm:mx-0 sm:-translate-y-1/2 sm:flex-col sm:px-2 sm:py-3">
            {EVENTS.map((event, i) => (
              <li key={event.key}>
                <button
                  type="button"
                  onClick={() => scrollToCard(i)}
                  aria-label={t(`schedule.${event.key}`)}
                  aria-current={i === active ? 'step' : undefined}
                  className="flex h-5 w-5 items-center justify-center"
                >
                  <span className={`block rounded-full transition-all duration-300 ${i === active ? 'h-3 w-3 bg-[#8b1e1e] ring-2 ring-[#d3a145]/70' : 'h-2 w-2 bg-[#b08a3a]/60 hover:bg-[#8b1e1e]/70'}`} />
                </button>
              </li>
            ))}
          </ol>

          {/* Scroll hint, only at the very start */}
          <motion.div style={{ opacity: hintOpacity }} className="pointer-events-none absolute inset-x-0 bottom-16 z-30 flex flex-col items-center gap-1 text-[#8b1e1e] sm:bottom-6">
            <span className="font-serif text-[10px] uppercase tracking-[.32em] sm:text-xs">{t('schedule.scroll-hint')}</span>
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="text-lg leading-none">⌄</motion.span>
          </motion.div>
        </div>
      </div>
  );
};

/* Compact summary of all dates; tapping a date jumps back to its card. */
const DateSummary = ({ scrollToCard }: Pick<TrackProps, 'scrollToCard'>) => {
  const { t } = useTranslation('home');
  const count = EVENTS.length;

  return (
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <div className="text-center">
          <p className="font-serif text-xs uppercase tracking-[.38em] text-[#8b1e1e] sm:text-sm">{t('schedule.summary-eyebrow')}</p>
          <h3 className="mt-3 font-serif text-3xl text-[#2d2020] sm:text-4xl">{t('schedule.summary-title')}</h3>
          <div className="mt-5"><OrnamentalDivider /></div>
        </div>

        <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {EVENTS.map((event, i) => (
            <li key={event.key} className={i === count - 1 ? 'col-span-2 sm:col-span-1' : ''}>
              <button
                type="button"
                onClick={() => scrollToCard(i)}
                className="group flex h-full w-full flex-col items-center rounded-[1.4rem] border border-[#c89b3c]/35 bg-[#fffaf0]/80 px-3 py-5 text-center shadow-[0_12px_32px_rgba(75,36,22,.08)] backdrop-blur-[2px] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b1e1e]/60"
              >
                <span className="relative block h-20 w-20 overflow-hidden rounded-full border-2 border-[#d3a145]/80 shadow-[0_8px_18px_rgba(60,20,10,.2)]">
                  <img src={ART(event.art, true)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="mt-4 block text-[11px] font-semibold uppercase tracking-[.22em] text-[#8b1e1e]">{t(`schedule.${event.key}-date`)}</span>
                <span className="mt-1 block font-serif text-xs tracking-[.18em] text-[#b08a3a]">{t(`schedule.${event.key}-time`)}</span>
                <span className="mt-2 block font-serif text-lg leading-snug text-[#2d2020]">{t(`schedule.${event.key}`)}</span>
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

export const EventStory = () => {
  const { t } = useTranslation('home');
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const segment = (track.offsetHeight - window.innerHeight) / EVENTS.length;
    // land inside the "hold" phase of the artwork so the card reads immediately
    window.scrollTo({ top: top + (i + 0.18) * segment, behavior: 'smooth' });
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
      <PinnedStory trackRef={trackRef} scrollToCard={scrollToCard} />
      <SectionBackdrop>
        <DateSummary scrollToCard={scrollToCard} />
      </SectionBackdrop>
    </>
  );
};
