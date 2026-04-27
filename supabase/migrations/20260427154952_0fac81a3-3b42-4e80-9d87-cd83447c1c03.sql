ALTER TABLE public.reservation_requests
ADD COLUMN IF NOT EXISTS staff_notes text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'reservation_requests_status_allowed'
      AND conrelid = 'public.reservation_requests'::regclass
  ) THEN
    ALTER TABLE public.reservation_requests
    ADD CONSTRAINT reservation_requests_status_allowed
    CHECK (status IN ('new', 'confirmed', 'cancelled', 'arrived', 'no_show'));
  END IF;
END $$;

DROP TRIGGER IF EXISTS update_reservation_requests_updated_at ON public.reservation_requests;
CREATE TRIGGER update_reservation_requests_updated_at
BEFORE UPDATE ON public.reservation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_reservation_requests_date_time
ON public.reservation_requests (reservation_date, reservation_time);

CREATE POLICY "Staff can delete reservation requests"
ON public.reservation_requests
FOR DELETE
TO authenticated
USING (public.is_staff_user(auth.uid()));