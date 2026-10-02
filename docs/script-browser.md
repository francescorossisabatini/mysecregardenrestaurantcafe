# Script per Claude in Chrome

> Compiti meccanici fuori dal repo (Search Console, GA4, schede esterne) che
> Claude in Chrome può fare nel browser di Francesco, già autenticato.
> Si copia il blocco dello script e si incolla così com'è. Il risultato si
> incolla in chat, e Claude di sessione lo registra in `seo-dati.md` o
> `stato-aperto.md`.
>
> Regola (CLAUDE.md, "Come lavorare con me"): quando un compito è meccanico e
> il browser lo può fare, Claude dà anche lo script. Gli script nuovi si
> aggiungono qui.

**Regole comuni a ogni script** (sono già scritte dentro ciascuno):
- solo lettura, salvo i passi segnati come **AZIONE**;
- niente modifiche a impostazioni, utenti o dati;
- se serve un login o compare un captcha: fermarsi e dirlo;
- un dato che non si trova si scrive `NON_DISPONIBILE`, mai `0`;
- in uscita una tabella e, per ogni dato, dove l'ha letto (pagina e filtro).

Proprietà:
- **Search Console:** `https://secretgardenrestaurant.at` (tipo prefisso URL).
- **GA4:** account Purusha GmbH, proprietà 519259054, stream `website-secretgarden`.

---

## S1 · Search Console: azioni manuali, link, dispositivi (circa 10 minuti)

Quando: adesso. Serve per decidere se lo spam nei link va gestito, e per avere il dato misurato mobile/desktop.

```text
Lavora solo in lettura in Google Search Console, proprietà https://secretgardenrestaurant.at. Non cambiare nessuna impostazione, non aggiungere utenti, non inviare niente. Se ti chiede un login o un captcha, fermati e dimmelo.

1. Sicurezza e azioni manuali → Azioni manuali. Riporta il testo esatto dello stato (per esempio "Nessun problema rilevato").
2. Link → "Siti con più link" (link esterni) → "Altro". Riporta i primi 15 domini con il numero di link di ciascuno. Poi dimmi sì/no per ognuno di questi, anche se non sono tra i primi 15 (usa la ricerca o scorri l'elenco completo): vegan.at, wanderlog.com, 1000thingsmagazine.com, falstaff.com (o .at), falter.at, happycow.net, tripadvisor.at / tripadvisor.com, austria.info, wien.info.
3. Link → "Testo di link più frequente" → riporta i primi 10 testi di ancoraggio.
4. Rendimento → Risultati di ricerca → intervallo "Ultimi 3 mesi". Aggiungi il filtro Query = "vegetarisches restaurant wien" (corrispondenza esatta). Apri la scheda "Dispositivi" e riporta clic, impressioni, CTR e posizione media per Mobile, Desktop, Tablet.
5. Ripeti il punto 4 con Query = "vegane restaurants wien" e con Query = "vegan restaurant vienna".

Formato di uscita: una tabella per ogni punto. Un dato che non trovi lo scrivi NON_DISPONIBILE, mai 0. Sotto ogni tabella indica la pagina e il filtro che hai usato.
```

---

## S2 · GA4: da dove arrivano le visite "1000things" (circa 5 minuti)

Quando: prima di scrivere a 1000things. La loro ricerca non ci trova, ma GA4 registra 30 sessioni da lì.

```text
Lavora solo in lettura in Google Analytics 4, account Purusha GmbH, proprietà 519259054. Non modificare niente: niente esplorazioni salvate, filtri di proprietà, eventi o impostazioni. Se ti chiede un login, fermati e dimmelo.

1. Esplora → Esplorazione in formato libero (nuova, NON salvarla). Intervallo: dal 24 giugno 2026 a oggi.
2. Dimensioni: "Origine sessione", "Referrer della pagina", "Pagina di destinazione + stringa di query". Metrica: "Sessioni".
3. Filtro: "Origine sessione" contiene "1000things".
4. Riporta tutte le righe: referrer della pagina (l'URL completo), pagina di destinazione, sessioni.
5. Per ogni URL di referrer diverso, aprilo in una nuova scheda e dimmi: la pagina esiste? cita "My Secret Garden" o "Secret Garden"? c'è un link a secretgardenrestaurant.at? Riporta la frase in cui compare il nome.

Formato di uscita: una tabella con referrer, destinazione, sessioni, pagina esistente sì/no, citazione sì/no, frase. Un dato che non trovi lo scrivi NON_DISPONIBILE. Se "Referrer della pagina" non è disponibile, dimmelo e usa "Sorgente / mezzo della sessione" più "Pagina di destinazione".
```

---

## S3 · Falstaff: esiste la scheda del ristorante? (circa 3 minuti)

Quando: adesso. Falstaff è un partner (2025) ma non risulta indicizzato. Claude in Chrome usa il browser di Francesco, quindi Cloudflare di solito lo lascia passare.

```text
Lavora solo in lettura. Non registrarti, non accettare newsletter, non compilare moduli.

1. Apri https://www.falstaff.com e usa la ricerca del sito con "My Secret Garden". Poi ripeti con "Mariahilferstraße 45" e con "Secret Garden Wien".
2. Se trovi una scheda del ristorante, riporta: URL, nome esatto, indirizzo, orari, telefono, se c'è un link al sito web (e a quale URL punta esattamente), eventuali premi o punteggi (per esempio Falstaff 2025).
3. Se non la trovi, prova https://www.falstaff.com/at/ e la sezione ristoranti di Wien con il filtro vegetarisch/vegan, e dimmi se il locale compare in qualche elenco.
4. Se la pagina è bloccata da Cloudflare o chiede di verificare di essere umano, fermati e dimmelo senza provare a aggirarlo.

Formato di uscita: una tabella con URL, dati trovati, link al sito sì/no e URL di destinazione. Un dato che non trovi lo scrivi NON_DISPONIBILE.
```

---

## S4 · Dopo il merge su main: indicizzazione e sitemap (circa 10 minuti)

Quando: **adesso**. Il merge è su main dal 28/09/2026 ([PR #19](https://github.com/francescorossisabatini/mysecregardenrestaurantcafe/pull/19)). Il passo 0 controlla che Lovable l'abbia pubblicato. Questo script **agisce**: chiede l'indicizzazione e reinvia la sitemap. Sono le sole due azioni consentite.

```text
Lavora in Google Search Console, proprietà https://secretgardenrestaurant.at. Le uniche azioni consentite sono "Richiedi indicizzazione" e "Invia" della sitemap, come indicato sotto. Non cambiare nient'altro. Se ti chiede un login o un captcha, fermati e dimmelo.

0. Prima di tutto apri https://secretgardenrestaurant.at/sitemap.xml e conta i tag <loc>. Poi apri https://secretgardenrestaurant.at/en/menu. Se i <loc> non sono 14 o /en/menu non mostra il menu in inglese, fermati e dimmelo: la versione nuova non è ancora online.
1. Per ciascuno di questi URL, uno alla volta:
   https://secretgardenrestaurant.at/
   https://secretgardenrestaurant.at/menu
   https://secretgardenrestaurant.at/visit
   https://secretgardenrestaurant.at/about
   https://secretgardenrestaurant.at/gallery
   https://secretgardenrestaurant.at/en
   https://secretgardenrestaurant.at/en/menu
   a. Incollalo nella barra "Controlla qualsiasi URL" in alto.
   b. Clicca "Testa URL live" e aspetta il risultato.
   c. Clicca "Visualizza pagina sottoposta a test" → scheda HTML. Cerca nel codice e riporta: il valore di lang nel tag <html>, il valore del tag <link rel="canonical"> (deve esserci uno solo), e i tag <link rel="alternate" hreflang=...>.
   d. AZIONE: clicca "Richiedi indicizzazione". Se dice che la quota giornaliera è esaurita, fermati e dimmi quali URL restano.
2. Sitemap → nella casella "Aggiungi una nuova sitemap" scrivi sitemap.xml → AZIONE: "Invia". Riporta lo stato e il numero di URL rilevati (devono essere 14).

Formato di uscita: una tabella con URL, lang, canonical, hreflang trovati, esito della richiesta di indicizzazione. Poi lo stato della sitemap. Un dato che non trovi lo scrivi NON_DISPONIBILE.
Cosa aspettarsi: lang="de" sulle pagine senza /en e lang="en" su quelle con /en; canonical uguale all'URL stesso.
```

---

## S5 · Controllo posizioni (circa 5 minuti)

Quando: 15/10/2026 (c'è già un promemoria), poi una volta al mese. Misura l'effetto del merge `/en/` sulle query tedesche.

```text
Lavora solo in lettura in Google Search Console, proprietà https://secretgardenrestaurant.at. Non cambiare niente.

1. Rendimento → Risultati di ricerca. Attiva le 4 metriche (clic, impressioni, CTR, posizione media). Intervallo: "Confronta" → ultimi 28 giorni rispetto ai 28 giorni precedenti.
2. Scheda Query. Riporta per ciascuna di queste query, se compaiono, clic, impressioni e posizione nei due periodi: "vegetarisches restaurant wien", "vegane restaurants wien", "veganes restaurant wien", "vegan essen wien", "vegetarian restaurant vienna", "vegan restaurant vienna", "restaurant mariahilferstraße", "my secret garden", "secret garden wien".
3. Scheda Pagine: riporta le prime 10 pagine per clic, nei due periodi. Segnala se compaiono le pagine /en/.
4. Scheda Paesi: riporta i primi 5 paesi per clic.

Formato di uscita: una tabella per punto, con i due periodi affiancati. Un dato che non trovi lo scrivi NON_DISPONIBILE, mai 0.
```

---

## S6 · Scheda Google: controllo completo (circa 10 minuti)

Quando: adesso. Per le ricerche "vegan in meiner Nähe" e per Maps conta la scheda più del sito (vedi `seo-dati.md`, 27/09). Solo lettura: le correzioni le decide Francesco dopo aver visto la tabella.

```text
Lavora solo in lettura sul Profilo dell'attività Google di "My Secret Garden", Mariahilferstraße 45, 1060 Wien. Non modificare nessun campo, non rispondere alle recensioni, non pubblicare post, non caricare foto. Se ti chiede un login o un captcha, fermati e dimmelo.

1. Apri https://business.google.com e seleziona "My Secret Garden". Se non c'è o l'account non ha accesso, cerca "My Secret Garden Wien" su google.com e usa il pannello "Il tuo profilo dell'attività"; se non compare neanche quello, dimmelo e fermati.
2. Modifica profilo → Informazioni: riporta categoria principale e categorie secondarie, descrizione (testo esatto), sito web (URL completo, con eventuali parametri utm), link al menu, telefono, indirizzo.
3. Orari: riporta gli orari settimanali e gli orari speciali già inseriti per i prossimi 3 mesi (in Austria: 8 dicembre, 24–26 dicembre, 31 dicembre, 1 e 6 gennaio). Segnala i festivi senza orario speciale.
4. Attributi: riporta quelli attivi. Dimmi sì/no per: opzioni vegane, opzioni vegetariane, senza glutine, posti a sedere all'aperto, accesso in sedia a rotelle, pagamento con carta, asporto.
5. Recensioni: riporta il punteggio medio e il numero totale. Delle ultime 20 recensioni, quante hanno una risposta del proprietario; data della recensione più recente senza risposta.
6. Foto: numero totale di foto del proprietario, data della più recente caricata dal proprietario, se c'è una foto del menu e una dell'ingresso (l'arco).

Formato di uscita: una tabella per punto, con il dato e la pagina da cui l'hai letto. Un dato che non trovi lo scrivi NON_DISPONIBILE, mai 0. Alla fine, separata, una lista di al massimo 5 differenze rispetto a questi dati attesi: orari lun–sab 11:00–19:00, domenica chiuso, telefono +43 1 586 28 39, sito https://secretgardenrestaurant.at con utm_source=google-business&utm_medium=referral, link al menu https://secretgardenrestaurant.at/menu.
```

---

## S7 · Scheda Google: le due correzioni sicure (circa 3 minuti, AGISCE)

Quando: dopo la lettura S6 del 30/09/2026. Solo le correzioni che non richiedono decisioni: link al menu e servizio al tavolo. Festivi, nome e descrizione aspettano Carlo.

```text
Lavora sul Profilo dell'attività Google di "My Secret Garden", Mariahilferstraße 45, 1060 Wien, dal pannello "La tua attività su Google" nella Ricerca Google. Le uniche due azioni consentite sono quelle segnate AZIONE. Non toccare nessun altro campo, non rispondere alle recensioni, non caricare foto. Se ti chiede un login, un captcha o una nuova verifica dell'attività, fermati e dimmelo senza procedere.

1. Modifica profilo → Contatto → Link al menu. Riporta il valore attuale.
   AZIONE: sostituiscilo con https://secretgardenrestaurant.at/menu?utm_source=google-business&utm_medium=referral&utm_campaign=scheda-google&utm_content=menu e salva.
2. Modifica profilo → Altro → sezione Ristorazione (o Opzioni di servizio). Riporta gli attributi attuali.
   AZIONE: imposta "Servizio al tavolo" su No. Lascia "Servizio al banco" su Sì. Non toccare brunch, prenotazioni o altri attributi. Salva.
3. Ricarica il pannello e rileggi i due campi.

Formato di uscita: una tabella con campo, valore prima, valore dopo, stato ("salvato", "in revisione da Google" o il messaggio esatto). Un dato che non trovi lo scrivi NON_DISPONIBILE.
```

---

## S8 · Scheda Google: festivi chiusi (circa 5 minuti, AGISCE)

Quando: subito, il primo è il 26/10. Lista confermata da Carlo il 02/10/2026 ("segnali come chiusi"). Gli stessi giorni sono in `src/data/holidaysData.ts`.

```text
Lavora sul Profilo dell'attività Google di "My Secret Garden", Mariahilferstraße 45, 1060 Wien, dal pannello "La tua attività su Google" nella Ricerca Google. L'unica azione consentita è aggiungere orari speciali "Chiuso" nelle date sotto. Non toccare gli orari settimanali, gli attributi o altri campi. Se ti chiede un login, un captcha o una nuova verifica, fermati e dimmelo.

0. Modifica profilo → Altro (o Ristorazione): riporta se la modifica di "Servizio al tavolo / al banco" è ancora "in attesa". Non toccarla.
1. Modifica profilo → Orario → Orari speciali.
2. AZIONE: aggiungi queste date, ciascuna come "Chiuso":
   26 ottobre 2026, 8 dicembre 2026, 24 dicembre 2026, 25 dicembre 2026, 26 dicembre 2026, 31 dicembre 2026, 1 gennaio 2027, 6 gennaio 2027.
   Se Google propone da solo una di queste date ("Conferma l'orario festivo"), usa quella proposta e impostala su Chiuso.
3. Salva, ricarica il pannello e rileggi l'elenco degli orari speciali.

Formato di uscita: una tabella con data, stato prima, stato dopo, esito ("salvato", "in attesa" o il messaggio esatto). Un dato che non trovi lo scrivi NON_DISPONIBILE.
```

---

## Per Lovable (Semrush), non per il browser

Semrush lo usa Lovable, non Claude in Chrome. Da incollare a Lovable quando serve.

**L1 · Keyword gap con Tian e Velani** (una sola estrazione):

```text
Con Semrush, database Austria, data di oggi: fai un keyword gap tra secretgardenrestaurant.at e i siti di Tian (fine dining vegetariano, Wien) e Velani (Wien): trova tu i loro domini e dimmeli. Riporta le 30 keyword con più volume per cui Tian o Velani sono in top 20 e secretgardenrestaurant.at non c'è o è sotto la posizione 20. Per ciascuna: keyword, volume, KD, posizione di Tian, di Velani e nostra, URL di Tian/Velani che si posiziona. Non interpretare i dati: solo la tabella, e dimmi a parte paese, database e data dell'estrazione.
```
