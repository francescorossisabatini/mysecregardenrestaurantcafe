import type { ReactNode } from "react";
import entranceDoorway from "@/assets/photos/entrance-doorway.jpg";
import gardenCourtyard from "@/assets/photos/garden-courtyard.jpg";
import tavolataDallAlto from "@/assets/photos/tavolata-dall-alto.jpg";
import cheersTable from "@/assets/photos/cheers-table.jpg";
import sriChinmoyImage from "@/assets/sri-chinmoy-portrait.jpg";
import sriChinmoyBirds from "@/assets/sri-chinmoy-birds.jpg";
import sriChinmoyFlowers from "@/assets/sri-chinmoy-flowers.jpg";
import sriChinmoyWaves from "@/assets/sri-chinmoy-waves.jpg";
import sriChinmoyAbstract from "@/assets/sri-chinmoy-abstract.jpg";
import { SITE } from "@/config/site";
import type { Experiment } from "./types";

/**
 * /about, strada 3: il contenuto di oggi senza card e senza carosello
 * (ledger 29/09/2026). Serve a vedere cosa resta quando togli le scatole.
 * Copy INVARIATO da AboutUs.tsx, compresi i suoi problemi di voce: toccarlo
 * qui sarebbe copy nuovo. Lingua da ?lang=en nel frame.
 */

type Lang = "de" | "en";
const lang = (): Lang => (new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "de");

const poems = [
  { en: "World peace can be achieved\nWhen the power of love\nReplaces the love of power.", de: "Weltfrieden kann erreicht werden,\nwenn die Kraft der Liebe\ndie Liebe zur Macht ersetzt." },
  { en: "Try not to change the world.\nYou will fail.\nTry to love the world.\nLo, the world is changed\nForever.", de: "Versuche nicht, die Welt zu ändern.\nDu wirst scheitern.\nVersuche, die Welt zu lieben.\nSiehe, die Welt ist verändert\nFür immer." },
  { en: "If you have inner peace,\nNobody can force you to be\nA slave to the outer reality.", de: "Wenn du inneren Frieden hast,\nkann dich niemand zwingen,\nein Sklave der äußeren Realität zu sein." },
  { en: "Meditation means\nConversation with silence.", de: "Meditation bedeutet\nGespräch mit der Stille." },
  { en: "To be rich\nIs to give a smile\nWith no expectation of return.", de: "Reich zu sein\nbedeutet, ein Lächeln zu schenken\nohne Erwartung einer Gegenleistung." },
];

const artworks = [
  { src: sriChinmoyBirds, alt: "Soul-Birds" },
  { src: sriChinmoyFlowers, alt: "Jharna-Kala flowers" },
  { src: sriChinmoyWaves, alt: "Jharna-Kala waves" },
  { src: sriChinmoyAbstract, alt: "Jharna-Kala abstract work" },
];

const sourceLinks = [
  { href: "https://srichinmoy.org/sri_chinmoy/biography/", label: { de: "Offizielle Biografie", en: "Official biography" } },
  { href: "https://srichinmoy.org/", label: { de: "Offizielle Website", en: "Official site" } },
  { href: "https://www.srichinmoy.org/sri_chinmoy/landmarks/cultural_offerings/", label: { de: "Kulturelle Werke", en: "Cultural offerings" } },
  { href: "https://srichinmoy.org/sri_chinmoy/art", label: { de: "Jharna-Kala Kunst", en: "Jharna-Kala art" } },
  { href: "https://www.srichinmoylibrary.com/srichinmoy", label: { de: "Sri Chinmoy Library", en: "Sri Chinmoy Library" } },
  { href: "https://www.srichinmoycentre.org/enterprises", label: { de: "Restaurants und Cafés", en: "Restaurants and cafés" } },
];

const restaurantLinks = [
  { href: "https://www.heartofjoy.at/en/", name: "The Heart of Joy", place: "Salzburg" },
  { href: "https://www.smileofthebeyond.com/", name: "The Smile of the Beyond", place: "Queens, New York" },
  { href: "https://myrainbowdreams.org/our-story", name: "My Rainbow-Dreams", place: "Canberra" },
  { href: "https://www.happiness-heart-cafe.de/", name: "Happiness-Heart Café", place: "Berlin" },
  { href: "https://vegelateria.ch/", name: "The Sacred / Vegelateria", place: "Zürich" },
];

/* Testi copiati da AboutUs.tsx:118-219. Tolte solo le chiavi dei chip di navigazione. */
const COPY = {
  de: {
    heroTitle: "Unsere Geschichte",
    heroKicker: "Vegetarisches Restaurant im Raimundhof",
    heroLead: "Ein stiller Innenhof, frisches Essen, ein kurzer Moment zum Durchatmen mitten in Wien.",
    heroText: "My Secret Garden ist kein lautes Konzept. Es ist ein Ort, an dem Küche, Garten und eine spirituelle Idee langsam zusammenfinden.",
    placeTitle: "Ein Garten hinter dem Bogen",
    placeText1: "Von der Mariahilferstraße sind es nur wenige Schritte. Dann wird es leiser, der Raimundhof öffnet sich, und zwischen Pflanzen, Holztischen und Stimmen vom Tresen entsteht ein anderer Rhythmus.",
    placeText2: "Wir mögen Orte, die nicht perfekt wirken müssen. Der Hof ist echt, manchmal belebt, manchmal ganz ruhig. Genau darin liegt sein Charme.",
    placeCaption: "Der Eingang führt durch den Raimundhof in unseren begrünten Innenhof.",
    route: "Route zum Raimundhof",
    kitchenTitle: "Vegetarisch, vegan, täglich frisch",
    kitchenIntro: "Unsere Küche reist ein bisschen: Indien, Japan, Mittelmeer, Wien. Am Ende landet alles als ehrlicher Teller am Tresen.",
    kitchenCards: [
      { title: "Weltküche", text: "Dal, Curry, Bowl, Polenta, Suppe. Nicht alles an einem Tag, aber immer mit Lust auf Abwechslung." },
      { title: "Lokale Produkte", text: "Gemüse, Salate und Getreide kommen morgens in die Küche. Was zur Saison passt, darf auf die Karte." },
      { title: "Bewusst alkoholfrei", text: "Bei uns gibt es keinen Alkohol. Dafür Tee, Kaffee, hausgemachte Kuchen und viele Gerichte ohne glutenhaltige Zutaten." },
    ],
    kitchenNote: "Wenn du Zöliakie oder Allergien hast, sag bitte vor der Bestellung Bescheid. Unsere Küche ist nicht zertifiziert glutenfrei.",
    rhythmTitle: "Mittags schnell, im Garten langsam",
    rhythmText1: "Zwischen 11 und 19 Uhr verändert sich der Raum mehrmals. Erst kommt der Duft vom Tagesmenü, dann die Gespräche am Tresen, später Kaffee, Kuchen und ein ruhiger Hofmoment.",
    rhythmText2: "Manche Gäste nehmen ihr Essen mit, andere bleiben länger als geplant. Beides gehört zu uns. Der Teller soll nicht inszeniert wirken, sondern gut tun.",
    rhythmQuote: "Ein Teller kann den Tag nicht lösen. Aber er kann ihn kurz leichter machen.",
    inspirationTitle: "Sri Chinmoy",
    inspirationIntro: "Sri Chinmoy (1931 bis 2007) war ein spiritueller Lehrer, Dichter, Künstler, Musiker und Friedensvisionär. Seine Botschaft war einfach und anspruchsvoll zugleich: äußerer Frieden beginnt mit innerem Frieden.",
    inspirationStory1: "Geboren in Bengalen, verbrachte er viele Jahre in spiritueller Praxis in Indien. 1964 zog er nach New York, wo er Meditation, Musik, Kunst, Dichtung und Friedensinitiativen miteinander verband.",
    inspirationStory2: "Er hielt Friedensmeditationen bei den Vereinten Nationen, gab weltweit Konzerte und entwickelte mit Jharna-Kala eine spontane Kunstform. Seine Soul-Birds stehen für Freiheit, Einheit und inneres Streben.",
    inspirationStory3: "Für uns ist diese Inspiration nicht dekorativ. Sie zeigt sich leise: in vegetarischer Küche, in achtsamem Service, in einem Raum, der Menschen nicht beschleunigen will.",
    factsTitle: "Ein Leben in vielen Ausdrucksformen",
    facts: [
      { title: "Dichtung und Bücher", text: "Über 1.500 veröffentlichte Bücher und eine große Sammlung kurzer Gedichte und Aphorismen." },
      { title: "Jharna-Kala", text: "Spontane Kunst und Millionen von Soul-Birds als Zeichen innerer Freiheit." },
      { title: "Musik und Frieden", text: "Konzerte, Lieder und Friedensinitiativen als Angebote für Harmonie." },
      { title: "Dienst am Menschen", text: "Meditation sollte nicht Flucht sein, sondern im Alltag durch selbstlosen Dienst sichtbar werden." },
    ],
    artTitle: "Jharna-Kala und Soul-Birds",
    artText: "Die Kunstwerke geben der Seite einen ruhigen, offenen Rhythmus. Sie sind nicht Dekoration allein, sondern Teil der Sprache, die unser Restaurant geprägt hat.",
    poemTitle: "Seine Worte",
    poemHint: "Mit jedem Kaffee erhältst du eine Karte mit einem seiner Gedichte.",
    widerTitle: "Eine größere Familie vegetarischer Cafés",
    widerText: "Weltweit entstanden Restaurants und Cafés, die von Sri Chinmoys Schülern geführt oder inspiriert wurden. Sie sind unabhängig, teilen aber oft dieselbe Idee: vegetarisches Essen als einfache Form von Gastfreundschaft und Service.",
    readMoreTitle: "Weiterlesen",
    readMoreText: "Ausgewählte Quellen zu Biografie, Kunst, Literatur und den inspirierten Restaurants.",
    years: "1931 bis 2007",
    alt: { entrance: "Eingang zu My Secret Garden im Raimundhof", courtyard: "Begrünter Innenhof mit Holztischen", cheers: "Anstoßen am Tisch mit frischen Gerichten" },
    find: "Wie du uns findest",
    note: "Prova: il contenuto di oggi senza card",
  },
  en: {
    heroTitle: "Our Story",
    heroKicker: "Vegetarian restaurant in Raimundhof",
    heroLead: "A quiet courtyard, fresh food and a short moment to breathe in the middle of Vienna.",
    heroText: "My Secret Garden is not a loud concept. It is a place where kitchen, garden and a spiritual idea slowly come together.",
    placeTitle: "A garden behind the arch",
    placeText1: "It is only a few steps from Mariahilferstraße. Then it gets quieter, Raimundhof opens up, and between plants, wooden tables and voices from the counter, another rhythm begins.",
    placeText2: "We like places that do not have to feel perfect. The courtyard is real, sometimes lively, sometimes almost still. That is its charm.",
    placeCaption: "The entrance leads through Raimundhof into our green courtyard.",
    route: "Directions to Raimundhof",
    kitchenTitle: "Vegetarian, vegan, fresh every day",
    kitchenIntro: "Our kitchen travels a little: India, Japan, the Mediterranean, Vienna. In the end, everything lands as an honest plate at the counter.",
    kitchenCards: [
      { title: "World cuisine", text: "Dal, curry, bowls, polenta, soup. Not all on the same day, but always with room for change." },
      { title: "Local produce", text: "Vegetables, salads and grains arrive in the morning. What fits the season may end up on the menu." },
      { title: "Mindful and alcohol free", text: "We do not serve alcohol. We do serve tea, coffee, homemade cakes and many dishes without gluten containing ingredients." },
    ],
    kitchenNote: "If you are coeliac or have allergies, please tell us before ordering. Our kitchen is not certified gluten free.",
    rhythmTitle: "Quick at lunch, slower in the garden",
    rhythmText1: "Between 11 and 19, the room changes more than once. First comes the smell of the daily menu, then conversations at the counter, later coffee, cake and a quiet courtyard moment.",
    rhythmText2: "Some guests take food away, others stay longer than planned. Both belong here. A plate should not feel staged, it should feel good.",
    rhythmQuote: "A plate cannot fix the day. But it can make it lighter for a moment.",
    inspirationTitle: "Sri Chinmoy",
    inspirationIntro: "Sri Chinmoy (1931 to 2007) was a spiritual teacher, poet, artist, musician and peace visionary. His message was simple and demanding at the same time: outer peace begins with inner peace.",
    inspirationStory1: "Born in Bengal, he spent many years in spiritual practice in India. In 1964 he moved to New York, where he brought together meditation, music, art, poetry and peace initiatives.",
    inspirationStory2: "He offered peace meditations at the United Nations, gave concerts around the world and developed Jharna-Kala, a spontaneous form of art. His Soul-Birds stand for freedom, unity and inner aspiration.",
    inspirationStory3: "For us, this inspiration is not decorative. It shows quietly: in vegetarian cooking, in mindful service, in a room that does not try to rush people.",
    factsTitle: "A life in many forms of expression",
    facts: [
      { title: "Poetry and books", text: "Over 1,500 published books and a large body of short poems and aphorisms." },
      { title: "Jharna-Kala", text: "Spontaneous art and millions of Soul-Birds as signs of inner freedom." },
      { title: "Music and peace", text: "Concerts, songs and peace initiatives offered as gestures of harmony." },
      { title: "Service to people", text: "Meditation was not meant as escape, but as something visible in daily selfless service." },
    ],
    artTitle: "Jharna-Kala and Soul-Birds",
    artText: "The artworks give the page a calm, open rhythm. They are not decoration alone, but part of the language that shaped our restaurant.",
    poemTitle: "His words",
    poemHint: "With every coffee, you receive a card with one of his poems.",
    widerTitle: "A wider family of vegetarian cafés",
    widerText: "Around the world, restaurants and cafés were opened or inspired by students of Sri Chinmoy. They are independent, but often share the same idea: vegetarian food as a simple form of hospitality and service.",
    readMoreTitle: "Read more",
    readMoreText: "Selected sources about biography, art, literature and the inspired restaurants.",
    years: "1931 to 2007",
    alt: { entrance: "Entrance to My Secret Garden in Raimundhof", courtyard: "Green courtyard with wooden tables", cheers: "Cheers at the table with fresh dishes" },
    find: "How to find us",
    note: "Test: today's content without cards",
  },
};

const body = "max-w-[62ch] text-pretty font-lora text-lg leading-relaxed";
const small = "max-w-[62ch] text-pretty font-work text-base leading-relaxed text-muted-foreground";
const h2 = "text-balance font-cormorant text-3xl font-semibold leading-tight text-foreground md:text-5xl";
const h3 = "text-balance font-cormorant text-2xl font-semibold leading-tight text-foreground md:text-3xl";
/* inline-block, non flex: con flex il testo che va a capo spingeva la freccia sul bordo destro. */
const textLink = "inline-block py-2.5 font-work text-base text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground";

/**
 * Capitolo: il numero sta nel margine da md in su (come l'ora nella strada B),
 * sopra il titolo su mobile. Sostituisce l'occhiello "Kapitel 0N · Label",
 * che si ripeteva cinque volte.
 */
const Chapter = ({ n, title, id, children }: { n: string; title: string; id: string; children: ReactNode }) => (
  <section id={id} className="py-20 md:py-28">
    <div className="mx-auto grid max-w-6xl grid-cols-1 px-5 md:grid-cols-[7rem_minmax(0,62ch)] md:gap-x-8">
      <h2 className="flex flex-col gap-2 md:col-span-2 md:grid md:grid-cols-subgrid md:items-baseline md:gap-x-8 md:gap-y-0">
        <span className="font-work text-sm font-semibold tabular-nums tracking-[0.04em] text-muted-foreground">{n}</span>
        <span className={h2}>{title}</span>
      </h2>
      <div className="mt-6 space-y-6 md:col-start-2">{children}</div>
    </div>
  </section>
);

/** Link esterno come testo. "↗" prende il posto dell'icona ExternalLink, senza copy nuovo. */
const Out = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={textLink}>
    {children}
    <span aria-hidden="true">{"\u00a0↗"}</span>
  </a>
);

const SenzaCard = () => {
  const l = lang();
  const t = COPY[l];
  const visit = l === "de" ? "/visit" : "/en/visit";

  return (
    <article lang={l} className="bg-background text-foreground">
      <p className="bg-destructive px-5 py-1 text-center font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-destructive-foreground">{t.note}</p>

      <header className="mx-auto max-w-6xl px-5 pb-10 pt-20 md:pb-14 md:pt-28">
        <p className="font-work text-sm font-semibold text-muted-foreground">{t.heroKicker}</p>
        <h1 className="mt-4 font-caveat text-6xl leading-none text-primary md:text-8xl">{t.heroTitle}</h1>
        <p className="mt-6 max-w-[40ch] text-pretty font-lora text-xl leading-relaxed md:text-2xl">{t.heroLead}</p>
        <p className={`mt-4 ${small}`}>{t.heroText}</p>
      </header>

      {/* L'ingresso a piena larghezza, senza cornice: è l'arco da cui si entra. */}
      <figure>
        <img src={entranceDoorway} alt={t.alt.entrance} className="aspect-[4/3] w-full object-cover md:aspect-[21/9]" />
        <figcaption className="mx-auto max-w-6xl px-5 pt-3 font-work text-sm text-muted-foreground">{t.placeCaption}</figcaption>
      </figure>

      <Chapter n="01" id="place" title={t.placeTitle}>
        <p className={body}>{t.placeText1}</p>
        <p className={small}>{t.placeText2}</p>
        <Out href={SITE.mapsUrl}>{t.route}</Out>
        {/* Esce a destra dalla colonna: le immagini sì, il testo mai. */}
        <img src={gardenCourtyard} alt={t.alt.courtyard} className="-mr-5 aspect-[4/5] w-[calc(100%+1.25rem)] max-w-md rounded-lg object-cover md:-mr-24 md:w-[calc(100%+6rem)]" loading="lazy" decoding="async" />
      </Chapter>

      {/* Primo cambio di superficie (No-Line Rule), al posto delle tre card. */}
      <div className="bg-card">
        <Chapter n="02" id="kitchen" title={t.kitchenTitle}>
          <p className={body}>{t.kitchenIntro}</p>
          <dl className="space-y-6">
            {t.kitchenCards.map((c) => (
              <div key={c.title}>
                <dt className={h3}>{c.title}</dt>
                <dd className={`mt-1 ${small}`}>{c.text}</dd>
              </div>
            ))}
          </dl>
          <p className="max-w-[62ch] font-work text-base font-semibold leading-relaxed">{t.kitchenNote}</p>
        </Chapter>
        <img src={tavolataDallAlto} alt="" className="aspect-[16/9] w-full object-cover md:aspect-[21/9]" loading="lazy" decoding="async" />
      </div>

      <Chapter n="03" id="rhythm" title={t.rhythmTitle}>
        <p className={body}>{t.rhythmText1}</p>
        <p className={small}>{t.rhythmText2}</p>
        <blockquote className="max-w-[40ch] pt-4 font-cormorant text-3xl italic leading-snug md:text-4xl">{t.rhythmQuote}</blockquote>
        <img src={cheersTable} alt={t.alt.cheers} className="-mr-5 aspect-[5/4] w-[calc(100%+1.25rem)] rounded-lg object-cover md:-mr-24 md:w-[calc(100%+6rem)]" loading="lazy" decoding="async" />
      </Chapter>

      <Chapter n="04" id="sri-chinmoy" title={t.inspirationTitle}>
        <figure className="max-w-xs">
          <img src={sriChinmoyImage} alt="Sri Chinmoy" className="aspect-[3/4] w-full rounded-lg object-cover" loading="lazy" decoding="async" />
          <figcaption className="pt-3 font-work text-sm tabular-nums text-muted-foreground">{t.years}</figcaption>
        </figure>
        <p className={body}>{t.inspirationIntro}</p>
        <p className={small}>{t.inspirationStory1}</p>
        <p className={small}>{t.inspirationStory2}</p>
        <p className={small}>{t.inspirationStory3}</p>

        <h3 className={`pt-8 ${h3}`}>{t.factsTitle}</h3>
        <dl className="space-y-5">
          {t.facts.map((f) => (
            <div key={f.title}>
              <dt className="font-work text-base font-semibold">{f.title}</dt>
              <dd className={`mt-1 ${small}`}>{f.text}</dd>
            </div>
          ))}
        </dl>

        <h3 className={`pt-8 ${h3}`}>{t.artTitle}</h3>
        <p className={small}>{t.artText}</p>
      </Chapter>

      {/* Le opere escono dalla colonna: 2×2 su mobile, in fila su desktop. Nessuna cornice. */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-5 md:grid-cols-4">
        {artworks.map((a) => (
          <img key={a.alt} src={a.src} alt={a.alt} className="aspect-square w-full object-cover" loading="lazy" decoding="async" />
        ))}
      </div>

      {/* Il solo momento `ampio`: le cinque poesie una dopo l'altra, al posto del carosello. */}
      <section className="mt-20 bg-card py-32 md:mt-28 md:py-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 px-5 md:grid-cols-[7rem_minmax(0,62ch)] md:gap-x-8">
          <div className="md:col-start-2">
            <h2 className={h2}>{t.poemTitle}</h2>
            <p className={`mt-4 ${small}`}>{t.poemHint}</p>
            <div className="mt-14 space-y-14">
              {poems.map((p) => (
                <p key={p.en} lang={l} className="whitespace-pre-line font-cormorant text-2xl italic leading-snug md:text-3xl">
                  {p[l]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Chapter n="05" id="wider" title={t.widerTitle}>
        <p className={small}>{t.widerText}</p>
        <ul>
          {restaurantLinks.map((r) => (
            <li key={r.href}>
              <Out href={r.href}>
                {r.name}, {r.place}
              </Out>
            </li>
          ))}
        </ul>

        <h3 className={`pt-8 ${h3}`}>{t.readMoreTitle}</h3>
        <p className={small}>{t.readMoreText}</p>
        <ul>
          {sourceLinks.map((s) => (
            <li key={s.href}>
              <Out href={s.href}>{s.label[l]}</Out>
            </li>
          ))}
        </ul>
      </Chapter>

      <footer className="mx-auto max-w-6xl px-5 pb-10 md:pb-14">
        <a href={visit} className="inline-flex min-h-11 items-center font-work text-sm font-semibold uppercase tracking-[0.08em] text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
          {t.find} →
        </a>
      </footer>
    </article>
  );
};

/** Com'è oggi, un estratto fedele: il carosello delle poesie (AboutUs.tsx:451-475). */
const Today = () => (
  <div className="mx-auto max-w-3xl">
    <h3 className="mb-7 text-center font-cormorant text-3xl font-semibold text-accent">Seine Worte</h3>
    <div className="relative">
      <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-border/75 bg-card p-8 shadow-card">
        <p className="whitespace-pre-line text-center font-lora text-lg italic leading-relaxed">"{poems[0].de}"</p>
      </div>
      <span className="absolute left-0 top-1/2 flex h-11 w-11 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-border/75 bg-card">‹</span>
      <span className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 translate-x-3 items-center justify-center rounded-full border border-border/75 bg-card">›</span>
    </div>
    <p className="mt-5 text-center font-lora text-sm italic text-muted-foreground">Mit jedem Kaffee erhältst du eine Karte mit einem seiner Gedichte.</p>
  </div>
);

export const aboutSenzaCardExperiment: Experiment = {
  id: "about-senza-card",
  title: "/about com'è oggi, senza card (strada 3)",
  feature: "Stesso contenuto, contenitori tolti: dl al posto delle card, poesie in colonna al posto del carosello",
  problem:
    "AboutUs.tsx: circa 15 superfici con bordo e ombra (righe 329, 340, 367, 382, 411, 418, 444, 454, 478, 491), carosello di poesie (452-475), 8 icone decorative, occhiello Kapitel ripetuto cinque volte.",
  cost: "Nessun copy nuovo, quindi restano i problemi di voce del copy di oggi. La pagina si allunga: cinque poesie in fila.",
  support: "grid-template-columns: subgrid — Chrome 117+, Safari 16+, Firefox 71+.",
  widths: [390, 1280],
  Before: Today,
  After: SenzaCard,
};
