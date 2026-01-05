-- Drop the RLS policy first
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Drop the newsletter_subscribers table
DROP TABLE IF EXISTS public.newsletter_subscribers;