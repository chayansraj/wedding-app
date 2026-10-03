'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';
import { EVENT_VENUES, WEDDING_EVENTS, eventArt, venueMapHref } from '@/constants/events';

const PinIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Z" />
    <circle cx="12" cy="11" r="2.2" />
  </svg>
);

export const VenueInformation = () => {
  const { t } = useTranslation('home');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .15 });

  return (
    <SectionBackdrop>
      <div ref={ref} className="px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .8 }} className="mb-12 text-center sm:mb-14">
            <p className="font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">{t('venue.eyebrow')}</p>
            <h2 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('venue.location-title')}</h2>
            <div className="mt-6"><OrnamentalDivider /></div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6e5c55]">{t('venue.location-subtitle')}</p>
          </motion.div>

          <ol className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            {EVENT_VENUES.map((venue, i) => {
              const events = venue.events.map((key) => WEDDING_EVENTS.find((e) => e.key === key)!);
              const first = events[0];
              const address = t(`schedule.${first.key}-address`);
              const mapHref = venueMapHref(venue);
              return (
                <motion.li
                  key={first.key}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 35 }}
                  transition={{ duration: .7, delay: .12 + i * .1 }}
                  className="relative overflow-hidden rounded-[1.8rem] border border-[#b08a3a]/30 bg-[#fffdf5]/90 p-6 shadow-[0_18px_55px_rgba(83,42,24,.10)] sm:p-8"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#b08a3a]/20" />

                  <div className="flex items-start gap-4">
                    {/* Save-the-dates thumbnails, overlapping when a venue hosts several events */}
                    <div className="flex shrink-0 -space-x-4">
                      {events.map((event, j) => (
                        <span key={event.key} className="relative block h-16 w-16 overflow-hidden rounded-full border-2 border-[#fffdf5] shadow-[0_6px_16px_rgba(60,20,10,.22)] ring-1 ring-[#d3a145]/70 sm:h-20 sm:w-20" style={{ zIndex: events.length - j }}>
                          <img src={eventArt(event.art, true)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                        </span>
                      ))}
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                      <ul className="space-y-2">
                        {events.map((event) => (
                          <li key={event.key} className="leading-tight">
                            <h3 className="font-serif text-2xl text-[#2d2020] sm:text-3xl">{t(`schedule.${event.key}`)}</h3>
                            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[.2em] text-[#8b1e1e]">{t(`schedule.${event.key}-date`)} · {t(`schedule.${event.key}-time`)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="my-5 flex items-center gap-3 text-[#b08a3a]"><span className="h-px flex-1 bg-current/30" /><Lotus className="h-7 w-14" /><span className="h-px flex-1 bg-current/30" /></div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b08a3a]/40 bg-[#f8ead0] text-[#8b1e1e]"><PinIcon className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[.26em] text-[#b08a3a]">{t('venue.location-label')}</p>
                      <h4 className="mt-1 font-serif text-2xl leading-tight text-[#7b1e1e]">{t(`schedule.${first.key}-venue`)}</h4>
                      {address ? <p className="mt-1 text-sm leading-6 text-[#6e5c55]">{address}</p> : null}
                    </div>
                  </div>

                  {mapHref ? (
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#8b1e1e] px-6 py-3 text-sm font-semibold text-[#8b1e1e] transition hover:bg-[#8b1e1e] hover:text-[#fff9ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b1e1e]/60"
                    >
                      <PinIcon className="h-4 w-4" />
                      {t('venue.view-map')}
                    </a>
                  ) : null}
                </motion.li>
              );
            })}
          </ol>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: .8, delay: .55 }} className="mt-10 flex items-center justify-center gap-2 text-center font-serif text-sm italic tracking-[.08em] text-[#7b1e1e]">
            <Lotus className="h-6 w-12 shrink-0 text-[#b08a3a]" />
            {t('venue.transport-note')}
            <Lotus className="h-6 w-12 shrink-0 -scale-x-100 text-[#b08a3a]" />
          </motion.p>
        </div>
      </div>
    </SectionBackdrop>
  );
};
