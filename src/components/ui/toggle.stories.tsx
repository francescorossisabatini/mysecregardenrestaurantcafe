import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./toggle";

const meta: Meta<typeof Toggle> = {
  title: "Design System/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = { args: { children: "vegan" } };
export const Pressed: Story = { args: { children: "vegan", defaultPressed: true } };
