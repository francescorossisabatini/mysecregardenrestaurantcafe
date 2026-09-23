import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Tokens/Colors",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

const SWATCHES: { name: string; className: string; hex: string }[] = [
  { name: "cream-50", className: "bg-cream-50", hex: "#FDFAF5" },
  { name: "cream-100", className: "bg-cream-100", hex: "#F5F0E8" },
  { name: "cream-200", className: "bg-cream-200", hex: "#EDE6D8" },
  { name: "cream-300", className: "bg-cream-300", hex: "#E2D9C8" },
  { name: "navy-100", className: "bg-navy-100", hex: "#7A90C8" },
  { name: "navy-200", className: "bg-navy-200", hex: "#4A6EA8" },
  { name: "navy-300", className: "bg-navy-300", hex: "#264195" },
  { name: "navy-400", className: "bg-navy-400", hex: "#1A2E6B" },
  { name: "navy-500", className: "bg-navy-500", hex: "#111E45" },
  { name: "verde-100", className: "bg-verde-100", hex: "#B8C4A0" },
  { name: "verde-200", className: "bg-verde-200", hex: "#7FA060 (mai come testo)" },
  { name: "verde-300", className: "bg-verde-300", hex: "#5A7A2E" },
  { name: "verde-400", className: "bg-verde-400", hex: "#3B5220" },
  { name: "verde-500", className: "bg-verde-500", hex: "#273816" },
];

export const Palette: Story = {
  render: () => (
    <div className="p-8 bg-cream-50">
      <h2 className="font-cormorant text-3xl mb-2 text-navy-500">Palette primitiva</h2>
      <p className="font-lora text-sm text-navy-400 mb-6">
        Dosaggio: 60% cream / 30% navy / 10% verde (solo CTA, nav attivo, rating, accenti).
        Nei componenti si usano solo i token semantici — questa vista mostra i primitivi.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {SWATCHES.map((s) => (
          <div key={s.name} className="rounded-lg overflow-hidden border border-navy-100">
            <div className={`h-20 ${s.className}`} />
            <div className="p-2 font-work text-xs">
              <div className="font-semibold">{s.name}</div>
              <div className="text-navy-400">{s.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
