# Guida: Come Modificare il Menu Settimanale

## Panoramica

Il menu settimanale del ristorante viene gestito tramite un foglio Google Sheets. Questo permette di modificare facilmente i piatti senza toccare il codice.

## Setup Iniziale (da fare una volta sola)

### 1. Creare il Foglio Google Sheets

1. Vai su [Google Sheets](https://sheets.google.com)
2. Crea un nuovo foglio chiamato "Menu Settimanale Secret Garden"
3. Rinomina il primo foglio in **Menu** (importante!)

### 2. Struttura del Foglio

Crea le seguenti colonne nella prima riga (header):

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Giorno DE | Giorno EN | Zuppa DE | Zuppa EN | Verde DE | Verde EN | Blu DE | Blu EN | Nota Blu DE | Nota Blu EN |

**Prima riga (sotto l'header):** inserisci il periodo del menu
- Nella cella A1: scrivi il periodo (es. "10-15. November")
- Lascia le altre celle della prima riga vuote

**Dalla terza riga in poi:** inserisci i dati per ogni giorno

### 3. Esempio di Compilazione

```
Riga 1 (Periodo):
10-15. November | | | | | | | | | |

Riga 2 (Header):
Giorno DE | Giorno EN | Zuppa DE | Zuppa EN | Verde DE | Verde EN | Blu DE | Blu EN | Nota Blu DE | Nota Blu EN

Riga 3 (Lunedì):
Montag | Monday | Kürbissuppe mit... | Pumpkin soup with... | Zucchini gefüllt... | Stuffed zucchini... | Lachs mit... | Salmon with... | | |

Riga 4 (Martedì):
Dienstag | Tuesday | ... | ... | ... | ... | ... | ... | vegetarisch & glutenfrei | vegetarian & gluten-free |
```

### 4. Rendere il Foglio Pubblico

1. Clicca su **File** > **Condividi** > **Condividi con altri**
2. Clicca su **Cambia** accanto a "Con restrizioni"
3. Seleziona **Chiunque abbia il link può visualizzare**
4. Clicca su **Fine**

### 5. Ottenere l'ID del Foglio

1. Copia l'URL del foglio Google Sheets
2. L'URL avrà questo formato:
   ```
   https://docs.google.com/spreadsheets/d/[QUESTO-È-L-ID]/edit
   ```
3. Copia la parte `[QUESTO-È-L-ID]`

### 6. Configurare l'ID nel Sito

1. Crea un file `.env.local` nella root del progetto (se non esiste già)
2. Aggiungi questa riga:
   ```
   VITE_GOOGLE_SHEETS_ID=IL-TUO-ID-QUI
   ```
3. Sostituisci `IL-TUO-ID-QUI` con l'ID copiato al punto 5

## Modificare il Menu Settimanale

### Ogni Settimana:

1. Apri il foglio Google Sheets
2. Modifica la **prima riga** con il nuovo periodo (es. "17-22. November")
3. Modifica le descrizioni dei piatti nelle celle corrispondenti
4. Salva (si salva automaticamente!)

### Note Importanti:

- ✅ Modifica **solo** le descrizioni dei piatti (colonne Zuppa, Verde, Blu)
- ✅ Puoi modificare la nota per il piatto blu (es. "vegetarisch", "glutenfrei")
- ❌ Non modificare i nomi delle colonne (header)
- ❌ Non cancellare righe o colonne
- ❌ Non modificare la struttura del foglio

### Aggiornamento del Sito:

- Il sito si aggiorna **automaticamente** entro 10 minuti
- Per vedere le modifiche immediatamente: ricarica la pagina (F5 o Cmd+R)

## Risoluzione Problemi

### Il menu non si aggiorna?

1. Verifica che il foglio sia **pubblico** (vedi punto 4 Setup)
2. Controlla che il nome del foglio sia esattamente **Menu**
3. Verifica che l'ID nel file `.env.local` sia corretto
4. Prova a ricaricare la pagina con Ctrl+F5 (o Cmd+Shift+R su Mac)

### Vedo ancora il menu vecchio?

- Aspetta 10 minuti per l'aggiornamento automatico
- Oppure ricarica la pagina del browser

### Il sito non mostra niente?

- Il sito usa sempre un menu di backup se Google Sheets non risponde
- Controlla che il foglio sia accessibile pubblicamente

## Template Foglio Google Sheets

Per facilitare il lavoro, puoi copiare questo template:

👉 [Link al template] (da creare e condividere)

## Supporto

Per problemi tecnici, contatta il supporto tecnico del sito.
