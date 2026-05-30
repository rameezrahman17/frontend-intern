'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Flame, BarChart3, Settings, Bell, Search, Zap, Mail, User } from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import MobileNav from '../layout/MobileNav';
import BentoGrid from './BentoGrid';
import LeaderboardTile from './LeaderboardTile';
import GlowCard from '../ui/GlowCard';
import { Course, Profile, ActivityLog, LeaderboardEntry } from '../../lib/types';

interface Props {
  courses: Course[];
  profile: Profile;
  activityLogs: ActivityLog[];
  leaderboard: LeaderboardEntry[];
}

const pageTransition = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
};

const titles: Record<string, string> = {
  dashboard: 'Student Dashboard',
  courses: 'My Learning Pathways',
  progress: 'Streak Dashboard',
  analytics: 'Performance Insights',
  leaderboard: 'Leaderboard',
  settings: 'Profile & Settings',
};

export default function DashboardShell({ courses, profile, activityLogs, leaderboard }: Props) {
  const [tab, setTab] = useState('dashboard');

  const content = () => {
    switch (tab) {
      case 'dashboard':
        return <BentoGrid courses={courses} profile={profile} activityLogs={activityLogs} />;

      case 'courses':
        return (
          <div className="space-y-6 max-w-7xl mx-auto w-full pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((c) => (
                <GlowCard key={c.id} className="p-6 flex flex-col justify-between min-h-[220px]" glowColor="rgba(6, 182, 212, 0.15)">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-cyan-400">
                      <BookOpen size={24} />
                    </div>
                    <span className="text-sm font-extrabold text-cyan-400">{c.progress}% Completed</span>
                  </div>
                  <div className="my-6">
                    <h3 className="text-lg font-bold text-zinc-100">{c.title}</h3>
                    <p className="text-xs text-zinc-500 mt-2 font-medium">Synced with Supabase</p>
                  </div>
                  <div className="w-full bg-zinc-900 border border-zinc-800/50 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6 max-w-4xl mx-auto w-full pb-20">
            <GlowCard className="p-8 text-center" glowColor="rgba(249, 115, 22, 0.15)">
              <div className="mx-auto w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mb-6 animate-pulse">
                <Flame size={36} />
              </div>
              <h2 className="text-xl font-extrabold text-zinc-100">{profile.streak_days}-Day Streak</h2>
              <p className="text-sm text-zinc-400 mt-2 font-medium max-w-sm mx-auto">
                Consistency is the key. Keep showing up every day.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-cyan-400 font-bold text-lg">
                <Zap size={18} className="fill-cyan-400" />
                {(profile.total_xp ?? 0).toLocaleString()} Total XP
              </div>
            </GlowCard>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6 max-w-4xl mx-auto w-full pb-20">
            <GlowCard className="p-8 text-center" glowColor="rgba(139, 92, 246, 0.15)">
              <div className="mx-auto w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-500 flex items-center justify-center mb-6">
                <BarChart3 size={32} />
              </div>
              <h2 className="text-xl font-extrabold text-zinc-100">Learning Analytics</h2>
              <p className="text-sm text-zinc-400 mt-2 font-medium max-w-sm mx-auto">
                Study duration, progress curves, and subject mastery breakdowns coming soon.
              </p>
            </GlowCard>
          </div>
        );

      case 'leaderboard':
        return <LeaderboardTile entries={leaderboard} currentStudentName={profile.student_name} />;

      case 'settings':
        return (
          <div className="space-y-6 max-w-4xl mx-auto w-full pb-20">
            <GlowCard className="p-8" glowColor="rgba(236, 72, 153, 0.15)">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full bg-[linear-gradient(to_bottom_right,theme(colors.violet.500),theme(colors.fuchsia.500))] flex items-center justify-center text-xl font-bold text-white shadow-inner select-none">
                  {profile.student_name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-zinc-100 flex items-center gap-2">
                    <User size={18} className="text-violet-400" />
                    {profile.student_name}
                  </h2>
                  {profile.email && (
                    <p className="text-sm text-zinc-400 mt-1 flex items-center gap-2">
                      <Mail size={13} className="text-zinc-500" />
                      {profile.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-zinc-900/60 pt-6">
                <div className="text-center">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Total XP</p>
                  <p className="text-lg font-extrabold text-cyan-400 mt-1">{(profile.total_xp ?? 0).toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Streak</p>
                  <p className="text-lg font-extrabold text-orange-400 mt-1">{profile.streak_days} days</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Level</p>
                  <p className="text-lg font-extrabold text-violet-400 mt-1">{profile.scholar_level}</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="p-8 text-center" glowColor="rgba(236, 72, 153, 0.10)">
              <div className="mx-auto w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 flex items-center justify-center mb-6">
                <Settings size={32} />
              </div>
              <h2 className="text-xl font-extrabold text-zinc-100">Account Settings</h2>
              <p className="text-sm text-zinc-400 mt-2 font-medium max-w-sm mx-auto">
                Manage your credentials, theme preferences, and sync configurations.
              </p>
            </GlowCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Sidebar activeTab={tab} setActiveTab={setTab} profile={profile} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-zinc-900/60 px-4 md:px-8 flex items-center justify-between sticky top-0 bg-zinc-950/85 backdrop-blur-md z-30">
          <div className="flex items-center gap-3">
            <div className="w-10 md:hidden" />
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-zinc-100 tracking-tight leading-none">
                {titles[tab] ?? 'NexLearn'}
              </h2>
              <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mt-1 hidden sm:block">
                NexLearn Education
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-48 xl:w-60 bg-zinc-900/60 border border-zinc-800/80 rounded-xl py-2 pl-9 pr-4 text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <Search className="absolute left-3 top-2.5 text-zinc-500" size={13} />
            </div>
            <button className="relative p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-pointer select-none">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </button>
          </div>
        </header>

        <div className="flex-1 px-4 md:px-8 py-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={tab} {...pageTransition} className="w-full flex-1 flex flex-col min-h-0">
              {content()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <MobileNav activeTab={tab} setActiveTab={setTab} profile={profile} />
    </div>
  );
}
