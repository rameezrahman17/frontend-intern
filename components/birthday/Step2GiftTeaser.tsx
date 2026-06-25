'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KawaiiCharacter from './KawaiiCharacter';
import { birthdayConfig } from '../../lib/birthday-config';

interface Step2GiftTeaserProps {
  onYes: () => void;
}

export default function Step2GiftTeaser({ onYes }: Step2GiftTeaserProps) {
  const [showTease, setShowTease] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 text-center z-10 relative max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {!showTease ? (
          <motion.div
            key="ask-teaser"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            {/* Mascot - Shy mood */}
            <motion.div 
              className="mb-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <KawaiiCharacter mood="shy" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="font-script text-4xl text-script-accent mb-3"
            >
              Hey {birthdayConfig.termOfEndearment}...
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
              className="font-heading font-bold text-4xl sm:text-5xl text-heading mb-10 leading-tight"
            >
              Do you want to see your gift?
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="flex flex-col sm:flex-row gap-5 w-full sm:justify-center"
            >
              <motion.button
                onClick={onYes}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="px-12 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-heading font-bold text-lg shadow-lg shadow-accent/30 cursor-pointer transition-all duration-300 w-full sm:w-auto order-1 sm:order-2"
              >
                YES PLEASE ✨
              </motion.button>
              <motion.button
                onClick={() => setShowTease(true)}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="px-10 py-4 bg-accent-light/15 hover:bg-accent-light/40 text-heading border-2 border-accent/30 rounded-full font-heading font-bold text-lg cursor-pointer transition-all duration-300 w-full sm:w-auto order-2 sm:order-1"
              >
                NO THANKS
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="tease-branch"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            {/* Mascot - Pouty/Sad mood */}
            <motion.div 
              className="mb-8"
              animate={{ rotate: [0, -3, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <KawaiiCharacter mood="pouty" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="font-script text-4xl text-script-accent mb-3"
            >
              Seriously?! 😤
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
              className="font-heading font-bold text-4xl sm:text-5xl text-heading mb-10 leading-tight"
            >
              Best friends don't say no! 🥺
            </motion.h2>

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, type: 'spring' }}
              onClick={() => setShowTease(false)}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.92 }}
              className="px-12 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-heading font-bold text-lg shadow-lg shadow-accent/30 cursor-pointer transition-all duration-300"
            >
              Fine, take me back! 😅
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
