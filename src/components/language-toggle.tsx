'use client';

import { useTranslate } from '@/locales';
import { motion } from 'motion/react';
import { useCallback } from 'react';

export function LanguageToggle() {
  const { onChangeLang, currentLang } = useTranslate();
  const isHindi = currentLang?.value === 'hi';

  const handleChangeLang = useCallback((newLang: string) => onChangeLang(newLang), [onChangeLang]);

  return (
    <motion.button
      onClick={() => handleChangeLang(isHindi ? 'en' : 'hi')}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.94 }}
      className="relative flex items-center gap-2 rounded-full border border-[#c89b3c]/40 bg-[#fffaf0]/90 px-3 py-2 text-xs font-semibold text-[#7b1e1e] shadow-sm backdrop-blur-sm sm:px-4 sm:text-sm"
      title={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
      aria-label={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
    >
      <span className="text-sm">{isHindi ? 'अ' : 'अ'}</span>
      <span>{isHindi ? 'EN' : 'हिंदी'}</span>
    </motion.button>
  );
}
