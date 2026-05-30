'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to an analytics service or logger
    console.error('Next-Gen Dashboard Error caught:', error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-zinc-950">
      
      {/* Glow Backing Accent */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_40%] from-red-500/5 via-transparent to-transparent -z-10" />

      {/* Animated Card Containment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="
          max-w-md p-8 rounded-2xl
          bg-zinc-950/65 backdrop-blur-xl
          border border-red-500/20
          shadow-2xl shadow-red-500/5
          flex flex-col items-center
        "
      >
        {/* Glowing Error Icon */}
        <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-6 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          <AlertCircle size={32} />
        </div>

        {/* Header Title */}
        <h2 className="text-xl font-bold text-zinc-100 tracking-tight leading-snug">
          Dashboard Connection Offline
        </h2>

        {/* Error Detail description */}
        <p className="text-xs text-zinc-500 font-medium leading-relaxed my-4">
          We failed to connect securely to the database to retrieve your learning records. 
          Please verify your connection settings or try again.
        </p>

        {/* Digest Info (Only if present) */}
        {error.digest && (
          <code className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono tracking-wider mb-6">
            Ref ID: {error.digest}
          </code>
        )}

        {/* Control Button Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          {/* Recovery Reset */}
          <button
            onClick={() => reset()}
            className="
              flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl
              bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold
              transition-all duration-200 select-none active:scale-98
            "
          >
            <RotateCcw size={14} />
            <span>Try Again</span>
          </button>

          {/* Go Home navigation */}
          <a
            href="/"
            className="
              flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl
              bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-800
              text-xs font-bold transition-all duration-200 select-none active:scale-98
            "
          >
            <Home size={14} />
            <span>Home</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
