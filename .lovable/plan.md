Piano aggiornato.

Hai ragione: Supermind non deve stare nella pagina About. Lo tratto come elemento di prodotto/menu, non come parte della storia identitaria About.

1. About senza Supermind

Nella pagina `/about` rimuoverò completamente:

- import del logo Supermind
- testi `coffeeLabel`, `coffeeTitle`, `coffeePara`, `coffeeBridge`
- blocco “Secret Garden × Supermind”
- link `supermind.at`
- logo Supermind

Al suo posto la pagina passerà direttamente dalla parte “cucina e atmosfera” alla parte “il giardino / il luogo”, poi alla sezione finale su Sri Chinmoy.

2. About più editoriale e coerente

Ristrutturerò `src/pages/AboutUs.tsx` con un racconto più premium:

```text
Hero editoriale
Capitolo 01: Il luogo nel Raimundhof
Capitolo 02: La cucina vegetariana e vegana
Capitolo 03: Il ritmo quotidiano del ristorante
Capitolo 04: Sri Chinmoy come ispirazione
Capitolo 05: Arte, poesia, servizio e ristoranti collegati nel mondo
CTA finale
```

Il tono sarà più editoriale, meno “scheda informativa”. Ogni sezione sarà ben separata, con titolo forte, testo breve, immagine reale o opere già presenti negli asset, didascalie e separatori botanici.

3. Supermind in Home e Menu

Supermind è già presente in due punti corretti:

- Home: `HomeMenuPreview.tsx`, blocco “Secret Garden × Supermind” sotto il menu del giorno
- Menu: `MenuSection.tsx`, badge/link Supermind sugli item caffè

Lo lascerò lì e, se necessario, lo renderò più chiaro come elemento collegato a caffè e bevande. Non lo porterò più nella narrazione About.

4. Sezioni più evidenti e animate nello scroll

Aggiungerò alla pagina About un sistema di sezioni più riconoscibile:

- etichette “Kapitel 01” / “Chapter 01”
- fondi alternati crema, verde soft, card chiara
- bordi editoriali e blocchi citazione
- immagini con cornici leggere e didascalie
- cards per concetti chiave

Per le animazioni rispetterò le regole del progetto:

- solo fade-in lento
- nessun zoom
- nessun parallax
- nessun movimento aggressivo
- supporto `prefers-reduced-motion`

Ogni sezione entrerà nello scroll con fade-in lento e i contenuti interni potranno comparire in sequenza leggera.

5. Sri Chinmoy: più attenzione e dettagli

Amplio molto la parte finale, usando fonti ufficiali e tono rispettoso:

- biografia sintetica: 1931, India/Bengala, New York dal 1964, attività fino al 2007
- meditazione, pace interiore, servizio, armonia tra culture e religioni
- arte Jharna-Kala e Soul-Birds
- poesia e scrittura
- musica e Peace Concerts
- vegetarianismo e “divine enterprises”, cioè ristoranti/cafè aperti da studenti ispirati dalla sua filosofia
- legame concreto con My Secret Garden: cucina vegetariana, calma, servizio quotidiano, atmosfera consapevole

6. Link da inserire nella parte Sri Chinmoy

Inserirò link utili, ordinati e non invasivi:

- Official biography: `https://srichinmoy.org/sri_chinmoy/biography/`
- Official site: `https://srichinmoy.org/`
- Cultural offerings: `https://www.srichinmoy.org/sri_chinmoy/landmarks/cultural_offerings/`
- Art / Jharna-Kala: `https://srichinmoy.org/sri_chinmoy/art`
- Sri Chinmoy Library: `https://www.srichinmoylibrary.com/srichinmoy`
- Restaurants and cafés: `https://www.srichinmoycentre.org/enterprises`

7. Ristoranti ispirati da citare

Aggiungerò un piccolo blocco “A wider family of vegetarian cafés” / equivalente tedesco, con pochi esempi selezionati:

- The Heart of Joy, Salzburg: `https://www.heartofjoy.at/en/`
- The Smile of the Beyond, Queens/New York: `https://www.smileofthebeyond.com/`
- My Rainbow-Dreams, Canberra: `https://myrainbowdreams.org/our-story`
- Happiness-Heart Café, Berlin: `https://www.happiness-heart-cafe.de/`
- The Sacred / Vegelateria, Zürich: `https://vegelateria.ch/`

Questo blocco renderà chiaro che My Secret Garden fa parte di una tradizione più ampia di ristoranti vegetariani ispirati a Sri Chinmoy, senza confondere questa parte con Supermind.

8. File da modificare dopo approvazione

- `src/pages/AboutUs.tsx`
- `src/index.css`, solo se servono utility editoriali/animazioni locali

Non toccherò il client backend né file generati.

9. Verifica finale

Controllerò:

- About senza alcuna presenza Supermind
- Supermind ancora presente in Home e Menu
- desktop e mobile senza overflow
- sezioni About più evidenti
- animazioni solo fade-in lento
- link esterni funzionanti e accessibili
- testi DE/EN coerenti
- nessun em dash