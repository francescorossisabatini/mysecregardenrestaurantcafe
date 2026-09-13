import { useState } from "react";
import type { Experiment } from "./types";

const Block = ({ visible, className, label }: { visible: boolean; className: string; label: string }) => (
  <div className="rounded-lg border p-6 surface-card">
    <p className="mb-3 font-work text-[10px] uppercase tracking-[0.14em] text-muted-high-contrast">{label}</p>
    {visible && (
      <div className={className}>
        <p className="font-cormorant text-2xl text-foreground">Heute aus der Küche</p>
        <p className="mt-1 font-work text-sm text-muted-high-contrast">Kürbiscremesuppe · Alpenpolenta · Korean Bowl</p>
      </div>
    )}
  </div>
);

const Replay = ({ render }: { render: (visible: boolean) => React.ReactNode }) => {
  const [n, setN] = useState(0);
  const [on, setOn] = useState(true);
  const replay = () => {
    setOn(false);
    requestAnimationFrame(() => requestAnimationFrame(() => { setOn(true); setN((x) => x + 1); }));
  };
  return (
    <div className="space-y-3">
      <button
        onClick={replay}
        className="rounded-lg border border-border px-4 py-2 font-work text-sm text-foreground hover:bg-muted/40"
      >
        Rimonta
      </button>
      <div key={n}>{render(on)}</div>
    </div>
  );
};

/**
 * PRIMA — il pattern che l'hero usava: stato React + setTimeout.
 * Due timer, due variabili di stato, due cleanup, e la sequenza vive nel
 * componente invece che nel foglio di stile. prefers-reduced-motion va
 * gestito a mano o resta ignorato.
 */
const Before = () => (
  <Replay
    render={(on) => (
      <Block
        visible={on}
        label="useState + setTimeout(400) — 12 righe di JS"
        className={`transition-all duration-500 ease-out ${on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
      />
    )}
  />
);

/**
 * DOPO — @starting-style.
 * L'elemento dichiara da dove parte quando viene inserito. Nessuno stato,
 * nessun timer, nessun cleanup. E motion-reduce: la spegne in una parola,
 * invece di dover ricordare di controllare il media query nel JS.
 */
const After = () => (
  <Replay
    render={(on) => (
      <Block
        visible={on}
        label="starting: + motion-reduce: — zero righe di JS"
        className="translate-y-0 opacity-100 transition-all duration-500 ease-out starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none"
      />
    )}
  />
);

export const startingStyleExperiment: Experiment = {
  id: "starting-style",
  title: "Entrata di una sezione senza timer JavaScript",
  feature: "@starting-style — varianti starting: e motion-reduce:",
  problem:
    "Il vecchio Hero.tsx montava l'entrata con due useState e due setTimeout (400ms e 800ms), più i cleanup. È stato tolto nella ristrutturazione, ma il pattern torna ogni volta che una sezione deve entrare. Con i timer, prefers-reduced-motion va controllato a mano nel JS, e in pratica veniva ignorato.",
  cost: "Il comportamento si sposta nel CSS: chi cerca l'animazione nel componente trova solo classi. In cambio spariscono stato, timer e cleanup.",
  support: "@starting-style: Chrome 117+, Safari 17.5+, Firefox 129+. Senza supporto l'elemento appare senza animazione — che è esattamente il risultato voluto sotto prefers-reduced-motion.",
  widths: [560],
  Before,
  After,
};
