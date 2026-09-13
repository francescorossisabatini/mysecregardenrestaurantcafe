# Rimozione tool MCP prenotazioni

Verificato: `supabaseForUser` (in `src/lib/mcp/supabase.ts`) è usato solo da `list-reservations.ts` e `update-reservation.ts`. Confermo la rimozione di tutti e tre i file.

## Cosa faccio

1. **Elimino 3 file**:
   - `src/lib/mcp/tools/list-reservations.ts`
   - `src/lib/mcp/tools/update-reservation.ts`
   - `src/lib/mcp/supabase.ts` (resta orfano dopo la rimozione — verificato)

2. **Aggiorno `src/lib/mcp/index.ts`**:
   - Rimuovo gli import di `listReservations` e `updateReservation` (righe 6–7)
   - Rimuovo le due voci dall'array `tools`
   - Tolgo dalla stringa `instructions` la frase «Staff members can additionally use list_reservations and update_reservation to review and answer table requests (Anfragen).»

3. **Rigenero gli artefatti**:
   - `supabase/functions/mcp/index.ts` (bundle generato, non modificato a mano)
   - `.lovable/mcp/manifest.json`

4. **Rideploy** della edge function `mcp` e verifica che i tool esposti siano solo i 4 rimasti.

## Cosa NON tocco

- Tabella `reservation_requests` e i suoi dati
- `ReservationRequestForm.tsx`, `Contact.tsx`
- Tutte le altre edge function (in particolare `get-daily-menu`)

## Risultato atteso

Il server MCP esporrà solo: `get_todays_menu`, `get_weekly_menu`, `get_classics_menu`, `get_visit_info`. I tool staff `list_reservations` e `update_reservation` spariranno dal manifest e dal server.
