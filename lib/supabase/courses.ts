import { createClient } from './server';
import { Course, Profile, ActivityLog, LeaderboardEntry } from '../types';

const fallbackCourses: Course[] = [
  { id: '1', title: 'Advanced React Patterns',       progress: 75, icon_name: 'Atom'   },
  { id: '2', title: 'Machine Learning Fundamentals', progress: 42, icon_name: 'Brain'  },
  { id: '3', title: 'System Design Masterclass',     progress: 90, icon_name: 'Server' },
  { id: '4', title: 'TypeScript Deep Dive',          progress: 60, icon_name: 'Code'   },
];

const fallbackProfile: Profile = {
  id: 'p1',
  student_name: 'John Doe',
  email: 'john.doe@learning.io',
  streak_days: 15,
  scholar_level: 5,
  daily_goal_progress: 80,
  next_milestone_xp: 1200,
  total_xp: 4850,
};

const fallbackLeaderboard: LeaderboardEntry[] = [
  { id: 'l10', student_name: 'Mei Lin',       total_xp: 11200, streak_days: 35, scholar_level: 9 },
  { id: 'l4',  student_name: 'Sofia Reyes',   total_xp: 9100,  streak_days: 30, scholar_level: 8 },
  { id: 'l2',  student_name: 'Aisha Patel',   total_xp: 7320,  streak_days: 22, scholar_level: 7 },
  { id: 'l8',  student_name: 'Zara Ahmed',    total_xp: 6750,  streak_days: 25, scholar_level: 7 },
  { id: 'l6',  student_name: 'Priya Sharma',  total_xp: 5640,  streak_days: 18, scholar_level: 6 },
  { id: 'l1',  student_name: 'John Doe',      total_xp: 4850,  streak_days: 15, scholar_level: 5 },
  { id: 'l7',  student_name: 'Noah Williams', total_xp: 4200,  streak_days: 12, scholar_level: 5 },
  { id: 'l3',  student_name: 'Marcus Chen',   total_xp: 3210,  streak_days: 10, scholar_level: 4 },
  { id: 'l9',  student_name: 'Ethan Brooks',  total_xp: 2450,  streak_days: 8,  scholar_level: 3 },
  { id: 'l5',  student_name: "Liam O'Brien",  total_xp: 1980,  streak_days: 5,  scholar_level: 3 },
];

function buildFallbackLogs(): ActivityLog[] {
  const today = new Date();
  return Array.from({ length: 141 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const date = d.toISOString().split('T')[0];
    const row = i % 7;
    const col = Math.floor(i / 7);
    const weight = (1 - i / 140) * 5;
    const raw = (Math.sin(row * 2 + col * 3) + 1.2) * weight;
    const count = raw < 1.5 ? 0 : raw < 3 ? 1 : raw < 5 ? 2 : raw < 7.5 ? 3 : 4;
    return { id: `log-${i}`, activity_date: date, activity_count: count };
  });
}

export async function getCourses(): Promise<Course[]> {
  const db = await createClient();
  if (!db) return fallbackCourses;

  const { data, error } = await db
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(4);

  if (error) {
    console.error('courses fetch failed:', error.message);
    return fallbackCourses;
  }

  return data?.length ? (data as Course[]) : fallbackCourses;
}

export async function getProfile(): Promise<Profile> {
  const db = await createClient();
  if (!db) return fallbackProfile;

  const { data, error } = await db
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('profile fetch failed:', error.message);
    return fallbackProfile;
  }

  return data ? (data as Profile) : fallbackProfile;
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const db = await createClient();
  if (!db) return buildFallbackLogs();

  const { data, error } = await db
    .from('activity_logs')
    .select('*')
    .order('activity_date', { ascending: true });

  if (error) {
    console.error('activity_logs fetch failed:', error.message);
    return buildFallbackLogs();
  }

  return data?.length ? (data as ActivityLog[]) : buildFallbackLogs();
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const db = await createClient();
  if (!db) return fallbackLeaderboard;

  const { data, error } = await db
    .from('profiles')
    .select('id, student_name, total_xp, streak_days, scholar_level')
    .order('total_xp', { ascending: false });

  if (error) {
    console.error('leaderboard fetch failed:', error.message);
    return fallbackLeaderboard;
  }

  return data?.length ? (data as LeaderboardEntry[]) : fallbackLeaderboard;
}
