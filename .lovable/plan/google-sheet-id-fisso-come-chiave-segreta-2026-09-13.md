# Google Sheet ID fisso come chiave segreta

## Obiettivo
Il foglio menu non cambierà più ID: verrà solo aggiornato il contenuto. L'ID (`1ADidZMiVlJmN-bN2N-T8eiw6pzL-5QvN`) va spostato dalla tabella `menu_config` a un secret del backend, così non serve più toccare il database.

## Passi

1. **Aggiornare il secret `GOOGLE_SHEET_ID`** con il nuovo valore tramite il form sicuro (il secret esiste già, quindi serve l'aggiornamento, con conferma dell'utente).

2. **Modificare `supabase/functions/get-daily-menu/index.ts`**:
   - Leggere l'ID da `Deno.env.get("GOOGLE_SHEET_ID")` come fonte primaria.
   - Mantenere `menu_config` come fallback se il secret manca (compatibilità con quanto già in produzione).
   - Il fallback hardcoded attuale viene aggiornato allo stesso nuovo ID.

3. **Rideployare la funzione** `get-daily-menu`.

4. **Verifica**: chiamata POST alla funzione e controllo che il menu della settimana corrente venga restituito correttamente (giorni, zuppe, piatti).

## Note tecniche
- `menu_config` e la funzione `set-menu-sheet-id` restano invariate: nessuna migrazione, nessuna modifica allo schema.
- Il secret non è visibile nel codice né nel browser; solo le funzioni server lo leggono.
- In futuro, per cambiare settimana basterà aggiornare il contenuto dello stesso Google Sheet: zero interventi sul sito.
