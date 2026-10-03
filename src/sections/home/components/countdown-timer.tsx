'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';

interface CountdownTimerProps { targetDate: Date; }

/* One half of a split-flap card. The inner span is the full card height so a
   centred digit is cut exactly at the hinge. */
const Half = ({ pos, className = '', children }: { pos: 'top' | 'bottom'; className?: string; children: ReactNode }) => (
  <div className={`absolute left-0 h-1/2 w-full overflow-hidden border border-[#b08a3a]/35 bg-[#fffdf5] ${pos === 'top' ? 'top-0 rounded-t-xl border-b-0' : 'bottom-0 rounded-b-xl border-t-0'} ${className}`}>
    <span className={`absolute left-0 flex h-[200%] w-full items-center justify-center font-serif text-3xl tabular-nums text-[#8b1e1e] sm:text-5xl ${pos === 'top' ? 'top-0' : 'bottom-0'}`}>{children}</span>
  </div>
);

const FlipUnit = ({ value, label }: { value: number; label: string }) => {
  const prevRef = useRef(value);
  const prev = prevRef.current;
  useEffect(() => { prevRef.current = value; }, [value]);

  const cur = String(value).padStart(2, '0');
  const old = String(prev).padStart(2, '0');
  const flipping = prev !== value;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-16 w-full shadow-[0_12px_30px_rgba(83,42,24,.12)] sm:h-24" style={{ perspective: 600 }}>
        <Half pos="top">{cur}</Half>
        <Half pos="bottom">{old}</Half>
        {flipping && (
          <>
            <Half key={`t${cur}`} pos="top" className="flip-top">{old}</Half>
            <Half key={`b${cur}`} pos="bottom" className="flip-bottom">{cur}</Half>
          </>
        )}
        <div className="pointer-events-none absolute left-0 top-1/2 z-10 h-px w-full bg-[#b08a3a]/40" />
      </div>
      <div className="mt-2 text-[9px] uppercase tracking-[.22em] text-[#9a806f] sm:mt-3 sm:text-xs">{label}</div>
    </div>
  );
};

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

  const units: [string, number][] = [
    [t('details.day'), timeLeft.days],
    [t('details.hours'), timeLeft.hours],
    [t('details.minutes'), timeLeft.minutes],
    [t('details.seconds'), timeLeft.seconds],
  ];

  return (
    <SectionBackdrop className="border-t border-[#b08a3a]/15">
      <div ref={ref} className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .8 }}>
            <p className="font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">{t('details.countdown-eyebrow')}</p>
            <h2 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl">{t('details.countdown-title')}</h2>
            <div className="my-5"><OrnamentalDivider /></div>
            <p className="text-[#6e5c55]">{t('details.countdown-subtitle')}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .6, delay: .15 }} className="mx-auto mt-8 grid max-w-xl grid-cols-4 gap-2 sm:gap-4">
            {units.map(([label, value]) => <FlipUnit key={label} value={value} label={label} />)}
          </motion.div>
        </div>
      </div>
    </SectionBackdrop>
  );
};
