'use client';

import { motion } from 'motion/react';
import { FloatingParticles, LanguageToggle, NavigationButton } from '@/components';
import { NAVIGATION_SECTIONS } from '@/constants';
import { NAVIGATION_ANIMATIONS } from '@/constants/navigation';

interface FloatingNavigationProps { activeSection: string; onScrollToSection: (sectionId: string) => void; }

export default function FloatingNavigation({ activeSection, onScrollToSection }: FloatingNavigationProps) {
  return <motion.nav initial={NAVIGATION_ANIMATIONS.navigation.initial} animate={NAVIGATION_ANIMATIONS.navigation.animate} transition={NAVIGATION_ANIMATIONS.navigation.transition} className="fixed left-1/2 top-3 z-50 hidden -translate-x-1/2 sm:block sm:top-5">
    <motion.div whileHover={{y:-1}} className="relative rounded-full border border-[#c89b3c]/45 bg-[#fffaf0]/94 px-2 py-2 shadow-[0_12px_34px_rgba(73,34,23,.14)] backdrop-blur-xl">
      <div className="flex items-center space-x-1">
        {NAVIGATION_SECTIONS.map((section,index)=><NavigationButton key={section.id} section={section} index={index} isActive={activeSection===section.id} onClick={()=>onScrollToSection(section.id)} />)}
        <div className="mx-2 h-5 w-px bg-[#c89b3c]/35" /><LanguageToggle />
      </div>
      <FloatingParticles />
    </motion.div>
  </motion.nav>;
}
