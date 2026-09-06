'use client';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/**
 * Full-screen looping wedding opening.
 * The Ganesh video remains completely sharp. Only the Click to Enter artwork
 * is used to create the diffuse haze around the CTA and watermark areas.
 */
const OPENING_CTA_BLUR_X = 240;
const OPENING_CTA_BLUR_Y = 14;
const OPENING_CTA_DIFFUSE_SCALE_X = 3.0;
const OPENING_CTA_GLOW_OPACITY = 1;

// Extra-wide, dark end haze for the two watermark locations.
const OPENING_CTA_END_DARKNESS = 0.10;
const OPENING_CTA_END_SCALE_X = 4.2;
const OPENING_CTA_END_BLUR_X = 190;
const OPENING_CTA_END_BLUR_Y = 22;

export const LetterAnimation = ({ onOpen }: LetterAnimationProps) => {
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
            x="-180%"
            y="-220%"
            width="460%"
            height="540%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation={`${OPENING_CTA_BLUR_X} ${OPENING_CTA_BLUR_Y}`} />
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
          onClick={onOpen}
          aria-label="Click to Enter"
          className="relative block w-[88vw] max-w-[620px] overflow-visible bg-transparent p-0 transition-transform duration-200 hover:scale-[1.015] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d98b]/70"
        >
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
