'use client';

import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Diya, Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';

interface ClosingMessageProps { bride: string; groom: string; }

export const ClosingMessage = ({ bride, groom }: ClosingMessageProps) => {
  const { t } = useTranslation('home');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .2 });

  return (
    <SectionBackdrop className="bg-[#7b1e1e] text-[#fff9ed]">
      <div ref={ref} className="relative px-4 py-28 text-center sm:py-36">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }} transition={{ duration: .8 }}>
          <p className="font-serif text-sm uppercase tracking-[.35em] text-[#d7b76b]">Until we meet under the mandap</p>
          <div className="my-7"><OrnamentalDivider /></div>
          <h2 className="font-serif text-4xl text-[#fff9ed] sm:text-5xl md:text-6xl">{t('closing-message.title')}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : .94 }} transition={{ duration: .9, delay: .15 }} className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-[#d7b76b]/30 bg-[#5e1717]/40 px-7 py-10 shadow-2xl backdrop-blur-sm sm:px-12">
          <p className="font-serif text-xl italic leading-relaxed text-[#f9ead4] sm:text-2xl md:text-3xl">“{t('closing-message.quote')}”</p>
          <div className="mx-auto my-7 h-px w-20 bg-[#d7b76b]/60" />
          <p className="text-xs uppercase tracking-[.3em] text-[#d7b76b]">{t('closing-message.with-love')}</p>
          <p className="mt-3 font-serif text-3xl text-[#fff9ed]">{groom} &amp; {bride}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }} transition={{ duration: .8, delay: .45 }} className="mt-14 flex flex-col items-center">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#d7b76b]/50 bg-[#5e1717] shadow-[0_0_60px_rgba(215,183,107,.12)]">
            <Diya className="h-20 w-20 text-[#d7b76b]" />
          </div>
          <Lotus className="mt-5 h-12 w-24 text-[#d7b76b]" />
          <p className="mt-5 font-serif text-sm tracking-[.22em] text-[#f4dfbd]">शुभमस्तु · सर्वमंगलम्</p>
          <p className="mt-3 text-xs text-[#e6ccb0]/75">With gratitude for being part of our celebration.</p>
        </motion.div>
      </div>
    </SectionBackdrop>
  );
};
