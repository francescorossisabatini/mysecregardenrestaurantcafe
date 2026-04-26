Sì: guardando il file operativo e l’architettura attuale, non ha senso tenere “Specials” e “Menu” come due esperienze separate. Oggi il sito ha già una logica mista: la Home contiene il blocco menu completo, mentre `/wochenkarte` duplica parte del contenuto come pagina “Weekly Specials”. Questo crea confusione nella navbar e per l’utente: non è chiaro se “Menu” e “Specials” siano due cose diverse.

La direzione migliore è: una sola voce principale “Menu”, con dentro le sezioni “Today”, “Week” e “Classics”.

## Piano proposto

1. Semplificare la navbar
   - Rimuovere la voce separata “Specials / Wochenmenü”.
   - Tenere una sola voce “Menu / Speisekarte”.
   - La voce Menu porterà alla sezione menu della Home (`/#menu`) oppure alla pagina menu unica, in base alla soluzione più coerente con il routing esistente.

2. Rendere coerente la struttura del menu
   - Mantenere la divisione interna in:
     - oggi / today
     - settimana / week
     - classici / classics
   - Non presentarle come sezioni principali separate nella navigazione globale.
   - Su mobile, mantenere il tab sticky interno “Heute / Immer da / Woche”, perché lì è utile come orientamento dentro il menu.

3. Rivedere la pagina `/wochenkarte`
   - Evitare che sembri una pagina alternativa o concorrente al menu.
   - Opzione consigliata: trasformarla in redirect o alias verso la sezione menu principale.
   - Se mantenuta per SEO/backlink, deve essere trattata come “pagina menu” e non come “Specials” separato.

4. Aggiornare i testi CTA
   - In `ShowcaseSections`, cambiare il bottone “Wochenmenü ansehen / View Weekly Specials” in qualcosa come:
     - DE: “Speisekarte ansehen”
     - EN: “View Menu”
   - Evitare la parola “Specials” dove non serve.

5. Allineare SEO e label
   - Aggiornare title/description della pagina menu se rimane `/wochenkarte` o `/speisekarte`.
   - Usare una terminologia uniforme:
     - DE: “Speisekarte” o “Menü”
     - EN: “Menu”
   - Usare “Wochenmenü / Weekly menu” solo come sottosezione, non come voce primaria.

## Risultato atteso

La navigazione diventa più chiara:

```text
Home | Menu | About | Visit
```

E dentro Menu:

```text
Today | Week | Classics
```

Questo risolve la confusione tra “specials” e “menu”, riduce l’affollamento della navbar e rispetta meglio l’architettura già memorizzata del progetto: un singolo flusso verticale per il menu.