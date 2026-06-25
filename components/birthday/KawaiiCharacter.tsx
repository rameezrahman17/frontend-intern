'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type MascotMood = 'happy' | 'shy' | 'pouty' | 'celebrating';

interface KawaiiCharacterProps {
  mood: MascotMood;
}

export default function KawaiiCharacter({ mood }: KawaiiCharacterProps) {
  // SVG face details depending on the mood
  const renderFace = () => {
    switch (mood) {
      case 'shy':
        return (
          <>
            {/* Blushing cheeks - large and pink */}
            <circle cx="65" cy="80" r="10" fill="#FF8CA3" opacity="0.8" className="animate-pulse" />
            <circle cx="135" cy="80" r="10" fill="#FF8CA3" opacity="0.8" className="animate-pulse" />
            
            {/* Shy/sweat lines or shy eyes */}
            <path d="M 68 62 Q 75 67 82 62" stroke="#7A1B3A" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 118 62 Q 125 67 132 62" stroke="#7A1B3A" strokeWidth="3" strokeLinecap="round" fill="none" />
            
            {/* Cute shy mouth */}
            <path d="M 97 78 Q 100 81 103 78" stroke="#7A1B3A" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        );

      case 'pouty':
        return (
          <>
            {/* Tiny blush */}
            <circle cx="62" cy="82" r="6" fill="#FF8CA3" opacity="0.5" />
            <circle cx="138" cy="82" r="6" fill="#FF8CA3" opacity="0.5" />
            
            {/* Pouty/Sad eyes */}
            <path d="M 65 60 Q 75 55 85 65" stroke="#7A1B3A" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 115 65 Q 125 55 135 60" stroke="#7A1B3A" strokeWidth="3" strokeLinecap="round" fill="none" />
            
            {/* Pouty mouth */}
            <path d="M 95 82 Q 100 78 105 82" stroke="#7A1B3A" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        );

      case 'happy':
      case 'celebrating':
      default:
        return (
          <>
            {/* Blush */}
            <circle cx="65" cy="80" r="8" fill="#FF8CA3" opacity="0.6" />
            <circle cx="135" cy="80" r="8" fill="#FF8CA3" opacity="0.6" />
            
            {/* Happy closed eyes */}
            <path d="M 65 65 Q 75 55 85 65" stroke="#7A1B3A" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 115 65 Q 125 55 135 65" stroke="#7A1B3A" strokeWidth="4" strokeLinecap="round" fill="none" />
            
            {/* Big smiling mouth */}
            <path d="M 90 75 Q 100 90 110 75" stroke="#7A1B3A" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        );
    }
  };

  const getAnimation = () => {
    switch (mood) {
      case 'celebrating':
        return {
          y: [0, -20, 0, -20, 0],
          rotate: [0, -5, 5, -5, 0],
          transition: { repeat: Infinity, duration: 1.5 }
        };
      case 'shy':
        return {
          y: [0, 5, 0],
          rotate: [0, 2, 0],
          transition: { repeat: Infinity, duration: 3 }
        };
      case 'pouty':
        return {
          y: [0, 2, 0],
          rotate: [0, -2, 0],
          transition: { repeat: Infinity, duration: 4 } as const
        };
      case 'happy':
      default:
        return {
          y: [0, -10, 0],
          transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' as const }
        };
    }
  };

  return (
    <div className="flex justify-center items-center w-full max-w-[200px]">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-auto drop-shadow-xl"
        animate={getAnimation()}
      >
        {/* Shadow */}
        <ellipse cx="100" cy="175" rx="50" ry="8" fill="rgba(122, 27, 58, 0.1)" />

        {/* Mascot Body - Cute Mochi/Cloud shape */}
        <path
          d="M 100 30 
             C 145 30, 165 50, 165 95 
             C 165 140, 150 160, 100 160 
             C 50 160, 35 140, 35 95 
             C 35 50, 55 30, 100 30 Z"
          fill="#FFF5F8"
          stroke="#7A1B3A"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Arms */}
        {mood === 'celebrating' ? (
          <>
            {/* Raised arms */}
            <path d="M 37 95 Q 20 75 15 70" stroke="#7A1B3A" strokeWidth="4" strokeLinecap="round" />
            <path d="M 163 95 Q 180 75 185 70" stroke="#7A1B3A" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : mood === 'pouty' ? (
          <>
            {/* Shaking arms downwards */}
            <path d="M 37 105 Q 26 120 22 122" stroke="#7A1B3A" strokeWidth="4" strokeLinecap="round" />
            <path d="M 163 105 Q 174 120 178 122" stroke="#7A1B3A" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Cute side arms */}
            <path d="M 37 105 Q 25 110 20 105" stroke="#7A1B3A" strokeWidth="4" strokeLinecap="round" />
            <path d="M 163 105 Q 175 110 180 105" stroke="#7A1B3A" strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {/* Feet */}
        <ellipse cx="75" cy="161" rx="10" ry="6" fill="#FFF5F8" stroke="#7A1B3A" strokeWidth="4" />
        <ellipse cx="125" cy="161" rx="10" ry="6" fill="#FFF5F8" stroke="#7A1B3A" strokeWidth="4" />

        {/* Face */}
        {renderFace()}
      </motion.svg>
    </div>
  );
}
