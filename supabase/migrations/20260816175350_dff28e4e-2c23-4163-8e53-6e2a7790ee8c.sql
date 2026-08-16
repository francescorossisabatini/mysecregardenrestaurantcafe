UPDATE public.menu_config
SET sheet_id = '1EbhjruU3C2ZarT0rAKEWKityj7JpksCw',
    loaded_at = now(),
    loaded_by = null
WHERE singleton = true;

INSERT INTO public.menu_config (singleton, sheet_id, loaded_at, loaded_by)
SELECT true, '1EbhjruU3C2ZarT0rAKEWKityj7JpksCw', now(), null
WHERE NOT EXISTS (SELECT 1 FROM public.menu_config WHERE singleton = true);