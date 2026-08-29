'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';

interface HeroSectionProps {
  isLoaded: boolean;
  couple: WeddingConfigType;
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection = ({ isLoaded, couple, onScrollToSection }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff8e8] text-[#4b211d]">
      {/* Palace / mandap atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,220,128,.34),transparent_30%),linear-gradient(180deg,#fff9e9_0%,#f9ecd2_55%,#f3dfbd_100%)]" />
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#8b1e1e] via-[#d2a341] to-[#8b1e1e]" />

      {/* Decorative corner motifs */}
      <CornerMotif className="left-0 top-0" />
      <CornerMotif className="right-0 top-0 rotate-90" />
      <CornerMotif className="bottom-0 left-0 -rotate-90" />
      <CornerMotif className="bottom-0 right-0 rotate-180" />

      {/* Floating petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-2 w-1.5 rounded-[70%_30%_70%_30%] bg-[#d46c3a]/45"
            style={{ left: `${(i * 17) % 100}%`, top: `${-8 + ((i * 13) % 105)}%` }}
            animate={{ y: [0, 90, 0], x: [0, i % 2 ? 24 : -24, 0], rotate: [0, 90, 180], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 7 + (i % 5), repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center px-5 pb-14 pt-24 sm:px-8 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <div className="text-xs font-semibold tracking-[0.3em] text-[#8a4c23] sm:text-sm">ॐ श्री गणेशाय नमः</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.38em] text-[#a77735] sm:text-xs">Om Shree Ganeshay Namah</div>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-[#b8872e]">
            <span className="h-px w-14 bg-[#c89b3c]/60" />
            <span className="text-lg">❖</span>
            <span className="h-px w-14 bg-[#c89b3c]/60" />
          </div>
        </motion.div>

        {/* Central ceremonial frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.94 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="relative mt-6 w-full max-w-4xl rounded-[42px] border border-[#b8872e]/45 bg-[#fffaf0]/65 px-5 py-10 shadow-[0_30px_90px_rgba(93,48,26,.14)] backdrop-blur-[2px] sm:px-12 sm:py-14"
        >
          <div className="pointer-events-none absolute inset-3 rounded-[34px] border border-[#b8872e]/25" />
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-4xl text-[#b8872e]">❀</div>

          <div className="relative text-center">
            <p className="text-sm font-medium tracking-[0.18em] text-[#7a5a45] sm:text-base">WITH THE BLESSINGS OF OUR FAMILIES</p>
            <h1 className="mt-4 font-serif text-5xl leading-[.95] text-[#7b1e1e] sm:text-7xl md:text-8xl">
              {couple.bride.name}
              <span className="mx-3 block text-3xl text-[#b8872e] sm:mx-5 sm:inline sm:text-5xl">&amp;</span>
              {couple.groom.name}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-lg italic leading-relaxed text-[#6f4c3b] sm:text-xl">
              invite you to share in the joy, blessings and celebration of their wedding
            </p>

            {/* Couple portraits */}
            <div className="mt-9 flex items-center justify-center gap-4 sm:gap-10">
              <Portrait src={couple.bride.photo} name={couple.bride.name} />
              <motion.div
                animate={{ scale: [1, 1.12, 1], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c89b3c]/55 bg-[#fff5d6] text-xl text-[#a32b2b] shadow-md sm:h-14 sm:w-14 sm:text-2xl"
              >
                ♥
              </motion.div>
              <Portrait src={couple.groom.photo} name={couple.groom.name} />
            </div>

            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-4 text-[#9e2a2b]">
              <span className="h-px flex-1 bg-[#c89b3c]/50" />
              <span className="text-xs font-semibold tracking-[0.22em]">THE WEDDING CELEBRATION</span>
              <span className="h-px flex-1 bg-[#c89b3c]/50" />
            </div>

            <p className="mt-5 font-serif text-xl text-[#5f3028]">
              24 November 2026 <span className="px-2 text-[#b8872e]">·</span> 7:00 PM onwards
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <motion.button
                onClick={() => onScrollToSection('details')}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="min-w-44 rounded-full border border-[#8b1e1e] bg-[#8b1e1e] px-7 py-3.5 font-semibold tracking-wide text-[#fff8e8] shadow-[0_10px_24px_rgba(123,30,30,.22)] transition-shadow hover:shadow-[0_14px_30px_rgba(123,30,30,.28)]"
              >
                Explore the Celebration
              </motion.button>
              <motion.button
                onClick={() => onScrollToSection('rsvp')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="min-w-36 rounded-full border border-[#b8872e]/55 bg-[#fffaf0]/90 px-7 py-3.5 font-semibold text-[#6c3028] shadow-sm"
              >
                RSVP
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          onClick={() => onScrollToSection('couple')}
          className="mt-7 flex cursor-pointer flex-col items-center text-[#765746]"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to discover our story</span>
          <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="mt-2 text-lg text-[#a77735]">↓</motion.span>
        </motion.button>
      </div>
    </div>
  );
};

function Portrait({ src, name }: { src: string; name: string }) {
  return (
    <div className="text-center">
      <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#fff8e8] shadow-[0_8px_25px_rgba(84,40,24,.18)] ring-1 ring-[#c89b3c]/70 sm:h-36 sm:w-36">
        <img src={src} alt={name} className="h-full w-full object-cover" />
      </div>
      <p className="mt-3 font-serif text-lg text-[#572a24]">{name}</p>
    </div>
  );
}

function CornerMotif({ className }: { className: string }) {
  return (
    <div className={`pointer-events-none absolute z-10 h-28 w-28 opacity-50 sm:h-44 sm:w-44 ${className}`}>
      <div className="absolute left-0 top-0 h-full w-full rounded-full border-l-2 border-t-2 border-[#b8872e]/60" />
      <div className="absolute left-5 top-5 h-20 w-20 rounded-full border-l border-t border-[#9e2a2b]/45 sm:h-32 sm:w-32" />
      <div className="absolute left-9 top-9 text-2xl text-[#b8872e] sm:left-14 sm:top-14 sm:text-4xl">❧</div>
    </div>
  );
}
