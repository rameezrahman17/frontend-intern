'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Flame, ChevronUp, ChevronDown } from 'lucide-react';
import GlowCard from '../ui/GlowCard';
import { LeaderboardEntry } from '../../lib/types';

interface LeaderboardTileProps {
  entries: LeaderboardEntry[];
  currentStudentName?: string;
}

type SortKey = 'total_xp' | 'streak_days';

export default function LeaderboardTile({ entries, currentStudentName }: LeaderboardTileProps) {
  const [sortKey, setSortKey] = useState<SortKey>('total_xp');
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = React.useMemo(() => {
    return [...entries].sort((a, b) => {
      const diff = a[sortKey] - b[sortKey];
      return sortAsc ? diff : -diff;
    });
  }, [entries, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const rankColors = [
    'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    'text-zinc-300 bg-zinc-500/10 border-zinc-500/30',
    'text-orange-400 bg-orange-500/10 border-orange-500/30',
  ];

  const rankEmoji = ['🥇', '🥈', '🥉'];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 280, damping: 24 } },
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto w-full pb-20">
      <GlowCard className="p-6" glowColor="rgba(250, 204, 21, 0.12)">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4 mb-5">
          <div className="flex items-center gap-3 select-none">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-yellow-400">
              <Trophy size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-200 tracking-tight">Student Leaderboard</h3>
              <p className="text-[10px] text-zinc-500 font-semibold tracking-wide uppercase mt-0.5">Ranked by XP</p>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSort('total_xp')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                sortKey === 'total_xp'
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Zap size={10} />
              XP
              {sortKey === 'total_xp' && (sortAsc ? <ChevronUp size={10} /> : <ChevronDown size={10} />)}
            </button>
            <button
              onClick={() => handleSort('streak_days')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                sortKey === 'streak_days'
                  ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Flame size={10} />
              Streak
              {sortKey === 'streak_days' && (sortAsc ? <ChevronUp size={10} /> : <ChevronDown size={10} />)}
            </button>
          </div>
        </div>

        {/* Leaderboard Rows */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {sorted.map((entry, index) => {
            const isCurrentUser = entry.student_name === currentStudentName;
            const rankStyle = index < 3 ? rankColors[index] : 'text-zinc-500 bg-zinc-900/40 border-zinc-800/40';

            return (
              <motion.li
                key={entry.id}
                variants={rowVariants}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl border transition-all
                  ${isCurrentUser
                    ? 'bg-cyan-500/5 border-cyan-500/20 ring-1 ring-cyan-500/20'
                    : 'bg-zinc-900/30 border-zinc-800/40 hover:border-zinc-700/60'
                  }
                `}
              >
                {/* Rank Badge */}
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${rankStyle}`}>
                  {index < 3 ? rankEmoji[index] : `#${index + 1}`}
                </div>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0 select-none">
                  {entry.student_name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2)}
                </div>

                {/* Name + Level */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isCurrentUser ? 'text-cyan-300' : 'text-zinc-200'}`}>
                    {entry.student_name}
                    {isCurrentUser && <span className="ml-2 text-[10px] text-cyan-500 font-bold">(You)</span>}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-medium">Level {entry.scholar_level} Scholar</p>
                </div>

                {/* Streak */}
                <div className="flex items-center gap-1 text-orange-400 text-xs font-bold shrink-0">
                  <Flame size={12} className="text-orange-500" />
                  {entry.streak_days}d
                </div>

                {/* XP */}
                <div className="flex items-center gap-1 text-cyan-400 text-xs font-bold shrink-0 min-w-[60px] justify-end">
                  <Zap size={10} className="fill-cyan-400" />
                  {entry.total_xp.toLocaleString()}
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </GlowCard>
    </div>
  );
}
