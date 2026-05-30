'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flame, Zap } from 'lucide-react';
import GlowCard from '../ui/GlowCard';

import { ActivityLog } from '../../lib/types';

interface ActivityTileProps {
  activityLogs: ActivityLog[];
}

export default function ActivityTile({ activityLogs }: ActivityTileProps) {
  // Generate mock contribution grid: 7 rows (Sunday to Saturday) by 18 columns (weeks)
  const rows = 7;
  const cols = 20;

  const logsMap = React.useMemo(() => {
    const map = new Map<string, number>();
    activityLogs.forEach(log => {
      // Normalizing date formats to YYYY-MM-DD
      const dateStr = log.activity_date.includes('T') ? log.activity_date.split('T')[0] : log.activity_date;
      map.set(dateStr, log.activity_count);
    });
    return map;
  }, [activityLogs]);

  const totalXP = React.useMemo(() => {
    return activityLogs.reduce((sum, log) => sum + log.activity_count, 0) * 10;
  }, [activityLogs]);

  const activeWeeks = React.useMemo(() => {
    let weeksActiveCount = 0;
    for (let c = 0; c < cols; c++) {
      let weekHasActivity = false;
      for (let r = 0; r < rows; r++) {
        const dayOffset = (19 - c) * 7 + (6 - r);
        const d = new Date();
        d.setDate(d.getDate() - dayOffset);
        const dateString = d.toISOString().split('T')[0];
        const count = logsMap.get(dateString) || 0;
        if (count > 0) {
          weekHasActivity = true;
          break;
        }
      }
      if (weekHasActivity) {
        weeksActiveCount++;
      }
    }
    return weeksActiveCount;
  }, [logsMap]);

  // Map activity level to tailwind classes
  const getLevelColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-zinc-900 border-zinc-800/40';
      case 1: return 'bg-cyan-950/40 border-cyan-900/30 text-cyan-400/80';
      case 2: return 'bg-cyan-800/30 border-cyan-700/30 text-cyan-400';
      case 3: return 'bg-cyan-500/30 border-cyan-400/40 text-cyan-300';
      case 4: return 'bg-cyan-400/70 border-cyan-300/50 text-cyan-100 shadow-[0_0_8px_rgba(6,182,212,0.3)]';
      default: return 'bg-zinc-900 border-zinc-800/40';
    }
  };

  const dayLabels = ['Mon', 'Wed', 'Fri'];

  return (
    <GlowCard 
      glowColor="rgba(139, 92, 246, 0.12)"
      className="min-h-[340px] p-6 flex flex-col justify-between w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4">
        <div className="flex items-center gap-3 select-none">
          <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-violet-400">
            <Calendar size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-200 tracking-tight">Learning Consistency</h3>
            <p className="text-[10px] text-zinc-500 font-semibold tracking-wide uppercase mt-0.5">Database Activity Chart</p>
          </div>
        </div>

        {/* Total Points Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold">
          <Zap size={10} className="fill-cyan-400" />
          <span>+{totalXP.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Grid container with custom horizontal styling */}
      <div className="my-6 overflow-x-auto scrollbar-none flex flex-col justify-center">
        <div className="flex gap-2 min-w-[340px] items-center justify-center">
          {/* Day Labels */}
          <div className="flex flex-col justify-between text-[9px] text-zinc-600 font-bold h-24 py-1 pr-1.5 select-none">
            <span>M</span>
            <span>W</span>
            <span>F</span>
          </div>

          {/* Contribution Blocks */}
          <div className="grid grid-flow-col grid-rows-7 gap-1.5">
            {Array.from({ length: cols }).map((_, c) => (
              <React.Fragment key={c}>
                {Array.from({ length: rows }).map((_, r) => {
                  const dayOffset = (19 - c) * 7 + (6 - r);
                  const d = new Date();
                  d.setDate(d.getDate() - dayOffset);
                  const dateString = d.toISOString().split('T')[0];
                  const count = logsMap.get(dateString) || 0;
                  const level = Math.min(Math.max(count, 0), 4) as 0 | 1 | 2 | 3 | 4;

                  const formattedDate = d.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                  const tooltipText = `${formattedDate}: ${count} activity point${count === 1 ? '' : 's'}`;

                  return (
                    <motion.div
                      key={`${c}-${r}`}
                      whileHover={{ scale: 1.25, zIndex: 20 }}
                      className={`
                        w-2.5 h-2.5 rounded-sm border transition-all duration-150 cursor-pointer
                        ${getLevelColorClass(level)}
                      `}
                      title={tooltipText}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-zinc-500 font-semibold border-t border-zinc-900/60 pt-4 select-none">
        <div className="flex items-center gap-1.5">
          <Flame size={12} className="text-orange-500" />
          <span>Active Weeks: <strong className="text-zinc-300 font-bold">{activeWeeks} weeks</strong></span>
        </div>
        {/* Heat Map Legend */}
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-zinc-900 border border-zinc-800/40" />
          <div className="w-2.5 h-2.5 rounded-sm bg-cyan-950/40 border border-cyan-900/30" />
          <div className="w-2.5 h-2.5 rounded-sm bg-cyan-800/30 border border-cyan-700/30" />
          <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500/30 border border-cyan-400/40" />
          <div className="w-2.5 h-2.5 rounded-sm bg-cyan-400/70 border border-cyan-300/50" />
          <span>More</span>
        </div>
      </div>
    </GlowCard>
  );
}
