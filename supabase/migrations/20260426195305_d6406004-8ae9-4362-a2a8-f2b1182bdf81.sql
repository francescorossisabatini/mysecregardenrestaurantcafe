DROP POLICY IF EXISTS "Visitors can record hero ab events" ON public.ab_test_events;

CREATE POLICY "Visitors can record hero ab events"
ON public.ab_test_events
FOR INSERT
TO anon, authenticated
WITH CHECK (
  test_id = 'mobile_hero_context_v1'
  AND variant IN ('food', 'dining', 'garden')
  AND event_name IN ('hero_variant_impression', 'click_menu_today', 'click_weekly_specials', 'hero_cta_click', 'hero_menu_click', 'hero_reservation_click', 'scroll_depth')
);

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;