'use client';

import { useState, useEffect } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { LetterAnimation } from '@/components';
import { HeroSection, CoupleIntroduction, WeddingDetailsCard, CountdownTimer, VenueInformation, EventSchedule, RSVP, GalleryPreview, ClosingMessage, FloatingNavigation, NavigationFAB, MusicPlayer, ScrollProgressIndicator } from '../components';
import { NAVIGATION_SECTIONS, WEDDING_CONFIG } from '@/constants';

const BACKGROUND_SOURCES = [
  '/images/wedding-invitation-background.jpg',
  '/assets/images/wedding-invitation-background.jpg',
];

export default function HomeView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLetter, setShowLetter] = useState(true);
  const [backgroundSource, setBackgroundSource] = useState(BACKGROUND_SOURCES[0]);
  const [backgroundAttempt, setBackgroundAttempt] = useState(0);
  const activeSection = useScrollSpy(NAVIGATION_SECTIONS.map((section) => section.id));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const handleLetterOpen = () => { setShowLetter(false); setTimeout(() => setIsLoaded(true), 300); };

  if (showLetter) {
    return <LetterAnimation onOpen={handleLetterOpen} coupleName="Chayan & Divya" />;
  }

  const handleBackgroundError = () => {
    const nextAttempt = backgroundAttempt + 1;
    if (nextAttempt < BACKGROUND_SOURCES.length) {
      setBackgroundAttempt(nextAttempt);
      setBackgroundSource(BACKGROUND_SOURCES[nextAttempt]);
    }
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-clip text-[#3d2420]">
      {/* Full-invitation scenic background. Supports both common Next.js public paths. */}
      <img
        src={backgroundSource}
        alt=""
        aria-hidden="true"
        onError={handleBackgroundError}
        decoding="async"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover object-center"
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] bg-[#fff8e8]/20" />

      <div className="relative z-10">
        <FloatingNavigation activeSection={activeSection} onScrollToSection={scrollToSection} />
        <section id="hero" className="relative bg-transparent"><HeroSection isLoaded={isLoaded} couple={WEDDING_CONFIG} onScrollToSection={scrollToSection} /></section>
        <section id="couple" className="relative bg-transparent"><CoupleIntroduction bride={WEDDING_CONFIG.bride} groom={WEDDING_CONFIG.groom} isVisible={isLoaded} /></section>
        <section id="details" className="relative bg-transparent"><WeddingDetailsCard date={WEDDING_CONFIG.date} venue={WEDDING_CONFIG.venue} /><CountdownTimer targetDate={WEDDING_CONFIG.date} /></section>
        <section id="venue" className="relative bg-transparent"><VenueInformation venue={WEDDING_CONFIG.venue} /><EventSchedule /></section>
        <section id="gallery" className="relative bg-transparent"><GalleryPreview /></section>
        <section id="rsvp" className="relative bg-transparent"><RSVP /></section>
        <section id="closing" className="relative bg-transparent"><ClosingMessage bride={WEDDING_CONFIG.bride.fullName} groom={WEDDING_CONFIG.groom.fullName} /></section>
        <MusicPlayer />
        <NavigationFAB activeSection={activeSection} onScrollToSection={scrollToSection} />
        <ScrollProgressIndicator activeSection={activeSection} />
      </div>
    </div>
  );
}
