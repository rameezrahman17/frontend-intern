# NexLearn — Next-Gen Student Dashboard

A high-fidelity, animated education dashboard built as a frontend engineering challenge. Live data from Supabase, hardware-accelerated animations via Framer Motion, and a streaming RSC architecture that eliminates layout shifts.

**Stack:** Next.js 16 (App Router) · Supabase · Tailwind CSS v4 · Framer Motion · Three.js / React Three Fiber · Lucide React · TypeScript

---

## Getting Started

```bash
npm install

cp .env.example .env.local

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Paste `schema.sql` into your Supabase SQL Editor to seed the database. For an existing project, use `migration.sql` instead.

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

Copy `.env.example` to `.env.local` and fill in the values. Never commit `.env.local` — it is gitignored.

---

## Architectural Decisions

### Server / Client Component Split

The data layer is entirely server-side. `app/page.tsx` is a React Server Component (RSC) that owns no client state. It renders a `<Suspense>` boundary with `<DashboardSkeleton>` as the fallback, then streams in `<DashboardData>` — an inner async RSC that fires all four Supabase queries in parallel via `Promise.all`.

```
page.tsx (RSC)
└── <Suspense fallback={<DashboardSkeleton />}>        ← streams skeleton immediately
    └── <DashboardData /> (async RSC)                  ← awaits Supabase, then streams real UI
        └── <DashboardShell /> ('use client')          ← owns tab state, animations
            ├── <Sidebar />
            ├── <BentoGrid />
            │   ├── <HeroTile />
            │   ├── <CourseCard /> × N
            │   └── <ActivityTile />
            └── <MobileNav />
```

This means:
- The skeleton renders on the **first byte** — zero blank-screen time
- Supabase credentials never touch the browser — they live in `lib/supabase/server.ts` which uses `@supabase/ssr`'s `createServerClient`
- `DashboardShell` is the only `'use client'` boundary that needs to be, because it manages the active tab state

### Why `@supabase/ssr` over `@supabase/supabase-js` directly

`@supabase/ssr` provides `createServerClient` which correctly handles cookie-based auth in Next.js App Router Server Components. The cookie store is passed in via `next/headers`, making it compatible with streaming and edge runtimes.

### Framer Motion — Zero Layout Shift Strategy

All entrance animations use **`opacity` and `transform: translateY` exclusively**. No `width`, `height`, `top`, `left`, or `margin` changes — these trigger browser layout recalculations. The `GlowCard` hover uses `scale` and `boxShadow` (compositor-only properties) with spring physics (`stiffness: 300, damping: 20`).

The stagger is implemented via Framer Motion's `variants` propagation pattern:

```tsx
// Parent declares stagger timing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

// Children just declare their own hidden/show states
const tileVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};
```

When the parent animates to `"show"`, Framer Motion automatically staggers each child that also has `variants` — no manual `delay` calculations needed.

### Sidebar `layoutId` Navigation

The active nav highlight uses `layoutId="sidebar-active"` on a `motion.div` inside each nav button. When the active tab changes, Framer Motion smoothly interpolates the highlight's position between items using a shared layout animation — this is the "snap into place" micro-interaction required by the rubric.

### DynamicIcon

Course icons are stored as strings in Supabase (e.g. `"Atom"`, `"Brain"`). `DynamicIcon` resolves these at runtime by indexing into the full `lucide-react` export map with a safe fallback to `BookOpen` if the name doesn't match.

### Leaderboard

The leaderboard queries `profiles` ordered by `total_xp DESC`, so it always reflects live Supabase data. The sort can be toggled client-side between XP and streak without a re-fetch.

---

## Database Schema

Three tables: `courses`, `profiles`, `activity_logs`. See `schema.sql` for the full setup script (fresh install) or `migration.sql` to safely upgrade an existing database.

Key additions beyond the base spec:
- `profiles.total_xp` — enables the leaderboard
- `profiles.email` — shown only in the Settings/Profile tab, hidden in the sidebar
- 10 seeded students for a realistic leaderboard

---

## Challenges

**Streaming with Suspense in App Router**
The challenge was that `loading.tsx` only fires on full-page navigations, not on streaming. To get the skeleton to show during the actual Supabase fetch, the page needed to be split into an outer RSC (renders `<Suspense>`) and an inner async RSC (does the fetching). The skeleton also needed to mirror the full page chrome (sidebar + header) to avoid a layout shift when the real content swaps in.

**Framer Motion `type: 'spring'` TypeScript error**
Framer Motion v12's `Variants` type requires `type` to be `AnimationGeneratorType`, not `string`. The fix is `type: 'spring' as const` or importing and using the `Variants` type from framer-motion so TypeScript narrows the literal correctly.

**Supabase `.single()` vs `.maybeSingle()`**
`.single()` throws a PostgREST error if zero rows are returned, which would cause the entire page to fall back to seed data. Switching to `.maybeSingle()` returns `null` gracefully when the table is empty, letting the fallback logic handle it cleanly.

**Three.js in SSR**
React Three Fiber requires a browser DOM. The `<ThreeScene>` component is loaded inside a `'use client'` component and the canvas is rendered only client-side, avoiding SSR hydration mismatches.
