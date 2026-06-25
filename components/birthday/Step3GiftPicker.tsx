'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { birthdayConfig, GiftId } from '../../lib/birthday-config';

interface Step3GiftPickerProps {
  selectedGift: GiftId | null;
  onSelectGift: (giftId: GiftId) => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

export default function Step3GiftPicker({
  selectedGift,
  onSelectGift,
  onConfirm,
  isSubmitting = false,
}: Step3GiftPickerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 z-10 relative max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-heading mb-3">
          Pick your gift 🎁
        </h2>
        <p className="font-sans text-lg text-heading/70">
          Choose exactly one option that makes you happiest!
        </p>
      </motion.div>

      {/* Grid of gift options */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 w-full mb-12">
        {birthdayConfig.gifts.map((gift, i) => {
          const isSelected = selectedGift === gift.id;
          return (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: 'spring', bounce: 0.5 }}
              onClick={() => onSelectGift(gift.id)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center justify-center p-6 rounded-[2rem] cursor-pointer transition-colors duration-300 border-4 ${
                isSelected 
                  ? 'bg-white border-accent shadow-xl shadow-accent/20' 
                  : 'bg-white/60 border-transparent hover:bg-white/90 shadow-sm'
              }`}
            >
              {/* Checkmark Badge */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                  className="absolute -top-3 -right-3 bg-accent text-white p-2 rounded-full shadow-md z-20"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </motion.div>
              )}

              {/* Emoji illustration */}
              <motion.span 
                animate={isSelected ? { y: [0, -8, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-6xl mb-4 block drop-shadow-sm"
              >
                {gift.emoji}
              </motion.span>

              {/* Title and Description */}
              <div className="text-center">
                <h3 className="font-heading font-bold text-lg text-heading mb-2 leading-tight">
                  {gift.label}
                </h3>
                <p className="font-sans text-sm text-heading/60 leading-snug">
                  {gift.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Confirm Button */}
      <div className="h-20 flex items-center justify-center w-full">
        {selectedGift && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            onClick={onConfirm}
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.08 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            className="px-12 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-heading font-bold text-xl tracking-wide shadow-lg shadow-accent/30 cursor-pointer disabled:opacity-70 disabled:cursor-wait transition-all duration-300"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <span className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                Confirming...
              </span>
            ) : (
              'Confirm Gift 💖'
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
