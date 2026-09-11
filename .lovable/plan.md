# Migrazione a Tailwind 4 sul branch collegato

## Prima cosa: il vincolo branch

Non posso lavorare su `ds/tailwind-4`. In questo ambiente vedo solo il branch collegato al progetto (`main`) e le operazioni git (checkout, commit, push) sono gestite dalla piattaforma, non da me: non posso creare un commit mirato su un branch diverso.

Quello che posso fare: eseguire qui l'intera migrazione, con lockfile rigenerato e build verificata. Tu poi allinei o chiudi `ds/tailwind-4`. Le modifiche restano revertibili dalla cronologia chat.

## Cosa cambio

**1. package.json** - allineato al tuo branch:
- aggiunte `@tailwindcss/vite@^4.3.3`, `tw-animate-css@^1.4.0`
- `tailwindcss` da `^3.4.17` a `^4.3.3`
- rimosse le dipendenze non piu usate

Eccezione: `embla-carousel-react` e `embla-carousel-autoplay` restano. Sono usate da `src/components/HeroCarousel.tsx`, codice vivo dell'app: rimuoverle rompe la build. Se vuoi eliminarle davvero, va prima rifatto il carosello della hero - lo tratto come task separato.

**2. Componenti UI orfani** - le altre 30 librerie sono referenziate solo dai wrapper in `src/components/ui/` che nessuna pagina importa (accordion, alert-dialog, avatar, checkbox, command, dropdown-menu, menubar, navigation-menu, popover, progress, radio-group, scroll-area, slider, tabs, toggle-group, input-otp, calendar, form, resizable, chart, drawer, aspect-ratio, context-menu, hover-card). Vengono eliminati insieme ai pacchetti.

**3. Configurazione Tailwind** - Tailwind 4 non usa PostCSS ne `tailwind.config.ts`:
- `vite.config.ts`: aggiunto il plugin `@tailwindcss/vite`; rimosso anche `@vitejs/plugin-legacy` (era nella tua lista di rimozioni) e con esso il target legacy Safari 12
- `postcss.config.js` eliminato
- `tailwind.config.ts` eliminato, con tutto il suo contenuto (font, fontSize, colori semantici, keyframes, animazioni, ombre, radius, durate) tradotto in un blocco `@theme` dentro `src/index.css`
- `src/index.css`: le tre direttive `@tailwind` diventano `@import "tailwindcss"` piu `@import "tw-animate-css"`

**4. Lockfile** - `bun.lock` rigenerato da zero contro il nuovo `package.json` (rimozione del vecchio lock prima dell'install, cosi non resta pinnato tailwind 3.4.17). Elimino anche `bun.lockb` e `package-lock.json`, ormai residui che creano solo ambiguita.

## Verifica prima di consegnare

- build di produzione completa senza errori
- controllo visivo di home, `/menu`, `/visit`, `/about` per confermare che colori, font, spaziature e animazioni siano identici a prima
- nessun riferimento residuo a `tailwind.config` o `postcss.config` nel repo

## Rischio principale

La traduzione dei token da `tailwind.config.ts` a `@theme` e il punto delicato: Tailwind 4 cambia il modo in cui i colori arbitrari e le variabili CSS vengono risolti. Se qualche classe personalizzata non risolve piu, si vede subito nel controllo visivo e la correggo nella stessa sessione.
