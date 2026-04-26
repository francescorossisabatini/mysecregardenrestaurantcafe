DROP POLICY IF EXISTS "Anyone can view published ab reports" ON public.ab_test_reports;
DROP POLICY IF EXISTS "Anyone can view ab report files" ON storage.objects;

UPDATE storage.buckets
SET public = false
WHERE id = 'ab-reports';