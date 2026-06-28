
DROP POLICY "Visitors can create reservation requests" ON public.reservation_requests;
CREATE POLICY "Visitors can create reservation requests" ON public.reservation_requests
FOR INSERT WITH CHECK (
  status = 'new'
  AND length(TRIM(BOTH FROM full_name)) >= 2 AND length(TRIM(BOTH FROM full_name)) <= 120
  AND length(TRIM(BOTH FROM contact)) >= 3 AND length(TRIM(BOTH FROM contact)) <= 160
  AND reservation_date >= CURRENT_DATE
  AND reservation_time >= '11:00:00'::time AND reservation_time <= '19:00:00'::time
  AND party_size >= 1 AND party_size <= 10
  AND language = ANY (ARRAY['de','en'])
  AND seating_area = ANY (ARRAY['inside','outside'])
  AND staff_notes IS NULL
);

DROP POLICY "Visitors can create cake orders" ON public.cake_orders;
CREATE POLICY "Visitors can create cake orders" ON public.cake_orders
FOR INSERT WITH CHECK (
  status = 'pending'
  AND payment_acknowledged = true
  AND length(TRIM(BOTH FROM name)) >= 2 AND length(TRIM(BOTH FROM name)) <= 120
  AND length(TRIM(BOTH FROM phone)) >= 3 AND length(TRIM(BOTH FROM phone)) <= 80
  AND quantity >= 1
  AND pickup_date >= CURRENT_DATE
  AND language = ANY (ARRAY['de','en'])
  AND cake_choice = ANY (ARRAY['Chocolate Mousse Cake','Poppy Seeds Hazelnut Cake','Carrot Spice Cake','Walnut Brownie','Salty Caramel Slice','Vegan Cheesecake (Cashew Paste)'])
  AND staff_notes IS NULL
);
