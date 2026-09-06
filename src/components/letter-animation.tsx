'use client';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName?: string;
}

/**
 * Full-screen video opening page.
 *
 * Add the supplied 1080x1920 MP4 to:
 *   public/assets/videos/wedding-opening.mp4
 *
 * The video is used as the actual background. The CTA uses the supplied
 * click-to-enter artwork, cropped to its lower banner so the visual treatment
 * stays consistent with the artwork while the video remains visible behind it.
 */
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

      {/* Subtle cinematic contrast layer; it does not obscure the animation. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/5"
      />

      {/*
       * The supplied artwork contains the exact ornamental CTA treatment.
       * The container crops the artwork to its lower banner, avoiding the
       * duplicate Ganesha/scene while preserving the original typography,
       * gold ornamentation, blur and contrast.
       */}
      <div className="absolute inset-x-0 bottom-[8.5%] z-20 flex justify-center px-4 sm:bottom-[8%]">
        <button
          type="button"
          onClick={onOpen}
          aria-label="Click to Enter"
          className="relative h-[92px] w-[min(92vw,430px)] overflow-hidden rounded-[999px] drop-shadow-[0_10px_30px_rgba(50,20,5,.35)] transition-transform duration-200 hover:scale-[1.02] active:scale-[.97] sm:h-[112px] sm:w-[min(78vw,520px)]"
        >
          <img
            src="/assets/images/click-to-enter-style.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[50%_71%]"
          />
        </button>
      </div>
    </main>
  );
};
