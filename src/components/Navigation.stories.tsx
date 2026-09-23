import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navigation } from "./Navigation";

const meta: Meta<typeof Navigation> = {
  title: "Sections/Navigation",
  component: Navigation,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Solo la top bar (hamburger + logo + language switch) — non ha una bottom nav propria. " +
          "I due bottoni fissi in basso (Anrufen/Besuchen) sono MobileStickyBar, un componente " +
          "separato in src/components/MobileStickyBar.tsx (spec in DESIGN_SYSTEM.md §6), senza " +
          "story propria: si mostra solo dopo scrollY > 300px e consenso cookie accettato, stati " +
          "che una preview statica non riproduce in modo affidabile. Legge il pathname da " +
          "react-router (qui su MemoryRouter, sempre '/'), quindi il link 'Home' risulta sempre " +
          "attivo in questa preview.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  render: () => (
    <div className="h-[420px] bg-cream-50">
      <Navigation />
    </div>
  ),
};
