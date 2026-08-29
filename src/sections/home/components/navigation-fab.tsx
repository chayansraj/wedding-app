'use client';

import { motion } from 'motion/react';
import { LanguageToggle } from '@/components';

interface NavigationFABProps { activeSection: string; onScrollToSection: (sectionId: string) => void; }
const sections = ['hero','couple','details','venue','gallery','rsvp','closing'];

export default function NavigationFAB({ activeSection, onScrollToSection }: NavigationFABProps) {
  const handleNextSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    onScrollToSection(sections[(currentIndex + 1) % sections.length]);
  };
  const progress = (sections.indexOf(activeSection) + 1) / sections.length;

  return <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
    <div className="sm:hidden"><LanguageToggle /></div>
    <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} whileTap={{scale:.94}} onClick={handleNextSection} aria-label="Go to next section" className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#c89b3c]/60 bg-[#fffaf0]/95 text-[#8b1e1e] shadow-xl backdrop-blur-md">
      <svg className="absolute inset-0 h-14 w-14 -rotate-90" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="none" stroke="#d9c9aa" strokeWidth="2"/><circle cx="32" cy="32" r="28" fill="none" stroke="#b8872e" strokeWidth="2.5" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress}/></svg>
      <motion.span animate={{y:[0,3,0]}} transition={{duration:1.5,repeat:Infinity}} className="relative text-xl">❧</motion.span>
    </motion.button>
  </div>;
}
