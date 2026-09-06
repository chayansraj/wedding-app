'use client';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/**
 * Full-screen looping wedding opening.
 *
 * The Ganesh video remains completely sharp. The watermark-covering effect is
 * created ONLY from a blurred duplicate of the existing Click to Enter SVG.
 * The duplicate is stretched horizontally and heavily diffused so its glow
 * reaches the two watermark stars without introducing a rectangular panel or
 * changing the sharp CTA artwork/text above it.
 *
 * Blur tuning:
 * - OPENING_CTA_BLUR_X controls the horizontal diffusion strength.
 * - OPENING_CTA_BLUR_Y controls vertical softness.
 * - OPENING_CTA_DIFFUSE_SCALE_X expands the horizontal reach of the blur.
 * - OPENING_CTA_GLOW_OPACITY controls the covering strength.
 */
const OPENING_CTA_BLUR_X = 120;
const OPENING_CTA_BLUR_Y = 7;
const OPENING_CTA_DIFFUSE_SCALE_X = 1.8;
const OPENING_CTA_GLOW_OPACITY = 0.98;

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

      {/* Very subtle overall veil, unchanged from the previous opening. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/5" />

      {/* CTA-only horizontal diffusion. No filter is applied to the video. */}
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter
            id="opening-cta-horizontal-diffuse"
            x="-80%"
            y="-120%"
            width="260%"
            height="340%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation={`${OPENING_CTA_BLUR_X} ${OPENING_CTA_BLUR_Y}`}
            />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-x-0 bottom-[1%] z-20 flex justify-center px-2 sm:bottom-[1.5%] sm:px-4">
        <button
          type="button"
          onClick={onOpen}
          aria-label="Click to Enter"
          className="relative block w-[88vw] max-w-[620px] bg-transparent p-0 transition-transform duration-200 hover:scale-[1.015] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d98b]/70"
        >
          {/*
           * This is the ONLY element being blurred. It is deliberately
           * stretched horizontally so the diffuse glow reaches the watermark
           * stars on both sides. The blur has no hard rectangular edge.
           */}
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

          {/* Original CTA stays crisp and unchanged. */}
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
