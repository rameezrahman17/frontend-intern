'use client';

import { motion, Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Course } from '../../lib/types';
import GlowCard from '../ui/GlowCard';
import DynamicIcon from '../ui/DynamicIcon';

interface CourseCardProps {
  course: Course;
  variants?: Variants;
}

function accentGlow(p: number) {
  if (p >= 80) return 'rgba(139, 92, 246, 0.15)';
  if (p >= 50) return 'rgba(6, 182, 212, 0.15)';
  return 'rgba(236, 72, 153, 0.15)';
}

function accentText(p: number) {
  if (p >= 80) return 'text-violet-400';
  if (p >= 50) return 'text-cyan-400';
  return 'text-pink-400';
}

function accentBar(p: number) {
  if (p >= 80) return 'bg-violet-500';
  if (p >= 50) return 'bg-cyan-500';
  return 'bg-pink-500';
}

export default function CourseCard({ course, variants }: CourseCardProps) {
  return (
    <GlowCard variants={variants} glowColor={accentGlow(course.progress)} className="flex flex-col justify-between p-6 min-h-[200px] group">
      <div className="absolute inset-0 -z-20 opacity-60" style={{ background: 'radial-gradient(circle at 0% 0%, rgba(39,39,42,0.15), transparent)' }} />
      <div
        className="absolute inset-0 -z-10 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-md ${accentText(course.progress)}`}>
          <DynamicIcon name={course.icon_name} size={22} />
        </div>
        <span className={`text-sm font-extrabold tracking-tight ${accentText(course.progress)}`}>
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
            className={`absolute inset-y-0 left-0 rounded-full ${accentBar(course.progress)}`}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-bold tracking-wider uppercase select-none">
          <span>{course.progress === 100 ? 'Completed' : 'Resume Course'}</span>
          <motion.div
            variants={{ rest: { opacity: 0, x: -4 }, hover: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 20 } } }}
            className="text-zinc-400"
          >
            <ChevronRight size={12} />
          </motion.div>
        </div>
      </div>
    </GlowCard>
  );
}
