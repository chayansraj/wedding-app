'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';

interface HeroSectionProps { isLoaded: boolean; couple: WeddingConfigType; onScrollToSection: (sectionId: string) => void; }

export const HeroSection = ({ isLoaded, couple, onScrollToSection }: HeroSectionProps) => (
  <div className="relative min-h-[100svh] overflow-hidden bg-[#fff8e8] text-[#4b211d]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,224,142,.42),transparent_30%),linear-gradient(180deg,#fffaf0_0%,#f9ecd2_58%,#f2dfbd_100%)]" />
    <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_10px_10px,#c88924_0_3px,transparent_4px)] [background-size:34px_28px] opacity-60" />
    <div className="absolute inset-x-0 top-20 h-px bg-[#b8872e]/40" />

    {[['left-3 top-28',0],['right-3 top-28',.4]].map(([position, delay], i) => (
      <motion.div key={i} className={`absolute ${position} z-10`} animate={{ y:[0,4,0], rotate:i ? [5,-5,5] : [-5,5,-5] }} transition={{ duration:3, repeat:Infinity, delay:Number(delay) }}>
        <div className="mx-auto h-8 w-10 rounded-b-xl border border-[#b8872e] bg-[#d7a548]/75" />
        <div className="mx-auto h-1 w-12 rounded-full bg-[#8f651c]" />
        <div className="mx-auto h-2 w-3 rounded-full bg-[#f6bd43] shadow-[0_0_16px_6px_rgba(246,189,67,.32)]" />
      </motion.div>
    ))}

    <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center px-4 pb-10 pt-28 sm:px-8 sm:pt-32">
      <motion.div initial={{opacity:0,y:-12}} animate={{opacity:isLoaded?1:0,y:isLoaded?0:-12}} transition={{duration:.8}} className="text-center">
        <div className="font-serif text-base tracking-[.18em] text-[#7b1e1e] sm:text-2xl">ॐ श्री गणेशाय नमः</div>
        <div className="mt-1 text-[9px] uppercase tracking-[.34em] text-[#a77735] sm:text-xs">Om Shree Ganeshay Namah</div>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:isLoaded?1:0,y:isLoaded?0:20}} transition={{duration:1,delay:.15}} className="mt-7 w-full max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#8a4c23] sm:text-sm">With the blessings of our families</p>
        <h1 className="mt-3 font-serif text-5xl leading-none text-[#7b1e1e] sm:text-7xl md:text-8xl">
          {couple.groom.name}<span className="mx-2 text-3xl text-[#b8872e] sm:mx-4 sm:text-5xl">&amp;</span>{couple.bride.name}
        </h1>
        <div className="mx-auto mt-4 flex max-w-xs items-center gap-3"><span className="h-px flex-1 bg-[#c89b3c]/50"/><span className="text-[#b8872e]">❖</span><span className="h-px flex-1 bg-[#c89b3c]/50"/></div>
      </motion.div>

      <div className="relative mt-6 flex items-center justify-center gap-3 sm:mt-8 sm:gap-8">
        <Portrait src={couple.groom.photo} name={couple.groom.name} />
        <motion.div animate={{scale:[1,1.12,1],rotate:[0,5,-5,0]}} transition={{duration:2.5,repeat:Infinity}} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c89b3c]/60 bg-[#fff5d6] text-xl text-[#9e2a2b] shadow-md sm:h-14 sm:w-14 sm:text-2xl">♥</motion.div>
        <Portrait src={couple.bride.photo} name={couple.bride.name} />
      </div>

      <p className="mt-6 max-w-xl px-4 text-center font-serif text-base italic leading-relaxed text-[#6f4c3b] sm:text-xl">We invite you to share in the joy, blessings and celebration of our wedding</p>
      <p className="mt-4 font-serif text-lg text-[#5f3028] sm:text-xl">24 November 2026 <span className="px-2 text-[#b8872e]">·</span> 7:00 PM onwards</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <motion.button onClick={()=>onScrollToSection('details')} whileTap={{scale:.97}} className="rounded-full bg-[#8b1e1e] px-7 py-3.5 text-sm font-semibold text-[#fff8e8] shadow-lg">Explore the Celebration</motion.button>
        <motion.button onClick={()=>onScrollToSection('rsvp')} whileTap={{scale:.97}} className="rounded-full border border-[#b8872e]/60 bg-[#fffaf0] px-7 py-3.5 text-sm font-semibold text-[#6c3028] shadow-sm">RSVP</motion.button>
      </div>

      <motion.button onClick={()=>onScrollToSection('couple')} animate={{y:[0,6,0]}} transition={{duration:1.8,repeat:Infinity}} className="mt-auto pt-6 text-[10px] uppercase tracking-[.28em] text-[#765746]">Scroll to discover ↓</motion.button>
    </div>
  </div>
);

function Portrait({src,name}:{src:string;name:string}) {
  return <div className="text-center"><div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#fff8e8] shadow-xl ring-1 ring-[#c89b3c]/70 sm:h-36 sm:w-36"><img src={src} alt={name} className="h-full w-full object-cover"/></div><p className="mt-2 font-serif text-lg text-[#572a24]">{name}</p></div>;
}
