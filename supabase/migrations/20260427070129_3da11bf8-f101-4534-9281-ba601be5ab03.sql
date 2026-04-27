CREATE OR REPLACE FUNCTION public.is_staff_user(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() = _user_id
    AND (
      public.has_role(_user_id, 'admin')
      OR public.has_role(_user_id, 'staff')
    )
$$;

REVOKE ALL ON FUNCTION public.is_staff_user(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_staff_user(uuid) TO authenticated;