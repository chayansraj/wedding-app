export const fallbackLng = 'en';
export const languages = ['en', 'hi'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return { lng, fallbackLng, ns, defaultNS, fallbackNS: defaultNS, supportedLngs: languages };
}

export const changeLangMessages = {
  en: { success: 'Language changed to English.', error: 'Could not change language.', loading: 'Changing language...' },
  hi: { success: 'भाषा हिंदी में बदल दी गई।', error: 'भाषा बदलने में समस्या हुई।', loading: 'भाषा बदली जा रही है...' },
};
