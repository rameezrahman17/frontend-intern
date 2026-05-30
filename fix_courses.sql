-- Run this in Supabase SQL Editor to fix the courses table

-- Step 1: Wipe all duplicate/old rows
TRUNCATE TABLE public.courses RESTART IDENTITY;

-- Step 2: Insert the 4 correct courses
INSERT INTO public.courses (title, progress, icon_name, created_at) VALUES
    ('Advanced React Patterns',   75, 'Atom',      now() - interval '4 days'),
    ('UI/UX Design Fundamentals', 35, 'Palette',   now() - interval '3 days'),
    ('System Design Masterclass', 90, 'Server',    now() - interval '2 days'),
    ('Python for Data Science',   55, 'ChartLine', now() - interval '1 day');

-- Step 3: Verify — should show exactly 4 rows
SELECT title, progress, icon_name FROM public.courses ORDER BY created_at;
