'use client';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/**
 * Full-screen looping wedding opening.
 * The original video remains sharp. A second, identically positioned copy of
 * the video is horizontally diffused only in a large feathered region behind
 * the CTA. The CTA artwork itself remains sharp and unchanged.
 *
 * Blur tuning:
 * - OPENING_CTA_BLUR_X controls horizontal diffusion.
 * - OPENING_CTA_BLUR_Y controls vertical softness.
 * - OPENING_CTA_DIFFUSE_SIZE controls how broadly the feathered region reaches.
 */
const OPENING_CTA_BLUR_X = 28;
const OPENING_CTA_BLUR_Y = 4;
const OPENING_CTA_DIFFUSE_SIZE = 'ellipse 76% 20%';

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-black">
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter
            id="opening-cta-background-diffuse"
            x="-20%"
            y="-12%"
            width="140%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation={`${OPENING_CTA_BLUR_X} ${OPENING_CTA_BLUR_Y}`} />
          </filter>
        </defs>
      </svg>

      {/* Original wedding artwork — completely sharp and untouched. */}
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

      {/*
       * Blurred duplicate of the SAME video, precisely aligned with the original.
       * A feathered mask makes the diffusion fade naturally into the artwork;
       * there is no rectangular panel or hard boundary.
       */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        style={{
          filter: 'url(#opening-cta-background-diffuse)',
          maskImage: `radial-gradient(${OPENING_CTA_DIFFUSE_SIZE} at 50% 88%, black 0%, black 34%, rgba(0,0,0,.92) 54%, rgba(0,0,0,.48) 76%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(${OPENING_CTA_DIFFUSE_SIZE} at 50% 88%, black 0%, black 34%, rgba(0,0,0,.92) 54%, rgba(0,0,0,.48) 76%, transparent 100%)`,
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/assets/videos/wedding-opening.mp4" type="video/mp4" />
      </video>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[11] bg-black/5" />

      {/* Sharp CTA — original text and artwork, with no filter applied. */}
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
