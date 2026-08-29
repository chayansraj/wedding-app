'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { generateMapLink } from '@/lib/wedding-utils';
import { Diya, Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';

interface VenueInformationProps { venue: WeddingConfigType['venue']; }

export const VenueInformation = ({ venue }: VenueInformationProps) => {
  const { t } = useTranslation('home');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .15 });

  const venueCard = (kind: 'ceremony' | 'reception') => {
    const data = venue[kind];
    const isCeremony = kind === 'ceremony';
    return (
      <motion.article initial={{ opacity: 0, y: 35 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 35 }} transition={{ duration: .8, delay: isCeremony ? .15 : .3 }} className="group relative overflow-hidden rounded-[2rem] border border-[#b08a3a]/30 bg-[#fffdf5]/90 p-7 shadow-[0_18px_55px_rgba(83,42,24,.10)] sm:p-9">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#b08a3a]/20" />
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#b08a3a]">{isCeremony ? 'The sacred ceremony' : 'The celebration'}</p>
            <h3 className="mt-3 font-serif text-3xl text-[#7b1e1e] sm:text-4xl">{isCeremony ? t('venue.ceremony-time') : t('venue.reception-time')}</h3>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#b08a3a]/40 bg-[#f8ead0] text-[#8b1e1e]"><Diya className="h-9 w-9" /></div>
        </div>
        <div className="my-7"><Lotus className="h-10 w-20 text-[#b08a3a]" /></div>
        <h4 className="font-serif text-2xl text-[#2d2020]">{data.name}</h4>
        <p className="mt-2 text-sm leading-7 text-[#6e5c55]">{data.address}</p>
        <div className="mt-5 border-y border-[#b08a3a]/20 py-4 text-sm font-medium text-[#8b1e1e]">{data.time}</div>
        <div className="mt-6 grid gap-2 text-sm leading-6 text-[#6e5c55]">
          <p>• {isCeremony ? t('venue.arrive-early') : t('venue.welcome-drink')}</p>
          <p>• {isCeremony ? t('venue.parking') : t('venue.dancing')}</p>
          <p>• {isCeremony ? t('venue.wheelchair') : t('venue.valet')}</p>
        </div>
        <button onClick={() => window.open(generateMapLink(data.name), '_blank')} className="mt-7 w-full rounded-full border border-[#8b1e1e] px-6 py-3 text-sm font-semibold text-[#8b1e1e] transition hover:bg-[#8b1e1e] hover:text-[#fff9ed]">{t('venue.view-map')}</button>
      </motion.article>
    );
  };

  return (
    <SectionBackdrop>
      <div ref={ref} className="px-4 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .8 }} className="mb-14 text-center">
            <p className="font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">Where we gather</p>
            <h2 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('venue.location-title')}</h2>
            <div className="mt-6"><OrnamentalDivider /></div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6e5c55]">{t('venue.location-subtitle')}</p>
          </motion.div>
          <div className="grid gap-8 lg:grid-cols-2">{venueCard('ceremony')}{venueCard('reception')}</div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }} transition={{ duration: .8, delay: .5 }} className="mx-auto mt-10 max-w-3xl rounded-[1.5rem] border border-[#b08a3a]/20 bg-[#8b1e1e] p-7 text-center text-[#fff9ed] shadow-xl">
            <p className="font-serif text-xl">{t('venue.transportation')}</p>
            <p className="mt-2 text-sm leading-7 text-[#f7e6d0]/90">{t('venue.shuttle-service')}</p>
          </motion.div>
        </div>
      </div>
    </SectionBackdrop>
  );
};
