'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

export const Mandala = ({ className = '', size = 180 }: { className?: string; size?: number }) => (
  <motion.svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }} aria-hidden="true">
    <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1" opacity=".35" />
    <circle cx="100" cy="100" r="68" stroke="currentColor" strokeWidth="1" opacity=".5" />
    <circle cx="100" cy="100" r="46" stroke="currentColor" strokeWidth="1" opacity=".55" />
    {Array.from({ length: 16 }).map((_, i) => <ellipse key={i} cx="100" cy="31" rx="8" ry="22" transform={`rotate(${(i * 360) / 16} 100 100)`} stroke="currentColor" strokeWidth="1" opacity=".55" />)}
    {Array.from({ length: 8 }).map((_, i) => <path key={`p-${i}`} d="M100 54 C108 64 108 76 100 84 C92 76 92 64 100 54Z" transform={`rotate(${(i * 360) / 8} 100 100)`} stroke="currentColor" strokeWidth="1" opacity=".7" />)}
    <circle cx="100" cy="100" r="9" fill="currentColor" opacity=".7" />
  </motion.svg>
);

export const Lotus = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 120 70" className={className} fill="none" aria-hidden="true">
    <path d="M60 62C40 60 22 47 15 29C32 29 48 36 60 52C72 36 88 29 105 29C98 47 80 60 60 62Z" fill="currentColor" opacity=".18" />
    <path d="M60 57C46 49 38 34 42 15C52 22 59 33 60 50C61 33 68 22 78 15C82 34 74 49 60 57Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17 29C30 28 45 34 60 52C45 48 29 42 17 29ZM103 29C90 28 75 34 60 52C75 48 91 42 103 29Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const Diya = ({ className = '' }: { className?: string }) => (
  <motion.svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true" animate={{ scale: [1, 1.04, 1], opacity: [.88, 1, .88] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
    <path d="M50 14C42 25 43 34 50 40C57 34 58 25 50 14Z" fill="currentColor" opacity=".9" />
    <path d="M29 52C31 72 40 82 50 82C60 82 69 72 71 52C60 58 40 58 29 52Z" fill="currentColor" opacity=".7" />
    <path d="M25 50C35 57 65 57 75 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M35 82H65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </motion.svg>
);

export const Petals = ({ count = 14 }: { count?: number }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => <motion.span key={i} className="absolute block h-2 w-3 rounded-[100%_0] bg-[#b52b3a]/50" style={{ left: `${(i * 37) % 100}%`, top: `${-10 - (i % 4) * 8}%` }} animate={{ y: ['0vh', '115vh'], x: [0, (i % 2 ? 1 : -1) * (18 + (i % 4) * 8)], rotate: [0, 180, 360] }} transition={{ duration: 9 + (i % 5), delay: i * .45, repeat: Infinity, ease: 'linear' }} />)}
  </div>
);

export const OrnamentBell = ({ className = '', delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div className={className} aria-hidden="true" animate={{ rotate: [-3, 3, -2, 2, 0] }} transition={{ duration: 3.8, repeat: Infinity, delay, ease: 'easeInOut' }}>
    <div className="mx-auto h-8 w-9 rounded-b-[45%] border border-[#b8872e]/75 bg-[linear-gradient(180deg,#e7bf5d,#a77122)] shadow-[0_4px_12px_rgba(100,50,20,.12)] sm:h-10 sm:w-11" />
    <div className="mx-auto h-1 w-10 rounded-full bg-[#8f651c]/80 sm:w-12" />
    <div className="mx-auto mt-1 h-2 w-2.5 rounded-full bg-[#9b641e]" />
  </motion.div>
);

export const OrnamentalDivider = ({ label }: { label?: string }) => (
  <div className="flex items-center justify-center gap-3 text-[#b08a3a]" aria-hidden={!label}>
    <span className="h-px w-14 bg-current/40" /><Lotus className="h-8 w-14" />
    {label ? <span className="font-serif text-xs uppercase tracking-[.28em] text-[#7b1e1e]">{label}</span> : null}
    <Lotus className="h-8 w-14 -scale-x-100" /><span className="h-px w-14 bg-current/40" />
  </div>
);

export const SectionBackdrop = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`relative overflow-hidden bg-[#fff9ed] ${className}`}>
    <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #7b1e1e 1px, transparent 0)', backgroundSize: '28px 28px' }} />
    <Mandala size={360} className="absolute -left-40 top-20 text-[#b08a3a] opacity-[.16]" />
    <Mandala size={280} className="absolute -right-32 bottom-10 text-[#7b1e1e] opacity-[.12]" />
    <Petals count={8} />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 border-b border-[#b08a3a]/20 bg-[radial-gradient(circle_at_10px_10px,#d89228_0_2px,transparent_3px)] [background-size:28px_24px] opacity-55" />
    <OrnamentBell className="pointer-events-none absolute left-[7%] top-5 hidden sm:block" delay={.1} />
    <OrnamentBell className="pointer-events-none absolute right-[7%] top-5 hidden sm:block" delay={.5} />
    <Lotus className="pointer-events-none absolute left-1/2 top-1 h-8 w-14 -translate-x-1/2 text-[#b08a3a] opacity-45" />
    <div className="relative">{children}</div>
  </div>
);
