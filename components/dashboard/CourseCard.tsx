'use client';

import { motion, Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Course } from '../../lib/types';
import GlowCard from '../ui/GlowCard';
import DynamicIcon from '../ui/DynamicIcon';

interface CourseCardProps {
  course: Course;
  variants?: Variants;
  index?: number;
}

const palette = [
  {
    glow:    'rgba(6, 182, 212, 0.18)',
    text:    'text-cyan-400',
    bar:     'bg-cyan-500',
    border:  'border-cyan-800/40',
    iconBg:  'bg-cyan-500/10',
  },
  {
    glow:    'rgba(139, 92, 246, 0.18)',
    text:    'text-violet-400',
    bar:     'bg-violet-500',
    border:  'border-violet-800/40',
    iconBg:  'bg-violet-500/10',
  },
  {
    glow:    'rgba(249, 115, 22, 0.18)',
    text:    'text-orange-400',
    bar:     'bg-orange-500',
    border:  'border-orange-800/40',
    iconBg:  'bg-orange-500/10',
  },
  {
    glow:    'rgba(34, 197, 94, 0.18)',
    text:    'text-emerald-400',
    bar:     'bg-emerald-500',
    border:  'border-emerald-800/40',
    iconBg:  'bg-emerald-500/10',
  },
];

export default function CourseCard({ course, variants, index = 0 }: CourseCardProps) {
  const theme = palette[index % palette.length];

  return (
    <GlowCard variants={variants} glowColor={theme.glow} className="flex flex-col justify-between p-6 min-h-[200px] group">
      <div
        className="absolute inset-0 -z-10 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-2xl ${theme.iconBg} border ${theme.border} shadow-md ${theme.text}`}>
          <DynamicIcon name={course.icon_name} size={22} />
        </div>
        <span className={`text-sm font-extrabold tracking-tight ${theme.text}`}>
          {course.progress}%
        </span>
      </div>

      <div className="mt-5 flex-1 flex flex-col justify-end">
        <h3 className="text-base font-bold text-zinc-100 tracking-tight leading-snug line-clamp-2">
          {course.title}
        </h3>
      </div>

      <div className="mt-5 space-y-3">
        <div className="relative h-2 w-full bg-zinc-900 border border-zinc-800/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ width: `${course.progress}%`, transformOrigin: 'left' }}
            transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.4 }}
            className={`absolute inset-y-0 left-0 rounded-full ${theme.bar}`}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-bold tracking-wider uppercase select-none">
          <span>{course.progress === 100 ? 'Completed' : 'Resume Course'}</span>
          <motion.div
            variants={{ rest: { opacity: 0, x: -4 }, hover: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 20 } } }}
            className={theme.text}
          >
            <ChevronRight size={12} />
          </motion.div>
        </div>
      </div>
    </GlowCard>
  );
}
