
-- Singleton config table for menu sheet ID
CREATE TABLE public.menu_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true UNIQUE,
  sheet_id text NOT NULL,
  loaded_at timestamptz NOT NULL DEFAULT now(),
  loaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.menu_config ENABLE ROW LEVEL SECURITY;

-- Anyone can read the loaded_at metadata (sheet_id is not sensitive but we limit anyway)
CREATE POLICY "Public can read menu config metadata"
  ON public.menu_config FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only staff can update/insert (writes also go through edge function with service role)
CREATE POLICY "Staff can insert menu config"
  ON public.menu_config FOR INSERT
  TO authenticated
  WITH CHECK (public.is_staff_user(auth.uid()));

CREATE POLICY "Staff can update menu config"
  ON public.menu_config FOR UPDATE
  TO authenticated
  USING (public.is_staff_user(auth.uid()))
  WITH CHECK (public.is_staff_user(auth.uid()));

CREATE TRIGGER menu_config_updated_at
  BEFORE UPDATE ON public.menu_config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
