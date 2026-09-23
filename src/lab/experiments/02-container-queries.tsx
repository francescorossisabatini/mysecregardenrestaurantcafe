import type { Experiment, VariantProps } from "./types";
import { dishes } from "./sampleDishes";

const d = dishes[1];

/**
 * PRIMA — la card decide il suo layout guardando il viewport (lg:).
 * Funziona finché sta nella colonna per cui è stata scritta. Messa in una
 * colonna stretta su desktop, resta in modalità "larga" e va a capo male;
 * per questo HomeMenuPreview ha una seconda card semplificata, quasi identica,
 * per l'anteprima di domani.
 */
const Before = () => (
  <div className="rounded-lg border p-4 surface-card">
    <div className="lg:flex lg:items-start lg:justify-between lg:gap-6">
      <div className="min-w-0">
        <h3 className="font-cormorant text-xl font-semibold leading-snug text-foreground lg:text-2xl">{d.name}</h3>
        <p className="mt-2 font-work text-sm leading-relaxed text-muted-high-contrast lg:text-base">{d.description}</p>
      </div>
      <p className="mt-3 font-work text-sm font-semibold text-accent lg:mt-0 lg:shrink-0">{d.price}</p>
    </div>
  </div>
);

/**
 * DOPO — la card guarda il proprio contenitore.
 * @container sul wrapper, poi @md: e @lg: al posto di lg:. La stessa card
 * funziona nell'anteprima home a tre colonne, nella colonna stretta di domani
 * e a piena larghezza su /menu, senza una seconda copia del componente.
 */
const After = () => (
  <div className="@container rounded-lg border p-4 surface-card">
    <div className="@md:flex @md:items-start @md:justify-between @md:gap-6">
      <div className="min-w-0">
        <h3 className="font-cormorant text-xl font-semibold leading-snug text-foreground @md:text-2xl">{d.name}</h3>
        <p className="mt-2 font-work text-sm leading-relaxed text-muted-high-contrast @md:text-base">{d.description}</p>
      </div>
      <p className="mt-3 font-work text-sm font-semibold text-accent @md:mt-0 @md:shrink-0">{d.price}</p>
    </div>
  </div>
);

/** Tre contenitori di larghezza diversa, affiancati: è lì che si vede. */
const Trio = ({ Variant }: { Variant: (p: VariantProps) => JSX.Element }) => (
  <div className="flex flex-wrap items-start gap-4">
    {[260, 420, 640].map((w) => (
      <div key={w} style={{ width: w }}>
        <p className="mb-1.5 font-work text-[10px] uppercase tracking-[0.14em] text-muted-high-contrast">
          contenitore {w}px
        </p>
        <Variant width={w} />
      </div>
    ))}
  </div>
);

export const containerQueriesExperiment: Experiment = {
  id: "container-queries",
  title: "La stessa card in tre colonne di larghezza diversa",
  feature: "@container + varianti @md: / @lg:",
  problem:
    "Le card dei piatti usano i breakpoint del viewport (lg:). Reggono solo nella colonna per cui sono state scritte. Per questo HomeMenuPreview.tsx contiene una seconda card, semplificata e quasi identica, solo per l'anteprima di domani: due componenti da tenere allineati a mano.",
  cost: "Serve un wrapper con @container. Le varianti @ costano zero in più di peso: Tailwind v4 le ha nel core, senza plugin.",
  support: "Container queries: tutti i browser aggiornati da fine 2023. Senza supporto, le varianti @ non si applicano e la card resta nella forma stretta, che è leggibile.",
  widths: [1100],
  Before: () => <Trio Variant={Before} />,
  After: () => <Trio Variant={After} />,
};
