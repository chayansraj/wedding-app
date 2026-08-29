'use client';

import { useState, useEffect } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { LetterAnimation } from '@/components';
import { HeroSection, CoupleIntroduction, WeddingDetailsCard, CountdownTimer, VenueInformation, EventSchedule, RSVP, GalleryPreview, ClosingMessage, FloatingNavigation, NavigationFAB, MusicPlayer, ScrollProgressIndicator } from '../components';
import { NAVIGATION_SECTIONS, WEDDING_CONFIG } from '@/constants';

export default function HomeView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLetter, setShowLetter] = useState(true);
  const activeSection = useScrollSpy(NAVIGATION_SECTIONS.map((section) => section.id));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLetterOpen = () => {
    setShowLetter(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  if (showLetter) {
    return <LetterAnimation onOpen={handleLetterOpen} coupleName={`${WEDDING_CONFIG.bride.name} & ${WEDDING_CONFIG.groom.name}`} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fff9ed] text-[#2d2020] selection:bg-[#b08a3a]/25">
      <FloatingNavigation activeSection={activeSection} onScrollToSection={scrollToSection} />

      <main>
        <section id="hero" className="relative scroll-mt-24"><HeroSection isLoaded={isLoaded} couple={WEDDING_CONFIG} onScrollToSection={scrollToSection} /></section>

        <section id="couple" className="relative scroll-mt-20">
          <CoupleIntroduction bride={WEDDING_CONFIG.bride} groom={WEDDING_CONFIG.groom} isVisible={isLoaded} />
        </section>

        <section id="details" className="relative scroll-mt-20">
          <WeddingDetailsCard date={WEDDING_CONFIG.date} venue={WEDDING_CONFIG.venue} />
          <CountdownTimer targetDate={WEDDING_CONFIG.date} />
        </section>

        <section id="venue" className="relative scroll-mt-20">
          <VenueInformation venue={WEDDING_CONFIG.venue} />
          <EventSchedule />
        </section>

        <section id="gallery" className="relative scroll-mt-20"><GalleryPreview /></section>
        <section id="rsvp" className="relative scroll-mt-20"><RSVP /></section>
        <section id="closing" className="relative scroll-mt-20"><ClosingMessage bride={WEDDING_CONFIG.bride.fullName} groom={WEDDING_CONFIG.groom.fullName} /></section>
      </main>

      <MusicPlayer />
      <NavigationFAB activeSection={activeSection} onScrollToSection={scrollToSection} />
      <ScrollProgressIndicator activeSection={activeSection} />
    </div>
  );
}
