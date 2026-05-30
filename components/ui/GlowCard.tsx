'use client';

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
  glowColor = 'rgba(6, 182, 212, 0.15)',
  variants,
}: GlowCardProps) {
  const Tag = motion[as] as any;

  return (
    <Tag
      variants={variants}
      style={{ borderColor: 'rgba(39, 39, 42, 0.8)' }}
      whileHover={{
        scale: 1.018,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        boxShadow: `0 0 35px ${glowColor}, inset 0 0 12px rgba(255,255,255,0.05)`,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className={`relative overflow-hidden rounded-2xl bg-zinc-950/65 backdrop-blur-xl border border-transparent shadow-2xl shadow-black/40 transition-shadow duration-300 ${className}`}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(39,39,42,0.1),transparent)] pointer-events-none opacity-50" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </Tag>
  );
}
