'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';

interface CoupleIntroductionProps { bride: WeddingConfigType['bride']; groom: WeddingConfigType['groom']; isVisible: boolean; }

export const CoupleIntroduction = ({ bride, groom }: CoupleIntroductionProps) => {
  const { t, i18n } = useTranslation('home');
  const isHindi = i18n.language.startsWith('hi');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

  return <SectionBackdrop><div ref={ref} className="px-4 py-10 sm:py-16"><div className="mx-auto max-w-6xl">
    <motion.div initial={{opacity:0,y:28}} animate={{opacity:inView?1:0,y:inView?0:28}} className="mb-10 text-center">
      {/* Previous header, kept for later:
      <p className="mb-4 font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">{t('couple.eyebrow')}</p>
      <h2 className="font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('couple.our-story')}</h2>
      */}
      <h2 className="relative mx-auto max-w-3xl">
        {/* Shimmering gold-maroon gradient sweeps across the text; drop-shadow (not text-shadow) so the glow works with background-clip text.
            The "tracking-in" is a scaleX, not letter-spacing, so the line never re-wraps mid-animation. */}
        <motion.span initial={{opacity:0,scaleX:1.12}} animate={{opacity:inView?1:0,scaleX:inView?1:1.12,backgroundPosition:['0% 50%','200% 50%']}} transition={{opacity:{duration:1.1,delay:.1},scaleX:{duration:1.1,delay:.1,ease:'easeOut'},backgroundPosition:{duration:4.5,repeat:Infinity,ease:'linear'}}}
          className={`block bg-clip-text font-bold leading-[1.25] tracking-[.04em] text-transparent [filter:drop-shadow(0_0_12px_rgba(214,170,80,.45))] ${isHindi ? 'font-invocation-hi text-[2rem] sm:text-5xl md:text-[3.4rem]' : 'font-invocation-en text-[1.3rem] sm:text-[2.3rem] md:text-5xl'}`}
          style={{ backgroundImage: 'linear-gradient(100deg, #8a3b2e 0%, #8a3b2e 38%, #d9b25c 48%, #fff1c2 52%, #d9b25c 56%, #8a3b2e 66%, #8a3b2e 100%)', backgroundSize: '200% 100%' }}>{t('couple.journey-title')}</motion.span>
        {GLINTS.map((g) => (
          <motion.span key={g.left} aria-hidden="true" className="pointer-events-none absolute text-[#ffe9a8] [text-shadow:0_0_8px_rgba(255,222,140,.9)]" style={{ left: g.left, top: g.top, fontSize: g.size }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.1, 0.4], rotate: [0, 60] }} transition={{ duration: 1.5, delay: g.delay, repeat: Infinity, repeatDelay: 3.6, ease: 'easeInOut' }}>✦</motion.span>
        ))}
        <span className="mx-auto mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c89b3c]/70 sm:w-16" />
          <motion.span animate={{opacity:[.75,1,.75],scale:[1,1.12,1]}} transition={{duration:3.2,repeat:Infinity,ease:'easeInOut'}} className="text-sm text-[#c89b3c] [text-shadow:0_0_10px_rgba(214,170,80,.8)]">✦</motion.span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c89b3c]/70 sm:w-16" />
        </span>
        <motion.span initial={{opacity:0,y:10}} animate={{opacity:inView?1:0,y:inView?0:10}} transition={{duration:.9,delay:.45}} className="mt-2 block whitespace-nowrap font-serif text-[0.7rem] uppercase tracking-[.22em] text-[#9a6a2a] [text-shadow:0_0_12px_rgba(214,170,80,.35)] sm:text-sm sm:tracking-[.38em]">{t('couple.journey-subtitle')}</motion.span>
      </h2>
      {/* Divider kept for later: <div className="mx-auto mt-7"><OrnamentalDivider /></div> */}
      <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5a4740] sm:text-lg">{t('couple.story-text')}</p>
    </motion.div>

    <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
      <PersonCard person={groom} name={t('couple.groom-full-name')} role={t('couple.the-groom')} description={t('couple.groom-description')} inView={inView} delay={.15} />
      <motion.div initial={{scale:0,opacity:0}} animate={{scale:inView?1:0,opacity:inView?1:0}} transition={{duration:.8,delay:.35,type:'spring'}} className="flex items-center justify-center lg:pt-32">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#b08a3a]/50 bg-[#fff9ed] shadow-lg sm:h-24 sm:w-24"><span className="font-serif text-3xl text-[#8b1e1e]">ॐ</span></div>
      </motion.div>
      <PersonCard person={bride} name={t('couple.bride-full-name')} role={t('couple.the-bride')} description={t('couple.bride-description')} inView={inView} delay={.25} />
    </div>

    <motion.div initial={{opacity:0,y:20}} animate={{opacity:inView?1:0,y:inView?0:20}} transition={{delay:.6}} className="mx-auto mt-6 max-w-3xl text-center sm:mt-10"><OrnamentalDivider />{/* Quote kept for later: <p className="mt-7 font-serif text-2xl italic leading-relaxed text-[#4a3530] sm:text-3xl">“{t('couple.love-quote')}”</p> */}<p className="mt-4 text-xs uppercase tracking-[.3em] text-[#b08a3a]">{t('couple.new-chapter')}</p></motion.div>
  </div></div></SectionBackdrop>;
};

const GLINTS = [
  { left: '4%', top: '-14%', size: 12, delay: 0 },
  { left: '92%', top: '-6%', size: 10, delay: 1.3 },
  { left: '70%', top: '58%', size: 9, delay: 2.5 },
];

function PersonCard({ person, name, role, description, inView, delay }: { person: WeddingConfigType['bride'] | WeddingConfigType['groom']; name: string; role: string; description: string; inView: boolean; delay: number }) {
  return <motion.div initial={{opacity:0,y:35}} animate={{opacity:inView?1:0,y:inView?0:35}} transition={{duration:.8,delay}} className="text-center">
    <div className="mx-auto mb-7 w-fit"><div className="relative h-56 w-56 sm:h-64 sm:w-64">
      <div className="absolute inset-0 rounded-full border border-[#b08a3a]/70 p-2" /><div className="absolute inset-3 rounded-full border border-[#b08a3a]/35 p-2" />
      <div className="absolute inset-6 overflow-hidden rounded-full border-4 border-[#fff9ed] shadow-[0_18px_45px_rgba(85,35,20,.18)]"><Image src={person.photo} alt={`${person.fullName}'s photo`} fill className="object-cover" sizes="256px" /></div>
      <Lotus className="absolute -bottom-5 left-1/2 h-12 w-24 -translate-x-1/2 text-[#b08a3a]" />
    </div></div>
    <p className="font-serif text-sm uppercase tracking-[.3em] text-[#b08a3a]">{role}</p>
    <h3 className="mt-2 font-serif text-4xl text-[#7b1e1e] sm:text-5xl">{name}</h3>
    <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#6e5c55]">{description}</p>
  </motion.div>;
}
