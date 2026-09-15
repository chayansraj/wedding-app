'use client';

import { useRef, useState } from 'react';
import { MarigoldCorner } from './indian-ornaments';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

const OPENING_CTA_BLUR_X = 260;
const OPENING_CTA_BLUR_Y = 16;
const OPENING_CTA_DIFFUSE_SCALE_X = 3.25;
const OPENING_CTA_GLOW_OPACITY = 1;
const OPENING_CTA_ELLIPSE_SCALE_X = 5.0;
const OPENING_CTA_ELLIPSE_SCALE_Y = 1.65;
const OPENING_CTA_ELLIPSE_BLUR_X = 105;
const OPENING_CTA_ELLIPSE_BLUR_Y = 28;
const OPENING_CTA_ELLIPSE_OPACITY = 0.95;
const OPENING_CTA_END_SCALE_X = 4.2;
const OPENING_CTA_END_BLUR_X = 190;
const OPENING_CTA_END_BLUR_Y = 22;
const OPENING_CTA_END_DARKNESS = 0.10;

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  const [showTransition, setShowTransition] = useState(false);
  const transitionVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnter = () => {
    const video = transitionVideoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = true;
    video.playsInline = true;
    setShowTransition(true);

    // Start directly from the user's tap/click so mobile autoplay policy is
    // satisfied without depending on a post-render effect.
    void video.play().catch(() => {
      const retry = () => void video.play().catch(() => undefined);
      video.addEventListener('canplay', retry, { once: true });
      video.load();
    });
  };

  const handleTransitionEnded = () => {
    onOpen();
  };

  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-black">
      {/* The transition video stays mounted for the entire interaction. This
          prevents React from destroying the exact video element whose play()
          was authorized by the user's tap. */}
      <video
        ref={transitionVideoRef}
        className={`absolute inset-0 z-30 h-full w-full bg-black object-contain transition-opacity duration-300 ${showTransition ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        muted
        playsInline
        preload="auto"
        onCanPlay={(event) => {
          const video = event.currentTarget;
          if (showTransition && video.paused) void video.play().catch(() => undefined);
        }}
        onEnded={handleTransitionEnded}
        aria-hidden="true"
      >
        <source src="/assets/videos/Doors_opening_to_wedding_scene.mp4" type="video/mp4" />
      </video>

      {/* Marigold bouquets framing the transition video's contained rect, hiding the corner watermark. */}
      <div className={`pointer-events-none absolute inset-0 z-40 transition-opacity duration-300 ${showTransition ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
        <div className="absolute" style={{ inset: 0, margin: 'auto', aspectRatio: '9 / 16', maxWidth: '100%', maxHeight: '100%' }}>
          <MarigoldCorner idPrefix="drR" className="absolute bottom-0 right-0 w-[64%]" />
          <MarigoldCorner idPrefix="drL" className="absolute bottom-0 left-0 w-[64%] -scale-x-100" />
        </div>
      </div>

      <div className={showTransition ? 'pointer-events-none absolute inset-0 z-20 opacity-0' : 'absolute inset-0 z-10 opacity-100'}>
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/assets/videos/wedding-opening.mp4" type="video/mp4" />
        </video>

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/5" />

        {/* Marigold bouquets in the bottom corners hide the corner watermark on the looping background video. */}
        <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
          <MarigoldCorner idPrefix="bgR" className="absolute bottom-0 right-0 w-[58vw] max-w-[380px]" />
          <MarigoldCorner idPrefix="bgL" className="absolute bottom-0 left-0 w-[58vw] max-w-[380px] -scale-x-100" />
        </div>

        <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
          <defs>
            <filter id="opening-cta-horizontal-diffuse" x="-200%" y="-240%" width="500%" height="580%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation={`${OPENING_CTA_BLUR_X} ${OPENING_CTA_BLUR_Y}`} />
            </filter>
            <filter id="opening-cta-elliptical-diffuse" x="-260%" y="-260%" width="620%" height="620%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation={`${OPENING_CTA_ELLIPSE_BLUR_X} ${OPENING_CTA_ELLIPSE_BLUR_Y}`} />
            </filter>
            <filter id="opening-cta-dark-end-diffuse" x="-220%" y="-280%" width="540%" height="660%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation={`${OPENING_CTA_END_BLUR_X} ${OPENING_CTA_END_BLUR_Y}`} />
              <feComponentTransfer>
                <feFuncR type="linear" slope={OPENING_CTA_END_DARKNESS} />
                <feFuncG type="linear" slope={OPENING_CTA_END_DARKNESS} />
                <feFuncB type="linear" slope={OPENING_CTA_END_DARKNESS} />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>

        <div className="absolute inset-x-0 bottom-[1%] z-20 flex justify-center px-2 sm:bottom-[1.5%] sm:px-4">
          <button
            type="button"
            onClick={handleEnter}
            aria-label="Click to Enter"
            className="relative block w-[88vw] max-w-[620px] overflow-visible bg-transparent p-0 transition-transform duration-200 hover:scale-[1.015] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d98b]/70"
          >
            <img src="/assets/images/click-to-enter-banner.svg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block h-auto w-full" style={{ filter: 'url(#opening-cta-horizontal-diffuse)', WebkitFilter: 'url(#opening-cta-horizontal-diffuse)', transform: `scaleX(${OPENING_CTA_DIFFUSE_SCALE_X})`, transformOrigin: 'center center', opacity: OPENING_CTA_GLOW_OPACITY }} />
            <img src="/assets/images/click-to-enter-banner.svg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block h-auto w-full" style={{ filter: 'url(#opening-cta-elliptical-diffuse)', WebkitFilter: 'url(#opening-cta-elliptical-diffuse)', transform: `scale(${OPENING_CTA_ELLIPSE_SCALE_X} ${OPENING_CTA_ELLIPSE_SCALE_Y})`, transformOrigin: 'center center', opacity: OPENING_CTA_ELLIPSE_OPACITY }} />
            <img src="/assets/images/click-to-enter-banner.svg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block h-auto w-full" style={{ filter: 'url(#opening-cta-dark-end-diffuse)', WebkitFilter: 'url(#opening-cta-dark-end-diffuse)', transform: `scaleX(${OPENING_CTA_END_SCALE_X})`, transformOrigin: 'center center', opacity: 1 }} />
            <img src="/assets/images/click-to-enter-banner.svg" alt="Click to Enter" className="relative block h-auto w-full" />
          </button>
        </div>
      </div>
    </main>
  );
};