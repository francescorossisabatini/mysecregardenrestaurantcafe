CREATE TABLE public.cake_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  cake_choice TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  pickup_date DATE NOT NULL,
  notes TEXT,
  payment_acknowledged BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  staff_notes TEXT,
  language TEXT NOT NULL DEFAULT 'de',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT cake_orders_quantity_check CHECK (quantity >= 1),
  CONSTRAINT cake_orders_payment_acknowledged_check CHECK (payment_acknowledged = true),
  CONSTRAINT cake_orders_status_check CHECK (status IN ('pending', 'confirmed', 'cancelled', 'fulfilled')),
  CONSTRAINT cake_orders_language_check CHECK (language IN ('de', 'en')),
  CONSTRAINT cake_orders_choice_check CHECK (cake_choice IN (
    'Chocolate Mousse Cake',
    'Poppy Seeds Hazelnut Cake',
    'Carrot Spice Cake',
    'Walnut Brownie',
    'Salty Caramel Slice',
    'Vegan Cheesecake (Cashew Paste)'
  ))
);

ALTER TABLE public.cake_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can create cake orders"
ON public.cake_orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending'
  AND payment_acknowledged = true
  AND length(trim(name)) BETWEEN 2 AND 120
  AND length(trim(phone)) BETWEEN 3 AND 80
  AND quantity >= 1
  AND pickup_date >= CURRENT_DATE
  AND language IN ('de', 'en')
  AND cake_choice IN (
    'Chocolate Mousse Cake',
    'Poppy Seeds Hazelnut Cake',
    'Carrot Spice Cake',
    'Walnut Brownie',
    'Salty Caramel Slice',
    'Vegan Cheesecake (Cashew Paste)'
  )
);

CREATE POLICY "Staff can view cake orders"
ON public.cake_orders
FOR SELECT
TO authenticated
USING (public.is_staff_user(auth.uid()));

CREATE POLICY "Staff can update cake orders"
ON public.cake_orders
FOR UPDATE
TO authenticated
USING (public.is_staff_user(auth.uid()))
WITH CHECK (public.is_staff_user(auth.uid()));

CREATE POLICY "Staff can delete cake orders"
ON public.cake_orders
FOR DELETE
TO authenticated
USING (public.is_staff_user(auth.uid()));

CREATE INDEX idx_cake_orders_pickup_date_status
ON public.cake_orders (pickup_date, status);

CREATE INDEX idx_cake_orders_created_at
ON public.cake_orders (created_at DESC);

DROP TRIGGER IF EXISTS update_cake_orders_updated_at ON public.cake_orders;
CREATE TRIGGER update_cake_orders_updated_at
BEFORE UPDATE ON public.cake_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();