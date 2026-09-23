import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Tokens/Motion",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

const DURATIONS: { name: string; className: string; ms: string; quando: string }[] = [
  { name: "instant", className: "duration-instant", ms: "100ms", quando: "feedback di pressione (active:scale)" },
  { name: "fast", className: "duration-fast", ms: "150ms", quando: "non ancora usato — riservato a tooltip" },
  { name: "base", className: "duration-base", ms: "250ms", quando: "stati: hover, focus, colore, transform su interazione" },
  { name: "slow", className: "duration-slow", ms: "400ms", quando: "comparsa/scomparsa di un elemento, cambio ambientale legato allo scroll" },
  { name: "narrative", className: "duration-narrative", ms: "900ms", quando: "reveal di contenuto lungo (foto in galleria)" },
];

export const Durations: Story = {
  render: () => (
    <div className="p-8 bg-cream-50 space-y-6">
      <h2 className="font-cormorant text-3xl mb-2 text-navy-500">Motion — durate</h2>
      <p className="font-lora text-sm text-navy-400 max-w-prose mb-4">
        Ogni riga ha una classe Tailwind diretta (<code>src/index.css</code>). Passa il
        mouse su un riquadro per vedere la sua durata reale. Solo <code>transform</code>,{" "}
        <code>opacity</code> e <code>filter</code> — mai animazioni su testo, mai più di
        una alla volta. <code>prefers-reduced-motion</code> sempre rispettato.
      </p>
      <div className="flex flex-wrap gap-8">
        {DURATIONS.map((d) => (
          <div key={d.name} className="text-center w-40">
            <div className="group h-20 w-full rounded-lg bg-cream-200 border border-navy-100 overflow-hidden flex items-center justify-center">
              <div
                className={`h-10 w-10 rounded-full bg-verde-300 transition-transform ${d.className} group-hover:scale-150`}
              />
            </div>
            <p className="mt-2 font-work text-xs font-semibold text-navy-500">
              {d.name} — {d.ms}
            </p>
            <p className="font-work text-[11px] text-navy-400 leading-snug">{d.quando}</p>
          </div>
        ))}
      </div>
      <p className="font-work text-xs text-navy-400 max-w-prose pt-2">
        Regola pratica: stati → <code>base</code>. Comparsa/scomparsa o chrome legato allo
        scroll → <code>slow</code>. Reveal di contenuto lungo → <code>narrative</code>.
        Dettaglio completo in{" "}
        <code>DESIGN_SYSTEM.md §7</code>.
      </p>
    </div>
  ),
};
