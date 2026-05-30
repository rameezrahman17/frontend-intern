-- ============================================================
-- NexLearn Full Schema — run this in Supabase SQL Editor
-- Safe to run on a completely fresh project (no existing tables)
-- ============================================================


-- ==========================================
-- 1. COURSES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.courses (
    id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    title       TEXT        NOT NULL UNIQUE,
    progress    INTEGER     NOT NULL CHECK (progress >= 0 AND progress <= 100),
    icon_name   TEXT        NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.courses;
CREATE POLICY "Allow public read access"
ON public.courses FOR SELECT USING (true);

-- Wipe and re-insert so duplicates from previous runs are removed
TRUNCATE TABLE public.courses RESTART IDENTITY;

INSERT INTO public.courses (title, progress, icon_name, created_at) VALUES
    ('Advanced React Patterns',       75, 'Atom',   now() - interval '4 days'),
    ('Machine Learning Fundamentals', 42, 'Brain',  now() - interval '3 days'),
    ('System Design Masterclass',     90, 'Server', now() - interval '2 days'),
    ('TypeScript Deep Dive',          60, 'Code',   now() - interval '1 day');

-- ==========================================
-- 2. PROFILES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id                  UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
    student_name        TEXT    NOT NULL,
    email               TEXT,
    streak_days         INTEGER NOT NULL DEFAULT 0,
    scholar_level       INTEGER NOT NULL DEFAULT 1,
    daily_goal_progress INTEGER NOT NULL DEFAULT 0 CHECK (daily_goal_progress >= 0 AND daily_goal_progress <= 100),
    next_milestone_xp   INTEGER NOT NULL DEFAULT 1000,
    total_xp            INTEGER NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to profiles" ON public.profiles;
CREATE POLICY "Allow public read access to profiles"
ON public.profiles FOR SELECT USING (true);

-- Wipe any old rows and insert the full 10-student set
TRUNCATE TABLE public.profiles RESTART IDENTITY;

INSERT INTO public.profiles (student_name, email, streak_days, scholar_level, daily_goal_progress, next_milestone_xp, total_xp) VALUES
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
-- 3. ACTIVITY LOGS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id             UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
    activity_date  DATE  NOT NULL UNIQUE,
    activity_count INTEGER NOT NULL DEFAULT 0,
    created_at     TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to activity logs" ON public.activity_logs;
CREATE POLICY "Allow public read access to activity logs"
ON public.activity_logs FOR SELECT USING (true);

INSERT INTO public.activity_logs (activity_date, activity_count)
SELECT
    (current_date - (val || ' days')::interval)::date,
    (floor(random() * 6.5))::integer
FROM generate_series(0, 140) AS val
ON CONFLICT (activity_date) DO NOTHING;


-- ==========================================
-- VERIFY — should show 10 students by XP
-- ==========================================
SELECT student_name, total_xp, streak_days, scholar_level
FROM public.profiles
ORDER BY total_xp DESC;
