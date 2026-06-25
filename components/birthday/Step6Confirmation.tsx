'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KawaiiCharacter from './KawaiiCharacter';
import BirthdayCard from './BirthdayCard';
import { birthdayConfig, GiftId } from '../../lib/birthday-config';

interface Step6ConfirmationProps {
  giftChoice: GiftId;
}

const confetti = ['🎉', '🎊', '🥳', '💖', '✨', '🎂', '🎀', '💐'];

export default function Step6Confirmation({ giftChoice }: Step6ConfirmationProps) {
  const [showCard, setShowCard] = useState(false);
  const gift = birthdayConfig.gifts.find((g) => g.id === giftChoice);

  if (showCard) {
    return (
      <motion.div
        key="card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      >
        <BirthdayCard />
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 text-center z-10 relative max-w-lg mx-auto overflow-hidden">

      {confetti.map((emoji, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 400,
            scale: [0, 1.5, 1, 0.5],
            rotate: Math.random() * 720 - 360,
          }}
          transition={{ duration: 2.5, delay: i * 0.1, ease: 'easeOut' }}
          className="absolute text-3xl pointer-events-none z-0"
          style={{ top: '40%', left: '50%' }}
        >
          {emoji}
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.6 }}
        className="w-full flex flex-col items-center bg-white/70 backdrop-blur-md border border-white/50 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-accent/15 z-10 relative"
      >
        <motion.div
          className="mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' as const }}
        >
          <KawaiiCharacter mood="celebrating" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', bounce: 0.6 }}
          className="font-heading font-bold text-4xl sm:text-5xl text-heading mb-3 leading-tight sparkle-text"
        >
          {giftChoice === 'movie' ? 'Jldi Batana! 😄' : "Yay! Can't wait! 🎉"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-script text-2xl text-script-accent mb-8"
        >
          You're the best, {birthdayConfig.recipientName}!
        </motion.p>

        {/* Gift recap */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, type: 'spring', bounce: 0.5 }}
          className="w-full bg-linear-to-br from-accent-light/20 to-accent-light/10 border border-accent-light/40 rounded-2xl p-5 text-left flex items-center gap-4 shadow-inner mb-8"
        >
          <motion.span
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-5xl drop-shadow-md shrink-0"
          >
            {gift?.emoji || '🎁'}
          </motion.span>
          <div>
            <span className="text-xs text-heading/50 block font-heading tracking-wider mb-1">YOUR CHOICE</span>
            <strong className="font-heading font-bold text-xl text-heading">{gift?.label || giftChoice}</strong>
            {gift?.description && <p className="text-sm text-heading/60 font-sans mt-1">{gift.description}</p>}
          </div>
        </motion.div>

        {/* Open birthday card */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, type: 'spring', bounce: 0.5 }}
          onClick={() => setShowCard(true)}
          whileHover={{ scale: 1.07, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-3.5 bg-accent hover:bg-accent-hover text-white rounded-full font-heading font-bold text-lg shadow-lg shadow-accent/30 cursor-pointer transition-all duration-300"
        >
          Open Your Birthday Card 💌
        </motion.button>
      </motion.div>
    </div>
  );
}
