REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;

REVOKE EXECUTE ON FUNCTION public.is_staff_user(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_staff_user(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_staff_user(uuid) FROM authenticated;