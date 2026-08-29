'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';

interface LetterAnimationProps { onOpen: () => void; coupleName: string; }

export const LetterAnimation = ({ onOpen, coupleName }: LetterAnimationProps) => {
  const searchParams = useSearchParams();
  const toName = searchParams.get('to') || searchParams.get('toName') || 'Guest';
  const [stage, setStage] = useState<'welcome' | 'gates' | 'reveal'>('welcome');

  useEffect(() => {
    if (stage !== 'gates') return;
    const revealTimer = window.setTimeout(() => setStage('reveal'), 700);
    const finishTimer = window.setTimeout(onOpen, 4800);
    return () => { window.clearTimeout(revealTimer); window.clearTimeout(finishTimer); };
  }, [onOpen, stage]);

  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-[#f8edd2] text-[#4b211d]" aria-label="Wedding invitation entrance">
      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <motion.section key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.03 }} className="absolute inset-0 overflow-hidden">
            <img src="/assets/images/ChatGPT Image Jun 9, 2026, 09_55_48 PM.png" alt="Lord Ganesha" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(255,241,189,.10),transparent_38%),linear-gradient(180deg,rgba(55,20,15,.16),transparent_45%,rgba(55,20,15,.45))]" />
            <div className="absolute inset-x-0 top-0 z-10 flex justify-center px-4 pt-[max(4rem,8vh)] sm:pt-[7vh]">
              <div className="text-center">
                <div className="font-serif text-base tracking-[0.18em] text-[#7b1e1e] sm:text-2xl">ॐ श्री गणेशाय नमः</div>
                <div className="mt-1 text-[8px] uppercase tracking-[0.35em] text-[#916b35] sm:text-xs">Om Shree Ganeshay Namah</div>
                <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#3d1815]/75 via-[#3d1815]/20 to-transparent px-5 pb-[max(1.75rem,4vh)] pt-28 text-center sm:pb-[5vh]">
              <p className="font-serif text-base text-[#fff5da] sm:text-xl">Dear <span className="font-semibold text-[#ffd88a]">{toName}</span></p>
              <p className="mt-1 text-xs text-[#f8e8c5] sm:text-sm">You are cordially invited to celebrate</p>
              <p className="mt-1 font-serif text-lg italic text-[#ffd88a] sm:text-2xl">{coupleName}</p>
              <motion.button type="button" onClick={() => setStage('gates')} whileTap={{ scale: 0.96 }} className="mx-auto mt-4 rounded-full border border-[#f1cf78] bg-[#7b1e1e]/95 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#fff4d8] shadow-lg sm:px-10 sm:py-3.5 sm:text-sm">Click to Enter</motion.button>
              <motion.div animate={{ y: [0, 6, 0], opacity: [.45, 1, .45] }} transition={{ duration: 1.7, repeat: Infinity }} className="mt-2 text-xl text-[#ffd88a]">↓</motion.div>
            </div>
            {['left-3 top-[24%]','right-3 top-[24%]'].map((p,i)=><TempleBell key={p} className={`absolute ${p}`} delay={i*.2}/>) }
          </motion.section>
        )}

        {(stage === 'gates' || stage === 'reveal') && (
          <motion.section key="gates" className="absolute inset-0 overflow-hidden bg-[#2a100f]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,#fff1b8_0%,#d7a342_17%,#7d2a20_40%,#24100e_82%)]" />
            <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full sm:h-[92vh] sm:w-[84vw]">
                <div className="absolute inset-[5%] rounded-t-[45%] border-2 border-[#e0bd6b]/60 shadow-[0_0_90px_rgba(255,221,128,.28)]" />
                <div className="absolute bottom-[10%] left-1/2 h-[43%] w-[48%] -translate-x-1/2 rounded-t-[50%] bg-[#fff1bc]/10" />
                <div className="absolute left-1/2 top-[14%] -translate-x-1/2 text-center text-[#ffe2a0]"><div className="text-base tracking-[.42em]">ॐ</div><div className="mt-2 font-serif text-lg tracking-[.16em] sm:text-3xl">CHAYAN · DIVYA</div></div>
                <motion.div initial={{ x: 0 }} animate={{ x: stage === 'reveal' ? '-105%' : 0 }} transition={{ duration: 2.25, ease: [0.76,0,0.24,1] }} className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(120deg,#3c1110,#7b2b1f_45%,#451513)] shadow-[18px_0_50px_rgba(0,0,0,.42)]"><GatePanel /></motion.div>
                <motion.div initial={{ x: 0 }} animate={{ x: stage === 'reveal' ? '105%' : 0 }} transition={{ duration: 2.25, ease: [0.76,0,0.24,1] }} className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(240deg,#3c1110,#7b2b1f_45%,#451513)] shadow-[-18px_0_50px_rgba(0,0,0,.42)]"><GatePanel /></motion.div>
                <TempleBell className="absolute left-1/2 top-[4%] -translate-x-1/2 scale-125" active={stage === 'reveal'} />
              </div>
            </motion.div>
            {stage === 'reveal' && <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 2.4, duration: 1.1 }} className="absolute inset-0 z-50 bg-[#fff0b8]" />}
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

function TempleBell({ className='', delay=0, active=false }: { className?: string; delay?: number; active?: boolean }) {
  return <motion.div className={`pointer-events-none z-20 ${className}`} animate={active ? { rotate:[-8,8,-5,5,0] } : { y:[0,3,0] }} transition={{ duration: active?.9:2.5, repeat:active?0:Infinity, delay }}><div className="mx-auto h-7 w-9 rounded-b-xl border border-[#b8872e] bg-[#d7a548]/80 shadow-[0_0_18px_rgba(247,195,74,.25)] sm:h-10 sm:w-12"/><div className="mx-auto h-1 w-11 rounded-full bg-[#8f651c] sm:w-14"/><div className="mx-auto mt-1 h-2 w-3 rounded-full bg-[#a66b23]"/></motion.div>;
}

function GatePanel() {
  return <div className="h-full px-[7%] py-[6%]"><div className="h-full rounded-[20px] border border-[#d5a947]/70 bg-[repeating-linear-gradient(90deg,rgba(255,218,123,.06)_0_2px,transparent_2px_34px)] p-3 sm:rounded-[28px] sm:p-5"><div className="h-full rounded-[15px] border border-[#e1bd67]/45 p-3 sm:rounded-[22px] sm:p-6"><div className="flex h-full flex-col items-center justify-between border border-[#c99639]/35 py-6 sm:py-10"><div className="text-2xl text-[#edc76c] sm:text-4xl">❧</div><div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d9ae50]/70 text-xl text-[#d9ae50] sm:h-28 sm:w-28 sm:text-4xl">ॐ</div><div className="text-xl text-[#d9ae50] sm:text-4xl">✦</div><div className="text-[9px] tracking-[.4em] text-[#e2bd68] sm:text-xs">शुभ</div></div></div></div></div>;
}
