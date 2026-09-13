# Antipatterns — CS01

> Lista derivata dal **codice reale di questo repo**, non da una lista generica.
> Metodo: invece delle tre sessioni a brief cieco, ho fatto l'equivalente su
> codice esistente — ho contato cosa si ripete identico in tutte le sezioni
> della homepage. Quello che si ripete 6 volte su 7 non è una scelta: è un loop.
> Derivata: 13 settembre 2026 · Ri-derivare: dicembre 2026

---

## Come si legge

Ogni voce ha: **il tell**, **l'evidenza nel repo**, **la regola**.
Se non c'è evidenza nel repo, la voce non sta qui: sta in `voice-spec.md`
o non sta da nessuna parte.

---

## STRUTTURA — i tell che sopravvivono a qualsiasi cambio di font

### S1 · Lo scheletro marketing standard
**Evidenza:** `src/pages/Index.tsx` — hero 100svh centrato · menu · value prop
centrata · showcase immagine-sx · showcase immagine-dx · logo strip con quote
(`Voci`) · testimonial (`Reviews`) · banda CTA scura full-width (`CTAEndBlock`)
· footer. È l'ordine di sezioni descritto come default in ogni guida sul tema.

**Regola:** l'ordine delle sezioni è una decisione da registrare nel ledger,
mai un ordine ereditato. Se l'ordine attuale non è stato scritto nel ledger
con il suo "Default / Instead", non è una decisione.

### S2 · Il template di sezione ripetuto 7 volte
**Evidenza:** `eyebrow-num` in 7 punti (`Voci`, `ShowcaseSections` ×2,
`Reviews`, `HomeMenuPreview`, `CTAEndBlock`, `ValueProposition`),
`rule-short` in 6. Ogni sezione è: `NN · ETICHETTA` → `h2-editorial` →
filetto 4rem → corpo → bottone.

**Regola:** massimo 2 sezioni per pagina possono usare il blocco
eyebrow + h2 + filetto. Le altre entrano in un modo diverso (attacco diretto
sul contenuto, numero senza etichetta, titolo inline, nessun titolo).
Un segnale usato ovunque non segnala più niente: è carta da parati.

### S3 · Il ritmo verticale unico
**Evidenza:** `py-20 md:py-28 lg:py-32` su 7 sezioni. Nessuna compressione,
nessuna dilatazione. La pagina scorre a velocità costante dall'inizio alla fine.

**Regola:** almeno tre densità verticali distinte per pagina, assegnate per
ruolo, non per gusto. Vedi `direction-lock.md` → Densità.

### S4 · Filetti decorativi che violano la No-Line Rule
**Evidenza:** `eyebrow-num::before` (hairline 28px) + `rule-short` (hairline
4rem) = due filetti per sezione, mentre `CLAUDE.md` prescrive di separare
con il cambio di superficie, non con i bordi.

**Regola:** un filetto esiste solo se separa due cose che il cambio di
superficie non riesce a separare. Decorativo = da togliere.

### S5 · La CTA che si moltiplica
**Evidenza:** homepage = CTA hero + link hero + "Unsere Geschichte lesen" +
"Speisekarte ansehen" + "Route auf Google Maps" + link Google Reviews +
3 bottoni in `CTAEndBlock` + 2 azioni permanenti in `MobileStickyBar`.
Undici azioni. `CLAUDE.md`: "una sola CTA primaria per pagina".

**Regola:** una sola azione primaria per viewport. Il resto sono link testuali
o non esistono. Se `MobileStickyBar` già offre chiama e indicazioni in modo
permanente, una sezione che ripete chiama e indicazioni è ridondanza, non
rinforzo.

### S6 · Due sezioni per lo stesso lavoro
**Evidenza:** `ValueProposition` (02 · Der Ort) e `ShowcaseSections`/2
(04 · Unser Garten) raccontano entrambe il cortile. `Voci` (05) e `Reviews`
(06) sono entrambe social proof, consecutive.

**Regola:** una sezione = un lavoro. Se due sezioni rispondono alla stessa
domanda dell'utente, o si fondono o una sparisce.

### S7 · Il ritratto uguale per tutte le immagini
**Evidenza:** entrambe le showcase usano `aspect-[4/5] lg:aspect-[5/6]`,
`rounded-lg`, `shadow-elevated`, `saturate-[0.96]`. Stesso taglio, stesso peso.

**Regola:** il formato dell'immagine dice cosa guardare. Se due immagini con
ruoli diversi hanno lo stesso formato, una delle due è messa lì per riempire.

---

## SUPERFICI

### U1 · Sei valori di radius
**Evidenza:** `rounded-lg` ×40, `rounded-full` ×36, `rounded-md` ×30,
`rounded-2xl` ×17, `rounded-xl` ×12, `rounded-sm` ×6.

**Regola:** vedi `direction-lock.md` → Radius. Il gate in
`scripts/check-tells.sh` conta i valori distinti per file toccato.

### U2 · Bordo e ombra insieme
**Evidenza:** `Reviews.tsx` — `lg:border lg:border-border/70 lg:bg-card/55
lg:shadow-card`. `HomeMenuPreview` — `border ... shadow-card`.

**Regola:** o bordo o ombra, mai entrambi sulla stessa superficie. Su cream,
la scelta di casa è il bordo.

### U3 · Icona attaccata a ogni bottone
**Evidenza:** `UtensilsCrossed`, `BookOpen`, `MapPin`, `Clock`, `CalendarDays`,
`Phone`, `ChevronRight`, `Info`, `ArrowRight`, `Star`, `ChevronDown` —
24 import da `lucide-react`.

**Regola:** l'icona sta solo dove sostituisce una parola che non c'è
(call pill, bottom nav, badge dietary). Su un bottone che ha già un'etichetta
chiara, l'icona è rumore. Il filetto verde dell'`eyebrow-num` fa già il lavoro
decorativo: non serve una seconda decorazione sul bottone.

### U4 · La freccia in coda al link
**Evidenza:** `Hero.tsx` — `ArrowRight` + `group-hover:translate-x-0.5`.
`ValueProposition` — `hover:gap-3`.

**Regola:** una freccia per pagina, sul link che porta fuori dalla pagina.
Non su ogni link.

---

## COPY DI INTERFACCIA

### C1 · L'interpunto
**Evidenza:** `·` in 12 file. `01 ·`, `4.7 · 936`, `ruolo · data`,
`Mariahilferstraße 45 · 1060 Wien`.

**Regola:** massimo due interpunti per viewport. Per il resto: a capo,
virgola, o niente.

### C2 · Numerazione di sezione come ornamento
**Evidenza:** `01` → `07` su tutte le sezioni della home. La numerazione
promette una sequenza che il contenuto non mantiene: 05 e 06 sono la stessa
cosa, 02 e 04 pure.

**Regola:** i numeri restano solo se la sequenza è reale e l'utente la deve
seguire (i 3 passi per trovare l'ingresso, per esempio). Altrimenti via.

---

## Cosa NON è un antipattern qui

Non tutto quello che le guide generiche vietano vale per CS01. Queste stanno,
e stanno per una ragione documentata:

- **Caveat nell'h1 hero** — è il marchio, non decorazione. `CLAUDE.md`, max 1 per viewport.
- **Badge aperto/chiuso** — è il segnale di intent visita, KPI GA4 tracciato.
- **Rating 4.7★ sopra l'h1** — 936 recensioni sono l'asset più forte del locale.
- **Barra fissa mobile con chiama + indicazioni** — 74% mobile, sessione 58s, KPI primari.
- **Bottom nav fissa** — decisa in IA, non è un tell.
