'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { birthdayConfig } from '../../lib/birthday-config';

interface Step1CollageProps {
  onNext: () => void;
}

export default function Step1Collage({ onNext }: Step1CollageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px' });

  const photoSlots = birthdayConfig.photos.map((photo, index) => ({
    id: `photo-${index}`,
    type: 'photo' as const,
    src: photo.src,
    backMessage: photo.backMessage,
    rotation: photo.rotation,
  }));

  const headingText = birthdayConfig.greetingHeadline;
  const words = headingText.split(' ');

  return (
    <div 
      ref={containerRef} 
      className="flex flex-col items-center justify-between h-screen max-h-screen px-4 py-4 sm:py-6 z-10 relative w-full overflow-hidden select-none"
    >
      
      {/* ── Animated Heading ── */}
      <div className="text-center w-full mt-2 sm:mt-4">
        <motion.h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-heading leading-tight sparkle-text">
          {words.map((word, wi) => (
            <motion.span
              key={wi}
              initial={{ opacity: 0, y: 25, rotateX: -90 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: wi * 0.1 + 0.1, duration: 0.6, type: 'spring', bounce: 0.4 }}
              className="inline-block mr-1.5"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="font-script text-base sm:text-lg md:text-xl text-script-accent mt-0.5"
        >
          {birthdayConfig.greetingSubtext}
        </motion.p>
      </div>

      {/* ── Decorative sparkles ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9 }}
        className="flex justify-center gap-1.5 my-1"
      >
        {['✨', '🎂', '🎀', '🎂', '✨'].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.2 }}
            className="text-sm sm:text-base"
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      {/* ── Overlapping Scattered Collage Grid ── */}
      <div className="w-full flex-1 flex flex-col justify-center min-h-0 relative my-2">
        <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[360px] md:max-w-[420px] mx-auto">
          {/* Top Left Photo */}
          <FlippablePhotoCard 
            slot={photoSlots[0]}
            index={0}
            isInView={isInView}
            className="top-[3%] left-[3%] w-[29%]"
          />
          
          {/* Top Right Photo */}
          <FlippablePhotoCard 
            slot={photoSlots[1]}
            index={1}
            isInView={isInView}
            className="top-[3%] right-[3%] w-[29%]"
          />

          {/* Center Video Card */}
          <FlippableVideoCard 
            isInView={isInView} 
            className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[39%]"
          />

          {/* Bottom Left Photo */}
          <FlippablePhotoCard 
            slot={photoSlots[2]}
            index={2}
            isInView={isInView}
            className="bottom-[3%] left-[3%] w-[29%]"
          />
          
          {/* Bottom Right Photo */}
          <FlippablePhotoCard 
            slot={photoSlots[3]}
            index={3}
            isInView={isInView}
            className="bottom-[3%] right-[3%] w-[29%]"
          />
        </div>
      </div>

      {/* ── Tap hint + Next Button ── */}
      <div className="mb-2 sm:mb-4 flex flex-col items-center gap-2 w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
          className="text-[10px] sm:text-xs text-heading/60 font-sans tap-hint"
        >
          ✨ Tap any card to flip it! ✨
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, type: 'spring', bounce: 0.5 }}
          onClick={onNext}
          whileHover={{ scale: 1.06, y: -1 }}
          whileTap={{ scale: 0.94 }}
          className="px-8 py-2.5 sm:py-3 bg-accent hover:bg-accent-hover text-white rounded-full font-heading font-bold text-sm sm:text-base shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/35 cursor-pointer transition-all duration-300"
        >
          See My Surprise ✨
        </motion.button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Flippable Photo Card (scattered style)
   ───────────────────────────────────── */
function FlippablePhotoCard({ 
  slot, index, isInView, className 
}: { 
  slot: { id: string; src: string; backMessage: string; rotation: number }; 
  index: number; 
  isInView: boolean;
  className: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const xStart = index % 2 === 0 ? -40 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, x: xStart, y: 15, rotate: slot.rotation - 6 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: slot.rotation } : {}}
      transition={{ delay: 0.25 + index * 0.15, duration: 0.7, type: 'spring', bounce: 0.35 }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 50 }}
      className={`absolute ${className}`}
      style={{ zIndex: flipped ? 40 : 10 + index }}
    >
      <div 
        className={`flip-card w-full aspect-[4/5] ${flipped ? 'flipped' : ''}`} 
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flip-card-inner">
          {/* FRONT */}
          <div className="flip-card-front">
            <div className="relative w-full h-full bg-white p-1 sm:p-1.5 pb-4 sm:pb-6 shadow-lg border border-accent-light/10 rounded-sm card-shimmer">
              <div className="w-full h-full overflow-hidden rounded-sm bg-gray-50">
                <img src={slot.src} alt="Memory" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <span className="absolute -top-1 -right-1 text-xs drop-shadow-sm">💗</span>
            </div>
          </div>
          {/* BACK */}
          <div className="flip-card-back">
            <div className="w-full h-full bg-gradient-to-br from-accent to-accent-hover rounded-sm shadow-lg flex flex-col items-center justify-center p-2.5 sm:p-3 text-center">
              <motion.span 
                className="text-lg sm:text-xl mb-1" 
                animate={{ rotate: [0, -8, 8, 0] }} 
                transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
              >
                💌
              </motion.span>
              <p className="font-script text-white text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-sm line-clamp-4">
                {slot.backMessage}
              </p>
              <span className="text-[8px] text-white/40 font-sans mt-1.5">tap to flip</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────
   Flippable Video Card (scattered style)
   ───────────────────────────────────── */
function FlippableVideoCard({ 
  isInView, className 
}: { 
  isInView: boolean; 
  className: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: 0.45, duration: 0.9, type: 'spring', bounce: 0.4 }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 50 }}
      className={`absolute ${className}`}
      style={{ zIndex: flipped ? 40 : 15 }}
    >
      <div 
        className={`flip-card w-full aspect-[4/5] ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flip-card-inner">
          {/* FRONT */}
          <div className="flip-card-front">
            <div className="relative w-full h-full bg-white p-1 sm:p-1.5 pb-4 sm:pb-6 shadow-xl border border-accent-light/15 rounded-sm card-shimmer">
              <div className="w-full h-full overflow-hidden rounded-sm bg-gray-50">
                <video 
                  src={birthdayConfig.video.src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="absolute -top-1.5 -right-1.5 text-sm drop-shadow-md rotate-12">💗</span>
              <span className="absolute -bottom-1 -left-1.5 text-xs drop-shadow-sm -rotate-12">✨</span>
            </div>
          </div>
          {/* BACK */}
          <div className="flip-card-back">
            <div className="w-full h-full bg-gradient-to-br from-accent to-[#d4507a] rounded-sm shadow-xl flex flex-col items-center justify-center p-2.5 sm:p-3 text-center">
              <motion.span 
                className="text-xl sm:text-2xl mb-1" 
                animate={{ scale: [1, 1.12, 1] }} 
                transition={{ repeat: Infinity, duration: 1.4 }}
              >
                🎬
              </motion.span>
              <p className="font-script text-white text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-sm line-clamp-4">
                {birthdayConfig.video.backMessage}
              </p>
              <span className="text-[8px] text-white/40 font-sans mt-2">tap to flip</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
