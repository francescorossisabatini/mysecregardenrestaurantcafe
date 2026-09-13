---
name: house-style
description: Processo di design di casa per CS01 / My Secret Garden — direction lock, voice spec, antipattern derivati dal repo, divergence ledger, completion gate e tell-check. Usa questa skill prima di scrivere o modificare qualsiasi UI del sito - una sezione, una pagina, un componente, un layout, uno stato, il flusso tra due route. Vale anche quando la richiesta suona piccola ("sistema la spaziatura", "migliora questa sezione", "rendila più bella"), perché è lì che si rientra nel default. Non usarla per logica di business, query Supabase, routing o contenuti legali.
---

# House Style — CS01

Questa skill non produce gusto. Trasforma un problema di gusto in un problema
di conformità, che è quello che un modello sa fare bene. Il punto di vista
resta di Francesco, scritto nei file qui dentro.

## Prima di scrivere una riga di UI

Leggi, in quest'ordine:

1. `direction-lock.md` — topologia, cosa porta la pagina, densità, radius, motion
2. `voice-spec.md` — registro, divieti, le coppie male/bene
3. `antipatterns.md` — i tell derivati da **questo** repo
4. `../../../DESIGN_SYSTEM.md` — token, tipografia, componenti, a11y
5. `../../../docs/ux/divergence-ledger.md` — cosa è già stato deciso e perché

Se `direction-lock.md` ha ancora segnaposto `[__]`, fermati: la fase di
direzione non è chiusa. Il gate in `.claude/hooks/gate-styling.sh` lo impone
sulle superfici.

## Poi scrivi il ledger, prima del codice

Per ogni decisione rilevante, in `docs/ux/divergence-ledger.md`:

```
<Nome della decisione>
  Default:  <la mossa scontata, nominata per esteso>
  Invece:   <cosa fai al suo posto>
  Perché:   <il vincolo o il dato che lo giustifica>
  Costo:    <cosa si perde>
```

Nominare il default è il punto. Se non lo nomini, ci scivoli dentro
convinto di aver scelto. Un ledger che dice "Default: hero centrato.
Invece: hero centrato con più aria" è la prova che non è cambiato niente.

## Il completion gate — l'ordine delle fidelity

Non si passa allo stadio dopo prima di aver chiuso quello prima.

1. **Solo struttura.** HTML e layout. Niente colore, niente font, niente radius,
   niente icone, niente copy vero. Deve essere brutto: l'unica domanda è se
   l'ordine delle sezioni ha senso.
2. **Tre opzioni strutturali** alla stessa fidelity, diverse lungo assi
   *nominati* — non "la stessa pagina più ariosa". Francesco ne sceglie una
   mentre cambiare costa ancora poco.
3. **Copy vero**, almeno titolo e una sezione, approvato da Francesco.
   Il copy vincola il layout: un titolo di quattordici parole che rompe la
   griglia è un'informazione utile adesso, non dopo.
4. **Superfici.** Tipografia, colore, spaziatura, movimento, in quest'ordine.

## Prima di dire "fatto"

```bash
npm run dev                      # in un altro terminale
node scripts/shoot.mjs           # screenshot di ogni route e stato
./scripts/check-tells.sh         # controllo meccanico sui file toccati
```

Poi lancia l'agente `tell-critic` — cieco, non ha visto la conversazione —
passandogli solo gli screenshot e i lock. Il suo voto è **il** numero del giro.
Registra quel numero, non quello dopo le correzioni.
Poi, se serve direzione, `ceiling-critic`.

**Mai dire "fatto" avendo solo letto il codice.**

## Cosa vive dove — e perché resta snello

| Dove | Cosa | Quando si carica |
|---|---|---|
| `CLAUDE.md` | contesto progetto, brand, copy approvato, divieti duri | ogni sessione |
| questa skill | processo, lock, voce, antipattern | solo quando tocchi UI |
| `scripts/check-tells.sh` | tutto ciò che una macchina può contare | a ogni giro |
| `docs/ux/` | ledger e audit — il registro lungo | quando serve |

Regola di igiene: una regola che uno script può controllare **non sta scritta
in prosa**. Diventa un controllo in `check-tells.sh` e la frase si cancella.
Una regola si promuove in `CLAUDE.md` solo quando lo stesso errore torna una
seconda volta, e si scrive nella forma più generale che uccide tutta la classe.

## Dipendenza da installare una volta

`node scripts/shoot.mjs` richiede Playwright, che non è ancora in
`package.json` (aggiungerlo tocca il lockfile, e da `main` Lovable
va in produzione — quindi lo decide Francesco):

```bash
npm i -D playwright
```

## Ri-derivare gli antipattern

Ogni trimestre e dopo ogni aggiornamento importante dei modelli.
Il metodo è in testa a `antipatterns.md`. Il centro si sposta: una lista
di dicembre applicata a marzo protegge da un default che non esiste più.
