# Audit di flusso — Homepage CS01

> 13 settembre 2026 · metodo: house-style skill, fase diagnosi
> Evidenza: codice in `src/pages/Index.tsx` e componenti, conteggi da
> `scripts/check-tells.sh`. Niente qui è un'impressione.

---

## Cosa c'è adesso

| # | Sezione | Lavoro dichiarato | Densità | Azioni |
|---|---|---|---|---|
| — | `Hero` | prima impressione | `100svh` | 2 |
| 01 | `HomeMenuPreview` | menu di oggi | `py-20 md:py-28 lg:py-32` | 1 |
| 02 | `ValueProposition` | il posto | `py-20 md:py-28 lg:py-32` | 1 |
| 03 | `ShowcaseSections`/1 | il menu | `py-20 md:py-28 lg:py-32` | 1 |
| 04 | `ShowcaseSections`/2 | il cortile | `py-20 md:py-28 lg:py-32` | 1 |
| 05 | `Voci` | social proof stampa | `py-20 md:py-28` | 0 |
| 06 | `Reviews` | social proof ospiti | `pt-20 md:pt-28 lg:pt-32` | 1 |
| 07 | `CTAEndBlock` | chiama / indicazioni | `py-20 md:py-24 lg:py-32` | 3 |
| — | `MobileStickyBar` | chiama / indicazioni | fissa | 2 |

Sette sezioni. Quattro lavori. Dodici azioni.

---

## I quattro problemi

### 1 · Il profilo B paga uno schermo intero per niente

Il Regular ha un budget di **20 secondi** e una sola domanda: cosa c'è oggi.
Su mobile (390×844, il 74% del traffico) deve:

1. aspettare l'hero — sottotitolo a 400ms, bottoni a 800ms
2. scorrere un `100svh` pieno
3. arrivare a `HomeMenuPreview`

La prova che l'hero è d'intralcio sta dentro l'hero stesso: la sua CTA
primaria è *"Was gibt's heute?"* e punta a `/#menu`. **È un bottone il cui
lavoro è annullare la sezione che lo contiene.** Quando la CTA di una sezione
serve a saltarla, la sezione è nel posto sbagliato.

Nota tecnica correlata: `Index.tsx` contiene un `useEffect` di ~30 righe che
ri-scorre fino a `#menu` finché la posizione non si stabilizza, perché le
sezioni lazy sopra il target cambiano l'offset mentre montano. Quel codice
esiste solo per compensare la distanza fra l'hero e il menu.

### 2 · Due sezioni per lo stesso lavoro, due volte

- `ValueProposition` (02 · *Der Ort*) e `ShowcaseSections`/2 (04 · *Unser Garten*)
  raccontano entrambe il cortile del Raimundhof.
- `Voci` (05) e `Reviews` (06) sono social proof consecutiva: stampa, poi ospiti.

La numerazione `01 → 07` promette una sequenza. Il contenuto non la mantiene:
02 e 04 sono la stessa fermata, 05 e 06 pure.

### 3 · I KPI primari si diluiscono invece di rinforzarsi

`click_get_directions` e `click_call_now` sono i due KPI primari.
Oggi compaiono così:

- indicazioni: `ShowcaseSections`/2, `CTAEndBlock`, `MobileStickyBar` → 3 volte
- chiama: `CTAEndBlock`, `MobileStickyBar`, bottom nav → 3 volte

`CLAUDE.md` prescrive una sola CTA primaria per pagina. Con dodici azioni
disponibili non c'è una CTA primaria: ce n'è una lista. E ogni ripetizione
rende più difficile leggere il dato GA4, perché lo stesso evento arriva da
tre contesti diversi senza che il flusso li distingua.

### 4 · Il profilo C non ha una casa

Il profilo Dietary (vegano / senza glutine / bio, 1–3 minuti) deve capire se
il posto va bene per lui. Oggi:

- i badge dietary vivono **solo** dentro le card dei piatti del giorno
- se il menu del giorno non c'è ancora, sparisce anche l'informazione dietary
- la precisazione onesta — *"molti piatti senza ingredienti con glutine, ma non
  una cucina certificata senza glutine"* — è dentro il corpo di
  `ValueProposition`, in corsivo, al quarto paragrafo

È l'informazione più decisiva del sito per un intero profilo, e sta in una
postilla.

---

## Il tell strutturale sotto tutto questo

Il design system di CS01 è curato: token, contrasti verificati, tipografia
dichiarata, motion vincolato. Copre colore, tipo e componente.
**Non copre la struttura.**

Ed è la struttura che si riconosce per prima. Lo scheletro attuale —
hero centrato, sezione valore centrata, due showcase alternate
immagine-sinistra/immagine-destra con lo stesso `aspect-[4/5]`, striscia di
loghi, testimonial, banda CTA scura full-width, footer — sopravvive intatto a
qualsiasi cambio di font e di palette. Coprendo il logo, questa pagina
potrebbe essere di qualunque locale.

Conteggi a supporto, da `check-tells.sh`:

```
S3 ritmo verticale     lo stesso padding di sezione 4× — una sola velocità di scorrimento
S2 template sezione    eyebrow-num 7× — il segnale editoriale è diventato carta da parati
S4 filetti             rule-short 6× — contro la No-Line Rule dello stesso CLAUDE.md
U1 radius              5 valori distinti nei soli file della home
U2 bordo + ombra       Reviews.tsx:55, HomeMenuPreview.tsx:113
C1 interpunto          10× in sette file
TYPE scala             14 dimensioni tipografiche distinte
```

---

## Cosa NON è rotto

Da non toccare mentre si sistema il resto:

- La barra fissa mobile con chiama + indicazioni. 74% mobile, sessione media
  58 secondi: è la decisione giusta e va difesa.
- Il badge aperto/chiuso con `aria-live`. Segnale di intent, KPI tracciato.
- Il rating 4,7 su 936 sopra l'h1. È l'asset più forte del locale.
- La gestione degli stati di `HomeMenuPreview`: loading, chiuso, festivo,
  menu assente, anteprima di domani. È la parte meglio fatta del sito
  e nessuna delle opzioni sotto la smonta.
- L'onestà sul glutine. Va spostata, non ammorbidita.
