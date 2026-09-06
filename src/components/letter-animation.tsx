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

      {/* Gentle contrast layer keeps the CTA legible without obscuring the video. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/5" />

      {/*
       * The CTA uses the supplied artwork's exact ornamental style. The banner
       * is a cropped, lightweight asset so only the button treatment is layered
       * over the moving video; the Ganesha/feet remain completely unobstructed.
       */}
      <div className="absolute inset-x-0 bottom-[2.5%] z-20 flex justify-center px-4 sm:bottom-[3%] sm:px-6">
        <button
          type="button"
          onClick={onOpen}
          aria-label="Click to Enter"
          className="block w-[86vw] max-w-[720px] overflow-hidden rounded-[999px] transition-transform duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d98b] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <img
            src="/assets/images/click-to-enter-banner.jpg"
            alt="Click to Enter"
            className="block h-auto w-full object-contain"
          />
        </button>
      </div>
    </main>
  );
};
