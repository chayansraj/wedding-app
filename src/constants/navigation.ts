export const NAVIGATION_ANIMATIONS = {
  navigation: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2 } },
  button: { hover: { scale: 1.05 }, tap: { scale: 0.95 }, transition: { duration: 0.3 } },
  background: { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0, opacity: 0 }, transition: { duration: 0.3, type: 'spring', stiffness: 300 } },
  icon: { active: { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }, hover: { scale: 1.2, rotate: 5 }, transition: { duration: 0.5 } },
  pulse: { animate: { scale: [1, 1.5, 1] }, transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } },
};

export const NAVIGATION_SECTIONS = [
  { id: 'hero', labelKey: 'navigation.home', icon: '✦', gradient: 'from-amber-700 to-red-800' },
  { id: 'couple', labelKey: 'navigation.couple', icon: '♡', gradient: 'from-red-700 to-amber-700' },
  { id: 'details', labelKey: 'navigation.details', icon: '❖', gradient: 'from-amber-700 to-yellow-700' },
  { id: 'venue', labelKey: 'navigation.venue', icon: '⌖', gradient: 'from-red-800 to-amber-700' },
  { id: 'gallery', labelKey: 'navigation.gallery', icon: '◈', gradient: 'from-amber-700 to-red-700' },
  { id: 'rsvp', labelKey: 'navigation.rsvp', icon: '❧', gradient: 'from-red-700 to-yellow-700' },
];
