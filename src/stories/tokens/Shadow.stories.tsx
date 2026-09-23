import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Tokens/Shadow",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

export const Values: Story = {
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
