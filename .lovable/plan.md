## Piano UX aggiornato con insight CS01

Obiettivo: usare il file operativo “Personas & User Flows” per trasformare il sito da pagina narrativa a strumento di decisione rapido, soprattutto mobile, senza perdere identità botanica/spirituale.

### Insight principali da applicare

- Il 74% del traffico è mobile: ogni scelta deve essere thumb-first.
- La sessione media è 58 secondi: il sito deve rispondere subito, non richiedere esplorazione.
- Il 99% sono nuovi utenti: la home deve convincere chi non conosce il posto.
- Il menu è asset prioritario: “cosa c’è oggi?” deve essere raggiungibile in 1 tap.
- Il profilo “Seeker” deve capire in 10 secondi:
  1. cos’è il posto;
  2. se è aperto;
  3. se vale la pena andarci.
- Mancano alcuni trust/friction reducers: rating 4.7★ / 936+, indicazioni per trovare il cortile, nota “ordina al banco”.
- Per gluten-free serve una nota onesta: opzioni GF presenti, ma cucina non dedicata.

### 1. Hero più orientata alla decisione

Aggiungere sopra la piega mobile un micro-blocco di fiducia e chiarezza:
- stato aperto/chiuso già presente;
- rating “4.7★ da 936+ recensioni”;
- frase breve di posizionamento tipo “Vegetarian world cuisine in a hidden garden courtyard”.

La hero deve restare compatta: niente nuove CTA pesanti, solo segnali rapidi che aiutano il nuovo visitatore a decidere se restare.

### 2. Percorso Menu Today più diretto

Rafforzare la CTA primaria “Tagesmenü / Today’s menu” e assicurare che:
- sia la prima azione percepita;
- porti direttamente alla sezione menu;
- il menu di oggi sia leggibile in pochi secondi;
- prezzi e badge dietetici siano scansionabili.

Il profilo Regular deve poter arrivare al menu in massimo 1 tap dalla home.

### 3. Sezione “Il Posto / Visit” come riduzione della frizione

Inserire o rafforzare micro-copy operativo nella parte visit/contact o nella sezione più adatta della home:
- “Enter through the arch at [address]” / equivalente tedesco;
- “Order at the counter, then choose your seat”;
- indicazioni chiare verso Google Maps.

Questo serve al primo visitatore che non conosce il cortile nascosto e potrebbe essere confuso dall’esperienza self-service.

### 4. Trust signals senza appesantire

Aggiungere segnali di fiducia in punti mirati:
- hero: rating breve;
- eventuale sezione recensioni: rafforzare il numero recensioni;
- vicino al menu: badge/etichette alimentari visibili ma sobrie.

Evitare nuovi blocchi grandi: l’obiettivo è aumentare fiducia senza aumentare rumore visivo.

### 5. Dietary / gluten-free copy onesto

Aggiungere una nota discreta ma chiara vicino ai badge o alla sezione menu:
- opzioni gluten-free disponibili quando indicate;
- cucina non dedicata esclusivamente al gluten-free;
- chiedere allo staff per allergie o contaminazione incrociata.

Questo protegge la fiducia del profilo con restrizioni alimentari senza promettere troppo.

### 6. Link alla storia per il profilo spiritual-curious

Mantenere la filosofia come elemento secondario ma ben collegato:
- sezione filosofia/home con CTA chiara verso `/about`;
- non far competere la storia con menu e indicazioni above-the-fold;
- preservare tono botanico/spirituale esistente.

### 7. Cosa NON implementare ora

Per evitare scope creep, non includere in questo step:
- nuova pagina `/menu` dedicata;
- pagina `/cakes`;
- form ordine torte;
- form prenotazioni;
- loyalty/notifiche per clienti abituali.

Questi sono validi come roadmap futura, ma richiedono struttura, copy e possibile backend separati.

## Dettagli tecnici

File probabili da aggiornare:
- `src/components/Hero.tsx` per rating, micro-positioning e CTA primaria;
- `src/components/MenuSection.tsx` per scanabilità, badge e nota GF;
- `src/components/Contact.tsx` o sezione visit equivalente per cortile/counter-service;
- `src/components/Reviews.tsx` se il rating/numero recensioni è già centralizzato lì;
- `src/config/site.ts` se conviene centralizzare rating, review count, indirizzo e link Maps.

Non sono previste modifiche backend o database.

## Criteri di successo

- Su viewport mobile 390x494, entro la prima schermata si capisce: cosa è, se è aperto, perché fidarsi, dove andare dopo.
- Il menu del giorno è raggiungibile e scansionabile velocemente.
- Le informazioni pratiche riducono dubbi prima della visita fisica.
- Il tono rimane coerente: reale, botanico/spirituale, niente immagini AI, niente zoom/parallax.