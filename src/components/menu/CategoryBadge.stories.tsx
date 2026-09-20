import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Non è un componente isolato nel codice, ed è vero solo in parte che vive in
 * DishRow.tsx: il prop `kicker` è dichiarato lì (con questi stessi 4 toni),
 * ma nessuna chiamata reale lo usa — i piatti "Klassiker" renderizzati con
 * DishRow non hanno categoria. Il pattern visivo che si vede davvero (Suppe/
 * Grünes/Blaues Gericht) è la stessa classe duplicata a mano in 4 punti:
 * HomeMenuPreview.tsx, MenuSection.tsx (×2) e il suo WeeklyDishRow interno —
 * lì solo 2 dei 4 toni sono in uso (accent, blue). Verificato 20/09/2026.
 */
const TONES: { tone: string; className: string; example: string }[] = [
  { tone: "accent", className: "text-accent", example: "GRÜN" },
  { tone: "blue", className: "text-blue", example: "ZUPPA" },
  { tone: "amber", className: "text-kicker-amber", example: "BLAU" },
  { tone: "muted", className: "text-muted-high-contrast", example: "SONSTIGES" },
];

const meta: Meta = {
  title: "Components/Category Badge",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Etichetta di categoria accanto al nome del piatto (Suppe/Grünes Gericht/Blaues " +
          "Gericht nel menu del giorno). Il prop `kicker` è dichiarato in DishRow.tsx ma non " +
          "usato da nessuna chiamata reale: il pattern vive duplicato in HomeMenuPreview.tsx " +
          "e MenuSection.tsx (2 punti + WeeklyDishRow), con solo i toni accent/blue in uso.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const AllTones: Story = {
  render: () => (
    <div className="p-8 bg-cream-50 flex flex-wrap gap-6">
      {TONES.map((t) => (
        <span
          key={t.tone}
          className={`font-work text-[10px] font-semibold uppercase tracking-[0.08em] ${t.className}`}
        >
          {t.example}
        </span>
      ))}
    </div>
  ),
};
