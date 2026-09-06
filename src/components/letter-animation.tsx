'use client';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/** Full-screen looping video opening with a soft, devotional Click to Enter CTA. */
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
