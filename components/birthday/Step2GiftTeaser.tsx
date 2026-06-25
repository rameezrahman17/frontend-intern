'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KawaiiCharacter from './KawaiiCharacter';
import { birthdayConfig } from '../../lib/birthday-config';

interface Step2GiftTeaserProps {
  onYes: () => void;
}

export default function Step2GiftTeaser({ onYes }: Step2GiftTeaserProps) {
  const [showTease, setShowTease] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const flee = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const box = container.getBoundingClientRect();
    const maxX = box.width - 160;
    const maxY = box.height - 60;

    const randX = Math.random() * maxX - maxX / 2;
    const randY = Math.random() * maxY - maxY / 2;

    setBtnPos({ x: randX, y: randY });
    setClickCount((c) => c + 1);

    if (clickCount >= 2) {
      setTimeout(() => setShowTease(true), 400);
    }
  }, [clickCount]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 text-center z-10 relative max-w-lg mx-auto overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!showTease ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            <motion.div
              className="mb-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' as const }}
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

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:justify-center items-center relative">
              {/* YES button — normal */}
              <motion.button
                onClick={onYes}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="px-12 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-heading font-bold text-lg shadow-lg shadow-accent/30 cursor-pointer transition-all duration-300 w-full sm:w-auto"
              >
                YES PLEASE ✨
              </motion.button>

              {/* NO THANKS — flees the cursor */}
              <motion.button
                animate={{ x: btnPos.x, y: btnPos.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={flee}
                onTouchStart={flee}
                onClick={flee}
                className="px-10 py-4 bg-accent-light/15 text-heading border-2 border-accent/30 rounded-full font-heading font-bold text-lg cursor-pointer transition-colors duration-300 w-full sm:w-auto select-none"
              >
                No Thanks
              </motion.button>
            </div>

            {clickCount > 0 && clickCount <= 2 && (
              <motion.p
                key={clickCount}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 font-script text-lg text-script-accent"
              >
                {clickCount === 1 ? "You can't catch it 😜" : "Almost got it... 😅"}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="tease"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            className="w-full flex flex-col items-center"
          >
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
              onClick={() => { setShowTease(false); setBtnPos({ x: 0, y: 0 }); setClickCount(0); }}
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
