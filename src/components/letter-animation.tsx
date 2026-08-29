'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/language-toggle';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName: string;
}

type Stage = 'welcome' | 'gates';

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  const searchParams = useSearchParams();
  const { t } = useTranslation('home');
  const toName = searchParams.get('to') || searchParams.get('toName') || t('letter.guest');

  const [stage, setStage] = useState<Stage>('welcome');
  const [doorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    if (stage !== 'gates') return;

    // Two separate frames are required so the browser paints the closed state
    // before applying the open transform. This makes the gate animation reliable
    // even on slower mobile browsers.
    setDoorsOpen(false);
    const raf = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setDoorsOpen(true));
    });

    const finishTimer = window.setTimeout(onOpen, 5200);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(finishTimer);
    };
  }, [stage, onOpen]);

  const enter = () => {
    if (stage === 'welcome') setStage('gates');
  };

  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-[#f7ecd3] text-[#4b211d]" aria-label={t('letter.invitation-title')}>
      <div className="absolute right-3 top-3 z-[120] sm:right-6 sm:top-6">
        <LanguageToggle />
      </div>

      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <motion.section
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,rgba(255,221,123,.36),transparent_33%),linear-gradient(180deg,#fff7e2_0%,#f8e8c5_58%,#e9c995_100%)]" />

            {/* Toran */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 overflow-hidden border-b border-[#bb8b37]/35 bg-[radial-gradient(circle_at_10px_10px,#d28a28_0_3px,transparent_4px)] [background-size:32px_28px] opacity-75 sm:h-28" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-around px-4">
              {[0,1,2,3,4,5,6].map((i) => (
                <motion.div key={i} className="hidden w-8 flex-col items-center sm:flex" animate={{ rotate: i % 2 ? [0, 2, -2, 0] : [0, -2, 2, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * .2 }}>
                  <span className="h-14 w-px bg-[#c89b3c]/55" />
                  <span className="h-3 w-3 rounded-full bg-[#d68e2d]" />
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#e3a23d]" />
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#c56d2b]" />
                </motion.div>
              ))}
            </div>

            {/* Side diyas and bells */}
            <TempleBell className="absolute left-[7%] top-[29%]" />
            <TempleBell className="absolute right-[7%] top-[29%]" delay={.45} />
            {[
              ['left-4 top-[20%]', 0],
              ['right-4 top-[20%]', .25],
              ['left-5 bottom-[20%]', .5],
              ['right-5 bottom-[20%]', .75],
            ].map(([position, delay], i) => (
              <TempleDiya key={i} className={`absolute ${position}`} delay={Number(delay)} />
            ))}

            {/* Central Ganesh composition: contained, never cropped */}
            <motion.div
              initial={{ opacity: 0, y: 22, scale: .95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute inset-x-0 top-[15%] bottom-[29%] z-20 flex items-center justify-center px-8 sm:top-[12%] sm:bottom-[25%]"
            >
              <div className="relative flex h-full max-h-[58vh] w-full max-w-2xl items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 75, repeat: Infinity, ease: 'linear' }} className="absolute h-[82%] w-[82%] rounded-full border border-[#c89b3c]/25" />
                <motion.div animate={{ scale: [1,1.05,1], opacity: [.25,.6,.25] }} transition={{ duration: 3.4, repeat: Infinity }} className="absolute h-[65%] w-[65%] rounded-full bg-[#ffd56d]/25 blur-3xl" />
                <img
                  src="/assets/images/ChatGPT Image Jun 9, 2026, 09_55_48 PM.png"
                  alt="Lord Ganesha"
                  className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_24px_45px_rgba(84,44,18,.24)]"
                />
              </div>
            </motion.div>

            {/* Safe top title */}
            <div className="absolute inset-x-0 top-[3.5rem] z-40 px-4 text-center sm:top-[4.25rem]">
              <div className="mx-auto max-w-xl rounded-full bg-[#fff8e8]/82 px-4 py-2 shadow-sm backdrop-blur-[2px]">
                <div className="font-serif text-sm tracking-[.12em] text-[#7b1e1e] sm:text-2xl">ॐ श्री गणेशाय नमः</div>
                <div className="mt-0.5 text-[7px] uppercase tracking-[.35em] text-[#916b35] sm:text-xs">Om Shree Ganeshay Namah</div>
              </div>
            </div>

            {/* Invitation CTA */}
            <div className="absolute inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,2.5vh)] pt-24 text-center sm:px-6 sm:pb-[4vh]">
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .7 }} className="mx-auto max-w-xl rounded-[1.7rem] border border-[#cfa957]/45 bg-[#5a2119]/72 px-5 py-4 shadow-[0_18px_55px_rgba(60,20,15,.28)] backdrop-blur-[5px] sm:px-8 sm:py-5">
                <p className="font-serif text-base text-[#fff4d8] sm:text-xl">{t('letter.dear')} <span className="font-semibold text-[#ffd88a]">{toName}</span></p>
                <p className="mt-1 text-xs text-[#f8e8c5] sm:text-sm">{t('letter.you-are-invited')}</p>
                <p className="mt-1 font-serif text-xl italic text-[#ffd88a] sm:text-2xl">Chayan &amp; Divya</p>
                <motion.button
                  type="button"
                  onClick={enter}
                  whileHover={{ scale: 1.035 }}
                  whileTap={{ scale: .965 }}
                  className="mx-auto mt-3 rounded-full border border-[#f1cf78] bg-[#8b1e1e] px-8 py-3 text-xs font-semibold uppercase tracking-[.25em] text-[#fff5df] shadow-[0_10px_26px_rgba(52,16,13,.3)] sm:px-10 sm:py-3.5 sm:text-sm"
                >
                  Click to Enter
                </motion.button>
                <motion.div animate={{ y:[0,5,0], opacity:[.45,1,.45] }} transition={{ duration:1.7, repeat:Infinity }} className="mt-1 text-lg text-[#ffd88a]">↓</motion.div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {stage === 'gates' && (
          <motion.section key="gates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 overflow-hidden bg-[#29100e]">
            {/* Courtyard/mandap behind the doors */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,#fff3c2_0%,#e3aa43_12%,#9a3824_31%,#3a1411_72%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(180deg,transparent,#27100e)]" />

            <motion.div initial={{ scale: .93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.0 }} className="absolute inset-0">
              <div className="absolute left-1/2 top-[9%] h-[83%] w-[90%] -translate-x-1/2 rounded-t-[43%] border-2 border-[#efcc79]/70 shadow-[0_0_120px_rgba(255,218,121,.28)] sm:top-[7%] sm:h-[87%] sm:w-[80%]" />
              <div className="absolute left-1/2 bottom-[11%] h-[42%] w-[48%] -translate-x-1/2 rounded-t-[48%] border border-[#ffd87b]/35 bg-[#fff3c3]/10 shadow-[0_0_60px_rgba(255,223,151,.18)]" />
              <div className="absolute left-1/2 top-[16%] -translate-x-1/2 text-center text-[#ffe4a3]">
                <div className="text-sm tracking-[.45em]">ॐ</div>
                <div className="mt-2 whitespace-nowrap font-serif text-lg tracking-[.16em] sm:text-3xl">CHAYAN · DIVYA</div>
              </div>
            </motion.div>

            {/* REAL DOOR ANIMATION: CSS transition from center to outside */}
            <Door side="left" open={doorsOpen} />
            <Door side="right" open={doorsOpen} />

            <TempleBell className="absolute left-1/2 top-[2.5%] z-[70] -translate-x-1/2 scale-125" active={doorsOpen} />

            <motion.div animate={{ opacity: doorsOpen ? [.35,1,.35] : .5, scale: doorsOpen ? [1,1.12,1] : 1 }} transition={{ duration:2.1, repeat: Infinity }} className="absolute bottom-[12%] left-1/2 z-10 h-3 w-24 -translate-x-1/2 rounded-full bg-[#f7c95b] shadow-[0_0_35px_13px_rgba(247,201,91,.48)]" />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: [0,1,1,0] }} transition={{ duration:4.7, times:[0,.15,.72,1] }} className="absolute bottom-6 left-1/2 z-[80] -translate-x-1/2 whitespace-nowrap px-3 text-center font-serif text-[10px] tracking-[.16em] text-[#fff1bd] sm:text-sm">THE DOORS TO OUR CELEBRATION ARE OPENING</motion.p>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

function Door({ side, open }: { side: 'left' | 'right'; open: boolean }) {
  const isLeft = side === 'left';
  return (
    <div
      className={`absolute inset-y-0 z-50 w-[56vw] min-w-[13rem] max-w-[52rem] overflow-hidden bg-[linear-gradient(120deg,#2e0d0c,#6f221c_45%,#45120f)] shadow-[0_0_50px_rgba(0,0,0,.55)] transition-transform duration-[2600ms] ease-[cubic-bezier(.76,0,.24,1)] will-change-transform ${isLeft ? 'left-0 origin-left' : 'right-0 origin-right'}`}
      style={{ transform: `translate3d(${open ? (isLeft ? '-104%' : '104%') : '0'},0,0)`, perspective: '1000px' }}
      aria-hidden="true"
    >
      <div className={`${isLeft ? 'ml-[7%] mr-[3%]' : 'ml-[3%] mr-[7%]'} my-[6%] h-[88%] rounded-[22px] border-2 border-[#d4a345]/80 bg-[repeating-linear-gradient(90deg,rgba(255,218,123,.08)_0_2px,transparent_2px_30px)] p-3 sm:rounded-[30px] sm:p-5`}>
        <div className="h-full rounded-[17px] border border-[#e4bf68]/55 p-3 sm:rounded-[24px] sm:p-6">
          <div className="flex h-full flex-col items-center justify-between border border-[#c9973e]/45 py-8 sm:py-12">
            <div className="text-3xl text-[#efc969] sm:text-5xl">❧</div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#d9ae50]/75 text-3xl text-[#d9ae50] sm:h-32 sm:w-32 sm:text-5xl">ॐ</div>
            <div className="h-px w-24 bg-[#d9ae50]/55 sm:w-36" />
            <div className="text-2xl text-[#d9ae50] sm:text-4xl">✦</div>
            <div className="text-[9px] tracking-[.5em] text-[#e2bd68] sm:text-xs">शुभ</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TempleBell({ className='', delay=0, active=false }: { className?: string; delay?: number; active?: boolean }) {
  return (
    <motion.div className={`pointer-events-none z-20 ${className}`} animate={active ? { rotate:[-10,10,-6,6,0] } : { y:[0,3,0] }} transition={{ duration: active ? .9 : 2.8, repeat: active ? 0 : Infinity, delay, ease:'easeInOut' }}>
      <div className="relative mx-auto h-8 w-10 rounded-b-[45%] border border-[#b8872e] bg-[linear-gradient(180deg,#e7bf5d,#a77122)] shadow-[0_0_18px_rgba(247,195,74,.24)] sm:h-10 sm:w-12" />
      <div className="mx-auto h-1 w-12 rounded-full bg-[#875d1d] sm:w-14" />
      <div className="mx-auto mt-1 h-2 w-3 rounded-full bg-[#9b641e]" />
    </motion.div>
  );
}

function TempleDiya({ className='', delay=0 }: { className?: string; delay?: number }) {
  return (
    <motion.div className={`pointer-events-none z-10 ${className}`} animate={{ y:[0,-3,0], opacity:[.75,1,.75] }} transition={{ duration:2.2, repeat:Infinity, delay }}>
      <div className="relative h-3 w-10 rounded-[50%] border border-[#c39438] bg-[#b56b26]/80 sm:w-12">
        <span className="absolute -top-7 left-1/2 h-7 w-3 -translate-x-1/2 rounded-[70%_30%_70%_30%] bg-[#f6bd43] blur-[1px] shadow-[0_0_18px_7px_rgba(246,189,67,.38)]" />
      </div>
    </motion.div>
  );
}
