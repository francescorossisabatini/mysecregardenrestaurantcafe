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
| Struttura `/en/` + rilevamento lingua a 3 livelli | Claude | Sul branch `claude/adoring-newton-sm1p4c`, **non su main**. Merge solo su conferma di F |
| Top bar e drawer mobile verso ≥70 al critico cieco | Claude | Voti dei giri: 57 → 61 → **49** (l'ultimo giro ha allargato l'ambito a drawer e selettore lingua). Gate a11y ancora rosso. Piano sotto |

### Piano per la top bar (brief del critico, 26/09/2026)

**Giro 1, senza decisioni di F:**
1. `LanguageSwitcher.tsx`: via bordo + ombra (fallimento duro), token pieni, pulsanti 44px
2. Focus del logo sull'hero: 1.14:1, invisibile. Come per i dischi, portarlo a ≥3:1
3. La barra non deve cambiare colore sotto il drawer aperto (`isHeroOverlay` senza `!isMobileMenuOpen`)
4. Blocco dello scroll della pagina a drawer aperto
5. Logo nell'header del drawer: 40px, sotto soglia, e doppione di "Home"
6. `text-primary/85` e `text-[10px]` → token e scala UI; stato attivo del drawer leggibile (oggi 1.07:1)
7. Barra scrollata allineata a DESIGN_SYSTEM §6 (superficie, soglia di scroll, scrim in dissolvenza)
8. `check-tells.sh`: la regex U2 non vede i `className={`...`}`, quindi il controllo bordo + ombra era un falso verde

**Giro 2, servono decisioni di F:**
- **A.** Etichetta di pagina accanto al logo ("HOME", "SPEISEKARTE"): duplica l'h1, viene troncata a 320–360px, fa saltare il logo tra le route. Proposta: toglierla su mobile.
- **B.** Telefono nel drawer (oggi assente su mobile, presente su desktop). Proposta: link testuale col numero, non bottone verde.
- Copy minore: "Menu" EN ambiguo accanto all'hamburger, "Home" vs "Startseite", aria-label del selettore lingua in inglese anche in DE.

---

## Dopo il merge su main (F)

- [ ] Search Console → Controllo URL → **Richiedi indicizzazione** su `/menu`, `/visit`, `/about`, `/gallery`, `/en`, `/en/menu`
- [ ] Search Console → Sitemap → reinviare `sitemap.xml` (ora 14 URL, DE + EN)
- [ ] Da ~1 settimana dopo: Controllo URL su `/` → HTML renderizzato deve avere `lang="de"`; su `/en` `lang="en"`

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

## Fuori dal sito

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
