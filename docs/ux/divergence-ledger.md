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
