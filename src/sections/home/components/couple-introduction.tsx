'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';

interface CoupleIntroductionProps { bride: WeddingConfigType['bride']; groom: WeddingConfigType['groom']; isVisible: boolean; }

export const CoupleIntroduction = ({ bride, groom }: CoupleIntroductionProps) => {
  const { t } = useTranslation('home');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

  return <SectionBackdrop><div ref={ref} className="px-4 py-20 sm:py-28"><div className="mx-auto max-w-6xl">
    <motion.div initial={{opacity:0,y:28}} animate={{opacity:inView?1:0,y:inView?0:28}} className="mb-14 text-center">
      <p className="mb-4 font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">Together with our families</p>
      <h2 className="font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('couple.our-story')}</h2>
      <div className="mx-auto mt-6"><OrnamentalDivider /></div>
      <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#6e5c55] sm:text-lg">{t('couple.story-text')}</p>
    </motion.div>

    <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
      <PersonCard person={groom} role={t('couple.the-groom')} description={t('couple.groom-description')} inView={inView} delay={.15} />
      <motion.div initial={{scale:0,opacity:0}} animate={{scale:inView?1:0,opacity:inView?1:0}} transition={{duration:.8,delay:.35,type:'spring'}} className="flex items-center justify-center lg:pt-32">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#b08a3a]/50 bg-[#fff9ed] shadow-lg sm:h-24 sm:w-24"><span className="font-serif text-3xl text-[#8b1e1e]">ॐ</span></div>
      </motion.div>
      <PersonCard person={bride} role={t('couple.the-bride')} description={t('couple.bride-description')} inView={inView} delay={.25} />
    </div>

    <motion.div initial={{opacity:0,y:20}} animate={{opacity:inView?1:0,y:inView?0:20}} transition={{delay:.6}} className="mx-auto mt-16 max-w-3xl text-center"><OrnamentalDivider /><p className="mt-7 font-serif text-2xl italic leading-relaxed text-[#4a3530] sm:text-3xl">“{t('couple.love-quote')}”</p><p className="mt-4 text-xs uppercase tracking-[.3em] text-[#b08a3a]">A new chapter begins</p></motion.div>
  </div></div></SectionBackdrop>;
};

function PersonCard({ person, role, description, inView, delay }: { person: WeddingConfigType['bride'] | WeddingConfigType['groom']; role: string; description: string; inView: boolean; delay: number }) {
  return <motion.div initial={{opacity:0,y:35}} animate={{opacity:inView?1:0,y:inView?0:35}} transition={{duration:.8,delay}} className="text-center">
    <div className="mx-auto mb-7 w-fit"><div className="relative h-56 w-56 sm:h-64 sm:w-64">
      <div className="absolute inset-0 rounded-full border border-[#b08a3a]/70 p-2" /><div className="absolute inset-3 rounded-full border border-[#b08a3a]/35 p-2" />
      <div className="absolute inset-6 overflow-hidden rounded-full border-4 border-[#fff9ed] shadow-[0_18px_45px_rgba(85,35,20,.18)]"><Image src={person.photo} alt={`${person.fullName}'s photo`} fill className="object-cover" sizes="256px" /></div>
      <Lotus className="absolute -bottom-5 left-1/2 h-12 w-24 -translate-x-1/2 text-[#b08a3a]" />
    </div></div>
    <p className="font-serif text-sm uppercase tracking-[.3em] text-[#b08a3a]">{role}</p>
    <h3 className="mt-2 font-serif text-4xl text-[#7b1e1e] sm:text-5xl">{person.fullName}</h3>
    <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#6e5c55]">{description}</p>
  </motion.div>;
}
