'use client';

import { motion, Variants } from 'framer-motion';
import { Course, Profile, ActivityLog } from '../../lib/types';
import HeroTile from './HeroTile';
import CourseCard from './CourseCard';
import ActivityTile from './ActivityTile';

interface BentoGridProps {
  courses: Course[];
  profile: Profile;
  activityLogs: ActivityLog[];
}

const grid: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 24 } as const,
  },
};

export default function BentoGrid({ courses, profile, activityLogs }: BentoGridProps) {
  return (
    <motion.main
      variants={grid}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full pb-20 md:pb-8"
    >
      <motion.div variants={tile} className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2">
        <HeroTile
          studentName={profile.student_name}
          streakDays={profile.streak_days}
          scholarLevel={profile.scholar_level}
          dailyGoalProgress={profile.daily_goal_progress}
          nextMilestoneXp={profile.next_milestone_xp}
        />
      </motion.div>

      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} variants={tile} index={i} />
      ))}

      <motion.div variants={tile} className="col-span-1 md:col-span-2 lg:col-span-3">
        <ActivityTile activityLogs={activityLogs} />
      </motion.div>
    </motion.main>
  );
}
