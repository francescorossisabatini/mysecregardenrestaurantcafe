
# Audit privacy / cookie / impressum — cosa manca o è incoerente

Ho verificato che cosa il sito **fa davvero** (raccolta dati, script esterni, embed, storage) e l'ho confrontato con `CookieConsent.tsx`, `Privacy.tsx` e `Impressum.tsx`.

## 1. Funzioni attive nel sito che toccano dati personali

| # | Funzione | Dove | Dato / trasferimento | Coperta oggi? |
|---|---|---|---|---|
| 1 | Google Analytics 4 (G-NMVX2R7493) | index.html loader | IP, device, eventi | ✅ Sì (consenso + Consent Mode v2) |
| 2 | Contentsquare | index.html loader | Click/scroll map | ⚠️ Parziale — banner dice "Contentsquare/Hotjar", Privacy anche. Ne gira solo uno: **Contentsquare** |
| 3 | Google Maps embed (iframe) | `Contact.tsx`, `pages/Contact.tsx` | IP → Google (US) al caricamento pagina | ❌ **Carica senza consenso.** Privacy la giustifica con Art. 6(1)(f) — debole. Serve click-to-load o consent gate |
| 4 | Google Fonts (fonts.googleapis.com) | index.html | IP → Google | ❌ Non dichiarato in Privacy |
| 5 | Supabase (DB + edge functions + Auth staff) | daily_menu, reservation form, staff login | Query da IP utente a supabase.co | ❌ Non menzionato come processor/hosting |
| 6 | Reservation Request Form (Anfrage) | `ReservationRequestForm.tsx` | Nome, telefono, email, messaggio → Supabase | ⚠️ Privacy §3 cita "Kontaktaufnahme" ma senza Art. 6(1)(b), senza retention, senza destinatario |
| 7 | Google Sheets menu fetch (gviz) | `googleSheetsService.ts` | Nessun dato personale in uscita (GET pubblico) | Nota tecnica: nessun rischio, ma richiede IP verso Google |
| 8 | Instagram Feed (snapwidget) | `InstagramFeed.tsx` | Placeholder (XXXXXX) — al momento inattivo | Se si attiva → serve consent gate |
| 9 | Hero A/B test (Supabase logging) | `heroAbTest.ts` | localStorage + eventi verso Supabase | ❌ Non dichiarato: né lo storage key né il test |
| 10 | localStorage funzionali | consenso, lingua, install-prompt, A/B, visit-count | Locali | ⚠️ Elenco degli storage key non fornito |
| 11 | PWA / Install prompt | `InstallPrompt.tsx` | 2 chiavi localStorage | Coperto da "necessari" ma non elencato |
| 12 | Staff login | `StaffLogin.tsx` (Supabase Auth) | Email/password staff | Non è area pubblica, ma va aggiunta menzione |

## 2. Incoerenze legali da correggere

**Cookie banner (`CookieConsent.tsx`)**
- Testo legale cita `"My Secret Garden, Wien"` come titolare, ma il titolare reale è **Purusha GmbH** (come da Impressum e Privacy). Da uniformare.
- Categoria "Verhaltensanalyse" nominata "Contentsquare/Hotjar" → tenere solo il servizio realmente in uso (Contentsquare).
- Manca link diretto a Impressum accanto a Privacy.

**Privacy (`Privacy.tsx`)**
- §4 Google Maps: base giuridica dichiarata Art. 6(1)(f) → per un embed che manda IP a Google negli USA lo **standard austriaco** è Art. 6(1)(a) (consenso). Va allineata al consent gate (vedi punto 3 sotto).
- §5 Analytics: nomina "Contentsquare/Hotjar" — semplificare a **Contentsquare**.
- Aggiungere nuove sezioni:
  - **Auftragsverarbeiter / Hosting**: Supabase (Lovable Cloud), Lovable app hosting.
  - **Google Fonts**: caricati da Google, IP trasmesso, oppure alternativa self-host.
  - **Reservierungsanfrage**: Art. 6(1)(b) DSGVO, campi raccolti, retention (es. 12 mesi), destinatari.
  - **A/B-Test**: variante hero assegnata via localStorage, evento anonimo verso Supabase, base Art. 6(1)(f).
  - **Cookies & Local Storage — elenco tabellare** dei singoli key (`cookie_consent_v2`, `msg_visit_count`, `msg_install_dismissed`, `secretgarden.hero_ab_assignment_v1`, ecc.) con durata e scopo. Obbligatorio per compliance TKG 2021 austriaco.
  - **Speicherdauer** per server log (attualmente vaga).

**Impressum (`Impressum.tsx`)**
- §5 ECG richiede due voci mancanti:
  - **Gewerberechtliche Vorschriften**: "Gewerbeordnung (GewO)" con link `www.ris.bka.gv.at`.
  - **Aufsichtsbehörde / Gewerbebehörde**: Magistratisches Bezirksamt für den 6. Bezirk, Wien.
  - **Kammer**: Wirtschaftskammer Wien, Fachgruppe Gastronomie.
- Nessuna menzione di **Berufsbezeichnung** (Gastgewerbe) — richiesta da §5 ECG per attività regolamentate.
- Va aggiunto un breve **Haftungsausschluss** per link esterni (obbligo di diligenza ECG).

## 3. Cosa propongo di modificare

### A. `CookieConsent.tsx`
- Titolare: `Purusha GmbH, Wien (Österreich)`.
- Etichetta categoria behavioral: `Contentsquare` (rimuovere "Hotjar" dove non attivo).
- Aggiungere link Impressum accanto a Datenschutz nel banner e nel footer del banner.

### B. `Privacy.tsx` — refactor mirato, non riscrittura
1. **§4 Google Maps** → riscrivere: "Wird erst geladen, wenn du zustimmst" + base Art. 6(1)(a).
2. **§5 Analyse** → semplificare in "Google Analytics" + "Contentsquare".
3. Aggiungere **§4b Google Fonts** (o self-host — decisione tua).
4. Aggiungere **§4c Hosting & Auftragsverarbeiter** (Supabase / Lovable).
5. Rinforzare **§3 Kontaktaufnahme / Reservierungsanfrage** con: campi raccolti, Art. 6(1)(b), retention 12 mesi (da confermare), destinatario "nur intern".
6. Aggiungere **§9 Cookies & Local Storage — tabella** con tutte le chiavi effettive.
7. Aggiungere **§10 A/B-Testing** (Hero test).
8. Aggiornare "Stand: [mese attuale]".

### C. `Impressum.tsx` — aggiunte al §4
- Gewerbeordnung + link RIS.
- Aufsichtsbehörde: Magistrat 6. Bezirk.
- Kammer: WKO Wien, Fachgruppe Gastronomie.
- Nuova §6 **Haftungsausschluss / Disclaimer** (contenuti + link esterni).

### D. Google Maps — consent gate (opzionale ma consigliato)
Sostituire l'iframe con un placeholder cliccabile che carica la mappa solo dopo click esplicito, oppure agganciarla al consenso analytics/behavioral. Riduce esposizione legale sui US-transfer.

## 4. Fuori scope (da confermare separatamente)

- Reset del versionamento consenso (`v2` → `v3`) per ri-chiedere consenso a tutti gli utenti dopo l'aggiornamento privacy. **Serve tua decisione**: obbligatorio se cambi finalità o processor.
- Retention effettiva delle email dal reservation form: da chiederti prima di scriverla.
- Self-hosting Google Fonts: taglierebbe una trasmissione dati a Google ma richiede modifica index.html/font pipeline.

---

## Dettagli tecnici

**File coinvolti**
- `src/components/CookieConsent.tsx` — testo `copy.de` / `copy.en`, ordine bottoni invariato.
- `src/pages/Privacy.tsx` — aggiunte sezioni, nessun refactor strutturale.
- `src/pages/Impressum.tsx` — aggiunte in §4 + nuova §6.
- `src/components/Contact.tsx` + `src/pages/Contact.tsx` — se scegli il consent gate per Maps: wrap iframe con componente `MapConsentGate`.

**Nessun cambiamento a**: schema Supabase, edge functions, business logic, routing, design tokens, copy invariato altrove.

**Estimated impact**: 3 file rilevanti + 1 nuovo componente opzionale (Maps gate). ~250 righe nette.

---

Se OK, procedo per fasi:  
**Fase 1** — allineamenti minimi (banner + Impressum §4 §6).  
**Fase 2** — Privacy: nuove sezioni Hosting, A/B, Cookies-Table, form.  
**Fase 3** — (opzionale) Maps consent gate + eventuale bump versione consenso.

Dimmi solo se: (a) retention email form = 12 mesi va bene, (b) vuoi Maps consent gate ora o dopo, (c) vuoi bump consenso a v3.
