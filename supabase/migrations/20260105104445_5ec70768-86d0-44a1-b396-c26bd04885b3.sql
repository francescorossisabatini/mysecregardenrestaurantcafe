-- Remove the overly permissive SELECT policy that exposes subscriber emails publicly
DROP POLICY IF EXISTS "Users can view subscriptions" ON public.newsletter_subscribers;