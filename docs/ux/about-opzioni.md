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
