# /about "Unsere Geschichte": opzioni strutturali (29/09/2026)

> Stadio 2 del completion gate (house-style): tre strutture alla stessa bassa
> fedeltà, diverse lungo assi nominati. Francesco ne sceglie una prima di copy
> e superfici. I wireframe si rigenerano da `output/wire/about.html`.

## Com'è oggi

- Hero con Caveat, chip di navigazione e foto in card.
- Quattro "Kapitel" numerati.
- Circa 15 superfici con bordo e ombra: card cucina, card nota, citazione in card, ritratto, fatti, opere, altri caffè, fonti.
- Un carosello di poesie, vietato da CLAUDE.md.
- Quattro icone decorative e 8 dimensioni di testo.
- Sri Chinmoy spiegato a lungo (biografia, fatti, opere, cinque poesie, fonti), contro la regola "si sente, non si spiega; max un riferimento per pagina".
- Deroga aperta nel ledger (S3, U1, U2, C1, VOICE), in attesa di questo giro dedicato.

## Cosa dicono i materiali (Notion, CS01)

- **Brand Mood & Narrative v2.1:** "Il sito è un cortile che si scopre. Il sito non convince. Il sito rivela." Due anime, spirituale e green, "che coesistono senza mai spiegarsi a vicenda". "La filosofia c'è ma il sito non è un tempio: è un giardino dove si mangia bene." I principi appaiono nelle decisioni di design, non nel copy.
- **Trend & Best Practices 2025/26:** storytelling alla Dishoom, con la sequenza scoperta → cibo → atmosfera → fiducia → visita. Niente carosello. No-Line Rule: sezioni separate da spazio e cambio di superficie, non da bordi. "Meno elementi, più intenzione."
- **Direction lock:** colonna singola asimmetrica a 62ch, immagini che escono a destra o a piena larghezza, un solo momento di respiro per pagina, niente griglie di card.

## Pattern narrativi senza card

| Pattern | Cosa fa | Dove serve |
|---|---|---|
| Percorso (spazio) | Ogni sezione è un luogo attraversato | A |
| Diario delle ore (tempo) | L'ora è il titolo, la storia scorre nella giornata | B |
| Domande e risposte | I dubbi veri del lettore come titoli, risposte brevi | C |
| Lettera in prima persona | Apertura firmata, voce del proprietario | C |
| Foto a piena larghezza come cambio di scena | Separa senza bordi (No-Line Rule) | A, B, C |
| Una sola citazione come respiro | Il momento `ampio` della densità | A, B, C |
| Oggetto concreto al posto della spiegazione | La cartolina con la poesia che arriva col caffè dice Sri Chinmoy meglio di una biografia | A, B |
| Liste di definizione (`dl`) invece di card | Fatti e link come righe di testo | C |

## Le tre opzioni

- **A · Der Weg**, asse: spazio. Strada → Bogen → Hof → Tresen → Giardino. È la metafora del brand ("un cortile che si scopre") presa alla lettera. Rischio: ripete in lungo i 3 passi di `IlPosto` in home. Due sezioni che rispondono alla stessa domanda (S6), da risolvere accorciando uno dei due.
- **B · Ein Tag**, asse: tempo. 10:30 la karte → 12:30 Tresen → 15:00 caffè e torte → 18:45 il Hof si svuota. L'ora è un dato (il lock dice che la pagina la porta il dato) e non si sovrappone a nessun'altra sezione del sito. Rischio: serve copy nuovo per ogni ora.
- **C · Fragen**, asse: il lettore. Lettera breve, poi 5 domande vere come titoli. È la più forte per SEO (domande = ricerche) e per i profili C e D. Rischio: meno atmosfera, più informazione.

Regole comuni a tutte e tre:
- zero card e zero carosello;
- un solo Caveat e una sola citazione;
- Sri Chinmoy in un punto solo, con il link a srichinmoy.org;
- niente icone decorative;
- tre densità verticali.

---

## Stato al 30/09/2026 — da qui riparte la prossima sessione

**Scelta di Francesco:** strada 2. Prima ha voluto vedere la 3.

**Nel banco** (`lab.html`, solo in sviluppo):

| Prototipo | File | Indirizzo |
|---|---|---|
| B "Ein Tag" (strada 1, minima) | `src/lab/experiments/06-about-ein-tag.tsx` | `lab.html?exp=about-ein-tag&variant=after` |
| Strada 3, contenuto di oggi senza card | `src/lab/experiments/07-about-senza-card.tsx` | `lab.html?exp=about-senza-card&variant=after` |

Aggiungendo `&lang=en` si vede la versione inglese; `variant=before` mostra l'estratto di com'è oggi. `src/pages/AboutUs.tsx` (la pagina vera) non è stato toccato.

### Le tre strade per il contenuto su Sri Chinmoy (29/09)

La B aveva tolto quasi tutto il contenuto su Sri Chinmoy. Francesco ha chiesto perché. La risposta è che voice-spec ("mai spiegare Sri Chinmoy, massimo un riferimento") e CLAUDE.md ("si sente, non si spiega") erano stati applicati troppo alla lettera. Quelle regole sono scritte per il sito e per il copy sul cibo. /about invece è la pagina dove il profilo D (Curious) va a cercare proprio questo, ed è una convinzione del proprietario.

1. **Minima:** la B così com'è, un solo riferimento.
2. **Scelta.** La B, più un capitolo "Die Idee dahinter" dopo le 18:45, con:
   - una biografia di 3–4 frasi di soli fatti (1931–2007, poeta, artista, musicista, meditazioni per la pace all'ONU);
   - i Soul-Birds come un'unica immagine a piena larghezza;
   - una **poesia del giorno**, che ruota ogni giorno tra le 5, al posto del carosello;
   - caffè gemelli e fonti come elenchi di link di testo.
3. **Com'è oggi, senza card:** il prototipo 07.

### Cosa ha mostrato la strada 3 (29–30/09)

- Senza contenitori il contenuto su Sri Chinmoy si legge bene: il problema erano le card, non la quantità.
- **Su mobile è lunga.** Circa 9.400px, una decina di schermate. L'82% delle sessioni è mobile, con 58 secondi di media.
- Senza la navigazione a chip non c'è modo di saltare a Sri Chinmoy.
- Il ritratto occupa mezza schermata.
- Cinque poesie di fila sono circa due schermate e mezza.
- Senza card il copy di oggi si nota di più, compresi i divieti di voice-spec: "kein lautes Konzept", "nicht dekorativ", "Ein Teller kann den Tag nicht lösen…", "Weiterlesen".

### Piano per la strada 2, partendo dal mobile

1. Si parte dalla B (06), con un nuovo esperimento `08-about-idee.tsx`, o estendendo la 06.
2. **Mobile prima**, con l'obiettivo di 5–6 schermate a 390px. Decisioni:
   - una riga di link di testo in alto per saltare ai capitoli (senza chip, senza bordi);
   - una sola poesia (quella del giorno), non cinque;
   - il ritratto piccolo, accanto alle date, non a tutta larghezza;
   - spazi tra le sezioni più corti su mobile (`normale` resta `py-20`; valutare `stretta` tra i capitoli brevi).
3. Ledger prima del codice (`docs/ux/divergence-ledger.md`).
4. Poi `shoot`, `check-tells` e il critico cieco `tell-critic`. Il suo voto è il numero del giro.

### Da far decidere a Francesco prima del codice

- [ ] **Eccezione in voice-spec per /about:** "su /about il racconto dell'ispirazione è ammesso, con fatti e senza aggettivi". Senza questa eccezione la strada 2 viola voice-spec.
- [x] **(Approvato da Francesco in chat il 30/09/2026: la poesia del giorno va bene, sostituisce la citazione.) La poesia del giorno sostituisce la citazione fissa** „To serve and never be tired is love." **o si aggiunge?** CLAUDE.md dice una sola citazione per pagina.
- [ ] **Approvazione del copy della B** (bozze DE ed EN in `06-about-ein-tag.tsx`) e del copy nuovo del capitolo "Die Idee dahinter".
- [ ] **Fatti da confermare col proprietario:** giardino dal 2018; caffè Supermind tostato ogni settimana a Vienna; una cartolina con una poesia a ogni caffè; "mit ins Büro"; la cucina scrive tre piatti al giorno (Suppe, grün, blau).

Poi si porta in `src/pages/AboutUs.tsx`. Il ledger ha una deroga aperta per quel file (S3, U1, U2, C1, VOICE): si chiude con questo giro.

### 30/09, prototipo della strada 2 nel banco

`src/lab/experiments/08-about-idee.tsx`, `lab.html?exp=about-idee&variant=after` (`&lang=en` per l'inglese). A 390px sono 4.223px, circa 5 schermate (la strada 3 ne faceva 11). Voto cieco del giro 1: 6/10. Correzioni e punti aperti nel ledger, sezione "strada 2". Il movimento segue il direction lock e la discussione Notion del 20/04, non la spec del 5/04 (niente testo parola per parola, niente parallax).

Le quattro decisioni sopra restano aperte. Il prototipo assume l'eccezione voice-spec e la poesia al posto della citazione.

## Stato al 02/10/2026 — da qui riparte la prossima sessione

- **Mobile:** Francesco, "in mobile funziona la struttura di ora". Non toccarlo: ogni modifica al desktop va verificata misurando che i blocchi a 390px restino uguali (`SECTION 547, 451, 670, 279, 410, 783, 675`).
- **Desktop (da `lg`):** griglia unica `7rem / 52ch / 1fr`, gap 48px. Le foto di 10:30, 12:30 e 15:00 stanno nella terza colonna, accanto al loro testo (4:3, la torta quadrata). Poesia e liste sulla stessa griglia. A 1280: margine a 84px, testo a 244, terza colonna a 708. Voto cieco del giro: **6/10**. Francesco non l'ha ancora visto.
- **Proposte del critico non applicate (decide Francesco):**
  1. Ritratto grande nella terza colonna di "Die Idee dahinter" (contraddice la tua richiesta "ritratto piccolo accanto alle date").
  2. Ritmo che si stringe verso sera: `py-20` per 15:00 e 18:45 invece di `py-28`.
  3. Foto del cortile a tutta larghezza sotto le 12:30 invece che a destra.
  4. Testo centrato in verticale sulla foto (`lg:items-center`).
  5. Una sola ancora in alto (la poesia) e via "Die Gedichte … sind von Sri Chinmoy" dalle 18:45 (copy).
- **Ancora aperte da prima:** eccezione voice-spec per /about; copy della B e del capitolo "Die Idee dahinter"; fatti col proprietario (giardino dal 2018, caffè tostato ogni settimana, cartolina col caffè, ONU "zweimal pro Woche ab 1970"); "ein grünes und ein blaues" è gergo interno; cosa collega Sri Chinmoy al locale.
