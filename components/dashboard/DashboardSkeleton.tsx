export default function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-zinc-950/80 border-r border-zinc-900 shrink-0">
        <div className="flex items-center gap-3 h-20 px-4 border-b border-zinc-900/60 animate-pulse">
          <div className="w-9 h-9 rounded-xl bg-zinc-800 shrink-0" />
          <div className="h-5 w-28 bg-zinc-800 rounded-lg" />
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-3.5 rounded-xl">
              <div className="w-5 h-5 rounded-md bg-zinc-800 shrink-0" />
              <div className="h-4 bg-zinc-800 rounded-md" style={{ width: `${55 + i * 7}%` }} />
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-zinc-900/60 animate-pulse">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/40">
            <div className="w-9 h-9 rounded-full bg-zinc-800 shrink-0" />
            <div className="h-3 w-24 bg-zinc-800 rounded-md" />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-zinc-900/60 px-4 md:px-8 flex items-center justify-between sticky top-0 bg-zinc-950/85 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 md:hidden" />
            <div className="space-y-2">
              <div className="h-5 w-44 bg-zinc-800 rounded-lg" />
              <div className="h-3 w-32 bg-zinc-800/60 rounded-md hidden sm:block" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block h-9 w-48 bg-zinc-800/60 rounded-xl" />
            <div className="w-9 h-9 rounded-xl bg-zinc-800" />
          </div>
        </header>

        <div className="flex-1 px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full pb-20 md:pb-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[340px] rounded-2xl bg-zinc-900/40 border border-zinc-900/60 p-8 flex flex-col justify-between animate-pulse">
              <div className="flex gap-2.5">
                <div className="h-7 w-36 bg-zinc-800 rounded-full" />
                <div className="h-7 w-28 bg-zinc-800 rounded-full" />
              </div>
              <div className="space-y-3 mt-10">
                <div className="h-4 w-32 bg-zinc-800/60 rounded-md" />
                <div className="h-9 w-56 bg-zinc-800 rounded-lg" />
                <div className="h-4 w-64 bg-zinc-800/50 rounded-md" />
              </div>
              <div className="flex gap-6">
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-zinc-800/60 rounded-md" />
                  <div className="h-6 w-36 bg-zinc-800 rounded-md" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-zinc-800/60 rounded-md" />
                  <div className="h-5 w-28 bg-zinc-800 rounded-md" />
                </div>
              </div>
            </div>

            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col justify-between p-6 min-h-[200px] rounded-2xl bg-zinc-900/40 border border-zinc-900/60 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="w-11 h-11 rounded-2xl bg-zinc-800" />
                  <div className="h-5 w-10 bg-zinc-800 rounded-md" />
                </div>
                <div className="mt-5 flex-1 flex flex-col justify-end">
                  <div className="h-5 w-4/5 bg-zinc-800 rounded-md" />
                </div>
                <div className="mt-5 space-y-3">
                  <div className="h-2 w-full bg-zinc-800 rounded-full" />
                  <div className="flex justify-between">
                    <div className="h-3 w-24 bg-zinc-800/60 rounded-md" />
                    <div className="h-3 w-3 bg-zinc-800/60 rounded-sm" />
                  </div>
                </div>
              </div>
            ))}

            <div className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[220px] rounded-2xl bg-zinc-900/40 border border-zinc-900/60 p-6 flex flex-col justify-between animate-pulse">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-900/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-36 bg-zinc-800 rounded-md" />
                    <div className="h-3 w-24 bg-zinc-800/60 rounded-md" />
                  </div>
                </div>
                <div className="h-6 w-20 bg-zinc-800 rounded-full" />
              </div>
              <div className="my-6 flex items-center justify-center">
                <div className="h-24 w-full max-w-lg bg-zinc-800/40 rounded-xl" />
              </div>
              <div className="flex justify-between pt-4 border-t border-zinc-900/60">
                <div className="h-3 w-28 bg-zinc-800/60 rounded-md" />
                <div className="h-3 w-24 bg-zinc-800/60 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
