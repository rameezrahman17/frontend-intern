import { Suspense } from 'react';
import { getCourses, getProfile, getActivityLogs, getLeaderboard } from '../lib/supabase/courses';
import DashboardShell from '../components/dashboard/DashboardShell';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';

export const dynamic = 'force-dynamic';

async function DashboardData() {
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
