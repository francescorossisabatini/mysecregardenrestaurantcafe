import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Non è un componente isolato nel codice: è il prop `kicker` di DishRow.tsx
 * (etichetta di categoria — ZUPPA/VERDE/BLU nel menu del giorno). Questa
 * pagina documenta il pattern usando le stesse 4 classi definite in
 * DishRow.tsx `toneClass`, per tenerlo visibile senza aprire DishRow intero.
 * Se `toneClass` cambia in DishRow.tsx, va aggiornato anche qui a mano.
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
          "Etichetta di categoria sopra il nome del piatto (es. ZUPPA/VERDE/BLU nel menu del " +
          "giorno). Fonte di verità: prop `kicker` in src/components/menu/DishRow.tsx.",
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
