-- ============================================================
-- Birthday Wish Microsite — Submissions Table
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.submissions (
  submission_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_name  TEXT,
  sender_message  TEXT,
  wants_gift      BOOLEAN NOT NULL DEFAULT true,
  gift_choice     TEXT CHECK (gift_choice IN
                    ('flower_bouquet','drive','movie','chocolate_hamper','snacks_hamper')),
  treat_date      DATE NOT NULL,
  treat_time      TIME NOT NULL,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent      TEXT
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (recipient submitting their choices)
DROP POLICY IF EXISTS "Allow public insert" ON public.submissions;
CREATE POLICY "Allow public insert" ON public.submissions
  FOR INSERT WITH CHECK (true);

-- Allow reads (admin will authenticate via API, RLS just allows the query through)
DROP POLICY IF EXISTS "Allow public read" ON public.submissions;
CREATE POLICY "Allow public read" ON public.submissions
  FOR SELECT USING (true);
