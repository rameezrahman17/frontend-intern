-- ============================================================
-- NexLearn Migration Script
-- Run this in your Supabase SQL Editor to update the existing
-- database to the new schema with all students and XP data.
-- ============================================================


-- ==========================================
-- STEP 1: Add new columns to profiles table
-- (safe — uses IF NOT EXISTS equivalent via DO block)
-- ==========================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'profiles'
      AND column_name  = 'email'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN email TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'profiles'
      AND column_name  = 'total_xp'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN total_xp INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;


-- ==========================================
-- STEP 2: Remove old student row(s) and
-- insert the correct set of 10 students
-- ==========================================

-- Wipe existing profile rows so we start clean
TRUNCATE TABLE public.profiles RESTART IDENTITY;

-- Insert all 10 students
INSERT INTO public.profiles (student_name, email, streak_days, scholar_level, daily_goal_progress, next_milestone_xp, total_xp)
VALUES
    ('John Doe',       'john.doe@learning.io',       15, 5, 80,  1200, 4850),
    ('Aisha Patel',    'aisha.patel@learning.io',     22, 7, 95,  800,  7320),
    ('Marcus Chen',    'marcus.chen@learning.io',     10, 4, 60,  1500, 3210),
    ('Sofia Reyes',    'sofia.reyes@learning.io',     30, 8, 100, 500,  9100),
    ('Liam O''Brien',  'liam.obrien@learning.io',     5,  3, 45,  2000, 1980),
    ('Priya Sharma',   'priya.sharma@learning.io',    18, 6, 70,  1000, 5640),
    ('Noah Williams',  'noah.williams@learning.io',   12, 5, 55,  1300, 4200),
    ('Zara Ahmed',     'zara.ahmed@learning.io',      25, 7, 88,  700,  6750),
    ('Ethan Brooks',   'ethan.brooks@learning.io',    8,  3, 35,  1800, 2450),
    ('Mei Lin',        'mei.lin@learning.io',         35, 9, 98,  300,  11200);


-- ==========================================
-- STEP 3: Ensure courses table has data
-- ==========================================
INSERT INTO public.courses (title, progress, icon_name, created_at)
VALUES
    ('Advanced React Patterns',       75, 'Atom',   now() - interval '4 days'),
    ('Machine Learning Fundamentals', 42, 'Brain',  now() - interval '3 days'),
    ('System Design Masterclass',     90, 'Server', now() - interval '2 days'),
    ('TypeScript Deep Dive',          60, 'Code',   now() - interval '1 day')
ON CONFLICT DO NOTHING;


-- ==========================================
-- STEP 4: Ensure activity_logs has data
-- ==========================================
INSERT INTO public.activity_logs (activity_date, activity_count)
SELECT
    (current_date - (val || ' days')::interval)::date,
    (floor(random() * 6.5))::integer
FROM generate_series(0, 140) AS val
ON CONFLICT (activity_date) DO NOTHING;


-- ==========================================
-- STEP 5: Verify — should show 10 students
-- ==========================================
SELECT id, student_name, total_xp, streak_days, scholar_level
FROM public.profiles
ORDER BY total_xp DESC;
