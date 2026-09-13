# Reference manifest — CS01

> Una riga per immagine. Uno screenshot senza nota è ambiguo: il modello non
> sa se l'hai salvato per la tipografia, per la densità o per il colore, e
> finisce per leggerlo come "atmosfera generica", che non serve a niente.
> La riga IGNORE lavora quanto la riga STEAL.
>
> **Tieni la cartella piccola.** Otto immagini che vanno d'accordo valgono
> più di trenta: oltre quella soglia il modello fa la media fra i riferimenti
> e si torna nel mezzo, avendo speso più token per arrivarci.

---

## Come si compila

```
nome-file.png
  STEAL:  <la singola cosa per cui l'hai salvata, il più specifica possibile>
  IGNORE: <tutto il resto, nominato esplicitamente>
```

## Cosa mettere dentro

- pagine intere alla larghezza reale, non ritagli dell'hero — il ritmo lungo
  lo scroll è metà del messaggio
- lo stesso schermo in stato pieno **e** in stato vuoto
- almeno una larghezza mobile (390px): qui il 74% del traffico è mobile
- uno zoom su un dettaglio, se il pregio sta nel micro
- due o tre **contro-riferimenti**, etichettati con cosa esattamente si evita.
  I negativi funzionano meglio dei positivi.

## Cosa il modello legge bene da un'immagine

Affidabile: struttura del layout, densità informativa, gerarchia relativa,
valori di colore approssimativi, graziato contro bastone, quanto è formale,
se la spaziatura è generosa o stretta.

Inaffidabile: valori di spaziatura esatti, riconoscere un typeface specifico,
letter-spacing, correzioni ottiche, qualsiasi cosa sul movimento, quanto pesa
davvero un peso.

Quindi: le immagini per la lettura d'insieme, i numeri veri per tutto il resto.

---

## Il metodo a due passaggi

1. **Al setup:** Claude legge le immagini e scrive qui sotto cosa crede sia
   il linguaggio visivo.
2. **Francesco corregge** quella lettura, e la versione scritta viene congelata.

Da lì in poi si legge il testo a ogni build; le immagini restano per le
ri-derivazioni e i controlli a campione. Motivo: le immagini costano token e
la loro interpretazione non è deterministica — due sessioni possono trarne
conclusioni diverse.

I punti in cui Claude ha letto male un'immagine sono la cosa più utile di
tutto l'esercizio: sono esattamente i valori da fissare esplicitamente nel
`direction-lock.md`.

---

## Immagini

_(vuoto — da popolare)_

Candidati già nel repo, da valutare come riferimenti interni:
`src/assets/photos/garden-courtyard-hero.jpg`, `tavolata-dall-alto.jpg`,
`src/assets/entrance-garden.jpg`.
