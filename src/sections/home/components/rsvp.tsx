'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Diya, Lotus, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';

const initialForm = { name: '', email: '', attendance: '', guests: '1', dietaryRestrictions: '', message: '' };

export const RSVP = () => {
  const { t } = useTranslation('home');
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .15 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setIsSubmitted(true); setTimeout(() => { setIsSubmitted(false); setFormData(initialForm); }, 3000); };

  if (isSubmitted) return (
    <SectionBackdrop className="bg-[#f8f0e1]">
      <div className="px-4 py-28 text-center">
        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-2xl rounded-[2rem] border border-[#b08a3a]/35 bg-[#fffdf5] p-12 shadow-2xl">
          <Diya className="mx-auto h-20 w-20 text-[#b08a3a]" />
          <h3 className="mt-6 font-serif text-4xl text-[#7b1e1e]">{t('rsvp.thank-you')}</h3>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#6e5c55]">{t('rsvp.thank-you-received')}</p>
          <div className="mt-7"><OrnamentalDivider /></div>
        </motion.div>
      </div>
    </SectionBackdrop>
  );

  return (
    <SectionBackdrop className="bg-[#f8f0e1]">
      <div ref={ref} className="px-4 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .8 }} className="mb-14 text-center">
            <p className="font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">Your presence is precious to us</p>
            <h2 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('rsvp.title')}</h2>
            <div className="my-6"><OrnamentalDivider /></div>
            <p className="mx-auto max-w-2xl text-base leading-8 text-[#6e5c55]">{t('rsvp.subtitle')}</p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.35fr_.65fr]">
            <motion.form initial={{ opacity: 0, x: -30 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }} transition={{ duration: .7, delay: .15 }} onSubmit={handleSubmit} className="rounded-[2rem] border border-[#b08a3a]/30 bg-[#fffdf5] p-7 shadow-[0_18px_55px_rgba(83,42,24,.1)] sm:p-10">
              <div className="mb-8 text-center"><p className="font-serif text-2xl text-[#7b1e1e]">{t('rsvp.confirm-attendance')}</p><div className="mx-auto mt-3 h-px w-16 bg-[#b08a3a]/60" /></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label={`${t('rsvp.full-name')} *`} value={formData.name} onChange={handleChange} required />
                <Field id="email" type="email" label={`${t('rsvp.email-address')} *`} value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mt-5"><label htmlFor="attendance" className="label">{t('rsvp.will-attend')} *</label><select id="attendance" name="attendance" value={formData.attendance} onChange={handleChange} required className="input"><option value="">{t('rsvp.please-select')}</option><option value="yes">{t('rsvp.yes-there')}</option><option value="no">{t('rsvp.no-cant')}</option></select></div>
              {formData.attendance === 'yes' && <div className="mt-5 grid gap-5 sm:grid-cols-2"><div><label htmlFor="guests" className="label">{t('rsvp.number-guests')}</label><select id="guests" name="guests" value={formData.guests} onChange={handleChange} className="input"><option value="1">1 {t('rsvp.guest-count')}</option><option value="2">2 {t('rsvp.guests-count')}</option><option value="3">3 {t('rsvp.guests-count')}</option><option value="4">4 {t('rsvp.guests-count')}</option></select></div><Field id="dietaryRestrictions" label={t('rsvp.dietary-restrictions')} value={formData.dietaryRestrictions} onChange={handleChange} /></div>}
              <div className="mt-5"><label htmlFor="message" className="label">{t('rsvp.message-couple')}</label><textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="input resize-none" placeholder={t('rsvp.message-placeholder')} /></div>
              <button type="submit" className="mt-7 w-full rounded-full bg-[#8b1e1e] px-7 py-4 text-sm font-semibold tracking-wide text-[#fff9ed] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#701717]">{t('rsvp.send-rsvp')} →</button>
            </motion.form>

            <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 30 }} transition={{ duration: .7, delay: .25 }} className="flex flex-col justify-between rounded-[2rem] border border-[#b08a3a]/30 bg-[#8b1e1e] p-8 text-[#fff9ed] shadow-[0_18px_55px_rgba(83,42,24,.16)] sm:p-10">
              <div><Diya className="h-20 w-20 text-[#d7b76b]" /><h3 className="mt-7 font-serif text-3xl">A seat awaits you</h3><p className="mt-4 text-sm leading-7 text-[#f5dfc4]/85">Please let us know if you can join us in celebrating this beginning.</p></div>
              <div className="mt-10 border-t border-[#d7b76b]/30 pt-7"><p className="text-xs uppercase tracking-[.28em] text-[#d7b76b]">{t('rsvp.deadline')}</p><p className="mt-2 font-serif text-xl">{t('rsvp.deadline-date')}</p><p className="mt-3 text-xs leading-6 text-[#f5dfc4]/75">{t('rsvp.deadline-help')}</p></div>
              <Lotus className="mt-10 h-12 w-24 text-[#d7b76b]" />
            </motion.aside>
          </div>
        </div>
      </div>
    </SectionBackdrop>
  );
};

function Field({ id, label, value, onChange, type = 'text', required = false }: { id: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; required?: boolean }) {
  return <div><label htmlFor={id} className="label">{label}</label><input id={id} name={id} type={type} value={value} onChange={onChange} required={required} className="input" placeholder={label.replace(' *', '')} /></div>;
}
