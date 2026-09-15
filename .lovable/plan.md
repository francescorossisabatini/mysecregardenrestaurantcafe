# Aggiornamento menu da fotografie

## Obiettivo
Allineare bevande fredde e dessert alle due fotografie, trattandole come fonte di verità. Le immagini restano solo riferimenti e non saranno pubblicate sul sito.

## Bevande
- Rimuovere `Cold Brew`.
- Sostituire il vecchio `Homemade Iced Tea`, oggi segnato come non disponibile, con `Homemade Peach-Iced Spice Tee`, prezzo `4,9`, descrizione `Our exclusive house blend` e formato `0,3 l`.
- Allineare le altre bevande fredde alle informazioni visibili nella foto:
  - Ginger Lemonade `0,2 l / 0,5 l`, `3,0 / 4,7`, con limoni biologici.
  - Kombucha `0,15 l / 0,3 l`, `3,0 / 4,7`, con descrizione della fermentazione al tè nero.
  - Strawberry Spritz analcolico `0,3 l`, prezzo `5,5`.
  - Mangolassi `0,3 l`, prezzo `4,9`, allergene `G`.
  - aggiungere Apple Juice unfiltered `0,2 l / 0,5 l`, `3,4 / 5,3`.
  - aggiungere Soda Water `0,2 l / 0,5 l`, `2,1 / 3,3`.
  - mantenere e verificare gli altri succhi, bibite bio, birra analcolica, acqua di cocco, acqua minerale, lemon soda e acqua in bottiglia rispetto alla foto.
- Rimuovere le bevande stagionali presenti nel codice ma assenti dalla nuova fonte di verità, come Iced Strawberry Matcha Latte e Iced Espresso Tonic.

## Dessert
Sostituire il copy attuale con nomi, prezzi, caratteristiche, ingredienti e allergeni della fotografia:

1. `Raw “Cheesecake”`, `4,9`, vegan e senza ingredienti con glutine, allergene `H`: crema di anacardi e burro di cocco su base di mandorle e datteri, dolcificata con sciroppo d'agave.
2. `Raw Chocolate-Caramel Slice`, `4,9`, vegan e senza ingredienti con glutine, allergeni `H, N`: sciroppo d'acero, olio di cocco, cacao, tahina, datteri e mandorle.
3. `Chocolate Mousse Cake`, `4,7`, torta francese al cioccolato senza ingredienti con glutine, allergeni `C, F, G`.
4. Aggiungere `Poppyseed-Nut Cake`, `4,5`, senza glutine e lattosio, allergeni `C, H`: semi di papavero, nocciole e confettura di mirtilli rossi.
5. Rinominare la torta speziata in `Spice Cake`, `4,5`, vegan, allergeni `A, H`: farina di farro, uvetta, noci, fichi, banane, carote e spezie da pan di zenzero.
6. `Brownie`, `4,7`, vegan e senza ingredienti con glutine, allergeni `F, H`: noci e pezzi di cioccolato.
7. Aggiungere `Whipped Cream`, `1,3`, allergene `G`, con indicazione che è disponibile anche vegan.
8. Aggiungere la nota della sezione: vengono usati zucchero di canna grezzo biologico, sciroppo d'acero o sciroppo d'agave.

Tutto il copy sarà disponibile in tedesco austriaco e inglese, con traduzioni fedeli e naturali. Le diciture relative al glutine manterranno la formulazione prudente già usata dal sito per la contaminazione incrociata.

## Coerenza dei dati
- Aggiornare la fonte dati unica dei classici, così sito e tool MCP leggono le stesse informazioni.
- Estendere il modello della categoria solo quanto serve per mostrare la nota sui dolcificanti.
- Rigenerare gli artefatti MCP generati, senza modificare manualmente il bundle.
- Non modificare menu settimanale, foglio Google, backend, route o altri contenuti.

## Verifica
- Controllare la sezione `Immer da` in DE e EN su mobile e desktop.
- Verificare che Cold Brew, il vecchio Eistee e le bevande stagionali non compaiano più.
- Verificare nomi, prezzi, descrizioni, allergeni e proprietà alimentari contro entrambe le fotografie.
- Controllare che il tool `get_classics_menu` restituisca gli stessi dati mostrati sul sito.
