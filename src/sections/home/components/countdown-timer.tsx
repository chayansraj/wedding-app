'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';

interface CountdownTimerProps { targetDate: Date; }

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const { t } = useTranslation('home');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .25 });

  useEffect(() => {
    const update = () => {
      const distance = targetDate.getTime() - Date.now();
      if (distance <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    [t('details.day'), timeLeft.days],
    [t('details.hours'), timeLeft.hours],
    [t('details.minutes'), timeLeft.minutes],
    [t('details.seconds'), timeLeft.seconds],
  ];

  return (
    <SectionBackdrop className="border-t border-[#b08a3a]/15">
      <div ref={ref} className="px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .8 }}>
            <p className="font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">A day to remember</p>
            <h2 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl">{t('details.countdown-title')}</h2>
            <div className="my-6"><OrnamentalDivider /></div>
            <p className="text-[#6e5c55]">{t('details.countdown-subtitle')}</p>
          </motion.div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {units.map(([label, value], index) => (
              <motion.div key={label} initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .55, delay: index * .08 }} className="rounded-2xl border border-[#b08a3a]/35 bg-[#fffdf5]/90 px-3 py-6 shadow-[0_12px_35px_rgba(83,42,24,.08)]">
                <div className="font-serif text-4xl text-[#8b1e1e] sm:text-5xl">{String(value).padStart(2, '0')}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[.25em] text-[#9a806f] sm:text-xs">{label}</div>
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: .6 }} className="mt-9 font-serif text-lg italic text-[#6e5c55]">
            {timeLeft.days > 0 ? `${timeLeft.days} ${t('details.days-until')}` : timeLeft.hours > 0 ? `${timeLeft.hours} ${t('details.hours-until')}` : t('details.moment-arrived')}
          </motion.p>
        </div>
      </div>
    </SectionBackdrop>
  );
};
