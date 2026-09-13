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
| 13 set 2026 | Homepage — struttura | **in attesa della scelta di Francesco fra A / B / C** |

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

## Raccomandazione

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

## Prossime decisioni, da registrare qui

- [ ] Struttura homepage: A / B / C — **Francesco**
- [ ] Copy nuovo o spostato: nessuna riga entra senza approvazione in chat
- [ ] Dove vive l'informazione dietary quando il menu del giorno manca
- [ ] Se `CTAEndBlock` sparisce dalla home, resta sulle altre route?
- [ ] Normalizzazione radius: progressiva o in un passaggio unico
