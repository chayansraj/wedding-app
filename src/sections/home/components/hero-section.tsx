'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import type { WeddingConfigType } from '@/types';
import { HIDDEN_SECTIONS } from '@/constants';
import { Diya, Mandala, OrnamentalDivider, Petals, SectionBackdrop } from '@/components/indian-ornaments';

interface HeroSectionProps { isLoaded: boolean; couple: WeddingConfigType; onScrollToSection: (sectionId: string) => void; }

export const HeroSection = ({ isLoaded, couple, onScrollToSection }: HeroSectionProps) => {
  const { t, i18n } = useTranslation('home');
  const isHindi = i18n.language.startsWith('hi');
  return (
    <SectionBackdrop className="min-h-[100svh]">
      <div className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-14 pt-24 sm:px-8 sm:pt-32">
        <Petals count={18} />
        {[10, 20, 30, 70, 80, 90].map((left, i) => (
          <motion.div key={left} className="absolute top-0 hidden sm:block" style={{ left: `${left}%` }} animate={{ rotate: i % 2 ? [0, 2, -2, 0] : [0, -2, 2, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: i * .15 }}>
            <div className="h-14 w-px bg-[#c89b3c]/55" /><div className="mx-auto flex w-4 flex-col items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#ce7d27]"/><span className="h-2 w-2 rounded-full bg-[#e4ae4f]"/><span className="h-2 w-2 rounded-full bg-[#b95e2a]"/></div>
          </motion.div>
        ))}

        <Diya className="absolute bottom-10 left-0 h-16 w-16 text-[#b8872e] sm:left-4 sm:h-20 sm:w-20" />
        <Diya className="absolute bottom-10 right-0 h-16 w-16 text-[#b8872e] sm:right-4 sm:h-20 sm:w-20" />

        <Mandala size={460} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#b8872e] opacity-[.08]" />
        <motion.div animate={{ scale: [1, 1.04, 1], opacity: [.12, .2, .12] }} transition={{ duration: 4, repeat: Infinity }} className="absolute left-1/2 top-[46%] h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e2ad3f]/20 blur-3xl sm:h-[38rem] sm:w-[38rem]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -16 }} transition={{ duration: .85 }}>
            <p className={`whitespace-nowrap font-bold leading-tight text-[#7b1e1e] drop-shadow-[0_1px_2px_rgba(255,248,232,.9)] ${isHindi ? 'font-invocation-hi text-[1.75rem] tracking-[.03em] sm:text-5xl' : 'font-invocation-en text-[1.2rem] tracking-[.02em] sm:text-4xl'}`}>{t('hero.invocation')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 22 }} transition={{ duration: 1, delay: .15 }} className="mt-3 sm:mt-5">
            <div className="mx-auto max-w-xs"><OrnamentalDivider /></div>
            <p className="mx-auto mt-2 max-w-2xl font-serif text-base italic leading-relaxed text-[#4a2717] drop-shadow-[0_1px_2px_rgba(255,248,232,.9)] sm:mt-4 sm:text-xl">{t('hero.invite')}</p>
          </motion.div>

          <div className="mt-8 flex flex-row items-center justify-center gap-3 sm:mt-10 sm:gap-10">
            <Portrait artwork={couple.groom.artwork} photo={couple.groom.photo} name={t('couple.groom-name')} label={t('couple.the-groom')} family={t('couple.groom-parents')} revealLabel={t('hero.reveal-photo', { name: t('couple.groom-name') })} />
            <motion.div animate={{ scale:[1,1.14,1], rotate:[0,6,-6,0] }} transition={{ duration:2.7, repeat:Infinity, ease:'easeInOut' }} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c89b3c]/60 bg-[#fff9ed] text-xl text-[#8b1e1e] shadow-lg sm:h-16 sm:w-16 sm:text-2xl">ॐ</motion.div>
            <Portrait artwork={couple.bride.artwork} photo={couple.bride.photo} name={t('couple.bride-name')} label={t('couple.the-bride')} family={t('couple.bride-parents')} revealLabel={t('hero.reveal-photo', { name: t('couple.bride-name') })} />
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 12 }} transition={{ duration: .8, delay: .45 }} className="mt-6 sm:mt-8">
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <motion.button onClick={() => onScrollToSection('details')} whileHover={{ y:-2 }} whileTap={{ scale:.97 }} className="rounded-full border border-[#8b1e1e] bg-[#8b1e1e] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#fff8e8] shadow-[0_10px_28px_rgba(123,30,30,.2)]">{t('hero.explore')}</motion.button>
              <motion.button onClick={() => onScrollToSection('rsvp')} whileHover={{ y:-2 }} whileTap={{ scale:.97 }} className="rounded-full border border-[#c89b3c]/55 bg-[#fffaf0] px-7 py-3.5 text-sm font-semibold text-[#6c3028] shadow-sm">{t('hero.rsvp')}</motion.button>
            </div>
          </motion.div>

          <motion.button onClick={() => onScrollToSection(HIDDEN_SECTIONS.includes('couple') ? 'details' : 'couple')} animate={{ y:[0,7,0], opacity:[.8,1,.8] }} transition={{ duration:1.8, repeat:Infinity }} className="mt-6 text-[10px] font-semibold uppercase tracking-[.32em] text-[#5a2a12] drop-shadow-[0_1px_2px_rgba(255,248,232,.9)] sm:mt-10">{t('hero.scroll-to-discover')}</motion.button>
        </div>
      </div>
    </SectionBackdrop>
  );
};

const SPARKLES = [
  { left: '22%', top: '18%', size: 10, delay: 0 },
  { left: '70%', top: '14%', size: 8, delay: 1.1 },
  { left: '80%', top: '46%', size: 9, delay: 2.3 },
  { left: '16%', top: '52%', size: 7, delay: 3.2 },
  { left: '48%', top: '70%', size: 8, delay: 4.1 },
];

function Sparkle({ left, top, size, delay }: (typeof SPARKLES)[number]) {
  return (
    <motion.svg viewBox="0 0 20 20" width={size} height={size} className="pointer-events-none absolute text-[#ffe9a8]" style={{ left, top }} aria-hidden="true"
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1.15, 0.4], rotate: [0, 45, 90] }} transition={{ duration: 1.6, delay, repeat: Infinity, repeatDelay: 4.2, ease: 'easeInOut' }}>
      <path d="M10 0 C10.6 6 14 9.4 20 10 C14 10.6 10.6 14 10 20 C9.4 14 6 10.6 0 10 C6 9.4 9.4 6 10 0 Z" fill="currentColor" />
    </motion.svg>
  );
}

interface PortraitProps { artwork: string; photo: string; name: string; label: string; family?: string; revealLabel: string }

function Portrait({ artwork, photo, name, label, family, revealLabel }: PortraitProps) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="w-32 text-center sm:w-44">
      <div className="relative mx-auto h-28 w-28 sm:h-44 sm:w-44">
        <div className="absolute inset-0 rounded-full border border-[#b08a3a]/75 p-1.5" />
        {/* Periodic gold sweep around the ring hints that the portrait is tappable */}
        <motion.div aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-full"
          style={{ background: 'conic-gradient(from 0deg, transparent 0 68%, rgba(255,222,140,.95) 80%, rgba(255,246,214,1) 84%, transparent 96%)', WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))', mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))' }}
          animate={{ rotate: [0, 360], opacity: [0, 1, 1, 0] }} transition={{ duration: 2.4, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: 5.5, ease: 'easeInOut' }} />

        <button type="button" onClick={() => setRevealed((v) => !v)} aria-pressed={revealed} aria-label={revealLabel}
          className="absolute inset-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c89b3c] sm:inset-3" style={{ perspective: 900 }}>
          <motion.div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: revealed ? 180 : 0 }} transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}>
            <motion.div className="absolute inset-0 overflow-hidden rounded-full border-2 border-[#fff8e8] bg-[#fff6e6] shadow-[0_16px_35px_rgba(80,35,20,.18)] sm:border-4" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              animate={{ rotate: [-1.2, 1.2, -1.2], scale: [1, 1.02, 1] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}>
              <img src={artwork} alt="" className="h-full w-full object-cover" draggable={false} />
              {SPARKLES.map((s) => <Sparkle key={s.left + s.top} {...s} />)}
            </motion.div>
            <div className="absolute inset-0 overflow-hidden rounded-full border-2 border-[#fff8e8] bg-[#fff6e6] shadow-[0_16px_35px_rgba(80,35,20,.18)] sm:border-4" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <img src={photo} alt={name} className="h-full w-full object-cover" draggable={false} />
            </div>
          </motion.div>
        </button>
      </div>
      <p className="mt-3 text-[9px] font-semibold uppercase tracking-[.25em] text-[#5a2a12] drop-shadow-[0_1px_2px_rgba(255,248,232,.9)]">{label}</p>
      <p className="mt-1 font-serif text-lg text-[#4a1a14] drop-shadow-[0_1px_2px_rgba(255,248,232,.9)] sm:text-2xl">{name}</p>
      {family ? <p className="mt-1.5 text-sm font-semibold leading-snug text-[#4a2717] drop-shadow-[0_1px_2px_rgba(255,248,232,.9)] sm:text-base">{family}</p> : null}
    </div>
  );
}
