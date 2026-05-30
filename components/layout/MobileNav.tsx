'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Flame, 
  BarChart3, 
  Settings,
  Trophy,
  Menu,
  X,
  GraduationCap,
  LogOut,
} from 'lucide-react';
import { Profile } from '../../lib/types';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile?: Profile;
}

export default function MobileNav({ activeTab, setActiveTab, profile }: MobileNavProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard',   name: 'Dashboard',    icon: LayoutDashboard },
    { id: 'courses',     name: 'My Courses',   icon: BookOpen        },
    { id: 'progress',    name: 'Streak & Stats', icon: Flame         },
    { id: 'analytics',   name: 'Analytics',    icon: BarChart3       },
    { id: 'leaderboard', name: 'Leaderboard',  icon: Trophy          },
    { id: 'settings',    name: 'Settings',     icon: Settings        },
  ];

  const initials = React.useMemo(() => {
    if (!profile?.student_name) return 'JD';
    const parts = profile.student_name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [profile?.student_name]);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Hamburger button — top-left, mobile only */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden fixed top-5 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors shadow-lg"
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-zinc-950 border-r border-zinc-900 flex flex-col md:hidden shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 h-20 border-b border-zinc-900/60 shrink-0">
                <div className="flex items-center gap-3 select-none">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                    <GraduationCap size={20} />
                  </div>
                  <span className="text-lg font-bold text-zinc-100 tracking-wide">
                    NexLearn
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav Items */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <ul className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => handleSelect(item.id)}
                          className={`
                            relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl
                            text-left transition-colors duration-200 group
                            ${isActive ? 'text-zinc-50 font-medium' : 'text-zinc-400 hover:text-zinc-200'}
                          `}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="drawer-active"
                              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border-l-2 border-cyan-500 rounded-xl"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                          <div className={`relative z-10 shrink-0 ${isActive ? 'text-cyan-400' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                            <Icon size={20} />
                          </div>
                          <span className="relative z-10 text-sm tracking-wide">{item.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* User Footer */}
              {profile && (
                <div className="p-4 border-t border-zinc-900/60 shrink-0">
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/40 border border-zinc-900/20">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner select-none">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-zinc-200 truncate">{profile.student_name}</p>
                    </div>
                    <button className="text-zinc-500 hover:text-zinc-300 transition-colors p-1.5 rounded-lg hover:bg-zinc-800/50 cursor-pointer">
                      <LogOut size={16} />
                    </button>
                  </div>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Tab Bar (still present for quick access) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900 px-2 py-2 flex items-center justify-around h-16 shadow-2xl">
        {menuItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors group"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 mx-1 bg-cyan-500/10 rounded-xl border-t-2 border-cyan-400"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <div className={`relative z-10 transition-transform group-active:scale-95 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`}>
                <Icon size={18} />
              </div>
              <span className={`relative z-10 text-[9px] mt-0.5 font-medium tracking-wide ${isActive ? 'text-zinc-100' : 'text-zinc-500'}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
