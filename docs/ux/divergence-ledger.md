# Divergence Ledger — CS01

> Per ogni decisione: **il default che si poteva fare**, e cosa si fa invece.
> Nominare il default è il punto. Se non lo nomini, ci scivoli dentro convinto
> di aver scelto.
>
> Si legge in trenta secondi e si capisce se il design contiene decisioni o è
> il default con un'altra mano di vernice. Se una riga dice
> *"Default: hero centrato. Invece: hero centrato con più aria"*, non è
> cambiato niente.

---

## Stato

| Data | Ambito | Stato |
|---|---|---|
| 13 set 2026 | Homepage — struttura | **Opzione A scelta da Francesco — implementata** |
| 13 set 2026 | Propagazione `/menu` e `/visit` | implementata |

---

## Decisioni già prese (direction lock)

### Cosa porta la pagina
- **Default:** l'immagine. È un ristorante, quindi si parte dalla fotografia
  del cortile a tutto schermo.
- **Invece:** i **dati**. Il menu del giorno.
- **Perché:** è l'unica cosa del sito che cambia ogni mattina, l'unica ragione
  per cui il profilo B torna, e la sola informazione che il sito ha e Google
  non ha. Sessione media 58 secondi.
- **Costo:** la prima impressione emotiva si indebolisce per il profilo A.
  Le opzioni sotto la recuperano in modi diversi.

### Topologia
- **Default:** colonna centrata, `text-center`, `max-w-4xl`.
- **Invece:** editoriale asimmetrico, testo allineato a sinistra su ~62ch,
  immagini che sfondano oltre la colonna. Centrato solo l'hero, una volta.
- **Perché:** `CLAUDE.md` già prescrive il corpo allineato a sinistra. Il codice
  centra 7 sezioni su 7. Questa non è un'idea nuova: è una regola esistente
  finalmente applicata.
- **Costo:** le sezioni corte sembrano più "spoglie" senza il centraggio.

### Ritmo verticale
- **Default:** `py-20 md:py-28 lg:py-32` su tutto, come oggi.
- **Invece:** tre densità assegnate per ruolo — stretta per la risposta
  operativa, normale per la narrativa, ampia per un solo respiro a pagina.
- **Perché:** una sola velocità di scorrimento vuol dire nessuna gerarchia.
  La sezione che risponde più in fretta deve essere la più stretta.
- **Costo:** va toccato ogni file di sezione.

### Etichette di sezione
- **Default:** eyebrow numerata maiuscola spaziata sopra ogni h2 — il segnale
  "editoriale" applicato uniformemente.
- **Invece:** massimo due per pagina. I numeri restano **solo** dove la
  sequenza è reale e l'utente la deve seguire: i tre passi per trovare
  l'ingresso, copy già approvato in `CLAUDE.md`.
- **Perché:** `eyebrow-num` compare 7 volte. Un segnale usato ovunque non
  segnala più niente.
- **Costo:** le sezioni senza eyebrow devono trovare un altro modo di attaccare.

### Filetti
- **Default:** `rule-short` sotto ogni h2, più la hairline in `eyebrow-num::before`.
- **Invece:** un filetto solo dove il cambio di superficie cream → white non
  riesce a separare.
- **Perché:** la No-Line Rule sta scritta in `CLAUDE.md` e il codice la viola
  sei volte.
- **Costo:** nessuno.

### Radius
- **Default:** il valore comodo caso per caso — oggi sei valori.
- **Invece:** due. `rounded-lg` per le superfici, `rounded-full` per pill e dot.
- **Perché:** sei valori non sono un sistema.
- **Costo:** normalizzazione progressiva, un file alla volta.

### Bordi e ombre
- **Default:** bordo 1px **e** ombra piccola su ogni card.
- **Invece:** solo bordo. Unica eccezione: `shadow-elevated` sulla CTA
  dell'hero, che sta sopra una fotografia.
- **Perché:** su cream l'ombra non stacca, sporca.
- **Costo:** le card perdono profondità su desktop.

---

## Decisione aperta — la struttura della homepage

Tre opzioni alla stessa fidelity, diverse lungo assi nominati.
**Non sono tre gradazioni della stessa pagina.**

Assi: *(1)* cosa occupa il primo viewport · *(2)* sezioni discrete o colonna
continua · *(3)* dove vive la riprova sociale.

---

### Opzione A — **Il bancone**
*primo viewport: il menu · sezioni discrete · riprova in coda, compatta*

- **Default:** hero fotografico `100svh`, menu sotto.
- **Invece:** fascia d'ingresso `35svh` — foto del cortile, logo, stato
  aperto/chiuso, 4,7 su 936 — e **il menu di oggi comincia sopra la piega**.
- Sette sezioni diventano quattro: *Bancone* (oggi) · *Il posto* (fusione
  02+04, con i tre passi dell'arco) · *Voci* (fusione 05+06) · footer con
  orari e indirizzo.
- `CTAEndBlock` sparisce: la barra fissa fa già chiama + indicazioni, e il
  footer porta l'indirizzo.
- Il profilo C ottiene una riga permanente sotto il menu: vegano, senza
  ingredienti con glutine, bio — **visibile anche quando il menu non c'è**.
- **Perché:** applica alla lettera il direction lock. Profilo B: zero scroll.
  Profilo A: stato + rating + foto nella stessa fascia.
- **Costo:** l'impatto emotivo del cortile a tutto schermo si riduce a una
  fascia. Per un locale che vive sull'effetto "nascosto", è una rinuncia vera.
- **Rischio:** se la foto è il vero motore di conversione del profilo A,
  questa opzione lo indebolisce. Verificabile con GA4 `scroll_depth_homepage`.

---

### Opzione B — **La soglia**
*primo viewport: la foto · colonna narrativa continua · riprova diffusa*

- **Default:** hero `100svh` + sezioni impilate con box e titoli.
- **Invece:** hero `60svh`, e sotto **una sola colonna editoriale continua**
  senza confini di sezione: l'arco → il cortile → il bancone → i piatti di
  oggi. Una discesa, non un elenco.
- I numeri diventano veri: `01 Geh durch den Bogen` · `02 Durch den Innenhof`
  · `03 Setz dich. Bleib.` — copy già approvato in `CLAUDE.md`, oggi non usato
  in homepage.
- La riprova sociale non è una sezione: 4,7 su 936 sta nella fascia di
  chiusura, e Falstaff / HappyCow / Wien wie es isst diventano **una riga di
  testo**, non quattro loghi in griglia.
- Per il profilo B: chip **Heute** fisso nella top bar che salta al menu.
- **Perché:** è l'unica opzione che usa la narrativa già approvata, ed è la
  più lontana dallo scheletro riconoscibile.
- **Costo:** il profilo B scorre ancora. Il chip è una toppa, non una soluzione.
- **Rischio:** una colonna continua senza confini è più difficile da estendere.
  Ogni contenuto futuro deve trovare il suo posto nella discesa.

---

### Opzione C — **Due colonne**
*primo viewport: fatti a sinistra, foto a destra · split · riprova nella colonna fissa*

- **Default:** griglia responsive che impila tutto in una colonna sotto `md`.
- **Invece:** split asimmetrico. Colonna sinistra **fissa** su desktop — oggi,
  orari, indirizzo, stato aperto, telefono. Colonna destra scorre: il posto,
  le voci, la filosofia. Su mobile la colonna dei fatti è la prima schermata,
  la narrativa scorre sotto.
- **Perché:** separa fisicamente i due lavori del sito — rispondere e
  raccontare — invece di alternarli sezione dopo sezione.
- **Costo:** il lavoro di sviluppo più grosso delle tre. Il design system non
  ha una primitiva per una colonna sticky: va aggiunta, con il mapping
  documentato.
- **Rischio:** su desktop una colonna fissa può leggere come una sidebar da
  applicazione, che è esattamente il default di un'altra categoria. Serve
  disciplina per non farla diventare un pannello.

---

## Esito

**Scelta: A**, con i tre passi della soglia di B assorbiti in *Il posto*.
Ambito: home + `/menu` + `/visit`. Implementata il 13 settembre 2026.

## Raccomandazione (al momento della scelta)

**A**, con i tre passi della soglia di B assorbiti nella sezione *Il posto*.

Motivo: A è l'unica che risolve il problema numero uno dell'audit — il profilo
B che paga uno schermo per niente — invece di mitigarlo. B lo mitiga con un
chip. C lo risolve solo su desktop, che è il 26% del traffico.
Prendendo da B i tre passi numerati, si recupera la narrativa della soglia
senza rimettere `100svh` di foto davanti al menu.

C resta la più interessante sul piano del design, ed è la sola che produce un
pezzo riutilizzabile per il sistema. Se un giorno CS02 porta `/eventi` o un
canale WhatsApp, la colonna fissa diventa l'infrastruttura giusta.
Oggi costa troppo per quello che rende.

---

---

## Decisioni prese durante l'implementazione

### Hero → fascia d'ingresso
- **Default:** tenere l'hero a `100svh` e limitarsi a spostare il menu più in alto.
- **Invece:** `min-h-[max(35svh,340px)]`, mobile e desktop. Niente CTA, niente
  link secondario, niente indicatore di scroll, niente animazioni scaglionate
  a 400 e 800ms. Restano tre fatti: chi siamo, se siamo aperti, quanto valiamo.
- **Perché:** la CTA dell'hero puntava a `/#menu`, cioè serviva a saltare l'hero.
  Tolto il motivo per saltarlo, non serve più il bottone per saltarlo.
- **Costo:** la fotografia del cortile non è più la prima impressione piena.
- **Nota sul valore:** il lock dice 35svh. A 390px, 35svh sono 295px, e sotto i
  340 la foto smette di leggersi come un luogo e diventa una texture. Il
  pavimento in pixel è alzato a 340; la quota resta 35svh.

### Niente pulse infinito sul dot di stato
- **Default:** lasciarlo, è piccolo.
- **Invece:** rimosso. `DESIGN_SYSTEM.md` §7 vieta le animazioni infinite, e
  l'hero ne aveva cinque in contemporanea contro la regola "mai più di una".
- **Costo:** il badge attira un po' meno l'occhio. `aria-live` resta.

### Le cinque stelle sopra ogni recensione
- **Default:** tenerle, sono social proof.
- **Invece:** tolte. Erano quindici icone che dicevano tutte la stessa cosa.
  La valutazione compare una volta, con accanto il numero di recensioni.
- **Perché:** una stella su una recensione a 5 stelle non porta informazione.
  936 recensioni sì.
- **Precisazione:** "una volta sola" vale **dentro la sezione**. Sulla pagina la
  riga stelle + 4,7/936+ compare due volte, qui e nella fascia hero. La prima
  stesura di questa voce diceva "compare una volta" senza specificare, ed era
  imprecisa. Duplicazione nota, da decidere: vedi le decisioni aperte in fondo.

### Quattro densità, non tre
- **Default:** dare a *Il posto* e *Voci* lo stesso `py-20 md:py-28`, che è
  quello che era successo alla prima passata.
- **Invece:** `py-28 md:py-36` per *Il posto*, `py-16 md:py-20` per *Voci*.
  La pagina diventa: fascia stretta, menu stretto, *Il posto* ampio, *Voci*
  compatta, footer.
- **Perché:** *Il posto* è il respiro della pagina — il lock ne ammette uno solo
  per pagina, e questo è quello. *Voci* chiude, quindi sta fra il menu e la
  narrativa. Due sezioni di fila con lo stesso peso erano di nuovo una sola
  velocità di scorrimento, il difetto da cui era partito tutto l'audit.
- **Trovato da:** lo Stop hook, non da una rilettura.

### Scrim dell'hero — il testo non passava WCAG
- **Trovato da:** il critico cieco l'ha sospettato, `scripts/check-contrast.mjs`
  l'ha misurato. Il metodo: si nasconde il testo, si fotografa lo sfondo che
  c'era sotto, e si calcola il contrasto contro **ogni** pixel del riquadro,
  tenendo il peggiore. La media mentirebbe.
- **Prima:** marchio 1.41:1 su mobile e 1.28:1 su desktop (serve 3:1), tagline
  2.03:1 e 1.94:1 (serve 4.5:1). Il `text-shadow` non conta come contrasto.
- **Dopo:** 4.46 / 3.53 sul marchio, tutto il resto sopra 6.8:1.
- **Costo:** lo scrim pesa di più sulla metà bassa della banda. La fotografia si
  legge ancora — verificato guardando lo scatto — ma la fascia è più scura di
  prima. L'alternativa, se non piace, è uno scrim contenuto dietro il solo
  blocco di testo invece che su tutta la banda: si torna a una foto più chiara,
  ma ricompare il "chip" che l'hero originale aveva deliberatamente tolto.

### `h2-editorial` con `text-wrap: balance`
- **Default:** lasciar andare a capo il titolo dove capita.
- **Invece:** `text-wrap: balance` nell'utility, in `src/index.css`.
- **Perché:** ogni `h2` su due righe lasciava una parola orfana sulla seconda —
  "Heute aus der / Küche", "Der Hof hinter dem / Bogen", "Stimmen aus dem /
  Garten". Tre volte lo stesso difetto nella stessa pagina.

### Il CSS critico in `index.html` — bug di contrasto 1:1
- **Trovato guardando lo screenshot di `/visit`**, non leggendo il codice.
- Il blocco `<style>` inline in `index.html` non sta dentro un `@layer`, quindi
  **batte ogni utility di Tailwind, su ogni route**. Conteneva una regola `h1`
  scritta per il vecchio hero a schermo pieno: `color: #FAF7F3`,
  `text-shadow`, `text-align: center`, `font-size: clamp(3rem, 8vw, 6rem)`.
- Conseguenza: su `/visit`, `/menu`, `/about` e `/gallery` il titolo di pagina
  era **crema su crema, rapporto di contrasto 1:1**, leggibile solo grazie
  all'ombra. Nessuna classe nei componenti poteva correggerlo.
- Conseguenza secondaria: anche l'h1 della home prendeva la dimensione da lì,
  non dalle sue classi.
- **Fatto:** dalla regola `h1` restano solo `margin` e `line-height`. Colore e
  scala li decidono i componenti. `color: #1a1a1a` sul body sostituito con
  `#111E45` (`--navy-500`), il nero del brand. `animate-fade-in-hero` riportata
  da 1s a 400ms e resa sensibile a `prefers-reduced-motion`.

---

## Decisioni prese al banco (`lab.html`)

Cinque funzioni CSS che Tailwind espone, ognuna provata contro un difetto reale
del repo. Scatti prima/dopo in `output/lab/`.

### Promosse in produzione

**Subgrid sulle card dei piatti** — `grid-rows-subgrid` + `row-span-4`
- **Default:** pareggiare le altezze con `lg:min-h-[18rem]` e spingere gli
  allergeni in fondo con `mt-auto`, come era.
- **Invece:** il contenitore dichiara quattro righe, le card le ereditano.
- **Perché:** `18rem` era un numero inventato — con un nome corto restava un
  buco, con uno lungo la card sfondava. E l'etichetta della zuppa non stava
  sulla stessa linea dell'etichetta del piatto accanto. Negli scatti
  `output/lab/subgrid--1100--*.png` la differenza è netta.
- **Costo:** le quattro righe devono restare figli diretti della card, quindi
  il wrapper intermedio è sparito.

**`:has()` sul numero di colonne** — `has-[>*:only-child]`, `has-[>:nth-child(2):last-child]`
- **Default:** `lg:grid-cols-3` fisse, oppure un ternario su `dishes.length`.
- **Invece:** la griglia conta i propri figli in CSS.
- **Perché:** nei giorni in cui la cucina manda solo la zuppa restavano due
  colonne vuote e la card galleggiava a sinistra. È un difetto che si vede solo
  con dati reali, e i dati reali qui non sono raggiungibili: il banco è l'unico
  posto in cui è stato possibile vederlo.
- **Costo:** la regola vive nel foglio di stile. Chi cerca il perché nel JSX
  non lo trova — per questo c'è un commento sopra `dishes`.

**`text-pretty` sui paragrafi di corpo**
- **Default:** lasciare andare a capo come capita, o usare `balance` ovunque.
- **Invece:** `balance` resta sui titoli (`h2-editorial`), `pretty` va sul corpo.
- **Perché:** `balance` pareggia tutte le righe e su testi lunghi costa;
  `pretty` guarda solo le ultime e toglie la parola orfana in chiusura.

### Restano al banco — proposte, non fatte

**Container queries** — `@container` + varianti `@md:`
- `HomeMenuPreview.tsx` contiene **due** card di piatto quasi identiche: una per
  oggi, una semplificata per l'anteprima di domani. Esistono perché la card usa
  i breakpoint del viewport e non regge in una colonna stretta. Con
  `@container` ne basterebbe una.
- Non fatto qui: è un refactor che tocca anche `MenuSection.tsx`, e va valutato
  come giro a sé.

**`@starting-style`** — varianti `starting:` e `motion-reduce:`
- Sostituisce il pattern `useState` + `setTimeout` per le entrate di sezione,
  quello che il vecchio `Hero.tsx` usava con due timer e due cleanup. In più
  `motion-reduce:` spegne tutto in una parola, invece di dover ricordare di
  controllare il media query nel JS.
- Non fatto qui: oggi nessuna sezione ha un'entrata scaglionata, quindi non
  c'è niente da sostituire. Serve alla prossima che ne avrà bisogno.

---

## Deroghe registrate

`scripts/check-tells.sh` legge il blocco qui sotto. Una riga vale come deroga
solo se sta qui, quindi zittire un controllo costa esattamente quanto scrivere
perché — che è il punto. Formato: `percorso: CHECK, CHECK  # motivo`.
Il gate continua a elencarle a ogni giro sotto "deroghe registrate": restano
visibili, smettono solo di far fallire il controllo.

```deroghe
src/pages/AboutUs.tsx: S3, U1, U2, C1, VOICE   # giro dedicato, vedi Prossime decisioni #12
src/contexts/LanguageContext.tsx: VOICE        # righe 48/160, copy di /about ("einzigartig", "Learn more about Sri Chinmoy"): stesso giro dedicato di AboutUs.tsx sopra, non toccato in questa sessione
src/pages/Gallery.tsx: S3, U1, U2, C1          # stesso giro
src/pages/Login.tsx: U1, U2                    # area di servizio, fuori dal redesign
src/pages/OAuthConsent.tsx: U1, U2             # area di servizio, fuori dal redesign
src/components/MenuFloatingPill.tsx: U2        # overlay
src/components/CookieConsent.tsx: U2, U1, C1    # overlay; separatori funzionali nel testo legale
src/components/InstallPrompt.tsx: U1, U2       # overlay sopra il contenuto: l'ombra stacca dal piano, il bordo no
src/components/SkipLink.tsx: U1, U2            # overlay
src/pages/Impressum.tsx: U1, C1, VOICE         # pagina legale: il testo è dettato dalla legge austriaca
src/pages/Privacy.tsx: U1, C1                  # pagina legale
src/components/Hero.tsx: C1                    # "4,7 · 936+": un interpunto, verificato sullo scatto
src/components/Voci.tsx: C1                    # autore · data: due per viewport, verificato sullo scatto
src/components/menu/DishRow.tsx: C1            # separatore fra etichette dietary, uno per riga
src/components/MenuDishDetails.tsx: C1         # separatore nella nota allergeni
src/components/CTAEndBlock.tsx: S2             # il limite è per pagina: la home ne ha 2, /menu 1. Verificato sugli scatti
src/stories/tokens/Colors.stories.tsx: TOKEN   # pagina Storybook che documenta la palette: i valori hex sono l'etichetta di riferimento della swatch, non stile di un componente prodotto. Non entra nella build del sito.
.storybook/preview.tsx: TOKEN                  # config del background-switcher di Storybook, richiede hex letterali nell'API dello strumento. Non entra nella build del sito.
src/stories/tokens/Shadow.stories.tsx: TOKEN   # pagina Storybook che documenta le ombre sui primitivi (bg-white, text-navy-500): mostra il token, non è stile di prodotto. Emersa il 26/09/2026 quando TOKEN ha iniziato a vedere primitivi e bianco di default. Non entra nella build del sito.
```

### Perché `/about` e `/gallery` sono derogate e non corrette

Le ho toccate in questa sessione **solo** per l'accessibilità: diciassette
controlli sotto i 44px misurati, nessun contenuto e nessun copy. `CLAUDE.md`
recinta la route `/about`, e normalizzare dodici superfici, sei valori di
radius e il ritmo verticale è lavoro di design su una pagina che nessuno ha
ancora rivisto con il lock davanti. Non è una pulizia: è la stessa decisione
strutturale già presa sulla home, applicata dove non è stata applicata.

Va fatta prima del merge o subito dopo — quelle pagine vanno in produzione con
lo stesso push, e `/about` è la destinazione dell'unico link secondario della
home — ma va fatta guardando, non infilata in coda a un altro giro.

## Deroghe motivate nel testo

| Controllo | Dove | Perché resta |
|---|---|---|
| ~~`TOKEN colore Tailwind di default` 7×~~ | ~~`src/utils/menuIcons.tsx`~~ | **Risolto: il file è stato cancellato.** Era codice morto — zero riferimenti in tutto il repo, né import statici né dinamici né stringhe. Ridipingerlo con i token avrebbe lasciato 111 righe che non renderizzano niente, e la deroga avrebbe fatto scattare il gate a ogni giro. Una deroga che suona per sempre è rumore, e il rumore toglie credibilità al controllo. Git conserva il file. |
| `U2 bordo + ombra` su overlay | `InstallPrompt`, `MenuFloatingPill`, `SkipLink`, `CookieConsent` | Sono elementi che stanno **sopra** il contenuto, non sulla superficie cream. Lì l'ombra fa il lavoro che il bordo non può fare: staccare dal piano sottostante. Deroga motivata, non svista. |
| `S2 template di sezione` 3× | `IlPosto`, `Voci`, `CTAEndBlock` | Il limite è **per pagina**, lo script conta **per file**. La home ne ha due (`IlPosto`, `Voci`); il terzo è in `CTAEndBlock`, che dalla home è uscito e vive su `/menu`, `/about`, `/gallery`. Per pagina si è conformi. Lo script ora elenca i file quando scatta, così la deroga si valuta in un colpo d'occhio invece di doverla cercare. |
| ~~`TYPE scala`~~ | — | **Sostituita da una misura.** La vecchia deroga diceva "da rivedere schermata per schermata": era una promessa, non una ragione. Ora `scripts/check-targets.mjs` conta i px renderizzati dal testo visibile nel primo viewport. Il numero vero è sotto. |
| `U2 bordo + ombra` | `AboutUs.tsx`, `Gallery.tsx`, `Login.tsx`, `OAuthConsent.tsx` | Fuori dall'ambito di questa sessione (home, `/menu`, `/visit`). Da normalizzare quando si tocca quella route. |

---

## La scala tipografica, misurata

Il lock ammette **5 dimensioni per schermata**. Finora si contavano le classi
su tutto il repo, che è un altro numero e non voleva dire niente. Misurato sul
primo viewport a 390px, contando i px effettivi del testo visibile:

| Route | Dimensioni | Distribuzione |
|---|---|---|
| `/` | **9** | 48 · 36 · 24 · 18 · 16 · 14 · 12 · 11 · 10 |
| `/menu` | **8** | 36 · 30 · 18 · 16 · 14 · 12 · 11 · 10 |
| `/visit` | **9** | 36 · 30 · 20 · 18 · 16 · 14 · 12 · 11 · 10 |
| `/about` | **8** | 48 · 24 · 18 · 16 · 14 · 12 · 11 · 10 |
| `/gallery` | **9** | 48 · 36 · 20 · 18 · 16 · 14 · 12 · 11 · 10 |
| `/link` | **5** | 30 · 18 · 16 · 14 · 12 |

Il problema non sta nei titoli: sta in basso. **10, 11, 12, 14 e 16px sono già
cinque dimensioni** prima ancora di contare un titolo, e le differenze fra 10 e
11 e fra 11 e 12 non portano gerarchia — portano rumore.

Consolidare è lavoro di design che tocca ogni schermata, e cambia il lock.
Proposta, da decidere: micro-etichette **11px**, corpo piccolo **14px**, corpo
**16–18px**, più due taglie di titolo. Cinque, come dice il lock.
`/link` dimostra che si può.

## Segnalazioni — non toccate, servono una decisione

### 0 · Copy vietato renderizzato — chiuso il 20 settembre 2026, tranne /about

Corretto in sessione, verificato a schermo:
- `CTAEndBlock.tsx:50` `Jetzt anrufen` → `Anrufen`
- `CTAEndBlock.tsx:61` `Route anzeigen` → `Durch den Bogen, Mariahilferstraße 45`
- `Contact.tsx:97` `Route anzeigen` → `Durch den Bogen, Mariahilferstraße 45`
- `Link.tsx:12,13` `Jetzt anrufen`/`Route anzeigen` → numero reale / stesso testo di sopra
- `LanguageContext.tsx:117` `Jetzt Anrufen` → `Anrufen` (chiave morta, nessun componente la usa)
- `ReservationRequestForm.tsx` → cancellato, vedi §1 sotto

**Restano aperti, deliberatamente — stesso giro dedicato di `/about`:**
| File | Stringa |
|---|---|
| `AboutUs.tsx:166` | `Weiterlesen` |
| `LanguageContext.tsx:48` | `einzigartig` |
| `LanguageContext.tsx:160` | `Learn more about Sri Chinmoy` |

Nota: `Jetzt geöffnet` e `Jetzt geschlossen` **non** sono in lista e non lo
saranno: sono lo stato di apertura, cioè un fatto, non urgenza. Il gate
distingue per verbo.

### 1 · `ReservationRequestForm` — cancellato il 20 settembre 2026, non solo derogato

Prima correzione (righe `submit`/`error`/`rule`, Reservierung → Anfrage) aveva
lasciato in piedi codice morto: il form non era renderizzato da nessuna route
(`Contact.tsx:31` aveva `showReservationRequest = false`) ma restava nel repo
come se fosse un'opzione reale, con dentro anche il lato EN intero mai
corretto (`Book a table`, `Book now`). Decisione di Francesco: quella non è
una funzionalità del sito oggi, quindi non deve comparire nemmeno come
codice spento. Cancellato `src/components/ReservationRequestForm.tsx` e il
suo uso in `Contact.tsx`. La tabella IA di CLAUDE.md non elenca più
"form Anfrage" fra le funzioni di `/visit`. Il copy approvato §FORM
PRENOTAZIONE resta in CLAUDE.md come riferimento per un'eventuale
reintroduzione, ma non descrive più nulla di attivo.

### 2 · `tailwind.config.ts` non esiste
`CLAUDE.md` e `DESIGN_SYSTEM.md` lo indicano entrambi come "fonte della verità"
e "arbitro finale". Il progetto è su Tailwind v4 e i token stanno in
`src/index.css` come variabili `--font-*`, `--color-*`. Le due righe di
documentazione puntano a un file che non c'è.

### 3 · Copy rimasto orfano dalla fusione
Due paragrafi approvati, oggi non più in pagina. Restano in git, e sono
riutilizzabili:
- *"Wir kochen jeden Tag frisch. Morgens kommen Gemüse, Kräuter und Getreide in
  die Küche, mittags stehen die ersten Teller am Tresen."* (da `ValueProposition`)
- *"Jeden Tag kochen wir zwei Hauptgerichte und eine Suppe. Manchmal entscheidet
  die Saison, manchmal ein gutes Gemüse, das morgens in der Küche steht."*
  (da `ShowcaseSections`/1 — sarebbe un buon sottotitolo per la sezione menu,
  al posto di quello attuale)

Anche la citazione *"Kochen ein Gebet und Essen Dankbarkeit ist."* è uscita dal
corpo: era duplicata nel footer, che la porta già in Caveat.

### 4 · EN dei tre passi — ✅ approvato il 13 settembre 2026
Il DE viene verbatim da `CLAUDE.md` § "IL POSTO (3 step)". L'EN è stato
approvato in chat da Francesco ed è ora riportato in `CLAUDE.md` accanto al DE.
Scritto per pari ritmo, non come traduzione letterale:

| | DE (approvato) | EN (proposta) |
|---|---|---|
| 01 | Geh durch den Bogen | Walk through the arch |
| | Mariahilferstraße 45 — der Durchgang ist absichtlich versteckt. | Mariahilferstraße 45. The passage is hidden on purpose. |
| 02 | Durch den Innenhof | Across the courtyard |
| | Im Raimundhof — ein stiller Wiener Hof. | Into the Raimundhof, a quiet Viennese courtyard. |
| 03 | Setz dich. Bleib. | Sit down. Stay. |
| | Keine Eile. Dieser Ort ist gemacht zum Verweilen. | No rush. This place is made for staying a while. |

---

## Prossime decisioni, da registrare qui

- [x] Struttura homepage: A / B / C — **A, scelta da Francesco**
- [x] EN dei tre passi — **approvato da Francesco il 13 settembre 2026**
- [x] Tagline hero sostituita, hero senza CTA, bottom nav a 2 bottoni — **approvati da Francesco il 20 settembre 2026**, CLAUDE.md e DESIGN_SYSTEM.md riallineati al codice
- [x] Copy vietato renderizzato — chiuso tranne le 3 righe di `/about` (giro dedicato), vedi § Segnalazioni#0
- [x] La griglia a 3 colonne del menu — convertita in lista verticale su `HomeMenuPreview.tsx`, nessuna deroga necessaria
- [x] `ReservationRequestForm`: cancellato — non è una funzionalità attiva, non doveva restare come opzione spenta. Tabella IA di CLAUDE.md corretta di conseguenza (anche `/staff`, `/staff/login`, `/reservation-preview`: dichiarate attive ma inesistenti nel router — il vero percorso staff è `/login`)
- [x] Aggiungere Playwright a `package.json` — fatto per gli screenshot di `scripts/shoot.mjs`
- [ ] La riga stelle + 4,7/936+ compare due volte sulla home (fascia + Voci): tenere entrambe o ridurre la seconda a solo testo
- [x] `/menu`: le tab `HEUTE / DIESE WOCHE / IMMER DA` spariscono nello stato vuoto — lasciavano un vuoto verticale perché il `py-16 md:py-24` della sezione compensava l'altezza della barra tab, assente in questo stato; ora `py-10 md:py-14` quando non ci sono tab. `WeeklyMenuPendingUpdate.tsx` non è più `text-center`: un `max-w-md` provato per restringere la card ha invece attivato il `lg:justify-center` del grid genitore (track che si adatta al max-content e si centra) — rimosso, la card ora riempie la colonna come le altre. Nuovo stato `menu--vuoto` in `shoot.mjs` per riverificarlo
- [ ] `/menu`: due formati di prezzo sulla stessa pagina (`6,90` scritto a mano nel JSX, resto dei prezzi ora normalizzato a 2 decimali in `klassikerData.ts`)
- [ ] Consolidare la scala tipografica: 9 dimensioni sulla home contro le 5 del lock (tabella qui sopra)
- [ ] Sottotitolo della sezione menu: tenere quello attuale o usare il paragrafo orfano
- [ ] Dove vivono i badge vegano e bio quando il menu del giorno manca
- [ ] Allineare `CLAUDE.md` e `DESIGN_SYSTEM.md`: `tailwind.config.ts` non esiste
- [ ] Normalizzare radius e bordo+ombra su `/about` e `/gallery`
- [ ] Scrim dell'hero desktop, ipotesi "pannello": non riprodotta nel primo giro, non toccata
- [x] **Secondo giro di critica: 57/100** (da 47/100). Contrasto della nav sull'hero fuori soglia (3,4-4,0:1 misurato a pixel, serve 4,5:1) — corretto: `before:from-foreground/72 before:via-foreground/40` in `Navigation.tsx` (era `/55` e `/25`), riverificato a pixel dopo il fix (minimo 4,99:1). `scripts/check-contrast.mjs` non copre la nav (misura solo dentro `<h1>`'s closest `<section>`, la nav è un `<nav>` fratello) — gap noto, non chiuso
- [x] Installato `pngjs`, mancava per far girare `check-contrast.mjs`
- [x] Legenda allergeni (introdotta in questa sessione): 3 interpunti in un viewport, sopra il limite di 2 — separatore cambiato da `·` a `,`
- [x] `DishRow.tsx`/`DietaryBadges.tsx`: la classe CSS `lowercase` minuscolizzava anche "Zutaten" (sostantivo tedesco, va sempre maiuscolo) — rimossa, le stringhe sorgente erano già corrette
- [x] Logo Supermind invisibile su cream (inchiostro quasi bianco, 240/240/240 misurato) — chip di sfondo `bg-primary` solo su quel logo. `tripadvisor.png` non aveva trasparenza (sfondo bianco opaco, unico dei 4) — rimossa via script
- [x] Footer centrato su ogni pagina — **impaginazione decisa da Francesco il 22/09/2026 guardando il sito in locale**, dopo due tentativi miei che ha giudicato brutti. Il primo (tutto a sinistra, ma firma del brand centrata dentro una colonna stretta a sinistra) non era né centrato né allineato: il titolo galleggiava rispetto a indirizzo e orari. Il secondo (tre colonne) usava la larghezza ma non gli piaceva. Forma finale: firma centrata in alto, sotto due gruppi affiancati (dove siamo e quando · dove seguirci e il legale, allineato a destra), copyright centrato. È una **deroga consapevole** alla regola del corpo sempre a sinistra: qui il footer è una chiusura simmetrica, non corpo di lettura. Tolto anche il padding orizzontale dai link, che faceva partire i testi da x diverse: il target da 44px lo garantisce `min-h`, e ogni voce è già più larga di 44px
- [ ] Il gate non ha mai segnalato nessuno dei due difetti di allineamento del footer né il bordo destro frastagliato della home: controlla radius, colori e lessico, non i rapporti fra elementi vicini. Valutare se è un buco da colmare o se è giusto che resti un giudizio a occhio
- [x] `/menu`: "Heute aus der Küche" e il primo giorno di "Unser Wochenmenü" sono lo stesso contenuto (Mittwoch ripetuto) — il giorno corrente ora è filtrato dalla lista settimanale, indice originale conservato per `getDateForMenuDay()` (filtro dopo aver abbinato day+index, non prima)
- [x] `/visit` mobile: "Route in Google Maps öffnen" duplicava "Route" della MobileStickyBar allo stesso scroll (~340px) — verificato sulla build di produzione, non solo in dev (React StrictMode falsava l'indagine). Nascosto su mobile via useIsMobile, resta su desktop dove non c'è barra fissa. "Karte laden" non toccato, azione diversa
- [x] `/visit` desktop: 597px di colonna vuota sotto il placeholder mappa — causa isolata dentro MapConsentGate.tsx (mancava h-full), non nella grid esterna. Contact.tsx: wrapper ad altezza fissa lg:h-[520px] invece di min-height; MapConsentGate.tsx: h-full ripristinato, sicuro ora che il genitore non si allunga più a oltranza
- [x] `klassikerData.ts`: 9 `descriptionShort` erano un terzetto automatico, vietato da voice-spec — discusso con Francesco: il campo non descriveva nulla che la `description` sopra non dicesse già (stessa card, due righe, stessa informazione). Rimosso il campo intero — dall'interfaccia, dai 13 dati, da `MenuDishDetails.tsx`, dai due punti in `MenuSection.tsx` che lo passavano, e dai due `MenuItemMeta` (useWeeklyMenu.ts, googleSheetsService.ts) dove esisteva nel tipo ma non veniva mai valorizzato dal foglio — non solo riscritto a 2 parole, come per `ReservationRequestForm`
- [x] Stato chiuso (home e /menu): non dice quando si riapre — voice-spec ha già la coppia pronta ("Heute geschlossen. Morgen ab 11:00 wieder da."). Aggiunto un calcolo del giorno di riapertura che salta la domenica (se "domani" è domenica, si riapre lunedì). In `MenuSection.tsx` corretta anche l'etichetta del giorno della settimana senza dati: diceva "Heute geschlossen" per un giorno che non è oggi e di cui semplicemente non sappiamo ancora il menù — ora "Noch keine Angabe"/"Not listed yet"
- [x] Aggiunto `npm run dev:all` (richiesta di Francesco): avvia `vite` e `storybook dev` insieme via `concurrently`, entrambi con il proprio HMR
- [x] DESIGN_SYSTEM.md e Storybook riallineati al codice di questa sessione (richiesta di Francesco, dopo il giro di critica): §3 Badge menu e dietary e §6 Menu card non descrivono più `--badge-zuppa-bg`/`--badge-verde-bg`/`--badge-blu-bg` come se fossero usati (sono dead token, spostati in §9); nuova sezione §6 Categoria piatto che documenta il pattern reale (testo, non pill, duplicato in 4 punti, il prop `kicker` di DishRow.tsx non è usato da nessuno di questi); nuove sezioni §6 Footer e Consenso mappa; data di verifica aggiornata. `CategoryBadge.stories.tsx` aveva un commento sbagliato (dichiarava il prop `kicker` "fonte di verità" quando nessuna chiamata reale lo usa) — corretto. `DietaryBadges.tsx` aveva un commento con la vecchia spec (`lowercase`, rimossa il 20/09) — corretto, e aggiunta la sua prima story (`DietaryBadges.stories.tsx`). `Navigation.stories.tsx` descriveva ancora una "bottom nav" che non esiste nel componente — corretto per rimandare a MobileStickyBar (senza story propria: dipende da scroll+consenso, non riproducibile in una preview statica senza mock)
- [x] Categoria del piatto: due componenti diversi per lo stesso dato (pill su /menu, testo inline su home) — home, `WeeklyDishRow` e `DishRow.tsx` (fonte di verità dichiarata in `CategoryBadge.stories.tsx`) usavano già il testo inline; le card "Heute aus der Küche" e "Vorschau" di `MenuSection.tsx` avevano invece la pill con bordo+sfondo, rimossa a favore del pattern inline esistente
- [x] `/visit`: card annidate a tre livelli (Barrierefreiheit dentro Zugang dentro la sezione) — la card "Barrierefreiheit" (bordo+sfondo) dentro "Zugang vor Ort" è diventata una sottosezione con una sola linea divisoria, come già altrove nel sito (No-Line Rule)
- [x] `NotFound.tsx` (404): **Default:** era ancora lo scaffold di partenza — "Oops! Page not found", solo inglese, `bg-muted`/`text-muted-high-contrast` primitivi, nessun token, nessuna Navigation/Footer, un solo link nudo. **Invece:** riscritta con Navigation + Footer, eyebrow "404" + `h2-editorial`, copy bilingue che riprende la tagline hero approvata ("Das Restaurant, das du fast nicht findest" → "Diese Seite ist noch besser versteckt als wir. Dieser Weg führt ins Leere — der zum Garten nicht."), CTA `Button` verso `/`. **Perché:** trovata nell'audit "conoscenza di mestiere" (Notion) sui tell del copy generico — l'unica pagina del sito senza tedesco, e una vera pagina che un visitatore può incontrare, non un caso teorico. Copy nuovo approvato da Francesco in chat tra due opzioni proposte, il 23/09/2026. **Costo:** nessuno — nessun'altra pagina referenzia questi stessi stili
- [x] **Bug: nessun modo di chiamare da desktop, su tutto il sito.** L'opzione A "Il bancone" (sopra) rimuoveva `CTAEndBlock` dalla home assumendo che "la barra fissa fa già chiama + indicazioni" — vero solo su mobile: `MobileStickyBar.tsx` fa `if (!isMobile) return null`. Lo stesso ragionamento era stato applicato all'header di `/visit`. Risultato: home, `/visit` e `/menu` (quest'ultima aveva solo `show={["directions"]}`, mai il call) non avevano nessun link `tel:` visibile da desktop — zero, non un caso limite. Bug segnalato da Lovable il 24/09/2026. **Fix:** non ripristinato pagina per pagina — aggiunto un link "Anrufen"/"Call" compatto nella `Navigation.tsx` desktop (`lg:flex`, accanto al language switcher), unico posto che copre tutte le pagine in un colpo, incluso `/menu` che nessuno aveva notato mancante. Usa lo stesso `data-call-source` tracciato da `trackTelClicks.ts`, già esistente. Commenti in `Index.tsx` e `Contact.tsx` corretti per non ripetere l'assunzione sbagliata
- [x] **Struttura `/en/` e suggerimento lingua (26/09/2026).** Search Console (Controllo URL, test live) mostrava `lang="en"` su `/` e `/menu`: Googlebot renderizza in `en-US` e il sito sceglieva la lingua da `navigator.language` sullo stesso URL, quindi Google leggeva solo l'inglese anche per il mercato austriaco (73%). Scelta A approvata da Francesco: tedesco alla radice, inglese sotto `/en/`, lingua decisa solo dall'URL (`src/lib/i18nRoutes.ts`), hreflang reciproco de/en/x-default in `SEOHead.tsx` e nella sitemap. Nessun URL esistente cambia.
  **Rilevare la lingua del dispositivo — Default:** redirect automatico da `/menu` a `/en/menu` se il dispositivo è in inglese, oppure banner "Switch to English". **Invece:** tre livelli. (1) hreflang: chi cerca in inglese riceve da Google direttamente `/en/…`. (2) Scelta esplicita salvata (`msg_language_choice`, solo dopo un tocco su DE/EN): all'atterraggio `applyStoredLanguageChoice()` riscrive l'URL prima che React parta. (3) Su mobile, dispositivo non tedesco e nessuna scelta salvata: pulsante tondo "EN" nella top bar, dove oggi c'era solo lo spazio che centra il logo. **Perché:** il redirect per lingua del dispositivo rimanderebbe anche Googlebot (`en-US`) su `/en/`, e il tedesco sparirebbe di nuovo dall'indice; escludere Googlebot per user agent è cloaking. Il banner viola "il sito accoglie, non cattura". Su mobile (82% del traffico) il selettore DE/EN stava solo dentro il drawer, cioè invisibile a chi atterra. Googlebot non ha memoria tra le visite, quindi il livello 2 non lo tocca mai. **Costo:** il turista col browser in inglese che arriva dalla scheda Maps vede comunque prima il tedesco, e deve toccare "EN" una volta; da lì il sito se lo ricorda. Desktop invariato: il selettore era già sempre visibile nella nav. Copy nuovo: nessuno ("EN" e aria-label "English" esistono già nel selettore). Le versioni inglesi di title e description di default in `SEOHead.tsx` sono invece testo nuovo, da approvare.
  **Controlli della top bar mobile riallineati al design system (26/09/2026, scritto prima del codice).** Il giro precedente aveva messo il pulsante "EN" copiando le classi del selettore DE/EN esistente, non da `DESIGN_SYSTEM.md`.
  - *Token.* **Default:** copiare le classi del vicino (`border-border/75`, `bg-card/90`, `text-primary`). **Invece:** i token pieni di §3 e del Ghost di §6, cioè `border border-border`, `bg-card` e `text-foreground`. **Perché:** le opacità arbitrarie non sono token, e il testo primario è `text-foreground`, mentre `text-primary` è un colore d'azione. **Costo:** il selettore nel drawer resta com'è, con la vecchia deriva, fuori da questo giro.
  - *Focus.* **Default:** `focus:outline-hidden` più un anello `ring-primary/50` per ogni componente. **Invece:** nessuna classe, così vale la regola globale di §8 (`outline 2px hsl(--focus-ring)`, offset 2px). **Perché:** l'anello al 50% è più debole della regola di sistema e la sostituiva. **Costo:** nessuno.
  - *Hamburger sull'hero.* **Default:** tenere il vetro (`bg-background/25` + blur) accanto al disco pieno "EN". **Invece:** entrambi i controlli usano la stessa superficie piena `bg-card` e lo stesso bordo, sia sull'hero sia a nav scrollata. **Perché:** sono due controlli gemelli nella stessa barra, stessa misura e stessa forma. Il vetro sull'hero dava 3.0:1 al testo "EN" (misurato), e §3 elenca "Overlay" come gap, cioè superficie non tokenizzata. **Costo:** sull'hero spariscono le trasparenze e i due dischi si staccano di più dalla foto.
  - *Press.* **Default:** `active:scale-[0.98]` come in §6 Bottoni. **Invece:** niente. **Perché:** §7 dice "mai zoom" e il budget di movimento del lock non lo prevede. Le due regole si contraddicono e vince quella di movimento. **Costo:** nessun feedback tattile oltre al cambio colore.
  - *Radius.* `rounded-full` resta: 44×44 è un disco, che il lock ammette come pill/dot.
  - *Giro successivo: critico cieco 61/100 (numero del giro).* Due correzioni nel perimetro di questo lavoro. (1) **Default:** `outline-offset: 2px` globale di §8. **Invece:** `focus-visible:outline-offset-0` sui due dischi. **Perché:** con 2px di offset l'anello navy cade sullo scrim scuro dell'hero, misurato 1.6:1, contro il 3:1 richiesto ai componenti. Appoggiato al disco crema è leggibile. **Costo:** su questi due controlli l'anello tocca il bordo invece di staccarsene. (2) **Default:** `text-xs` per dare a "EN" il peso ottico dell'icona hamburger. **Invece:** `font-bold` a `text-[11px]`, come il badge aperto/chiuso di §6. **Perché:** `text-xs` sarebbe una dimensione in più in un file che è già a 6, contro le 5 del lock. **Costo:** l'altezza maiuscola resta quella di prima, cresce solo lo spessore del tratto.
- [x] **Top bar e drawer mobile: stabilità, tastiera, forma (26/09/2026, scritto prima del codice).** Sono i quattro punti del critico cieco (61/100), approvati da Francesco in chat.
  - *Margine.* **Default:** `px-4` ereditato. **Invece:** `px-5` sotto `sm`, come §6 Top bar. **Perché:** con `px-4` il bordo del disco sta a 16px e il testo della home a circa 20px, quindi i due fili non si incontrano. **Costo:** 4px in meno al logo centrale.
  - *Altezza e movimento.* **Default:** la barra passa da 72 a 60px allo scroll, con `transition-all duration-slow`, e logo e wordmark si rimpiccioliscono con transizioni proprie. **Invece:** stessa altezza nei due stati (60px su mobile, come §6), logo e wordmark a misura fissa, e un solo cambio di stato: `transition-colors duration-base` su barra, wordmark e voci. **Perché:** §7 "mai più di un'animazione contemporaneamente", e §6 prescrive "250ms ease, solo background". I colori del testo seguono lo sfondo nello stesso tempo, altrimenti per 250ms si avrebbe testo bianco su crema. **Costo:** l'hero perde il respiro della barra più alta, e a nav scrollata il logo resta alla misura dell'hero.
  - *Drawer da tastiera.* **Default:** apertura senza gestione del focus, Escape ignorato, la barra resta raggiungibile col Tab sotto il pannello. **Invece:** il focus va sulla X del drawer e torna all'hamburger alla chiusura. Escape chiude. Il Tab resta dentro il pannello (`role="dialog"`, `aria-modal`). La barra diventa `inert` mentre il drawer è aperto, così anche "EN" smette di coesistere col selettore DE/EN. Poi `aria-controls` sull'hamburger. **Perché:** WCAG 2.2 AA 2.4.11 falliva: il focus restava coperto dal pannello (verificato col render dal critico). **Costo:** nessuno visibile.
  - *Hamburger senza stato X.* **Default:** l'icona passa a X quando il menu è aperto. **Invece:** icona `Menu` fissa, etichetta fissa "Menü öffnen"/"Open menu", `aria-expanded` resta. **Perché:** a drawer aperto il pulsante sta sotto il pannello e non si vede mai; lo stato X esisteva solo nel codice. **Costo:** nessuno.
  - *X del drawer.* **Default:** quadrato `rounded-lg` senza bordo, anello di focus proprio. **Invece:** lo stesso disco dell'hamburger, cioè `rounded-full border border-border bg-card`, e il focus globale di §8. **Perché:** apertura e chiusura dello stesso pannello devono avere la stessa forma. **Costo:** nessuno.
  - *Pannello.* **Default:** `shadow-2xl` + `border-r`. **Invece:** solo `border-r border-border`. **Perché:** bordo e ombra sulla stessa superficie è un fallimento duro del lock, e il backdrop scuro stacca già il pannello. **Costo:** il pannello sembra meno "sollevato".
  - *Copy approvato in chat:* aria-label "English version" sul pulsante "EN". "Close menu" come unica chiusura inglese, al posto di "Close navigation menu".
- [x] **Top bar e drawer, giro verso 70 (26/09/2026, scritto prima del codice).** Critico cieco: **49/100**, ambito allargato a drawer e selettore lingua. Qui c'è il Giro 1, i punti che non richiedono decisioni di Francesco. Etichetta di pagina e telefono nel drawer restano in attesa (`docs/stato-aperto.md`).
  - *Selettore DE/EN nel drawer.* **Default:** il gruppo esistente, con `border-border/75 bg-card/90 shadow-xs backdrop-blur-md` e pulsanti `h-10`. **Invece:** `border border-border bg-card` senza ombra né blur, gruppo `h-12`, pulsanti `h-11`, inattivi in `text-foreground`. **Perché:** bordo + ombra è un fallimento duro, i pulsanti da 40px stanno sotto i 44 di §8, e l'ombra era nero puro, non un'ombra di sistema. **Costo:** il gruppo diventa 4px più alto. La variante desktop (`navbar`) resta com'è, fuori dall'ambito.
  - *Barra sotto il drawer.* **Default:** `isHeroOverlay` diventa falso quando il drawer si apre, quindi la barra passa a crema sotto il backdrop. **Invece:** la barra resta nello stato in cui era. **Perché:** barra, backdrop e pannello si animavano insieme (§7). La barra è `inert` e coperta: non c'è motivo che cambi. **Costo:** nessuno.
  - *Scrim dell'hero.* **Default:** il gradiente `before:` compare e sparisce con la classe, di colpo, mentre lo sfondo sfuma in 250ms. **Invece:** lo scrim c'è sempre e passa di opacità nello stesso tempo dello sfondo. **Perché:** a metà transizione il testo bianco restava su foto senza scrim. **Costo:** nessuno.
  - *Barra scrollata.* **Default:** `bg-background backdrop-blur-2xl border-border/60`. **Invece:** `bg-nav-surface backdrop-blur border-border`, come §6. La soglia di scroll resta 28px e si corregge §6, che diceva 150 senza che fosse mai stato vero. **Perché:** §6 è dichiarato "verificato contro il codice", quindi uno dei due mentiva. 28px fa lasciare l'hero appena si scorre, e cambiarla ora sarebbe una decisione di comportamento non richiesta. **Costo:** nessuno visibile.
  - *Focus del logo sull'hero.* **Default:** `ring-primary/50`, misurato 1.14:1 sullo scrim. **Invece:** l'outline globale di §8, bianco (`outline-primary-foreground`) quando la barra è sull'hero. **Perché:** è l'unico controllo della barra senza focus leggibile. Sul navy dello scrim serve il colore chiaro. **Costo:** l'anello cambia colore tra hero e barra scrollata.
  - *Drawer: colori e stato attivo.* **Default:** link in `text-primary/85`, stato attivo con la pill `bg-muted` (1.07:1 sullo sfondo), etichetta di pagina `text-[10px]` in `text-primary/85`. **Invece:** link in `text-foreground`; attivo con la stessa lineetta verde da 2px della nav desktop più `font-semibold`, testo sempre navy (`text-accent` misurato 4.37:1 a 14px, sotto AA); etichetta a `text-[11px]` in `text-foreground`. **Perché:** le opacità non sono token, 10px è fuori dalla scala del lock, e §3 dà il verde al "nav attivo". Mobile e desktop segnalano "sei qui" allo stesso modo. **Costo:** la pill sparisce; resta `hover:bg-muted`.
  - *Scroll e target.* Il drawer blocca lo scroll della pagina finché è aperto: è un `aria-modal`, e la pagina sotto non deve scorrere. Il link logo nell'header del drawer passa a `min-h-11` (era 40px). Il doppione logo/"Home" resta e va deciso insieme all'etichetta di pagina.
  - *Controllo automatico.* `check-tells.sh` U2 legge anche i template literal `` className={`...`} ``. Prima era cieco a tutta la Navigation, e il suo verde su bordo + ombra era falso.
- [x] **Top bar e drawer, giro 2 (26/09/2026, scritto prima del codice).** Critico cieco: **50/100**. Gate a11y rosso su tre punti misurati. Qui correggo quelli che non dipendono da decisioni di Francesco.
  - *Focus dopo un cambio di route.* **Default:** nessuno, il focus finiva su `<body>` (il commento nel codice diceva il contrario). **Invece:** a ogni cambio di percorso il focus va su `#main-content`, senza scroll. Aggiunto `tabIndex={-1}` alle tre `<main>` che non l'avevano (Impressum, Privacy, NotFound). **Perché:** §8, "il focus si sposta in cima al nuovo contenuto". **Costo:** nessuno.
  - *Drawer con "riduci movimento".* **Default:** `duration-0` sull'apertura. **Invece:** `transition-none` all'apertura, e in chiusura visibility sulla stessa durata dello slide (`duration-slow`, era `base`: il pannello spariva a metà corsa). **Perché:** la regola globale di `prefers-reduced-motion` forza 100ms `!important` e annullava `duration-0`, quindi il focus non entrava nel dialog proprio per chi ha chiesto meno movimento. **Costo:** nessuno.
  - *Pagina sotto il drawer.* Oltre alla barra, diventano `inert` anche `#main-content`, il footer e lo skip link. **Perché:** Shift+Tab usciva sotto il modale.
  - *Nero puro.* `drop-shadow` in `rgba(0,0,0,.35)` su wordmark e voci desktop diventa `--navy-500` a 0.35. `check-tells.sh` TOKEN ora cerca anche `rgba(0,0,0`. **Perché:** "mai #000000" vale anche scritto in rgba.
  - *Logo.* Il wrapper di `Logo.tsx` diventa `shrink-0` (a 320px su /about il logo era ovale, 32×40) e gli attributi extra vanno all'`<img>`: `aria-hidden` passato dalla nav prima veniva perso.
  - *Drawer allineato alla barra.* **Default:** header alto 93px, X a y=24 contro l'hamburger a 7.5; voci col testo a 40px dal bordo, logo a 24. **Invece:** header alto 60px come la barra, X sulla stessa riga dell'hamburger; testo delle voci, logo e "Sprache" sullo stesso filo di 20px dei dischi. **Perché:** apertura e chiusura nello stesso punto; un solo filo sinistro. **Costo:** l'header del drawer è più basso.
  - *Safe area.* La barra, l'header e il footer del drawer rispettano `env(safe-area-inset-*)`. **Perché:** `index.html` ha `viewport-fit=cover` e il manifest è `standalone`: nella PWA installata l'hamburger finiva sotto la Dynamic Island e il selettore lingua sull'home indicator. In un browser normale `env()` vale 0 e non cambia niente.
  - *Slide orizzontale del drawer: deroga registrata.* Il budget del lock è `translateY(8px)`, ma un pannello laterale che entra in verticale non si capisce. Resta lo slide da sinistra (`duration-slow`) con il backdrop in dissolvenza nello stesso gesto. Vale come un'unica animazione: una sola causa, un solo gesto, stessa fine.
  - *Selettore DE/EN: il disco pieno resta.* Il critico propone di segnalare la lingua attiva come la pagina attiva (lineetta). **Non lo faccio:** un selettore a due opzioni mostra entrambe e ha bisogno di un pieno per dire quale vale. Con la sola lineetta, DE ed EN si leggono come due link. È comunque `bg-primary`, token d'azione, non il verde della CTA.
  - *In attesa di Francesco:* etichetta di pagina (causa anche il fallimento WCAG 2.5.3, "SPEISEKARTE" visibile con nome accessibile "Zur Startseite"), telefono nel drawer, ordine delle voci, `aria-label` del selettore in tedesco, "Visit" contro "Besuche uns".
- [x] **Top bar e drawer, giro 3: decisioni A, B, C (26/09/2026, approvate da Francesco in chat, scritto prima del codice).**
  - *A. Etichetta di pagina accanto al logo.* **Default:** tenerla ("HOME", "SPEISEKARTE" accanto al logo, arrivata con un commit Lovable e mai registrata). **Invece:** su mobile c'è solo il logo, centrato. **Perché:** ripeteva l'h1 della pagina (S6), veniva troncata già a 390px, spostava il logo fino a 40px da una route all'altra, e falliva WCAG 2.5.3: si leggeva "SPEISEKARTE" ma il nome accessibile era "Zur Startseite", e il link portava alla home. **Costo:** su mobile la barra non dice più dove sei; lo dice l'h1 sotto. Il logo passa da 40 a 44px, la misura dei due dischi: 40 accanto a 44 si leggeva come un errore.
  - *Nome del link logo.* "My Secret Garden, Startseite" / "My Secret Garden, home" (copy approvato), nella barra e nel drawer. Contiene il testo visibile del wordmark (da `sm:` in su e nel drawer), quindi passa 2.5.3.
  - *B. Telefono nel drawer.* **Default:** un bottone verde "Anrufen", come nella nav desktop. **Invece:** il numero come link testuale (`tel:`), sotto le voci, sullo stesso filo di 20px. **Perché:** CLAUDE.md dice che il telefono è sempre il canale suggerito, e su mobile nei primi 300px di scroll non c'era da nessuna parte. Un bottone verde competerebbe con la MobileStickyBar, che ha già l'azione primaria "Anrufen". Il numero è anche l'etichetta: nessuna icona (U3), nessuna parola nuova. `data-call-source="drawer"` per `click_call`. **Costo:** il drawer ha un elemento in più.
  - *C. Ordine delle voci.* **Default:** Home, Speisekarte, Galerie, Unsere Geschichte, Besuche uns. **Invece:** Home, Speisekarte, Besuche uns, Galerie, Unsere Geschichte. **Perché:** il profilo A decide se venire oggi, e "Besuche uns" risponde a quella domanda; la galleria no. L'ordine vale anche per la nav desktop, che usa la stessa lista: due ordini diversi per la stessa navigazione sarebbero un'incoerenza. **Costo:** chi era abituato all'ordine vecchio lo ritrova cambiato.
  - *Selettore lingua.* `aria-label` "Sprache wählen" / "Choose language" (copy approvato), invece di "Language selection" in inglese anche sulle pagine tedesche.
- [x] **Top bar e drawer, giro 4 (26/09/2026, scritto prima del codice).** Critico cieco: **56/100** (giri precedenti 49 → 50). Qui ci sono i punti del brief che non chiedono decisioni.
  - *Tocco sulla pagina corrente.* **Default:** le voci e il logo del drawer chiudono con `setIsMobileMenuOpen(false)`. **Invece:** se la destinazione è la pagina in cui sei, si chiude con `closeMenu()` e il focus torna all'hamburger. **Perché:** il percorso non cambia, quindi il focus su `<main>` non scatta: finiva su `<body>` (verificato dal critico).
  - *Area del link logo.* **Default:** `flex-1` sul `<Link>`, cioè 230×52 cliccabili per un'immagine di 44px. **Invece:** `flex-1` su un contenitore, e il link grande quanto il logo. **Perché:** un tocco nello spazio vuoto della barra portava alla home, e l'anello di focus era un rettangolo da 230px attorno a un disco. **Costo:** nessuno.
  - *Durata del backdrop.* `duration-base` → `duration-slow`, come il pannello. La deroga del giro 2 parlava di "stessa fine", ma il backdrop finiva 150ms prima.
  - *Logo del drawer.* 40 → 44px, come nella barra e come la X accanto.
  - *Telefono vicino alle voci.* **Default:** `<nav>` in `flex-1`, telefono spinto in fondo sopra la lingua, 367px più sotto dell'ultima voce. **Invece:** il telefono subito sotto le voci; lo spazio flessibile sta tra il telefono e il selettore lingua. **Perché:** in fondo si leggeva come una nota a piè di pagina, mentre CLAUDE.md lo chiama canale primario. **Costo:** il vuoto resta, ma sotto le cose che contano invece che in mezzo.
  - *Hover delle voci.* Toglie `hover:bg-muted` (1.07:1, lo stesso valore per cui era stato scartato come stato attivo). Resta la sottolineatura globale dei link: un segnale solo.
  - *Selettore DE/EN.* Gruppo `h-[52px] p-1`: con `h-12 p-0.5` la pill piena toccava quasi il bordo e si leggeva come un doppio anello.
  - *Token.* Il testo inverso sull'hero passa da `text-background` (superficie) a `text-primary-foreground` (§3). Il `drop-shadow` usa `--foreground` invece del primitivo `--navy-500`. In `Logo.tsx`, `text-white` e `text-muted-high-contrast` diventano `text-primary-foreground` e `text-muted-foreground`. `check-tells.sh` ora cerca anche `var(--navy-`/`var(--verde-`/`var(--cream-` e `text-white` nei componenti.
  - *Deroga registrata: opacità di scrim e backdrop.* `from-foreground/72 via-foreground/40` (scrim dell'hero) e `bg-foreground/50` (backdrop del drawer) restano inline. **Perché:** §9 elenca `--surface-overlay` come gap, e aggiungere un token a `src/index.css` richiede istruzione esplicita di Francesco. Il giorno che lo decide, queste tre righe sono le prime da portare sul token.
- [x] **Top bar e drawer, giro 5 (26/09/2026, scritto prima del codice).** Critico cieco: **55/100**, stabile rispetto al 56 precedente. Qui ci sono solo i fallimenti del gate a11y e due pulizie senza decisioni. Il resto va a Francesco (`docs/stato-aperto.md`).
  - *Drawer scorrevole.* **Default:** pannello `h-dvh` senza overflow. **Invece:** `overflow-y-auto overscroll-contain`. **Perché:** in orizzontale (844×390) e con testo al 200% il selettore lingua finiva fuori schermo e non si raggiungeva, con la pagina sotto bloccata (WCAG 1.4.4, 1.4.10).
  - *Banner cookie.* **Default:** contenitore `fixed` largo tutto lo schermo che riceve i tocchi. **Invece:** `pointer-events-none` sul contenitore e `pointer-events-auto` sulla card. **Perché:** al primo accesso in orizzontale il contenitore trasparente intercettava il tocco sull'hamburger. Il banner resta identico, cambia solo dove cadono i tocchi.
  - *Filetto sopra "Sprache".* Tolto il `border-t`: sopra c'è già lo spazio vuoto, quindi non separava niente (lock, "un filetto che non separa niente").
  - *Selettore lingua.* `lang` su ciascun pulsante (DE si legge con voce tedesca, EN con voce inglese) e `type="button"`. Tolto `hover:text-primary` su testo già `text-primary`, che non cambiava niente.
- [x] **Drawer, giro 6: il dato di oggi e l'header (27/09/2026, approvato da Francesco in chat, scritto prima del codice).** Critico cieco del giro prima: **55/100**, con la genericità (peso ×3) ferma a 5/10: "coprendo il logo è la nav di chiunque".
  - *Lo stato di oggi nel drawer.* **Default:** un drawer di sola navigazione (cinque voci e la lingua), cioè lo schema di qualsiasi sito, con 385px vuoti in mezzo. **Invece:** sotto le voci, un blocco "oggi" con lo stato del locale e il telefono. Lo stato è "Heute bis 19:00 geöffnet", "Heute ab 11:00 geöffnet", "Heute geschlossen" oppure "Jetzt geschlossen", e viene dallo stesso calcolo del badge dell'hero (`getOpenStatus` + `useTodayClosed`, festivi e menu vuoto compresi). **Perché:** il direction lock dice che la pagina la porta il dato, e questo è l'unico dato che solo questo sito ha e che cambia ogni giorno. È anche la domanda del profilo A: "se vengo adesso, è aperto?". **Costo:** il drawer legge il menu (cache di 5 minuti). Il componente viene montato solo a drawer aperto, quindi non c'è un fetch per ogni pagina. Durante il caricamento la riga non compare, per non mostrare uno stato sbagliato.
  - *Header del drawer.* **Default:** logo e wordmark cliccabili a sinistra, X a destra. **Invece:** solo la X, a sinistra, nel punto esatto in cui c'era l'hamburger (x=20, y=7.5). Niente filetto sotto. **Perché:** chi ritoccava lo stesso punto per chiudere finiva sulla home, perché lì ora c'era il logo. Il logo nel drawer era anche un doppione della voce "Startseite" (S6), e a 320px il wordmark toccava la X. Apertura e chiusura ora stanno nello stesso punto. **Costo:** il drawer non mostra il nome del locale. Lo mostra già la barra, visibile sopra il backdrop.
  - *Copy (approvato):*
    - la voce "Home" diventa "Startseite";
    - "Besuche uns" diventa "Besuch uns", come l'h1 della pagina;
    - EN "Visit" diventa "Visit us", come il titolo EN;
    - il telefono diventa "Ruf an: +43 1 586 28 39" / "Call: +43 1 586 28 39", con la forma di voice-spec.

    Le voci valgono anche per la nav desktop, che usa la stessa lista.
- [x] **Drawer, giro 7 (27/09/2026, scritto prima del codice).** Critico cieco: **59/100** (giro prima 55). Due correzioni oggettive; il resto va a Francesco (`docs/stato-aperto.md`).
  - *Riga dello stato mentre carica.* **Default:** `return null` durante il caricamento del menu. **Invece:** una riga vuota alta come quella vera (`min-h-11`, `aria-hidden`). **Perché:** con il menu lento il telefono stava a y=336 e saltava a y=380 quando arrivava lo stato, proprio mentre il pollice ci andava sopra.
  - *Feedback al tocco sulle voci.* **Default:** nessun hover né active (il ledger del giro 1 diceva "resta `hover:bg-muted`", ma il giro 4 l'aveva tolto: deriva tra ledger e codice). **Invece:** `active:bg-muted` e `hover:bg-muted`, senza scale (§7). **Perché:** tra il tocco e l'arrivo della pagina lazy non succedeva niente di visibile. Qui `bg-muted` non segna uno stato ma dà un riscontro momentaneo, quindi il suo 1.07:1 non è un problema.
- [x] **Bug "chiuso" col foglio vuoto + menu di oggi nel drawer (27/09/2026, approvato da Francesco in chat, scritto prima del codice).** Critico cieco del giro prima: **59/100**.
  - *Menu vuoto non vuol dire chiuso.* **Default:** `useTodayClosed` (hero, drawer), `HomeMenuPreview` e `MenuSection` trattavano "il foglio non ha ancora i piatti di oggi" come "locale chiuso". Un lunedì alle 10, prima che lo staff aggiornasse il foglio, il sito diceva "Heute geschlossen" in tre punti, compreso "Heute bleibt die Küche zu" su /menu. Il locale apre alle 11. **Invece:** chiuso vuol dire solo domenica, festivo o fuori orario. Con il foglio vuoto in un giorno feriale, lo stato segue l'orario, e le card del menu mostrano lo stato vuoto di voice-spec: "Die Karte von heute steht noch nicht online. Wir schreiben sie jeden Morgen — ruf an: +43 1 586 28 39". **Perché:** il profilo A decide se venire oggi, e riceveva un fatto falso. **Costo:** una chiusura straordinaria non segnata in `holidaysData` non si riconosce più dal foglio vuoto. Le chiusure pianificate vanno messe lì.
  - *Stato chiuso con la riapertura (copy approvato, coppia BENE di voice-spec).* "Heute geschlossen. Morgen ab 11:00 wieder da." e "Jetzt geschlossen. Morgen ab 11:00 wieder da.", oppure "Am Montag ab 11:00 wieder da." quando domani è domenica. Il giorno di riapertura viene dagli orari (`getNextOpening`), non da un "+1" fisso.
  - *Il menu di oggi nel drawer.* **Default:** nel drawer solo l'orario, cioè il dato che ha già la scheda Google. **Invece:** in cima al drawer, sotto la X, il blocco di oggi: lo stato, poi i nomi dei piatti di oggi in Cormorant (`text-xl`, più pesanti delle voci) come un unico link a /menu, poi il telefono. Le voci di navigazione vengono dopo. **Perché:** il direction lock dice che la pagina la porta il menu, "la sola informazione che il sito ha e Google non ha". Il profilo B (menu in meno di 20 secondi) lo vede aprendo il drawer. **Costo:** le voci scendono di circa 150px. Durante il caricamento il blocco tiene lo spazio dei piatti, così le voci non saltano. Nei giorni già noti come chiusi (domenica, festivi) quello spazio non viene riservato. Dopo la chiusura i piatti non si mostrano più.
- [x] **Drawer, giro 9 (28/09/2026, scritto prima del codice).** Critico cieco: **63/100** (giro prima 59). Correggo i due errori di fatto e le rifiniture che non chiedono copy nuovo.
  - *Riapertura e festivi.* **Default:** `getNextOpening` guardava solo gli orari. Il 24/12 diceva "Morgen ab 11:00 wieder da." con il 25 festivo. **Invece:** salta i giorni in `holidaysData`. Il 23/12 alle 20:00 dice "Am Montag ab 11:00 wieder da." (24, 25 e 26 festivi, il 27 è domenica). **Perché:** un orario sbagliato è un fatto falso, lo stesso tipo di errore del bug del foglio vuoto.
  - *Fuso orario.* **Default:** gli orari usavano l'ora di Vienna, i festivi e "è domenica?" quella del telefono. Da New York alle 19:00 di mercoledì il drawer mostrava lo stato di giovedì con i piatti di mercoledì. **Invece:** festivi (`getHolidayForDate`) e `useTodayClosed` leggono la data di Vienna. **Costo:** le card del menu (`HomeMenuPreview`, `MenuSection`) usano ancora l'ora del telefono. Fuori da questo giro, annotato in `stato-aperto.md`.
  - *Salto durante il caricamento.* **Default:** il blocco di oggi montato all'apertura, con 84px riservati per i piatti (ma il blocco vero è alto 118px: il telefono saltava di +34 o −84px). **Invece:** il blocco viene montato con la Navigation. Il menu lo legge la pagina stessa (cache di 5 minuti), quindi quando apri il drawer il dato c'è già. Durante il caricamento si riserva solo la riga di stato. **Costo:** la Navigation legge il menu anche su pagine che non lo mostrano, con una richiesta ogni 5 minuti al massimo.
  - *Piatti.* **Default:** i nomi uno sotto l'altro, senza spazio e senza segnale di link. "Alpenpolenta mit Bergkäse und / Schwammerln" andava a capo e tre piatti si leggevano come quattro. **Invece:** `space-y-1.5` tra i piatti; sottolineatura in `decoration-border`, come il telefono; `-mx-2 px-2` sul link, così l'anello di focus non tocca le lettere; `min-h-11` quando c'è un piatto solo.
  - *Pallino di stato.* `h-1.5 w-1.5`, come §6. Prima dell'apertura ("Heute ab 11:00 geöffnet") diventa neutro (`bg-muted-foreground`) invece che rosso: il rosso diceva "chiuso" accanto a un testo che dice "apre".
  - *Menu non ancora online, nel drawer.* In un giorno aperto senza piatti, al posto dei piatti: "Die Karte von heute steht noch nicht online." / "Today's menu isn't online yet.". È la prima frase dello stato vuoto già approvato per le card; il telefono sta già subito sotto. **Perché:** il lock dice "se il menu non c'è, la pagina lo dice subito". Prima i piatti sparivano senza spiegazione.
- [x] **Drawer, giro 10 (28/09/2026, scritto prima del codice).** Critico cieco: **61/100** (giro prima 63). Ha provato casi nuovi e ha trovato tre errori veri.
  - *Cambio d'ora.* **Default:** giorno candidato = istante + N×24h. Sabato 27/03/2027 alle 23:30, nella notte da 23 ore, "domani" risultava lunedì e il drawer diceva "Morgen ab 11:00" (domani era domenica). **Invece:** si parte dalla data di calendario di Vienna di oggi, a mezzogiorno, e si sommano giorni di calendario.
  - *Errore contro menu vuoto.* **Default:** con Supabase irraggiungibile il drawer diceva "Die Karte von heute steht noch nicht online.". La karte era online: era il sito a non raggiungerla. **Invece:** `useTodayClosed` espone `error`, e in caso di errore il drawer non mostra la riga (resta lo stato, che viene dagli orari, e il telefono sotto). La frase d'errore di voice-spec ("Wir kommen gerade nicht an die Karte…") è copy nuovo per il drawer: la decide Francesco.
  - *Telefono fermo per davvero.* **Default:** telefono sotto i piatti. A cache scaduta, o su una pagina che non legge il menu, i piatti arrivavano dopo e il telefono saltava di 130px. **Invece:** telefono subito sotto la riga di stato, poi i piatti. La posizione del telefono non dipende più dal menu. **Costo:** i piatti scendono di una riga. Restano il primo peso visivo del pannello grazie al Cormorant.
  - *Pallino fuori dal filo.* Il pallino passa in posizione assoluta a sinistra del filo (x≈12, lo stesso asse della lineetta della voce attiva). Il testo di stato torna a x=20, come tutto il resto.
  - *"Wir schreiben sie jeden Morgen." rimesso.* Senza, lo stato vuoto non diceva quando torna il contenuto (voice-spec). È copy già approvato per le card; il telefono resta fuori perché sta già sopra.
  - *Selettore lingua.* `focus-visible:outline-offset-0` sui due pulsanti: l'anello si sovrapponeva al bordo del gruppo. Transizione solo su sfondo e colore del testo: con `transition-colors` anche l'anello di focus partiva bianco su crema e diventava navy in 250ms. Evento `language_switch`: l'etichetta ora viene dal pulsante premuto, e se la lingua è già quella non parte nessun evento (prima toccare DE su una pagina DE registrava "switch_to_en").
- [x] **Banner cookie sui telefoni piccoli + due etichette (28/09/2026, approvato da Francesco in chat, scritto prima del codice).**
  - *Banner cookie.* **Default:** la card cresce con il contenuto, ancorata in basso, senza limite di altezza. A 320×568, 360×640 e 375×667 saliva fin sopra la top bar e copriva l'hamburger. Alla prima visita il menu non si apriva finché non si rispondeva al banner. **Invece:** la card ha un'altezza massima che si ferma sotto la barra (60px + safe area + un margine) e scorre al suo interno. **Perché:** "il sito accoglie, non cattura". Il banner può chiedere, ma non deve bloccare la navigazione. **Costo:** sui telefoni più piccoli il testo del banner si scorre invece di vedersi tutto. Contenuto e bottoni restano identici.
  - *Nome del link dei piatti (copy approvato).* Un prefisso nascosto a vista, "Speisekarte: " / "Menu: ", prima dei nomi dei piatti. Lo screen reader dice dove porta il link (WCAG 2.4.4). A vista non cambia niente.
  - *Pulsante "EN" (copy approvato).* `aria-label` "EN, English version" invece di "English version". Il nome contiene il testo visibile, quindi funziona anche con il controllo vocale ("tocca EN"), WCAG 2.5.3.

---

## /about "Unsere Geschichte", opzione B "Ein Tag" (29/09/2026, prototipo nel banco, scritto prima del codice)

Struttura scelta da Francesco tra tre opzioni (`docs/ux/about-opzioni.md`). Prototipo in `src/lab/experiments/06-about-ein-tag.tsx`, non ancora in produzione. Il copy è una **bozza da approvare**.

- *Struttura.* **Default:** pagina "chi siamo" con hero, capitoli numerati e griglie di card (Kapitel 1–4, circa 15 superfici con bordo e ombra, un carosello di poesie). **Invece:** una giornata nel cortile, dove l'ora è il titolo (10:30, 12:30, 15:00, 18:45), in una colonna di testo a 62ch. **Perché:** il direction lock dice che la pagina la porta il dato, e l'ora è un dato. Nessun'altra sezione del sito risponde alla stessa domanda (i 3 passi di IlPosto raccontano lo spazio, questa il tempo). Il materiale di brand dice "il sito non convince, rivela". **Costo:** sparisce la navigazione a chip tra i capitoli.
- *Zero card.* **Default:** fatti, cucina, fonti e opere in card con bordo e ombra. **Invece:** testo libero sulla pagina. Le sezioni si separano con spazio, foto a piena larghezza e un cambio di superficie (No-Line Rule). **Perché:** U2 e i materiali ("meno elementi, più intenzione"). **Costo:** nessun contenuto "scansionabile a blocchi".
- *Sri Chinmoy, un riferimento.* **Default:** biografia, quattro fatti, quattro opere, cinque poesie in carosello, cinque caffè gemelli, sei fonti. **Invece:** un solo punto, a fine giornata. Le poesie sulle cartoline del caffè sono sue, e sua è la frase con cui si lavora: la citazione approvata, con il nome come link a srichinmoy.org. **Perché:** voice-spec, "massimo un riferimento per pagina, e deve essere un fatto"; CLAUDE.md, "si sente, non si spiega". **Costo:** chi vuole la biografia deve uscire verso srichinmoy.org. Tagliare questo contenuto è una decisione di contenuto da confermare con il proprietario.
- *Il carosello.* Tolto, perché vietato da CLAUDE.md. Le poesie restano come fatto concreto: la cartolina che arriva col caffè.
- *Densità.* Apertura e ore `normale`, la citazione `ampia` (l'unico respiro, su superficie `bg-card`), la chiusura "Wie du uns findest" `stretta`.
- *Immagini con ruoli diversi (S7).* Il tavolo dall'alto a piena larghezza come cambio di scena dopo la mattina; la torta che esce a destra dalla colonna nelle 15:00; il cortile a piena larghezza a fine giornata. Formati diversi perché fanno lavori diversi.
- *Tipografia.* Caveat una volta sola, per il titolo "Unsere Geschichte". Ore in Work Sans con cifre tabulari (dato). Titoli delle ore in Cormorant, corpo in Lora.
- *Segni.* Una sola freccia, sul link che esce dalla pagina ("Wie du uns findest →", copy già approvato). Nessuna icona.

## /about, strada 3 "com'è oggi, senza card" (29/09/2026, prova nel banco, scritto prima del codice)

Francesco: "2 ma proviamo con la 3 prima per vedere com'è". Serve solo a vedere il contenuto attuale senza contenitori. La direzione scelta resta la strada 2 (B più il capitolo "Die Idee dahinter"). Prototipo in `src/lab/experiments/07-about-senza-card.tsx`. **Copy invariato**, preso da `AboutUs.tsx` riga per riga, compresi i suoi problemi di voce (coppie negative, aforisma, "Weiterlesen"): correggerli qui sarebbe copy nuovo.

- *Contenitori.* **Default:** circa 15 superfici con bordo e ombra, chip di navigazione, carosello. **Invece:** nessun bordo e nessuna ombra. Le sezioni si separano con spazio, foto senza cornice e due cambi di superficie. Le card della cucina e i quattro fatti diventano una lista di definizione (`dl`). Caffè gemelli e fonti diventano elenchi di link di testo. La nota allergie diventa un paragrafo. **Perché:** è la domanda di Francesco, cioè cosa resta del contenuto quando togli le scatole.
- *Kapitel in margine.* **Default:** occhiello "Kapitel 0N · Label" sopra ogni h2, cinque volte (oltre il limite di 2 blocchi occhiello più h2). **Invece:** il numero del capitolo sta nel margine sinistro, come l'ora nella B, e l'etichetta non si ripete perché il titolo la dice già. **Costo:** l'occhiello sparisce anche dove portava un'informazione ("Unsere Inspiration").
- *Carosello.* **Default:** una poesia alla volta, con frecce. **Invece:** le cinque poesie una dopo l'altra, in colonna, sul cambio di superficie `bg-card`. È il momento `ampio` della pagina. **Costo:** la pagina si allunga. Si vede se le cinque reggono insieme o se ne basta una.
- *Icone.* Tolte tutte (Leaf, BookOpen, Brush, Music, HeartHandshake, Globe2, Sparkles, MapPin). Il segnale di link esterno resta come "↗" in `aria-hidden`, come l'icona di oggi (che non ha testo per lo screen reader: nessun copy nuovo qui).
- *Opere.* Quattro immagini senza cornice, 2×2 su mobile, in fila su desktop, che escono dalla colonna. Il ritratto è una foto senza cornice, con la didascalia "1931 bis 2007" in Work Sans. Esce il secondo Caveat.
- *Densità.* Apertura `stretta` in coda; capitoli `normale`; poesie `ampia`; chiusura `stretta`.
- *Radius.* `rounded-lg` solo sulle foto che escono dalla colonna; le foto a piena larghezza non hanno radius.
- *check-tells sul file (29/09).* Due scatti attesi. U2 alla riga 325 è la variante "prima", l'estratto fedele del carosello di oggi. VOICE "Weiterlesen" è copy di oggi, lasciato apposta. Nella stessa prova corretto un difetto anche della B: nel titolo in subgrid, `gap-2` di mobile restava come gap di colonna (8px invece di 32px), e il titolo stava 12px a sinistra del testo. Ora `md:gap-x-8 md:gap-y-0`, allineati a x=228 su 1280.
