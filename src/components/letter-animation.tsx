'use client';

import { useTranslation } from 'react-i18next';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/**
 * Full-screen video opening page.
 *
 * Add the supplied 1080x1920 MP4 to:
 *   public/assets/videos/wedding-opening.mp4
 *
 * The video is intentionally used as the actual background rather than a
 * poster image. The browser handles autoplay safely because it is muted and
 * inline; loop keeps the 10-second clip continuously moving.
 */
export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  const { t } = useTranslation('home');

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

      {/* Subtle cinematic contrast layer; it does not obscure the animation. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/5"
      />

      {/*
       * Minimal backdrop around the CTA. It is deliberately not a card or
       * rectangular panel: the blur follows a soft pill shape and lets the
       * moving artwork remain visible around it.
       */}
      <div className="absolute inset-x-0 bottom-[9%] z-20 flex justify-center px-5">
        <div className="relative rounded-full px-3 py-2">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-md"
          />
          <button
            type="button"
            onClick={onOpen}
            className="relative rounded-full px-7 py-3 font-serif text-base font-semibold tracking-[0.08em] text-[#fff7df] drop-shadow-[0_2px_8px_rgba(0,0,0,.9)] transition-transform duration-200 hover:scale-[1.03] active:scale-95 sm:px-9 sm:py-3.5 sm:text-lg"
          >
            {t('letter.click-to-open')}
          </button>
        </div>
      </div>

      {/*
       * Small localized blur patch over the source video's AI mark in the
       * lower-right corner. The original video remains unchanged; this only
       * masks the mark at presentation time while preserving the moving scene.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[4.2%] right-[2.2%] z-10 h-12 w-20 rounded-xl bg-black/15 backdrop-blur-md sm:h-14 sm:w-24"
      />
    </main>
  );
};
