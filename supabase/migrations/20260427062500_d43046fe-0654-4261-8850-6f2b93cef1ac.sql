ALTER TABLE public.reservation_requests
DROP CONSTRAINT IF EXISTS reservation_requests_date_check;

CREATE OR REPLACE FUNCTION public.validate_reservation_request()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reservation_date < CURRENT_DATE THEN
    RAISE EXCEPTION 'reservation_date cannot be in the past';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_reservation_request_before_write
BEFORE INSERT OR UPDATE ON public.reservation_requests
FOR EACH ROW
EXECUTE FUNCTION public.validate_reservation_request();