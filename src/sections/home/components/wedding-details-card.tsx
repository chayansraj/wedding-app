'use client';

import { motion } from 'motion/react';
import { formatWeddingTime, generateGoogleCalendarLink, generateMapLink } from '@/lib/wedding-utils';
import type { WeddingConfigType } from '@/types';
import { useTranslation } from 'react-i18next';
import { useTranslate } from '@/locales';
import { OrnamentalDivider, Lotus, SectionBackdrop } from '@/components/indian-ornaments';

interface WeddingDetailsCardProps { date: Date; venue: WeddingConfigType['venue']; }

export const WeddingDetailsCard = ({ date, venue }: WeddingDetailsCardProps) => {
  const { currentLang } = useTranslate();
  const { t } = useTranslation('home');
  const calendarEvent = { title: t('details.our-wedding-day'), start: date, end: new Date(date.getTime() + 5 * 60 * 60 * 1000), description: t('details.join-us'), location: venue.ceremony.address };

  return (
    <SectionBackdrop>
      <div className="px-4 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }} className="text-center">
            <p className="font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">Mark your calendar</p>
            <h2 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('details.title')}</h2>
            <div className="my-6"><OrnamentalDivider /></div>
            <p className="mx-auto max-w-2xl text-base leading-8 text-[#6e5c55] sm:text-lg">{t('details.join-us-text')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .8, delay: .15 }} className="relative mt-12 overflow-hidden rounded-[2rem] border border-[#b08a3a]/35 bg-[#fffdf5]/95 p-7 shadow-[0_20px_60px_rgba(83,42,24,.12)] sm:p-12">
            <div className="absolute right-5 top-5 text-[#b08a3a]/50"><Lotus className="h-14 w-24" /></div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[.35em] text-[#b08a3a]">{t('details.date')}</p>
              <div className="mt-6 grid grid-cols-3 items-end gap-3 sm:gap-8">
                <DatePart value={String(date.getDate())} label={t('details.day')} />
                <DatePart value={date.toLocaleDateString(currentLang.numberFormat.code, { month: 'long' })} label={t('details.month')} wide />
                <DatePart value={String(date.getFullYear())} label={t('details.year')} />
              </div>
              <div className="mx-auto my-8 h-px max-w-xl bg-[#b08a3a]/25" />
              <p className="font-serif text-2xl text-[#7b1e1e] sm:text-3xl">{date.toLocaleDateString(currentLang.numberFormat.code, { weekday: 'long' })}</p>
              <p className="mt-2 text-sm uppercase tracking-[.2em] text-[#7c665b]">{formatWeddingTime(date, currentLang.numberFormat.code)}</p>
              <p className="mt-5 font-serif text-lg italic text-[#6e5c55]">{t('details.mark-calendar')}</p>
              <motion.a href={generateGoogleCalendarLink(calendarEvent)} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} className="mt-7 inline-flex rounded-full bg-[#8b1e1e] px-7 py-3.5 text-sm font-semibold text-[#fff9ed] shadow-lg">{t('details.add-to-calendar')} →</motion.a>
            </div>
          </motion.div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <VenueMiniCard title={t('details.ceremony')} name={venue.ceremony.name} address={venue.ceremony.address} time={venue.ceremony.time} href={generateMapLink(venue.ceremony.name)} button={t('details.get-directions')} />
            <VenueMiniCard title={t('details.reception')} name={venue.reception.name} address={venue.reception.address} time={venue.reception.time} href={generateMapLink(venue.reception.name)} button={t('details.get-directions')} />
          </div>
        </div>
      </div>
    </SectionBackdrop>
  );
};

function DatePart({ value, label, wide = false }: { value: string; label: string; wide?: boolean }) {
  return <div><div className={`font-serif text-[#8b1e1e] ${wide ? 'text-2xl sm:text-4xl' : 'text-5xl sm:text-6xl'}`}>{value}</div><p className="mt-2 text-[10px] uppercase tracking-[.25em] text-[#9a806f] sm:text-xs">{label}</p></div>;
}

function VenueMiniCard({ title, name, address, time, href, button }: { title: string; name: string; address: string; time: string; href: string; button: string }) {
  return <motion.article whileHover={{ y: -3 }} className="rounded-[1.5rem] border border-[#b08a3a]/25 bg-[#fffdf5] p-7 shadow-[0_12px_35px_rgba(83,42,24,.08)]"><p className="text-xs uppercase tracking-[.3em] text-[#b08a3a]">{title}</p><h3 className="mt-3 font-serif text-2xl text-[#7b1e1e]">{name}</h3><p className="mt-2 text-sm leading-6 text-[#6e5c55]">{address}</p><p className="mt-4 border-y border-[#b08a3a]/20 py-3 text-sm font-semibold text-[#4f3830]">{time}</p><a href={href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-full border border-[#8b1e1e] px-5 py-2.5 text-xs font-semibold text-[#8b1e1e] transition hover:bg-[#8b1e1e] hover:text-[#fff9ed]">{button}</a></motion.article>;
}
