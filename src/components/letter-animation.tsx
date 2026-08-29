'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName: string;
}

export const LetterAnimation = ({
  onOpen,
  coupleName,
}: LetterAnimationProps) => {
  const { t } = useTranslation('home');
  const searchParams = useSearchParams();

  const toName =
    searchParams.get('to') || searchParams.get('toName') || t('letter.guest');

  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 8000); // 8 seconds: 1s blur + 5s letter display + 2s loading
  };

  return (
    <div className="fixed inset-0 z-80 bg-gradient-to-br from-amber-50 via-yellow-50 to-red-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100%', opacity: 0.3, rotate: 0 }}
            animate={{
              y: '-100%',
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360, 720],
              x: [0, 50, -50, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
            className="absolute text-amber-300"
            style={{
              left: `${10 + i * 15}%`,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="text-center">
          {/* Greeting Text - Hidden when opening */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? 30 : 0 }}
            transition={{ duration: 1, delay: isOpening ? 0 : 0.5 }}
            className="mb-3 sm:mb-4 md:mb-6"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-red-800 mb-3 sm:mb-4">
              {t('hero.welcome')}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md mx-auto px-2">
              {toName ? (
                <>
                  {t('letter.dear')}{' '}
                  <span className="font-medium text-red-700">{toName}</span>
                  <br />
                  {t('letter.you-are-invited')}
                </>
              ) : (
                t('letter.you-are-invited')
              )}
            </p>
          </motion.div>

          {/* Invitation Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative mx-auto w-full max-w-xs sm:max-w-xs md:max-w-sm"
          >
            <motion.div
              className="relative cursor-pointer"
              onClick={handleClick}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={!isOpening ? { scale: 1.05 } : {}}
              whileTap={!isOpening ? { scale: 0.95 } : {}}
            >
              {/* Invitation Image */}
              <motion.div
                className="relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl"
                animate={{
                  filter: isOpening ? 'blur(20px)' : 'blur(0px)',
                }}
                transition={{ duration: 1 }}
              >
                <img
                  src="/assets/images/ChatGPT Image Jun 9, 2026, 09_55_48 PM.png"
                  alt="Wedding invitation"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Click Instruction Overlay */}
              <AnimatePresence>
                {!isOpening && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-xs sm:text-sm font-medium"
                      >
                        {t('letter.click-to-open-hover')}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Letter Inside - Appears on blur */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute inset-0 flex items-center justify-center z-50 p-4"
              >
                <motion.div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-2xl border-2 border-amber-200 overflow-hidden">
                  {/* Letter Background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-200 rounded-full blur-3xl"></div>
                  </div>

                  {/* Letter Content */}
                  <div className="relative p-6 sm:p-8 md:p-10 text-center">
                    {/* Ornamental Top */}
                    <div className="text-3xl sm:text-4xl mb-4 text-amber-600">✦</div>

                    {/* Letter Content */}
                    <div className="space-y-4">
                      {toName && (
                        <p className="text-base sm:text-lg text-amber-900 font-serif">
                          {t('letter.dear')} <span className="font-bold text-red-700">{toName}</span>
                        </p>
                      )}

                      <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-red-800 mb-2">
                        {coupleName}
                      </h2>

                      <p className="text-sm sm:text-base text-amber-900 font-serif leading-relaxed max-w-sm mx-auto">
                        {t('letter.invitation-title')}
                      </p>

                      <div className="pt-4 pb-2">
                        <p className="text-base sm:text-lg font-serif italic text-red-700">
                          &ldquo;{t('letter.invitation-quote')}&rdquo;
                        </p>
                      </div>

                      {/* Ornamental Bottom */}
                      <div className="text-2xl sm:text-3xl text-amber-600">✦</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Click Instruction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpening ? 0 : 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="mt-3 sm:mt-4 md:mt-6"
          >
            <motion.p
              animate={{
                y: [0, -8, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-xs sm:text-sm text-gray-600 font-medium"
            >
              {t('letter.click-to-open')}
            </motion.p>
            <div className="flex justify-center mt-3 sm:mt-4">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-xl sm:text-2xl"
              >
                👆
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading overlay when opening */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 5.5 }}
            className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-40"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-amber-200 border-t-red-700 rounded-full mx-auto mb-4"
              />
              <p className="text-red-700 text-lg font-serif font-medium">
                {t('letter.opening-the-invitation')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
