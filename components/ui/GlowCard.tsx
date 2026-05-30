'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'nav' | 'main';
  glowColor?: string;
  variants?: Variants;
}

export default function GlowCard({
  children,
  className = '',
  as = 'article',
  glowColor = 'rgba(6, 182, 212, 0.15)', // default cyan glow
  variants,
}: GlowCardProps) {
  const Component = motion[as] as any;

  return (
    <Component
      variants={variants}
      whileHover={{
        scale: 1.018,
        boxShadow: `0 0 35px ${glowColor}, inset 0 0 12px rgba(255, 255, 255, 0.05)`,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }
      }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-zinc-950/65 backdrop-blur-xl
        border border-zinc-800/80
        shadow-2xl shadow-black/40
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {/* Background Mesh Gradient Glow (Subtle visual texture) */}
      <div className="absolute inset-0 -z-10 bg-radial-[circle_at_50%_120%] from-zinc-800/10 via-transparent to-transparent pointer-events-none opacity-50" />
      
      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </Component>
  );
}
