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
          "Top bar + bottom nav mobile. Legge il pathname da react-router (qui su MemoryRouter, " +
          "sempre '/'), quindi il tab 'Home' risulta sempre attivo in questa preview.",
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
