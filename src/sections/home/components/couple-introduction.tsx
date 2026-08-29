'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';

interface CoupleIntroductionProps {
  bride: WeddingConfigType['bride'];
  groom: WeddingConfigType['groom'];
  isVisible: boolean;
}

export const CoupleIntroduction = ({ bride, groom }: CoupleIntroductionProps) => {
  const { t } = useTranslation('home');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

  return (
    <SectionBackdrop>
      <div ref={ref} className="px-4 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-serif text-sm uppercase tracking-[0.35em] text-[#8b1e1e]">Together with our families</p>
            <h2 className="font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('couple.our-story')}</h2>
            <div className="mx-auto mt-6"><OrnamentalDivider /></div>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#6e5c55] sm:text-lg">{t('couple.story-text')}</p>
          </motion.div>

          <div className="relative grid items-start gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -45 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -45 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-center"
            >
              <div className="mx-auto mb-7 w-fit">
                <div className="relative h-64 w-64 sm:h-72 sm:w-72">
                  <div className="absolute inset-0 rounded-full border border-[#b08a3a]/70 p-2" />
                  <div className="absolute inset-3 rounded-full border border-[#b08a3a]/35 p-2" />
                  <div className="absolute inset-6 overflow-hidden rounded-full border-4 border-[#fff9ed] shadow-[0_18px_45px_rgba(85,35,20,.18)]">
                    <Image src={bride.photo} alt={`${bride.fullName}'s photo`} fill className="object-cover" sizes="288px" />
                  </div>
                  <Lotus className="absolute -bottom-5 left-1/2 h-12 w-24 -translate-x-1/2 text-[#b08a3a]" />
                </div>
              </div>
              <p className="font-serif text-sm uppercase tracking-[0.3em] text-[#b08a3a]">The Bride</p>
              <h3 className="mt-2 font-serif text-4xl text-[#7b1e1e] sm:text-5xl">{bride.fullName}</h3>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#6e5c55]">{t('couple.bride-description')}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.9, delay: 0.35, type: 'spring' }}
              className="flex items-center justify-center lg:pt-32"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#b08a3a]/50 bg-[#fff9ed] shadow-[0_12px_35px_rgba(85,35,20,.12)]">
                <span className="font-serif text-4xl text-[#8b1e1e]">ॐ</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 45 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 45 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-center"
            >
              <div className="mx-auto mb-7 w-fit">
                <div className="relative h-64 w-64 sm:h-72 sm:w-72">
                  <div className="absolute inset-0 rounded-full border border-[#b08a3a]/70 p-2" />
                  <div className="absolute inset-3 rounded-full border border-[#b08a3a]/35 p-2" />
                  <div className="absolute inset-6 overflow-hidden rounded-full border-4 border-[#fff9ed] shadow-[0_18px_45px_rgba(85,35,20,.18)]">
                    <Image src={groom.photo} alt={`${groom.fullName}'s photo`} fill className="object-cover" sizes="288px" />
                  </div>
                  <Lotus className="absolute -bottom-5 left-1/2 h-12 w-24 -translate-x-1/2 text-[#b08a3a]" />
                </div>
              </div>
              <p className="font-serif text-sm uppercase tracking-[0.3em] text-[#b08a3a]">The Groom</p>
              <h3 className="mt-2 font-serif text-4xl text-[#7b1e1e] sm:text-5xl">{groom.fullName}</h3>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#6e5c55]">{t('couple.groom-description')}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mx-auto mt-20 max-w-3xl text-center"
          >
            <OrnamentalDivider />
            <p className="mt-7 font-serif text-2xl italic leading-relaxed text-[#4a3530] sm:text-3xl">“{t('couple.love-quote')}”</p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#b08a3a]">A new chapter begins</p>
          </motion.div>
        </div>
      </div>
    </SectionBackdrop>
  );
};
