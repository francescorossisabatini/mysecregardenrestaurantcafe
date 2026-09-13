import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { experiments } from "./experiments/registry";

/**
 * Shell del banco. Deliberatamente NON somiglia al sito: cromatura grigia e
 * tecnica, così non si confonde mai un pezzo di banco con un pezzo di prodotto.
 * Dentro i riquadri gira il CSS vero dell'app.
 *
 * Ogni anteprima sta in un iframe alla larghezza indicata. È l'unico modo
 * onesto: dare una larghezza a un div NON simula un viewport, e le varianti
 * con breakpoint lg: continuerebbero ad applicarsi come sul monitor grande.
 * La prima versione di questo file lo faceva, e mostrava tre colonne dentro
 * una finestra da 390px.
 */

const params = new URLSearchParams(window.location.search);
const frameExp = params.get("exp");
const frameVariant = params.get("variant");

/** Modalità iframe: renderizza solo la variante e comunica la sua altezza. */
const Frame = () => {
  const exp = experiments.find((e) => e.id === frameExp);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const send = () => {
      const h = ref.current?.getBoundingClientRect().height ?? 0;
      window.parent.postMessage({ labHeight: Math.ceil(h), exp: frameExp, variant: frameVariant }, "*");
    };
    const ro = new ResizeObserver(send);
    ro.observe(ref.current);
    send();
    return () => ro.disconnect();
  }, []);

  if (!exp) return <p>Esperimento sconosciuto: {frameExp}</p>;
  const Variant = frameVariant === "after" ? exp.After : exp.Before;

  return (
    <div ref={ref} className="bg-background p-4 font-lora text-foreground">
      <Variant width={window.innerWidth} />
    </div>
  );
};

const Preview = ({ expId, variant, width }: { expId: string; variant: "before" | "after"; width: number }) => {
  const [height, setHeight] = useState(320);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (d && d.exp === expId && d.variant === variant && typeof d.labHeight === "number") {
        setHeight(d.labHeight);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [expId, variant]);

  return (
    <iframe
      title={`${expId} ${variant} ${width}px`}
      src={`/lab.html?exp=${expId}&variant=${variant}`}
      style={{ width, height }}
      className="block max-w-full border border-neutral-300 bg-white"
    />
  );
};

export const LabApp = () => {
  if (frameExp) return <Frame />;

  const [activeId, setActiveId] = useState(experiments[0].id);
  const [width, setWidth] = useState<number>(experiments[0].widths[0]);
  const { language, setLanguage } = useLanguage();

  const exp = experiments.find((e) => e.id === activeId)!;
  const widths = exp.widths;
  const effectiveWidth = widths.includes(width) ? width : widths[0];

  const pick = (id: string) => {
    const next = experiments.find((e) => e.id === id)!;
    setActiveId(id);
    setWidth(next.widths[0]);
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900">
      <header className="border-b border-neutral-300 bg-white px-5 py-4">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="text-base font-semibold tracking-tight">Banco — CS01</h1>
          <p className="text-xs text-neutral-500">
            Solo sviluppo. <code>vite build</code> costruisce solo <code>index.html</code>, quindi non finisce in produzione.
          </p>
          <button
            onClick={() => setLanguage(language === "de" ? "en" : "de")}
            className="ml-auto rounded border border-neutral-300 px-2.5 py-1 text-xs font-medium hover:bg-neutral-50"
          >
            {language.toUpperCase()}
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-6 lg:flex-row">
        <nav className="lg:w-64 lg:shrink-0">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Esperimenti</p>
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {experiments.map((e) => (
              <li key={e.id}>
                <button
                  onClick={() => pick(e.id)}
                  className={`w-full rounded border px-3 py-2 text-left text-sm transition-colors ${
                    e.id === activeId
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-300 bg-white hover:bg-neutral-50"
                  }`}
                >
                  <span className="block font-medium leading-tight">{e.title}</span>
                  <span className={`mt-0.5 block font-mono text-[10px] ${e.id === activeId ? "text-neutral-300" : "text-neutral-500"}`}>
                    {e.feature}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 flex-1 space-y-5">
          <section className="rounded border border-neutral-300 bg-white p-5">
            <h2 className="text-lg font-semibold tracking-tight">{exp.title}</h2>
            <p className="mt-0.5 font-mono text-xs text-neutral-500">{exp.feature}</p>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
              {([["Il difetto", exp.problem], ["Costo", exp.cost], ["Supporto", exp.support]] as const).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">{k}</dt>
                  <dd className="mt-1 leading-relaxed text-neutral-700">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {widths.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Viewport</span>
              {widths.map((w) => (
                <button
                  key={w}
                  onClick={() => setWidth(w)}
                  className={`rounded border px-2.5 py-1 font-mono text-xs ${
                    w === effectiveWidth ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 bg-white hover:bg-neutral-50"
                  }`}
                >
                  {w}px
                </button>
              ))}
            </div>
          )}

          {(["before", "after"] as const).map((v) => (
            <section key={v} className="rounded border border-neutral-300 bg-white">
              <p className="border-b border-neutral-200 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {v === "before" ? "Prima — com'è oggi" : "Dopo — con la funzione"}
              </p>
              <div className="overflow-x-auto p-4">
                <Preview key={`${activeId}-${v}-${effectiveWidth}`} expId={activeId} variant={v} width={effectiveWidth} />
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};
