'use client';

import i18next from 'i18next';
import { useEffect, useMemo } from 'react';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';

import { i18nOptions } from './config-locales';

// ----------------------------------------------------------------------

const init = { ...i18nOptions(), detection: { caches: ['cookie'] } };

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)
    )
  )
  .init(init);

// ----------------------------------------------------------------------

export function I18nProvider({
  lang,
  children,
}: {
  lang?: string;
  children: React.ReactNode;
}) {
  useMemo(() => {
    if (lang) {
      // eslint-disable-next-line import/no-named-as-default-member
      i18next.changeLanguage(lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep <html lang> in sync so :lang / [lang] CSS and screen readers follow the toggle.
  useEffect(() => {
    const apply = (lng: string) => { document.documentElement.lang = lng; };
    apply(i18next.resolvedLanguage ?? i18next.language);
    i18next.on('languageChanged', apply);
    return () => { i18next.off('languageChanged', apply); };
  }, []);

  return <Provider i18n={i18next}>{children}</Provider>;
}
