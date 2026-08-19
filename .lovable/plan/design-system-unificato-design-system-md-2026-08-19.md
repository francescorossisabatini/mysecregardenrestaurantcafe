# Design System unificato: DESIGN_SYSTEM.md

Obiettivo: una sola fonte di verità che combina il vecchio `_archived/design-tokens-map.md` (accurato sui token), `CLAUDE.md` (accurato su principi e copy) e il codice reale (arbitro finale).

## Cosa ho verificato

**Il vecchio file token è buono.** `_archived/design-tokens-map.md` corrisponde al codice: mappa `color/navy/900` a `--navy-300` (#264195), usa correttamente `font-work` e documenta gli alias semantici (`--btn-primary-bg`, `--tag-vegan-bg`, `--badge-zuppa-bg`). La "scala invertita" che sembrava un errore è in realtà il mapping voluto Figma -> codice, già documentato.

**Le discrepanze stanno in CLAUDE.md.** Prescrive classi Tailwind che non esistono (`bg-background-card`, `text-text-primary`, `bg-action-primary`, `border-border-default`), usa `font-work-sans` invece di `font-work`, elenca route `/order` e `/cakes` che non esistono, e riporta una lista bug non piu riscontrabile nel codice.

**Cosa manca a entrambi.** Il vecchio file segna come "non definito" alcuni token che oggi esistono o servono: `feedback/open`, `feedback/closed`, `dietary/glutenFreeSurface`, `dietary/bioSurface`, `action/call`, `background/hero`, `background/footer`.

## Struttura del nuovo DESIGN_SYSTEM.md

Un file alla root, in italiano, organizzato cosi:

1. **Principi** - da CLAUDE.md: "accoglie non cattura", una CTA primaria per view, no urgency, no popup, dosaggio 60 cream / 30 navy / 10 verde
2. **Token colore primitivi** - tabella dal vecchio file: nome Figma, CSS variable, HSL, hex, uso
3. **Token colore semantici** - tabella dal vecchio file, ripulita: colonna "stato" (attivo / non definito / da creare)
4. **Tipografia** - le 4 famiglie con le classi Tailwind corrette (`font-caveat`, `font-cormorant`, `font-lora`, `font-work`) e le regole d'uso da CLAUDE.md (Caveat max 1 per viewport, max 2 typeface per viewport)
5. **Componenti** - bottoni, dietary badge, open/closed badge, menu card, top bar, bottom nav: specifiche da CLAUDE.md ma riscritte con le classi reali del codice
6. **Motion** - da CLAUDE.md e dalla memoria di progetto: solo fade lente, niente zoom, niente parallax, `prefers-reduced-motion`
7. **Accessibilita** - WCAG 2.1 AA, touch target 44px, focus ring `--ring`, aria-label
8. **Gap noti** - elenco esplicito dei token semantici mancanti, con proposta di nome, cosi il gap e visibile invece di essere una riga "non definito"

## Cosa succede a CLAUDE.md

Resta, ma dimagrisce e smette di contraddire il codice:

- Le sezioni token, tipografia e componenti vengono sostituite da un rimando a `DESIGN_SYSTEM.md`
- La tabella route viene allineata al codice reale (via `/order` e `/cakes`, dentro `/gallery`, `/link`, `/staff`)
- La lista bug obsoleta viene rimossa
- Restano intatti: chi sei, il ristorante, il principio guida, copy approvato, tono di voce, "cosa non toccare", come lavorare con te

## Cosa succede al vecchio file

`_archived/design-tokens-map.md` resta dov'e come archivio storico, con una riga in testa che rimanda a `DESIGN_SYSTEM.md`. Non lo cancello: e la traccia del mapping Figma.

## Note tecniche

File toccati: `DESIGN_SYSTEM.md` (nuovo), `CLAUDE.md` (ridotto e corretto), `_archived/design-tokens-map.md` (una riga di rimando). Nessuna modifica a componenti, `tailwind.config.ts` o `src/index.css`: e documentazione, non refactor. Un eventuale allineamento del codice ai token mancanti sara un intervento separato da concordare.

## Blocco da risolvere prima

Il progetto ha attualmente errori TypeScript in `src/components/ui/chart.tsx` causati dall'aggiornamento di Recharts a 3.x (le prop `payload` e `label` non sono piu esposte dai tipi pubblici di `Tooltip` e `Legend`). Va sistemato in build mode prima o insieme a questo lavoro: sono 3 punti di tipizzazione nello stesso file, nessun cambiamento di comportamento.
