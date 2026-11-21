import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Language } from '../data/weddingData';

// 1-second silent PCM WAV data URI so the audio element plays cleanly
// without network requests until a custom Shehnai track URL is supplied.
const SILENT_WAV_DATA_URI =
  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';

interface WeddingAudioPlayerProps {
  lang: Language;
  src?: string;
  hidden?: boolean;
}

export function WeddingAudioPlayer({
  lang,
  src = SILENT_WAV_DATA_URI,
  hidden = false,
}: WeddingAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.pause();
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        audio.volume = 0.45;
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  if (hidden) {
    return <audio ref={audioRef} src={src} loop preload="none" aria-hidden="true" />;
  }

  const label = isPlaying
    ? lang === 'kn'
      ? 'ಶಹನಾಯಿ ಸಂಗೀತ ನಿಲ್ಲಿಸಿ'
      : 'Pause Shehnai music'
    : lang === 'kn'
    ? 'ಶಹನಾಯಿ ಸಂಗೀತ ಪ್ಲೇ ಮಾಡಿ'
    : 'Play Shehnai music';

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" aria-hidden="true" />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={label}
        aria-pressed={isPlaying}
        title={label}
        className={`fixed top-14 right-4 md:top-20 md:right-6 z-30 inline-flex items-center justify-center w-11 h-11 rounded-full border shadow-md backdrop-blur-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C24] focus-visible:ring-offset-2 ${
          isPlaying
            ? 'bg-[#7A1C24] text-[#FBF6EC] border-[#B0812C] hover:bg-[#61141B]'
            : 'bg-[#FBF6EC]/95 text-[#7A1C24] border-[#B0812C]/80 hover:bg-[#F4EBDA]'
        }`}
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </>
  );
}
