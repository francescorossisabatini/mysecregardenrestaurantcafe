## Obiettivo
Usare il connettore Google Maps Platform (già disponibile in workspace, non ancora linkato al progetto) per recuperare le foto del ristorante e collegare insalate + torte alle voci di menu corrispondenti.

## Cosa ho già verificato
Ho fatto una chiamata one-off al gateway `places/v1/places:searchText`:
- Place ID trovato: `ChIJWbRRBI8HbUcRtcyW5DPc93Y`
- Google Places restituisce **10 foto** per questo posto (limite API). Sono un mix: interni, esterni, alcuni piatti — dalle metadata non si capisce quali siano insalate o torte, servono gli occhi.

## Vincoli importanti (Google ToS)
Le foto di Google Places **non possono essere scaricate e salvate come asset statici** nel repo: vanno servite tramite l'API con attribuzione autore visibile. Due strade:
1. **Attribuzione + hotlink via edge function proxy** (rispetta ToS, ma aggiunge un round-trip e dipende dal gateway ad ogni load)
2. **Selezione manuale + scatto proprio** — usiamo le foto Google solo come *reference* per capire cosa esiste, poi aspettiamo il photoshoot di aprile-maggio come previsto in `mem://brand/real-photos-only-policy`

⚠️ La memoria di progetto dice: *"Real photos only, NO AI generated images"* e *"only real photos from assets, Google Maps, or previous site"* — quindi Google Maps come sorgente è **esplicitamente consentito**, purché con attribuzione.

## Piano proposto (fase 1 — solo selezione)
Questa fase **non tocca il codice del menu**. Serve solo a farti vedere le foto disponibili e decidere.

1. **Linkare il connettore Google Maps al progetto** (`standard_connectors--connect google_maps`) — necessario per servire le foto in runtime tramite edge function.
2. **Creare uno script di ricognizione** (`scripts/fetch-place-photos.ts`, non incluso in build): scarica tutte le 10 foto in `/tmp/msg-photos/` via il media endpoint `places/v1/{photo_name}/media?maxWidthPx=1600`.
3. **Aprire le 10 foto** una per una e catalogarle: interno / esterno / insalata / torta / altro piatto / persone.
4. **Presentarti un indice** con thumbnail + attribuzione autore + suggerimento di uso (es. "foto #3 → insalata verde per il Menu; foto #7 → cheesecake per /order").
5. **Aspetto la tua selezione** prima di scrivere qualsiasi codice.

## Piano fase 2 (dopo la tua selezione, in sessione separata)
Solo se le foto Google Places ti convincono:

- Creare edge function `supabase/functions/place-photo/index.ts` che accetta `?name=<photo_name>&w=<width>` e proxya al gateway con caching (`Cache-Control: public, max-age=86400`).
- Estendere `src/components/menu/dishPhotoMap.ts` con `categoryHeaderPhoto.salate` e nuovo `cakePhotoMap` per `/order`, referenziando URL della funzione anziché import statici.
- Aggiungere blocco attribuzione autore Google (piccolo, `text-[10px] text-text-muted`) sotto ogni immagine — richiesto da ToS.
- Rispettare i token semantici: nessun hex hardcoded, aspect-ratio coerente con le card esistenti.

## Cosa NON farà questo piano
- Non scarico foto nel repo git (viola ToS Google + memoria progetto).
- Non genero AI images.
- Non tocco il copy, la struttura del menu, o i token.
- Non aggiungo torte al menu se non ci sono nei dati Supabase — le foto torte serviranno solo per `/order`.
- Non pusho su main senza tua conferma.

## Domanda aperta
Ok procedere con la **fase 1 di sola ricognizione** (link connettore + download temporaneo + galleria di scelta)? O preferisci che aspetti direttamente il photoshoot senza toccare Google Places?