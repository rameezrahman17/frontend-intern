'use client';

import { motion } from 'framer-motion';
import { birthdayConfig } from '../../lib/birthday-config';

const floatEmojis = ['🌸', '✨', '🎀', '💫', '🌷', '⭐', '💐', '🎊', '🎈', '🥳'];

const sparklePositions = [
  { top: '8%',  left: '6%'  },
  { top: '12%', right: '8%' },
  { top: '45%', left: '3%'  },
  { top: '45%', right: '3%' },
  { bottom: '18%', left: '7%'  },
  { bottom: '18%', right: '7%' },
];

export default function BirthdayCard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 z-10 relative overflow-hidden">

      {/* Rising floaters from bottom */}
      {floatEmojis.map((emoji, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.85, 0.85, 0], y: -320 }}
          transition={{ duration: 4.5, delay: i * 0.35, repeat: Infinity, repeatDelay: 1.5 }}
          className="absolute text-xl pointer-events-none select-none"
          style={{ bottom: '5%', left: `${8 + i * 9}%` }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Pulsing sparkles around the card */}
      {sparklePositions.map((pos, i) => (
        <motion.span
          key={`sp-${i}`}
          animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          className="absolute text-2xl pointer-events-none select-none z-20"
          style={pos as React.CSSProperties}
        >
          ✨
        </motion.span>
      ))}

      {/* Card wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: 50, rotateZ: -3 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
        transition={{ duration: 1.1, type: 'spring', bounce: 0.4 }}
        className="relative w-full max-w-sm sm:max-w-md z-10"
      >
        {/* Glow backdrop */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-[2.5rem] blur-2xl bg-accent/30 -z-10 scale-105"
        />

        {/* Card image */}
        <motion.img
          src="/media/5.png"
          alt="Birthday Card"
          className="w-full rounded-[2rem] shadow-2xl shadow-accent/30 border-4 border-white/60"
          initial={{ filter: 'brightness(0.7)' }}
          animate={{ filter: 'brightness(1)' }}
          transition={{ duration: 1.2 }}
        />

        {/* Floating hearts over the card corners */}
        {[
          'absolute -top-4 -left-4',
          'absolute -top-4 -right-4',
          'absolute -bottom-4 -left-4',
          'absolute -bottom-4 -right-4',
        ].map((cls, i) => (
          <motion.span
            key={`h-${i}`}
            className={`${cls} text-3xl drop-shadow-md pointer-events-none select-none`}
            animate={{ scale: [1, 1.35, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2.2, delay: i * 0.5, repeat: Infinity }}
          >
            💕
          </motion.span>
        ))}

        {/* Ribbon banner at top */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.7, type: 'spring' }}
          className="absolute -top-3 left-6 right-6 h-6 bg-linear-to-r from-accent via-pink-300 to-accent rounded-full shadow-md flex items-center justify-center"
        >
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[10px] font-heading font-bold text-white tracking-widest uppercase"
          >
            🎂 Happy Birthday 🎂
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Message below card */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-10 font-script text-2xl text-script-accent text-center"
      >
        Wishing you the best day ever, {birthdayConfig.recipientName}! 🎉
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-2 text-sm text-heading/45 font-sans text-center"
      >
        With all the love in the world 💗
      </motion.p>
    </div>
  );
}
