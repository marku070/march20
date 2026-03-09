import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music/music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.9;

    const handleInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card shadow-lg border border-border hover:scale-110 transition-transform duration-200"
      aria-label={playing ? "Mute music" : "Play music"}
    >
      {playing ? (
        <Volume2 className="w-5 h-5 text-primary" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  );
};

export default MusicPlayer;
