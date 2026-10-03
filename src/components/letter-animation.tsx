'use client';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { startWeddingAudio } from '@/lib/wedding-audio';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

const LOOP_CROSSFADE_SECONDS = 1.2;

// Two copies of the same clip; the next one fades in over the tail of the
// current one so the loop point is never a hard cut.
const SeamlessLoopVideo = ({ src }: { src: string }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const switching = useRef(false);

  const handleTimeUpdate = (index: number) => (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (index !== active || switching.current || !Number.isFinite(video.duration)) return;
    if (video.duration - video.currentTime > LOOP_CROSSFADE_SECONDS) return;

    switching.current = true;
    const next = videoRefs.current[1 - index];
    if (next) {
      next.currentTime = 0;
      void next.play().catch(() => undefined);
    }
    setActive(1 - index);
  };

  const handleEnded = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    video.pause();
    video.currentTime = 0;
    switching.current = false;
  };

  return (
    <>
      {[0, 1].map((index) => (
        <video
          key={index}
          ref={(el) => { videoRefs.current[index] = el; }}
          className={`absolute inset-0 h-full w-full object-cover object-center ${index === active ? 'z-20' : 'z-10'}`}
          style={index === active ? { animation: `video-fade-in ${LOOP_CROSSFADE_SECONDS}s linear` } : undefined}
          autoPlay={index === 0}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate(index)}
          onEnded={handleEnded}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </>
  );
};

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

const GANESH_MANTRA_SRC = '/assets/audio/ganesh-mantra.mp3';

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  const [showTransition, setShowTransition] = useState(false);
  const transitionVideoRef = useRef<HTMLVideoElement | null>(null);
  const mantraRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = mantraRef.current;
    if (!audio) return;

    const events: (keyof WindowEventMap)[] = ['pointerdown', 'touchstart', 'keydown'];
    const startOnGesture = () => {
      events.forEach((name) => window.removeEventListener(name, startOnGesture));
      void audio.play().catch(() => undefined);
    };

    audio.currentTime = 0;
    // Unmuted autoplay is blocked by most browsers until the user interacts;
    // fall back to the first tap/key anywhere on the opening screen.
    void audio.play().catch(() => {
      events.forEach((name) => window.addEventListener(name, startOnGesture, { once: true }));
    });

    return () => {
      events.forEach((name) => window.removeEventListener(name, startOnGesture));
      audio.pause();
    };
  }, []);

  const stopMantra = () => {
    const audio = mantraRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  const handleEnter = () => {
    const video = transitionVideoRef.current;
    if (!video) return;

    stopMantra();
    // Same tap unlocks and starts the wedding song so it is already playing
    // when the doors open — no second tap needed on Safari/iOS.
    startWeddingAudio();
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
      <audio ref={mantraRef} src={GANESH_MANTRA_SRC} loop preload="auto" aria-hidden="true">
        {/* Instrumental mantra — no spoken content to caption; satisfies jsx-a11y/media-has-caption */}
        <track kind="captions" label="No captions available" />
      </audio>

      {/* The transition video stays mounted for the entire interaction. This
          prevents React from destroying the exact video element whose play()
          was authorized by the user's tap. */}
      <video
        ref={transitionVideoRef}
        className={`absolute inset-0 z-30 h-full w-full bg-black object-cover object-center transition-opacity duration-300 ${showTransition ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
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

      <div className={showTransition ? 'pointer-events-none absolute inset-0 z-20 opacity-0' : 'absolute inset-0 z-10 opacity-100'}>
        <SeamlessLoopVideo src="/assets/videos/wedding-opening.mp4" />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/5" />

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