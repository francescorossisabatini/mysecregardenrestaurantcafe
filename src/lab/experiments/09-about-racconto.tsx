import type { ReactNode } from "react";
import courtyard from "@/assets/photos/garden-courtyard.jpg";
import portrait from "@/assets/sri-chinmoy-portrait.jpg";
import soulBirds from "@/assets/sri-chinmoy-birds.jpg";
import { dishes } from "./sampleDishes";
import { cafes, poemOfTheDay, reveal, sources, useReveal } from "./08-about-idee";
import type { Experiment } from "./types";

/**
 * /about, variante B "Racconto" (wireframe docs/ux/wireframes/about-lofi.html,
 * ledger 02/10/2026). Una storia in ordine, con la prova a margine.
 * Prototipo: copy in BOZZA. I fatti che non abbiamo sono segnaposto visibili
 * (<Missing>), mai inventati. Lingua da ?lang=en nel frame.
 */

type Lang = "de" | "en";
const lang = (): Lang => (new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "de");

const COPY = {
  de: {
    title: "Unsere Geschichte",
    lede: "Ein vegetarisches und veganes Restaurant im Raimundhof, Mariahilferstraße 45.",
    missing: "Fehlt",
    start: {
      mark: "20__",
      title: "Wie es angefangen hat",
      missingText: "Wer hat eröffnet, in welchem Jahr, und warum hier: zwei, drei Sätze vom Inhaber.",
      missingPhoto: "Foto: die Menschen, die hier kochen und am Tresen stehen.",
    },
    kitchen: {
      mark: "Jeden Morgen",
      title: "Was wir kochen",
      body: "Vegetarisch und vegan, bio, fair, regional und saisonal. Die Karte schreiben wir jeden Morgen neu: eine Suppe und zwei Gerichte. Das ist sie heute:",
      todayLabel: "Heute auf der Karte",
      ratingOf: "von 5, aus 936 Bewertungen auf Google",
      missingQuote: "Ein Satz aus einer echten Bewertung, mit Erlaubnis.",
      empty: "Die Karte von heute steht noch nicht online. Wir schreiben sie jeden Morgen — ruf an:",
      closed: "Heute geschlossen. Morgen ab 11:00 wieder da.",
    },
    place: {
      mark: "Mittags",
      title: "Der Hof",
      body: "Du gehst durch den Bogen an der Mariahilferstraße 45 und stehst im Raimundhof. Bestellt wird am Tresen, dann suchst du dir einen Platz im Hof. Der Kaffee kommt von Supermind. Fleisch und Alkohol gibt es bei uns nicht.",
      awards: ["Falstaff 2025", "Wien wie es isst 2025"],
      awardsNote: "Empfohlen in",
      alt: "Der Innenhof im Raimundhof, mit Pflanzen, Holztischen und gelben Schirmen",
    },
    idea: {
      mark: "Warum",
      title: "Die Idee dahinter",
      name: "Sri Chinmoy",
      years: "1931–2007",
      body: "Das Restaurant folgt der Idee von Sri Chinmoy. Er kam aus Bengalen und lebte ab 1964 in New York. Er schrieb Gedichte, malte und komponierte, und ab 1970 leitete er Meditationen für den Frieden bei den Vereinten Nationen.",
      missingLink: "Was diese Idee hier im Alltag heißt: ein Satz vom Inhaber.",
      portraitAlt: "Porträt von Sri Chinmoy",
    },
    poem: { label: "Das Gedicht von heute", next: "Morgen steht hier ein anderes.", birdsAlt: "Soul-Birds von Sri Chinmoy, schnelle Tuschezeichnungen von Vögeln" },
    cafesTitle: "Cafés mit derselben Idee",
    sourcesTitle: "Über Sri Chinmoy",
    newTab: "öffnet in neuem Tab",
    find: "Wie du uns findest",
    draft: "Bozza di copy, da approvare",
  },
  en: {
    title: "Our Story",
    lede: "A vegetarian and vegan restaurant in the Raimundhof, Mariahilferstraße 45.",
    missing: "Missing",
    start: {
      mark: "20__",
      title: "How it started",
      missingText: "Who opened it, in which year, and why here: two or three sentences from the owner.",
      missingPhoto: "Photo: the people who cook here and work the counter.",
    },
    kitchen: {
      mark: "Every morning",
      title: "What we cook",
      body: "Vegetarian and vegan, organic, fair, regional and seasonal. We write the menu fresh every morning: one soup and two dishes. Here it is today:",
      todayLabel: "On the menu today",
      ratingOf: "out of 5, from 936 reviews on Google",
      missingQuote: "One sentence from a real review, with permission.",
      empty: "Today's menu isn't online yet. We write it every morning — call:",
      closed: "Closed today. Back tomorrow from 11:00.",
    },
    place: {
      mark: "At noon",
      title: "The courtyard",
      body: "You walk through the arch at Mariahilferstraße 45 and you're in the Raimundhof. You order at the counter, then pick a seat in the courtyard. The coffee comes from Supermind. There's no meat here, and no alcohol.",
      awards: ["Falstaff 2025", "Wien wie es isst 2025"],
      awardsNote: "Recommended in",
      alt: "The Raimundhof courtyard, with plants, wooden tables and yellow umbrellas",
    },
    idea: {
      mark: "Why",
      title: "The idea behind it",
      name: "Sri Chinmoy",
      years: "1931–2007",
      body: "The restaurant follows the idea of Sri Chinmoy. He came from Bengal and lived in New York from 1964. He wrote poems, painted and composed, and from 1970 he led meditations for peace at the United Nations.",
      missingLink: "What this idea means here day to day: one sentence from the owner.",
      portraitAlt: "Portrait of Sri Chinmoy",
    },
    poem: { label: "Today's poem", next: "Tomorrow there's a different one.", birdsAlt: "Soul-Birds by Sri Chinmoy, quick ink drawings of birds" },
    cafesTitle: "Cafés with the same idea",
    sourcesTitle: "About Sri Chinmoy",
    newTab: "opens in a new tab",
    find: "How to find us",
    draft: "Draft copy, pending approval",
  },
};

/* Etichette dei piatti come su /menu (MenuSection.tsx:42-43). */
const dishLabel = { soup: { de: "Suppe", en: "Soup" }, green: { de: "Grünes Gericht", en: "Green dish" }, blue: { de: "Blaues Gericht", en: "Blue dish" } };

const body = "max-w-[62ch] text-pretty font-lora text-lg leading-relaxed";
const label = "font-work text-sm font-semibold tabular-nums tracking-[0.04em]";
const textLink = "inline-block py-2.5 font-work text-base text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground";
const grid = "md:grid-cols-[7rem_minmax(0,62ch)] md:gap-x-8 lg:grid-cols-[7rem_minmax(0,52ch)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12";

/** Un fatto che non abbiamo: si vede che manca, non si inventa. */
const Missing = ({ tag, children, tall }: { tag: string; children: ReactNode; tall?: boolean }) => (
  <p className={`rounded-lg border border-dashed border-border p-4 font-work text-sm text-muted-foreground ${tall ? "flex aspect-[4/3] items-end" : ""}`}>
    <span>
      <span className="font-semibold uppercase tracking-[0.08em]">{tag}:</span> {children}
    </span>
  </p>
);

/** Nota a margine: la prova accanto a ciò che prova. Entra da sola, quando arriva. */
const Note = ({ children }: { children: ReactNode }) => {
  const [ref, shown] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`mt-8 space-y-3 pl-4 md:col-start-2 lg:col-start-3 lg:row-start-2 lg:mt-4 lg:pl-0 ${reveal(shown)}`}>
      {children}
    </div>
  );
};

/**
 * Capitolo: etichetta del tempo in margine, titolo, testo; la nota va in col 3 da lg.
 * Mobile `stretta` (py-10), da md `normale`. `dark`: superficie navy, solo opacità.
 */
const Chapter = ({ id, mark, title, dark, note, children }: { id?: string; mark: ReactNode; title: string; dark?: boolean; note?: ReactNode; children: ReactNode }) => {
  const [ref, shown] = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-mt-4 ${dark ? "bg-primary py-20 text-primary-foreground md:py-28" : "py-10 md:py-28"} ${reveal(shown, dark)}`}
    >
      <div className={`mx-auto grid max-w-6xl grid-cols-1 px-5 ${grid}`}>
        <h2 className="flex flex-col gap-2 md:col-span-2 md:grid md:grid-cols-subgrid md:items-baseline md:gap-x-8 md:gap-y-0 lg:gap-x-12">
          <span className={`${label} ${dark ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{mark}</span>
          <span className={`text-balance font-cormorant text-3xl font-semibold leading-tight md:text-4xl ${dark ? "text-primary-foreground" : "text-foreground"}`}>{title}</span>
        </h2>
        <div className="mt-4 space-y-6 md:col-start-2">{children}</div>
        {note}
      </div>
    </section>
  );
};

const Out = ({ href, hint, children }: { href: string; hint: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={textLink}>
    {children}
    <span className="sr-only"> ({hint})</span>
  </a>
);

const Racconto = () => {
  const l = lang();
  const t = COPY[l];
  const visit = l === "de" ? "/visit" : "/en/visit";
  const poem = poemOfTheDay();
  const [poemRef, poemShown] = useReveal<HTMLElement>();
  const menuState = new URLSearchParams(window.location.search).get("menu");

  return (
    <article lang={l} className="bg-background text-foreground">
      <p className="bg-destructive px-5 py-1 text-center font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-destructive-foreground">{t.draft}</p>

      {/* Apertura: l'unico Caveat della pagina. */}
      <header className="mx-auto max-w-6xl px-5 pb-6 pt-14 md:pb-14 md:pt-28">
        <h1 className="font-caveat text-6xl leading-none text-primary md:text-8xl">{t.title}</h1>
        <p className={`mt-6 ${body}`}>{t.lede}</p>
      </header>

      {/* 1 · Come è nato. Tutto quello che serve qui deve venire dal proprietario. */}
      <Chapter
        mark={t.start.mark}
        title={t.start.title}
        note={
          /* Da lg la foto delle persone sta nella colonna delle note: niente colonna 3 vuota. */
          <div className="mt-6 md:col-start-2 lg:col-start-3 lg:row-start-2 lg:mt-4">
            <Missing tag={t.missing} tall>{t.start.missingPhoto}</Missing>
          </div>
        }
      >
        <Missing tag={t.missing}>{t.start.missingText}</Missing>
      </Chapter>

      {/* 2 · Cosa cuciniamo: i piatti di oggi come dato, la prova a margine. */}
      <Chapter
        mark={t.kitchen.mark}
        title={t.kitchen.title}
        note={
          <Note>
            <p className="font-work text-sm text-muted-foreground">Google</p>
            <p className="font-cormorant text-3xl font-semibold leading-none md:text-4xl">4,7</p>
            <p className="font-work text-sm text-muted-foreground">{t.kitchen.ratingOf}</p>
            <Missing tag={t.missing}>{t.kitchen.missingQuote}</Missing>
          </Note>
        }
      >
        <p className={body}>{t.kitchen.body}</p>
        {/* Stati del dato vivo, stringhe approvate. Nel banco: &menu=empty o &menu=closed. */}
        {menuState === "closed" ? (
          <p className={body}>{t.kitchen.closed}</p>
        ) : menuState === "empty" ? (
          <p className={body}>
            {t.kitchen.empty}{" "}
            <a href="tel:+4315862839" className="underline decoration-border underline-offset-4 hover:decoration-foreground">+43 1 586 28 39</a>
          </p>
        ) : (
        <dl aria-label={t.kitchen.todayLabel} className="max-w-[62ch] divide-y divide-border border-y border-border">
          {dishes.map((d) => (
            <div key={d.key} className="grid grid-cols-[1fr_auto] gap-x-4 py-4">
              <dt className={`${label} text-muted-foreground`}>{dishLabel[d.key][l]}</dt>
              <dd className="row-span-2 self-center font-work text-sm tabular-nums text-muted-foreground">{d.price} €</dd>
              <dd className="font-lora text-lg font-semibold leading-snug">{d.name}</dd>
            </div>
          ))}
        </dl>
        )}
      </Chapter>

      {/* 3 · Il posto: il cortile grande, la prova (guide) a margine. */}
      <Chapter
        mark={t.place.mark}
        title={t.place.title}
        note={
          <Note>
            <p className="font-work text-sm text-muted-foreground">{t.place.awardsNote}</p>
            <ul className="space-y-1">
              {t.place.awards.map((a) => (
                <li key={a} className="font-cormorant text-3xl font-semibold leading-tight md:text-4xl">{a}</li>
              ))}
            </ul>
          </Note>
        }
      >
        <p className={body}>{t.place.body}</p>
        {/* Mobile: a piena larghezza (esce dal padding). Da md resta nella colonna del testo. */}
        <img src={courtyard} alt={t.place.alt} className="-mx-5 aspect-[4/3] w-[calc(100%+2.5rem)] max-w-none object-cover md:mx-0 md:w-full md:rounded-lg" loading="lazy" decoding="async" />
      </Chapter>

      {/* 4 · Perché: la superficie navy, il 30% del lock come superficie. Ritratto piccolo accanto alle date. */}
      <Chapter
        id="idee"
        dark
        mark={t.idea.mark}
        title={t.idea.title}
        note={
          <div className="mt-8 flex items-center gap-4 md:col-start-2 lg:col-start-3 lg:row-start-2 lg:mt-4 lg:flex-col lg:items-start">
            <img src={portrait} alt={t.idea.portraitAlt} className="size-16 rounded-lg object-cover lg:size-24" loading="lazy" decoding="async" />
            <p className={label}>
              <span className="block">{t.idea.name}</span>
              <span className="text-primary-foreground/80">{t.idea.years}</span>
            </p>
          </div>
        }
      >
        <p className={body}>{t.idea.body}</p>
        <p className="rounded-lg border border-dashed border-primary-foreground/60 p-4 font-work text-sm text-primary-foreground/80">
          <span className="font-semibold uppercase tracking-[0.08em]">{t.missing}:</span> {t.idea.missingLink}
        </p>
      </Chapter>

      {/* Il momento `ampio`: la poesia del giorno su bg-card, Soul-Birds alla loro misura. */}
      <section ref={poemRef} id="gedicht" className={`scroll-mt-4 bg-card py-32 md:py-40 ${reveal(poemShown, true)}`}>
        <figure className={`mx-auto max-w-6xl px-5 lg:grid ${grid}`}>
          <img src={soulBirds} alt={t.poem.birdsAlt} width={262} height={193} className="mb-10 w-full max-w-[262px] mix-blend-multiply lg:col-start-3 lg:row-span-3 lg:row-start-1 lg:mb-0 lg:self-center" loading="lazy" decoding="async" />
          <p className={`${label} text-muted-foreground lg:col-start-2 lg:row-start-1`}>{t.poem.label}</p>
          <blockquote lang={l} className="mt-6 max-w-[34ch] font-cormorant text-3xl italic leading-snug text-foreground md:text-4xl lg:col-start-2 lg:row-start-2">
            {/* Un verso per blocco, con rientro sospeso: se a 390px un verso va a capo, si legge come continuazione. */}
            {poem[l].split("\n").map((line) => (
              <span key={line} className="block pl-6 -indent-6">{line}</span>
            ))}
          </blockquote>
          <figcaption className="mt-6 font-work text-sm text-muted-foreground lg:col-start-2 lg:row-start-3">
            Sri Chinmoy. {t.poem.next}
          </figcaption>
        </figure>
      </section>

      {/* Caffè gemelli e fonti: `stretta`, link di testo, sulla stessa griglia da lg. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-2 md:gap-x-8 md:py-14 lg:grid-cols-[7rem_minmax(0,52ch)_minmax(0,1fr)] lg:gap-x-12">
        <div className="lg:col-start-2">
          <h2 className="font-cormorant text-3xl font-semibold leading-tight md:text-4xl">{t.cafesTitle}</h2>
          <ul className="mt-2">
            {cafes.map((c) => (
              <li key={c.href}><Out href={c.href} hint={t.newTab}>{c.name}, {c.place}</Out></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-start-3">
          <h2 className="font-cormorant text-3xl font-semibold leading-tight md:text-4xl">{t.sourcesTitle}</h2>
          <ul className="mt-2">
            {sources.filter((s) => !s.href.includes("enterprises")).map((s) => (
              <li key={s.href}><Out href={s.href} hint={t.newTab}>{s.label[l]}</Out></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chiusura `stretta`: la domanda operativa. Unica freccia della pagina. */}
      <footer className="mx-auto max-w-6xl px-5 pb-10 md:pb-14 lg:grid lg:grid-cols-[7rem_minmax(0,52ch)_minmax(0,1fr)] lg:gap-x-12">
        <a href={visit} className="inline-flex min-h-11 items-center font-work text-sm font-semibold uppercase tracking-[0.08em] text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground lg:col-start-2 lg:justify-self-start">
          {t.find} →
        </a>
      </footer>
    </article>
  );
};

/** Com'è oggi, un estratto: il blocco recensioni a card come sezione a sé (il default che B evita). */
const Today = () => (
  <div className="space-y-4">
    <h2 className="font-cormorant text-4xl font-semibold leading-tight text-primary">Unsere Geschichte</h2>
    <p className="font-lora text-lg">Ein stiller Innenhof, frisches Essen, ein kurzer Moment zum Durchatmen mitten in Wien.</p>
  </div>
);

export const aboutRaccontoExperiment: Experiment = {
  id: "about-racconto",
  title: "/about variante B: Racconto",
  feature: "Storia in ordine con la prova a margine; piatti di oggi come dato; superficie navy per il perché",
  problem:
    "La strada 2 raccontava una giornata e quasi niente del ristorante (Francesco, 02/10/2026): chi siete, da quando, chi lo conferma. Struttura uguale a ogni capitolo.",
  cost: "Il primo capitolo dipende da fatti del proprietario (segnaposto visibili). Copy in bozza.",
  support: "grid-template-columns: subgrid — Chrome 117+, Safari 16+, Firefox 71+.",
  widths: [390, 1280],
  Before: Today,
  After: Racconto,
};
