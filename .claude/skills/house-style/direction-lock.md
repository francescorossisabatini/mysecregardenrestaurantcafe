# Direction Lock — CS01 / My Secret Garden

> Valori, non aggettivi. "Pulito e moderno" non è una direzione.
> Compilato: 13 settembre 2026 · Da approvare: Francesco
> Arbitro finale su colore/font/token resta `DESIGN_SYSTEM.md` → `src/index.css`.
> Questo file decide quello che il design system **non** copre: struttura,
> ritmo, gerarchia, cosa porta la pagina.

---

## Topologia di layout
**`editorial asimmetrico a colonna singola`**

Non centrato. Il testo attacca a sinistra su una misura di ~62ch e non torna
mai al centro. Le immagini sfondano a destra oltre la colonna del testo,
o vanno a tutta larghezza. Il centro è riservato a una sola cosa per pagina:
l'hero.

Motivo: `CLAUDE.md` dice già "testo body sempre left-aligned, center solo per
header poetici brevi". Il codice attuale centra 7 sezioni su 7. La topologia
asimmetrica è l'applicazione letterale di una regola che esiste già e non è
mai stata rispettata.

## Cosa porta la pagina — **scegline esattamente uno**
**`dati`** — il menu del giorno.

Non l'immagine, non il tipo, non il movimento. Il menu è l'unica cosa del sito
che cambia ogni mattina, è l'unica ragione per cui qualcuno torna (profilo B,
budget 20 secondi), ed è la sola informazione che il sito ha e Google non ha.

Conseguenze accettate:
- le foto **supportano**, non guidano. Nessuna sezione esiste per mostrare una foto.
- la tipografia **serve** il menu. Cormorant e Lora non fanno le star.
- se il menu non c'è, la pagina lo dice subito e non riempie il buco con altro.

## Densità — tre livelli, assegnati per ruolo
| Livello | Ruolo | Padding sezione | Gap interno |
|---|---|---|---|
| `stretta` | il menu del giorno, la risposta operativa | `py-10 md:py-14` | `gap-3` |
| `normale` | narrativa, il posto, le voci | `py-20 md:py-28` | `gap-8` |
| `ampia` | un solo momento di respiro per pagina | `py-32 md:py-40` | `gap-16` |

Regola: la sezione che risponde più in fretta è la più **stretta**, non la più
grande. Oggi vale il contrario e il risultato è che il menu ha lo stesso peso
di una sezione decorativa.

## Strategia di palette
**`cream dominante + navy strutturale + verde solo azione`** — 60 / 30 / 10.
Valori: `DESIGN_SYSTEM.md` §2–3. Nessun colore fuori da quei token.
Nessun nuovo token senza passare da `src/index.css` e dalla sezione "Gap noti".

## Stack tipografico
Display `Caveat` (solo h1 hero + logo, max 1 per viewport) ·
Heading `Cormorant Garamond` · Body `Lora` · UI `Work Sans`.
Nessuna quinta famiglia. Vietati: Playfair Display, Dancing Script, Inter, Poppins.

## Scala tipografica
`h2-editorial` = `clamp(2.25rem, 4.2vw + 1rem, 3.75rem)` · corpo `text-lg` ·
UI `text-sm` / `text-[11px]`.
**Massimo 5 dimensioni distinte per schermata.** Contate da `check-tells.sh`.

## Radius
**Due valori. Punto.**
`rounded-lg` (1rem) per ogni superficie · `rounded-full` solo per pill e dot.
Oggi in repo ce ne sono sei. `rounded-md`, `rounded-xl`, `rounded-2xl`,
`rounded-sm` vanno normalizzati man mano che si tocca un file.

## Bordi o ombre
**Solo bordi.** `border-border` a 1px.
Unica eccezione documentata: `shadow-elevated` sulla CTA primaria dell'hero,
perché sta sopra una fotografia e il bordo non la stacca.
Mai bordo e ombra sulla stessa superficie.

## Budget di movimento
Animano: opacità dei container, `translateY(8px) → 0`, il dot di stato aperto.
Non animano mai: testo, immagini in zoom, parallax, gap dei bottoni in hover,
frecce che scivolano.
Durate: `--motion-duration-base` 250ms per gli stati, `--motion-duration-slow`
400ms per l'ingresso. Una sola animazione alla volta. `prefers-reduced-motion`
sempre rispettato.

## Griglia
Colonna di testo `max-w-[62ch]`. Contenitore `max-w-6xl`.
Nessuna griglia a 3 colonne di card sulla homepage.
Le immagini possono uscire dalla colonna, il testo mai.

---

## Cosa questo lock vieta esplicitamente

- Una sezione in più "perché la pagina sembra corta".
- Un secondo bottone in una sezione che ne ha già uno.
- Una card con bordo *e* ombra.
- Un filetto che non separa niente.
- Il blocco `eyebrow + h2 + filetto` su più di due sezioni per pagina.
