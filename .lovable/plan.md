Propongo di dividerlo in due fasi: prima sistemiamo il form in modo utile e sicuro, poi costruiamo l’hub staff quando abbiamo confermato la struttura del Google Sheet.

## Obiettivo

Creare un flusso in cui:

1. Il cliente invia una richiesta tavolo dalla pagina Visit.
2. La richiesta non resta solo “finta” nel frontend, ma viene salvata.
3. Il personale accede a una pagina riservata con login.
4. Nello stesso hub staff può vedere:
   - richieste di prenotazione
   - ingredienti e allergeni dei piatti dal Google Sheet esistente
   - richieste/ordinazioni torte, in una seconda fase

## Fase 1: Prenotazioni reali, senza hub completo

Intervento consigliato ora:

- Tenere il form in `/visit`, ma trasformarlo da feedback locale a richiesta reale.
- Salvare ogni richiesta in una tabella backend `reservation_requests`.
- Campi base:
  - nome
  - email o telefono
  - data
  - ora
  - persone
  - note
  - lingua
  - stato: `new`, `confirmed`, `declined`, `archived`
  - data di invio
- Mostrare al cliente un messaggio più preciso: “Richiesta ricevuta. Ti confermiamo appena possibile.”
- Aggiungere validazioni semplici: data futura, orario coerente con apertura, persone obbligatorie, contatto obbligatorio.

Questa fase risolve subito il problema più importante: non perdere le richieste.

## Fase 2: Login staff e hub interno

Creare una nuova area riservata, ad esempio:

- `/staff/login`
- `/staff`

Dopo il login, il personale vede una dashboard semplice con 3 blocchi:

```text
Staff Hub
├── Prenotazioni
│   ├── nuove richieste
│   ├── confermate
│   └── archiviate
├── Piatti e ingredienti
│   ├── menu corrente dal Google Sheet
│   ├── ingredienti principali
│   └── allergeni / note glutine
└── Torte
    ├── richieste nuove
    ├── data ritiro
    └── note cliente
```

## Login e sicurezza

Per lo staff serve autenticazione vera, non password hardcoded e non localStorage.

Implementazione proposta:

- Login email/password, eventualmente Google login per lo staff.
- Ruoli in tabella separata `user_roles`, non dentro profili o users.
- Solo utenti con ruolo `admin` o `staff` possono accedere a `/staff`.
- Le richieste di prenotazione sono scrivibili dal pubblico, ma leggibili solo dallo staff autenticato.

Questo evita che le prenotazioni siano visibili dal sito pubblico.

## Google Sheet: come usarlo bene

Il sito già usa `GOOGLE_SHEET_ID` e la funzione `get-daily-menu` per leggere il menu.

Per l’hub staff proporrei di non mischiare tutto nella funzione pubblica esistente. Meglio creare una funzione separata, ad esempio `get-staff-sheet-data`, che legge dallo stesso Sheet ID ma restituisce dati più operativi:

- ingredienti completi
- allergeni
- note interne, se presenti
- eventuali prodotti/torte, se aggiungiamo tab dedicati

Possibile struttura del Google Sheet:

```text
web                -> menu pubblico già esistente
ingredients        -> dati staff su ingredienti, allergeni, note interne
cake_orders        -> opzionale, se vogliamo usare Google Sheet anche per torte
```

Per le prenotazioni consiglio invece il database interno, non Google Sheet, perché:

- è più sicuro per dati personali
- permette stati e filtri migliori
- evita problemi di scrittura concorrente sul foglio
- è più facile proteggere l’accesso allo staff

Se però vuoi che anche le prenotazioni finiscano nello stesso Google Sheet, si può fare in una fase successiva con append automatico.

## Torte: fase separata

Per le ordinazioni torte farei dopo, perché serve decidere bene:

- quali torte sono disponibili
- anticipo minimo per ordinare
- campi obbligatori: data ritiro, persone/porzioni, gusto, allergie, telefono
- se è solo richiesta o ordine confermato
- se serve acconto o no

In prima versione dell’hub possiamo lasciare il blocco “Torte” come modulo/filtro pronto ma non attivo, oppure implementarlo subito solo come raccolta richieste.

## Cosa implementerei adesso se approvi

Versione prudente e concreta:

1. Sistemare il form `/visit` per salvare davvero le richieste tavolo.
2. Creare tabella protetta `reservation_requests` con policy corrette.
3. Aggiungere login staff con pagina dedicata.
4. Creare una prima pagina `/staff` minimale:
   - lista richieste prenotazione
   - dettagli richiesta
   - cambio stato richiesta
5. Lasciare “ingredienti” e “torte” come sezioni predisposte ma non ancora complete, oppure collegare subito ingredienti al Google Sheet se il formato attuale contiene già i dati necessari.

## Domande da confermare prima dell’implementazione completa

Non bloccherei la Fase 1, ma prima dell’hub completo servono queste decisioni:

- Lo staff deve accedere con email/password, Google, o entrambi?
- Chi sono gli utenti staff iniziali?
- Le prenotazioni devono restare solo nel backend interno o vuoi anche copiarle nel Google Sheet?
- Nel Google Sheet esistono già tab/colonne per ingredienti completi e torte, o vanno create?

## Nota editoriale/UI

L’hub staff non deve avere lo stesso tono emozionale del sito pubblico. Lo farei operativo, chiaro, con copy breve:

- “Neue Anfragen”
- “Heute / Morgen / Diese Woche”
- “Kontakt”
- “Notizen”
- “Bestätigen”
- “Archivieren”

Niente testi marketing, niente frasi AI, niente decorazioni inutili.