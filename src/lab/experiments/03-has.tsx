import type { Experiment } from "./types";
import { oneDish, twoDishes } from "./sampleDishes";
import type { SampleDish } from "./sampleDishes";

const Card = ({ d }: { d: SampleDish }) => (
  <div className="rounded-lg border p-4 surface-card">
    <div className="flex items-start justify-between gap-4">
      <h3 className="font-cormorant text-xl font-semibold leading-snug text-foreground">{d.name}</h3>
      <p className="shrink-0 font-work text-sm font-semibold text-accent">{d.price}</p>
    </div>
    <p className="mt-2 font-work text-sm leading-relaxed text-muted-high-contrast">{d.description}</p>
  </div>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="mb-2 font-work text-[10px] uppercase tracking-[0.14em] text-muted-high-contrast">{label}</p>
    {children}
  </div>
);

/**
 * PRIMA — lg:grid-cols-3 fisse.
 * Nei giorni in cui la cucina manda una zuppa sola, restano due colonne vuote
 * e la card galleggia a sinistra di una griglia da tre.
 */
const Before = () => (
  <div className="space-y-8">
    <Row label="un piatto solo — due colonne vuote">
      <div className="grid gap-4 lg:grid-cols-3">
        {oneDish.map((d) => <Card key={d.key} d={d} />)}
      </div>
    </Row>
    <Row label="due piatti — una colonna vuota">
      <div className="grid gap-4 lg:grid-cols-3">
        {twoDishes.map((d) => <Card key={d.key} d={d} />)}
      </div>
    </Row>
  </div>
);

/**
 * DOPO — la griglia conta i propri figli e si adatta.
 * has-[>*:only-child] → una colonna. has-[>:nth-child(2):last-child] → due.
 * Tutto in CSS: nessun dishes.length nel JSX, nessun ternario sulle classi.
 */
const gridClasses =
  "grid gap-4 lg:grid-cols-3 lg:has-[>*:only-child]:grid-cols-1 lg:has-[>*:only-child]:max-w-md lg:has-[>:nth-child(2):last-child]:grid-cols-2";

const After = () => (
  <div className="space-y-8">
    <Row label="un piatto solo — una colonna, larghezza limitata">
      <div className={gridClasses}>
        {oneDish.map((d) => <Card key={d.key} d={d} />)}
      </div>
    </Row>
    <Row label="due piatti — due colonne">
      <div className={gridClasses}>
        {twoDishes.map((d) => <Card key={d.key} d={d} />)}
      </div>
    </Row>
  </div>
);

export const hasExperiment: Experiment = {
  id: "has",
  title: "La griglia del menu si adatta a quanti piatti ci sono",
  feature: ":has() — varianti has-[...]",
  problem:
    "HomeMenuPreview.tsx filtra i piatti validi e li mette in una griglia lg:grid-cols-3 fissa. Nei giorni in cui arriva solo la zuppa, o solo due piatti, restano una o due colonne vuote e la card galleggia a sinistra. Oggi l'unica alternativa sarebbe un ternario sulle classi in base a dishes.length.",
  cost: "La regola vive nel CSS invece che nel JSX. Va letta nel foglio di stile, non nel componente: chi cerca il perché nel JSX non lo trova.",
  support: ":has() è disponibile ovunque dal 2023. Senza supporto, la griglia resta a tre colonne — cioè com'è oggi.",
  widths: [1100],
  Before,
  After,
};
