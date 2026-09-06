'use client';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/**
 * Full-screen looping video opening with a soft, devotional Click to Enter CTA.
 *
 * Blur tuning:
 * - OPENING_BLUR_X controls the horizontal diffusion. Increase this to hide
 *   fine horizontal details / watermark remnants more aggressively.
 * - OPENING_BLUR_Y controls vertical softness. Keep this lower to preserve the
 *   artwork's vertical detail while making the diffusion predominantly horizontal.
 */
const OPENING_BLUR_X = 18;
const OPENING_BLUR_Y = 5;

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-black">
      {/* Directional Gaussian blur: strong horizontal diffusion, restrained vertically. */}
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter
            id="opening-horizontal-diffuse"
            x="-12%"
            y="-8%"
            width="124%"
            height="116%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation={`${OPENING_BLUR_X} ${OPENING_BLUR_Y}`} />
          </filter>
        </defs>
      </svg>

      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ filter: 'url(#opening-horizontal-diffuse)' }}
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
       * The CTA uses a transparent SVG with a broad Gaussian-blurred radiance,
       * matching the soft foreground blur in the devotional artwork. There is
       * deliberately no rounded panel or hard button boundary.
       */}
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
          />
        </button>
      </div>
    </main>
  );
};
