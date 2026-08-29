'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Diya, Lotus, Mandala, OrnamentalDivider, Petals, SectionBackdrop } from '@/components/indian-ornaments';

export const EventSchedule = () => {
  const { t } = useTranslation('home');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  const scheduleItems = [
    ['3:30 PM', t('schedule.guest-arrival'), t('schedule.welcome-drinks'), 'स्वागतम्', '✦'],
    ['4:00 PM', t('schedule.wedding-ceremony'), t('schedule.vows'), 'विवाह', 'ॐ'],
    ['4:30 PM', t('schedule.photography'), t('schedule.welcome-drink'), 'स्मृतियाँ', '❀'],
    ['6:30 PM', t('schedule.reception-begins'), t('schedule.dinner-celebration'), 'उत्सव', '♢'],
    ['7:30 PM', t('schedule.first-dance'), t('schedule.special-moment'), 'प्रेम', '♥'],
    ['8:00 PM', t('schedule.dancing-party'), t('schedule.celebration-continues'), 'आनन्द', '✧'],
    ['12:00 AM', t('schedule.send-off'), t('schedule.sparkler-farewell'), 'शुभ विदाई', '✦'],
  ];

  return (
    <SectionBackdrop className="border-t border-[#b08a3a]/20">
      <div ref={ref} className="relative overflow-hidden px-4 py-24 sm:py-32">
        <Petals count={12} />
        <Mandala size={330} className="absolute -right-40 top-24 text-[#b08a3a] opacity-[.08]" />
        <Mandala size={260} className="absolute -left-36 bottom-20 text-[#8b1e1e] opacity-[.06]" />

        {/* Hanging wedding-bell garland */}
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-28 sm:block">
          <div className="absolute left-[8%] top-0 h-20 w-px bg-[#b08a3a]/45" /><div className="absolute left-[8%] top-18 h-9 w-7 -translate-x-1/2 rounded-b-full border border-[#b08a3a] bg-[#d3a145]/55" />
          <div className="absolute left-[25%] top-0 h-14 w-px bg-[#b08a3a]/40" /><div className="absolute left-[25%] top-13 h-8 w-6 -translate-x-1/2 rounded-b-full border border-[#b08a3a] bg-[#d3a145]/55" />
          <div className="absolute right-[25%] top-0 h-14 w-px bg-[#b08a3a]/40" /><div className="absolute right-[25%] top-13 h-8 w-6 translate-x-1/2 rounded-b-full border border-[#b08a3a] bg-[#d3a145]/55" />
          <div className="absolute right-[8%] top-0 h-20 w-px bg-[#b08a3a]/45" /><div className="absolute right-[8%] top-18 h-9 w-7 translate-x-1/2 rounded-b-full border border-[#b08a3a] bg-[#d3a145]/55" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .8 }} className="mb-16 text-center">
            <p className="font-serif text-xs uppercase tracking-[.38em] text-[#8b1e1e] sm:text-sm">The celebrations</p>
            <h3 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('schedule.title')}</h3>
            <div className="mt-6"><OrnamentalDivider /></div>
            <p className="mx-auto mt-5 max-w-xl font-serif text-base italic text-[#6e5c55] sm:text-lg">A day of blessings, rituals, music, laughter and togetherness.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-transparent via-[#b08a3a]/65 to-transparent md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-12 md:space-y-16">
              {scheduleItems.map(([time, event, description, hindi, symbol], index) => (
                <motion.div key={`${time}-${event}`} initial={{ opacity: 0, y: 26 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 26 }} transition={{ duration: .7, delay: index * .09 }} className="relative grid items-center md:grid-cols-2">
                  <div className="absolute left-5 top-8 z-20 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                    <motion.div whileHover={{ scale: 1.08, rotate: 10 }} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#fff8e8] bg-[#8b1e1e] text-xl text-[#f6d98b] shadow-[0_8px_22px_rgba(85,28,20,.22)] sm:h-14 sm:w-14">
                      {symbol}
                    </motion.div>
                  </div>

                  <div className={`pl-14 md:pl-0 ${index % 2 === 0 ? 'md:col-start-1 md:pr-14 md:text-right' : 'md:col-start-2 md:pl-14'}`}>
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-[#c89b3c]/35 bg-[#fffaf0]/72 px-5 py-5 shadow-[0_12px_32px_rgba(75,36,22,.08)] backdrop-blur-[2px] sm:px-7 sm:py-6">
                      <div className={`absolute top-0 h-1 w-20 bg-[#c89b3c]/45 ${index % 2 === 0 ? 'right-0' : 'left-0'}`} />
                      <p className="font-serif text-sm tracking-[.18em] text-[#b08a3a]">{hindi}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[.25em] text-[#8b1e1e]">{time}</p>
                      <h4 className="mt-2 font-serif text-2xl text-[#2d2020] sm:text-3xl">{event}</h4>
                      <div className="mt-3 flex items-center gap-2 md:justify-end"><span className="h-px w-10 bg-[#c89b3c]/45"/><Diya className="h-7 w-7 text-[#b8872e]"/></div>
                      <p className="mt-1 text-sm leading-7 text-[#6e5c55]">{description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 1.05 }} className="mt-14 text-center">
            <Lotus className="mx-auto h-10 w-24 text-[#b08a3a]" />
            <p className="mt-3 font-serif text-sm tracking-[.18em] text-[#7b1e1e]">शुभ विवाह · मंगलमय उत्सव</p>
          </motion.div>
        </div>
      </div>
    </SectionBackdrop>
  );
};
