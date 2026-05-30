import React from 'react';

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-6 md:px-8 py-8 bg-zinc-950">
      
      {/* Top Header Loading Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900/60 pb-6 mb-8 animate-pulse">
        <div className="space-y-2.5">
          <div className="h-7 w-48 bg-zinc-900 rounded-lg" />
          <div className="h-4 w-64 bg-zinc-900/60 rounded-md" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-24 bg-zinc-900 rounded-xl" />
          <div className="h-10 w-10 bg-zinc-900 rounded-xl" />
        </div>
      </div>

      {/* Bento Grid Skeleton Replica */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr max-w-7xl mx-auto w-full pb-20 md:pb-8">
        
        {/* Hero Tile Skeleton (Spans 2 cols, 2 rows) */}
        <div className="col-span-1 md:col-span-2 row-span-2 min-h-[340px] rounded-2xl bg-zinc-900/40 border border-zinc-900/60 p-8 flex flex-col justify-between animate-pulse">
          <div className="flex gap-2.5">
            <div className="h-7 w-32 bg-zinc-900 rounded-full" />
            <div className="h-7 w-24 bg-zinc-900 rounded-full" />
          </div>
          <div className="space-y-3.5 mt-8 md:mt-12">
            <div className="h-9 w-60 bg-zinc-900 rounded-lg" />
            <div className="h-4 w-40 bg-zinc-900/60 rounded-md" />
          </div>
          <div className="flex gap-6 mt-8 md:mt-0">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-zinc-900/60 rounded-md" />
              <div className="h-6 w-32 bg-zinc-900 rounded-md" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 bg-zinc-900/60 rounded-md" />
              <div className="h-5 w-24 bg-zinc-900 rounded-md" />
            </div>
          </div>
        </div>

        {/* 4 Course Card Skeletons (1 col, 1 row each) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div 
            key={i} 
            className="flex flex-col justify-between p-6 min-h-[200px] rounded-2xl bg-zinc-900/40 border border-zinc-900/60 animate-pulse"
          >
            <div className="flex justify-between items-center">
              <div className="w-11 h-11 rounded-2xl bg-zinc-900" />
              <div className="h-5 w-10 bg-zinc-900 rounded-md" />
            </div>
            <div className="mt-5 flex-1 flex flex-col justify-end">
              <div className="h-5 w-full bg-zinc-900 rounded-md" />
            </div>
            <div className="mt-5 space-y-3">
              <div className="h-2 w-full bg-zinc-900 rounded-full" />
              <div className="flex justify-between items-center">
                <div className="h-3.5 w-24 bg-zinc-900/60 rounded-md" />
                <div className="h-3.5 w-3.5 bg-zinc-900/60 rounded-md" />
              </div>
            </div>
          </div>
        ))}

        {/* Activity Tile Skeleton (1 col, 1 row) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900/60 flex flex-col justify-between animate-pulse">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-900/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900" />
              <div className="space-y-1.5">
                <div className="h-4.5 w-32 bg-zinc-900 rounded-md" />
                <div className="h-3 w-20 bg-zinc-900/60 rounded-md" />
              </div>
            </div>
            <div className="h-6 w-20 bg-zinc-900 rounded-full" />
          </div>
          
          <div className="my-6 flex flex-col items-center justify-center">
            <div className="h-24 w-full bg-zinc-900/40 rounded-xl border border-zinc-900/50 flex items-center justify-center">
              <div className="h-4 w-40 bg-zinc-900/60 rounded-md animate-pulse" />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-zinc-900/60">
            <div className="h-4 w-28 bg-zinc-900/60 rounded-md" />
            <div className="h-4 w-24 bg-zinc-900/60 rounded-md" />
          </div>
        </div>

      </div>
    </div>
  );
}
