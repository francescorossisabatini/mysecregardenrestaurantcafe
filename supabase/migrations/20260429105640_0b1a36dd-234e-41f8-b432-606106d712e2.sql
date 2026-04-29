CREATE OR REPLACE FUNCTION public.validate_reservation_request()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
DECLARE
  vienna_now timestamp;
  scheduling_changed boolean;
BEGIN
  vienna_now := now() AT TIME ZONE 'Europe/Vienna';
  scheduling_changed := TG_OP = 'INSERT'
    OR NEW.reservation_date IS DISTINCT FROM OLD.reservation_date
    OR NEW.reservation_time IS DISTINCT FROM OLD.reservation_time
    OR NEW.party_size IS DISTINCT FROM OLD.party_size
    OR NEW.seating_area IS DISTINCT FROM OLD.seating_area;

  IF scheduling_changed THEN
    IF NEW.reservation_date < (vienna_now::date) THEN
      RAISE EXCEPTION 'reservation_date cannot be in the past';
    END IF;

    IF NEW.reservation_date = (vienna_now::date) AND vienna_now::time >= time '09:00' THEN
      RAISE EXCEPTION 'same-day reservations close at 09:00';
    END IF;

    IF NEW.reservation_time < time '11:00' OR NEW.reservation_time > time '19:00' THEN
      RAISE EXCEPTION 'reservation_time must be during opening hours';
    END IF;

    IF EXTRACT(MINUTE FROM NEW.reservation_time)::int NOT IN (0, 30) THEN
      RAISE EXCEPTION 'reservation_time must use 30 minute slots';
    END IF;

    IF NEW.party_size < 1 OR NEW.party_size > 10 THEN
      RAISE EXCEPTION 'party_size must be between 1 and 10';
    END IF;

    IF NEW.seating_area NOT IN ('inside', 'outside') THEN
      RAISE EXCEPTION 'seating_area must be inside or outside';
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;