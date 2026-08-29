'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName: string;
}

/**
 * Ceremonial entrance sequence:
 * Ganesh vandana -> golden glow -> carved doors -> doors open -> wedding site.
 * Kept as the existing LetterAnimation API so the rest of the application does not change.
 */
export const LetterAnimation = ({ onOpen, coupleName }: LetterAnimationProps) => {
  const searchParams = useSearchParams();
  const toName = searchParams.get('to') || searchParams.get('toName') || 'Guest';
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Allow the complete door reveal to play before entering the invitation.
    window.setTimeout(onOpen, 5200);
  };

  return (
    <main
      className="fixed inset-0 z-[80] overflow-hidden bg-[#fbf3dc] text-[#4b211d]"
      aria-label="Wedding invitation entrance"
    >
      {/* Warm ceremonial atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,215,112,.34),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(129,38,28,.10),transparent_48%)]" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#7b1e1e]/10 to-transparent" />

        {/* Toran */}
        <div className="absolute left-0 right-0 top-0 flex justify-center overflow-hidden">
          <div className="h-14 w-[115%] rounded-b-[50%] border-b-2 border-[#b8872e]/40 bg-[radial-gradient(circle_at_8px_10px,#d68b24_0_3px,transparent_4px)] [background-size:32px_28px] opacity-90" />
        </div>

        {/* Diyas */}
        {[
          ['left-5 top-24', '-6deg'],
          ['right-5 top-24', '6deg'],
          ['left-10 bottom-12', '5deg'],
          ['right-10 bottom-12', '-5deg'],
        ].map(([position, rotation], i) => (
          <motion.div
            key={i}
            className={`absolute ${position} hidden sm:block`}
            style={{ rotate: rotation }}
            animate={{ y: [0, -3, 0], opacity: [0.78, 1, 0.78] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.25 }}
          >
            <div className="relative h-3 w-10 rounded-[50%] border border-[#b8872e] bg-[#b56b26]/70">
              <span className="absolute -top-6 left-1/2 h-7 w-3 -translate-x-1/2 rounded-[70%_30%_70%_30%] bg-[#f6bd43] blur-[1px] shadow-[0_0_18px_7px_rgba(246,189,67,.38)]" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Initial Ganesh invitation */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 flex min-h-screen items-center justify-center px-5 py-10"
          >
            <div className="w-full max-w-xl text-center">
              <motion.div
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="mb-2 text-xs font-semibold tracking-[0.28em] text-[#8a4c23] sm:text-sm">
                  ॐ श्री गणेशाय नमः
                </div>
                <div className="mb-1 text-[10px] uppercase tracking-[0.35em] text-[#a77735]">
                  Om Shree Ganeshay Namah
                </div>
                <div className="mx-auto mb-5 h-px w-28 bg-gradient-to-r from-transparent via-[#b8872e] to-transparent" />
              </motion.div>

              <motion.button
                type="button"
                onClick={handleClick}
                className="group relative mx-auto block w-full max-w-[390px] cursor-pointer rounded-[34px] border border-[#c89b3c]/55 bg-[#fff9e9]/70 p-4 shadow-[0_22px_60px_rgba(90,47,20,.18)] backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#9e2a2b]/40"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                aria-label="Open wedding invitation"
              >
                <div className="absolute inset-3 rounded-[26px] border border-[#b8872e]/35" />
                <div className="relative overflow-hidden rounded-[22px] bg-[#fff6da]">
                  <img
                    src="/assets/images/ChatGPT Image Jun 9, 2026, 09_55_48 PM.png"
                    alt="Lord Ganesha"
                    className="mx-auto aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#6e201a]/35 to-transparent px-5 pb-4 pt-16">
                    <span className="text-xs font-medium tracking-[0.22em] text-white/95">
                      CLICK GANESH JI TO ENTER
                    </span>
                  </div>
                </div>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-5"
              >
                <p className="font-serif text-lg text-[#652b24] sm:text-xl">
                  Dear <span className="font-semibold text-[#9e2a2b]">{toName}</span>
                </p>
                <p className="mt-1 text-sm text-[#80604e] sm:text-base">
                  You are cordially invited to celebrate
                </p>
                <p className="mt-2 font-serif text-base italic text-[#8a4c23]">{coupleName}</p>
                <motion.div
                  animate={{ y: [0, 5, 0], opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="mt-4 text-xl text-[#a77735]"
                >
                  ↓
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ceremonial gates revealed after clicking Ganesh */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-30 overflow-hidden bg-[#3a1714]"
          >
            {/* Wedding courtyard behind the gates */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,#fff1b8_0%,#d9a33f_17%,#7b271e_42%,#301311_76%)]" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1.6 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative h-[70vh] w-[72vw] max-w-4xl rounded-t-[48%] border-4 border-[#d6ad55]/80 bg-[#f8e4a7]/15 shadow-[0_0_100px_rgba(255,219,119,.35)]">
                <div className="absolute inset-5 rounded-t-[45%] border border-[#e4c675]/60" />
                <div className="absolute bottom-0 left-1/2 h-1/2 w-[52%] -translate-x-1/2 rounded-t-[48%] bg-[#5e211b]/60" />
                <div className="absolute bottom-6 left-1/2 h-5 w-28 -translate-x-1/2 rounded-[50%] bg-[#f5c657] shadow-[0_0_35px_12px_rgba(245,198,87,.45)]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8, 1] }}
              transition={{ duration: 2.4, delay: 0.6 }}
              className="absolute left-1/2 top-[15%] z-10 -translate-x-1/2 text-center text-[#ffe7a0]"
            >
              <div className="text-sm tracking-[0.4em]">ॐ</div>
              <div className="mt-2 font-serif text-xl tracking-[0.16em] sm:text-3xl">DIVYA  ·  CHAYAN</div>
            </motion.div>

            {/* Left carved gate */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-102%' }}
              transition={{ delay: 1.55, duration: 2.1, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 origin-left overflow-hidden border-r border-[#e0b95e]/60 bg-[linear-gradient(135deg,#5b1d18,#8e3a25_42%,#4b1715)] shadow-[14px_0_40px_rgba(0,0,0,.38)]"
            >
              <GateArtwork side="left" />
            </motion.div>

            {/* Right carved gate */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '102%' }}
              transition={{ delay: 1.55, duration: 2.1, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 origin-right overflow-hidden border-l border-[#e0b95e]/60 bg-[linear-gradient(225deg,#5b1d18,#8e3a25_42%,#4b1715)] shadow-[-14px_0_40px_rgba(0,0,0,.38)]"
            >
              <GateArtwork side="right" />
            </motion.div>

            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 3.65, duration: 1.1 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-[#fff0b8]"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -8] }}
              transition={{ duration: 4.4, times: [0, 0.25, 0.72, 1], delay: 0.2 }}
              className="absolute bottom-10 left-1/2 z-[60] -translate-x-1/2 whitespace-nowrap font-serif text-sm tracking-[0.18em] text-[#fff1bd] sm:text-base"
            >
              THE DOORS TO OUR CELEBRATION ARE OPENING
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

function GateArtwork({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`absolute inset-0 ${side === 'left' ? 'pl-[8%] pr-[5%]' : 'pl-[5%] pr-[8%]'} py-[7%]`}>
      <div className="h-full rounded-[24px] border-2 border-[#d5a947]/70 bg-[repeating-linear-gradient(90deg,rgba(255,218,123,.08)_0_2px,transparent_2px_28px)] p-4 sm:p-7">
        <div className="h-full rounded-[18px] border border-[#e1bd67]/55 bg-[radial-gradient(circle_at_50%_20%,rgba(236,187,73,.22),transparent_32%),linear-gradient(180deg,rgba(74,20,16,.15),rgba(27,10,9,.42))] p-4 sm:p-8">
          <div className="flex h-full flex-col items-center justify-between border border-[#c99639]/40 py-7">
            <div className="text-3xl text-[#edc76c] sm:text-5xl">✦</div>
            <div className="flex flex-col items-center gap-5 text-[#d9ae50]/75">
              <div className="h-20 w-20 rounded-full border-2 border-[#d9ae50]/70 sm:h-32 sm:w-32">
                <div className="m-3 flex h-[calc(100%-24px)] items-center justify-center rounded-full border border-[#d9ae50]/50 text-3xl sm:text-5xl">ॐ</div>
              </div>
              <div className="h-px w-24 bg-[#d9ae50]/50" />
              <div className="text-2xl sm:text-4xl">❧</div>
            </div>
            <div className="text-xs tracking-[0.35em] text-[#e2bd68] sm:text-sm">शुभ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
