'use client';

import { useState, useEffect } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { LetterAnimation } from '@/components';
import { HeroSection, CoupleIntroduction, CountdownTimer, VenueInformation, EventJourney, RSVP, GalleryPreview, ClosingMessage, FloatingNavigation, NavigationFAB, MusicPlayer, ScrollProgressIndicator } from '../components';
import { HIDDEN_SECTIONS, NAVIGATION_SECTIONS, WEDDING_CONFIG } from '@/constants';

const BACKGROUND_SOURCE = '/assets/images/wedding-invitation-background.png';

export default function HomeView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLetter, setShowLetter] = useState(true);
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

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-[#f6ead6] text-[#3d2420]">
      {/* The uploaded 9:16 artwork is the persistent invitation background.
          Sized to the large viewport (lvh) so the mobile URL bar collapsing
          doesn't resize the box and make object-cover re-zoom the image.
          Slight blur + one uniform cream veil: the art becomes a soft watermark
          with the same text contrast in every section (no per-section tints). */}
      <img
        src={BACKGROUND_SOURCE}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
        style={{ filter: 'saturate(.9) blur(1.5px)', transform: 'scale(1.02)' }}
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh w-full bg-[#f6ead6] object-cover object-center md:object-contain"
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-lvh bg-[#fff8e8]/55" />

      <div className="relative z-10">
        <FloatingNavigation activeSection={activeSection} onScrollToSection={scrollToSection} />
        <section id="hero" className="relative bg-transparent"><HeroSection isLoaded={isLoaded} couple={WEDDING_CONFIG} onScrollToSection={scrollToSection} /></section>
        {!HIDDEN_SECTIONS.includes('couple') && <section id="couple" className="relative bg-transparent"><CoupleIntroduction bride={WEDDING_CONFIG.bride} groom={WEDDING_CONFIG.groom} isVisible={isLoaded} /></section>}
        <section id="details" className="relative bg-transparent">
          {/* Mark-your-calendar card kept for later: <WeddingDetailsCard date={WEDDING_CONFIG.date} venue={WEDDING_CONFIG.venue} /> */}
          {/* Classic vertical timeline kept for later: <EventSchedule /> (still used as the reduced-motion fallback inside EventJourney) */}
          {/* Pinned card story kept for later: <EventStory /> */}
          <EventJourney />
        </section>
        <section id="venue" className="relative bg-transparent">
          <VenueInformation />
          <CountdownTimer targetDate={WEDDING_CONFIG.date} />
        </section>
        {/* Memories gallery hidden via HIDDEN_SECTIONS in constants/navigation.ts */}
        {!HIDDEN_SECTIONS.includes('gallery') && <section id="gallery" className="relative bg-transparent"><GalleryPreview /></section>}
        <section id="rsvp" className="relative bg-transparent"><RSVP /></section>
        <section id="closing" className="relative bg-transparent"><ClosingMessage /></section>
        <MusicPlayer />
        <NavigationFAB activeSection={activeSection} onScrollToSection={scrollToSection} />
        <ScrollProgressIndicator activeSection={activeSection} />
      </div>
    </div>
  );
}
