'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Diya, OrnamentalDivider, SectionBackdrop } from '@/components/indian-ornaments';
import { RSVP_CONTACTS } from '@/constants/rsvp';
import { getLastRsvp, submitRsvp, type RsvpAnswer, type RsvpRecord } from '@/lib/rsvp-client';

const initialForm = { name: '', attendance: '' as '' | RsvpAnswer, website: '' };

export const RSVP = () => {
  const { t, i18n } = useTranslation('home');
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previous, setPrevious] = useState<RsvpRecord | null>(null);
  const lastSubmitAt = useRef(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .15 });

  // Prefill from this device's earlier reply so a returning guest can just
  // update instead of starting over. Never blocks a new submission.
  useEffect(() => {
    const last = getLastRsvp();
    if (last) {
      setPrevious(last);
      setFormData((prev) => ({ ...prev, name: last.name, attendance: last.attendance }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    if (status === 'sending' || !name || !formData.attendance) return;
    // Honeypot (hidden field) + a 5s guard against double taps / rapid replays.
    if (formData.website || Date.now() - lastSubmitAt.current < 5000) { setIsSubmitted(true); return; }
    lastSubmitAt.current = Date.now();

    setStatus('sending');
    const ok = await submitRsvp({ name, attendance: formData.attendance, lang: i18n.resolvedLanguage ?? i18n.language });
    if (!ok) { setStatus('error'); return; }
    setStatus('idle');
    setPrevious(getLastRsvp());
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  if (isSubmitted) return (
    <SectionBackdrop className="border-t border-[#b08a3a]/15">
      <div className="px-4 py-10 text-center sm:py-16">
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
    <SectionBackdrop className="border-t border-[#b08a3a]/15">
      <div ref={ref} className="px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }} transition={{ duration: .8 }} className="mb-14 text-center">
            <p className="font-serif text-sm uppercase tracking-[.35em] text-[#8b1e1e]">{t('rsvp.eyebrow')}</p>
            <h2 className="mt-3 font-serif text-4xl text-[#2d2020] sm:text-5xl md:text-6xl">{t('rsvp.title')}</h2>
            <div className="my-6"><OrnamentalDivider /></div>
            <p className="mx-auto max-w-2xl text-base leading-8 text-[#6e5c55]">{t('rsvp.subtitle')}</p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.35fr_.65fr]">
            <motion.form initial={{ opacity: 0, x: -30 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }} transition={{ duration: .7, delay: .15 }} onSubmit={handleSubmit} className="relative rounded-[2rem] border border-[#b08a3a]/30 bg-[#fffdf5] p-7 shadow-[0_18px_55px_rgba(83,42,24,.1)] sm:p-10">
              <div className="mb-8 text-center"><p className="font-serif text-2xl text-[#7b1e1e]">{t('rsvp.confirm-attendance')}</p><div className="mx-auto mt-3 h-px w-16 bg-[#b08a3a]/60" /></div>
              {previous ? (
                <p className="mb-6 rounded-xl border border-[#b08a3a]/30 bg-[#fff6e3] px-4 py-3 text-sm leading-6 text-[#6e5c55]">
                  {t('rsvp.replied-before', { name: previous.name, answer: previous.attendance === 'yes' ? t('rsvp.yes-short') : t('rsvp.maybe') })}
                </p>
              ) : null}
              <Field id="name" label={`${t('rsvp.full-name')} *`} value={formData.name} onChange={handleChange} required />
              {/* Honeypot: invisible to people, tempting to bots */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} /></div>
              <fieldset className="mt-6">
                <legend className="label">{t('rsvp.will-attend')} *</legend>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {(['yes', 'maybe'] as const).map((value) => (
                    <label key={value} className={`flex cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition ${formData.attendance === value ? 'border-[#8b1e1e] bg-[#8b1e1e] text-[#fff9ed] shadow-md' : 'border-[#b08a3a]/50 bg-[#fffaf0] text-[#7b1e1e] hover:border-[#8b1e1e]/70'}`}>
                      <input type="radio" name="attendance" value={value} checked={formData.attendance === value} onChange={handleChange} required className="sr-only" />
                      <span aria-hidden="true">{value === 'yes' ? '✔' : '✧'}</span>
                      {value === 'yes' ? t('rsvp.yes-short') : t('rsvp.maybe')}
                    </label>
                  ))}
                </div>
              </fieldset>
              {status === 'error' ? <p role="alert" className="mt-5 text-sm leading-6 text-[#8b1e1e]">{t('rsvp.error')}</p> : null}
              <button type="submit" disabled={status === 'sending'} className="mt-7 w-full rounded-full bg-[#8b1e1e] px-7 py-4 text-sm font-semibold tracking-wide text-[#fff9ed] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#701717] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0">
                {status === 'sending' ? t('rsvp.sending') : previous ? t('rsvp.update-rsvp') : t('rsvp.send-rsvp')} →
              </button>
            </motion.form>

            <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 30 }} transition={{ duration: .7, delay: .25 }} className="self-start rounded-[2rem] border border-[#b08a3a]/30 bg-[#8b1e1e] p-7 text-[#fff9ed] shadow-[0_18px_55px_rgba(83,42,24,.16)] sm:p-9">
              <p className="text-xs uppercase tracking-[.28em] text-[#d7b76b]">{t('rsvp.or-call')}</p>
              <h3 className="mt-2 font-serif text-3xl">{t('rsvp.rsvp-to')}</h3>
              <ul className="mt-5 space-y-4">
                {RSVP_CONTACTS.map((contact) => (
                  <li key={contact.name} className="flex items-center justify-between gap-4 border-t border-[#d7b76b]/30 pt-4">
                    <div>
                      <p className="font-serif text-xl">{contact.name}</p>
                      {contact.phone ? <p className="mt-0.5 text-sm tracking-wide text-[#f5dfc4]/85">{contact.phone}</p> : null}
                    </div>
                    {contact.phone ? <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="shrink-0 rounded-full border border-[#d7b76b]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[#f6d98b] transition hover:bg-[#d7b76b] hover:text-[#5a1010]">{t('rsvp.call')}</a> : null}
                  </li>
                ))}
              </ul>
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
