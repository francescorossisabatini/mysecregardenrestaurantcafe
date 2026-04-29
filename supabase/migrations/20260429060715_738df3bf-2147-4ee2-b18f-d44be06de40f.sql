-- Allow staff users to read A/B analytics events while keeping public visitors unable to read them.
DROP POLICY IF EXISTS "Staff can view ab test events" ON public.ab_test_events;
CREATE POLICY "Staff can view ab test events"
ON public.ab_test_events
FOR SELECT
TO authenticated
USING (public.is_staff_user(auth.uid()));

-- Explicitly document and enforce that normal app users cannot modify role assignments.
DROP POLICY IF EXISTS "App users cannot create roles" ON public.user_roles;
CREATE POLICY "App users cannot create roles"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (false);

DROP POLICY IF EXISTS "App users cannot update roles" ON public.user_roles;
CREATE POLICY "App users cannot update roles"
ON public.user_roles
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "App users cannot delete roles" ON public.user_roles;
CREATE POLICY "App users cannot delete roles"
ON public.user_roles
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (false);

-- Add scoped policies for the private A/B report storage bucket.
DROP POLICY IF EXISTS "Staff can view ab report files" ON storage.objects;
CREATE POLICY "Staff can view ab report files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'ab-reports' AND public.is_staff_user(auth.uid()));

DROP POLICY IF EXISTS "App users cannot upload ab report files" ON storage.objects;
CREATE POLICY "App users cannot upload ab report files"
ON storage.objects
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (bucket_id <> 'ab-reports');

DROP POLICY IF EXISTS "App users cannot update ab report files" ON storage.objects;
CREATE POLICY "App users cannot update ab report files"
ON storage.objects
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (bucket_id <> 'ab-reports')
WITH CHECK (bucket_id <> 'ab-reports');

DROP POLICY IF EXISTS "App users cannot delete ab report files" ON storage.objects;
CREATE POLICY "App users cannot delete ab report files"
ON storage.objects
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (bucket_id <> 'ab-reports');