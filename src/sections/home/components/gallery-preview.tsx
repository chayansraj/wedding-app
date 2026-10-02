'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';

export const GalleryPreview = () => {
  const { t } = useTranslation('home');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .12 });

  const memories = [
    ['engagement', t('gallery.engagement'), t('gallery.engagement-caption')],
    ['travel', t('gallery.travel'), t('gallery.travel-caption')],
    ['date', t('gallery.date'), t('gallery.date-caption')],
    ['proposal', t('gallery.proposal'), t('gallery.proposal-caption')],
    ['family', t('gallery.family'), t('gallery.family-caption')],
    ['friends', t('gallery.friends'), t('gallery.friends-caption')],
  ];

  return (
    <SectionBackdrop className="bg-[#f8f0e1]">
      <div ref={ref} className="px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .8 }} className="mb-14 text-center">
            <p className="font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">{t('gallery.eyebrow')}</p>
            <h2 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('gallery.journey-title')}</h2>
            <div className="mt-6"><OrnamentalDivider /></div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6e5c55]">{t('gallery.journey-subtitle')}</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memories.map(([key, description, caption], index) => (
              <motion.div key={key} initial={{ opacity: 0, y: 35, rotate: index % 2 ? 1.2 : -1.2 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 35, rotate: inView ? (index % 2 ? 1.2 : -1.2) : 0 }} transition={{ duration: .65, delay: index * .08 }} className="group rounded-sm bg-[#fffdf5] p-3 shadow-[0_15px_40px_rgba(83,42,24,.12)]">
                <div className="relative aspect-[4/3] overflow-hidden border border-[#b08a3a]/25 bg-[linear-gradient(135deg,#f1dfbd,#f8eee0)]">
                  <div className="absolute inset-5 border border-[#b08a3a]/35" />
                  <Lotus className="absolute left-1/2 top-1/2 h-20 w-32 -translate-x-1/2 -translate-y-1/2 text-[#8b1e1e]/40 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute bottom-4 left-0 right-0 text-center font-serif text-lg text-[#7b1e1e]">{description}</div>
                </div>
                <div className="px-2 pb-2 pt-4 text-center">
                  <p className="font-serif text-lg text-[#2d2020]">{caption}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[.25em] text-[#b08a3a]">{key}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-[#8c7568]">{t('gallery.placeholder-note')}</p>
        </div>
      </div>
    </SectionBackdrop>
  );
};
