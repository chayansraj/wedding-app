'use client';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/** Full-screen looping video opening with a decorative Click to Enter CTA. */
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

      {/*
       * Keep the CTA low in the safe area. The banner is intentionally compact
       * so it sits below Ganesha's feet and covers the lower watermark area.
       * The SVG is self-contained, so there is no broken-image state on mobile.
       */}
      <div className="absolute inset-x-0 bottom-[1%] z-20 flex justify-center px-3 sm:bottom-[1.5%] sm:px-5">
        <button
          type="button"
          onClick={onOpen}
          aria-label="Click to Enter"
          className="block w-[82vw] max-w-[560px] overflow-hidden rounded-[999px] transition-transform duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d98b]"
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
