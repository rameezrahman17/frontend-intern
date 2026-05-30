'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Flame, ChevronUp, ChevronDown } from 'lucide-react';
import GlowCard from '../ui/GlowCard';
import { LeaderboardEntry } from '../../lib/types';

interface LeaderboardTileProps {
  entries: LeaderboardEntry[];
  currentStudentName?: string;
}

type SortField = 'total_xp' | 'streak_days';

const podium = [
  'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  'text-zinc-300 bg-zinc-500/10 border-zinc-500/30',
  'text-orange-400 bg-orange-500/10 border-orange-500/30',
];
const medals = ['🥇', '🥈', '🥉'];

const listAnim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const rowAnim = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 280, damping: 24 } },
};

export default function LeaderboardTile({ entries, currentStudentName }: LeaderboardTileProps) {
  const [field, setField] = useState<SortField>('total_xp');
  const [asc, setAsc] = useState(false);

  const ranked = useMemo(
    () => [...entries].sort((a, b) => (asc ? 1 : -1) * (a[field] - b[field])),
    [entries, field, asc]
  );

  const toggleSort = (f: SortField) => {
    if (field === f) setAsc(!asc);
    else { setField(f); setAsc(false); }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto w-full pb-20">
      <GlowCard className="p-6" glowColor="rgba(250, 204, 21, 0.12)">
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

          <div className="flex items-center gap-2">
            {(['total_xp', 'streak_days'] as SortField[]).map((f) => (
              <button
                key={f}
                onClick={() => toggleSort(f)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                  field === f
                    ? f === 'total_xp' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {f === 'total_xp' ? <Zap size={10} /> : <Flame size={10} />}
                {f === 'total_xp' ? 'XP' : 'Streak'}
                {field === f && (asc ? <ChevronUp size={10} /> : <ChevronDown size={10} />)}
              </button>
            ))}
          </div>
        </div>

        <motion.ul variants={listAnim} initial="hidden" animate="show" className="space-y-2">
          {ranked.map((entry, i) => {
            const isMe = entry.student_name === currentStudentName;
            const badge = i < 3 ? podium[i] : 'text-zinc-500 bg-zinc-900/40 border-zinc-800/40';
            const initials = entry.student_name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2);

            return (
              <motion.li
                key={entry.id}
                variants={rowAnim}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all ${
                  isMe ? 'bg-cyan-500/5 border-cyan-500/20 ring-1 ring-cyan-500/20' : 'bg-zinc-900/30 border-zinc-800/40 hover:border-zinc-700/60'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${badge}`}>
                  {i < 3 ? medals[i] : `#${i + 1}`}
                </div>

                <div className="w-8 h-8 rounded-full bg-[linear-gradient(to_bottom_right,theme(colors.violet.500),theme(colors.fuchsia.500))] flex items-center justify-center text-[10px] font-bold text-white shrink-0 select-none">
                  {initials}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isMe ? 'text-cyan-300' : 'text-zinc-200'}`}>
                    {entry.student_name}
                    {isMe && <span className="ml-2 text-[10px] text-cyan-500 font-bold">(You)</span>}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-medium">Level {entry.scholar_level} Scholar</p>
                </div>

                <div className="flex items-center gap-1 text-orange-400 text-xs font-bold shrink-0">
                  <Flame size={12} className="text-orange-500" />
                  {entry.streak_days}d
                </div>

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
