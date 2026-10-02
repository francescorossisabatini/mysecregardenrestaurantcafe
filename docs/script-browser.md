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

Quando: **solo dopo** che il merge è in produzione (Lovable ha pubblicato). Questo script **agisce**: chiede l'indicizzazione e reinvia la sitemap. Sono le sole due azioni consentite.

```text
Lavora in Google Search Console, proprietà https://secretgardenrestaurant.at. Le uniche azioni consentite sono "Richiedi indicizzazione" e "Invia" della sitemap, come indicato sotto. Non cambiare nient'altro. Se ti chiede un login o un captcha, fermati e dimmelo.

0. Prima di tutto verifica che la nuova versione sia online. Apri in una scheda normale https://secretgardenrestaurant.at/en/menu: deve mostrare la pagina del menu in inglese (titoli in inglese, non una pagina "404" e non la versione tedesca). Poi apri https://secretgardenrestaurant.at/sitemap.xml: deve contenere indirizzi con "/en". Se una delle due verifiche fallisce, FERMATI senza richiedere nessuna indicizzazione e dimmi cosa hai visto: il deploy non è ancora pubblicato.

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

## S6 · Foto di Sri Chinmoy e Soul-Birds con licenza utilizzabile (circa 15 minuti)

Quando: prima di portare /about in produzione. Le foto attuali sono deboli: `sri-chinmoy-birds.jpg` è 262×193px, e la licenza delle due immagini nel repo non è documentata. Il sito è di un'attività commerciale: servono licenze che permettano l'uso commerciale. Il ritratto viene ritagliato a quadrato (`object-cover`), quindi serve anche il permesso di modificare. Va bene **CC BY 4.0**. **CC BY-ND** non permette il ritaglio. Le licenze **NC** (non commerciale) non vanno bene.

Fonti trovate il 02/10/2026 (dal container cloud non erano raggiungibili, vanno aperte nel browser):
- Sri Chinmoy Centre, Gallery Commons, foto scelte in CC BY 4.0: https://www.srichinmoycentre.org/gallery-commons
- Sri Chinmoy Centre, foto di Sri Chinmoy (dichiarate CC BY-ND 4.0): https://www.srichinmoycentre.org/photos-sri-chinmoy
- Galleria del Centre (CC BY-NC-ND salvo indicazione sulla singola foto): https://gallery.srichinmoycentre.org/index.php/sri_chinmoy
- Soul-Birds: https://www.srichinmoycentre.org/news/art/sri-chinmoys-soul-bird-drawings e https://www.srichinmoyart.com/
- Note di copyright: https://www.srichinmoycentre.org/copyright

```text
Lavora in lettura nel browser. L'unica AZIONE ammessa è scaricare file immagine nella cartella Download. Non creare account, non compilare moduli, non scrivere a nessuno. Se compare un login o un captcha, fermati e dimmelo.

Cerco due immagini per il sito di un ristorante (uso commerciale):
A) un ritratto di Sri Chinmoy, viso ben leggibile, sfondo calmo, almeno 800×800px; verrà ritagliato a quadrato;
B) un disegno di Soul-Birds (uccelli a tratto), almeno 1200px di lato lungo, su fondo chiaro.

1. Apri https://www.srichinmoycentre.org/copyright e riporta il testo esatto su licenze e uso commerciale.
2. Apri https://www.srichinmoycentre.org/gallery-commons. Per ogni foto che può fare da A, riporta: link alla pagina, licenza scritta sulla pagina della foto, autore o fotografo, dimensione del file originale, anno se indicato. Massimo 8 foto.
3. Apri https://www.srichinmoycentre.org/photos-sri-chinmoy e fai lo stesso. Massimo 5 foto.
4. Cerca disegni di Soul-Birds (B) su https://www.srichinmoycentre.org/news/art/sri-chinmoys-soul-bird-drawings e https://www.srichinmoyart.com/. Riporta le stesse colonne. Massimo 5.
5. AZIONE: scarica nella cartella Download solo i file con licenza CC BY 4.0 (o CC0 / pubblico dominio), alla risoluzione più alta disponibile. Massimo 3 per A e 3 per B. Nome del file: msg-ritratto-1.jpg, msg-soulbirds-1.jpg, e così via.

Formato di uscita: due tabelle (A e B) con colonne: n., link, licenza esatta, autore, dimensione in px, scaricato sì/no, nome file. Sotto, il testo di attribuzione da usare per ogni file scaricato, copiato dalla pagina. Un dato che non trovi lo scrivi NON_DISPONIBILE, mai 0. Le foto con licenza NC o ND le elenchi ma non le scarichi.
```

Dopo: carica i file scelti in chat. Claude li mette in `src/assets/`, scrive l'attribuzione accanto all'import e una riga nel ledger. Se nessuna foto in CC BY va bene, la strada più semplice è chiedere al proprietario: il locale è legato al Centre, che può dare il permesso per iscritto.

---

## S7 · Google Maps: una recensione da citare e una foto dei gestori (circa 10 minuti)

Quando: per /about, variante B (prototipo `09-about-racconto.tsx`). Servono una frase vera da una recensione Google, da mettere accanto al 4,7, e una foto di Ashru Reichel e Chintamani Nerdmeyer per il capitolo "Wie es angefangen hat". Per pubblicarle servono comunque il sì dei gestori (per la foto) e, per la recensione, almeno il nome come lo mostra Google.

```text
Lavora in lettura su Google Maps. L'unica AZIONE ammessa è scaricare file immagine nella cartella Download. Non scrivere recensioni, non rispondere, non segnalare niente. Se compare un login o un captcha, fermati e dimmelo.

1. Apri Google Maps e cerca "My Secret Garden, Mariahilfer Straße 45, 1060 Wien". Apri la scheda del locale.
2. Recensioni → ordina per "Più pertinenti". Leggi le prime 40 recensioni con 5 stelle. Scegli fino a 5 frasi che dicono un FATTO sul locale (un piatto, il cortile, il banco, il personale, la torta), non solo "super" o "consigliato". Per ognuna riporta: la frase esatta copiata, nome dell'autore come lo mostra Google, data, lingua, numero di stelle.
3. Foto → filtra "Dal proprietario" (se c'è). Cerca foto in cui si vedono persone dello staff o i gestori. Per ognuna riporta: link, chi l'ha caricata (proprietario o utente), data, cosa si vede.
4. AZIONE: scarica solo le foto caricate dal proprietario in cui si vedono persone, alla massima risoluzione. Massimo 4. Nome file: msg-persone-1.jpg, msg-persone-2.jpg…
5. Nella scheda, riporta anche: numero esatto di recensioni e media mostrata oggi.

Formato di uscita: tabella A (frasi: n., frase esatta, autore, data, lingua, stelle) e tabella B (foto: n., link, caricata da, data, cosa si vede, scaricata sì/no). Un dato che non trovi lo scrivi NON_DISPONIBILE, mai 0. Le foto caricate da utenti le elenchi ma non le scarichi.
```

Dopo: incolla le tabelle in chat e carica le foto scaricate. Claude sceglie la frase più concreta e la propone a Francesco; la foto va confermata dai gestori prima della produzione.

---

## Per Lovable (Semrush), non per il browser

Semrush lo usa Lovable, non Claude in Chrome. Da incollare a Lovable quando serve.

**L1 · Keyword gap con Tian e Velani** (una sola estrazione):

```text
Con Semrush, database Austria, data di oggi: fai un keyword gap tra secretgardenrestaurant.at e i siti di Tian (fine dining vegetariano, Wien) e Velani (Wien): trova tu i loro domini e dimmeli. Riporta le 30 keyword con più volume per cui Tian o Velani sono in top 20 e secretgardenrestaurant.at non c'è o è sotto la posizione 20. Per ciascuna: keyword, volume, KD, posizione di Tian, di Velani e nostra, URL di Tian/Velani che si posiziona. Non interpretare i dati: solo la tabella, e dimmi a parte paese, database e data dell'estrazione.
```
