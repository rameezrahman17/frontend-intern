'use client';

import { motion } from 'framer-motion';
import { birthdayConfig } from '../../lib/birthday-config';

const floaters = ['🌸', '✨', '🎀', '💫', '🌷', '⭐', '💐', '🎊'];

export default function BirthdayCard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 z-10 relative">

      {/* Floating decorations */}
      {floaters.map((emoji, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            y: [20, -80, -160, -240],
            x: Math.sin(i * 1.5) * 60,
          }}
          transition={{
            duration: 4,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute text-xl pointer-events-none"
          style={{ bottom: '10%', left: `${10 + i * 10}%` }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.45 }}
        className="relative w-full max-w-md"
      >
        {/* Card outer — envelope feel */}
        <div className="relative bg-white rounded-[2rem] shadow-2xl shadow-accent/20 border border-accent-light/30 overflow-hidden">

          {/* Top decorative band */}
          <div className="h-3 w-full bg-gradient-to-r from-accent via-pink-300 to-accent" />

          {/* Card body */}
          <div className="px-8 py-10 flex flex-col items-center text-center">

            {/* Animated emoji */}
            <motion.span
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="text-6xl mb-6 block drop-shadow-md"
            >
              🎂
            </motion.span>

            {/* To line */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-script text-lg text-script-accent mb-1"
            >
              To my dearest,
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, type: 'spring', bounce: 0.4 }}
              className="font-heading font-bold text-4xl text-heading sparkle-text mb-6"
            >
              {birthdayConfig.recipientName} 💗
            </motion.h2>

            {/* Ruled lines — empty for the sender to fill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-full space-y-4 mb-8"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-full border-b border-dashed border-accent-light/60 h-7" />
              ))}
            </motion.div>

            {/* Signature area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="w-full text-right"
            >
              <p className="font-script text-lg text-script-accent">With love,</p>
              <div className="mt-2 border-b border-dashed border-accent-light/60 w-40 ml-auto h-7" />
            </motion.div>
          </div>

          {/* Bottom decorative band */}
          <div className="h-3 w-full bg-gradient-to-r from-accent via-pink-300 to-accent" />
        </div>

        {/* Corner hearts */}
        {['top-3 left-3', 'top-3 right-3', 'bottom-6 left-3', 'bottom-6 right-3'].map((pos, i) => (
          <motion.span
            key={i}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
            className={`absolute ${pos} text-xl pointer-events-none`}
          >
            💕
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 text-sm text-heading/50 font-sans text-center"
      >
        Happy Birthday once again, bestie! 🎂
      </motion.p>
    </div>
  );
}
