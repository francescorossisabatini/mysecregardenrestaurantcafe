## Obiettivo

Applicare i principi UX/UI già in uso (Direzione A "Herbarium editorial") a due punti deboli:

1. **Ordine sezioni Home** — oggi "Menu di oggi" appare dopo 4 sezioni: The Regular (memoria utenti) lo vuole in <20s.
2. **Schede piatto** — 3 stili diversi tra `MenuSection` (classici), `DayMenuCard`, `DailyMenuCard`, `HomeMenuPreview`. Zero uso delle foto già in repo.

Nessuna modifica a copy approvato, route, Supabase, `tailwind.config.ts`, GA4. Nessuna nuova immagine (solo asset esistenti in `src/assets/`).

---

## 1. Nuovo ordine sezioni in `src/pages/Index.tsx`

Motivazione UX per profilo (GA4):

- **The Regular** (<20s): "cosa c'è oggi?" → il preview del menu di oggi va **subito dopo l'Hero**.
- **The Seeker** (<90s): trust → decisione → percorso: Hero (trust) → Menu oggi (decisione) → ValueProp+Showcase (contesto) → Reviews → CTA.

```
PRIMA                              DOPO
1. Hero                            1. Hero
2. ValueProposition                2. HomeMenuPreview   ← su
3. ShowcaseSections                3. ValueProposition
4. Voci                            4. ShowcaseSections
5. HomeMenuPreview                 5. Voci
6. Reviews                         6. Reviews
7. CTAEndBlock                     7. CTAEndBlock
```

**Rinumerazione eyebrow** (già in Direzione A): aggiorno il numero editoriale in ogni componente affinché la sequenza `01…07` resti coerente col nuovo ordine. Le label testuali restano invariate.

- Hero: nessun eyebrow numerato (resta trust strip)
- HomeMenuPreview: `01 · Heute auf dem Tisch` / `01 · On the table today`
- ValueProposition: `02 · Der Ort` / `02 · The Place`
- ShowcaseSections: `03 · Speisekarte` + `04 · Besuch`
- Voci: `05 · Stimmen` / `05 · Voices`
- Reviews: `06 · Gäste sagen` / `06 · Guests say`
- CTAEndBlock: `07 · Vorbeikommen` / `07 · Visit us`

## 2. Schede menu — unificazione visiva

### Sistema comune (nuovo helper `src/components/menu/DishRow.tsx`)

Un solo pattern riutilizzabile:

```
┌───────────────────────────────────────────┐
│ [thumb 72×72]  Kicker · verde/blu  Preis  │
│                Nome piatto (Cormorant 20) │
│                Descrizione (Lora 14)      │
│                • vegan · ohne Gluten · bio│
│                Details & allergens ▾      │
└───────────────────────────────────────────┘
```

- Superficie unica: `surface-card` (rounded-2xl, border cream-200, shadow-card) — allineata a `HomeMenuPreview`
- Thumbnail quadrata **opzionale**: 72×72 mobile, 96×96 desktop, `rounded-xl object-cover`, `loading="lazy"`; se assente → nessuno spazio riservato (grid a 1 colonna)
- Prezzo: `font-work font-semibold text-accent` allineato in alto-destra su desktop, sotto il kicker su mobile
- Dietary + Allergens già esistenti restano funzionali; solo restyling visivo
- Kicker: `font-work text-[10px] uppercase tracking-[0.08em]` verde/blu/amber a seconda del tipo

### Mappa foto ↔ categoria (solo asset già in repo, nessuna AI)

| Categoria/dish key | File in `src/assets/` |
|---|---|
| Warm Dishes / Dal | `dal-rice-bowl.jpg` |
| Warm Dishes / Curry | `curry-of-the-day.webp` |
| Warm Dishes / Alpenpolenta | `alpenpolenta.jpg` |
| Warm Dishes / Korean | `korean-bowl.jpg` |
| Warm Dishes / Minnesota | `minnesota-bowl.webp` |
| Salads (generic) | `food-bowl-real.jpg` |
| Green Dish (weekly) | `food-detail-real.jpg` |
| Blue Dish (weekly) | `piatto-bowl-blue.jpg` |
| Soup (weekly) | *nessuna foto → solo testo* |
| Cakes / Drinks | *nessuna foto → solo testo* |

Il match è per **id/slug del piatto in `klassikerData.ts`** — se non c'è slug matching → nessuna foto, la card resta text-only. Nessuna foto viene "inventata" o riusata a sproposito.

### Refactor componenti (solo presentational)

- `DailyMenuCard.tsx` — sostituito da wrapper attorno a `DishRow`
- `DayMenuCard.tsx` — header giorno + `DishRow` per soup/green/blue; rimossa pill "Heute" ridondante (già segnalata da `isToday` con ring verde e border)
- `HomeMenuPreview.tsx` — le 3 dish cards riscritte con `DishRow`; grid resta 3 col desktop / stack mobile
- `MenuSection.tsx` — cards inline dei classici (righe ~330-550) sostituite con `DishRow`; nessun cambio a stato/tab/quick-nav/logica Supabase
- Section headers "Warm Dishes / Salads / Cakes / Drinks": passano al pattern editoriale `eyebrow-num` + `h2-editorial` + `rule-short` (già esistenti in `index.css`)

## 3. Guardrail

- Nessun cambio in `tailwind.config.ts`, `supabase/*`, `useWeeklyMenu`, `klassikerData`, routing
- WCAG AA su tutti i nuovi elementi (contrasto testo/prezzo su surface-card verificato con token esistenti)
- `alt` descrittivo su ogni `<img>` (nome piatto), `loading="lazy"`, `decoding="async"`
- Nessun em dash. Nessuna nuova animazione oltre fade esistenti. Rispetto `prefers-reduced-motion`
- Nessun cambio di copy: label kicker/dietary/allergens restano quelle già approvate
- MobileStickyBar e `#menu` scroll behaviour restano intatti (l'anchor scroll continua a funzionare col nuovo ordine perché la sezione ha ancora `id="menu"`)

## File toccati

- `src/pages/Index.tsx` — riordino sezioni
- `src/components/HomeMenuPreview.tsx` — eyebrow `01`, refactor dish → DishRow
- `src/components/ValueProposition.tsx` — eyebrow `02`
- `src/components/ShowcaseSections.tsx` — eyebrow `03` + `04`
- `src/components/Voci.tsx` — eyebrow `05`
- `src/components/Reviews.tsx` — eyebrow `06`
- `src/components/CTAEndBlock.tsx` — eyebrow `07`
- `src/components/menu/DishRow.tsx` — **nuovo** componente presentational condiviso
- `src/components/menu/dishPhotoMap.ts` — **nuovo** mapping slug → asset URL (solo import statici da `src/assets/`)
- `src/components/DailyMenuCard.tsx` — wrap `DishRow`
- `src/components/DayMenuCard.tsx` — wrap `DishRow`
- `src/components/MenuSection.tsx` — sostituisce solo il markup delle card classiche + section header (nessuna modifica a logica/hook)

## Verifica post-build

Playwright screenshot mobile+desktop di `/` (nuovo ordine) e `/menu` (nuove schede con thumbnail) → conferma visiva prima di chiudere.
