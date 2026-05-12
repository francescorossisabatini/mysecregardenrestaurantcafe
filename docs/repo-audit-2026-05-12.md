# Repo Audit — My Secret Garden
> Analisi del repository `francescorossisabatini/mysecregardenrestaurantcafe`
> Data: 12 maggio 2026 · Branch: `main`

---

## 1. Struttura delle route

Fonte: `src/App.tsx`

| Route | Componente | Stato rispetto all'IA spec |
|---|---|---|
| `/` | `Index` | ✅ Confermata |
| `/about` | `AboutUs` | ✅ Confermata — implementata (non placeholder) |
| `/visit` | `ContactPage` | ✅ Confermata |
| `/contact` | `ContactPage` | ⚠️ Alias di `/visit` — non in IA spec |
| `/menu` | `MenuPage` | ✅ Confermata |
| `/privacy` | `Privacy` | ✅ Confermata |
| `/impressum` | `Impressum` | ✅ Confermata |
| `/wochenkarte` | redirect → `/menu` | ✅ Confermata |
| `/speisekarte` | redirect → `/menu` | ⚠️ Aggiunta — non in IA spec |
| `/gallery` | `GalleryPage` | ⚠️ Aggiunta — non in IA spec |
| `/reservation-preview` | `ReservationPreview` | ⚠️ Aggiunta — non in IA spec |
| `/staff/login` | `StaffLogin` | ⚠️ Tool interno — non in IA spec |
| `/staff` | `StaffKitchen` | ⚠️ Tool interno — non in IA spec |
| `/staff/kitchen` | redirect → `/staff` | ⚠️ Tool interno — non in IA spec |
| `/link` | `LinkPage` | ⚠️ Link-in-bio — non in IA spec |

### Route mancanti rispetto all'IA spec

| Route | Stato |
|---|---|
| `/order` | ❌ Non implementata — nessuna route, nessuna pagina |
| `/cakes` | ❌ Non implementata — nessuna route, nessuna pagina |

**Nota:** `src/pages/WeeklySpecials.tsx` esiste nel repo ma non è registrato in nessuna route di `App.tsx`.

---

## 2. Stato dei blocchi critici

### 2.1 Homepage — sezione VOCI e badge istituzionali

**Stato: MANCANTE ❌**

La homepage (`src/pages/Index.tsx`) monta i seguenti blocchi in ordine:

```
Hero → ValueProposition → ShowcaseSections → HomeMenuPreview
→ Reviews → GallerySection → CTAEndBlock → Footer
```

Non esiste nessuna sezione "VOCI" e nessuna menzione di Falstaff, HappyCow, TripAdvisor, Wien wie es isst in nessun file sorgente. La ricerca su tutto il repo restituisce zero hit — i partner sono citati solo in `CLAUDE.md`.

La sezione `Reviews.tsx` mostra 2 recensioni Google e un link esterno a Google Maps. Niente badge partner istituzionali.

---

### 2.2 /menu tab "Always Here" — CTA per ordini torte

**Stato: MANCANTE ❌**

`src/components/MenuSection.tsx` — il blocco "Immer da" (Klassiker) termina con `<AllergenLegend />`. Non c'è:
- nessuna CTA verso `/order`
- nessun numero di telefono per ordini torte
- nessun testo di invito a ordinare torte

**Nota architetturale:** l'implementazione del menù non corrisponde alla struttura "3 tab" descritta nell'IA spec. È un layout scroll continuo con:
- navigazione sticky sidebar (desktop)
- floating pill (mobile)
- sezioni in sequenza: **Heute → Woche** (se disponibile) → **Immer da**

---

### 2.3 /menu tab "This Week" — day header dinamico o hardcoded

**Stato: DINAMICO ✅**

Il codice usa `day.day[language]` derivato dal dato Google Sheets/Supabase. Non c'è nessun "MONTAG" hardcoded. Il componente gestisce correttamente domeniche, festivi e giorni senza dati. Il campo `translatePeriod(menu.period, language)` mostra il range di date della settimana in corso.

---

### 2.4 /visit — orari reali o placeholder

**Stato: REALI ✅**

`src/pages/Contact.tsx` mostra:
- Orari: *Mo bis Sa: 11:00 bis 19:00 · Sonn- und Feiertage geschlossen*
- Indirizzo: *Mariahilferstraße 45, Im Raimundhof, 1060 Wien*
- Google Maps embed con coordinate reali
- Foto dell'ingresso (`entrance-garden.webp`)
- Info accessibilità (lift dal retro del Raimundhof)
- Info parcheggio (Wipark Windmühlgasse, 1h gratis da 27€)

**Problema critico:** il form Anfrage (`ReservationRequestForm`) è disabilitato via flag hardcoded:

```tsx
// src/pages/Contact.tsx
const showReservationRequest = false;
```

Il componente `ReservationRequestForm` esiste ed è importato, ma non viene renderizzato.

---

### 2.5 /about — implementata o placeholder

**Stato: IMPLEMENTATA E COMPLETA** — non è un placeholder.

`src/pages/AboutUs.tsx` (32 KB) è strutturata in 4 capitoli con navigazione anchor interna:

| Capitolo | Contenuto |
|---|---|
| 01 — Der Ort | Testo narrativo, foto del cortile, link a Google Maps |
| 02 — Die Küche | 3 card con foto reali, nota allergie |
| 03 — Der Alltag | Immagine + blockquote editoriale |
| 04 — Sri Chinmoy | Biografia, Jharna-Kala, carousel poesie (5 poesie), link esterni, rete ristoranti ispirati |

Funzionalità presenti: bilingue DE/EN completo, `RevealSection` con IntersectionObserver per animazioni, `CTAEndBlock` in fondo.

---

## 3. GA4 Event Tracking

### Event implementati

| Event | File | Note |
|---|---|---|
| `page_view` | `src/App.tsx` | Triggerato su ogni route change via `useLocation` |
| `scroll_depth` | `src/App.tsx` | A **50%** e **90%** — solo global, non per homepage |

### KPI primari — tutti mancanti

| Event (da CLAUDE.md) | Stato |
|---|---|
| `click_get_directions` | ❌ Non implementato |
| `click_call_now` | ❌ Non implementato |
| `scroll_depth_homepage` (25/50/75/100%) | ❌ Non implementato — solo 50%/90% globali |
| `click_menu_tab` | ❌ Non implementato |
| `click_open_closed_badge` | ❌ Non implementato |
| `form_reservation_submit` | ❌ Non implementato (form anche disabilitato) |
| `cake_call_click` | ❌ Non implementato (pagina `/order` non esiste) |

### Tracker non documentato

`App.tsx` contiene:

```ts
window._uxa?.push(["trackPageview", pagePath]);
```

`_uxa` è il tag **Contentsquare** (ex ContentSquare). Non è citato in CLAUDE.md tra gli analytics installati (che elenca solo GA4 + Hotjar).

---

## 4. Design System

### Token: divergenza tra CLAUDE.md spec e codice reale

CLAUDE.md documenta un sistema a due livelli con nomi semantici del tipo:

```
text-text-primary · bg-background-card · bg-action-primary
border-border-default · text-dietary-vegan
```

Il `tailwind.config.ts` reale usa la convenzione **shadcn/ui** con CSS custom properties:

```
text-foreground · bg-card · text-primary
border-border · text-state-vegan
```

I token sono funzionalmente equivalenti ma i nomi divergono dalla documentazione. Chiunque legga CLAUDE.md e scriva codice con quei nomi produrrebbe classi inesistenti.

### Font: discrepanza nel nome

| CLAUDE.md | tailwind.config.ts | Usato nel codice |
|---|---|---|
| `font-work-sans` | `font-work` | `font-work` ✅ |

### Token dichiarati e funzionanti

```
brand.star        → hsl(var(--semantic-warning))   usato in Reviews.tsx ✅
state.vegan       → var(--color-vegan)              usato in MenuSection.tsx ✅
state.glutenFree  → var(--color-gluten-free)        usato ✅
state.bio         → var(--color-bio)                usato ✅
```

### Token dichiarati ma probabilmente inutilizzati (da CLAUDE.md)

```
daily · dailyAlt · klassiker · badgeWood
shadow-soft · shadow-elevated · shadow-card (verificare)
bg-gradient-green · bg-gradient-subtle
animate-slide-up · animate-float
text-accent-light
sidebar-* (nessun componente sidebar esiste)
```

---

## 5. Stato dei bug dall'audit CLAUDE.md

| # | File | Bug | Stato |
|---|---|---|---|
| 1 | `MenuSection.tsx` | `color: '#166534'` hardcoded | ✅ Risolto — usa `text-state-vegan` |
| 2 | `MenuSection.tsx` | `color: '#92400e'` hardcoded | ✅ Risolto — usa `text-state-glutenFree` |
| 3 | `MenuSection.tsx` | `color: '#065f46'` hardcoded | ✅ Risolto — usa `text-state-bio` |
| 4 | `About.tsx` (component) | `Playfair Display` non in config | ⚠️ `AboutUs.tsx` (page) è pulita — `src/components/About.tsx` (5 KB, file separato) non verificato |
| 5 | `About.tsx` (component) | `Dancing Script` non in config | ⚠️ Come sopra — `src/components/About.tsx` non verificato |
| 6 | `Hero.tsx` | `bg-amber-500` / `bg-green-600` | ✅ Risolto — usa `bg-warning` / `bg-accent` |
| 7 | `Reviews.tsx` | `text-yellow-400` per stelle | ✅ Risolto — usa `text-brand-star` |
| 8 | `Footer.tsx` | `pb-24` hardcoded | ⚠️ Non verificato in questa sessione |

---

## 6. Osservazioni aggiuntive

### Componenti presenti ma non attivi

- **`HeroCarousel.tsx`** — esiste ma CLAUDE.md vieta i carousel (rimossi per click rate ~1%)
- **`InstallPrompt.tsx`** — renderizzato in `App.tsx`; potrebbe entrare in conflitto con il principio "nessun banner invasivo" se il prompt PWA è un overlay
- **`CookieConsent.tsx`** (15 KB) — renderizzato in `App.tsx`; da verificare che rispetti il principio "nessun popup"

### Navigazione mobile

CLAUDE.md specifica una bottom nav con 3 voci (Home · Menü · Visit) + call pill. L'implementazione usa `MobileStickyBar.tsx` che affianca `Navigation.tsx`. Da verificare se corrispondono alla spec (in questa sessione non sono stati esaminati nel dettaglio).

---

## 7. Gap prioritizzati

| Priorità | Gap | File/Componente |
|---|---|---|
| 🔴 Alta | Route `/order` e `/cakes` non esistono | `src/App.tsx` |
| 🔴 Alta | 5/7 KPI GA4 event non tracciati | Vari componenti |
| 🔴 Alta | Form Anfrage disabilitato (`showReservationRequest = false`) | `src/pages/Contact.tsx` |
| 🟠 Media | Nessuna sezione VOCI / badge partner su homepage | `src/pages/Index.tsx` |
| 🟠 Media | Nessuna CTA torte nel tab "Always Here" | `src/components/MenuSection.tsx` |
| 🟡 Bassa | CLAUDE.md usa nomi token diversi dal codice reale | `CLAUDE.md` + `tailwind.config.ts` |
| 🟡 Bassa | `src/components/About.tsx` (bug #4-5) non verificato | `src/components/About.tsx` |
| 🟡 Bassa | `Footer.tsx` bug #8 (`pb-24`) non verificato | `src/components/Footer.tsx` |
| 🟡 Bassa | Tracker Contentsquare (`_uxa`) non documentato in CLAUDE.md | `src/App.tsx` |

---

*Audit eseguito via GitHub MCP · Branch `main` · SHA `b3017b1c`*
