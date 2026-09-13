'use client';

import { useEffect, useRef, useState } from 'react';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/**
 * Full-screen wedding opening.
 *
 * The existing landing animation is preserved. Clicking "Click to Enter"
 * now starts the door-opening transition video. The main invitation is only
 * revealed once that video finishes, so the final wedding-scene frame leads
 * naturally into the invitation background instead of cutting away early.
 */
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

  useEffect(() => {
    if (!showTransition) return;

    const video = transitionVideoRef.current;
    if (!video) return;

    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, [showTransition]);

  const handleEnter = () => {
    setShowTransition(true);
  };

  const handleTransitionEnded = () => {
    onOpen();
  };

  if (showTransition) {
    return (
      <main className="fixed inset-0 z-[100] overflow-hidden bg-black" aria-label="Opening transition">
        <video
          ref={transitionVideoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          muted
          playsInline
          preload="auto"
          onEnded={handleTransitionEnded}
          onCanPlay={() => {
            const video = transitionVideoRef.current;
            if (video?.paused) void video.play().catch(() => undefined);
          }}
          aria-hidden="true"
        >
          <source
            src="/assets/videos/Doors_opening_to_wedding_scene.mp4"
            type="video/mp4"
          />
        </video>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black opacity-40 animate-[opening-video-fade-in_450ms_ease-out_forwards]"
        />
      </main>
    );
  }

  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-black">
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

      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter
            id="opening-cta-horizontal-diffuse"
            x="-200%"
            y="-240%"
            width="500%"
            height="580%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation={`${OPENING_CTA_BLUR_X} ${OPENING_CTA_BLUR_Y}`} />
          </filter>

          <filter
            id="opening-cta-elliptical-diffuse"
            x="-260%"
            y="-260%"
            width="620%"
            height="620%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation={`${OPENING_CTA_ELLIPSE_BLUR_X} ${OPENING_CTA_ELLIPSE_BLUR_Y}`}
            />
          </filter>

          <filter
            id="opening-cta-dark-end-diffuse"
            x="-220%"
            y="-280%"
            width="540%"
            height="660%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation={`${OPENING_CTA_END_BLUR_X} ${OPENING_CTA_END_BLUR_Y}`}
            />
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
          {/* Existing broad horizontal diffusion. */}
          <img
            src="/assets/images/click-to-enter-banner.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 block h-auto w-full"
            style={{
              filter: 'url(#opening-cta-horizontal-diffuse)',
              WebkitFilter: 'url(#opening-cta-horizontal-diffuse)',
              transform: `scaleX(${OPENING_CTA_DIFFUSE_SCALE_X})`,
              transformOrigin: 'center center',
              opacity: OPENING_CTA_GLOW_OPACITY,
            }}
          />

          <img
            src="/assets/images/click-to-enter-banner.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 block h-auto w-full"
            style={{
              filter: 'url(#opening-cta-elliptical-diffuse)',
              WebkitFilter: 'url(#opening-cta-elliptical-diffuse)',
              transform: `scale(${OPENING_CTA_ELLIPSE_SCALE_X} ${OPENING_CTA_ELLIPSE_SCALE_Y})`,
              transformOrigin: 'center center',
              opacity: OPENING_CTA_ELLIPSE_OPACITY,
            }}
          />

          <img
            src="/assets/images/click-to-enter-banner.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 block h-auto w-full"
            style={{
              filter: 'url(#opening-cta-dark-end-diffuse)',
              WebkitFilter: 'url(#opening-cta-dark-end-diffuse)',
              transform: `scaleX(${OPENING_CTA_END_SCALE_X})`,
              transformOrigin: 'center center',
              opacity: 1,
            }}
          />

          <img
            src="/assets/images/click-to-enter-banner.svg"
            alt="Click to Enter"
            className="relative block h-auto w-full"
          />
        </button>
      </div>
    </main>
  );
};
