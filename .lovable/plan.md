## Piano UX per migliorare il sito

Obiettivo: rendere la home più chiara e meno affollata soprattutto su mobile, mantenendo l’identità botanica/spirituale e senza introdurre animazioni vietate.

### 1. Hero mobile più pulita e orientata all’azione
- Ridurre l’altezza percepita e la densità della hero su mobile.
- Rendere il titolo più compatto su schermi piccoli.
- Mantenere una sola gerarchia primaria: nome del ristorante, stato aperto/chiuso, CTA principale.
- Spostare o ridurre elementi secondari come dots del carousel e indicatore “Mehr entdecken” su mobile.

### 2. CTA più coerenti e meno duplicate
- Definire una priorità chiara:
  - Prima azione: vedere il menu del giorno.
  - Seconda azione: chiamare o ottenere indicazioni.
  - Terza azione: settimane/specials.
- Evitare che hero, navbar, sticky bar e blocchi finali competano tutti nello stesso momento.
- Su mobile, usare la sticky bar solo dopo lo scroll, come già previsto, ma rendere la hero meno carica all’inizio.

### 3. Cookie banner meno invasivo su mobile
- Trasformare il banner cookie in una versione più compatta.
- Ridurre altezza, padding e testo visibile iniziale.
- Mantenere i pulsanti “Akzeptieren / Ablehnen” ben cliccabili.
- Fare in modo che il banner non sembri in competizione con CTA e contenuto principale.

### 4. Navigazione mobile più semplice
- Valutare la rimozione del pulsante call dalla navbar mobile, dato che è già presente nella sticky bar dopo lo scroll.
- Lasciare in alto solo hamburger, logo e una singola azione discreta se necessario.
- Mantenere il language switcher dentro il menu hamburger, come da memoria del progetto.

### 5. Menu section più scansionabile
- Rafforzare la leggibilità dei piatti del giorno.
- Rendere più evidente il prezzo e la categoria del piatto.
- Migliorare la separazione tra “oggi”, “settimana” e “classici”, senza cambiare l’architettura verticale esistente.

### 6. Controllo finale UX responsive
- Verificare principalmente il viewport mobile attuale: 390x494.
- Controllare anche desktop per evitare regressioni.
- Mantenere:
  - foto reali soltanto;
  - niente zoom/parallax;
  - solo fade-in lenti;
  - stile botanical/spiritual già presente.

## Dettagli tecnici

File principali da modificare:
- `src/components/Hero.tsx`
- `src/components/CookieConsent.tsx`
- `src/components/Navigation.tsx`
- `src/components/MenuSection.tsx`
- eventualmente `src/components/MobileStickyBar.tsx`

Non sono previste modifiche al backend o al database.

Risultato atteso: una prima schermata mobile più respirabile, CTA più chiare, meno sovrapposizione tra cookie banner / navbar / hero / sticky bar, e un percorso utente più diretto verso menu, chiamata e indicazioni.