'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Flame, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Trophy,
} from 'lucide-react';

import { Profile } from '../../lib/types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: Profile;
}

export default function Sidebar({ activeTab, setActiveTab, profile }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const initials = React.useMemo(() => {
    if (!profile.student_name) return 'JD';
    const parts = profile.student_name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [profile.student_name]);

  const menuItems = [
    { id: 'dashboard',   name: 'Dashboard',    icon: LayoutDashboard },
    { id: 'courses',     name: 'My Courses',   icon: BookOpen        },
    { id: 'progress',    name: 'Streak & Stats', icon: Flame         },
    { id: 'analytics',   name: 'Analytics',    icon: BarChart3       },
    { id: 'leaderboard', name: 'Leaderboard',  icon: Trophy          },
    { id: 'settings',    name: 'Settings',     icon: Settings        },
  ];

  return (
    <aside 
      className={`
        hidden md:flex flex-col h-screen sticky top-0 z-40
        bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-900
        transition-all duration-300 ease-in-out overflow-hidden
        ${isCollapsed ? 'w-[72px]' : 'w-64'}
      `}
    >
      {/* Brand Header */}
      <div className="flex items-center h-20 border-b border-zinc-900/60 px-4 shrink-0">
        {/* Logo icon — always visible */}
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 shrink-0">
          <GraduationCap size={20} />
        </div>

        {/* Brand name — hidden when collapsed */}
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.span
              key="brand-name"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-3 text-lg font-bold text-zinc-100 tracking-wide whitespace-nowrap overflow-hidden select-none"
            >
              NexLearn
            </motion.span>
          )}
        </AnimatePresence>

        {/* Collapse toggle — always visible, pushed to right */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            ml-auto flex items-center justify-center w-7 h-7 rounded-lg
            bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200
            border border-zinc-800 transition-colors shrink-0
          `}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.name : undefined}
                  className={`
                    relative w-full flex items-center gap-3 px-3 py-3.5 rounded-xl
                    text-left transition-colors duration-200 group
                    ${isActive ? 'text-zinc-50 font-medium' : 'text-zinc-400 hover:text-zinc-200'}
                  `}
                >
                  {/* Active Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border-l-2 border-cyan-500 rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div className={`relative z-10 transition-transform group-hover:scale-105 shrink-0 ${isActive ? 'text-cyan-400' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                    <Icon size={20} />
                  </div>

                  {/* Label */}
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.span
                        key={`label-${item.id}`}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="relative z-10 text-sm tracking-wide whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Session Footer */}
      <div className="p-3 border-t border-zinc-900/60 shrink-0">
        <div className={`flex items-center gap-3 p-2 rounded-xl bg-zinc-900/40 border border-zinc-900/20 ${isCollapsed ? 'justify-center' : ''}`}>
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner select-none">
            {initials}
          </div>

          {/* Name only — email hidden here, visible in profile/settings */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                key="user-info"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <p className="text-xs font-semibold text-zinc-200 truncate whitespace-nowrap">{profile.student_name}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isCollapsed && (
            <button className="text-zinc-500 hover:text-zinc-300 transition-colors p-1.5 rounded-lg hover:bg-zinc-800/50 cursor-pointer shrink-0">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
