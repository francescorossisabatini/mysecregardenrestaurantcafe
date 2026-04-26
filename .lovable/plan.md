Modificherò la UX mobile in due punti: lingua e hero A/B test.

1. Lingua DE/EN su mobile lungo la pagina
- Rimuovere il selettore lingua dal drawer hamburger su mobile.
- Lasciare il selettore lingua nella navbar solo desktop, come ora.
- Aggiungere un piccolo componente mobile-only lungo la pagina, non nella hero: una barra/strip discreta subito dopo la hero o all’inizio del contenuto, prima delle sezioni principali.
- Stile: leggero, coerente con il sito, testo semplice “DE / EN”, senza farlo sembrare una CTA principale.
- Tracking: mantenere l’evento `language_switch` esistente.

2. Hero mobile A/B test senza carosello
- Su mobile, quando l’A/B test è attivo, mostrare una singola immagine statica in base alla variante assegnata:
  - food: foto cibo
  - dining: foto tavola/contesto conviviale
  - garden: foto giardino
- Eliminare il carosello, i dots e il cambio immagine dalla hero mobile, così l’unico elemento che cambia tra le varianti è il contesto fotografico.
- Mantenere identici copy, CTA, overlay, spaziature e comportamento per tutte le varianti mobile.
- Su desktop mantenere il comportamento attuale con carosello, così non cambiamo l’esperienza desktop.

3. Pulizia UX e performance
- Evitare di caricare `HeroCarousel` su mobile quando non serve.
- Tenere il tracking A/B già creato: impression e click continueranno a includere `hero_variant`.
- Verificare che la hero resti ottimizzata per LCP: immagine statica subito visibile, niente dinamiche inutili su mobile.

File principali coinvolti:
- `src/components/Hero.tsx`
- `src/components/Navigation.tsx`
- `src/components/LanguageSwitcher.tsx`
- probabilmente un nuovo piccolo componente per il selettore lingua mobile lungo pagina, oppure integrazione diretta in `Index.tsx`

Nota: aggiornerò anche la memoria del progetto sulla posizione del language switcher, perché la nuova preferenza sostituisce quella precedente “mobile dentro hamburger”.