import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Tokens/Spacing",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

const SPACING = ["gap-4", "gap-8", "gap-12", "gap-16", "gap-20"];

export const Scale: Story = {
  render: () => (
    <div className="p-8 bg-cream-50 space-y-6">
      <h2 className="font-cormorant text-3xl mb-2 text-navy-500">Spacing</h2>
      <p className="font-lora text-sm text-navy-400 max-w-prose">
        Nessun token custom: scala Tailwind di default. La regola del progetto è
        abbracciare il whitespace — <code>gap-16</code>, <code>py-20</code> e oltre,
        mai densità stretta.
      </p>
      {SPACING.map((cls) => (
        <div key={cls} className="flex items-center gap-4">
          <span className="w-20 font-work text-xs text-navy-400">{cls}</span>
          <div className={`flex ${cls}`}>
            <div className="h-8 w-8 bg-verde-300 rounded-lg" />
            <div className="h-8 w-8 bg-verde-300 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  ),
};
