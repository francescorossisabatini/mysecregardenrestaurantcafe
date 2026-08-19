# Piano — Design System Documentation per My Secret Garden

## Blocco immediato: build rotto da recharts 3.x
Dopo l'aggiornamento di `recharts` a `3.10.1`, `src/components/ui/chart.tsx` ha errori TypeScript sulle proprietà `payload` e `label` del tooltip. Questo blocca qualsiasi verifica futura. La prima azione del piano è correggere i tipi in `chart.tsx` compatibilmente con l'API di recharts 3, oppure isolare/aggiornare il componente shadcn originale. La build (`bun run build`) deve tornare verde prima di procedere con la documentazione.

## Obiettivo
Costruire una documentazione centralizzata e aggiornata del design system nel progetto, che funga da fonte di verità per te (designer) e per gli sviluppatori futuri, e allinei codice e Figma.

## Nota su Lovable
Non ho conferma di una nuova feature nativa di Lovable dedicata esclusivamente a un "design system builder". Il modo più sicuro e mantenibile per gestirlo in questo progetto è documentare e consolidare i token già esistenti in `src/index.css` e `tailwind.config.ts`, con un eventuale preview visivo nel sito.

## Stato attuale (verificato)
- I token primitivi e semantici esistono in `src/index.css` (HSL + custom properties).
- `tailwind.config.ts` espone font, colori, ombre, animazioni e utilities.
- C'è già un `_archived/design-tokens-map.md` datato 2026-05-04 con discrepanze note tra Figma e codice.
- `CLAUDE.md` contiene regole e bug prioritari, ma non è una vera documentazione di design system.
- I token `daily`, `dailyAlt`, `klassiker`, `badgeWood`, `shadow-soft`, `shadow-elevated`, `shadow-card` e i `--sidebar-*` sono dichiarati ma probabilmente non usati (da verificare).

## Cosa propongo di fare

1. **Audit token e componenti**
   - Verificare quali variabili CSS e classi Tailwind sono realmente usate nel codice.
   - Mappare i componenti core (Button, Badge, Card, Menu card, Nav, Hero, Footer) e le loro regole di applicazione.

2. **Creare `DESIGN_SYSTEM.md` alla root**
   - Fonte di verità testuale aggiornata per il design system del progetto.
   - Sezioni: principi del brand, palette primitiva, palette semantica, tipografia, spaziatura, radius, shadow, motion, componenti, accessibilità, regole di denominazione.
   - Sostituisce/aggiorna `_archived/design-tokens-map.md` in modo che non rimanga un file "archiviato" come riferimento attivo.

3. **Aggiornare `CLAUDE.md` (sezione Token System)**
   - Riferire esplicitamente a `DESIGN_SYSTEM.md` come fonte di verità aggiornata.
   - Mantenere le regole "non negoziabili" (es. nessun hex hardcoded, max 2 typeface).

4. **Pulizia cauta dei token morti**
   - Dopo l'audit, rimuovere le variabili CSS e le classi Tailwind dichiarate ma non usate.
   - Eseguire sempre `bun run build` dopo ogni rimozione per verificare che nulla si rompa.

5. **(Opzionale) Pagina preview `/design-system`**
   - Sezione nascosta (non linkata in nav) che mostra colori, tipografia, spaziatura, bottoni e badge.
   - Utile per testare rapidamente i cambiamenti e per il portfolio.
   - Richiede approvazione separata perché aggiunge un route.

## Cosa NON faremo
- Non modificheremo la struttura dei route esistenti senza approvazione.
- Non cambieremo i colori o i font del brand: il design system è già definito.
- Non introdurremo nuove dipendenze.

## Deliverables
- `DESIGN_SYSTEM.md` (root)
- `_archived/design-tokens-map.md` deprecato o aggiornato con riferimento al nuovo file
- `CLAUDE.md` con riferimento aggiornato
- Eventuale pulizia token morti
- Build verificata (`bun run build`)

## Durata stimata
1 sessione per la documentazione + audit. 1 sessione aggiuntiva se si decide di fare la pagina preview.

## Prossimo passo
Approvare questo piano per iniziare con l'audit e la stesura di `DESIGN_SYSTEM.md`.
