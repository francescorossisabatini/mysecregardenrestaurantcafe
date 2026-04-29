ALTER TABLE public.reservation_requests
ADD COLUMN IF NOT EXISTS seating_area text NOT NULL DEFAULT 'inside';

CREATE OR REPLACE FUNCTION public.validate_reservation_request()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
DECLARE
  vienna_now timestamp;
BEGIN
  vienna_now := now() AT TIME ZONE 'Europe/Vienna';

  IF NEW.reservation_date < CURRENT_DATE THEN
    RAISE EXCEPTION 'reservation_date cannot be in the past';
  END IF;

  IF NEW.reservation_date = (vienna_now::date) AND vienna_now::time >= time '09:00' THEN
    RAISE EXCEPTION 'same-day reservations close at 09:00';
  END IF;

  IF NEW.party_size < 1 OR NEW.party_size > 10 THEN
    RAISE EXCEPTION 'party_size must be between 1 and 10';
  END IF;

  IF NEW.seating_area NOT IN ('inside', 'outside') THEN
    RAISE EXCEPTION 'seating_area must be inside or outside';
  END IF;

  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS validate_reservation_request_before_write ON public.reservation_requests;
CREATE TRIGGER validate_reservation_request_before_write
BEFORE INSERT OR UPDATE ON public.reservation_requests
FOR EACH ROW
EXECUTE FUNCTION public.validate_reservation_request();

DROP POLICY IF EXISTS "Visitors can create reservation requests" ON public.reservation_requests;
CREATE POLICY "Visitors can create reservation requests"
ON public.reservation_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND length(trim(full_name)) >= 2
  AND length(trim(full_name)) <= 120
  AND length(trim(contact)) >= 3
  AND length(trim(contact)) <= 160
  AND reservation_date >= CURRENT_DATE
  AND reservation_time >= time '11:00'
  AND reservation_time <= time '19:00'
  AND party_size >= 1
  AND party_size <= 10
  AND language = ANY (ARRAY['de'::text, 'en'::text])
  AND seating_area = ANY (ARRAY['inside'::text, 'outside'::text])
);