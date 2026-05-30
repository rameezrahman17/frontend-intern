'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flame, Zap } from 'lucide-react';
import GlowCard from '../ui/GlowCard';
import { ActivityLog } from '../../lib/types';

interface ActivityTileProps {
  activityLogs: ActivityLog[];
}

const ROWS = 7;
const COLS = 20;

function cellStyle(level: number) {
  const styles: Record<number, string> = {
    0: 'bg-zinc-900 border-zinc-800/40',
    1: 'bg-cyan-950/40 border-cyan-900/30',
    2: 'bg-cyan-800/30 border-cyan-700/30',
    3: 'bg-cyan-500/30 border-cyan-400/40',
    4: 'bg-cyan-400/70 border-cyan-300/50 shadow-[0_0_8px_rgba(6,182,212,0.3)]',
  };
  return styles[level] ?? styles[0];
}

export default function ActivityTile({ activityLogs }: ActivityTileProps) {
  const logMap = useMemo(() => {
    const m = new Map<string, number>();
    activityLogs.forEach((l) => {
      const key = l.activity_date.includes('T') ? l.activity_date.split('T')[0] : l.activity_date;
      m.set(key, l.activity_count);
    });
    return m;
  }, [activityLogs]);

  const totalXP = useMemo(
    () => activityLogs.reduce((s, l) => s + l.activity_count, 0) * 10,
    [activityLogs]
  );

  const activeWeeks = useMemo(() => {
    let count = 0;
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const offset = (COLS - 1 - c) * ROWS + (ROWS - 1 - r);
        const d = new Date();
        d.setDate(d.getDate() - offset);
        if (logMap.get(d.toISOString().split('T')[0]) ?? 0) { count++; break; }
      }
    }
    return count;
  }, [logMap]);

  return (
    <GlowCard glowColor="rgba(139, 92, 246, 0.12)" className="min-h-[340px] p-6 flex flex-col justify-between w-full">
      <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4">
        <div className="flex items-center gap-3 select-none">
          <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-violet-400">
            <Calendar size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-200 tracking-tight">Learning Consistency</h3>
            <p className="text-[10px] text-zinc-500 font-semibold tracking-wide uppercase mt-0.5">Activity Chart</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold">
          <Zap size={10} className="fill-cyan-400" />
          +{totalXP.toLocaleString()} XP
        </div>
      </div>

      <div className="my-6 overflow-x-auto flex justify-center">
        <div className="flex gap-2 min-w-[340px] items-center">
          <div className="flex flex-col justify-between text-[9px] text-zinc-600 font-bold h-24 py-1 pr-1.5 select-none">
            <span>M</span><span>W</span><span>F</span>
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-1.5">
            {Array.from({ length: COLS }).map((_, c) =>
              Array.from({ length: ROWS }).map((_, r) => {
                const offset = (COLS - 1 - c) * ROWS + (ROWS - 1 - r);
                const d = new Date();
                d.setDate(d.getDate() - offset);
                const key = d.toISOString().split('T')[0];
                const count = logMap.get(key) ?? 0;
                const level = Math.min(count, 4) as 0 | 1 | 2 | 3 | 4;
                const label = `${d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}: ${count} point${count !== 1 ? 's' : ''}`;
                return (
                  <motion.div
                    key={`${c}-${r}`}
                    whileHover={{ scale: 1.25, zIndex: 20 }}
                    title={label}
                    className={`w-2.5 h-2.5 rounded-sm border cursor-pointer ${cellStyle(level)}`}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-500 font-semibold border-t border-zinc-900/60 pt-4 select-none">
        <div className="flex items-center gap-1.5">
          <Flame size={12} className="text-orange-500" />
          Active Weeks: <strong className="text-zinc-300 ml-1">{activeWeeks}</strong>
        </div>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => <div key={l} className={`w-2.5 h-2.5 rounded-sm border ${cellStyle(l)}`} />)}
          <span>More</span>
        </div>
      </div>
    </GlowCard>
  );
}
