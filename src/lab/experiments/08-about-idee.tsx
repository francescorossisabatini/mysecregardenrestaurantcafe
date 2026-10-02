import { useEffect, useRef, useState, type ReactNode } from "react";
import tavolata from "@/assets/photos/tavolata-dall-alto.jpg";
import torta from "@/assets/torta-2.jpg";
import courtyard from "@/assets/photos/garden-courtyard.jpg";
import portrait from "@/assets/sri-chinmoy-portrait.jpg";
import soulBirds from "@/assets/sri-chinmoy-birds.jpg";
import type { Experiment } from "./types";

/**
 * /about, strada 2: la B "Ein Tag" più il capitolo "Die Idee dahinter"
 * (docs/ux/about-opzioni.md § "Stato al 30/09/2026", ledger 30/09/2026).
 * Mobile prima: obiettivo 5–6 schermate a 390px.
 * Prototipo: il copy è una BOZZA da approvare. Lingua da ?lang=en nel frame.
 */

type Lang = "de" | "en";
const lang = (): Lang => (new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "de");

/* Le cinque poesie di AboutUs.tsx, invariate. Ne compare una al giorno. */
export const poems = [
  { en: "World peace can be achieved\nWhen the power of love\nReplaces the love of power.", de: "Weltfrieden kann erreicht werden,\nwenn die Kraft der Liebe\ndie Liebe zur Macht ersetzt." },
  { en: "Try not to change the world.\nYou will fail.\nTry to love the world.\nLo, the world is changed\nForever.", de: "Versuche nicht, die Welt zu ändern.\nDu wirst scheitern.\nVersuche, die Welt zu lieben.\nSiehe, die Welt ist verändert\nFür immer." },
  { en: "If you have inner peace,\nNobody can force you to be\nA slave to the outer reality.", de: "Wenn du inneren Frieden hast,\nkann dich niemand zwingen,\nein Sklave der äußeren Realität zu sein." },
  { en: "Meditation means\nConversation with silence.", de: "Meditation bedeutet\nGespräch mit der Stille." },
  { en: "To be rich\nIs to give a smile\nWith no expectation of return.", de: "Reich zu sein\nbedeutet, ein Lächeln zu schenken\nohne Erwartung einer Gegenleistung." },
];

/** Giorno dell'anno, così la poesia cambia a mezzanotte e resta la stessa per tutto il giorno. */
export const poemOfTheDay = (date = new Date()) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return poems[day % poems.length];
};

export const cafes = [
  { href: "https://www.heartofjoy.at/en/", name: "The Heart of Joy", place: "Salzburg" },
  { href: "https://www.happiness-heart-cafe.de/", name: "Happiness-Heart Café", place: "Berlin" },
  { href: "https://vegelateria.ch/", name: "The Sacred / Vegelateria", place: "Zürich" },
  { href: "https://www.smileofthebeyond.com/", name: "The Smile of the Beyond", place: "Queens, New York" },
  { href: "https://myrainbowdreams.org/our-story", name: "My Rainbow-Dreams", place: "Canberra" },
];

export const sources = [
  { href: "https://srichinmoy.org/sri_chinmoy/biography/", label: { de: "Offizielle Biografie", en: "Official biography" } },
  { href: "https://srichinmoy.org/", label: { de: "Offizielle Website", en: "Official site" } },
  { href: "https://www.srichinmoy.org/sri_chinmoy/landmarks/cultural_offerings/", label: { de: "Kulturelle Werke", en: "Cultural offerings" } },
  { href: "https://srichinmoy.org/sri_chinmoy/art", label: { de: "Jharna-Kala Kunst", en: "Jharna-Kala art" } },
  { href: "https://www.srichinmoylibrary.com/srichinmoy", label: { de: "Sri Chinmoy Library", en: "Sri Chinmoy Library" } },
];

const COPY = {
  de: {
    title: "Unsere Geschichte",
    lede: "Ein Tag im Raimundhof, von halb elf bis kurz vor sieben.",
    jumpLabel: "Kapitel",
    jump: { idea: "Die Idee dahinter", poem: "Das Gedicht von heute" },
    hours: [
      { time: "10:30", title: "Die Karte wird geschrieben", body: "Das Gemüse kommt am Morgen, und daraus werden drei Gerichte für den Tag: eine Suppe, ein grünes und ein blaues. Fleisch gibt es bei uns nicht, Alkohol auch nicht." },
      { time: "12:30", title: "Mittag am Tresen", body: "Du bestellst am Tresen und suchst dir einen Platz im Hof. Manche nehmen es mit ins Büro, andere bleiben bis zum Kaffee." },
      { time: "15:00", title: "Kaffee und Kuchen", body: "Der Kaffee kommt von Supermind und wird jede Woche in Wien geröstet. Die Kuchen backen wir selbst. Zu jedem Kaffee legen wir eine kleine Karte mit einem Gedicht." },
      { time: "18:45", title: "Der Hof wird still", body: "Um 19 Uhr schließen wir, sonntags bleibt der Hof zu. Den Garten gibt es seit 2018. Die Gedichte auf den Karten sind von Sri Chinmoy." },
    ],
    idea: {
      title: "Die Idee dahinter",
      name: "Sri Chinmoy",
      years: "1931–2007",
      bio: [
        "Er kam aus Bengalen und lebte ab 1964 in New York.",
        "Er schrieb Gedichte, malte, komponierte und gab Konzerte in vielen Ländern.",
        "Ab 1970 leitete er zweimal pro Woche eine Meditation für den Frieden bei den Vereinten Nationen.",
        "Mit Tusche malte er Millionen kleiner Vögel, die Soul-Birds.",
      ],
      portraitAlt: "Porträt von Sri Chinmoy",
      birdsAlt: "Soul-Birds von Sri Chinmoy, schnelle Tuschezeichnungen von Vögeln",
    },
    poem: { label: "Das Gedicht von heute", next: "Morgen steht hier ein anderes." },
    cafesTitle: "Cafés mit derselben Idee",
    sourcesTitle: "Über Sri Chinmoy",
    newTab: "öffnet in neuem Tab",
    alt: {
      tavolata: "Ein langer Tisch von oben, mit Tellern vom Tagesmenü",
      torta: "Ein hausgemachter Beerenkuchen mit einem Herz aus Kokosraspeln",
      courtyard: "Der Innenhof im Raimundhof, mit Pflanzen und Tischen",
    },
    find: "Wie du uns findest",
    draft: "Bozza di copy, da approvare",
  },
  en: {
    title: "Our Story",
    lede: "A day in the Raimundhof, from half past ten until just before seven.",
    jumpLabel: "Chapters",
    jump: { idea: "The idea behind it", poem: "Today's poem" },
    hours: [
      { time: "10:30", title: "The menu gets written", body: "The vegetables arrive in the morning and turn into three dishes for the day: a soup, a green one and a blue one. There's no meat here, and no alcohol." },
      { time: "12:30", title: "Lunch at the counter", body: "You order at the counter and pick a seat in the courtyard. Some take it back to the office, others stay until coffee." },
      { time: "15:00", title: "Coffee and cake", body: "The coffee comes from Supermind, roasted in Vienna every week. We bake the cakes ourselves. Every coffee comes with a small card carrying a poem." },
      { time: "18:45", title: "The courtyard goes quiet", body: "We close at 19:00, and the courtyard stays shut on Sundays. The garden has been here since 2018. The poems on the cards are by Sri Chinmoy." },
    ],
    idea: {
      title: "The idea behind it",
      name: "Sri Chinmoy",
      years: "1931–2007",
      bio: [
        "He came from Bengal and lived in New York from 1964.",
        "He wrote poems, painted, composed and gave concerts in many countries.",
        "From 1970 he led a meditation for peace at the United Nations twice a week.",
        "In ink, he drew millions of small birds, the Soul-Birds.",
      ],
      portraitAlt: "Portrait of Sri Chinmoy",
      birdsAlt: "Soul-Birds by Sri Chinmoy, quick ink drawings of birds",
    },
    poem: { label: "Today's poem", next: "Tomorrow there's a different one." },
    cafesTitle: "Cafés with the same idea",
    sourcesTitle: "About Sri Chinmoy",
    newTab: "opens in a new tab",
    alt: {
      tavolata: "A long table from above, with plates from the daily menu",
      torta: "A homemade berry cake with a heart of grated coconut",
      courtyard: "The Raimundhof courtyard, with plants and tables",
    },
    find: "How to find us",
    draft: "Draft copy, pending approval",
  },
};

const body = "max-w-[62ch] text-pretty font-lora text-lg leading-relaxed";
const label = "font-work text-sm font-semibold tabular-nums tracking-[0.04em] text-muted-foreground";
const textLink = "inline-block py-2.5 font-work text-base text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground";

/**
 * Ingresso una volta sola, quando il blocco entra nel viewport.
 * Direction lock: solo opacità dei contenitori e translateY(8px) → 0, 400ms.
 * `quiet` = solo opacità (capitolo sull'idea e poesia, discussione del 20/04/2026).
 * Con prefers-reduced-motion il blocco è visibile subito, senza transizione.
 */
export const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, shown] as const;
};

/* Tailwind v4: translate-y-* scrive la proprietà `translate`, non `transform`.
   Con transition-[opacity,transform] lo spostamento scattava e restava solo la dissolvenza. */
export const reveal = (shown: boolean, quiet = false) =>
  `transition-[opacity,translate] duration-slow ease-out motion-reduce:transition-none ${
    shown ? "opacity-100 translate-y-0" : quiet ? "opacity-0" : "opacity-0 translate-y-2"
  }`;

/**
 * Capitolo con etichetta in margine (l'ora, o le date col ritratto).
 * Mobile: valori di `stretta` (py-10) per stare in 5–6 schermate; da md `normale`.
 * `aside`: la foto del capitolo. Fino a md resta sotto il testo come prima;
 * da lg va in una terza colonna a destra (ledger 02/10/2026).
 */
const Chapter = ({ id, mark, title, quiet, aside, children }: { id?: string; mark: ReactNode; title: string; quiet?: boolean; aside?: ReactNode; children: ReactNode }) => {
  const [ref, shown] = useReveal<HTMLElement>();
  return (
    <section ref={ref} id={id} className={`scroll-mt-4 py-10 md:py-28 ${reveal(shown, quiet)}`}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 px-5 md:grid-cols-[7rem_minmax(0,62ch)] md:gap-x-8 lg:grid-cols-[7rem_minmax(0,52ch)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12">
        <h2 className="flex flex-col gap-2 md:col-span-2 md:grid md:grid-cols-subgrid md:items-baseline md:gap-x-8 md:gap-y-0 lg:gap-x-12">
          {mark}
          <span className="text-balance font-cormorant text-3xl font-semibold leading-tight text-foreground md:text-4xl">{title}</span>
        </h2>
        <div className="mt-4 space-y-6 md:col-start-2">{children}</div>
        {aside}
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

const Idee = () => {
  const l = lang();
  const t = COPY[l];
  const [morning, noon, afternoon, evening] = t.hours;
  const visit = l === "de" ? "/visit" : "/en/visit";
  const poem = poemOfTheDay();
  const [poemRef, poemShown] = useReveal<HTMLElement>();

  return (
    <article lang={l} className="bg-background text-foreground">
      <p className="bg-destructive px-5 py-1 text-center font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-destructive-foreground">{t.draft}</p>

      {/* Apertura: l'unico Caveat della pagina. */}
      <header className="mx-auto max-w-6xl px-5 pb-6 pt-14 md:pb-14 md:pt-28">
        <h1 className="font-caveat text-6xl leading-none text-primary md:text-8xl">{t.title}</h1>
        <p className={`mt-6 ${body}`}>{t.lede}</p>
        {/* Salto ai capitoli: link di testo, niente chip, niente bordi, niente separatori. */}
        <nav aria-label={t.jumpLabel} className="mt-4">
          <ul className="flex flex-wrap gap-x-6">
            <li><a href="#idee" className={textLink}>{t.jump.idea}</a></li>
            <li><a href="#gedicht" className={textLink}>{t.jump.poem}</a></li>
          </ul>
        </nav>
      </header>

      {/* Foto a piena larghezza fino a md: -mx-5 e -mb-* le fanno occupare lo stesso posto
          di quando stavano fuori dalla sezione, così il mobile resta identico. */}
      <Chapter
        mark={<time className={label}>{morning.time}</time>}
        title={morning.title}
        aside={<img src={tavolata} alt={t.alt.tavolata} className="-mx-5 -mb-10 mt-10 aspect-[16/9] w-[calc(100%+2.5rem)] max-w-none object-cover md:col-span-2 md:-mb-28 md:mt-28 md:aspect-[21/9] lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:m-0 lg:aspect-[4/3] lg:w-full lg:rounded-lg" loading="lazy" decoding="async" />}
      >
        <p className={body}>{morning.body}</p>
      </Chapter>

      {/* Il cortile accanto alle 12:30, dove il testo dice "suchst dir einen Platz im Hof". */}
      <Chapter
        mark={<time className={label}>{noon.time}</time>}
        title={noon.title}
        aside={<img src={courtyard} alt={t.alt.courtyard} className="-mx-5 -mb-10 mt-10 aspect-[16/9] w-[calc(100%+2.5rem)] max-w-none object-cover md:col-span-2 md:-mb-28 md:mt-28 md:aspect-[21/9] lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:m-0 lg:aspect-[4/3] lg:w-full lg:rounded-lg" loading="lazy" decoding="async" />}
      >
        <p className={body}>{noon.body}</p>
      </Chapter>

      <Chapter
        mark={<time className={label}>{afternoon.time}</time>}
        title={afternoon.title}
        aside={<img src={torta} alt={t.alt.torta} className="-mr-5 mt-6 aspect-square w-[calc(100%+1.25rem)] max-w-md rounded-lg object-cover md:col-start-2 md:-mr-24 md:w-[calc(100%+6rem)] lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:m-0 lg:w-full lg:max-w-none" loading="lazy" decoding="async" />}
      >
        <p className={body}>{afternoon.body}</p>
      </Chapter>

      <Chapter mark={<time className={label}>{evening.time}</time>} title={evening.title}>
        <p className={body}>{evening.body}</p>
      </Chapter>

      {/* Il capitolo sull'idea: al posto dell'ora, il ritratto piccolo accanto alle date. */}
      <Chapter
        id="idee"
        quiet
        title={t.idea.title}
        mark={
          /* Da md il ritratto pende sotto le date, fuori flusso: nella riga del titolo
             alzava il margine a ~115px e spingeva giù il testo. */
          <span className="relative flex items-center gap-3">
            <img src={portrait} alt={t.idea.portraitAlt} className="size-16 rounded-lg object-cover md:absolute md:left-0 md:top-full md:mt-4" loading="lazy" decoding="async" />
            <span className={label}>
              <span className="block text-foreground">{t.idea.name}</span>
              {t.idea.years}
            </span>
          </span>
        }
      >
        <p className={body}>{t.idea.bio.join(" ")}</p>
      </Chapter>

      {/* Il solo momento `ampio`: la poesia del giorno, al posto della citazione fissa e del carosello. */}
      <section ref={poemRef} id="gedicht" className={`scroll-mt-4 bg-card py-32 md:py-40 ${reveal(poemShown, true)}`}>
        {/* Da lg stessa griglia dei capitoli: testo in col 2, Soul-Birds in col 3. */}
        <figure className="mx-auto max-w-6xl px-5 lg:grid lg:grid-cols-[7rem_minmax(0,52ch)_minmax(0,1fr)] lg:gap-x-12">
          {/* Soul-Birds alla misura del file (262px): a piena larghezza sgranava.
              multiply fa sparire il fondo bianco del jpg sulla superficie bg-card. */}
          <img src={soulBirds} alt={t.idea.birdsAlt} width={262} height={193} className="mb-10 w-full max-w-[262px] mix-blend-multiply lg:col-start-3 lg:row-span-3 lg:row-start-1 lg:mb-0 lg:self-center" loading="lazy" decoding="async" />
          <p className={`${label} lg:col-start-2 lg:row-start-1`}>{t.poem.label}</p>
          <blockquote lang={l} className="mt-6 lg:col-start-2 lg:row-start-2 max-w-[34ch] whitespace-pre-line font-cormorant text-3xl italic leading-snug text-foreground md:text-4xl">
            {poem[l]}
          </blockquote>
          <figcaption className="mt-6 lg:col-start-2 lg:row-start-3 font-work text-sm text-muted-foreground">
            Sri Chinmoy. {t.poem.next}
          </figcaption>
        </figure>
      </section>

      {/* Caffè gemelli e fonti: `stretta`, link di testo. Affiancati da md; da lg sulla griglia dei capitoli. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-2 md:gap-x-8 md:py-14 lg:grid-cols-[7rem_minmax(0,52ch)_minmax(0,1fr)] lg:gap-x-12">
        <div className="lg:col-start-2">
          <h2 className="font-cormorant text-3xl font-semibold leading-tight text-foreground md:text-4xl">{t.cafesTitle}</h2>
          <ul className="mt-2">
            {cafes.map((c) => (
              <li key={c.href}>
                <Out href={c.href} hint={t.newTab}>{c.name}, {c.place}</Out>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-start-3">
          <h2 className="font-cormorant text-3xl font-semibold leading-tight text-foreground md:text-4xl">{t.sourcesTitle}</h2>
          <ul className="mt-2">
            {sources.map((s) => (
              <li key={s.href}>
                <Out href={s.href} hint={t.newTab}>{s.label[l]}</Out>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chiusura `stretta`: la domanda operativa. Unica freccia della pagina. */}
      <footer className="mx-auto max-w-6xl px-5 pb-10 md:pb-14 lg:grid lg:grid-cols-[7rem_minmax(0,52ch)_minmax(0,1fr)] lg:gap-x-12">
        <a href={visit} className="lg:col-start-2 lg:justify-self-start inline-flex min-h-11 items-center font-work text-sm font-semibold uppercase tracking-[0.08em] text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
          {t.find} →
        </a>
      </footer>
    </article>
  );
};

/** Com'è oggi, un estratto: il ritratto a tutta larghezza e il carosello di poesie (AboutUs.tsx). */
const Today = () => (
  <div className="space-y-4">
    <p className="font-work text-xs uppercase tracking-[0.1em] text-muted-foreground">Kapitel 4 · Unsere Inspiration</p>
    <h2 className="font-cormorant text-4xl font-semibold leading-tight text-primary">Sri Chinmoy</h2>
    <img src={portrait} alt="" className="aspect-[4/5] w-full rounded-lg object-cover" />
    <div className="relative rounded-lg border border-border/75 bg-card p-6 shadow-card">
      <p className="whitespace-pre-line text-center font-lora text-lg italic leading-relaxed">"{poems[0].de}"</p>
    </div>
  </div>
);

export const aboutIdeeExperiment: Experiment = {
  id: "about-idee",
  title: "/about strada 2: Ein Tag + Die Idee dahinter",
  feature: "Mobile prima: salto ai capitoli con link di testo, una poesia al giorno, ritratto piccolo accanto alle date, spazi `stretta` su mobile",
  problem:
    "La strada 3 (07) a 390px è circa 9.400px: senza navigazione non si arriva a Sri Chinmoy, il ritratto prende mezza schermata, cinque poesie di fila sono due schermate e mezza.",
  cost: "Copy nuovo in bozza (salto, biografia, titoli delle liste). La citazione fissa esce da /about: decisione di Francesco ancora aperta.",
  support: "grid-template-columns: subgrid — Chrome 117+, Safari 16+, Firefox 71+. IntersectionObserver ovunque.",
  widths: [390, 1280],
  Before: Today,
  After: Idee,
};
