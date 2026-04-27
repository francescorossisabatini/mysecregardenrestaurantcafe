CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_staff_user(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin') OR public.has_role(_user_id, 'staff')
$$;

CREATE POLICY "Staff can view roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_staff_user(auth.uid()));

CREATE TABLE public.reservation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME WITHOUT TIME ZONE NOT NULL,
  party_size INTEGER NOT NULL,
  notes TEXT,
  language TEXT NOT NULL DEFAULT 'de',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT reservation_requests_status_check CHECK (status IN ('new', 'confirmed', 'declined', 'archived')),
  CONSTRAINT reservation_requests_party_size_check CHECK (party_size BETWEEN 1 AND 20),
  CONSTRAINT reservation_requests_language_check CHECK (language IN ('de', 'en')),
  CONSTRAINT reservation_requests_date_check CHECK (reservation_date >= CURRENT_DATE),
  CONSTRAINT reservation_requests_time_check CHECK (reservation_time >= TIME '11:00' AND reservation_time <= TIME '19:00')
);

ALTER TABLE public.reservation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can create reservation requests"
ON public.reservation_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND length(trim(full_name)) BETWEEN 2 AND 120
  AND length(trim(contact)) BETWEEN 3 AND 160
  AND reservation_date >= CURRENT_DATE
  AND reservation_time >= TIME '11:00'
  AND reservation_time <= TIME '19:00'
  AND party_size BETWEEN 1 AND 20
  AND language IN ('de', 'en')
);

CREATE POLICY "Staff can view reservation requests"
ON public.reservation_requests
FOR SELECT
TO authenticated
USING (public.is_staff_user(auth.uid()));

CREATE POLICY "Staff can update reservation requests"
ON public.reservation_requests
FOR UPDATE
TO authenticated
USING (public.is_staff_user(auth.uid()))
WITH CHECK (public.is_staff_user(auth.uid()));

CREATE INDEX idx_reservation_requests_created_at ON public.reservation_requests(created_at DESC);
CREATE INDEX idx_reservation_requests_status_date ON public.reservation_requests(status, reservation_date, reservation_time);
CREATE INDEX idx_user_roles_user_id_role ON public.user_roles(user_id, role);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_reservation_requests_updated_at
BEFORE UPDATE ON public.reservation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();