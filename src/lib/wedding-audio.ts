/* Single shared <audio> for the wedding song. It must be created and first
   played inside the "Click to Enter" tap handler: Safari/iOS only honour
   play() in the gesture call stack and only on that same element, so the
   MusicPlayer (mounted much later) reuses this instance instead of its own. */
const WEDDING_SONG_SRC = '/assets/audio/shirushi-lisa.mp3';

let instance: HTMLAudioElement | null = null;

export const getWeddingAudio = (): HTMLAudioElement | null => {
  if (typeof window === 'undefined') return null;
  if (!instance) {
    instance = new Audio(WEDDING_SONG_SRC);
    instance.loop = true;
    instance.preload = 'auto';
    instance.setAttribute('playsinline', '');
  }
  return instance;
};

/** Call synchronously from a user gesture. */
export const startWeddingAudio = () => {
  const audio = getWeddingAudio();
  if (!audio) return;
  void audio.play().catch(() => {
    const retry = () => void audio.play().catch(() => undefined);
    audio.addEventListener('canplay', retry, { once: true });
    audio.load();
  });
};
