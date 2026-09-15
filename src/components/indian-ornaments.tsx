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

// Gradient + filter palette for the festive corner motif. Each instance gets a
// unique id prefix so mirrored/duplicated SVGs never share gradient ids.
const MotifDefs = ({ idp }: { idp: string }) => (
  <defs>
    <radialGradient id={`${idp}-pdA`} cx="50%" cy="38%" r="64%"><stop offset="0%" stopColor="#ffab2e" /><stop offset="48%" stopColor="#f07607" /><stop offset="100%" stopColor="#a83203" /></radialGradient>
    <radialGradient id={`${idp}-plA`} cx="50%" cy="38%" r="64%"><stop offset="0%" stopColor="#ffc23e" /><stop offset="52%" stopColor="#f58a0c" /><stop offset="100%" stopColor="#c04e05" /></radialGradient>
    <radialGradient id={`${idp}-pdB`} cx="50%" cy="38%" r="64%"><stop offset="0%" stopColor="#ffc62f" /><stop offset="48%" stopColor="#f5960a" /><stop offset="100%" stopColor="#bd5905" /></radialGradient>
    <radialGradient id={`${idp}-plB`} cx="50%" cy="38%" r="64%"><stop offset="0%" stopColor="#ffd743" /><stop offset="54%" stopColor="#fba713" /><stop offset="100%" stopColor="#cf6f06" /></radialGradient>
    <radialGradient id={`${idp}-core`} cx="50%" cy="36%" r="60%"><stop offset="0%" stopColor="#9c3f07" /><stop offset="100%" stopColor="#521d03" /></radialGradient>
    <linearGradient id={`${idp}-brass`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffdf8a" /><stop offset="45%" stopColor="#c88a1c" /><stop offset="100%" stopColor="#6c4512" /></linearGradient>
    <linearGradient id={`${idp}-flame`} x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#ff5a06" /><stop offset="55%" stopColor="#ffab24" /><stop offset="100%" stopColor="#fff3c8" /></linearGradient>
    <radialGradient id={`${idp}-glow`}><stop offset="0%" stopColor="#ffbe4d" stopOpacity="0.95" /><stop offset="100%" stopColor="#ff9e2a" stopOpacity="0" /></radialGradient>
    <linearGradient id={`${idp}-leaf`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4f9a3a" /><stop offset="100%" stopColor="#23471f" /></linearGradient>
    <filter id={`${idp}-soft`} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" /></filter>
    <filter id={`${idp}-shadow`} x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="3" stdDeviation="2.4" floodColor="#2e1405" floodOpacity="0.45" /></filter>
  </defs>
);

// A puffy, gradient-shaded marigold (genda phool). variant A = orange, B = golden.
const mgFlower = (cx: number, cy: number, r: number, idp: string, variant: 'A' | 'B', key: string) => {
  const pd = `url(#${idp}-pd${variant})`;
  const pl = `url(#${idp}-pl${variant})`;
  return (
    <g key={key} transform={`translate(${cx} ${cy}) scale(${r / 46})`}>
      {Array.from({ length: 13 }).map((_, i) => <ellipse key={`o${i}`} cx="0" cy="-34" rx="8.5" ry="15" fill={pd} stroke="rgba(120,52,10,.28)" strokeWidth="0.7" transform={`rotate(${(i * 360) / 13})`} />)}
      {Array.from({ length: 12 }).map((_, i) => <ellipse key={`m${i}`} cx="0" cy="-25" rx="7.5" ry="12.5" fill={pl} transform={`rotate(${i * 30 + 14})`} />)}
      {Array.from({ length: 10 }).map((_, i) => <ellipse key={`n${i}`} cx="0" cy="-16" rx="5.5" ry="8.5" fill={pd} transform={`rotate(${i * 36 + 8})`} />)}
      <circle r="9" fill={`url(#${idp}-core)`} />
      {Array.from({ length: 7 }).map((_, i) => <circle key={`c${i}`} cx="0" cy="-5" r="1.3" fill="#ffcf6a" transform={`rotate(${i * 51})`} />)}
    </g>
  );
};

const mgLeaf = (cx: number, cy: number, rot: number, s: number, idp: string, key: string) => (
  <g key={key} transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${s})`}>
    <path d="M0 0 C 18 -10 38 -8 50 6 C 34 14 10 14 0 0 Z" fill={`url(#${idp}-leaf)`} stroke="#2f5a2c" strokeWidth="0.8" />
    <path d="M3 2 C 18 -3 34 -1 45 6" stroke="#2f5a2c" strokeWidth="1.1" fill="none" opacity="0.7" />
  </g>
);

// A brass diya with an animated, flickering flame and warm glow.
const mgDiya = (cx: number, cy: number, s: number, idp: string, delay: number, key: string) => (
  <g key={key} transform={`translate(${cx} ${cy}) scale(${s})`}>
    <motion.ellipse cx="0" cy="-24" rx="15" ry="24" fill={`url(#${idp}-glow)`} style={{ filter: `url(#${idp}-soft)` }} animate={{ opacity: [0.5, 0.85, 0.55, 0.8, 0.5] }} transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeInOut' }} />
    <motion.g style={{ transformOrigin: 'center bottom', transformBox: 'fill-box' }} animate={{ scaleY: [1, 1.13, 0.95, 1.08, 1], scaleX: [1, 0.93, 1.05, 0.97, 1] }} transition={{ duration: 1.1, repeat: Infinity, delay, ease: 'easeInOut' }}>
      <path d="M0 -48 C 9 -35 9 -24 0 -16 C -9 -24 -9 -35 0 -48 Z" fill={`url(#${idp}-flame)`} />
      <path d="M0 -39 C 4.5 -30 4.5 -23 0 -18 C -4.5 -23 -4.5 -30 0 -39 Z" fill="#fff3c4" />
    </motion.g>
    <rect x="-1" y="-18" width="2" height="6" rx="1" fill="#5a3a1a" />
    <path d="M-28 -8 C -24 7 -14 13 0 13 C 14 13 24 7 28 -8 C 16 -2 -16 -2 -28 -8 Z" fill={`url(#${idp}-brass)`} stroke="#6f4712" strokeWidth="1" />
    <ellipse cx="0" cy="-8" rx="28" ry="7" fill="#3a2410" opacity="0.5" />
    <ellipse cx="0" cy="-8.5" rx="22" ry="4.6" fill={`url(#${idp}-brass)`} />
    <path d="M-30 -8 H 30" stroke="#e7c977" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
  </g>
);

// Bottom-corner festive motif: a marigold + leaf toran that trails horizontally
// with brass diyas, tuned to blend with the warm AI-generated opening videos and
// hide the corner watermark. Mirror it with a `-scale-x-100` class for the left.
export const MarigoldCorner = ({ className = '', idPrefix = 'mc' }: { className?: string; idPrefix?: string }) => (
  <svg viewBox="0 0 240 190" className={className} fill="none" aria-hidden="true">
    <MotifDefs idp={idPrefix} />
    <ellipse cx="196" cy="148" rx="118" ry="86" fill={`url(#${idPrefix}-glow)`} opacity="0.45" style={{ filter: `url(#${idPrefix}-soft)` }} />
    <g filter={`url(#${idPrefix}-shadow)`}>
      <path d="M4 128 Q 70 172 130 150 T 240 112" stroke="#3f6b3a" strokeWidth="3" fill="none" opacity="0.65" strokeLinecap="round" />
      {mgLeaf(58, 150, -18, 1.0, idPrefix, 'l1')}
      {mgLeaf(120, 150, -6, 1.05, idPrefix, 'l2')}
      {mgLeaf(172, 126, -40, 1.0, idPrefix, 'l3')}
      {mgLeaf(214, 148, -70, 0.95, idPrefix, 'l4')}
      {mgLeaf(150, 176, 22, 0.85, idPrefix, 'l5')}
      {mgFlower(28, 138, 13, idPrefix, 'B', 'g1')}
      {mgFlower(58, 156, 12, idPrefix, 'A', 'g2')}
      {mgFlower(90, 160, 13, idPrefix, 'B', 'g3')}
      {mgFlower(120, 152, 14, idPrefix, 'A', 'g4')}
      {mgFlower(212, 160, 34, idPrefix, 'A', 'f1')}
      {mgFlower(176, 148, 25, idPrefix, 'B', 'f2')}
      {mgFlower(226, 122, 24, idPrefix, 'A', 'f3')}
      {mgFlower(150, 164, 21, idPrefix, 'B', 'f4')}
      {mgFlower(196, 126, 19, idPrefix, 'A', 'f5')}
      {mgFlower(164, 124, 16, idPrefix, 'B', 'f6')}
      {mgDiya(196, 180, 1.0, idPrefix, 0, 'd1')}
      {mgDiya(150, 184, 0.78, idPrefix, 0.55, 'd2')}
    </g>
  </svg>
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
  <div className={`relative overflow-hidden bg-transparent ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,241,199,.36),transparent_42%),linear-gradient(180deg,rgba(255,249,237,.35),rgba(255,249,237,.18))]" />
    <div className="absolute inset-0 opacity-[.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #7b1e1e 1px, transparent 0)', backgroundSize: '28px 28px' }} />
    <Mandala size={360} className="absolute -left-40 top-20 text-[#b08a3a] opacity-[.13]" />
    <Mandala size={280} className="absolute -right-32 bottom-10 text-[#7b1e1e] opacity-[.1]" />
    <Petals count={10} />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 border-b border-[#b08a3a]/20 bg-[radial-gradient(circle_at_10px_10px,#d89228_0_2px,transparent_3px)] [background-size:28px_24px] opacity-55" />
    <OrnamentBell className="pointer-events-none absolute left-[6%] top-5" delay={.1} />
    <OrnamentBell className="pointer-events-none absolute right-[6%] top-5" delay={.5} />
    <div className="relative">{children}</div>
  </div>
);
