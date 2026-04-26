Aggiorno il piano della sezione menu tenendo conto del file `ai-aware-copy.md`: non solo tab sticky e gerarchia, ma anche testi meno “da sito generico”, più concreti e naturali.

## Obiettivo
Rendere la parte menu più facile da usare su mobile e più umana nel tono, soprattutto nel passaggio tra:

```text
Today / Heute  ->  Fissi / Klassiker  ->  Week / Woche
```

La priorità resta “scelta rapida”, con weekly menu secondario.

## Interventi UX

1. **Tab sticky mobile più chiari**
   - Mantengo la barra sticky `Heute / Fix / Woche`.
   - Rendo più evidente quale sezione si sta aprendo.
   - Miglioro microcopy e label: meno tecnico, più orientato alla scelta reale dell’utente.

2. **Gerarchia dei blocchi menu**
   - `Heute` resta il blocco più immediato.
   - `Fix / Klassiker` diventa il secondo blocco principale, perché è utile quando il daily menu non convince o non è disponibile.
   - `Woche` resta secondario: accessibile dal tab, ma in accordion chiuso o visivamente più leggero.

3. **Intro brevi e concrete**
   - Riscrivo le frasi descrittive usando il documento caricato:
     - frasi meno perfette e meno “marketing”.
     - più ritmo parlato.
     - dettagli concreti: cucina, piatti caldi, pranzo, cortile, allergie da chiedere al banco.
   - Evito formule tipo “at a glance”, “freshly cooked” ripetuto in modo generico, tripletti troppo lisci.

4. **Stati chiuso / no menu più naturali**
   - Rendo i testi di chiusura meno rigidi.
   - Evito em dash e frasi troppo levigate.
   - Mantengo chiarezza pratica: oggi chiuso, cosa si può guardare dopo, quando tornare.

5. **Allergeni e note pratiche**
   - Riscrivo il box allergeni in tono più umano e diretto.
   - Il senso resta lo stesso: gluten-free segnalato, ma cucina non esclusivamente gluten-free, quindi meglio chiedere.

## Stile copy da applicare
Seguirò queste regole dal file caricato:

- frasi con lunghezza variabile;
- meno bullet e meno copy “troppo pulito”; 
- pochissimo uso di `—`;
- parole concrete invece di formule generiche;
- piccoli dettagli realistici, senza inventare promesse non verificabili;
- tono caldo ma non troppo ispirazionale.

## Dettagli tecnici

File principale:
- `src/components/MenuSection.tsx`

Possibili aggiustamenti collegati:
- testi statici in `src/data/klassikerData.ts`, se il sottotitolo dei Klassiker risulta troppo generico;
- nessun cambio database;
- nessun cambio al sistema weekly menu o al Google Sheet;
- nessun cambio alle immagini o all’A/B test della hero.

## Verifica
Dopo le modifiche:
- controllo TypeScript con `bunx tsc --noEmit`;
- controllo manuale della sezione menu in mobile, viewport circa `390x494`, perché è quello che stai guardando ora;
- verifico che i tab sticky non coprano i titoli dopo lo scroll.