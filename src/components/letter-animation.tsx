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
 * The mask is deliberately applied to a wrapper rather than directly to the
 * <video>. WebKit/iOS Safari is more reliable when masking a containing layer.
 *
 * Blur tuning:
 * - OPENING_CTA_BLUR_X controls horizontal diffusion.
 * - OPENING_CTA_BLUR_Y controls vertical softness.
 * - OPENING_CTA_DIFFUSE_SIZE controls how broadly the feathered region reaches.
 */
const OPENING_CTA_BLUR_X = 32;
const OPENING_CTA_BLUR_Y = 5;
const OPENING_CTA_DIFFUSE_SIZE = 'ellipse 90% 24%';

const CTA_DIFFUSE_MASK = `radial-gradient(${OPENING_CTA_DIFFUSE_SIZE} at 50% 86%, black 0%, black 30%, rgba(0,0,0,.94) 48%, rgba(0,0,0,.58) 70%, transparent 100%)`;

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-black">
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter
            id="opening-cta-background-diffuse"
            x="-24%"
            y="-18%"
            width="148%"
            height="136%"
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
       * The mask lives on a containing layer instead of the video itself.
       * This preserves the feathered, boundary-free look while making the
       * effect much more reliable on iOS/Safari and other mobile browsers.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: CTA_DIFFUSE_MASK,
          WebkitMaskImage: CTA_DIFFUSE_MASK,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      >
        {/* Same video, aligned exactly with the sharp video underneath. */}
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{
            filter: 'url(#opening-cta-background-diffuse)',
            WebkitFilter: 'url(#opening-cta-background-diffuse)',
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
      </div>

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
