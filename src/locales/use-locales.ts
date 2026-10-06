'use client';

import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/navigation';

import { allLangs } from './all-langs';
import { fallbackLng, changeLangMessages as messages } from './config-locales';
import type resources from '@/types/resources';
import { toast } from 'sonner';

// ----------------------------------------------------------------------

const ANCHOR_HOLD_MS = 1200;

// Translated copy reflows every section above the viewport, so the page would
// jump by the accumulated height difference. iOS Safari has no native scroll
// anchoring, so pin the section currently at the top of the screen ourselves
// and keep correcting until the language-change re-renders have settled.
function holdSectionInPlace() {
  if (typeof window === 'undefined') return;
  // First element whose top edge is in the upper part of the screen: everything
  // that reflows above it moves it, so pinning it pins what the user is reading.
  const limit = window.innerHeight * 0.6;
  const candidates = Array.from(document.querySelectorAll<HTMLElement>('section[id], section[id] :is(h1, h2, h3, h4, p, img, button, li)'));
  const anchor =
    candidates.find((el) => { const r = el.getBoundingClientRect(); return r.height > 0 && r.top >= 0 && r.top < limit; }) ??
    candidates.find((el) => el.getBoundingClientRect().bottom > 0);
  if (!anchor) return;

  const top = anchor.getBoundingClientRect().top;
  const until = performance.now() + ANCHOR_HOLD_MS;
  const correct = () => {
    if (!anchor.isConnected) return;
    const delta = anchor.getBoundingClientRect().top - top;
    if (Math.abs(delta) >= 0.5) window.scrollBy({ top: delta, behavior: 'instant' });
    if (performance.now() < until) requestAnimationFrame(correct);
  };
  requestAnimationFrame(correct);
}

export function useTranslate(ns?: typeof resources) {
  const router = useRouter();

  // @ts-expect-error - err
  const { t, i18n } = useTranslation(ns);

  const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];

  const currentLang = allLangs.find((lang) => lang.value === i18n.language);

  const onChangeLang = useCallback(
    async (newLang: string) => {
      try {
        holdSectionInPlace();
        const langChangePromise = i18n.changeLanguage(newLang);

        const currentMessages =
          messages[newLang as keyof typeof messages] ?? messages.en;

        toast.promise(langChangePromise, {
          loading: currentMessages.loading,
          success: () => currentMessages.success,
          error: currentMessages.error,
          id: `lang-change-${newLang}`,
          position: 'top-right',
          closeButton: true,
        });

        if (currentLang) {
          dayjs.locale(currentLang.adapterLocale);
        }

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [currentLang, i18n, router]
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang: currentLang ?? fallback,
  };
}
