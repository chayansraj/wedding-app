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
    <main className="fixed inset-0 z-[100] overflow-hidden bg-[#f7ecd3] text-[#4b211d]" aria-label={t('letter.invitation-title')}>
      <div className="absolute right-3 top-3 z-[120] sm:right-6 sm:top-6"><LanguageToggle /></div>
      <AnimatePresence mode="wait">
        {!opening && (
          <motion.section key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: .7 }} className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,220,125,.22),transparent_34%),linear-gradient(180deg,#fff6e1_0%,#f8e8c5_58%,#efd5ad_100%)]" />
            <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_10px_12px,#d89228_0_3px,transparent_4px)] [background-size:32px_28px] opacity-75" />
            <div className="absolute inset-x-0 top-20 h-px bg-[#b8862e]/45" />
            {[8,20,35,65,80,92].map((left,i)=><motion.div key={left} className="absolute top-0 z-10 hidden h-28 w-5 -translate-x-1/2 sm:block" style={{left:`${left}%`}} animate={{rotate:i%2?[0,2,-2,0]:[0,-2,2,0]}} transition={{duration:4,repeat:Infinity,delay:i*.2}}><div className="mx-auto h-16 w-px bg-[#c89b3c]/55"/><div className="mx-auto flex h-8 w-5 flex-col items-center justify-center gap-1"><span className="h-2 w-2 rounded-full bg-[#d28a2e]"/><span className="h-2 w-2 rounded-full bg-[#e0a241]"/><span className="h-2 w-2 rounded-full bg-[#c56d2b]"/></div></motion.div>)}
            <TempleBell className="absolute left-[7%] top-[30%]" /><TempleBell className="absolute right-[7%] top-[30%]" delay={.45}/>
            {[['left-4 top-[20%]',0],['right-4 top-[20%]',.25],['left-5 bottom-[22%]',.5],['right-5 bottom-[22%]',.75]].map(([position,delay],i)=><TempleDiya key={i} className={`absolute ${position}`} delay={Number(delay)}/>)}

            <div className="absolute inset-x-0 top-0 z-30 flex justify-center px-4 pt-[max(1.45rem,5vh)] sm:pt-[4.5vh]">
              <div className="text-center"><div className="font-serif text-base tracking-[.14em] text-[#7b1e1e] sm:text-2xl">ॐ श्री गणेशाय नमः</div><div className="mt-1 text-[8px] uppercase tracking-[.4em] text-[#916b35] sm:text-xs">Om Shree Ganeshay Namah</div><div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent sm:w-28"/></div>
            </div>

            <motion.div initial={{opacity:0,scale:.92,y:10}} animate={{opacity:1,scale:1,y:0}} transition={{duration:1.1,ease:'easeOut'}} className="absolute inset-x-0 top-[14%] bottom-[30%] flex items-center justify-center px-8 sm:top-[11%] sm:bottom-[24%]">
              <div className="relative flex h-full max-h-[58vh] w-full max-w-2xl items-center justify-center">
                <motion.div animate={{rotate:360}} transition={{duration:75,repeat:Infinity,ease:'linear'}} className="absolute h-[82%] w-[82%] rounded-full border border-[#c89b3c]/30"/>
                <motion.div animate={{scale:[1,1.03,1],opacity:[.35,.65,.35]}} transition={{duration:3.2,repeat:Infinity}} className="absolute h-[62%] w-[62%] rounded-full bg-[#ffd66d]/20 blur-3xl"/>
                <img src="/assets/images/ChatGPT Image Jun 9, 2026, 09_55_48 PM.png" alt="Lord Ganesha" className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_22px_45px_rgba(84,44,18,.22)]"/>
              </div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,2.5vh)] pt-24 text-center sm:px-6 sm:pb-[4vh]">
              <div className="mx-auto max-w-xl rounded-[1.7rem] border border-[#dcb86a]/45 bg-[#5a2119]/72 px-4 py-4 shadow-[0_18px_50px_rgba(55,20,16,.28)] backdrop-blur-[4px] sm:px-7 sm:py-5">
                <p className="font-serif text-base text-[#fff4d8] sm:text-xl">{t('letter.dear')} <span className="font-semibold text-[#ffd88a]">{toName}</span></p>
                <p className="mt-1 text-xs text-[#f8e8c5] sm:text-sm">{t('letter.you-are-invited')}</p>
                <p className="mt-1 font-serif text-xl italic text-[#ffd88a] sm:text-2xl">Chayan &amp; Divya</p>
                <motion.button type="button" onClick={()=>setOpening(true)} whileHover={{scale:1.035}} whileTap={{scale:.965}} className="mx-auto mt-3 rounded-full border border-[#f1cf78] bg-[#8b1e1e] px-8 py-3 text-xs font-semibold uppercase tracking-[.24em] text-[#fff5df] shadow-[0_10px_26px_rgba(52,16,13,.3)] sm:px-10 sm:py-3.5 sm:text-sm">Click to Enter</motion.button>
                <motion.div animate={{y:[0,5,0],opacity:[.45,1,.45]}} transition={{duration:1.6,repeat:Infinity}} className="mt-1 text-lg text-[#ffd88a]">↓</motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {opening && (
          <motion.section key="gates" initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 overflow-hidden bg-[#2b100f]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#fff2bd_0%,#dc9d36_14%,#7a281f_37%,#240d0c_80%)]"/>
            <div className="absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle_at_12px_8px,#e1a13c_0_3px,transparent_4px)] [background-size:28px_24px] opacity-70"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full overflow-hidden">
                <div className="absolute inset-[6%] rounded-t-[43%] border-2 border-[#efcc79]/75 shadow-[0_0_100px_rgba(255,222,139,.25)]"/>
                <div className="absolute bottom-[9%] left-1/2 h-[48%] w-[54%] -translate-x-1/2 rounded-t-[49%] border border-[#ffd980]/35 bg-[#fff2c0]/10"/>
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.3}} className="absolute left-1/2 top-[15%] z-10 -translate-x-1/2 text-center text-[#ffe4a3]"><div className="text-base tracking-[.45em]">ॐ</div><div className="mt-2 whitespace-nowrap font-serif text-lg tracking-[.16em] sm:text-3xl">CHAYAN · DIVYA</div></motion.div>

                <motion.div initial={{x:0}} animate={{x:'-108%'}} transition={{duration:2.7,ease:[.76,0,.24,1]}} className="absolute inset-y-0 left-0 z-30 w-1/2 origin-left bg-[linear-gradient(120deg,#32100f,#7d2b20_46%,#421513)] shadow-[20px_0_55px_rgba(0,0,0,.52)]"><GatePanel side="left"/></motion.div>
                <motion.div initial={{x:0}} animate={{x:'108%'}} transition={{duration:2.7,ease:[.76,0,.24,1]}} className="absolute inset-y-0 right-0 z-30 w-1/2 origin-right bg-[linear-gradient(240deg,#32100f,#7d2b20_46%,#421513)] shadow-[-20px_0_55px_rgba(0,0,0,.52)]"><GatePanel side="right"/></motion.div>
                <TempleBell className="absolute left-1/2 top-[3%] z-40 -translate-x-1/2 scale-125" active/>
              </div>
            </div>
            <motion.div initial={{opacity:1}} animate={{opacity:0}} transition={{delay:2.8,duration:1.05}} className="absolute inset-0 z-50 bg-[#fff0b7]"/>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

function TempleBell({className='',delay=0,active=false}:{className?:string;delay?:number;active?:boolean}){return <motion.div className={`pointer-events-none z-20 ${className}`} animate={active?{rotate:[-9,9,-5,5,0]}:{y:[0,3,0]}} transition={{duration:active?.9:2.8,repeat:active?0:Infinity,delay,ease:'easeInOut'}}><div className="relative mx-auto h-8 w-10 rounded-b-[45%] border border-[#b8872e] bg-[linear-gradient(180deg,#e7bf5d,#a77122)] shadow-[0_0_18px_rgba(247,195,74,.22)] sm:h-10 sm:w-12"/><div className="mx-auto h-1 w-12 rounded-full bg-[#875d1d] sm:w-14"/><div className="mx-auto mt-1 h-2 w-3 rounded-full bg-[#9b641e]"/></motion.div>}
function TempleDiya({className='',delay=0}:{className?:string;delay?:number}){return <motion.div className={`pointer-events-none z-10 ${className}`} animate={{y:[0,-3,0],opacity:[.78,1,.78]}} transition={{duration:2.2,repeat:Infinity,delay}}><div className="relative h-3 w-10 rounded-[50%] border border-[#c39438] bg-[#b56b26]/80 sm:w-12"><span className="absolute -top-7 left-1/2 h-7 w-3 -translate-x-1/2 rounded-[70%_30%_70%_30%] bg-[#f6bd43] blur-[1px] shadow-[0_0_18px_7px_rgba(246,189,67,.38)]"/></div></motion.div>}
function GatePanel({side}:{side:'left'|'right'}){return <div className={`h-full py-[6%] ${side==='left'?'pl-[7%] pr-[5%]':'pl-[5%] pr-[7%]'}`}><div className="h-full rounded-[20px] border border-[#d5a947]/70 bg-[repeating-linear-gradient(90deg,rgba(255,218,123,.07)_0_2px,transparent_2px_34px)] p-3 sm:rounded-[28px] sm:p-5"><div className="h-full rounded-[15px] border border-[#e1bd67]/45 p-3 sm:rounded-[22px] sm:p-6"><div className="flex h-full flex-col items-center justify-between border border-[#c99639]/35 py-7 sm:py-10"><div className="text-2xl text-[#edc76c] sm:text-4xl">❧</div><div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d9ae50]/70 text-xl text-[#d9ae50] sm:h-28 sm:w-28 sm:text-4xl">ॐ</div><div className="text-xl text-[#d9ae50] sm:text-4xl">✦</div><div className="text-[9px] tracking-[.4em] text-[#e2bd68] sm:text-xs">शुभ</div></div></div></div></div>}
