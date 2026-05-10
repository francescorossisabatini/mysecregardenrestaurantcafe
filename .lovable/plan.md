## Obiettivo

Ogni domenica il menu della settimana scade automaticamente. Finché non carichi un nuovo Google Sheet ID dallo staff hub, il sito nasconde il menu settimanale ovunque e mostra un messaggio "wird aktualisiert". Quando carichi il nuovo ID, il menu torna visibile fino alla domenica successiva.

## Comportamento

- **Lun–Sab**: tutto come oggi, menu settimanale visibile (se l'ID è valido per la settimana corrente).
- **Domenica 00:00**: il menu settimanale viene considerato "scaduto" automaticamente. Tab Woche nascosto, anteprime nascoste, menu page mostra messaggio.
- **Tu carichi nuovo ID** (da /staff): l'ID viene marcato come valido fino alla domenica successiva 23:59. Il menu torna visibile da subito.
- Se la domenica non carichi nulla, lunedì rimane comunque nascosto finché non carichi.

## Cosa cambia

### 1. Database — nuova tabella `menu_config`
Una sola riga di configurazione:
- `sheet_id` (testo) — il Google Sheet ID corrente
- `loaded_at` (timestamp) — quando è stato caricato
- `loaded_by` (uuid) — quale staff
- RLS: lettura via edge function (service role), scrittura solo a chi ha ruolo staff/admin

### 2. Edge function `get-daily-menu`
- Legge prima `sheet_id` da `menu_config`, fallback all'env var attuale `GOOGLE_SHEET_ID`
- Restituisce nella response anche `loadedAt` (timestamp dell'ultimo caricamento)

### 3. Nuovo edge function `set-menu-sheet-id`
- POST con `{ sheetId }`
- Verifica auth + ruolo staff
- Aggiorna riga unica in `menu_config`, salva `loaded_at = now()`, `loaded_by = auth.uid()`
- Restituisce successo / errore di validazione (ID malformato)

### 4. Frontend — hook `useWeeklyMenuAvailable()`
Sostituisce la costante `SHOW_WEEKLY_MENU` (resta come override manuale di emergenza). Il hook restituisce `true` se:
- `loadedAt` esiste, e
- `loadedAt` è successivo all'ultima domenica 00:00 (timezone Europe/Vienna), e
- oggi non è domenica O (è domenica e l'ID è stato caricato oggi)

Logica equivalente: "il menu è valido finché non passa la prossima domenica 00:00".

Tutti i punti che oggi controllano `SHOW_WEEKLY_MENU` (MenuSection, MenuFloatingPill, WeeklySpecials, eventuali preview homepage) usano il nuovo hook.

### 5. Nuovo componente `WeeklyMenuPendingUpdate`
Sostituisce `WeeklyMenuUnavailable` quando la causa è "domenica + ID non aggiornato".

Copy nuova:
- **DE**: *Der Wochenplan wird gerade aktualisiert. Schau am Montag wieder vorbei oder ruf uns an: +43 1 586 28 39.*
- **EN**: *The weekly menu is being updated. Check back on Monday or call us: +43 1 586 28 39.*

Stile: stesso layout di `WeeklyMenuUnavailable`, tono accogliente, niente urgency, link telefono cliccabile.

### 6. Staff hub — sezione "Aggiorna menu della settimana"
Piccolo blocco in `/staff` (StaffHub):
- Input testo per incollare URL completo del Google Sheet o solo l'ID
- Bottone "Carica menu della settimana"
- Mostra: ultimo caricamento (data + chi), stato (valido/scaduto), prossima scadenza (domenica successiva)
- Estrae automaticamente l'ID se incolli URL completo (regex già presente nell'edge function attuale)
- Toast di conferma + invalidazione cache locale del menu

## Dettagli tecnici

### Calcolo "ultima domenica" (Europe/Vienna)
```ts
function lastSundayMidnightVienna(now = new Date()): Date {
  // Converti now in Vienna time, trova la domenica più recente alle 00:00,
  // poi riporta a UTC. Usa Intl.DateTimeFormat con timeZone Europe/Vienna.
}
const isWeeklyMenuValid = loadedAt && loadedAt >= lastSundayMidnightVienna();
```

### Bypass per emergenza
La costante `SHOW_WEEKLY_MENU` in `src/config/menuFlags.ts` resta come master switch: se `false`, il menu è nascosto comunque. L'hook controlla prima la costante, poi la logica auto.

### Schema DB
```text
menu_config
├── id           uuid   pk default gen_random_uuid()
├── sheet_id     text   not null
├── loaded_at    timestamptz not null default now()
├── loaded_by    uuid   references auth.users(id)
└── singleton    bool   unique default true   -- forza una sola riga
```

### File toccati
- `supabase/migrations/...` — nuova tabella + RLS
- `supabase/functions/get-daily-menu/index.ts` — leggi da DB
- `supabase/functions/set-menu-sheet-id/index.ts` — nuovo
- `src/hooks/useWeeklyMenuAvailable.ts` — nuovo
- `src/components/WeeklyMenuPendingUpdate.tsx` — nuovo
- `src/components/MenuSection.tsx` — sostituisci flag con hook
- `src/components/MenuFloatingPill.tsx` — idem
- `src/pages/WeeklySpecials.tsx` — idem
- `src/pages/StaffHub.tsx` — aggiungi blocco upload sheet ID

### Cosa NON cambia
- Nessuna modifica al copy del resto del sito
- Nessuna modifica al design system, ai token, alla nav
- Nessuna modifica alla struttura del Google Sheet
- L'env var `GOOGLE_SHEET_ID` resta come fallback iniziale (prima del primo upload)

## Domanda finale prima di implementare

Confermi le copy DE/EN sopra? Se preferisci wording diverso (es. tono più caldo, citare "lo chef sta scegliendo i piatti"), dimmi e lo cambio prima di scrivere codice.
