# CLAUDE.md — My Secret Garden
> Leggi questo file prima di toccare qualsiasi cosa nel repo.
> Ultimo aggiornamento: maggio 2026

---

## Chi sono io — il designer di questo progetto

Mi chiamo **Francesco Rossisabatini**. Sono un UX Designer e Digital Manager in formazione, laureando alla **Università degli Studi di Milano-Bicocca** (Teoria e Tecnologia della Comunicazione — TTC). Questo progetto — chiamato internamente **CS01** — è simultaneamente un deliverable reale per un cliente e un **case study di portfolio**.

Il mio obiettivo professionale è crescere come junior UX Designer → UX Researcher → Product Manager/PdM, con focus sul mercato fintech (N26, Revolut, Erste Bank) e Vienna come mercato primario.

**Ruolo su questo progetto:** gestisco sia il lavoro di design/prodotto che la relazione con il cliente (il proprietario del ristorante). Sono l'unico designer, il responsabile del repo, e l'interlocutore tra Figma, GitHub e Lovable.

**Stack di lavoro:**
- Design: Figma (file key `ROhPox2dPuVizyYXiLAbKN`)
- Project management: Notion (CS01 root `32e2da0682ac8197ba4ac538d91b51af`)
- Sviluppo: React + TypeScript + Tailwind CSS + Supabase + Lovable
- Repo locale: `C:\Users\fraro\mysecregardenrestaurantcafe\`
- Repo GitHub: `francescorossisabatini/mysecregardenrestaurantcafe`

---

## Il progetto — CS01

**secretgardenrestaurant.at** è il sito di My Secret Garden, un café-ristorante vegetariano a Vienna. Il sito originale è stato costruito con Lovable senza un processo UX formale. CS01 è un **redesign completo e documentato**: dalla ricerca quantitativa su dati reali, al design system, ai wireframe, all'implementazione, fino alla misurazione GA4.

- **Tipo:** B2C · Hospitality / Food & Beverage
- **Stage:** Full redesign — non MVP, non nuova feature
- **Live site:** secretgardenrestaurant.at
- **Audit score AS-IS:** 6.5/10 (analisi marzo 2026)

---

## Il ristorante

**My Secret Garden** — café-ristorante vegetariano e vegano
- Indirizzo: **Mariahilferstraße 45, Im Raimundhof, 1060 Wien**
- Nascosto in un cortile — l'ingresso è attraverso un arco, non visibile dalla strada
- Ispirato alla filosofia di **Sri Chinmoy** — dimensione spirituale incorporata nello spazio
- **Counter service only** — nessun servizio al tavolo, probabilmente nessuna prenotazione (da confermare)
- Orari: **lunedì–sabato, 11:00–19:00** · domenica e festivi: chiuso
- Telefono: **+43 1 586 28 39** · `tel:+431586289`
- Rating: **4.7★ su 936+ recensioni** (Google, HappyCow, Falstaff, TripAdvisor, Wien wie es isst)
- Partner confermati: Supermind Kaffee (supermind.at), Falstaff 2025, Wien wie es isst 2025, HappyCow, TripAdvisor, foodsharing.at

---

## Principio guida non negoziabile

> **"Il sito accoglie — non cattura."**

Questo vincola ogni decisione di feature, flusso e copy. In pratica:
- Nessun popup, nessun banner invasivo
- Nessun form di acquisizione email
- Nessun funnel di conversione aggressivo
- **Una sola CTA primaria per pagina** — mai due azioni in competizione
- La prenotazione si chiama **"Anfrage"** (richiesta), non "Reservierung" (prenotazione vincolante)
- Il telefono è sempre il canale primario suggerito; il form è l'alternativa
- **Non usare mai linguaggio di urgency** (es. "Jetzt reservieren!", "Letzte Plätze!")

---

## Stack tecnico

| Layer | Tech |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS (token system — vedi sezione dedicata) |
| Backend / DB | Supabase (`daily_menu` table — aggiornata ogni mattina dallo staff) |
| Deploy | Lovable → GitHub (push su `main` va in produzione via Lovable) |
| Design source | Figma `ROhPox2dPuVizyYXiLAbKN` |
| Analytics | GA4 + Hotjar (Microsoft Clarity NON è installato) |
| Lingua default | DE (73% traffico austriaco) — EN parità su tutti i route |

**Vincoli di piattaforma:**
- Mobile-first — 74% traffico mobile (GA4 confermato)
- Sessione media: 58 secondi — gli utenti decidono in fretta
- SPA React — nessun reload tra route; il browser back deve funzionare su tutti i route
- Nessun carousel — rimosso (click rate ~1%, costo performance non giustificato)
- Nessun pagamento online — pay at pickup only
- Foto piatti: scatto reale in corso (aprile–maggio 2026) — placeholder fino ad allora
- Target performance: <3s load su 4G mobile

---

## Information Architecture

| Route | Scopo | Status |
|---|---|---|
| `/` | Homepage — trust, desire, friction removal | ✅ Confermata |
| `/menu` | Menu hub — 3 tab: Today / This Week / Always Here | ✅ Confermata |
| `/visit` | Orari, directions, form Anfrage | ✅ Confermata |
| `/order` | Ordine torte — form + telefono | ✅ Confermata |
| `/cakes` | Route editoriale torte (nuova) | ✅ Confermata |
| `/about` | About page (solo placeholder — da completare) | ✅ Confermata |
| `/impressum` | Legal — obbligatorio per legge austriaca | ✅ Confermata |
| `/privacy` | Cookie policy — GDPR | ✅ Confermata |

**Redirect:** `/wochenkarte` → `/menu` (permanente, confermato)

**Navigazione:**
- Bottom nav mobile (sempre visibile, fixed): Home · Menü · Visit · Call pill
- `/order` **non** è in bottom nav — si accede dal tab "Always Here" del menu
- Top bar: logo + language switch DE/EN

---

## Token System — REGOLA FONDAMENTALE

Il design system usa un **sistema a due livelli: primitive → semantic**.

```
primitive → raw values (palette, scale) — es. color/navy/900 = #264195
semantic  → alias con intento d'uso → puntano al primitive — es. color/text/price → green/900
```

### ✅ CORRETTO — usa sempre token semantici nei componenti
```tsx
className="text-text-primary bg-background-card border-border-default"
```

### ❌ VIETATO — mai hardcode hex o token primitivi nei componenti
```tsx
style={{ color: '#3a5018' }}           // hardcoded hex — VIETATO
className="text-green-900 bg-navy-700" // token primitivi — VIETATO
className="text-yellow-400"            // Tailwind default — VIETATO per brand
```

---

## Palette Primitiva (solo per costruire il layer semantico)

### Navy
| Token Tailwind | Hex | Uso |
|---|---|---|
| `navy-900` | `#264195` | Strutturale: hero, footer, call pill, lang switch |
| `navy-700` | `#2b4baf` | Gradient hero end, hover navy |
| `navy-500` | `#4769c8` | Focus rings, link su superfici medie |
| `navy-300` | `#92a9e6` | Accenti chiari, dark mode |

### Green (verde bosco)
| Token Tailwind | Hex | Uso |
|---|---|---|
| `green-900` | `#3a5018` | Brand primario: link, prezzi, CTA |
| `green-700` | `#4a6622` | Hover azioni verdi |
| `green-500` | `#5a7a2e` | Bordo bottom nav, badge vegan, accenti |
| `green-300` | `#8fb86a` | Accenti chiari — ⚠️ mai come testo su sfondo chiaro (fallisce WCAG AA) |
| `green-200` | `#c2d9a8` | Superficie badge, background tenue |

### Cream
| Token Tailwind | Hex | Uso |
|---|---|---|
| `cream-100` | `#F5F0E8` | Page canvas — superficie base |
| `cream-200` | `#F7F2EB` | Card surface |
| `cream-300` | `#EDE8DE` | Testo su sfondi scuri |

### Neutral
| Token Tailwind | Hex | Uso |
|---|---|---|
| `neutral-900` | `#1A1A1A` | Testo primario — mai `#000000` |
| `neutral-600` | `#4D4D4D` | Testo secondario |
| `neutral-400` | `#8C8C8C` | Muted, placeholder |
| `neutral-200` | `#E0D9CC` | Bordi, dividers |
| `neutral-0` | `#FFFFFF` | Superfici elevate, modali |

### Feedback
| Token | Hex |
|---|---|
| feedback-success / open | `#3a5018` |
| feedback-warning | `#f59e0b` |
| feedback-error / closed | `#d61717` |

### Dietary badges
| Token | Hex |
|---|---|
| `dietary-vegan` | `#3a5018` |
| `dietary-glutenFree` | `#92400e` |
| `dietary-bio` | `#056138` |

---

## Token Semantici — Mappa completa (usa questi nei componenti)

```javascript
// Backgrounds
bg-background-page     → #f5f0e8  (page canvas)
bg-background-card     → #f7f2eb  (content containers)
bg-background-elevated → #ffffff  (cards con shadow, modali)
bg-background-hero     → #2b4baf  (hero section)
bg-background-footer   → #2b4baf  (footer)
bg-background-dark     → #141c50  (dark mode)

// Text
text-text-primary   → #1a1a1a  (body default)
text-text-secondary → #4d4d4d  (supporting)
text-text-muted     → #8c8c8c  (placeholder, disabled)
text-text-inverse   → #ffffff  (su scuri)
text-text-onDark    → #ede8de  (body su hero/footer)
text-text-link      → #3a5018  (link su chiaro)
text-text-price     → #3a5018  (prezzi)

// Actions
bg-action-primary        → #3a5018  (CTA verde — max 1 per view)
bg-action-primaryHover   → #4a6622
bg-action-secondary      → #264195  (secondo bottone navy)
bg-action-secondaryHover → #2b4baf
bg-action-call           → #264195  (call pill — sempre navy)
bg-action-callHover      → #2b4baf

// Borders
border-border-default → #e0d9cc
border-border-input   → #e0d9cc
border-border-focus   → #4769c8  (focus ring)
border-border-nav     → #e0d9cc

// Feedback
text-feedback-success → #3a5018
text-feedback-warning → #f59e0b
text-feedback-error   → #d61717
bg-feedback-open      → #3a5018  (badge aperto)
bg-feedback-closed    → #d61717  (badge chiuso)

// Dietary
text-dietary-vegan      → #3a5018  (badge text + icon)
text-dietary-glutenFree → #92400e
text-dietary-bio        → #056138
// Surfaces: applica il colore al 15% opacity nel componente
```

**Dosage:** 60% cream / 30% navy / 10% green (solo CTA, nav attivo, rating, piccoli accenti)

---

## Tipografia

| Ruolo | Font | Size | Weight | Uso |
|---|---|---|---|---|
| `font-caveat` | Caveat | 48px | 700 | H1 hero + logo nav — **mai altrove** |
| `font-cormorant` | Cormorant Garamond | 24px | 400 | H2, H3, H4 — section headings |
| `font-lora` | Lora | 16px | 400 | Body copy, reviews, about |
| `font-work-sans` | Work Sans | 14px | 400 | Nav, buttons, badges, prezzi, label |

**Regola ferro:** max 2 typeface per viewport. Caveat max 1 occorrenza per viewport.

### Font NON dichiarati in tailwind.config — da non usare
- `Playfair Display` — ❌ non in config (trovato in About.tsx ~60 — va sostituito con `font-cormorant`)
- `Dancing Script` — ❌ non in config (trovato in About.tsx ~65 — va sostituito con `font-caveat`)

---

## Componenti — Specifiche visual

### Buttons
```
Primary:   bg-action-primary text-text-inverse rounded-lg px-6 py-3 font-work-sans font-semibold
Secondary: bg-action-secondary text-text-inverse rounded-lg px-6 py-3
Ghost:     border border-action-ghost text-action-ghost rounded-lg px-6 py-3
Call pill: bg-action-call text-text-inverse rounded-[13px] w-[80px] h-[48px]
           shadow: 0 4px 14px -2px rgba(38,64,148,0.22)

Stati: hover → tono più scuro | active → scale(0.98) | disabled → 40% opacity | loading → spinner bianco
```

**Copy rule:** il label del bottone nomina il RISULTATO, non l'azione.
- ✅ "Was gibt's heute?" / "Den Weg finden" / "Anfrage senden"
- ❌ Mai "Klick hier" · "Mehr erfahren" · "Absenden"

### Dietary Badges
```
Shape: pill (rounded-full)
Padding: py-0.5 px-2
Font: font-work-sans text-sm lowercase (sempre lowercase — mai VEGAN)
Background: colore dietary al 15% opacity
Text: colore dietary al 100%
```

### Open/Closed Badge
```
Background: solido — open: bg-feedback-open | closed: bg-feedback-closed
Text: text-text-inverse font-work-sans font-bold text-[11px]
Dot: w-1.5 h-1.5 rounded-full
Shape: pill
aria-live="polite"
```

### Menu Cards
```
bg-background-elevated rounded-lg border border-border-default p-4 shadow-card

Type badge (ZUPPA / VERDE / BLU): font-work-sans font-bold text-[9px] uppercase tracking-wider
  ZUPPA: amber · VERDE: bg-action-primary · BLU: bg-action-secondary · text: text-inverse

Dish name: font-work-sans font-medium text-[13px] text-text-primary
Price: font-work-sans font-bold text-[13px] text-text-price
Dietary badges: sotto dish name, gap-2
```

### Navigation — Top Bar
```
Height: h-[60px] · Padding: px-5
Hero (scrollY=0): transparent, logo/text white, lang pill white
Scrolled (scrollY>150px): bg-cream-100/97 backdrop-blur-[16px] border-b border-border-nav/50
Transizione: 250ms ease (background only)
```

### Navigation — Bottom Nav Mobile
```
Height: h-[72px] · Padding: pt-2 px-4 pb-[16px]
Background: bg-cream-100 backdrop-blur-[20px]
Border-top: border-t-[1.5px] border-green-500
3 voci (Home · Menü · Visit):
  Inattivo: text-text-muted font-work-sans text-[10px] icon 20px
  Attivo: text-green-900 font-work-sans font-semibold + indicatore linea 1.5px verde 24px in cima
Call pill: w-[80px] h-[48px] bg-action-call text-text-inverse rounded-[13px]
Safe area: padding-bottom env(safe-area-inset-bottom)
```

---

## Animazioni

```css
Default: 300ms ease-in-out
Fade in: opacity 0 → 1, 300ms
Slide up: translateY(8px) → 0, 300ms
Float hero: 3000ms ease-in-out, infinite
```

- Solo soft fades e subtle slides — niente bounce/elastic
- Nessuna animazione su testo — solo container e immagini
- **Sempre** rispettare `prefers-reduced-motion`
- Nessun parallax su mobile

---

## Accessibilità — WCAG 2.1 Level AA obbligatorio

- Contrasto minimo 4.5:1 testo normale, 3:1 testo grande
- Touch target minimo **44×44px** su tutti gli elementi interattivi mobile
- Focus ring visibile su tutti gli interattivi: `border-border-focus` (#4769c8)
- Tutti gli icon senza label visibile: `aria-label` obbligatorio
- Dietary badges: `aria-label="vegan"`, `aria-label="gluten-free"`, `aria-label="bio"`
- Prezzi: `aria-label="€ 8,50"` — non solo il numero
- Route transitions: il focus si sposta in cima al nuovo contenuto
- `lang="de"` su html quando DE è attivo, `lang="en"` quando EN

---

## Copy — Lingua e Tono

- **Lingua default:** DE (73% traffico austriaco)
- **Tono:** du — colloquiale, viennese, caldo
- **Forma:** du (mai Sie, mai voi)
- **Nessun urgency language** — mai "Jetzt!", "Letzte Chance", "Sofort"
- Copy in DE e EN — pari peso ritmico, non traduzione letterale
- **Sri Chinmoy:** citato discretamente, mai spiegato. Link esterno a srichinmoy.org (nuova tab)
- Citazione confermata: *"To serve and never be tired is love."* — una sola per pagina, mai nell'hero

### Copy approvato per sezioni chiave

**HERO**
- DE tagline: *Vegetarisch. Vegan. Versteckt im Herzen Wiens.*
- EN tagline: *Vegetarian. Vegan. Hidden in the heart of Vienna.*
- DE CTA: *Was gibt's heute?*
- EN CTA: *What's on today?*
- DE link: *Wie du uns findest →*
- EN link: *How to find us →*

**MENÙ OGGI**
- DE eyebrow: *HEUTE* · heading: *Was heute auf den Tisch kommt.*
- EN eyebrow: *TODAY* · heading: *What's on the table today.*

**IL POSTO (3 step)**
- Step 01 DE: *Geh durch den Bogen* — "Mariahilferstraße 45 — der Durchgang ist absichtlich versteckt."
- Step 02 DE: *Durch den Innenhof* — "Im Raimundhof — ein stiller Wiener Hof."
- Step 03 DE: *Setz dich. Bleib.* — "Keine Eile. Dieser Ort ist gemacht zum Verweilen."

**FORM PRENOTAZIONE**
- Label: *Tisch anfragen* (mai "Reservieren")
- CTA: *Anfrage senden* (mai "Reservieren" o "Buchen")
- Nota: *Keine Buchungsgarantie — wir melden uns bei dir.*
- Telefono visibile sempre: +43 1 586 28 39

**FORM TORTE**
- Subline DE: *Zahlung an der Kasse bei Abholung.*
- Lead time standard: *Mindestens 24h im Voraus.*
- CTA: *Bestellung senden*

---

## Debito tecnico noto

La vecchia lista bug (hex hardcoded in `MenuSection.tsx`, font Playfair/Dancing Script in `About.tsx`) non trova più riscontro nel codice: verificato il 19 agosto 2026.

Il debito residuo e i token semantici mancanti sono documentati nella sezione **"Gap noti"** di `DESIGN_SYSTEM.md`.


---

## File chiave nel repo

```
src/components/MenuSection.tsx   — dietary badges, dish cards, tab menu
src/components/Hero.tsx          — open/closed badge, hero, rating
src/components/About.tsx         — typography bug, font non dichiarati
src/components/Reviews.tsx       — star rating
src/components/Footer.tsx        — mobile padding, orari
src/components/Navigation.tsx    — top bar + bottom nav
tailwind.config.ts               — definizione token (fonte della verità)
src/index.css                    — CSS custom properties / variabili
```

---

## Supabase — schema esistente (non modificare senza istruzione)

- Tabella `daily_menu`: aggiornata ogni mattina dallo staff
- Campi attesi: dish name (EN), category (ZUPPA/VERDE/BLU), price, dietary flags, photo URL
- Errore Supabase → messaggio statico: "Menu not available right now — come visit us"
- Menu non aggiornato → mostrare ultima data disponibile + messaggio

---

## Analytics — GA4 Events da tracciare

```
click_get_directions     — KPI primario
click_call_now           — KPI primario
scroll_depth_homepage    — 25% / 50% / 75% / 100%
click_menu_tab           — Today / This Week / Always Here
click_open_closed_badge  — segnale di intent visita
form_reservation_submit  — Anfrage inviata
cake_call_click          — click telefono da /order
```

---

## Utenti — profili da GA4 (ricerca primaria in CS02)

| Profilo | Chi è | Goal | Time budget |
|---|---|---|---|
| **A — The Seeker** | Prima visita, da Google/passaparola | Decidere se venire oggi | < 90 secondi |
| **B — The Regular** | Torna per il menu del giorno | Cosa c'è oggi in < 20s | < 20 secondi |
| **C — Dietary** | Ricerca opzioni vegane/GF/bio | Validare che il posto vada bene | 1–3 minuti |
| **D — Curious** | Incuriosito dalla filosofia | Capire chi sono | 1–3 minuti |

---

## Cosa NON toccare senza istruzione esplicita da Francesco

- **Schema Supabase** — nessuna modifica al DB
- **Struttura route** — nessuna nuova route
- **Copy / testo UI** — nessuna modifica al wording approvato
- **Logica di business** — Supabase queries, form submission, routing
- **tailwind.config.ts** — modifiche solo su istruzione, con mapping documentato
- **Route `/about`** — solo placeholder, in attesa di brief contenuti
- **Foto** — placeholder fino al photoshoot (aprile–maggio 2026)
- **CS02 scope** — WhatsApp channel, `/eventi` route: fuori scope CS01

---

## Do's and Don'ts — sintesi rapida

### Do ✅
- Usa token semantici nei className — sempre
- Abbraccia il whitespace — `gap-16`, `py-20` e oltre
- No-Line Rule: usa il cambio di superficie (cream → white) per separare sezioni, non i bordi
- Testo body sempre left-aligned — center solo per header poetici brevi
- Ogni immagine informativa ha un `alt` descrittivo

### Don't ❌
- Mai `#000000` — sempre `#1a1a1a` (`text-text-primary`)
- Mai border-radius < 8px su elementi interattivi
- Mai center-align su testo body lungo
- Mai più di un'animazione contemporaneamente
- Mai `green/300` (`#8fb86a`) come testo su sfondo chiaro — fallisce WCAG AA
- Mai Caveat più di una volta per viewport
- Mai dichiarare la spiritualità — si sente, non si spiega; max un riferimento per pagina
- Mai urgency language — niente "Jetzt!", "Sofort!", "Letzte Chance"

---

## Come lavorare con me (Francesco)

- **Prima di ogni task di alto costo token:** proponi alternative più leggere ordinate per costo
- **Una modifica per sessione se possibile** — meglio chirurgico che globale
- **Non cambiare copy** senza che io l'abbia approvato in chat
- **Non fare push su `main`** senza che io lo confermi
- **Documenta** ogni decisione non ovvia con un commento nel codice

---

*Questo file è generato e mantenuto da Francesco. Aggiornalo dopo ogni sessione significativa.*
