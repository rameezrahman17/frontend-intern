'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { birthdayConfig } from '../../lib/birthday-config';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(birthdayConfig.musicSrc);
    audioRef.current.loop = true;
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-md border border-accent-light/50 rounded-full shadow-lg text-accent hover:bg-accent hover:text-white transition-all duration-300"
      aria-label="Toggle background music"
    >
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
}
