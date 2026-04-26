Implementerei il design system come un raffinamento coerente, non come redesign completo. L’obiettivo è far emergere le nuove linee guida — crema, navy, verde, pill buttons, card più morbide, spaziature più disciplinate — mantenendo struttura, contenuti e identità attuali del sito.

## Piano di integrazione

1. Fondamenta visive globali
   - Allineare i token CSS esistenti ai colori del design system:
     - page cream più caldo: `#F5F0E8`
     - card cream chiaro: `#FDFAF5`
     - primary navy: `#264195`
     - foreground navy profondo: `#111E45`
     - accent verde: `#5A7A2E`
   - Mantenere i nomi Tailwind già usati (`primary`, `accent`, `background`, `card`, ecc.) per evitare modifiche invasive.
   - Raffinare border, shadow e radius per ottenere card più eleganti e meno “default shadcn”.

2. Bottoni e CTA
   - Aggiornare `Button` per seguire il design system:
     - forma pill/rounded-full per CTA principali
     - primary verde per le azioni principali
     - secondary/navy per azioni secondarie
     - outline più morbido, con bordo navy/cream e hover leggero
   - Applicare questa logica senza cambiare i testi o la gerarchia delle CTA già presenti.

3. Top bar e navigazione
   - Usare la guida del design system per una top bar più ordinata:
     - background cream semi-trasparente
     - border bottom più visibile ma delicato
     - controlli mobile con proporzioni coerenti
     - language switcher pill, navy attivo, cream passivo
   - Non reintrodurre “My Secret Garden” nella top bar mobile, rispettando la richiesta precedente.
   - Non reintrodurre CTA nella navbar/drawer.

4. Menu e card
   - Portare le card del menu verso lo stile del design system:
     - card cream chiaro
     - bordo cream più caldo
     - radius 16px
     - badge/tag pill più coerenti
     - prezzi in verde accent
   - Mantenere l’architettura menu unica già impostata: Heute/Immer da/Woche.

5. Mobile sticky bar
   - Allinearla ai componenti del design system:
     - barra navy/cream più premium
     - bottoni pill con primary verde e secondary navy
     - spacing più chiaro
   - Mantenerla mobile-only e senza interferire con cookie banner/menu aperto.

6. Micro-coerenza tipografica e spacing
   - Conservare i font già corretti per il brand: Caveat, Cormorant Garamond, Lora, Work Sans.
   - Uniformare alcuni pattern:
     - eyebrow in Work Sans uppercase
     - heading Cormorant/Caveat dove già previsto
     - body Lora
     - UI Work Sans
   - Applicare piccoli aggiustamenti solo dove aumentano coerenza e leggibilità.

## Cosa non farò

- Non stravolgerò layout, sezioni o contenuti.
- Non cambierò immagini o introdurrò immagini generate.
- Non reintrodurrò parallax/zoom o animazioni aggressive.
- Non aggiungerò CTA alla navbar.
- Non trasformerò il sito in una copia del file HTML: userò il design system come fondazione visiva, non come template rigido.

## File principali coinvolti

- `src/index.css` — token globali, colori, shadow, radius, utilities leggere.
- `tailwind.config.ts` — eventuali token aggiuntivi se necessari.
- `src/components/ui/button.tsx` — stile base dei bottoni.
- `src/components/ui/card.tsx` — card più coerenti con il design system.
- `src/components/Navigation.tsx` — top bar/nav refinement.
- `src/components/LanguageSwitcher.tsx` — pill segmented control più fedele al design system.
- `src/components/MenuSection.tsx` — menu cards, badge, tabs mobile.
- `src/components/MobileStickyBar.tsx` — CTA mobile più coerenti.

## Verifica

Dopo l’implementazione eseguirò:
- controllo TypeScript con `bunx tsc --noEmit`
- controllo visivo mirato su mobile e desktop, soprattutto top bar, menu e CTA
- verifica che le richieste precedenti restino rispettate: niente CTA in navbar, niente brand text nella top bar mobile, menu/specials unificati.