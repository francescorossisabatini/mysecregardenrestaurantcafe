import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Design System/Spacing & Shape",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

const SPACING = ["gap-4", "gap-8", "gap-12", "gap-16", "gap-20"];

export const Spacing: Story = {
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

export const Radius: Story = {
  render: () => (
    <div className="p-8 bg-cream-50 space-y-6">
      <h2 className="font-cormorant text-3xl mb-2 text-navy-500">Radius</h2>
      <p className="font-lora text-sm text-navy-400 max-w-prose mb-4">
        Solo due valori ammessi: <code>rounded-lg/md/sm</code> (tutti uguali,
        <code>--radius-base: 1rem</code>) per card e superfici, <code>rounded-full</code> per pill e
        controlli interattivi. Mai border-radius &lt; 8px su elementi interattivi.
      </p>
      <div className="flex flex-wrap items-end gap-8">
        <div className="text-center">
          <div className="h-20 w-20 rounded-lg bg-navy-300" />
          <p className="mt-2 font-work text-xs text-navy-400">rounded-lg — 1rem</p>
        </div>
        <div className="text-center">
          <div className="h-20 w-32 rounded-full bg-verde-300" />
          <p className="mt-2 font-work text-xs text-navy-400">rounded-full — pill</p>
        </div>
      </div>
    </div>
  ),
};

export const Shadow: Story = {
  render: () => (
    <div className="p-8 bg-cream-50 space-y-6">
      <h2 className="font-cormorant text-3xl mb-2 text-navy-500">Shadow</h2>
      <p className="font-lora text-sm text-navy-400 max-w-prose mb-4">
        Mai bordo e ombra sulla stessa superficie. Le superfici usano o l'uno o l'altra:
        <code>surface-card</code> (bordo, piano) oppure <code>shadow-soft</code>/<code>shadow-card</code> (ombra, overlay).
      </p>
      <div className="flex flex-wrap gap-8">
        <div className="rounded-lg border border-navy-100 bg-white p-6 font-work text-sm text-navy-500">
          surface-card — solo bordo
        </div>
        <div className="rounded-lg bg-white p-6 shadow-soft font-work text-sm text-navy-500">
          shadow-soft — solo ombra
        </div>
        <div className="rounded-lg bg-white p-6 shadow-card font-work text-sm text-navy-500">
          shadow-card — solo ombra
        </div>
      </div>
    </div>
  ),
};
