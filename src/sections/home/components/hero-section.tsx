'use client';

import { motion } from 'motion/react';
import type { WeddingConfigType } from '@/types';
import { Diya, Lotus, Mandala, OrnamentalDivider, Petals, SectionBackdrop } from '@/components/indian-ornaments';

interface HeroSectionProps { isLoaded: boolean; couple: WeddingConfigType; onScrollToSection: (sectionId: string) => void; }

export const HeroSection = ({ isLoaded, couple, onScrollToSection }: HeroSectionProps) => {
  return (
    <SectionBackdrop className="min-h-[100svh] bg-[#fff6e3]">
      <div className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-14 pt-28 sm:px-8 sm:pt-32">
        <Petals count={18} />

        {/* Decorative toran */}
        <div className="absolute inset-x-0 top-0 h-24 border-b border-[#c89b3c]/35 bg-[radial-gradient(circle_at_12px_10px,#d89228_0_3px,transparent_4px)] [background-size:32px_26px] opacity-70" />
        {[10, 20, 30, 70, 80, 90].map((left, i) => (
          <motion.div key={left} className="absolute top-0 hidden sm:block" style={{ left: `${left}%` }} animate={{ rotate: i % 2 ? [0, 2, -2, 0] : [0, -2, 2, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: i * .15 }}>
            <div className="h-14 w-px bg-[#c89b3c]/55" /><div className="mx-auto flex w-4 flex-col items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#ce7d27]"/><span className="h-2 w-2 rounded-full bg-[#e4ae4f]"/><span className="h-2 w-2 rounded-full bg-[#b95e2a]"/></div>
          </motion.div>
        ))}

        {/* Corner lamps */}
        <Diya className="absolute left-0 top-28 h-16 w-16 text-[#b8872e] sm:left-4 sm:h-20 sm:w-20" />
        <Diya className="absolute right-0 top-28 h-16 w-16 text-[#b8872e] sm:right-4 sm:h-20 sm:w-20" />
        <Diya className="absolute bottom-10 left-0 h-16 w-16 text-[#b8872e] sm:left-4 sm:h-20 sm:w-20" />
        <Diya className="absolute bottom-10 right-0 h-16 w-16 text-[#b8872e] sm:right-4 sm:h-20 sm:w-20" />

        <Mandala size={460} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#b8872e] opacity-[.08]" />
        <motion.div animate={{ scale: [1, 1.04, 1], opacity: [.12, .2, .12] }} transition={{ duration: 4, repeat: Infinity }} className="absolute left-1/2 top-[46%] h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e2ad3f]/20 blur-3xl sm:h-[38rem] sm:w-[38rem]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -16 }} transition={{ duration: .85 }}>
            <p className="font-serif text-base tracking-[.18em] text-[#7b1e1e] sm:text-2xl">ॐ श्री गणेशाय नमः</p>
            <p className="mt-1 text-[9px] uppercase tracking-[.4em] text-[#a77735] sm:text-xs">Om Shree Ganeshay Namah</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 22 }} transition={{ duration: 1, delay: .15 }} className="mt-7">
            <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#8a4c23] sm:text-sm">With the blessings of our families</p>
            <h1 className="mt-3 font-serif text-[clamp(3.2rem,12vw,7rem)] leading-[.9] text-[#7b1e1e]">{couple.groom.name}<span className="mx-2 text-[.42em] text-[#b8872e] sm:mx-5">&amp;</span>{couple.bride.name}</h1>
            <div className="mx-auto mt-5 max-w-xs"><OrnamentalDivider /></div>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-base italic leading-relaxed text-[#6f4c3b] sm:text-xl">We invite you to share in the joy, blessings and celebration of our wedding</p>
          </motion.div>

          <div className="mt-7 flex flex-col items-center justify-center gap-6 sm:mt-9 sm:flex-row sm:gap-10">
            <Portrait src={couple.groom.photo} name={couple.groom.name} label="The Groom" />
            <motion.div animate={{ scale:[1,1.14,1], rotate:[0,6,-6,0] }} transition={{ duration:2.7, repeat:Infinity, ease:'easeInOut' }} className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c89b3c]/60 bg-[#fff9ed] text-xl text-[#8b1e1e] shadow-lg sm:h-16 sm:w-16 sm:text-2xl">ॐ</motion.div>
            <Portrait src={couple.bride.photo} name={couple.bride.name} label="The Bride" />
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 12 }} transition={{ duration: .8, delay: .45 }} className="mt-6">
            <p className="font-serif text-lg text-[#5f3028] sm:text-xl">24 November 2026 <span className="px-2 text-[#b8872e]">·</span> 7:00 PM onwards</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <motion.button onClick={() => onScrollToSection('details')} whileHover={{ y:-2 }} whileTap={{ scale:.97 }} className="rounded-full border border-[#8b1e1e] bg-[#8b1e1e] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#fff8e8] shadow-[0_10px_28px_rgba(123,30,30,.2)]">Explore the Celebration</motion.button>
              <motion.button onClick={() => onScrollToSection('rsvp')} whileHover={{ y:-2 }} whileTap={{ scale:.97 }} className="rounded-full border border-[#c89b3c]/55 bg-[#fffaf0] px-7 py-3.5 text-sm font-semibold text-[#6c3028] shadow-sm">RSVP</motion.button>
            </div>
          </motion.div>

          <motion.button onClick={() => onScrollToSection('couple')} animate={{ y:[0,7,0], opacity:[.55,1,.55] }} transition={{ duration:1.8, repeat:Infinity }} className="mt-8 text-[10px] uppercase tracking-[.32em] text-[#765746] sm:mt-10">Scroll to discover ↓</motion.button>
        </div>
      </div>
    </SectionBackdrop>
  );
};

function Portrait({ src, name, label }: { src: string; name: string; label: string }) {
  return (
    <div className="w-36 text-center sm:w-44">
      <div className="relative mx-auto h-32 w-32 sm:h-40 sm:w-40">
        <div className="absolute inset-0 rounded-full border border-[#b08a3a]/75 p-1.5" />
        <div className="absolute inset-3 rounded-full border border-[#b08a3a]/35 p-1.5" />
        <div className="absolute inset-5 overflow-hidden rounded-full border-4 border-[#fff8e8] shadow-[0_16px_35px_rgba(80,35,20,.18)]"><img src={src} alt={name} className="h-full w-full object-cover" /></div>
      </div>
      <p className="mt-2 text-[9px] uppercase tracking-[.25em] text-[#b08a3a]">{label}</p>
      <p className="mt-1 font-serif text-xl text-[#572a24] sm:text-2xl">{name}</p>
    </div>
  );
}
