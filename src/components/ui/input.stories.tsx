import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Dein Name", className: "w-64" },
};

export const Disabled: Story = {
  args: { placeholder: "Dein Name", className: "w-64", disabled: true },
};

export const WithValue: Story = {
  args: { defaultValue: "Francesco", className: "w-64" },
};
