import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Tokens/Typography",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => (
    <div className="p-8 bg-cream-50 space-y-6">
      <div>
        <p className="font-work text-xs uppercase tracking-[0.22em] text-navy-400 mb-1">
          font-caveat — solo h1 hero e logo, max 1 occorrenza per viewport
        </p>
        <p className="font-caveat text-6xl text-navy-500">My Secret Garden</p>
      </div>
      <div>
        <p className="font-work text-xs uppercase tracking-[0.22em] text-navy-400 mb-1">
          font-cormorant — headings (h2-h6)
        </p>
        <p className="font-cormorant text-4xl text-navy-500">Was heute auf den Tisch kommt.</p>
      </div>
      <div>
        <p className="font-work text-xs uppercase tracking-[0.22em] text-navy-400 mb-1">
          font-lora — body
        </p>
        <p className="font-lora text-body text-navy-500 max-w-prose">
          Vegetarisch. Vegan. Versteckt im Herzen Wiens. Keine Eile. Dieser Ort ist gemacht
          zum Verweilen.
        </p>
      </div>
      <div>
        <p className="font-work text-xs uppercase tracking-[0.22em] text-navy-400 mb-1">
          font-work — UI (bottoni, label, eyebrow)
        </p>
        <p className="font-work text-sm font-medium text-navy-500">Tisch anfragen</p>
      </div>
    </div>
  ),
};
