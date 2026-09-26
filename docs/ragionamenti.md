# Ragionamenti — CS01

> Il *perché* dietro le decisioni prese in chat tra il 20 e il 26/09/2026:
> fatti verificati, alternative scartate, correzioni fatte in corsa.
> Serve a chi riprende il lavoro (una nuova sessione, Claude desktop, Francesco
> tra sei mesi) per non rifare le stesse domande né ripetere gli stessi errori.
> Cosa resta da fare: [`stato-aperto.md`](./stato-aperto.md).
> Decisioni di design con default nominato: [`ux/divergence-ledger.md`](./ux/divergence-ledger.md).

---

## 1. Principio di lavoro: vincolo del sistema o regola nostra?

Una regola in `CLAUDE.md` non è un limite tecnico. "Nessuna nuova route" non
viene da React Router, che ne supporta quante se ne vuole: è una regola di
processo scritta da Francesco, perché una scelta di architettura non entri come
effetto collaterale di una richiesta piccola. La cambia lui.

L'errore opposto è successo tre volte, e va evitato:
- `vercel.json` scritto da Claude e poi preso come prova che l'hosting sia Vercel. **L'hosting reale non è verificato.**
- `CLAUDE.md` con nomi di eventi GA4 che non esistevano e un numero di telefono vecchio.
- Riferimenti a `tailwind.config.ts`, file che non esiste più (Tailwind v4, token in `src/index.css`).

Prima di trattare un'affermazione come fatto: da dove viene, e chi l'ha scritta?

---

## 2. Come funziona Googlebot (e perché qui conta)

Googlebot è un programma che visita le pagine e le annota in un indice. Le
ricerche interrogano l'indice, non il web in tempo reale.

**Le fasi**
1. **Scoperta** — link, sitemap, Search Console. Prima legge `robots.txt`.
2. **Download** — riceve l'HTML grezzo. In una SPA come questa è lo stesso guscio per ogni URL: `<head>` e un `<div>` vuoto.
3. **Rendering** — un Chrome headless esegue il JavaScript, a volte ore o giorni dopo. È in **en-US**, **senza memoria** (niente localStorage né cookie tra una visita e l'altra), **non clicca**.
4. **Indicizzazione** — decide la lingua dal testo visibile, i doppioni dal canonical, se salvare la pagina.
5. **Posizionamento** — al momento della ricerca: lingua, luogo, link, hreflang.

**Chi vede cosa**
- Google (e in parte Bing) vedono la pagina renderizzata.
- GPTBot, ClaudeBot, PerplexityBot e le anteprime link di WhatsApp/Instagram vedono **solo il `<head>`**. Per questo il JSON-LD sta nel guscio `index.html`.

**Cosa ha causato qui**
- Il sito sceglieva la lingua da `navigator.language` sullo stesso URL. Il bot en-US leggeva tutto in inglese, anche per il mercato austriaco (73%). Verificato con Search Console → Controllo URL → test live, 26/09: `lang="en"` su `/` e `/menu`.
- Il canonical statico in `index.html` faceva dichiarare a ogni pagina di essere un doppione della home. `/menu` risultava "Rilevata, ma attualmente non indicizzata".

**Come verificare da soli:** Search Console → Controllo URL → Testa URL live → Visualizza pagina sottoposta a test (HTML renderizzato e screenshot).

---

## 3. Struttura `/en/` — effetti contro rischi

**Prima valutazione (24/09): "non ora".** Un giorno di lavoro, rischio sul routing e sul tasto indietro, beneficio pensato come solo turistico.
Francesco ha chiesto ragionamenti più ampi. Il fatto nuovo è stato il punto 2: Google vedeva l'inglese.

**Effetti oltre la SEO**
- GA4 separabile per lingua (`/en/menu` è una riga a sé)
- Un link condiviso porta con sé la lingua
- Il tedesco resta alla radice: nessun URL esistente cambia, i link esterni (Maps, TripAdvisor, HappyCow, bio Instagram) restano validi
- Per i crawler AI non basta: servirebbe il prerendering, passo separato

**Rischi accettati**
- Calo transitorio sulle query inglesi mentre Google reindicizza
- Il turista che arriva sulla radice vede prima il tedesco (mitigato dal livello 3, sotto)
- Deriva da modifiche fatte con Lovable → regole anti-deriva in `CLAUDE.md`

**Alternative scartate**
- *Default tedesco in una riga*: rapido, ma perde le query inglesi
- *`/de/` e `/en/`*: cambia ogni URL esistente, rompe link esterni, UTM e storico GA4, richiede 301 lato server che su un hosting non verificato non possiamo garantire
- *Tedesco solo a Googlebot*: è **cloaking**, vietato da Google

**Decisione di Francesco: tedesco alla radice, inglese sotto `/en/`.**

---

## 4. Rilevare la lingua del dispositivo senza ingannare Google

La trappola: un redirect automatico per lingua del dispositivo rimanderebbe
anche Googlebot (en-US) su `/en/`, e il tedesco sparirebbe di nuovo dall'indice.

Tre livelli, approvati tutti da Francesco:
1. **hreflang** — Google stesso manda chi cerca in inglese su `/en/…`.
2. **Scelta salvata** — solo dopo un tocco esplicito su DE/EN (`msg_language_choice`). All'atterraggio l'URL viene riscritto prima che React parta. È sicuro perché Googlebot non ha memoria: non ha mai una scelta salvata.
3. **Suggerimento** — su mobile, dispositivo senza tedesco tra le lingue e nessuna scelta: un disco "EN" nella top bar. Suggerisce, non redirige. Niente banner ("il sito accoglie, non cattura").

Basta il tedesco in **qualunque** posizione di `navigator.languages`: un viennese
col telefono in inglese ha spesso `["en-AT", "de-AT"]` e non deve vedere "EN".

---

## 5. GA4 — cosa misura davvero ogni evento

- `maps_click` — regola GA4 sui clic in uscita verso google.com/maps. È il KPI indicazioni.
- `click_call` — dal 22/09 parte da **ogni** link `tel:` del sito (`src/lib/trackTelClicks.ts`). Prima solo dalla barra mobile, quindi su desktop era zero per costruzione. Verificato in produzione nel report Tempo reale il 23/09.
- `anrufen_click` — regola rotta: i `tel:` non generano clic in uscita. Zero eventi in 90 giorni.
- `generate_lead` — sono le visite a `/contact`, cioè i clic su "Kontakt" nel footer. **Non sono contatti.**
- Conservazione dati portata da 2 a 14 mesi il 22/09. Non retroattiva: i dati prima di luglio 2026 sono persi.

**Dati di riferimento** (24/06–21/09/2026, nessun campionamento):
- google/organic 3.303 sessioni, (direct) 2.307 (38%), chatgpt.com 135, ig/social 72
- 82,4% mobile (il vecchio dato era 74%)
- 67,7% delle sessioni vede `/menu`
- ChatGPT: engagement 80%, il migliore tra le sorgenti, ma circa 1,5 sessioni al giorno

**Metodo:** chi estrae i dati (Claude in Chrome, JSON rigido, "NON_DISPONIBILE" mai scritto come 0) è separato da chi li analizza. Serve a non inventare numeri.

---

## 6. UTM su scheda Google e Instagram

**Scheda Google:** il campo "Sito web" era `http://www.…` senza parametri.
- Ipotesi (non verificata): dal https di Google a un link http il browser non manda il referrer, quindi il traffico finisce in (direct). Dopo il salvataggio il campo mostrava già `https://`, quindi l'ipotesi può essere sbagliata. L'UTM risolve in entrambi i casi.
- Nuovo valore: `https://www.secretgardenrestaurant.at/?utm_source=google-business&utm_medium=referral&utm_campaign=scheda-google`. `referral` e non `organic`, per non confonderlo con la SEO. Prime 6 sessioni nella settimana 16–22/09.

**Instagram:** dal 23/09 la bio porta `/menu?utm_source=instagram&utm_medium=social&utm_campaign=bio-link`. L'in-app browser spesso non passa il referrer. È anche il motivo per cui `/link` non ha mai ricevuto visite: la bio non ci è mai arrivata.

---

## 7. Punti d'ingresso e CTA

Conta **cosa l'utente ha già in mano quando arriva**:
- da Maps ha telefono e strada → cerca "cosa c'è oggi" e "va bene per me"
- da Instagram ha visto il cibo → cerca il menu
- dall'organico non ha niente → gli serve tutto

Da qui: su desktop mancavano chiamata e indicazioni, perché `MobileStickyBar`
fa `return null` sopra mobile e la home contava su di lei. Aggiunto "Anrufen"
nella nav desktop (24/09).

---

## 8. SEO — cosa si è fatto e cosa si è scartato

**Fatto**
- JSON-LD `Restaurant`: `hasMenu` su `/menu` (prima `/speisekarte/`), Instagram in `sameAs`, rating
- `robots.txt`: `Disallow: /login` ripetuto in ogni blocco `User-agent`
- Title "Lokal" → "Restaurant", allineato a description e og:title
- Canonical statico rimosso (vedi punto 2). Regola: mai canonical, `og:url` o `og:locale` statici nel guscio
- Search Console verificata col metodo Tag HTML (24/09). Il metodo file ha dato 404 ripetuti con il file corretto su main: causa non provata, probabile cache negativa della CDN

**Scartato, con il perché**
- **Pagine SEO per ogni keyword**: le keyword ("veganes restaurant wien", "vegetarisches restaurant wien", "vegan essen wien") sono la stessa domanda vista da angoli diversi. Pagine clone sono *doorway page*, che Google penalizza. In più `CLAUDE.md` vieta nuove route senza istruzione, e ogni pagina in più si moltiplica per DE/EN, test e manutenzione di un solo designer. Il SEO programmatico ha senso con centinaia di varianti davvero diverse, non con cinque.
- `llms.txt`, regole per GPTBot in robots, Semrush/Ahrefs a pagamento, blog, backlink comprati

**Da rivalutare:** `aggregateRating` (vedi `stato-aperto.md`).

**Semrush** (stime via Lovable, non verificate):
- Posizioni: vegetarisches restaurant wien 12 (720/mese), vegane restaurants wien 14 (1.900/mese), vegetarian restaurant vienna 8. Sul brand, posizione 1.
- Velani, il competitor più vicino, ha più domini referenti (343 contro 229).
- Lettura: il divario è di **notorietà**, non di SEO tecnica. Da qui le menzioni editoriali.

---

## 9. Search Console: chi sono gli altri "proprietari"

Più account Google possono verificare la stessa proprietà, ognuno con il proprio
token. Ogni meta tag in `index.html` corrisponde a un account che vede i dati di
Search Console: sola lettura, non tocca il sito. Oltre a quello di Francesco ci
sono due tag più vecchi (verifica dal 17/05/2026).

Non sono di Francesco via Contentsquare: quei tag nascono solo dal flusso di
verifica di Search Console. E se fossero del suo account, Search Console non gli
avrebbe chiesto di verificarsi di nuovo. Contentsquare inoltre non è installato
nel codice. Ipotesi: chi ha costruito il sito prima di CS01, oppure Carlo con un
altro account. Si vede in Impostazioni → Utenti e autorizzazioni.

---

## 10. Schede esterne e menzioni

- **HappyCow** 129210: corretta (https, www, telefono). La 139929 è un duplicato già rimosso nel 2019: non era un problema, anche se all'inizio era stata segnalata come tale prima di leggerla.
- **TripAdvisor** d14101842: "Claimed", link `http://` e `/speisekarte/`. `/speisekarte/` risponde 200 e poi il JavaScript porta a `/menu`. Per le persone funziona, per Google è un segnale più debole di un 301.
- **Menzioni editoriali**: GA4 mostra già referral da 1000thingsmagazine.com (30 sessioni) e falter.at (14). vegan.at è un database comunitario, 1000things ha una redazione, Wien.info passa probabilmente da una partnership con Wien Tourismus.

---

## 11. Processo di design: perché il voto del critico scende

Il `tell-critic` è cieco: vede screenshot e regole, non la conversazione. Il suo
voto è **il numero del giro**, non quello dopo le correzioni.

Top bar mobile: 57 → 61 → 49. Il 49 non vuol dire che il lavoro sia peggiorato:
l'ultimo giro ha guardato anche drawer e selettore lingua, e lì ha trovato
problemi vecchi mai misurati. Allargare l'ambito abbassa il voto prima di alzarlo.

Lezioni dei giri:
- Copiare le classi del componente vicino fa ereditare la sua deriva. Si parte da `DESIGN_SYSTEM.md`, non dal file accanto.
- Una correzione può spostare il problema: togliere un anello di focus locale per usare quello globale l'ha fatto cadere sullo scrim scuro dell'hero (1.6:1). Si misura dopo ogni modifica.
- `check-tells.sh` non vede i `className={`...`}`: un verde del controllo automatico non basta.
- Nel design system ci sono contraddizioni vere (§6 "active → scale" contro §7 "mai zoom"). Si scrivono e si fanno decidere, non si risolvono in silenzio.
