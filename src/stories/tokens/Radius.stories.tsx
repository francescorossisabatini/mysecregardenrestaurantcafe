import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Tokens/Radius",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

export const Values: Story = {
  render: () => (
    <div className="p-8 bg-cream-50 space-y-6">
      <h2 className="font-cormorant text-3xl mb-2 text-navy-500">Radius</h2>
      <p className="font-lora text-sm text-navy-400 max-w-prose mb-4">
        Solo due valori ammessi: <code>rounded-lg</code> (= <code>md</code>, <code>sm</code>,
        tutti uguali a <code>--radius-base: 1rem</code>) per card e superfici, <code>rounded-full</code> per
        pill e controlli interattivi. Mai border-radius &lt; 8px su elementi interattivi.
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
