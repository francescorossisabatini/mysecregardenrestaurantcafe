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

## Il banco — provare prima di promuovere

`lab.html` alla radice è un'entry di Vite **solo per lo sviluppo**: `vite build`
costruisce solo `index.html`, quindi il banco non finisce mai in produzione.

```bash
npx vite --host 127.0.0.1 --port 8080     # poi apri /lab.html
node scripts/shoot-lab.mjs                # fotografa ogni coppia prima/dopo
```

Ogni esperimento in `src/lab/experiments/` mette a confronto **com'è oggi** e
**come sarebbe** con una funzione CSS che Tailwind espone, e parte da un difetto
che esiste davvero nel repo, con file e riga. Un banco pieno di demo generiche
non serve a decidere niente.

Due regole che l'hanno reso onesto:

- **Ogni anteprima sta in un iframe** alla larghezza dichiarata. Dare una
  larghezza a un `div` non simula un viewport: le varianti con breakpoint `lg:`
  continuerebbero ad applicarsi come sul monitor grande. La prima versione del
  banco lo faceva e mostrava tre colonne dentro una finestra da 390px.
- **I font sono quelli veri.** `node scripts/fetch-fonts.mjs` li scarica una
  volta in `output/fonts/`, e sia `shoot.mjs` che `shoot-lab.mjs` li servono al
  browser. Senza, ogni scatto esce con i fallback di sistema e la tipografia non
  è mai stata giudicata da nessuno.

Un esperimento entra in produzione solo con la coppia di scatti a supporto, e la
decisione va nel ledger come tutte le altre.

## Prima di dire "fatto"

```bash
node scripts/fetch-fonts.mjs     # una volta sola: i font veri in locale
npx vite --host 127.0.0.1 --port 8080   # in un altro terminale
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
