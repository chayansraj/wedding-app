'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/language-toggle';

interface LetterAnimationProps { onOpen: () => void; coupleName: string; }

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  const searchParams = useSearchParams();
  const { t } = useTranslation('home');
  const toName = searchParams.get('to') || searchParams.get('toName') || t('letter.guest');
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(onOpen, 4300);
    return () => window.clearTimeout(timer);
  }, [opening, onOpen]);

  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-[#3a1412] text-[#4b211d]" aria-label={t('letter.invitation-title')}>
      <div className="absolute right-3 top-3 z-[120] sm:right-6 sm:top-6"><LanguageToggle /></div>
      <AnimatePresence mode="wait">
        {!opening && (
          <motion.section key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.035 }} transition={{ duration: .7 }} className="absolute inset-0 overflow-hidden">
            <img src="/assets/images/ChatGPT Image Jun 9, 2026, 09_55_48 PM.png" alt="Lord Ganesha" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,235,176,.04),transparent_38%),linear-gradient(180deg,rgba(62,18,14,.05)_0%,transparent_38%,rgba(62,18,14,.58)_100%)]" />

            <TempleBell className="absolute left-[7%] top-[26%]" />
            <TempleBell className="absolute right-[7%] top-[26%]" delay={.4} />
            {[['left-3 top-[17%]',0],['right-3 top-[17%]',.3],['left-4 bottom-[19%]',.6],['right-4 bottom-[19%]',.9]].map(([position, delay], i) => <TempleDiya key={i} className={`absolute ${position}`} delay={Number(delay)} />)}

            <div className="absolute inset-x-0 top-0 z-20 px-4 pt-[max(1.25rem,3vh)] text-center sm:pt-[4vh]">
              <div className="mx-auto max-w-xl rounded-full bg-[#fff8e8]/80 px-4 py-2 shadow-sm backdrop-blur-[2px]">
                <div className="font-serif text-sm tracking-[.1em] text-[#7b1e1e] sm:text-2xl">ॐ श्री गणेशाय नमः</div>
                <div className="mt-0.5 text-[7px] uppercase tracking-[.35em] text-[#916b35] sm:text-xs">Om Shree Ganeshay Namah</div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-[max(1rem,3vh)] pt-24 text-center sm:pb-[5vh]">
              <div className="mx-auto max-w-lg rounded-[1.75rem] border border-[#e1bd67]/35 bg-[#4b211d]/50 px-4 py-4 shadow-[0_18px_50px_rgba(45,12,10,.25)] backdrop-blur-[3px] sm:px-7 sm:py-5">
                <p className="font-serif text-sm text-[#fff5da] sm:text-xl">{t('letter.dear')} <span className="font-semibold text-[#ffd88a]">{toName}</span></p>
                <p className="mt-1 text-[11px] text-[#f8e8c5] sm:text-sm">{t('letter.you-are-invited')}</p>
                <p className="mt-1 font-serif text-lg italic text-[#ffd88a] sm:text-2xl">Chayan &amp; Divya</p>
                <motion.button type="button" onClick={() => setOpening(true)} whileHover={{ scale:1.035 }} whileTap={{ scale:.965 }} className="mx-auto mt-3 rounded-full border border-[#f1cf78] bg-[#7b1e1e] px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[.22em] text-[#fff4d8] shadow-[0_10px_26px_rgba(52,16,13,.3)] sm:px-10 sm:py-3.5 sm:text-sm">{t('letter.click-to-open')}</motion.button>
                <motion.div animate={{ y:[0,5,0], opacity:[.45,1,.45] }} transition={{ duration:1.6, repeat:Infinity }} className="mt-1 text-lg text-[#ffd88a]">↓</motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {opening && (
          <motion.section key="gates" initial={{ opacity:0 }} animate={{ opacity:1 }} className="absolute inset-0 overflow-hidden bg-[#24100e]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,#fff2bd_0%,#e1a33b_13%,#8b3022_34%,#32120f_72%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(180deg,transparent,#351310)]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full overflow-hidden">
                <div className="absolute left-1/2 top-[11%] h-[82%] w-[88vw] max-w-5xl -translate-x-1/2 rounded-t-[44%] border-2 border-[#efcc79]/65 shadow-[0_0_110px_rgba(255,219,119,.28)]" />
                <div className="absolute left-1/2 bottom-[12%] h-[45%] w-[48%] -translate-x-1/2 rounded-t-[48%] border border-[#ffd77c]/35 bg-[#fff2bf]/10 shadow-[0_0_55px_rgba(255,224,145,.18)]" />
                <div className="absolute left-1/2 top-[17%] z-10 -translate-x-1/2 text-center text-[#ffe2a0]"><div className="text-sm tracking-[.45em] sm:text-lg">ॐ</div><div className="mt-2 whitespace-nowrap font-serif text-base tracking-[.14em] sm:text-3xl">CHAYAN  ·  DIVYA</div></div>

                <motion.div initial={{ x:0 }} animate={{ x:'-108%' }} transition={{ duration:2.55, ease:[.76,0,.24,1] }} className="absolute inset-y-0 left-0 z-30 w-1/2 origin-left bg-[linear-gradient(120deg,#35100f,#7d2b20_45%,#451513)] shadow-[18px_0_50px_rgba(0,0,0,.5)]"><GatePanel side="left" /></motion.div>
                <motion.div initial={{ x:0 }} animate={{ x:'108%' }} transition={{ duration:2.55, ease:[.76,0,.24,1] }} className="absolute inset-y-0 right-0 z-30 w-1/2 origin-right bg-[linear-gradient(240deg,#35100f,#7d2b20_45%,#451513)] shadow-[-18px_0_50px_rgba(0,0,0,.5)]"><GatePanel side="right" /></motion.div>

                <TempleBell className="absolute left-1/2 top-[3%] z-40 -translate-x-1/2 scale-125" active />
                <motion.div animate={{ opacity:[.4,1,.4], scale:[1,1.1,1] }} transition={{ duration:2.1, repeat:Infinity }} className="absolute bottom-[13%] left-1/2 z-10 h-3 w-24 -translate-x-1/2 rounded-full bg-[#f7c95b] shadow-[0_0_32px_12px_rgba(247,201,91,.45)]" />
              </div>
            </div>

            <motion.div initial={{ opacity:1 }} animate={{ opacity:0 }} transition={{ delay:2.7, duration:1.15 }} className="absolute inset-0 z-50 bg-[#fff0ba]" />
            <motion.p initial={{ opacity:0 }} animate={{ opacity:[0,1,1,0] }} transition={{ duration:3.3, times:[0,.25,.7,1] }} className="absolute bottom-6 left-1/2 z-[60] -translate-x-1/2 whitespace-nowrap px-3 text-center font-serif text-[10px] tracking-[.14em] text-[#fff1bd] sm:text-sm">THE DOORS TO OUR CELEBRATION ARE OPENING</motion.p>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

function TempleBell({ className='', delay=0, active=false }: { className?: string; delay?: number; active?: boolean }) {
  return <motion.div className={`pointer-events-none z-20 ${className}`} animate={active ? { rotate:[-8,8,-5,5,0] } : { y:[0,3,0] }} transition={{ duration:active?.85:2.8, repeat:active?0:Infinity, delay, ease:'easeInOut' }}><div className="relative mx-auto h-8 w-10 rounded-b-[45%] border border-[#b8872e] bg-[linear-gradient(180deg,#e7bf5d,#a77122)] shadow-[0_0_18px_rgba(247,195,74,.22)] sm:h-10 sm:w-12"/><div className="mx-auto h-1 w-12 rounded-full bg-[#875d1d] sm:w-14"/><div className="mx-auto mt-1 h-2 w-3 rounded-full bg-[#9b641e]"/></motion.div>;
}

function TempleDiya({ className='', delay=0 }: { className?: string; delay?: number }) {
  return <motion.div className={`pointer-events-none z-10 ${className}`} animate={{ y:[0,-3,0], opacity:[.78,1,.78] }} transition={{ duration:2.2, repeat:Infinity, delay }}><div className="relative h-3 w-10 rounded-[50%] border border-[#c39438] bg-[#b56b26]/80 sm:w-12"><span className="absolute -top-7 left-1/2 h-7 w-3 -translate-x-1/2 rounded-[70%_30%_70%_30%] bg-[#f6bd43] blur-[1px] shadow-[0_0_18px_7px_rgba(246,189,67,.38)]" /></div></motion.div>;
}

function GatePanel({ side }: { side: 'left' | 'right' }) {
  return <div className={`h-full py-[6%] ${side==='left' ? 'pl-[7%] pr-[5%]' : 'pl-[5%] pr-[7%]'}`}><div className="h-full rounded-[18px] border border-[#d5a947]/70 bg-[repeating-linear-gradient(90deg,rgba(255,218,123,.06)_0_2px,transparent_2px_34px)] p-2 sm:rounded-[28px] sm:p-5"><div className="h-full rounded-[14px] border border-[#e1bd67]/45 p-2 sm:rounded-[22px] sm:p-6"><div className="flex h-full flex-col items-center justify-between border border-[#c99639]/35 py-6 sm:py-10"><div className="text-2xl text-[#edc76c] sm:text-4xl">❧</div><div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d9ae50]/70 text-lg text-[#d9ae50] sm:h-28 sm:w-28 sm:text-4xl">ॐ</div><div className="text-xl text-[#d9ae50] sm:text-4xl">✦</div><div className="text-[8px] tracking-[.4em] text-[#e2bd68] sm:text-xs">शुभ</div></div></div></div></div>;
}
