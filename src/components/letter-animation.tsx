'use client';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/**
 * Full-screen looping video opening with a soft, devotional Click to Enter CTA.
 *
 * The video itself remains completely sharp. The directional Gaussian diffusion
 * is applied only to the CTA artwork so the invitation background is untouched.
 *
 * Blur tuning:
 * - OPENING_BUTTON_BLUR_X controls horizontal diffusion.
 * - OPENING_BUTTON_BLUR_Y controls vertical softness.
 */
const OPENING_BUTTON_BLUR_X = 18;
const OPENING_BUTTON_BLUR_Y = 4;

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-black">
      {/* The wedding artwork/video stays completely sharp. */}
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

      {/*
       * CTA-only horizontal diffusion. The filter is deliberately attached to
       * the button layer rather than the video, preserving the artwork sharpness.
       */}
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter
            id="opening-button-horizontal-diffuse"
            x="-16%"
            y="-12%"
            width="132%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation={`${OPENING_BUTTON_BLUR_X} ${OPENING_BUTTON_BLUR_Y}`} />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-x-0 bottom-[1%] z-20 flex justify-center px-2 sm:bottom-[1.5%] sm:px-4">
        <button
          type="button"
          onClick={onOpen}
          aria-label="Click to Enter"
          className="block w-[88vw] max-w-[620px] bg-transparent p-0 transition-transform duration-200 hover:scale-[1.015] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d98b]/70"
        >
          <img
            src="/assets/images/click-to-enter-banner.svg"
            alt="Click to Enter"
            className="block h-auto w-full"
            style={{ filter: 'url(#opening-button-horizontal-diffuse)' }}
          />
        </button>
      </div>
    </main>
  );
};
