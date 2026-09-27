# SEO e trovabilità: dati e letture

> Registro dei dati di ricerca e posizionamento che Francesco porta in chat
> (da Lovable/Semrush, Search Console, GA4), con la fonte, quanto sono
> affidabili e cosa ne ricaviamo. Obiettivo: **migliorare gli indici e farsi
> trovare di più**. Si aggiunge in cima, con la data.
> Il perché delle decisioni SEO già prese sta in [`ragionamenti.md`](./ragionamenti.md) §2, §3, §8.
> Cosa resta da fare: [`stato-aperto.md`](./stato-aperto.md).

**Livelli di affidabilità**
- **Misurato**: Search Console, GA4 o scheda Google letti direttamente.
- **Stima**: Semrush e simili. Sono volumi modellati, variano da tool a tool e vanno confrontati solo dentro lo stesso tool e lo stesso paese.
- **Ipotesi**: una lettura nostra o dell'assistente, non verificata.

---

## 28/09/2026: quanti siti linkano i ristoranti vegani di Vienna (Lovable/Semrush)

**Domanda di Francesco a Lovable:** quanti siti linkano i siti dei ristoranti vegani più noti?

**Risposta di Lovable** (Semrush, dati di luglio 2026). Livello: **stima**.

| Sito | Domini che linkano | Link totali | Authority Score |
|---|---|---|---|
| Veggiezz | ~874 | 1.765 | 16 |
| **My Secret Garden** | ~355 | 10.906 | 25 |
| Jola | ~318 | 847 | 23 |
| Velani | ~244 | 583 | 30 |
| Tian | ~124 | 152 | 2 |
| Shiyu | ~43 | 56 | 0 |
| Sattva Vegan | n.d. | n.d. | n.d. |

Secondo Lovable:
- quasi 10.000 dei nostri link vengono da una rete di spam turca e indonesiana (ancore tipo "betcio", "casino"), la stessa che colpisce Velani, Veggiezz, Tian e Shiyu;
- l'autorità la fanno i link editoriali veri:
  - Velani: vegan.at, 1000thingsmagazine.com, falstaff.com, wanderlog.com;
  - Jola: austria.info (autorità 60), vegan.at, 1000things.

**Lettura critica (nostra):**
- **I numeri non tornano con quelli del 24/09.** Il 24/09 Semrush dava a Velani 343 domini referenti e a noi 229. Oggi dà Velani ~244 e noi ~355. Cambia l'istantanea o la metrica (domini con link attivi, o anche persi). Le Authority Score (25 noi, 30 Velani) invece coincidono. Conclusione: i conteggi di domini di Semrush non si confrontano tra date diverse. Vale la classifica relativa dello stesso giorno.
- **Lo spam non va "ripulito" per forza.** Google dichiara di ignorare in gran parte i link spam automatici. Il disavow serve solo in caso di azione manuale. Da controllare in Search Console → Sicurezza e azioni manuali → Azioni manuali: deve dire "Nessun problema rilevato". Se è così, non si fa niente.
- **Per il nostro sito la misura è Search Console, non Semrush.** Search Console → Link → "Siti con più link" elenca i domini che Google ha davvero trovato. È gratis, misurato, e risponde alla domanda di Lovable ("vuoi che controlli se vegan.at, 1000things, Falstaff e Wanderlog ci linkano?") meglio di una stima.
- **Uno lo sappiamo già da GA4:** 1000thingsmagazine.com ci ha mandato 30 sessioni e falter.at 14 (24/06–21/09). Un referral vuol dire che su quei siti c'è almeno un link a noi. 1000things quindi ci linka già da qualche pagina. L'email alla redazione va riformulata: non "scriveteci per la prima volta", ma aggiornare o aggiungere una menzione. Prima va trovata la pagina che ci linka (GA4 → Acquisizione traffico → sorgente 1000thingsmagazine.com → pagina di riferimento).
- **"Falstaff e HappyCow sono partner, quindi è probabile che linkino" è un'ipotesi di Lovable.** Si verifica nel rapporto Link di Search Console.
- **Wanderlog non si "ottiene".** Sono liste di viaggio scritte dagli utenti: ci si entra se i visitatori ci aggiungono. Non è un contatto redazionale.
- **Nuovo obiettivo emerso: austria.info** (Österreich Werbung, autorità 60). Linka Jola. È il link editoriale di maggior peso della lista, e va aggiunto accanto a vegan.at e Wien.info.

**Prossimi passi (Francesco, circa 15 minuti in tutto):**
1. Search Console → Azioni manuali: annotare qui l'esito.
2. Search Console → Link → Siti con più link: annotare qui i primi 10 e controllare se ci sono vegan.at, 1000things, falstaff, happycow, falter.
3. GA4: trovare la pagina di 1000things che ci linka.

---

## 27/09/2026: quota mobile delle ricerche "vegan food" (Lovable/Semrush)

**Domanda di Francesco a Lovable:** che percentuale delle ricerche "vegan food" viene da mobile?

**Risposta di Lovable, dati:**

| Keyword | Volume/mese | Difficoltà | Livello |
|---|---|---|---|
| vegan food (Austria) | 720 | 35/100 | stima |
| veganes restaurant | 8.100 | n.d. | stima |
| vegan in meiner nähe | 6.600 | n.d. | stima |
| vegan near me | 4.400 | n.d. | stima |

Semrush non divide il volume per dispositivo, quindi un numero esatto non c'è. Lovable propone come ipotesi di lavoro "circa 80% o più da mobile" per le ricerche su ristoranti e "near me". La proxy è il dato GA4: 82% delle sessioni da mobile.

**Lettura critica (nostra):**
- **Una correzione a Lovable.** Ha scritto che "anche Search Console non divide le query per dispositivo". È falso. In Search Console → Rendimento puoi filtrare una query (per esempio "vegetarisches restaurant wien") e poi aprire la scheda **Dispositivi**: clic, impressioni e posizione per mobile, desktop e tablet. È il dato misurato che serve, e l'abbiamo.
- **L'82% di GA4 non è la quota delle ricerche.** È la quota di chi è arrivato sul sito. Le due cose coincidono solo se Google mostra il sito allo stesso modo su tutti i dispositivi. Come proxy regge, come misura no.
- **I "near me" non si giocano sul sito.** "vegan in meiner nähe" e "vegan near me" si risolvono quasi sempre nel pacchetto locale di Google e in Maps. Lì conta la **scheda Google** (categorie, orari, foto, recensioni, link al sito); il sito conta come segnale di pertinenza. Per queste query la scheda vale più di qualsiasi pagina.
- **I volumi non sono confrontabili con quelli di prima.**
  - "veganes restaurant" 8.100 è probabilmente nazionale e generico.
  - "veganes/vegane restaurant(s) wien" 1.900 (24/09, sotto) è la variante con la città.
  - Prima di confrontarli va controllato che siano lo stesso database (Austria) e lo stesso tipo di corrispondenza.
- **Conseguenza pratica:** il vincolo mobile-first (82%, meno di 3s su 4G) è allineato. Non c'è niente da cambiare nel design per questo dato.

**Prossimo passo di misura (Francesco, 5 minuti):** Search Console → Rendimento → Query → "vegetarisches restaurant wien" → scheda Dispositivi. Annotare qui clic, impressioni e posizione per dispositivo. È la base "misurata" da confrontare il 15/10.

---

## 26/09/2026: cosa vede Google (Search Console, Controllo URL)

Livello: **misurato**, test live.
- `/` e `/menu` venivano renderizzate con `lang="en"`: Googlebot usa Chrome in en-US, e il sito sceglieva la lingua dal browser. Google leggeva l'inglese anche per il mercato austriaco.
- `/menu` risultava "Rilevata, ma attualmente non indicizzata". Il canonical statico in `index.html` puntava alla home da ogni pagina.
- Corretto sul branch con la struttura `/en/` e i canonical per pagina. Dopo il merge: richiedere l'indicizzazione e reinviare la sitemap (vedi `stato-aperto.md`).

## 24/09/2026: SERP e competitor (Semrush via Lovable)

Livello: **stima**.

| Query | Posizione | Volume/mese |
|---|---|---|
| vegetarisches restaurant wien | 12 | 720 |
| veganes/vegane restaurant(s) wien | 14 | 1.900 |
| vegan essen wien | n.d. | 880 |
| vegetarian restaurant vienna | 8 | n.d. |
| vegetarian restaurant wien | 5 | n.d. |
| restaurants mariahilferstraße | 14 | 2.400 |
| essen mariahilferstraße | 9 | n.d. |
| "Secret Garden Wien" / "My Secret Garden" (brand) | 1 | ~880 / ~390 |

- Competitor: Velani, Veggiezz, Tian, Hollerei, Sattva, Shiyu, Jola.
- Velani contro noi: keyword 361 contro 265, traffico stimato 8.639 contro 14.142, Authority 25 contro 30, domini referenti 343 contro 229.
- **Lettura:** il divario è di **notorietà** (link e citazioni), non di SEO tecnica. Per questo le menzioni editoriali (vegan.at, 1000things, Falter) e non pagine clone per keyword (vedi `ragionamenti.md` §8).
- Le posizioni EN migliori di quelle DE si spiegano con il punto del 26/09: Google vedeva il sito in inglese.

## 22–24/09/2026: da dove arrivano le persone (GA4, 24/06–21/09)

Livello: **misurato**, senza campionamento.
- Sorgenti: google/organic 3.303 sessioni, (direct) 2.307 (38%), chatgpt.com 135, ig/social 72.
- Dispositivi: 82,4% mobile.
- ChatGPT ha l'engagement più alto (80%, 7,64 eventi/sessione), ma circa 1,5 sessioni al giorno.
- Referral editoriali già attivi: 1000thingsmagazine.com 30 sessioni, falter.at 14.
- Il 38% di diretto era in parte traffico dalla scheda Google senza UTM: corretto il 22/09.

---

## Leve per essere più trovabili, per valore/costo

1. **Merge della struttura `/en/` + richiesta di indicizzazione.** È il blocco tecnico più grosso: oggi Google vede solo l'inglese e tratta quattro pagine come doppioni della home. Costo: un merge più 10 minuti in Search Console.
2. **Scheda Google** (per i "near me" e il pacchetto locale). Si fa dalla scheda, non dal codice. Da verificare:
   - categorie: principale "Ristorante vegano" o "vegetariano", secondarie "Caffè";
   - attributi (vegano, senza glutine);
   - link al menu su `/menu`;
   - foto aggiornate;
   - risposte alle recensioni;
   - orari speciali per i festivi.
3. **Menzioni editoriali**: colmano il divario di notorietà con Velani. Obiettivi: vegan.at, austria.info (autorità 60, linka Jola) e Wien.info. 1000things e Falter ci linkano già (referral in GA4): lì si chiede un aggiornamento, non una prima menzione. Le bozze delle email sono pronte da chiedere, dopo aver letto il rapporto Link di Search Console.
4. **Misurare prima di aggiungere.** Scheda Dispositivi per query in Search Console (sopra) e controllo della posizione il 15/10 (promemoria già programmato).
5. **Prerendering per i crawler AI** (ChatGPT porta il traffico migliore): da provare su un branch di test. Oggi GPTBot vede solo il `<head>`.

## Domande a Lovable: come leggerne le risposte

Lovable è utile per estrarre dati da Semrush, ma mescola dati e ipotesi e a volte sbaglia sugli strumenti. È successo oggi con Search Console e i dispositivi. Prima di trattare una sua risposta come fatto:
- separare i numeri che vengono dal tool dalle frasi "ragionevolmente" o "probabilmente";
- controllare paese, database e tipo di corrispondenza di ogni volume;
- quando la domanda riguarda il *nostro* sito, preferire Search Console e GA4, che sono misura, a Semrush, che è stima.
