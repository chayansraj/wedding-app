'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { SectionBackdrop, OrnamentalDivider } from '@/components/indian-ornaments';

export const EventSchedule = () => {
  const { t } = useTranslation('home');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const scheduleItems = [
    ['3:30 PM', t('schedule.guest-arrival'), t('schedule.welcome-drinks'), 'स्वागतम्'],
    ['4:00 PM', t('schedule.wedding-ceremony'), t('schedule.vows'), 'विवाह'],
    ['4:30 PM', t('schedule.photography'), t('schedule.welcome-drink'), 'स्मृतियाँ'],
    ['6:30 PM', t('schedule.reception-begins'), t('schedule.dinner-celebration'), 'उत्सव'],
    ['7:30 PM', t('schedule.first-dance'), t('schedule.special-moment'), 'प्रेम'],
    ['8:00 PM', t('schedule.dancing-party'), t('schedule.celebration-continues'), 'आनन्द'],
    ['12:00 AM', t('schedule.send-off'), t('schedule.sparkler-farewell'), 'शुभ विदाई'],
  ];

  return (
    <SectionBackdrop className="border-t border-[#b08a3a]/15">
      <div ref={ref} className="px-4 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .8 }} className="mb-16 text-center">
            <p className="font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">The celebrations</p>
            <h3 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('schedule.title')}</h3>
            <div className="mt-6"><OrnamentalDivider /></div>
          </motion.div>

          <div className="relative">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-transparent via-[#b08a3a]/60 to-transparent md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-10 md:space-y-14">
              {scheduleItems.map(([time, event, description, hindi], index) => (
                <motion.div key={`${time}-${event}`} initial={{ opacity: 0, y: 28 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }} transition={{ duration: .65, delay: index * .08 }} className={`relative grid items-center gap-6 pl-14 md:grid-cols-2 md:pl-0 ${index % 2 ? 'md:[&>div:first-child]:col-start-2' : ''}`}>
                  <div className={`hidden md:block ${index % 2 ? 'md:col-start-1 md:row-start-1 md:text-right md:pr-10' : 'md:col-start-1 md:row-start-1 md:text-right md:pr-10'}`}>
                    {index % 2 === 0 ? <EventCopy time={time} event={event} description={description} hindi={hindi} align="right" /> : null}
                  </div>
                  <div className="absolute left-5 top-8 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#fff9ed] bg-[#8b1e1e] text-[#fff9ed] shadow-[0_5px_18px_rgba(80,20,20,.2)]">
                      <span className="text-xs">✦</span>
                    </div>
                  </div>
                  <div className={`${index % 2 ? 'md:col-start-1 md:row-start-1 md:pr-10 md:text-right' : 'md:col-start-2 md:row-start-1 md:pl-10 md:text-left'}`}>
                    {index % 2 ? <EventCopy time={time} event={event} description={description} hindi={hindi} align="left" /> : <div className="md:hidden"><EventCopy time={time} event={event} description={description} hindi={hindi} /></div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionBackdrop>
  );
};

function EventCopy({ time, event, description, hindi, align = 'left' }: { time: string; event: string; description: string; hindi: string; align?: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'md:text-right' : 'md:text-left'}>
      <p className="font-serif text-sm tracking-[.18em] text-[#b08a3a]">{hindi}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[.25em] text-[#8b1e1e]">{time}</p>
      <h4 className="mt-2 font-serif text-2xl text-[#2d2020] sm:text-3xl">{event}</h4>
      <p className="mt-2 text-sm leading-7 text-[#6e5c55]">{description}</p>
    </div>
  );
}
