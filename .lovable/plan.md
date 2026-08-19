# CLAUDE.md: cosa contiene, discrepanze reali, come lo uso

## Cosa contiene oggi

`CLAUDE.md` (root, "ultimo aggiornamento maggio 2026") è un documento unico che raccoglie:

1. Chi sei tu (Francesco) e il ruolo sul progetto CS01
2. Descrizione del ristorante (indirizzo, orari, telefono, rating, partner)
3. Principio guida "Il sito accoglie, non cattura" e regole di copy
4. Stack tecnico e vincoli di piattaforma
5. Information Architecture (tabella route)
6. Sistema token: palette primitiva + mappa token semantici
7. Tipografia, componenti (bottoni, badge, nav), animazioni, accessibilità
8. Copy approvato per hero, menu, form
9. Lista di 8 bug prioritari da audit
10. Elenco "cosa non toccare"

## Discrepanze verificate nel codice

Ho confrontato il documento con `tailwind.config.ts`, `src/index.css` e `src/App.tsx`.

**1. Il sistema di token semantici descritto non esiste**
`CLAUDE.md` prescrive classi tipo `bg-background-card`, `text-text-primary`, `bg-action-primary`, `border-border-default`. Nessuna di queste esiste in `tailwind.config.ts`. Il sistema reale è: primitive HSL in `src/index.css` (`--cream-100`, `--navy-300`, `--verde-300`, `--amber-200`) più alias semantici CSS (`--surface-page`, `--btn-primary-bg`, `--badge-zuppa-bg`) e i token shadcn (`background`, `primary`, `accent`, `card`). Seguire alla lettera CLAUDE.md produrrebbe classi Tailwind inesistenti.

**2. Scala colori diversa**
CLAUDE.md usa la nomenclatura 900/700/500/300 (`navy-900 #264195`, `green-900 #3a5018`). Il codice usa 100-500 con valori diversi (`--navy-300` = #264195, `--verde-300` = #5A7A2E, `--verde-400` = #3B5220). I nomi sono quindi invertiti rispetto al documento.

**3. Nome del font utility sbagliato**
CLAUDE.md dice `font-work-sans`. In `tailwind.config.ts` la chiave è `work`, quindi la classe corretta è `font-work`.

**4. Route inesistenti**
CLAUDE.md elenca `/order` (ordini torte) e `/cakes` come "confermate". Non esistono in `App.tsx` e sono fuori scope per tua decisione. Mancano invece nel documento: `/gallery`, `/link`, `/staff`, `/staff/login`, `/reservation-preview`, `/speisekarte`.

**5. About descritta come "solo placeholder"**
Nel codice esistono `src/pages/AboutUs.tsx` più `AboutNarrative.tsx` e `AboutSection.tsx`: la pagina è costruita.

**6. Lista bug obsoleta**
I riferimenti a `Playfair Display` e `Dancing Script` in `About.tsx` e agli hex hardcoded in `MenuSection.tsx` non trovano più riscontro nel codice sorgente (gli hex compaiono solo in `src/tailwind.config.lov.json`, file generato). Anche i numeri di riga citati non corrispondono più.

**7. Elementi mancanti nel documento**
Non sono documentati: Lovable Cloud/backend e le edge functions, il menu da Google Sheets, il sistema chiusure, il consenso GDPR v3, la sezione staff, l'integrazione MCP, il delivery Foodora/Wolt.

## Uso prioritario: risposta onesta

Non lo uso come fonte primaria e non potrei. Quando progetto la mia gerarchia effettiva è:

1. La tua richiesta nel messaggio corrente
2. Le memorie di progetto (`mem://`) - regole vincolanti e aggiornate
3. Il codice reale (`tailwind.config.ts`, `src/index.css`, i componenti) - unica fonte di verità sui token
4. `CLAUDE.md` per intento e principi: tono di voce, "accoglie non cattura", niente urgency, accessibilità, cosa non toccare

Dei principi mi fido. Delle specifiche tecniche no, perché sono divergenti dal codice.

## Proposta di intervento

Riallineare `CLAUDE.md` in un solo passaggio, senza toccare codice:

- Riscrivere la sezione token con i nomi reali (`--cream-*`, `--navy-*`, `--verde-*`, `--amber-*`, alias semantici, token shadcn) e gli esempi di classe corretti
- Correggere `font-work-sans` in `font-work`
- Aggiornare la tabella route allo stato reale, rimuovendo `/order` e `/cakes`
- Sostituire la lista bug obsoleta con una sezione "verificato al <data>"
- Aggiungere le sezioni mancanti: backend, Google Sheets, chiusure, GDPR, staff, MCP, delivery
- Mantenere invariati principi, copy approvato, tono e regole "non toccare"

## Note tecniche

Un solo file modificato: `CLAUDE.md`. Nessun cambiamento a componenti, token o configurazione. `_archived/design-tokens-map.md` resta archiviato e va considerato storico.
