'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { birthdayConfig } from '../../lib/birthday-config';

interface Step0LandingProps {
  onOpen: () => void;
}

export default function Step0Landing({ onOpen }: Step0LandingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center z-10 relative">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
        className="max-w-md p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-md border border-accent-light shadow-2xl shadow-accent-light/40"
      >
        <motion.span
          animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="text-7xl mb-8 block drop-shadow-lg"
        >
          💌
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
          className="font-heading font-bold text-5xl sm:text-6xl text-heading mb-4 leading-tight sparkle-text"
        >
          {birthdayConfig.siteTitle}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="font-script text-xl text-script-accent mb-10"
        >
          {birthdayConfig.siteDescription}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: 'spring', bounce: 0.5 }}
          onClick={onOpen}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="w-full sm:w-auto px-12 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-heading font-bold text-xl tracking-wide shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/45 cursor-pointer transition-all duration-300"
        >
          Open Letter 💕
        </motion.button>
      </motion.div>
    </div>
  );
}
