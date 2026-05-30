'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BookOpen, Flame, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, GraduationCap, Trophy } from 'lucide-react';
import { Profile } from '../../lib/types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (t: string) => void;
  profile: Profile;
}

const navItems = [
  { id: 'dashboard',   label: 'Dashboard',     Icon: LayoutDashboard },
  { id: 'courses',     label: 'My Courses',    Icon: BookOpen        },
  { id: 'progress',    label: 'Streak & Stats', Icon: Flame          },
  { id: 'analytics',   label: 'Analytics',     Icon: BarChart3       },
  { id: 'leaderboard', label: 'Leaderboard',   Icon: Trophy          },
  { id: 'settings',    label: 'Settings',      Icon: Settings        },
];

export default function Sidebar({ activeTab, setActiveTab, profile }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const initials = useMemo(() => {
    const parts = profile.student_name?.trim().split(/\s+/) ?? [];
    if (!parts.length) return 'JD';
    return parts.length === 1
      ? parts[0].slice(0, 2).toUpperCase()
      : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [profile.student_name]);

  return (
    <aside className={`hidden md:flex flex-col h-screen sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-900 transition-all duration-300 ease-in-out overflow-hidden ${collapsed ? 'w-[72px]' : 'w-64'}`}>
      <div className="flex items-center h-20 border-b border-zinc-900/60 px-4 shrink-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 shrink-0">
          <GraduationCap size={20} />
        </div>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              key="name"
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

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand' : 'Collapse'}
          className="ml-auto flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors shrink-0"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-1">
          {navItems.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <li key={id}>
                <button
                  onClick={() => setActiveTab(id)}
                  title={collapsed ? label : undefined}
                  className={`relative w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition-colors duration-200 group ${active ? 'text-zinc-50 font-medium' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.1),rgba(139,92,246,0.1))] border-l-2 border-cyan-500 rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className={`relative z-10 transition-transform group-hover:scale-105 shrink-0 ${active ? 'text-cyan-400' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                    <Icon size={20} />
                  </div>
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span
                        key={`lbl-${id}`}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="relative z-10 text-sm tracking-wide whitespace-nowrap overflow-hidden"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-zinc-900/60 shrink-0">
        <div className={`flex items-center gap-3 p-2 rounded-xl bg-zinc-900/40 border border-zinc-900/20 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-[linear-gradient(to_bottom_right,theme(colors.violet.500),theme(colors.fuchsia.500))] flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner select-none">
            {initials}
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                key="user"
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
          {!collapsed && (
            <button className="text-zinc-500 hover:text-zinc-300 transition-colors p-1.5 rounded-lg hover:bg-zinc-800/50 cursor-pointer shrink-0">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
