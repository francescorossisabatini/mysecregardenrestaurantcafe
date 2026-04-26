CREATE TABLE IF NOT EXISTS public.ab_test_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id text NOT NULL,
  variant text NOT NULL,
  event_name text NOT NULL,
  page_path text,
  user_agent text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ab_test_events ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_ab_test_events_test_created_at
  ON public.ab_test_events (test_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_ab_test_events_variant_event
  ON public.ab_test_events (variant, event_name);

CREATE POLICY "Visitors can record hero ab events"
ON public.ab_test_events
FOR INSERT
TO anon, authenticated
WITH CHECK (
  test_id = 'mobile_hero_context_v1'
  AND variant IN ('food', 'dining', 'garden')
  AND event_name IN ('hero_variant_impression', 'hero_cta_click', 'hero_menu_click', 'hero_reservation_click', 'scroll_depth')
);

CREATE TABLE IF NOT EXISTS public.ab_test_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_name text NOT NULL DEFAULT 'report A/B',
  test_id text NOT NULL,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  file_path text,
  public_url text,
  status text NOT NULL DEFAULT 'pending',
  generated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ab_test_reports ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_ab_test_reports_test_created_at
  ON public.ab_test_reports (test_id, created_at DESC);

CREATE POLICY "Anyone can view published ab reports"
ON public.ab_test_reports
FOR SELECT
TO anon, authenticated
USING (status = 'published');

INSERT INTO storage.buckets (id, name, public)
VALUES ('ab-reports', 'ab-reports', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view ab report files"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'ab-reports');