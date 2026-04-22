
L'utente chiede come scegliere quale modello AI usare. Questa è una domanda di chiarimento, non una richiesta di implementazione. Ma serve comunque distinguere chiaramente i due livelli (editor vs app) e dare istruzioni concrete.

## Risposta diretta

### 1. Modello dell'editor Lovable (quello che uso io ora)
**Non si sceglie dal codice del progetto.** Si configura a livello di workspace Lovable:
- Vai su **Settings** del workspace Lovable (in alto a destra, icona profilo → Settings)
- Sezione **AI / Model selection** (disponibile su piani Pro/Teams)
- Lì puoi scegliere tra i modelli premium disponibili sul tuo piano

Sui piani gratuiti il modello è gestito automaticamente da Lovable e non è selezionabile.

### 2. Modello AI dentro la tua app (per i tuoi utenti)
**Attualmente il tuo progetto NON ha AI integrata**, quindi non c'è nessun modello da scegliere. Il sito My Secret Garden usa Lovable Cloud solo per leggere il menu da Google Sheets.

Se in futuro vorrai aggiungere una funzionalità AI (chatbot, traduzioni automatiche, descrizioni piatti), il modello si specifica dentro l'edge function così:

```typescript
// dentro supabase/functions/[nome-funzione]/index.ts
body: JSON.stringify({
  model: "google/gemini-3-flash-preview", // <-- qui scegli
  messages: [...],
})
```

I modelli disponibili tramite Lovable AI Gateway sono solo Google Gemini e OpenAI GPT (no Claude/Opus).

## Piano

Nessun cambio al codice necessario — è solo una spiegazione. Non presento un plan di implementazione perché non c'è nulla da costruire finché l'utente non decide di aggiungere una funzionalità AI concreta.

**Domanda da porre**: vuole solo capire (risposta finita), oppure vuole iniziare a integrare AI nel sito? Nel secondo caso servirebbe sapere quale caso d'uso (chatbot, traduzioni, ecc.) per scegliere il modello giusto.
