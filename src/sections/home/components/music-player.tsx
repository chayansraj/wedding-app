'use client';

import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface MusicPlayerProps {
  className?: string;
}

export default function MusicPlayer({ className = '' }: MusicPlayerProps) {
  const { t } = useTranslation('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showAutoplayModal, setShowAutoplayModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Auto-play attempt
    const attemptAutoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
        setHasInteracted(true);
      } catch {
        setIsPlaying(false);
        setAutoplayBlocked(true);
        setHasInteracted(false);
        // Show autoplay modal when blocked
        setShowAutoplayModal(true);
      }
    };

    // Try autoplay after a short delay
    const timer = setTimeout(() => {
      attemptAutoPlay();

      // Show welcome message if autoplay fails after a delay
      const welcomeTimer = setTimeout(() => {
        setShowWelcomeMessage(true);
        // Hide welcome message after 5 seconds
        setTimeout(() => setShowWelcomeMessage(false), 5000);
      }, 2000);

      return () => clearTimeout(welcomeTimer);
    }, 1500);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      clearTimeout(timer);
    };
  }, []); // Empty dependency array is correct here

  const togglePlayPause = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    // Hide welcome message and modal when user interacts
    setShowWelcomeMessage(false);
    setShowAutoplayModal(false);

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
        setHasInteracted(true);
      }
    } catch {
      // Audio play failed - could be network issue or browser policy
      setAutoplayBlocked(true);
      setIsPlaying(false);
    }
  };

  const handleAllowAutoplay = () => {
    setShowAutoplayModal(false);
    // Attempt to play after user acknowledges
    togglePlayPause();
  };

  const handleDismissModal = () => {
    setShowAutoplayModal(false);
    setShowWelcomeMessage(true);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Autoplay Modal */}
      {showAutoplayModal && !hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-4"
                >
                  🎵
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t('music.enable-music')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('music.browser-blocked')}
                </p>
              </div>

              {/* Browser Settings Guide */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <span className="mr-2">⚙️</span>
                  {t('music.how-to-enable')}
                </h4>
                <div className="text-blue-700 text-sm space-y-1">
                  <p>
                    • <strong>Chrome/Edge:</strong> {t('music.chrome-edge')}
                  </p>
                  <p>
                    • <strong>Firefox:</strong> {t('music.firefox')}
                  </p>
                  <p>
                    • <strong>Safari:</strong> {t('music.safari')}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAllowAutoplay}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {t('music.play-music')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDismissModal}
                  className="px-4 py-3 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  {t('music.later')}
                </motion.button>
              </div>

              {/* Footer note */}
              <p className="text-xs text-gray-500 text-center mt-4">
                {t('music.auto-note')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Welcome message for autoplay blocked */}
      {showWelcomeMessage && !hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed bottom-24 left-4 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg shadow-xl backdrop-blur-sm max-w-xs"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl"
            >
              🎵
            </motion.div>
            <div>
              <div className="font-medium text-sm">
                {t('music.wedding-music')}
              </div>
              <div className="text-xs opacity-90">
                {t('music.click-to-start')}
              </div>
            </div>
          </div>
          <motion.div
            className="absolute -bottom-1 left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.0,
          type: 'spring',
          stiffness: 200,
        }}
        className={`fixed bottom-6 left-4 z-50 ${className}`}
      >
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          loop
          preload="auto"
          src="/assets/audio/shirushi-lisa.mp3"
          aria-label="Wedding background music"
        >
          <track
            kind="captions"
            src="/assets/audio/shirushi-lisa.mp3"
            label="No captions available"
          />
          Your browser does not support the audio element.
        </audio>

        {/* Progress Ring */}
        <div className="relative">
          <svg
            className="w-11 h-11 transform -rotate-90 absolute inset-0"
            viewBox="0 0 64 64"
          >
            {/* Background circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#musicGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: progress / 100,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                strokeDasharray: '175.93',
                strokeDashoffset: 0,
              }}
            />
            <defs>
              <linearGradient
                id="musicGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Main Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-11 h-11 bg-white/95 backdrop-blur-md border border-white/20 rounded-full shadow-2xl hover:shadow-cyan-200/50 transition-all duration-300 group overflow-hidden ${
              autoplayBlocked && !hasInteracted ? 'animate-pulse' : ''
            }`}
            onClick={togglePlayPause}
          >
            {/* Button background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-full"
              animate={{
                background:
                  autoplayBlocked && !hasInteracted
                    ? [
                        'linear-gradient(45deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                        'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))',
                        'linear-gradient(225deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3))',
                        'linear-gradient(315deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                      ]
                    : [
                        'linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                        'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
                        'linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))',
                        'linear-gradient(315deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                      ],
              }}
              transition={{
                duration: autoplayBlocked && !hasInteracted ? 2 : 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Icon container */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              {isPlaying ? (
                // Pause icon with animated sound waves
                <div className="flex items-center space-x-0.5">
                  <motion.div
                    animate={{
                      scaleY: [1, 1.5, 1, 2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-1 h-3 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-full"
                  />
                  <motion.div
                    animate={{
                      scaleY: [1, 2, 1, 1.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.2,
                    }}
                    className="w-1 h-4 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                  />
                  <motion.div
                    animate={{
                      scaleY: [1, 1.5, 2, 1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.4,
                    }}
                    className="w-1 h-3 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-full"
                  />
                </div>
              ) : (
                // Play icon
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-lg filter drop-shadow-sm"
                >
                  🎵
                </motion.div>
              )}
            </div>

            {/* Ripple effect on click */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 2, opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>

          {/* Music info tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-4 bg-gray-800/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm whitespace-nowrap pointer-events-none"
          >
            <div className="font-medium">
              {isPlaying
                ? `🎵 ${t('music.playing')}`
                : autoplayBlocked && !hasInteracted
                ? `🎵 ${t('music.click-to-start')}`
                : `🎵 ${t('music.paused')}`}
            </div>
            <div className="text-gray-300 text-xs">
              {autoplayBlocked && !hasInteracted
                ? `${t('music.wedding-music')} (Autoplay Blocked)`
                : t('music.wedding-music')}
            </div>

            {/* Tooltip arrow */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-gray-800/90 border-y-4 border-y-transparent"></div>
          </motion.div>

          {/* Volume indicator for when playing */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </motion.div>
          )}

          {/* Click indicator when autoplay is blocked */}
          {autoplayBlocked && !hasInteracted && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-white text-xs font-bold"
              >
                !
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
