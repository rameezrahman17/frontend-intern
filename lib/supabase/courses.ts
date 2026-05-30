import { createClient } from './server';
import { Course, Profile, ActivityLog, LeaderboardEntry } from '../types';

// ==========================================
// SEED FALLBACK DATA
// ==========================================
export const SEED_COURSES: Course[] = [
  { id: '1', title: 'Advanced React Patterns',       progress: 75, icon_name: 'Atom'   },
  { id: '2', title: 'Machine Learning Fundamentals', progress: 42, icon_name: 'Brain'  },
  { id: '3', title: 'System Design Masterclass',     progress: 90, icon_name: 'Server' },
  { id: '4', title: 'TypeScript Deep Dive',          progress: 60, icon_name: 'Code'   },
];

export const DEFAULT_PROFILE: Profile = {
  id: 'p1',
  student_name: 'John Doe',
  email: 'john.doe@learning.io',
  streak_days: 15,
  scholar_level: 5,
  daily_goal_progress: 80,
  next_milestone_xp: 1200,
  total_xp: 4850,
};

export const SEED_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'l10', student_name: 'Mei Lin',       total_xp: 11200, streak_days: 35, scholar_level: 9 },
  { id: 'l4',  student_name: 'Sofia Reyes',   total_xp: 9100,  streak_days: 30, scholar_level: 8 },
  { id: 'l2',  student_name: 'Aisha Patel',   total_xp: 7320,  streak_days: 22, scholar_level: 7 },
  { id: 'l8',  student_name: 'Zara Ahmed',    total_xp: 6750,  streak_days: 25, scholar_level: 7 },
  { id: 'l6',  student_name: 'Priya Sharma',  total_xp: 5640,  streak_days: 18, scholar_level: 6 },
  { id: 'l1',  student_name: 'John Doe',      total_xp: 4850,  streak_days: 15, scholar_level: 5 },
  { id: 'l7',  student_name: 'Noah Williams', total_xp: 4200,  streak_days: 12, scholar_level: 5 },
  { id: 'l3',  student_name: 'Marcus Chen',   total_xp: 3210,  streak_days: 10, scholar_level: 4 },
  { id: 'l9',  student_name: 'Ethan Brooks',  total_xp: 2450,  streak_days: 8,  scholar_level: 3 },
  { id: 'l5',  student_name: 'Liam O\'Brien', total_xp: 1980,  streak_days: 5,  scholar_level: 3 },
];

export function generateMockActivityLogs(): ActivityLog[] {
  const logs: ActivityLog[] = [];
  const today = new Date();
  for (let i = 0; i <= 140; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    const r = i % 7;
    const c = Math.floor(i / 7);
    const factor = (1 - (i / 140)) * 5;
    const val = (Math.sin(r * 2 + c * 3) + 1.2) * factor;
    const count = val < 1.5 ? 0 : val < 3 ? 1 : val < 5 ? 2 : val < 7.5 ? 3 : 4;
    logs.push({ id: `log-${i}`, activity_date: dateString, activity_count: count });
  }
  return logs;
}

// ==========================================
// DATA RESOLVERS
// ==========================================

export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();
  if (!supabase) {
    console.warn('⚠️ Supabase credentials missing. Returning courses seed data.');
    await new Promise((resolve) => setTimeout(resolve, 800));
    return SEED_COURSES;
  }
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) {
      console.error('❌ Supabase courses query error:', error.message, error.details);
      return SEED_COURSES;
    }
    console.log(`✅ Fetched ${data?.length ?? 0} courses from Supabase`);
    return (!data || data.length === 0) ? SEED_COURSES : (data as Course[]);
  } catch (err) {
    console.error('❌ Failed to query courses:', err);
    return SEED_COURSES;
  }
}

export async function getProfile(): Promise<Profile> {
  const supabase = await createClient();
  if (!supabase) {
    console.warn('⚠️ Supabase credentials missing. Returning profile seed data.');
    return DEFAULT_PROFILE;
  }
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) {
      console.error('❌ Supabase profile query error:', error.message, error.details);
      return DEFAULT_PROFILE;
    }
    console.log(`✅ Fetched profile from Supabase: ${data?.student_name}`);
    return !data ? DEFAULT_PROFILE : (data as Profile);
  } catch (err) {
    console.error('❌ Failed to query profile:', err);
    return DEFAULT_PROFILE;
  }
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const supabase = await createClient();
  if (!supabase) {
    console.warn('⚠️ Supabase credentials missing. Returning activity log seed data.');
    return generateMockActivityLogs();
  }
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('activity_date', { ascending: true });
    if (error) {
      console.error('❌ Supabase activity_logs query error:', error.message, error.details);
      return generateMockActivityLogs();
    }
    console.log(`✅ Fetched ${data?.length ?? 0} activity logs from Supabase`);
    return (!data || data.length === 0) ? generateMockActivityLogs() : (data as ActivityLog[]);
  } catch (err) {
    console.error('❌ Failed to query activity logs:', err);
    return generateMockActivityLogs();
  }
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const supabase = await createClient();
  if (!supabase) {
    console.warn('⚠️ Supabase credentials missing. Returning leaderboard seed data.');
    return SEED_LEADERBOARD;
  }
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, student_name, total_xp, streak_days, scholar_level')
      .order('total_xp', { ascending: false });
    if (error) {
      console.error('❌ Supabase leaderboard query error:', error.message, error.details);
      return SEED_LEADERBOARD;
    }
    console.log(`✅ Fetched ${data?.length ?? 0} leaderboard entries from Supabase`);
    return (!data || data.length === 0) ? SEED_LEADERBOARD : (data as LeaderboardEntry[]);
  } catch (err) {
    console.error('❌ Failed to query leaderboard:', err);
    return SEED_LEADERBOARD;
  }
}
