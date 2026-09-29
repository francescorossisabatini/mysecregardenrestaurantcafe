import tavolata from "@/assets/photos/tavolata-dall-alto.jpg";
import torta from "@/assets/torta-2.jpg";
import courtyard from "@/assets/photos/garden-courtyard.jpg";
import type { Experiment } from "./types";

/**
 * /about, opzione B "Ein Tag" (docs/ux/about-opzioni.md, ledger 29/09/2026).
 * Prototipo: il copy è una BOZZA da approvare. Lingua da ?lang=en nel frame.
 *
 * Una giornata nel cortile; l'ora è il titolo (un dato, direction lock).
 * Zero card: testo libero su 62ch, sezioni separate da spazio, foto e un
 * cambio di superficie. Sri Chinmoy in un punto solo, a fine giornata.
 */

type Lang = "de" | "en";
const lang = (): Lang => (new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "de");

const COPY = {
  de: {
    title: "Unsere Geschichte",
    lede: "Ein Tag im Raimundhof, von halb elf bis kurz vor sieben.",
    hours: [
      { time: "10:30", title: "Die Karte wird geschrieben", body: "Das Gemüse kommt am Morgen, und daraus werden drei Gerichte für den Tag: eine Suppe, ein grünes und ein blaues. Fleisch gibt es bei uns nicht, Alkohol auch nicht." },
      { time: "12:30", title: "Mittag am Tresen", body: "Du bestellst am Tresen, suchst dir einen Platz im Hof, und wir bringen dir das Essen. Manche nehmen es mit ins Büro, andere bleiben bis zum Kaffee." },
      { time: "15:00", title: "Kaffee und Kuchen", body: "Der Kaffee kommt von Supermind und wird jede Woche in Wien geröstet. Die Kuchen backen wir selbst. Zu jedem Kaffee legen wir eine kleine Karte mit einem Gedicht." },
      { time: "18:45", title: "Der Hof wird still", body: "Um 19 Uhr schließen wir, sonntags bleibt der Hof zu. Den Garten gibt es seit 2018. Die Gedichte auf den Karten sind von", after: ", und von ihm ist auch der Satz, nach dem wir arbeiten:" },
    ],
    alt: {
      tavolata: "Ein langer Tisch von oben, mit Tellern vom Tagesmenü",
      torta: "Ein Stück hausgemachter Kuchen",
      courtyard: "Der Innenhof im Raimundhof, mit Pflanzen und Tischen",
    },
    find: "Wie du uns findest",
    draft: "Bozza di copy, da approvare",
  },
  en: {
    title: "Our Story",
    lede: "A day in the Raimundhof, from half past ten until just before seven.",
    hours: [
      { time: "10:30", title: "The menu gets written", body: "The vegetables arrive in the morning and turn into three dishes for the day: a soup, a green one and a blue one. There's no meat here, and no alcohol." },
      { time: "12:30", title: "Lunch at the counter", body: "You order at the counter, pick a seat in the courtyard, and we bring your food over. Some take it back to the office, others stay until coffee." },
      { time: "15:00", title: "Coffee and cake", body: "The coffee comes from Supermind, roasted in Vienna every week. We bake the cakes ourselves. Every coffee comes with a small card carrying a poem." },
      { time: "18:45", title: "The courtyard goes quiet", body: "We close at 19:00, and the courtyard stays shut on Sundays. The garden has been here since 2018. The poems on the cards are by", after: ", and so is the sentence we work by:" },
    ],
    alt: {
      tavolata: "A long table from above, with plates from the daily menu",
      torta: "A slice of homemade cake",
      courtyard: "The Raimundhof courtyard, with plants and tables",
    },
    find: "How to find us",
    draft: "Draft copy, pending approval",
  },
};

/**
 * Riga oraria. Da md in su l'ora sta in margine, a sinistra della colonna
 * (dato, cifre tabulari). Su mobile sta sopra il titolo: in margine il testo
 * scendeva a circa 30 caratteri per riga.
 */
const Hour = ({ time, title, children }: { time: string; title: string; children: React.ReactNode }) => (
  <section className="py-20 md:py-28">
    <div className="mx-auto grid max-w-6xl grid-cols-1 px-5 md:grid-cols-[7rem_minmax(0,62ch)] md:gap-x-8">
      <h2 className="flex flex-col gap-2 md:col-span-2 md:grid md:grid-cols-subgrid md:items-baseline md:gap-x-8 md:gap-y-0">
        <time className="font-work text-sm font-semibold tabular-nums tracking-[0.04em] text-muted-foreground">{time}</time>
        <span className="text-balance font-cormorant text-3xl font-semibold leading-tight text-foreground md:text-4xl">{title}</span>
      </h2>
      <div className="mt-4 space-y-6 md:col-start-2">{children}</div>
    </div>
  </section>
);

const EinTag = () => {
  const l = lang();
  const t = COPY[l];
  const [morning, noon, afternoon, evening] = t.hours;
  const visit = l === "de" ? "/visit" : "/en/visit";

  return (
    <article lang={l} className="bg-background text-foreground">
      <p className="bg-destructive px-5 py-1 text-center font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-destructive-foreground">{t.draft}</p>

      {/* Apertura: l'unico Caveat della pagina. */}
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-20 md:pb-14 md:pt-28">
        <h1 className="font-caveat text-6xl leading-none text-primary md:text-8xl">{t.title}</h1>
        <p className="mt-6 max-w-[62ch] text-pretty font-lora text-lg leading-relaxed text-foreground md:text-xl">{t.lede}</p>
      </header>

      <Hour time={morning.time} title={morning.title}>
        <p className="max-w-[62ch] text-pretty font-lora text-lg leading-relaxed">{morning.body}</p>
      </Hour>

      {/* Cambio di scena dalla mattina al mezzogiorno: piena larghezza, nessuna cornice. */}
      <img src={tavolata} alt={t.alt.tavolata} className="aspect-[16/9] w-full object-cover md:aspect-[21/9]" loading="lazy" decoding="async" />

      <Hour time={noon.time} title={noon.title}>
        <p className="max-w-[62ch] text-pretty font-lora text-lg leading-relaxed">{noon.body}</p>
      </Hour>

      <Hour time={afternoon.time} title={afternoon.title}>
        <p className="max-w-[62ch] text-pretty font-lora text-lg leading-relaxed">{afternoon.body}</p>
        {/* La foto esce dalla colonna verso destra (direction lock: le immagini sì, il testo mai). */}
        <img src={torta} alt={t.alt.torta} className="-mr-5 aspect-[4/5] w-[calc(100%+1.25rem)] max-w-md rounded-lg object-cover md:-mr-24 md:w-[calc(100%+6rem)]" loading="lazy" decoding="async" />
      </Hour>

      <img src={courtyard} alt={t.alt.courtyard} className="aspect-[4/3] w-full object-cover md:aspect-[21/9]" loading="lazy" decoding="async" />

      <Hour time={evening.time} title={evening.title}>
        <p className="max-w-[62ch] text-pretty font-lora text-lg leading-relaxed">
          {evening.body}{" "}
          {/* L'unico riferimento a Sri Chinmoy della pagina: un nome, un link, una citazione. */}
          <a href="https://srichinmoy.org/" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 hover:decoration-foreground">Sri Chinmoy</a>
          {evening.after}
        </p>
      </Hour>

      {/* Il solo momento `ampio` della pagina, su un cambio di superficie. */}
      <section className="bg-card py-32 md:py-40">
        <blockquote lang="en" className="mx-auto max-w-6xl px-5">
          <p className="max-w-[24ch] text-balance font-cormorant text-4xl italic leading-tight text-foreground md:text-6xl">
            „To serve and never be tired is love."
          </p>
        </blockquote>
      </section>

      {/* Chiusura `stretta`: la domanda operativa. Unica freccia della pagina. */}
      <footer className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <a href={visit} className="inline-flex min-h-11 items-center font-work text-sm font-semibold uppercase tracking-[0.08em] text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
          {t.find} →
        </a>
      </footer>
    </article>
  );
};

/** Com'è oggi, un estratto fedele: Kapitel 2, tre card più la card della nota (AboutUs.tsx:325-340). */
const Today = () => (
  <div className="space-y-4">
    <p className="font-work text-xs uppercase tracking-[0.1em] text-muted-foreground">Kapitel 2 · Die Küche</p>
    <h2 className="font-cormorant text-4xl font-semibold leading-tight text-primary">Vegetarisch, vegan, täglich frisch</h2>
    {["Weltküche", "Lokale Produkte", "Bewusst alkoholfrei"].map((title) => (
      <article key={title} className="overflow-hidden rounded-lg border border-border/75 bg-card p-5 shadow-card">
        <h3 className="font-cormorant text-2xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 font-work text-sm text-muted-foreground">…</p>
      </article>
    ))}
    <p className="rounded-lg border border-border/75 bg-card px-5 py-4 text-center font-work text-xs text-muted-foreground shadow-card">Wenn du Zöliakie oder Allergien hast, sag bitte vor der Bestellung Bescheid.</p>
  </div>
);

export const aboutEinTagExperiment: Experiment = {
  id: "about-ein-tag",
  title: "/about come una giornata nel cortile (opzione B)",
  feature: "Struttura narrativa per ore, zero card, grid-cols-subgrid per l'ora in margine",
  problem:
    "AboutUs.tsx racconta con circa 15 card con bordo e ombra, quattro Kapitel numerati, un carosello di poesie (vietato) e una biografia di Sri Chinmoy (voice-spec: massimo un riferimento). Ledger: deroga S3, U1, U2, C1, VOICE aperta per questo giro.",
  cost: "Copy nuovo per ogni ora (bozza da approvare). Si tagliano biografia, fatti, opere, poesie e fonti: decisione di contenuto con il proprietario.",
  support: "grid-template-columns: subgrid — Chrome 117+, Safari 16+, Firefox 71+.",
  widths: [390, 1280],
  Before: Today,
  After: EinTag,
};
