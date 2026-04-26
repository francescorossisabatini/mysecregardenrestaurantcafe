# Piano: A/B test Hero mobile con foto food, dining e garden

Obiettivo: mostrare automaticamente hero mobile diverse a utenti diversi per capire quale contesto converte meglio: cibo, tavola/dining, garden/cortile. Il test durerà 7 giorni e userà solo foto reali già presenti nel progetto.

## Varianti da testare

Useremo 3 varianti mobile-first:

1. **Food focus**
   - Immagine: `minnesota-bowl.webp` oppure `dal-rice-bowl.jpg`
   - Ipotesi: funziona meglio per utenti affamati/decisi che vogliono capire subito cosa si mangia.

2. **Dining/table context**
   - Immagine: `dining-scene.jpg` oppure `dishes-table-top.jpg`
   - Ipotesi: comunica esperienza, convivialità e fiducia meglio del singolo piatto.

3. **Garden/courtyard context**
   - Immagine: `garden-real.webp` o `entrance-garden.webp`
   - Ipotesi: rafforza il differenziale “hidden garden courtyard” e riduce la frizione del “dove si trova?”.

Non useremo immagini AI e non aggiungeremo zoom/parallax, rispettando le regole visive esistenti.

## Come funzionerà il test

- Solo su mobile.
- Ogni nuovo visitatore mobile riceve una variante casuale.
- La variante viene salvata in `localStorage`, così lo stesso utente vede sempre la stessa hero nei 7 giorni.
- Desktop resta invariato, per non disturbare l’esperienza già più stabile.
- Dopo 7 giorni il test può essere letto dai dati analytics.

Schema:

```text
Nuovo utente mobile
        |
        v
assegna variante A/B/C
        |
        v
mostra hero mobile con foto dedicata
        |
        v
traccia impression + click CTA con hero_variant
```

## Metriche da misurare

Per ogni variante tracceremo:

- `hero_variant_impression`: quante volte la variante viene vista.
- Click su `Tagesmenü / Today's Menu` dalla hero.
- Click su `Wochenmenü / Weekly Specials` dalla hero, se visibile.
- Click su `Route / Directions` dalla sticky bar mobile.
- Click su `Call / Anrufen` dalla sticky bar mobile.

La metrica principale sarà:

```text
conversion rate = click utili / impression variante
```

Dove “click utili” = menu + directions + call.

## Modifiche previste

### 1. Configurazione test
Creare una configurazione dedicata, ad esempio `src/config/heroAbTest.ts`, con:

- ID test: `mobile_hero_context_v1`
- data/durata test: 7 giorni
- varianti: `food`, `dining`, `garden`
- immagine mobile associata
- eventuale posizione background ottimizzata per mobile

### 2. Utility di assegnazione variante
Creare una piccola utility client-side, ad esempio `src/lib/heroAbTest.ts`, che:

- controlla se siamo su mobile
- legge/scrive la variante in `localStorage`
- rispetta la durata del test
- ritorna la variante attiva al componente Hero

### 3. Aggiornamento Hero mobile
Modificare `src/components/Hero.tsx` per:

- usare la variante A/B solo su mobile
- mantenere il carousel/hero desktop invariato
- usare la foto scelta come immagine iniziale mobile
- inviare un evento impression una sola volta per sessione/visualizzazione
- aggiungere `hero_variant` agli eventi CTA già esistenti

### 4. Tracking CTA mobile collegate alla variante
Aggiornare `src/components/MobileStickyBar.tsx` per includere `hero_variant` negli eventi:

- `click_call`
- `click_directions`

Così possiamo capire se una hero non genera solo click sul menu, ma influenza anche azioni locali importanti.

## Lettura dopo 7 giorni

Dopo 7 giorni si confronteranno le varianti su:

1. Impression
2. Click menu
3. Click directions
4. Click call
5. Conversion rate complessivo

Se una variante ha più conversioni ma pochissime impression, la valuteremo con cautela. Se una variante vince chiaramente, la imposteremo come hero mobile permanente.

## Nota importante sui dati

Il tracking analytics rispetta il consenso cookie già presente. Quindi verranno misurati solo gli utenti che accettano analytics. È corretto per GDPR, ma significa che il campione sarà più piccolo rispetto al traffico totale.