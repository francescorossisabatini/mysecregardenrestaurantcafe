# Piano — Direzione A "Herbarium editorial"

Manteniamo l'identità botanica My Secret Garden (navy/verde/cream, Caveat/Cormorant/Lora, foto reali, no zoom/parallax, fade-in lenti). Introduciamo un **signature editoriale**: eyebrow numerati + rule language sottile + scala tipografica più decisa. Solo presentazione, nessuna logica.

## Signature moves (i 3 pilastri della direzione A)

1. **Eyebrow numerati** in ogni sezione home
   `01 · Heute` · `02 · Der Ort` · `03 · Stimmen` · `04 · Besuch`
   Stile: `font-work` uppercase, tracking-wider, text-verde-300, con un rule 24px verde a sinistra del numero.

2. **Rule language** sottile
   Linee 1px `border-verde-300/40` come divisori orizzontali corti (max 64px), usate solo per: apertura sezione (sotto l'eyebrow) e chiusura CTA. Sostituiscono il `SectionDivider` gradient generico.

3. **Scala tipografica editoriale**
   - H2 Cormorant: **36px mobile / 48px tablet / 56px desktop** (oggi 24px piatto)
   - Subheading (attuale H2): diventa `text-section` con font-lora italic per contrast di voce
   - H1 hero invariato (Caveat) ma con leading più stretto

## Ristrutturazione Hero (mobile + desktop)

**Prima:** H1 → subtitle chip → rating chip → open chip → 2 CTA full width impilati → scroll indicator.
**Dopo:**
- **Eyebrow trust sopra H1**: rating (5★ · 936 Bewertungen) + open/closed uniti in un'unica strip discreta, senza chip pesanti.
- **H1** Caveat invariato.
- **Subtitle** senza chip di sfondo, solo text-shadow morbido.
- **1 CTA primaria** "Was gibt's heute?" + **link testuale sottile** "Wie du uns findest →" (non più bottone outline pesante).
- **Scrim**: da `bg-foreground/25` piatto → gradient verticale `from-transparent via-foreground/10 to-foreground/50` per dare profondità e leggibilità in basso senza spegnere la foto.
- **MobileStickyBar**: delay show fino a `scrollY > 80vh` per evitare tripla CTA nel primo viewport.

## Ritmo delle superfici (No-Line Rule vero)

Sostituzione dei `SectionDivider` gradient con vera alternanza:

```
Hero          → foto
ValueProp     → bg-cream-50 (elevated, +shadow-soft su cards)
Showcase 1    → bg-cream-100 (page)
Showcase 2    → bg-cream-100 (page, inversione layout)
Voci          → bg-verde-100/25 (tint botanico)
HomeMenuPrev  → bg-cream-50 (elevated)
Reviews       → bg-cream-100
CTAEnd        → bg-gradient-hero (navy, invariato)
```

Padding sezione portato a `py-20 md:py-28` per respirazione editoriale.

## File toccati (solo presentazione)

| File | Modifica |
|---|---|
| `src/components/Hero.tsx` | Ristrutturazione gerarchia (eyebrow trust, 1 CTA + link), scrim gradient |
| `src/index.css` | Aggiunta utility `.eyebrow-numbered`, `.rule-short`, scrim gradient var, mini scala H2 |
| `src/components/SectionDivider.tsx` | Refactor: rimuove gradient, applica solo padding + optional rule short |
| `src/components/ValueProposition.tsx` | Eyebrow `01`, H2 grande, surface cream-50, card shadow-soft |
| `src/components/ShowcaseSections.tsx` | Eyebrow `02`, H2 grande, respirazione |
| `src/components/HomeMenuPreview.tsx` | Eyebrow `03 · Heute`, surface cream-50 |
| `src/components/Voci.tsx` | Eyebrow `04 · Stimmen`, tint verde-100/25 |
| `src/components/Reviews.tsx` | Eyebrow numerato, H2 grande |
| `src/components/CTAEndBlock.tsx` | Rule language + eyebrow su navy |
| `src/components/DailyMenuCard.tsx` | Radius 12→16, shadow-card, rule interno verde |
| `src/components/MobileStickyBar.tsx` | Delay show `scrollY > 0.8 * innerHeight` |
| `src/components/Navigation.tsx` | Micro-polish contrast + focus (opzionale, chirurgico) |

Nessuna modifica a: routing, copy DE/EN, form, Supabase, GA4, `tailwind.config.ts` (le utility nuove vivono in `index.css`), foto, componenti Menu/Weekly/Contact/Impressum/Privacy/Staff.

## Guardrail
- No em dash in nessuna copy nuova o modificata.
- No zoom/parallax/bounce; solo fade-in slow.
- `prefers-reduced-motion` rispettato.
- WCAG AA: nessun uso di verde-300 come testo su cream; contrast controllato su eyebrow verde-300 su cream-50 (passa 4.5:1).
- Nessuna nuova immagine.
- Nessun cambio copy — solo eyebrow numerati (label neutri "01 · Heute" ecc.) da confermare in DE/EN.

## QA
Verifica visiva a 375 / 768 / 1280 px su: Home (tutte le sezioni), Hero open + closed state.

## Da confermare prima del build
1. **Etichette eyebrow** vanno bene così?
   `01 · Heute` · `02 · Der Ort` · `03 · Heute auf dem Tisch` · `04 · Stimmen` · `05 · Besuch`
   (EN: `01 · Today` · `02 · The place` · `03 · On the table today` · `04 · Voices` · `05 · Visit`)
2. Ok rimuovere il bottone outline secondario nell'hero e sostituirlo con link testuale "Wie du uns findest →"?

Rispondi **ok** (o correggi i due punti sopra) e passiamo in build.
