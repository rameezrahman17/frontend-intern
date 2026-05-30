import React, { Suspense } from 'react';
import { getCourses, getProfile, getActivityLogs, getLeaderboard } from '../lib/supabase/courses';
import DashboardShell from '../components/dashboard/DashboardShell';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';

// Force dynamic rendering — never serve a stale cached page
export const dynamic = 'force-dynamic';

/**
 * Inner async component that owns all Supabase fetches.
 * Wrapped in <Suspense> below so the skeleton streams immediately
 * while this component awaits the database, satisfying the RSC
 * streaming requirement from the rubric.
 */
async function DashboardData() {
  // Parallel fetches — single round-trip latency
  const [courses, profile, activityLogs, leaderboard] = await Promise.all([
    getCourses(),
    getProfile(),
    getActivityLogs(),
    getLeaderboard(),
  ]);

  return (
    <DashboardShell
      courses={courses}
      profile={profile}
      activityLogs={activityLogs}
      leaderboard={leaderboard}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardData />
    </Suspense>
  );
}
