# Design Tokens Map — My Secret Garden

> ⚠️ **ARCHIVIATO.** Sostituito da [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md) alla root, che è la fonte di verità attuale.
> Questo file resta come traccia storica del mapping Figma → codice.

**Fonte di verità: codice (index.css + tailwind.config.ts)**
**Figma file: "My Secret Garden — UX Case Study"**
**Ultimo aggiornamento: 2026-05-04**


---

## Logica di integrazione

Il codice usa Lovable/shadcn e non può essere rinominato senza rompere la generazione.
Figma si allinea al codice: le variabili Figma documentano il mapping verso i CSS custom properties.

---

## Colori primitivi

| Figma (`primitive`) | CSS variable | Valore HSL | Hex |
|---|---|---|---|
| `color/navy/900` | `--navy-300` | `227 59% 37%` | `#264195` |
| `color/navy/700` | `--navy-400` | `226 61% 26%` | `#1A2E6B` |
| `color/navy/500` | `--navy-200` | `218 39% 47%` | `#4A6EA8` |
| `color/navy/300` | `--navy-100` | `224 42% 63%` | `#7A90C8` |
| `color/green/900` | `--verde-500` | `86 44% 15%` | `#273816` |
| `color/green/700` | `--verde-400` | `86 44% 22%` | `#3B5220` |
| `color/green/500` | `--verde-300` | `84 45% 33%` | `#5A7A2E` |
| `color/green/300` | `--verde-200` | `91 26% 50%` | `#7FA060` |
| `color/green/200` | `--verde-100` | `77 25% 70%` | `#B8C4A0` |
| `color/cream/100` | `--cream-50` | `40 67% 98%` | `#FDFAF5` |
| `color/cream/200` | `--cream-100` | `36 39% 94%` | `#F5F0E8` |
| `color/cream/300` | `--cream-200` | `38 33% 89%` | `#EDE6D8` |
| `color/neutral/900` | `--muted-200` | `240 20% 82%` | `#C8C8D8` |
| `color/neutral/600` | `--muted-100` | `248 23% 92%` | `#E8E6F0` |
| `color/neutral/0` | — | `0 0% 100%` | `#FFFFFF` |
| `color/dark/base` | `--navy-500` | `225 60% 17%` | `#111E45` |
| `color/feedback/green` | `--semantic-success` | `142 72% 29%` | — |
| `color/feedback/amber` | `--semantic-warning` / `--amber-200` | `39 81% 52%` | `#E8A020` |
| `color/feedback/red` | `--destructive` | `0 84% 45%` | — |
| `color/dietary/veganGreen` | `--color-vegan` | `142 70% 24%` | — |
| `color/dietary/glutenBrown` | `--color-gluten-free` | `32 84% 31%` | — |
| `color/dietary/bioTeal` | `--color-bio` | `160 84% 22%` | — |

---

## Colori semantici

| Figma (`semantic`) | CSS variable | Note |
|---|---|---|
| `color/background/page` | `--background` | `var(--cream-100)` |
| `color/background/card` | `--card` | `hsl(39 58% 97%)` |
| `color/background/elevated` | `--popover` | `var(--cream-50)` |
| `color/background/overlay` | — | non definito in codice |
| `color/background/footer` | — | usa `--foreground` su dark bg |
| `color/background/hero` | — | immagine + overlay |
| `color/background/dark` | `--navy-500` | `hsl(225 60% 17%)` |
| `color/text/primary` | `--foreground` | `var(--navy-500)` |
| `color/text/secondary` | `--muted-foreground` | `hsl(225 60% 23%)` |
| `color/text/muted` | `--muted-foreground` | stessa variabile |
| `color/text/inverse` | `--primary-foreground` | `hsl(0 0% 100%)` |
| `color/text/onDark` | `--primary-foreground` | `hsl(0 0% 100%)` |
| `color/text/link` | `--blue` | `var(--navy-200)` |
| `color/text/price` | `--foreground` | nessun token dedicato |
| `color/brand/primary` | `--primary` | `var(--navy-300)` |
| `color/brand/primaryLight` | `--navy-100` | `hsl(224 42% 63%)` |
| `color/brand/accent` | `--accent` | `var(--verde-300)` |
| `color/brand/accentLight` | `--accent-light` | `var(--verde-100)` |
| `color/brand/cream` | `--cream` | `var(--cream-100)` |
| `color/action/primary` | `--btn-primary-bg` → `--accent` | `var(--verde-300)` |
| `color/action/primaryHover` | `--btn-primary-hover` | `var(--verde-400)` |
| `color/action/secondary` | `--btn-secondary-bg` → `--primary` | `var(--navy-300)` |
| `color/action/secondaryHover` | `--btn-secondary-hover` | `var(--navy-400)` |
| `color/action/ghost` | — | `transparent` |
| `color/action/ghostHover` | — | `hsl(var(--muted))` |
| `color/action/call` | — | telefono / CTA call |
| `color/border/default` | `--border` | `hsl(38 25% 70%)` |
| `color/border/input` | `--input` | `hsl(38 25% 70%)` |
| `color/border/focus` | `--ring` / `--focus-ring` | `var(--navy-300)` |
| `color/border/nav` | — | `hsl(var(--card) / 0.96)` via `.bg-nav-surface` |
| `color/feedback/success` | `--semantic-success` | `hsl(142 72% 29%)` |
| `color/feedback/successSurface` | — | non definito |
| `color/feedback/warning` | `--semantic-warning` | `var(--amber-200)` |
| `color/feedback/error` | `--destructive` | `hsl(0 84% 45%)` |
| `color/feedback/errorSurface` | — | non definito |
| `color/feedback/open` | — | usato in Hero chip "Open now" |
| `color/feedback/closed` | — | usato in Hero chip "Closed" |
| `color/dietary/vegan` | `--color-vegan` | `hsl(142 70% 24%)` |
| `color/dietary/veganSurface` | `--tag-vegan-bg` | `var(--verde-100)` |
| `color/dietary/glutenFree` | `--color-gluten-free` | `hsl(32 84% 31%)` |
| `color/dietary/glutenFreeSurface` | — | non definito |
| `color/dietary/bio` | `--color-bio` | `hsl(160 84% 22%)` |
| `color/dietary/bioSurface` | — | non definito |
| `color/gradient/heroStart` | `--navy-500` in `--gradient-hero` | `hsl(225 60% 17%)` |
| `color/gradient/heroEnd` | `--navy-300` in `--gradient-hero` | `hsl(227 59% 37%)` |
| `color/gradient/greenStart` | `--verde-300` in `--gradient-green` | `hsl(84 45% 33%)` |
| `color/gradient/greenEnd` | `--verde-200` in `--gradient-green` | `hsl(91 26% 50%)` |
| `color/dark/background` | dark: `--background` | `hsl(226 35% 12%)` |
| `color/dark/foreground` | dark: `--foreground` | `hsl(45 25% 92%)` |
| `color/dark/primary` | dark: `--primary` | `hsl(226 50% 60%)` |
| `color/dark/accent` | dark: `--accent` | `hsl(92 50% 58%)` |

---

## Tipografia

| Figma (`primitive`) | Tailwind class | CSS / Google Font |
|---|---|---|
| `typography/family/display` | `font-caveat` | Caveat (h1, titoli hero) |
| `typography/family/heading` | `font-cormorant` | Cormorant Garamond (h2–h6) |
| `typography/family/body` | `font-lora` | Lora (body text) |
| `typography/family/ui` | `font-work` | Work Sans (label, badge, nav) |

| Figma (`semantic`) | Tailwind / CSS | Usato per |
|---|---|---|
| `typography/role/hero/family` | `font-caveat` | `<h1>` → nome ristorante |
| `typography/role/hero/size` | `text-4xl → text-9xl` | responsive |
| `typography/role/heading/family` | `font-cormorant` | `<h2>` → titoli sezione |
| `typography/role/heading/size` | `text-4xl → text-5xl` | responsive |
| `typography/role/body/family` | `font-lora` | `<p>` → testo corrente |
| `typography/role/body/size` | `text-base / text-lg` | `1rem / 1.125rem` |
| `typography/role/ui/family` | `font-work` | bottoni, label, badge |
| `typography/role/ui/size` | `text-xs / text-sm` | `0.75rem / 0.875rem` |

---

## Spacing

| Figma | Tailwind | px |
|---|---|---|
| `spacing/1` | `spacing-1` | 4px |
| `spacing/2` | `spacing-2` | 8px |
| `spacing/3` | `spacing-3` | 12px |
| `spacing/4` | `spacing-4` | 16px |
| `spacing/6` | `spacing-6` | 24px |
| `spacing/8` | `spacing-8` | 32px |
| `spacing/12` | `spacing-12` | 48px |
| `spacing/16` | `spacing-16` | 64px |
| `spacing/20` | `spacing-20` | 80px |
| `spacing/24` | `spacing-24` | 96px |
| `spacing/32` | `spacing-32` | 128px |
| `spacing/xs` | `spacing-1` / `spacing-2` | 4–8px |
| `spacing/sm` | `spacing-3` / `spacing-4` | 12–16px |
| `spacing/md` | `spacing-6` / `spacing-8` | 24–32px |
| `spacing/lg` | `spacing-12` | 48px |
| `spacing/xl` | `spacing-16` / `spacing-20` | 64–80px |
| `spacing/2xl` | `spacing-24` | 96px |
| `spacing/3xl` | `spacing-32` | 128px |
| `spacing/4xl` | — | 160px+ |

---

## Border radius

| Figma | CSS | Valore |
|---|---|---|
| `radius/sm` | `--radius` sm | `0.5rem` |
| `radius/md` | `--radius` | `1rem` (default) |
| `radius/lg` | `--radius` lg | `1rem` |
| `radius/xl` | `--radius` xl | `1.25rem` |
| `radius/2xl` | — | `1.5rem` |
| `radius/full` | `rounded-full` | `9999px` |

---

## Shadow & Motion

| Figma (se presente) | CSS variable | Valore |
|---|---|---|
| — | `--shadow-soft` | `0 6px 22px -14px hsl(navy-500 / 0.26)` |
| — | `--shadow-elevated` | `0 16px 44px -22px hsl(navy-500 / 0.38)` |
| — | `--shadow-card` | `0 8px 24px -18px hsl(navy-500 / 0.30)` |
| — | `--motion-duration-instant` | `100ms` |
| — | `--motion-duration-fast` | `150ms` |
| — | `--motion-duration-base` | `250ms` |
| — | `--motion-duration-slow` | `400ms` |
| — | `--motion-duration-narrative` | `900ms` |

---

## Note: discrepanze da verificare

1. **Scale navy invertita** — Figma usa `900=scuro`, codice usa `500=scuro`. I valori hex *sembrano* allineati ma vanno verificati colore per colore.
2. **Token mancanti nel codice** — `color/background/overlay`, `color/feedback/open/closed`, superfici dietary (`.../Surface`) non hanno CSS variable dedicata.
3. **Token mancanti in Figma** — `--daily-card`, `--daily-card-alt`, `--klassiker-card`, `--badge-wood` (colori Soul Carousel) non risultano in Figma.
4. **Gradients** — il codice li definisce come CSS `linear-gradient`, Figma li ha come token separati (`gradient/heroStart` + `gradient/heroEnd`). Sono equivalenti ma non sincronizzati automaticamente.
