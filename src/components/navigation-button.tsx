import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import type { NavigationSection } from '@/types/navigation';

interface NavigationButtonProps {
  section: NavigationSection;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function NavigationButton({ section, index, isActive, onClick }: NavigationButtonProps) {
  const { t } = useTranslation('home');

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.06 * index }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      className={`relative flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
        isActive
          ? 'bg-[#8b1e1e] text-[#fff8e8] shadow-[0_5px_16px_rgba(123,30,30,.22)]'
          : 'text-[#6f4c3b] hover:bg-[#f5e5c6] hover:text-[#8b1e1e]'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <motion.span
        animate={isActive ? { scale: [1, 1.12, 1] } : {}}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="relative z-10 text-sm sm:text-base"
      >
        {section.icon}
      </motion.span>
      <span className="relative z-10 hidden whitespace-nowrap sm:inline-block">
        {
          // @ts-expect-error Translation keys are defined by the locale files.
          t(section.labelKey)
        }
      </span>
      {isActive && <span className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#e6c46b]" />}
    </motion.button>
  );
}
