'use client';

import { motion } from 'motion/react';
import { FloatingParticles, LanguageToggle, NavigationButton } from '@/components';
import { NAVIGATION_SECTIONS } from '@/constants';
import { NAVIGATION_ANIMATIONS } from '@/constants/navigation';

interface FloatingNavigationProps {
  activeSection: string;
  onScrollToSection: (sectionId: string) => void;
}

export default function FloatingNavigation({ activeSection, onScrollToSection }: FloatingNavigationProps) {
  return (
    <motion.nav
      initial={NAVIGATION_ANIMATIONS.navigation.initial}
      animate={NAVIGATION_ANIMATIONS.navigation.animate}
      transition={NAVIGATION_ANIMATIONS.navigation.transition}
      className="fixed left-1/2 top-3 z-50 -translate-x-1/2 sm:top-5"
    >
      <motion.div
        whileHover={{ y: -1 }}
        className="relative rounded-full border border-[#c89b3c]/45 bg-[#fffaf0]/94 px-1.5 py-1.5 shadow-[0_12px_34px_rgba(73,34,23,.14)] backdrop-blur-xl sm:px-2 sm:py-2"
      >
        <div className="flex items-center space-x-0.5 sm:space-x-1">
          {NAVIGATION_SECTIONS.map((section, index) => (
            <NavigationButton
              key={section.id}
              section={section}
              index={index}
              isActive={activeSection === section.id}
              onClick={() => onScrollToSection(section.id)}
            />
          ))}
          <div className="mx-1 h-5 w-px bg-[#c89b3c]/35 sm:mx-2" />
          <LanguageToggle />
        </div>
        <FloatingParticles />
      </motion.div>
    </motion.nav>
  );
}
