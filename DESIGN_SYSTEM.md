# Design System — My Secret Garden

> **Fonte di verità unica per token, tipografia, componenti, motion e accessibilità.**
> Arbitro finale: il codice (`src/index.css` + `tailwind.config.ts`).
> Combina: `_archived/design-tokens-map.md` (mapping Figma), `CLAUDE.md` (principi e copy), codice reale.
> Verificato contro il codice: 19 agosto 2026
> Figma file: `ROhPox2dPuVizyYXiLAbKN` — "My Secret Garden — UX Case Study"

---

## 1. Principi

> **"Il sito accoglie — non cattura."**

| Principio | In pratica |
|---|---|
| Nessuna cattura | Niente popup, niente banner invasivi, niente form di acquisizione email |
| Una CTA per view | Mai due azioni primarie in competizione nello stesso viewport |
| Nessuna urgenza | Mai "Jetzt!", "Sofort!", "Letzte Chance", "Letzte Plätze" |
| Anfrage, non Reservierung | La prenotazione è una richiesta, non un impegno vincolante |
| Telefono primario | Il telefono è sempre il canale suggerito; il form è l'alternativa |
| Spiritualità implicita | Sri Chinmoy si sente, non si spiega. Max un riferimento per pagina |
| Whitespace | `gap-16`, `py-20` e oltre. Il respiro è parte del brand |
| No-Line Rule | Le sezioni si separano con il cambio di superficie (cream → white), non con i bordi |

**Dosaggio colore:** 60% cream · 30% navy · 10% verde (solo CTA, nav attivo, rating, piccoli accenti).

---

## 2. Token colore primitivi

Definiti in `src/index.css` come coppie HSL senza `hsl()`, consumati con `hsl(var(--token))`.

### Navy

| Figma | CSS variable | HSL | Hex | Uso |
|---|---|---|---|---|
| `color/navy/300` | `--navy-100` | `224 42% 63%` | `#7A90C8` | Accenti chiari, dark mode |
| `color/navy/500` | `--navy-200` | `218 39% 47%` | `#4A6EA8` | Link su superfici medie, badge BLU |
| `color/navy/900` | `--navy-300` | `227 59% 37%` | `#264195` | Brand strutturale: hero, footer, call pill, focus ring |
| `color/navy/700` | `--navy-400` | `226 61% 26%` | `#1A2E6B` | Hover navy |
| `color/dark/base` | `--navy-500` | `225 60% 17%` | `#111E45` | Testo primario, gradient hero start |

> La numerazione Figma (900 = scuro) e quella del codice (500 = scuro) sono **volutamente diverse**. Il mapping qui sopra è la conversione corretta: non è un bug.

### Verde

| Figma | CSS variable | HSL | Hex | Uso |
|---|---|---|---|---|
| `color/green/200` | `--verde-100` | `77 25% 70%` | `#B8C4A0` | Superficie badge vegan, accento tenue |
| `color/green/300` | `--verde-200` | `91 26% 50%` | `#7FA060` | Accenti chiari — **mai come testo su sfondo chiaro** |
| `color/green/500` | `--verde-300` | `84 45% 33%` | `#5A7A2E` | Brand accent: CTA primaria, bordo bottom nav |
| `color/green/700` | `--verde-400` | `86 44% 22%` | `#3B5220` | Hover CTA verde, testo verde su chiaro |
| `color/green/900` | `--verde-500` | `86 44% 15%` | `#273816` | Verde più scuro, testo alto contrasto |

### Cream

| Figma | CSS variable | HSL | Hex | Uso |
|---|---|---|---|---|
| `color/cream/100` | `--cream-50` | `40 67% 98%` | `#FDFAF5` | Card surface, superficie elevata |
| `color/cream/200` | `--cream-100` | `36 39% 94%` | `#F5F0E8` | Page canvas |
| `color/cream/300` | `--cream-200` | `38 33% 89%` | `#EDE6D8` | Superficie alternata |
| — | `--cream-300` | `38 29% 84%` | `#E2D9C8` | Bordi tenui su cream |

### Amber e neutri

| Figma | CSS variable | HSL | Hex | Uso |
|---|---|---|---|---|
| — | `--amber-100` | `41 82% 78%` | `#F5D89A` | Superficie badge zuppa |
| `color/feedback/amber` | `--amber-200` | `39 81% 52%` | `#E8A020` | Warning, badge ZUPPA, stelle rating |
| `color/neutral/600` | `--muted-100` | `248 23% 92%` | `#E8E6F0` | Superficie muted |
| `color/neutral/900` | `--muted-200` | `240 20% 82%` | `#C8C8D8` | Bordo muted, bottone disabled |

### Feedback e dietary

| Figma | CSS variable | HSL |
|---|---|---|
| `color/feedback/green` | `--semantic-success` | `142 72% 29%` |
| `color/feedback/amber` | `--semantic-warning` | `var(--amber-200)` |
| `color/feedback/red` | `--destructive` | `0 84% 45%` |
| `color/dietary/veganGreen` | `--color-vegan` | `hsl(142 70% 24%)` |
| `color/dietary/glutenBrown` | `--color-gluten-free` | `hsl(32 84% 31%)` |
| `color/dietary/bioTeal` | `--color-bio` | `hsl(160 84% 22%)` |

---

## 3. Token colore semantici

**Regola:** nei componenti si usano questi, mai i primitivi e mai hex hardcoded.

### Superfici

| Ruolo | Token / classe | Punta a | Stato |
|---|---|---|---|
| Page canvas | `bg-background` | `--cream-100` | attivo |
| Card | `bg-card` / `.surface-card` | `39 58% 97%` | attivo |
| Elevata / popover | `bg-popover` | `--cream-50` | attivo |
| Nav scrollata | `.bg-nav-surface` | `hsl(var(--card) / 0.96)` + blur | attivo |
| Cream brand | `bg-cream` | `--cream-100` | attivo |
| Dark | `--navy-500` | `225 60% 17%` | attivo |
| Hero | immagine + scrim uniforme | — | non tokenizzato (per scelta) |
| Overlay | — | — | **gap** |

### Testo

| Ruolo | Token / classe | Punta a |
|---|---|---|
| Primario | `text-foreground` | `--navy-500` |
| Secondario / muted | `text-muted-foreground` | `225 60% 23%` |
| Inverso su scuro | `text-primary-foreground` | `0 0% 100%` |
| Link | `text-blue` | `--navy-200` |
| Prezzo | `text-foreground` (bold) | nessun token dedicato — **gap** |

### Azioni

| Ruolo | CSS variable | Punta a |
|---|---|---|
| CTA primaria | `--btn-primary-bg` | `--verde-300` |
| CTA primaria hover | `--btn-primary-hover` | `--verde-400` |
| Secondaria | `--btn-secondary-bg` | `--navy-300` |
| Secondaria hover | `--btn-secondary-hover` | `--navy-400` |
| Disabled | `--btn-disabled-bg` | `--muted-200` |
| Ghost | `transparent` + `border-border` | — |
| Call pill | `--navy-300` (sempre navy) | — |

### Bordi e focus

| Ruolo | Token | Valore |
|---|---|---|
| Default | `border-border` | `38 25% 70%` |
| Input | `border-input` | `38 25% 70%` |
| Focus ring | `--focus-ring` (fallback `--ring`) | `--navy-300`, outline 2px |

### Badge menu e dietary

| Ruolo | CSS variable | Punta a |
|---|---|---|
| Badge ZUPPA | `--badge-zuppa-bg` | `--amber-200` |
| Badge VERDE | `--badge-verde-bg` | `--verde-300` |
| Badge BLU | `--badge-blu-bg` | `--navy-200` |
| Vegan testo | `text-dietary-vegan` | `--color-vegan` |
| Vegan superficie | `--tag-vegan-bg` | `--verde-100` |
| Gluten free testo | `text-dietary-glutenFree` | `--color-gluten-free` |
| Bio testo | `text-dietary-bio` | `--color-bio` |
| Superfici GF e bio | — | **gap**: usare il colore al 15% opacity nel componente |

### Gradienti e ombre

| Token | Valore |
|---|---|
| `bg-gradient-hero` | `--navy-500` → `--navy-300` |
| `bg-gradient-green` | `--verde-300` → `--verde-200` |
| `bg-gradient-subtle` | superficie tenue |
| `shadow-soft` | `0 6px 22px -14px hsl(navy-500 / 0.26)` |
| `shadow-card` | `0 8px 24px -18px hsl(navy-500 / 0.30)` |
| `shadow-elevated` | `0 16px 44px -22px hsl(navy-500 / 0.38)` |

---

## 4. Tipografia

| Ruolo | Classe Tailwind | Font | Uso |
|---|---|---|---|
| Display | `font-caveat` | Caveat | Solo `<h1>` hero e logo nav |
| Heading | `font-cormorant` | Cormorant Garamond | `<h2>`–`<h6>`, titoli sezione |
| Body | `font-lora` | Lora | Paragrafi, recensioni, narrativa |
| UI | `font-work` | Work Sans | Nav, bottoni, badge, prezzi, label |

> La classe UI è **`font-work`**, non `font-work-sans`. Quest'ultima non esiste in `tailwind.config.ts`.

**Regole ferree**
- Max 2 typeface per viewport
- Caveat max 1 occorrenza per viewport
- Body sempre left-aligned. Center solo per header poetici brevi
- Font **non dichiarati e vietati**: Playfair Display, Dancing Script, Inter, Poppins

**Scale di riferimento**

| Ruolo | Size |
|---|---|
| Hero h1 | `text-4xl` → `text-9xl` responsive |
| Section h2 | `text-4xl` → `text-5xl` |
| Titolo piatto mobile | `text-2xl` |
| Body | `text-base` / `text-lg` |
| UI / label | `text-xs` / `text-sm` |

---

## 5. Spacing e radius

| Nome | Tailwind | px |
|---|---|---|
| xs | `1`–`2` | 4–8 |
| sm | `3`–`4` | 12–16 |
| md | `6`–`8` | 24–32 |
| lg | `12` | 48 |
| xl | `16`–`20` | 64–80 |
| 2xl | `24` | 96 |
| 3xl | `32` | 128 |

**Radius:** `--radius` = `1rem` (default, sm/md/lg allineati), `xl` = `1.25rem`, `rounded-full` per pill.
Mai radius < 8px su elementi interattivi.

---

## 6. Componenti

### Bottoni

```
Primary:   bg [--btn-primary-bg] · text bianco · rounded-lg · px-6 py-3 · font-work font-semibold
Secondary: bg [--btn-secondary-bg] · text bianco · rounded-lg · px-6 py-3
Ghost:     transparent · border-border · text-foreground · rounded-lg · px-6 py-3
Call pill: bg navy-300 · text bianco · rounded-[13px] · w-[80px] h-[48px]
```

Stati: hover → tono più scuro · active → `scale(0.98)` · disabled → 40% opacity · loading → spinner bianco.

**Copy rule:** il label nomina il **risultato**, non l'azione.
✅ "Was gibt's heute?" · "Den Weg finden" · "Anfrage senden"
❌ "Klick hier" · "Mehr erfahren" · "Absenden"

### Dietary badge

```
Pill (rounded-full) · py-0.5 px-2 · font-work text-sm lowercase (mai VEGAN)
Background: colore dietary al 15% opacity · Text: colore dietary pieno
aria-label obbligatorio: "vegan" | "gluten-free" | "bio"
```

### Open / Closed badge

```
Background solido: success (aperto) | destructive (chiuso)
Text: bianco · font-work font-bold text-[11px] · dot w-1.5 h-1.5 rounded-full
Shape pill · aria-live="polite"
```

### Menu card

```
.surface-card · rounded-lg · border-border · p-4 · shadow-card
Type badge: font-work font-bold text-[9px] uppercase tracking-wider
  ZUPPA → --badge-zuppa-bg · VERDE → --badge-verde-bg · BLU → --badge-blu-bg
Nome piatto: font-work font-medium · mobile text-2xl
Prezzo: font-work font-bold · aria-label completo "€ 8,50"
```

### Top bar

```
h-[60px] · px-5
Su hero (scrollY = 0): transparent, logo e testo bianchi
Scrollata (scrollY > 150px): .bg-nav-surface + backdrop-blur + border-b tenue
Transizione 250ms ease, solo background
```

### Bottom nav mobile

```
h-[72px] · pt-2 px-4 pb-[16px] + env(safe-area-inset-bottom)
bg cream-100 + backdrop-blur · border-top 1.5px verde-300
3 voci (Home · Menü · Visit) + call pill
Inattivo: text-muted-foreground · font-work text-[10px] · icona 20px
Attivo: verde-400 · font-work font-semibold + indicatore linea 1.5px verde 24px in cima
```

### Eyebrow numerato

Classe `.eyebrow-num` (in `src/index.css`), variante `.on-dark`. Usa verde-400 per garantire il contrasto.

---

## 7. Motion

| Durata | Variable | Valore |
|---|---|---|
| instant | `--motion-duration-instant` | 100ms |
| fast | `--motion-duration-fast` | 150ms |
| base | `--motion-duration-base` | 250ms |
| slow | `--motion-duration-slow` | 400ms |
| narrative | `--motion-duration-narrative` | 900ms |

**Vincoli non negoziabili**
- Solo fade lente e slide sottili (`translateY(8px) → 0`)
- **Mai zoom. Mai parallax.** Nessuna animazione infinita o marquee
- Nessuna animazione su testo: solo container e immagini
- Mai più di un'animazione contemporaneamente
- `prefers-reduced-motion` sempre rispettato

---

## 8. Accessibilità — WCAG 2.1 AA (EN 301 549)

- Contrasto minimo 4.5:1 testo normale, 3:1 testo grande
- Touch target minimo **44×44px** su ogni elemento interattivo mobile
- Focus ring visibile ovunque: `outline: 2px solid hsl(var(--focus-ring))`
- `aria-label` obbligatorio su ogni icona senza label visibile
- Prezzi con `aria-label` completo, non solo il numero
- Route transition: il focus si sposta in cima al nuovo contenuto
- `lang="de"` / `lang="en"` sincronizzato con la lingua attiva
- Skip link e landmark `<main>` presenti
- Mai `#000000`: il nero è `--navy-500`
- Mai `--verde-200` come testo su sfondo chiaro

---

## 9. Gap noti

Token semantici oggi assenti nel codice. Non inventarli nei componenti: se servono, vanno prima aggiunti a `src/index.css`.

| Gap | Nome proposto | Note |
|---|---|---|
| Superficie overlay | `--surface-overlay` | Per modali e scrim |
| Badge aperto / chiuso | `--feedback-open` / `--feedback-closed` | Oggi derivati da success/destructive inline |
| Superficie gluten free | `--tag-gluten-free-bg` | Oggi 15% opacity inline |
| Superficie bio | `--tag-bio-bg` | Oggi 15% opacity inline |
| Colore prezzo | `--text-price` | Oggi usa `--foreground` |
| Superficie hero | `--surface-hero` | Oggi immagine + scrim inline |
| Buffer bottom nav | `spacing.mobileNavBuffer` | Oggi `pb-24` hardcoded nel Footer |

Token dichiarati ma poco o mai usati, da valutare in una pulizia futura: `--daily-card`, `--daily-card-alt`, `--klassiker-card`, `--badge-wood`, tutti i `--sidebar-*` (nessun componente sidebar esiste nell'app).

---

## 10. Rapporto con gli altri documenti

| File | Ruolo |
|---|---|
| `DESIGN_SYSTEM.md` | Questo file. Token, tipografia, componenti, motion, a11y |
| `CLAUDE.md` | Contesto progetto, brand, copy approvato, cosa non toccare |
| `_archived/design-tokens-map.md` | Archivio storico del mapping Figma. Non aggiornato |
| `src/index.css` + `tailwind.config.ts` | Codice: arbitro finale in caso di conflitto |
