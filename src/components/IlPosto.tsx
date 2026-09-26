import { useLanguage, useLocalizedPath } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gardenCourtyard from "@/assets/photos/garden-courtyard.jpg";

/**
 * Il posto — fusione di ValueProposition (02 · Der Ort) e ShowcaseSections/2
 * (04 · Unser Garten), che raccontavano entrambe il cortile del Raimundhof.
 * Una sezione = un lavoro (antipatterns.md § S6).
 *
 * Qui la numerazione 01/02/03 è l'unica della home, ed è vera: sono i tre passi
 * che l'ospite compie davvero per arrivare al tavolo. Copy DE approvato in
 * CLAUDE.md § "IL POSTO (3 step)".
 *
 * DE e EN sono entrambi copy approvato: il DE è verbatim da CLAUDE.md,
 * l'EN è stato approvato in chat il 13 settembre 2026 e riportato lì.
 */
const steps = [
  {
    n: "01",
    title: { de: "Geh durch den Bogen", en: "Walk through the arch" },
    body: {
      de: "Mariahilferstraße 45 — der Durchgang ist absichtlich versteckt.",
      en: "Mariahilferstraße 45. The passage is hidden on purpose.",
    },
  },
  {
    n: "02",
    title: { de: "Durch den Innenhof", en: "Across the courtyard" },
    body: {
      de: "Im Raimundhof — ein stiller Wiener Hof.",
      en: "Into the Raimundhof, a quiet Viennese courtyard.",
    },
  },
  {
    n: "03",
    title: { de: "Setz dich. Bleib.", en: "Sit down. Stay." },
    body: {
      de: "Keine Eile. Dieser Ort ist gemacht zum Verweilen.",
      en: "No rush. This place is made for staying a while.",
    },
  },
];

export const IlPosto = () => {
  const { language } = useLanguage();
  const lp = useLocalizedPath();

  return (
    <section className="bg-background py-28 md:py-36" aria-labelledby="il-posto-heading">
      <div className="container mx-auto px-5">
        {/* Asimmetrico: il testo tiene la sua misura, l'immagine esce più stretta
            e più alta. Non due metà uguali (antipatterns.md § S7). */}
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_0.72fr] md:items-start md:gap-16">

          <div className="max-w-[62ch] space-y-6">
            <span className="eyebrow-num">{language === "de" ? "Der Ort" : "The place"}</span>

            <h2 id="il-posto-heading" className="h2-editorial text-primary">
              {language === "de" ? "Der Hof hinter dem Bogen" : "The courtyard behind the arch"}
            </h2>

            <p className="text-pretty font-lora text-lg leading-relaxed text-foreground/85">
              {language === "de"
                ? "Du gehst durch den Bogen an der Mariahilferstraße. Ein paar Schritte später wird es leiser, und der Raimundhof öffnet sich."
                : "You walk through the arch on Mariahilferstraße. A few steps later it gets quieter, and Raimundhof opens up."}
            </p>

            {/* Sequenza reale: l'ordine è l'informazione. */}
            <ol className="space-y-5 border-l border-border pl-6">
              {steps.map((step) => (
                <li key={step.n} className="relative">
                  <span
                    className="absolute -left-[25px] top-1 bg-background px-[3px] font-work text-[11px] font-semibold tracking-[0.12em] text-verde-400"
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>
                  <h3 className="font-cormorant text-xl font-semibold leading-snug text-foreground md:text-2xl">
                    {step.title[language]}
                  </h3>
                  <p className="mt-1 text-pretty font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
                    {step.body[language]}
                  </p>
                </li>
              ))}
            </ol>

            <p className="text-pretty font-lora text-lg leading-relaxed text-foreground/85">
              {language === "de"
                ? "Pflanzen, Holztische, Teller vom Tresen. Kein großes Theater, eher ein guter Platz für eine Pause."
                : "Plants, wooden tables, plates from the counter. No big show, just a good place to pause."}
            </p>

            {/* Una sola azione: trovarci e chiamarci sono già permanenti altrove. */}
            <div className="pt-1">
              <Button variant="outline" size="lg" className="font-work" asChild>
                <Link to={lp("/about")}>
                  {language === "de" ? "Unsere Geschichte lesen" : "Read our story"}
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:pt-16">
            <div className="aspect-[3/4] overflow-hidden rounded-lg border border-border">
              <img
                src={gardenCourtyard}
                alt={language === "de"
                  ? "Innenhof mit Holztischen und gelben Sonnenschirmen"
                  : "Courtyard with wooden tables and yellow umbrellas"}
                className="h-full w-full object-cover"
                loading="lazy"
                width={1200}
                height={1600}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
