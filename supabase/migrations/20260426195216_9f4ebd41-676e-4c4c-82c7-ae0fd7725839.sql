REVOKE SELECT ON public.ab_test_events FROM anon, authenticated;
REVOKE ALL ON public.ab_test_reports FROM anon, authenticated;
GRANT INSERT ON public.ab_test_events TO anon, authenticated;

CREATE POLICY "Reports are backend managed only"
ON public.ab_test_reports
FOR SELECT
TO authenticated
USING (false);