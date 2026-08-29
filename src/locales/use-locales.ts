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

export function useTranslate(ns?: typeof resources) {
  const router = useRouter();

  // @ts-expect-error - err
  const { t, i18n } = useTranslation(ns);

  const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];

  const currentLang = allLangs.find((lang) => lang.value === i18n.language);

  const onChangeLang = useCallback(
    async (newLang: string) => {
      try {
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
