# CLAUDE.md — My Secret Garden
> Leggi questo file prima di toccare qualsiasi cosa nel repo.
> Ultimo aggiornamento: maggio 2026

---

## Chi sono io — il designer di questo progetto

Mi chiamo **Francesco Rossisabatini**. Sono un UX Designer e Digital Manager in formazione, laureando alla **Università degli Studi di Milano-Bicocca** (Teoria e Tecnologia della Comunicazione — TTC). Questo progetto — chiamato internamente **CS01** — è simultaneamente un deliverable reale per un cliente e un **case study di portfolio**.

Il mio obiettivo professionale è crescere come junior UX Designer → UX Researcher → Product Manager/PdM, con focus sul mercato fintech (N26, Revolut, Erste Bank) e Vienna come mercato primario.

**Ruolo su questo progetto:** gestisco sia il lavoro di design/prodotto che la relazione con il cliente (il proprietario del ristorante). Sono l'unico designer, il responsabile del repo, e l'interlocutore tra Figma, GitHub e Lovable.

**Stack di lavoro:**
- Design: Figma (file key `ROhPox2dPuVizyYXiLAbKN`)
- Project management: Notion (CS01 root `32e2da0682ac8197ba4ac538d91b51af`)
- Sviluppo: React + TypeScript + Tailwind CSS + Supabase + Lovable
- Repo locale: `C:\Users\fraro\mysecregardenrestaurantcafe\`
- Repo GitHub: `francescorossisabatini/mysecregardenrestaurantcafe`

---

## Il progetto — CS01

**secretgardenrestaurant.at** è il sito di My Secret Garden, un café-ristorante vegetariano a Vienna. Il sito originale è stato costruito con Lovable senza un processo UX formale. CS01 è un **redesign completo e documentato**: dalla ricerca quantitativa su dati reali, al design system, ai wireframe, all'implementazione, fino alla misurazione GA4.

- **Tipo:** B2C · Hospitality / Food & Beverage
- **Stage:** Full redesign — non MVP, non nuova feature
- **Live site:** secretgardenrestaurant.at
- **Audit score AS-IS:** 6.5/10 (analisi marzo 2026)

---

## Il ristorante

**My Secret Garden** — café-ristorante vegetariano e vegano
- Indirizzo: **Mariahilferstraße 45, Im Raimundhof, 1060 Wien**
- Nascosto in un cortile — l'ingresso è attraverso un arco, non visibile dalla strada
- Ispirato alla filosofia di **Sri Chinmoy** — dimensione spirituale incorporata nello spazio
- **Counter service only** — nessun servizio al tavolo, probabilmente nessuna prenotazione (da confermare)
- Orari: **lunedì–sabato, 11:00–19:00** · domenica e festivi: chiuso
- Telefono: **+43 1 586 28 39** · `tel:+431586289`
- Rating: **4.7★ su 936+ recensioni** (Google, HappyCow, Falstaff, TripAdvisor, Wien wie es isst)
- Partner confermati: Supermind Kaffee (supermind.at), Falstaff 2025, Wien wie es isst 2025, HappyCow, TripAdvisor, foodsharing.at

---

## Principio guida non negoziabile

> **"Il sito accoglie — non cattura."**

Questo vincola ogni decisione di feature, flusso e copy. In pratica:
- Nessun popup, nessun banner invasivo
- Nessun form di acquisizione email
- Nessun funnel di conversione aggressivo
- **Una sola CTA primaria per pagina** — mai due azioni in competizione
- La prenotazione si chiama **"Anfrage"** (richiesta), non "Reservierung" (prenotazione vincolante)
- Il telefono è sempre il canale primario suggerito; il form è l'alternativa
- **Non usare mai linguaggio di urgency** (es. "Jetzt reservieren!", "Letzte Plätze!")

---

## Stack tecnico

| Layer | Tech |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS (token system — vedi sezione dedicata) |
| Backend / DB | Supabase (`daily_menu` table — aggiornata ogni mattina dallo staff) |
| Deploy | Lovable → GitHub (push su `main` va in produzione via Lovable) |
| Design source | Figma `ROhPox2dPuVizyYXiLAbKN` |
| Analytics | GA4 + Hotjar (Microsoft Clarity NON è installato) |
| Lingua default | DE (73% traffico austriaco) — EN parità su tutti i route |

**Vincoli di piattaforma:**
- Mobile-first — 74% traffico mobile (GA4 confermato)
- Sessione media: 58 secondi — gli utenti decidono in fretta
- SPA React — nessun reload tra route; il browser back deve funzionare su tutti i route
- Nessun carousel — rimosso (click rate ~1%, costo performance non giustificato)
- Nessun pagamento online — pay at pickup only
- Foto piatti: scatto reale in corso (aprile–maggio 2026) — placeholder fino ad allora
- Target performance: <3s load su 4G mobile

---

## Information Architecture

| Route | Scopo | Status |
|---|---|---|
| `/` | Homepage — trust, desire, friction removal | ✅ Attiva |
| `/menu` | Menu hub — Heute / Diese Woche / Immer da | ✅ Attiva |
| `/visit` | Orari, directions, form Anfrage | ✅ Attiva |
| `/about` | About page — manifesto e narrativa | ✅ Attiva |
| `/gallery` | Galleria foto reali | ✅ Attiva |
| `/link` | Link hub (bio social) | ✅ Attiva |
| `/impressum` | Legal — obbligatorio per legge austriaca | ✅ Attiva |
| `/privacy` | Cookie policy — GDPR | ✅ Attiva |
| `/staff`, `/staff/login` | Area staff — noindex, esclusa da robots.txt | ✅ Attiva |
| `/reservation-preview` | Preview interna Anfrage | ✅ Attiva |


**Redirect:** `/wochenkarte` → `/menu` (permanente, confermato)

**Navigazione:**
- Bottom nav mobile (sempre visibile, fixed): Home · Menü · Visit · Call pill
- `/order` **non** è in bottom nav — si accede dal tab "Always Here" del menu
- Top bar: logo + language switch DE/EN

---

## Design System — vedi DESIGN_SYSTEM.md

> **Token, palette, tipografia, componenti, motion e accessibilità vivono in [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).**
> Quel file è la fonte di verità ed è verificato contro il codice. Le specifiche che stavano qui erano divergenti (prescrivevano classi Tailwind inesistenti) e sono state rimosse per evitare conflitti.

Promemoria dei soli vincoli di alto livello:

- **Mai hex hardcoded, mai token primitivi, mai colori Tailwind di default nei componenti.** Solo token semantici.
- **Palette:** dosaggio 60% cream / 30% navy / 10% verde (solo CTA, nav attivo, rating, accenti).
- **Font:** `font-caveat` (solo h1 hero e logo), `font-cormorant` (headings), `font-lora` (body), `font-work` (UI). Max 2 typeface per viewport, Caveat max 1 occorrenza.
- **Motion:** solo fade lente e slide sottili. Mai zoom, mai parallax, mai animazioni infinite. `prefers-reduced-motion` sempre rispettato.
- **Accessibilità:** WCAG 2.1 AA, touch target 44×44px, focus ring visibile, `aria-label` su ogni icona.
- **Mai `#000000`** e mai verde chiaro come testo su sfondo chiaro.


---

## Copy — Lingua e Tono

- **Lingua default:** DE (73% traffico austriaco)
- **Tono:** du — colloquiale, viennese, caldo
- **Forma:** du (mai Sie, mai voi)
- **Nessun urgency language** — mai "Jetzt!", "Letzte Chance", "Sofort"
- Copy in DE e EN — pari peso ritmico, non traduzione letterale
- **Sri Chinmoy:** citato discretamente, mai spiegato. Link esterno a srichinmoy.org (nuova tab)
- Citazione confermata: *"To serve and never be tired is love."* — una sola per pagina, mai nell'hero

### Copy approvato per sezioni chiave

**HERO**
- DE tagline: *Vegetarisch. Vegan. Versteckt im Herzen Wiens.*
- EN tagline: *Vegetarian. Vegan. Hidden in the heart of Vienna.*
- DE CTA: *Was gibt's heute?*
- EN CTA: *What's on today?*
- DE link: *Wie du uns findest →*
- EN link: *How to find us →*

**MENÙ OGGI**
- DE eyebrow: *HEUTE* · heading: *Was heute auf den Tisch kommt.*
- EN eyebrow: *TODAY* · heading: *What's on the table today.*

**IL POSTO (3 step)**
- Step 01 DE: *Geh durch den Bogen* — "Mariahilferstraße 45 — der Durchgang ist absichtlich versteckt."
- Step 02 DE: *Durch den Innenhof* — "Im Raimundhof — ein stiller Wiener Hof."
- Step 03 DE: *Setz dich. Bleib.* — "Keine Eile. Dieser Ort ist gemacht zum Verweilen."

**FORM PRENOTAZIONE**
- Label: *Tisch anfragen* (mai "Reservieren")
- CTA: *Anfrage senden* (mai "Reservieren" o "Buchen")
- Nota: *Keine Buchungsgarantie — wir melden uns bei dir.*
- Telefono visibile sempre: +43 1 586 28 39

**FORM TORTE**
- Subline DE: *Zahlung an der Kasse bei Abholung.*
- Lead time standard: *Mindestens 24h im Voraus.*
- CTA: *Bestellung senden*

---

## Debito tecnico noto

La vecchia lista bug (hex hardcoded in `MenuSection.tsx`, font Playfair/Dancing Script in `About.tsx`) non trova più riscontro nel codice: verificato il 19 agosto 2026.

Il debito residuo e i token semantici mancanti sono documentati nella sezione **"Gap noti"** di `DESIGN_SYSTEM.md`.


---

## File chiave nel repo

```
src/components/MenuSection.tsx   — dietary badges, dish cards, tab menu
src/components/Hero.tsx          — open/closed badge, hero, rating
src/components/About.tsx         — typography bug, font non dichiarati
src/components/Reviews.tsx       — star rating
src/components/Footer.tsx        — mobile padding, orari
src/components/Navigation.tsx    — top bar + bottom nav
tailwind.config.ts               — definizione token (fonte della verità)
src/index.css                    — CSS custom properties / variabili
```

---

## Supabase — schema esistente (non modificare senza istruzione)

- Tabella `daily_menu`: aggiornata ogni mattina dallo staff
- Campi attesi: dish name (EN), category (ZUPPA/VERDE/BLU), price, dietary flags, photo URL
- Errore Supabase → messaggio statico: "Menu not available right now — come visit us"
- Menu non aggiornato → mostrare ultima data disponibile + messaggio

---

## Analytics — GA4 Events da tracciare

```
click_get_directions     — KPI primario
click_call_now           — KPI primario
scroll_depth_homepage    — 25% / 50% / 75% / 100%
click_menu_tab           — Today / This Week / Always Here
click_open_closed_badge  — segnale di intent visita
form_reservation_submit  — Anfrage inviata
cake_call_click          — click telefono da /order
```

---

## Utenti — profili da GA4 (ricerca primaria in CS02)

| Profilo | Chi è | Goal | Time budget |
|---|---|---|---|
| **A — The Seeker** | Prima visita, da Google/passaparola | Decidere se venire oggi | < 90 secondi |
| **B — The Regular** | Torna per il menu del giorno | Cosa c'è oggi in < 20s | < 20 secondi |
| **C — Dietary** | Ricerca opzioni vegane/GF/bio | Validare che il posto vada bene | 1–3 minuti |
| **D — Curious** | Incuriosito dalla filosofia | Capire chi sono | 1–3 minuti |

---

## Cosa NON toccare senza istruzione esplicita da Francesco

- **Schema Supabase** — nessuna modifica al DB
- **Struttura route** — nessuna nuova route
- **Copy / testo UI** — nessuna modifica al wording approvato
- **Logica di business** — Supabase queries, form submission, routing
- **tailwind.config.ts** — modifiche solo su istruzione, con mapping documentato
- **Route `/about`** — solo placeholder, in attesa di brief contenuti
- **Foto** — placeholder fino al photoshoot (aprile–maggio 2026)
- **CS02 scope** — WhatsApp channel, `/eventi` route: fuori scope CS01

---

## Do's and Don'ts — sintesi rapida

### Do ✅
- Usa token semantici nei className — sempre
- Abbraccia il whitespace — `gap-16`, `py-20` e oltre
- No-Line Rule: usa il cambio di superficie (cream → white) per separare sezioni, non i bordi
- Testo body sempre left-aligned — center solo per header poetici brevi
- Ogni immagine informativa ha un `alt` descrittivo

### Don't ❌
- Mai `#000000` — sempre `#1a1a1a` (`text-text-primary`)
- Mai border-radius < 8px su elementi interattivi
- Mai center-align su testo body lungo
- Mai più di un'animazione contemporaneamente
- Mai `green/300` (`#8fb86a`) come testo su sfondo chiaro — fallisce WCAG AA
- Mai Caveat più di una volta per viewport
- Mai dichiarare la spiritualità — si sente, non si spiega; max un riferimento per pagina
- Mai urgency language — niente "Jetzt!", "Sofort!", "Letzte Chance"

---

## Come lavorare con me (Francesco)

- **Prima di ogni task di alto costo token:** proponi alternative più leggere ordinate per costo
- **Una modifica per sessione se possibile** — meglio chirurgico che globale
- **Non cambiare copy** senza che io l'abbia approvato in chat
- **Non fare push su `main`** senza che io lo confermi
- **Documenta** ogni decisione non ovvia con un commento nel codice

---

*Questo file è generato e mantenuto da Francesco. Aggiornalo dopo ogni sessione significativa.*
