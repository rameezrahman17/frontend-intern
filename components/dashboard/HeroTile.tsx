'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Trophy } from 'lucide-react';
import ThreeScene from '../three/Scene';
import GlowCard from '../ui/GlowCard';

interface HeroTileProps {
  studentName?: string;
  streakDays?: number;
  scholarLevel?: number;
  dailyGoalProgress?: number;
  nextMilestoneXp?: number;
}

/**
 * Inner content variants — these run AFTER the parent tile has entered
 * (parent uses `when: 'afterChildren'` is not needed; the delay cascade
 * from the BentoGrid stagger means the tile is visible before these fire).
 * Using `transition.delay` relative to when the card itself appears.
 */
const contentVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24, delay: 0.15 },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delay: 0.25, duration: 0.4 },
  },
};

export default function HeroTile({
  studentName = 'John Doe',
  streakDays = 12,
  scholarLevel = 4,
  dailyGoalProgress = 80,
  nextMilestoneXp = 1200,
}: HeroTileProps) {
  return (
    <GlowCard
      glowColor="rgba(6, 182, 212, 0.2)"
      className="min-h-[340px] flex flex-col md:flex-row relative group w-full h-full"
    >
      {/* 3D mascot — right half on desktop, top strip on mobile */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-[200px] md:h-full z-0 overflow-hidden">
        <ThreeScene />
      </div>

      {/* Text content — sits in front of the canvas */}
      <div className="relative z-10 flex-1 p-6 md:p-8 flex flex-col justify-between h-full pointer-events-none md:max-w-[55%]">

        {/* Streak + level badges */}
        <div className="flex flex-wrap gap-2.5 items-center pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold shadow-lg shadow-orange-500/5 select-none"
          >
            <Flame size={14} className="animate-pulse text-orange-500" />
            <span>{streakDays} Day Learning Streak</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold shadow-lg shadow-violet-500/5 select-none"
          >
            <Trophy size={14} className="text-violet-500" />
            <span>Level {scholarLevel} Scholar</span>
          </motion.div>
        </div>

        {/* Greeting — tied to parent stagger via variants */}
        <div className="mt-8 md:mt-12 select-none">
          <motion.h1
            variants={contentVariants}
            className="text-2xl md:text-4xl font-extrabold text-zinc-100 tracking-tight leading-none"
          >
            Welcome back,<br />
            <span className="text-cyan-400">{studentName}</span> 👋
          </motion.h1>

          <motion.p
            variants={subtitleVariants}
            className="text-sm text-zinc-400 mt-3 font-medium max-w-[280px] leading-relaxed"
          >
            You are outperforming 86% of students in your cohort this week. Keep the momentum flying.
          </motion.p>
        </div>

        {/* Metric footer */}
        <div className="mt-8 md:mt-0 flex gap-6 items-center pointer-events-auto">
          <div className="text-left select-none">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Daily Goal</span>
            <span className="text-lg font-extrabold text-cyan-400">{dailyGoalProgress}% Completed</span>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-left select-none">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Next Milestone</span>
            <span className="text-sm font-semibold text-zinc-300 flex items-center gap-1.5 mt-0.5">
              <Sparkles size={12} className="text-yellow-400" />
              {nextMilestoneXp.toLocaleString()} XP
            </span>
          </div>
        </div>

      </div>
    </GlowCard>
  );
}
