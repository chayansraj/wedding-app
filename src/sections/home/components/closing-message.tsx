'use client';

import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';

export const ClosingMessage = () => {
  const { t } = useTranslation('home');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .2 });

  return (
    <SectionBackdrop className="border-t border-[#b08a3a]/15">
      <div ref={ref} className="relative px-4 py-10 text-center sm:py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }} transition={{ duration: .8 }}>
          <div className="mb-6"><OrnamentalDivider /></div>
          <h2 className="font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('closing-message.title')}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : .94 }} transition={{ duration: .9, delay: .15 }} className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-[#d7b76b]/40 bg-[#7b1e1e] px-7 py-8 shadow-[0_18px_55px_rgba(83,42,24,.18)] sm:px-12 sm:py-10">
          <p className="font-serif text-xl italic leading-relaxed text-[#f9ead4] sm:text-2xl md:text-3xl">“{t('closing-message.quote')}”</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }} transition={{ duration: .8, delay: .45 }} className="mt-8 flex flex-col items-center">
          <Lotus className="h-12 w-24 text-[#b08a3a]" />
          <p className="mt-4 font-serif text-lg font-semibold tracking-[.12em] text-[#7b1e1e] sm:text-xl">शुभमस्तु · सर्वमंगलम्</p>
          <p className="mt-3 text-sm text-[#6e5c55]">{t('closing-message.gratitude')}</p>
        </motion.div>
      </div>
    </SectionBackdrop>
  );
};
