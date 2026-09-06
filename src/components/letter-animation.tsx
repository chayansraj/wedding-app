'use client';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/**
 * Full-screen looping wedding opening.
 *
 * The Ganesh video remains completely sharp. Only a duplicate of the existing
 * Click to Enter artwork is blurred and stretched horizontally. The stronger
 * outer diffusion is intentionally darkened so it can cover the two bright
 * watermark stars at the ends without creating a hard rectangular boundary.
 */
const OPENING_CTA_BLUR_X = 155;
const OPENING_CTA_BLUR_Y = 9;
const OPENING_CTA_DIFFUSE_SCALE_X = 2.35;
const OPENING_CTA_GLOW_OPACITY = 1;
const OPENING_CTA_END_DARKNESS = 0.32;
const OPENING_CTA_END_SCALE_X = 2.9;
const OPENING_CTA_END_BLUR_X = 95;
const OPENING_CTA_END_BLUR_Y = 12;

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
  return (
    <main className="fixed inset-0 z-[100] overflow-hidden bg-black">
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

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/5" />

      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <defs>
          {/* Broad central horizontal diffusion. */}
          <filter
            id="opening-cta-horizontal-diffuse"
            x="-120%"
            y="-160%"
            width="340%"
            height="420%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation={`${OPENING_CTA_BLUR_X} ${OPENING_CTA_BLUR_Y}`}
            />
          </filter>

          {/* Darker, wider end diffusion specifically for the watermark stars. */}
          <filter
            id="opening-cta-dark-end-diffuse"
            x="-140%"
            y="-180%"
            width="380%"
            height="460%"
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
          onClick={onOpen}
          aria-label="Click to Enter"
          className="relative block w-[88vw] max-w-[620px] overflow-visible bg-transparent p-0 transition-transform duration-200 hover:scale-[1.015] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d98b]/70"
        >
          {/* Broad horizontal glow. */}
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

          {/* Extra darkened blur extends farther into both ends. */}
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

          {/* Original CTA remains crisp and unchanged. */}
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
