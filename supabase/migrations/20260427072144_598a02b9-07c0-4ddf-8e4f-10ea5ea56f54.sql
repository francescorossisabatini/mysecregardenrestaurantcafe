CREATE TABLE public.kuechenplan_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_hash TEXT NOT NULL UNIQUE,
  sheet_name TEXT NOT NULL DEFAULT 'Küchenplan',
  period TEXT,
  is_current BOOLEAN NOT NULL DEFAULT false,
  archived_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.kuechenplan_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  snapshot_id UUID NOT NULL REFERENCES public.kuechenplan_snapshots(id) ON DELETE CASCADE,
  row_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  menu_day TEXT,
  description TEXT,
  ingredients TEXT[] NOT NULL DEFAULT '{}',
  allergens TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT[] NOT NULL DEFAULT '{}',
  fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  search_text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(snapshot_id, row_index)
);

ALTER TABLE public.kuechenplan_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kuechenplan_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view kuechenplan snapshots"
ON public.kuechenplan_snapshots
FOR SELECT
TO authenticated
USING (public.is_staff_user(auth.uid()));

CREATE POLICY "Staff can view kuechenplan items"
ON public.kuechenplan_items
FOR SELECT
TO authenticated
USING (public.is_staff_user(auth.uid()));

CREATE INDEX idx_kuechenplan_snapshots_current ON public.kuechenplan_snapshots(is_current, created_at DESC);
CREATE INDEX idx_kuechenplan_items_snapshot ON public.kuechenplan_items(snapshot_id, row_index);
CREATE INDEX idx_kuechenplan_items_search ON public.kuechenplan_items USING GIN(to_tsvector('simple', search_text));