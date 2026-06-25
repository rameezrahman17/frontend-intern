'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { birthdayConfig } from '../../lib/birthday-config';

interface Step1CollageProps {
  onNext: () => void;
}

export default function Step1Collage({ onNext }: Step1CollageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px' });

  const photos = birthdayConfig.photos;
  const words = birthdayConfig.greetingHeadline.split(' ');

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen px-4 py-4 z-10 relative w-full overflow-hidden select-none"
    >
      {/* Heading */}
      <div className="text-center w-full pt-2 sm:pt-4 shrink-0">
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
          className="font-script text-base sm:text-lg text-script-accent mt-1"
        >
          {birthdayConfig.greetingSubtext}
        </motion.p>
      </div>

      {/* Emoji row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9 }}
        className="flex justify-center gap-2 shrink-0"
      >
        {['✨', '🎂', '🎀', '🎂', '✨'].map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.2 }}
            className="text-base sm:text-lg"
          >
            {e}
          </motion.span>
        ))}
      </motion.div>

      {/* Collage */}
      <div className="w-full flex-1 flex items-center justify-center min-h-0 py-2">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md px-2">

          {/* Row 1: photo | video | photo */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: photos[0].rotation - 4 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: photos[0].rotation } : {}}
            transition={{ delay: 0.25, duration: 0.7, type: 'spring', bounce: 0.35 }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 50 }}
            className="aspect-[4/5]"
          >
            <PhotoCard src={photos[0].src} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.9, type: 'spring', bounce: 0.4 }}
            whileHover={{ scale: 1.06, zIndex: 50 }}
            className="aspect-[4/5]"
          >
            <VideoCard src={birthdayConfig.video.src} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, rotate: photos[1].rotation + 4 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: photos[1].rotation } : {}}
            transition={{ delay: 0.35, duration: 0.7, type: 'spring', bounce: 0.35 }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 50 }}
            className="aspect-[4/5]"
          >
            <PhotoCard src={photos[1].src} />
          </motion.div>

          {/* Row 2: photo | empty | photo */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: photos[2].rotation - 4 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: photos[2].rotation } : {}}
            transition={{ delay: 0.5, duration: 0.7, type: 'spring', bounce: 0.35 }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 50 }}
            className="aspect-[4/5]"
          >
            <PhotoCard src={photos[2].src} />
          </motion.div>

          {/* Center bottom — decorative */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="aspect-[4/5] flex items-center justify-center"
          >
            <motion.span
              animate={{ scale: [1, 1.18, 1], rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="text-3xl sm:text-4xl drop-shadow-md"
            >
              💗
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, rotate: photos[3].rotation + 4 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: photos[3].rotation } : {}}
            transition={{ delay: 0.55, duration: 0.7, type: 'spring', bounce: 0.35 }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 50 }}
            className="aspect-[4/5]"
          >
            <PhotoCard src={photos[3].src} />
          </motion.div>

        </div>
      </div>

      {/* Button */}
      <div className="pb-4 sm:pb-6 shrink-0 flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, type: 'spring', bounce: 0.5 }}
          onClick={onNext}
          whileHover={{ scale: 1.06, y: -1 }}
          whileTap={{ scale: 0.94 }}
          className="px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-full font-heading font-bold text-base sm:text-lg shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/35 cursor-pointer transition-all duration-300"
        >
          Choose a Gift 🎁
        </motion.button>
      </div>
    </div>
  );
}

function PhotoCard({ src }: { src: string }) {
  return (
    <div className="w-full h-full bg-white p-1 sm:p-1.5 pb-4 sm:pb-5 shadow-lg border border-accent-light/10 rounded-sm card-shimmer">
      <div className="w-full h-full overflow-hidden rounded-sm bg-gray-50">
        <img src={src} alt="Memory" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <span className="absolute -top-1 -right-1 text-xs drop-shadow-sm">💗</span>
    </div>
  );
}

function VideoCard({ src }: { src: string }) {
  return (
    <div className="w-full h-full bg-white p-1 sm:p-1.5 pb-4 sm:pb-5 shadow-xl border border-accent-light/15 rounded-sm card-shimmer">
      <div className="w-full h-full overflow-hidden rounded-sm bg-gray-50">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <span className="absolute -top-1.5 -right-1.5 text-sm drop-shadow-md rotate-12">💗</span>
    </div>
  );
}
