import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Design System/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: "Anmerkungen zu deiner Anfrage", className: "w-80" },
};

export const Disabled: Story = {
  args: { placeholder: "Anmerkungen zu deiner Anfrage", className: "w-80", disabled: true },
};
