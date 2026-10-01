# Stato aperto — CS01

> Cosa resta da fare, chi lo fa, da quando. Aggiornato alla fine di ogni
> sessione. Il *perché* delle decisioni sta in [`ragionamenti.md`](./ragionamenti.md),
> le decisioni di design in [`ux/divergence-ledger.md`](./ux/divergence-ledger.md).
> Ultimo aggiornamento: 26/09/2026.

Chi: **F** = Francesco · **C** = Carlo / il capo · **Claude** = sessione di codice.

---

## In corso

| Cosa | Chi | Stato |
|---|---|---|
| Struttura `/en/` + rilevamento lingua a 3 livelli | Claude | ✓ Su main dal 28/09/2026 (PR #19). Restano i passi in Search Console qui sotto (script S4) |
| Top bar e drawer mobile verso ≥70 al critico cieco | Claude | Voti dei giri: 57 → 61 → 49 → 50 → 56 → 55 → **59**. Per 70 servono le decisioni qui sotto. Giri 1 e 2 del piano fatti. Resta rosso WCAG 2.5.3 (Label in Name), che dipende dalla decisione A |

### Piano per la top bar (brief del critico, 26/09/2026)

**Fatto (giro 2, voto di partenza 50):** focus su `<main>` a ogni cambio di route; drawer accessibile anche con "riduci movimento"; pagina sotto il drawer `inert`; nero puro tolto dai `drop-shadow`; logo non più ovale a 320px; header del drawer alto 60px con la X alla stessa altezza dell'hamburger; filo sinistro unico a 20px; safe area per la PWA installata.

**Fatto (giro 1, voto di partenza 49):**
1. `LanguageSwitcher.tsx`: via bordo + ombra (fallimento duro), token pieni, pulsanti 44px
2. Focus del logo sull'hero: 1.14:1, invisibile. Come per i dischi, portarlo a ≥3:1
3. La barra non deve cambiare colore sotto il drawer aperto (`isHeroOverlay` senza `!isMobileMenuOpen`)
4. Blocco dello scroll della pagina a drawer aperto
5. Logo nell'header del drawer: 40px, sotto soglia, e doppione di "Home"
6. `text-primary/85` e `text-[10px]` → token e scala UI; stato attivo del drawer leggibile (oggi 1.07:1)
7. Barra scrollata allineata a DESIGN_SYSTEM §6 (superficie, soglia di scroll, scrim in dissolvenza)
8. `check-tells.sh`: la regex U2 non vede i `className={`...`}`, quindi il controllo bordo + ombra era un falso verde

**Fatto (giro 3, decisioni A, B, C approvate il 26/09/2026):** etichetta di pagina tolta su mobile (chiude WCAG 2.5.3), logo 44px fermo e centrato su ogni route, telefono come link testuale nel drawer, voci in ordine Home, Speisekarte, Besuche uns, Galerie, Unsere Geschichte (anche su desktop), `aria-label` "Sprache wählen" e "My Secret Garden, Startseite".

**Fatto (giro 4, voto di partenza 56):** tocco sulla pagina corrente senza perdita di focus, link logo grande quanto il logo (prima 230px di barra portavano alla home), backdrop e pannello con la stessa durata, logo del drawer 44px, telefono subito sotto le voci, un solo segnale di hover, token semantici al posto di primitivi e `text-white`, `check-tells.sh` che vede primitivi e bianco di default.

**Fatto (giro 5, voto di partenza 55):** drawer scorrevole (in orizzontale e con testo al 200% il selettore lingua era irraggiungibile), banner cookie che non blocca più l'hamburger in orizzontale, filetto inutile sopra "Sprache" tolto, `lang` e `type` sui pulsanti DE/EN.

**Fatto (giro 6, 27/09/2026):** stato di oggi nel drawer (stesso calcolo del badge dell'hero), X al posto dell'hamburger senza logo nell'header, copy approvato (Startseite, Besuch uns, Visit us, Ruf an / Call).

**✓ Bug "chiuso col foglio vuoto" corretto sul branch il 27/09/2026** (hero, card della home, /menu, drawer). Va in produzione col merge. Una chiusura straordinaria ora va segnata in `holidaysData`: il foglio vuoto non basta più.

**Leve per superare 59 (decisioni di F):**
- ✓ (27/09) *Il menu di oggi nel drawer* al posto del solo orario: i tre piatti, dal menu già caricato, come link a /menu, con più peso visivo delle voci. È il dato che "Google non ha" (direction lock). È la leva più forte.
- ✓ (27/09) *Stato chiuso che dice quando si riapre*: "Heute geschlossen. Morgen ab 11:00 wieder da." (la coppia BENE di voice-spec, riga 89), e "Jetzt geschlossen" con la riapertura. Il calcolo esiste già in `HomeMenuPreview.tsx`.
- *Zona del pollice*: blocco oggi + telefono in basso, sopra la lingua.
- *Un solo indicatore aperto/chiuso* tra hero e drawer (oggi due verdi e due misure), registrato in DS §6.
- *Selettore lingua*: stato selezionato meno pesante (contorno invece del disco pieno) e nome accessibile con "DE"/"EN" dentro ("EN, English version"), per WCAG 2.5.3.
- *Gutter delle pagine* (/visit, /about, /menu) sul filo di 20px della barra.

**Leve del giro 5 (1, 2 e 4 fatte il 27/09):**
1. *Stato di oggi nel drawer* ("Heute bis 19:00 geöffnet", stesso dato del badge dell'hero) nello spazio vuoto. È la voce che pesa di più (genericità ×3): senza, barra e drawer restano "lo schema di chiunque". Copy nuovo.
2. *Header del drawer*: X a sinistra, dove c'era l'hamburger, e niente link logo. Chiude la trappola del doppio tocco (ritoccare lo stesso punto porta alla home), il doppione logo/"Home" e la collisione a 320px.
3. *Nav desktop* sopra l'hero: voci e "Anrufen" sotto 4.5:1 sulla foto (3.3–4.2:1), vetro e anello al 50% già scartati su mobile. Allarga l'ambito al desktop.
4. *Copy*: "Besuche uns"/"Besuch uns", EN "Visit" → "Visit us", "Home" → "Startseite", telefono "Ruf an: …" / "Call: …".
5. *Fuori ambito*: h1 di /menu (x=24) e /visit (x=16) sul filo di 20px della barra; nero puro in `Hero.tsx` e `MobileStickyBar.tsx`.

**Da decidere (copy, emersi dal critico):** nel drawer "Home" è un doppione del logo e in DE convive con "Startseite" (toglierlo dal drawer?); la voce "Besuche uns" contro l'h1 "Besuch uns" di /visit; una parola accanto al numero di telefono ("Ruf uns an"?).

**Trovato adiacente:** a 320×640 il banner cookie copre la barra e l'hamburger non si tocca finché non si dà il consenso.

**Giro 9 (28/09, voto di partenza 63):** riapertura che salta i festivi, festivi e domenica sull'ora di Vienna, niente salto del telefono al caricamento, piatti separati e sottolineati, pallino neutro prima dell'apertura, "Die Karte von heute steht noch nicht online." nel drawer.
**Ancora da fare (fuso orario):** le card del menu (`HomeMenuPreview`, `MenuSection`) usano l'ora del telefono, non quella di Vienna.
**Copy da approvare (critico, giro 8):** nome accessibile del link dei piatti che dica dove porta ("Speisekarte: …"); aria-label "EN, English version" sul pulsante EN (WCAG 2.5.3).

**Copy ancora aperto:** "Menu" EN ambiguo accanto all'hamburger, "Home" vs "Startseite", "Visit" contro "Besuche uns" (peso ritmico).

**Trovato fuori ambito (26/09/2026):** `check-tells.sh` ora vede il nero puro anche in `rgba(0,0,0,…)` e segnala `Hero.tsx` (text-shadow), `MobileStickyBar.tsx:106` e `MenuFloatingPill.tsx:89`. Da portare su `--navy-500` in un giro dedicato.

---

## Dopo il merge su main (F)

- [x] Search Console → Controllo URL → **Richiedi indicizzazione** su `/`, `/menu`, `/visit`, `/about`, `/gallery`, `/en`, `/en/menu` (01/10/2026, S4)
- [x] Search Console → Sitemap → reinviare `sitemap.xml` (01/10/2026: "Riuscita", ma ancora 7 rilevate dalla lettura del 24/09)
- [ ] Dall'08/10: Sitemap → pagine rilevate devono essere 14
- [x] Controllo URL: `lang="de"` su `/`, `lang="en"` su `/en` (01/10/2026, test live)

## Da decidere

| Cosa | Chi | Note |
|---|---|---|
| `generate_lead` in GA4 | F + C | Conta le visite a `/contact` (link "Kontakt" del footer), non contatti veri |
| Futuro di `/link` | F + C | Zero atterraggi in 90 giorni: la bio Instagram punta a `/menu` |
| www o senza www | F | Scheda Google usa www, canonical e JSON-LD no. Scegliere uno e allineare tutto |
| `aggregateRating` nel JSON-LD | F | Aggiunto il 24/09 (4.7/936). Il 22/09 era stato scartato: Google vuole le recensioni visibili nella pagina, qui sono client-side. Rischio da rivalutare |
| Chi sono i 2 account con verifica GSC più vecchia | F | Search Console → Impostazioni → Utenti e autorizzazioni |
| Target BG01–BG04 | F + C | BG02 non misurabile, BG04 decaduto col form |
| DESIGN_SYSTEM §6 "active → scale(0.98)" contro §7 "mai zoom" | F | La top bar segue §7; `ui/button.tsx`, `MobileStickyBar`, `/link` hanno ancora lo scale |
| Hosting reale (Lovable? Vercel?) | F | Serve per i redirect 301 lato server. `vercel.json` nel repo l'ha scritto Claude, non prova niente |

## Scheda Google (lettura S6 del 30/09/2026, dettagli in `seo-dati.md`)

- [x] **S7** (01/10/2026): link al menu salvato; tavolo No e banco Sì in revisione da Google
- [ ] **Brunch** (C): lo dichiariamo? La modifica S7 lo toglie. Se sì, riaggiungerlo dopo che la revisione è chiusa
- [ ] Dal 03/10 (F): Ristorazione ancora "in attesa"? Solo allora contattare l'assistenza
- [ ] **Festivi** (C): lista dei giorni di chiusura 2026–27. Il 26/10 è tra meno di 4 settimane. Poi Claude allinea `holidaysData.ts` e S8 li mette nella scheda
- [ ] **Risposte alle recensioni** (C): 0 su 952. Decidere chi risponde e con che ritmo; Claude può scrivere 3–4 risposte tipo in du
- [ ] **Nome della scheda** (C): parole chiave nel nome, contro le linee guida Google. Tenere o tornare a "My Secret Garden"
- [ ] **Descrizione** (F): riscrittura con umlaut e senza il numero di recensioni fermo. Bozza da chiedere a Claude, approvazione in chat
- [ ] **Foto** (C): menu e arco d'ingresso, col photoshoot

## Fuori dal sito

- [ ] **Script pronti per Claude in Chrome** in `docs/script-browser.md`: S4 (indicizzazione, merge fatto), S6 (scheda Google), S1 (Search Console), S2 (GA4, 1000things), S3 (Falstaff) adesso; S5 il 15/10
- [ ] **Search Console, 15 minuti (F):** Azioni manuali (deve dire "nessun problema") · Link → Siti con più link (primi 10) · Rendimento → "vegetarisches restaurant wien" → scheda Dispositivi. Annotare in `docs/seo-dati.md`
- [ ] **1000things:** la ricerca sul loro sito non trova niente, ma GA4 registra 30 sessioni arrivate da lì. GA4 → Esplora → "Referrer della pagina" filtrato su 1000thingsmagazine.com: articolo vecchio, pagina di elenco o spam di referral? Poi il form per locali
- [ ] **Falstaff:** da un browser normale, cercare "My Secret Garden" su falstaff.com. È un partner: se la scheda c'è ma non ha il link, chiederlo
- [x] vegan.at e Wanderlog ci linkano (verificato il 28/09)
- [ ] **austria.info** (Österreich Werbung): nuovo obiettivo di link editoriale, emerso dal confronto con Jola

- [ ] **TripAdvisor** (C): il link al sito è `http://`, il link menu è `/speisekarte/`. Passare a `https://` e `/menu`
- [ ] **vegan.at** (F): scrivere a `restaurants@vegan.at` (database comunitario). Bozza da chiedere a Claude
- [ ] **1000things** (F): redazione `redaktion@1000thingsmagazine.com`. Bozza da chiedere a Claude
- [ ] **Wien.info**: percorso di ingresso non trovato (probabile partnership Wien Tourismus)
- [ ] **Falter**: verificare i dati della scheda ("60 persone", sala su prenotazione)
- [ ] **Instagram**: in GA4 controllare che compaia `instagram / social` (UTM in bio dal 23/09)
- [ ] **`/speisekarte/`**: oggi redirect via JavaScript (200 + JS), per Google più debole di un 301. Si sistema quando l'hosting è noto

## Promemoria

- **15/10/2026** — routine già programmata nella sessione cloud: Search Console → Rendimento → "vegetarisches restaurant wien", confronto con la posizione 12 di partenza; controllare risposte da vegan.at e 1000things.

## Idee proposte, mai confermate

- Prerendering per i crawler AI (GPTBot, ClaudeBot, Perplexity vedono solo il `<head>`): da provare su un branch di test
- Schema `Menu` generato da `klassikerData.ts`
- Storybook `addon-mcp`
