export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at?: string;
}

export interface Profile {
  id: string;
  student_name: string;
  email?: string;
  streak_days: number;
  scholar_level: number;
  daily_goal_progress: number;
  next_milestone_xp: number;
  total_xp: number;
  created_at?: string;
}

export interface ActivityLog {
  id: string;
  activity_date: string; // YYYY-MM-DD
  activity_count: number;
  created_at?: string;
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface LeaderboardEntry {
  id: string;
  student_name: string;
  total_xp: number;
  streak_days: number;
  scholar_level: number;
}
