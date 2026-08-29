'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/language-toggle';

interface LetterAnimationProps { onOpen: () => void; coupleName: string; }

type Stage = 'welcome' | 'doors';

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  const searchParams = useSearchParams();
  const { t } = useTranslation('home');
  const toName = searchParams.get('to') || searchParams.get('toName') || t('letter.guest');
  const [stage, setStage] = useState<Stage>('welcome');
  const [doorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    if (stage !== 'doors') return;
    setDoorsOpen(false);
    const openTimer = window.setTimeout(() => setDoorsOpen(true), 120);
    const finishTimer = window.setTimeout(onOpen, 4000);
    return () => { window.clearTimeout(openTimer); window.clearTimeout(finishTimer); };
  }, [stage, onOpen]);

  if (stage === 'welcome') return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-[#f7e8c7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,221,123,.34),transparent_34%),linear-gradient(180deg,#fff7e4,#f5e1bc_66%,#e8ca9b)]" />
      <div className="absolute inset-x-0 top-0 h-24 border-b border-[#b9852b]/30 bg-[radial-gradient(circle_at_12px_10px,#d58d2a_0_3px,transparent_4px)] [background-size:30px_26px] sm:h-28" />
      <div className="absolute inset-x-0 top-0 flex justify-around px-2">
        {Array.from({length:9}).map((_,i)=><motion.div key={i} className="w-7 sm:w-9" animate={{rotate:i%2?[0,2,-2,0]:[0,-2,2,0]}} transition={{duration:4,repeat:Infinity,delay:i*.18}}><div className="mx-auto h-12 w-px bg-[#b9862e]/55 sm:h-14"/><div className="mx-auto h-3 w-3 rounded-full bg-[#d28a2f]"/><div className="mx-auto mt-1 h-2.5 w-2.5 rounded-full bg-[#e1a040]"/><div className="mx-auto mt-1 h-2 w-2 rounded-full bg-[#c96e34]"/></motion.div>)}
      </div>
      <SideBell className="absolute left-[7%] top-[27%]" /><SideBell className="absolute right-[7%] top-[27%]" delay={.4}/>
      <SideDiya className="absolute left-5 top-[20%]"/><SideDiya className="absolute right-5 top-[20%]" delay={.3}/><SideDiya className="absolute left-5 bottom-[20%]" delay={.6}/><SideDiya className="absolute right-5 bottom-[20%]" delay={.9}/>
      <FloralCorner side="left"/><FloralCorner side="right"/>
      <div className="absolute inset-x-0 top-[3.5rem] z-30 px-4 text-center sm:top-[4.25rem]"><div className="mx-auto max-w-xl rounded-full bg-[#fff9ec]/88 px-4 py-2 shadow-sm"><div className="font-serif text-sm tracking-[.12em] text-[#7b1e1e] sm:text-2xl">ॐ श्री गणेशाय नमः</div><div className="mt-0.5 text-[7px] uppercase tracking-[.35em] text-[#916b35] sm:text-xs">Om Shree Ganeshay Namah</div></div></div>
      <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:1}} className="absolute inset-x-0 top-[14%] bottom-[28%] z-20 flex items-center justify-center px-8"><div className="relative flex h-full max-h-[60vh] w-full max-w-2xl items-center justify-center"><div className="absolute h-[90%] w-[90%] rounded-full border border-[#c89b3c]/25"/><div className="absolute h-[68%] w-[68%] rounded-full bg-[#ffd56d]/25 blur-3xl"/><img src="/assets/images/ChatGPT Image Jun 9, 2026, 09_55_48 PM.png" alt="Lord Ganesha" className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_24px_45px_rgba(84,44,18,.22)]"/></div></motion.div>
      <div className="absolute inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,2.5vh)] pt-24 text-center"><div className="mx-auto max-w-xl rounded-[1.75rem] border border-[#d5ae61]/55 bg-[#5b2119]/80 px-5 py-4 shadow-[0_18px_50px_rgba(55,20,15,.28)] backdrop-blur-[4px]"><p className="font-serif text-base text-[#fff4d8] sm:text-xl">{t('letter.dear')} <span className="font-semibold text-[#ffd88a]">{toName}</span></p><p className="mt-1 text-xs text-[#f8e8c5] sm:text-sm">{t('letter.you-are-invited')}</p><p className="mt-1 font-serif text-xl italic text-[#ffd88a] sm:text-2xl">Chayan &amp; Divya</p><motion.button onClick={()=>setStage('doors')} whileTap={{scale:.96}} className="mx-auto mt-3 rounded-full border border-[#f1cf78] bg-[#8b1e1e] px-9 py-3 text-xs font-semibold uppercase tracking-[.24em] text-[#fff5df] shadow-lg sm:px-11 sm:py-3.5 sm:text-sm">Click to Enter</motion.button><div className="mt-1 text-lg text-[#ffd88a]">↓</div></div></div>
      <div className="absolute right-3 top-3 z-[200] sm:right-6 sm:top-6"><LanguageToggle/></div>
    </main>
  );

  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-[#2a0d0b] [perspective:1600px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,#fff3c4_0%,#eab64a_13%,#a63f27_28%,#471712_63%,#220a09_100%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_12px_10px,#e0a13c_0_3px,transparent_4px)] [background-size:28px_24px] opacity-80" />
      <div className="absolute left-1/2 bottom-[5%] h-[57%] w-[48%] -translate-x-1/2 rounded-t-[50%] border border-[#f2c873]/55 bg-[#fff0b6]/10 shadow-[0_0_120px_rgba(255,224,147,.28)]" />
      <div className="absolute left-1/2 top-[12%] z-10 -translate-x-1/2 text-center text-[#ffe5a3]"><div className="text-base tracking-[.45em] sm:text-lg">ॐ</div><div className="mt-2 font-serif text-lg tracking-[.18em] sm:text-3xl">CHAYAN · DIVYA</div></div>
      <div className="absolute bottom-[7%] left-1/2 h-3 w-28 -translate-x-1/2 rounded-full bg-[#f8d06a] shadow-[0_0_45px_16px_rgba(248,208,106,.48)]" />

      {/* The actual door panels are clipped from a pair of carved Indian gate illustrations and animate apart from the center. */}
      <DoorHalf side="left" open={doorsOpen}/>
      <DoorHalf side="right" open={doorsOpen}/>
      <TempleBell active={doorsOpen} className="absolute left-1/2 top-4 z-[90] -translate-x-1/2 scale-125"/>
      {doorsOpen && <motion.div initial={{opacity:0}} animate={{opacity:[0,.8,0]}} transition={{duration:1.6}} className="absolute left-1/2 top-[28%] z-[85] -translate-x-1/2 text-5xl text-[#ffe08a]">✦</motion.div>}
      <motion.div initial={{opacity:0}} animate={{opacity:doorsOpen?1:0}} transition={{delay:2.1,duration:1.2}} className="absolute inset-0 z-[75] pointer-events-none bg-[radial-gradient(circle_at_50%_52%,rgba(255,245,192,.28),transparent_32%)]"/>
      <motion.p initial={{opacity:0}} animate={{opacity:doorsOpen?[0,1,1,0]:0}} transition={{duration:3.1,times:[0,.2,.72,1]}} className="absolute bottom-5 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap font-serif text-[10px] tracking-[.18em] text-[#fff0b8] sm:text-sm">THE DOORS TO OUR CELEBRATION ARE OPENING</motion.p>
    </main>
  );
};

function DoorHalf({side,open}:{side:'left'|'right';open:boolean}){
  const left=side==='left';
  return <div className={`absolute inset-y-0 z-60 w-1/2 overflow-hidden ${left?'left-0':'right-0'} transition-transform duration-[2600ms] ease-[cubic-bezier(.76,0,.24,1)]`} style={{transform:`translate3d(${open?(left?'-100%':'100%'):'0'},0,0)`}}><img src={left?'/assets/images/wedding-door-left.svg':'/assets/images/wedding-door-right.svg'} alt="" className="absolute inset-0 h-full w-screen max-w-none object-fill"/><div className={`absolute inset-0 ${left?'bg-gradient-to-r from-[#170706]/30 to-transparent':'bg-gradient-to-l from-[#170706]/30 to-transparent'}`}/></div>;
}
function TempleBell({className='',delay=0,active=false}:{className?:string;delay?:number;active?:boolean}){return <motion.div className={`pointer-events-none ${className}`} animate={active?{rotate:[-10,10,-5,5,0]}:{y:[0,2,0]}} transition={{duration:active?.9:2.8,repeat:active?0:Infinity,delay,ease:'easeInOut'}}><div className="relative mx-auto h-8 w-10 rounded-b-[45%] border border-[#b8872e] bg-[linear-gradient(180deg,#e7bf5d,#a77122)] shadow-[0_0_18px_rgba(247,195,74,.22)] sm:h-10 sm:w-12"/><div className="mx-auto h-1 w-12 rounded-full bg-[#875d1d] sm:w-14"/><div className="mx-auto mt-1 h-2 w-3 rounded-full bg-[#9b641e]"/></motion.div>}
function SideBell({className='',delay=0}:{className?:string;delay?:number}){return <motion.div className={`pointer-events-none ${className}`} animate={{rotate:[-3,3,-2,2,0],y:[0,2,0]}} transition={{duration:4,repeat:Infinity,delay,ease:'easeInOut'}}><div className="mx-auto h-7 w-8 rounded-b-xl border border-[#b8872e] bg-[linear-gradient(180deg,#ebc461,#a56d1f)] sm:h-9 sm:w-10"/><div className="mx-auto h-1 w-10 bg-[#8f651c] sm:w-12"/><div className="mx-auto mt-1 h-2 w-3 rounded-full bg-[#b47723]"/></motion.div>}
function SideDiya({className='',delay=0}:{className?:string;delay?:number}){return <motion.div className={`pointer-events-none ${className}`} animate={{y:[0,-3,0],opacity:[.75,1,.75]}} transition={{duration:2.2,repeat:Infinity,delay}}><div className="relative h-3 w-10 rounded-[50%] border border-[#c39438] bg-[#b56b26]/80 sm:w-12"><span className="absolute -top-7 left-1/2 h-7 w-3 -translate-x-1/2 rounded-[70%_30%_70%_30%] bg-[#f6bd43] shadow-[0_0_18px_7px_rgba(246,189,67,.38)]"/></div></motion.div>}
function FloralCorner({side}:{side:'left'|'right'}){return <div className={`pointer-events-none absolute ${side==='left'?'left-0':'right-0'} bottom-0 z-20 h-36 w-40 sm:h-48 sm:w-56 ${side==='right'?'scale-x-[-1]':''}`}><div className="absolute bottom-3 left-4 h-6 w-6 rounded-full bg-[#e75d76] shadow-[0_0_0_6px_rgba(231,93,118,.12)] sm:h-8 sm:w-8"/><div className="absolute bottom-12 left-14 h-4 w-4 rounded-full bg-[#f1a15f] sm:h-6 sm:w-6"/><div className="absolute bottom-7 left-28 h-6 w-6 rounded-full bg-[#d9577b] sm:h-8 sm:w-8"/><div className="absolute bottom-0 left-0 h-20 w-36 rounded-tr-[100%] border-t-2 border-[#68812c] rotate-[-8deg] sm:h-28 sm:w-52"/><div className="absolute bottom-6 left-20 h-20 w-1 rotate-[-28deg] bg-[#68802c] sm:h-28"/></div>}
