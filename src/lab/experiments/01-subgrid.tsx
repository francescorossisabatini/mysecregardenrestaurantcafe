import type { Experiment } from "./types";
import { dishes } from "./sampleDishes";

/**
 * PRIMA — com'è oggi in HomeMenuPreview.
 * Altezza uguale forzata con lg:min-h-[18rem], allergeni spinti in fondo con
 * mt-auto. Le righe interne (nome, descrizione, prezzo) non si allineano fra
 * una card e l'altra, e le card corte hanno un buco.
 */
const Before = () => (
  <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
    {dishes.map((d) => (
      <div key={d.key} className="rounded-lg border p-4 surface-card md:p-5 lg:flex lg:min-h-[18rem] lg:flex-col">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-cormorant text-xl font-semibold leading-snug text-foreground md:text-2xl">{d.name}</h3>
            <p className="mt-1 font-work text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">{d.label}</p>
            <p className="mt-2 font-work text-sm leading-relaxed text-muted-high-contrast">{d.description}</p>
          </div>
          <p className="shrink-0 font-work text-sm font-semibold text-accent">{d.price}</p>
        </div>
        <div className="lg:mt-auto">
          <p className="font-work text-[11px] text-muted-high-contrast">Allergene: {d.allergens.join(", ")}</p>
        </div>
      </div>
    ))}
  </div>
);

/**
 * DOPO — subgrid.
 * Il contenitore dichiara quattro righe; ogni card è essa stessa una griglia
 * che eredita quelle righe con grid-rows-subgrid. Titolo, etichetta,
 * descrizione e allergeni si allineano orizzontalmente fra tutte le card, e
 * l'altezza la decide il contenuto — niente min-h inventato, niente mt-auto.
 */
const After = () => (
  <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr_auto]">
    {dishes.map((d) => (
      <div
        key={d.key}
        className="rounded-lg border p-4 surface-card md:p-5 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-0"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-cormorant text-xl font-semibold leading-snug text-foreground md:text-2xl">{d.name}</h3>
          <p className="shrink-0 font-work text-sm font-semibold text-accent">{d.price}</p>
        </div>
        <p className="mt-1 font-work text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">{d.label}</p>
        <p className="mt-2 font-work text-sm leading-relaxed text-muted-high-contrast">{d.description}</p>
        <p className="mt-3 font-work text-[11px] text-muted-high-contrast">Allergene: {d.allergens.join(", ")}</p>
      </div>
    ))}
  </div>
);

export const subgridExperiment: Experiment = {
  id: "subgrid",
  title: "Le card dei piatti si allineano riga per riga",
  feature: "grid-rows-subgrid + row-span-N",
  problem:
    "HomeMenuPreview.tsx usa lg:min-h-[18rem] per pareggiare le altezze e lg:mt-auto per spingere gli allergeni in fondo. L'altezza è un numero inventato: con un piatto dal nome corto resta un buco, con uno lungo la card sfonda. E il prezzo della zuppa non sta sulla stessa linea del prezzo del piatto accanto.",
  cost: "Cambia la struttura interna della card: le righe devono essere figli diretti della griglia, quindi il wrapper intermedio sparisce.",
  support: "Subgrid: Chrome 117+, Safari 16+, Firefox 71+. Nessun fallback necessario — senza subgrid le card restano impilate come oggi.",
  widths: [390, 1100],
  Before,
  After,
};
