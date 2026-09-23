import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const meta: Meta = {
  title: "Components/Select",
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Select defaultValue="24h">
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Vorlaufzeit wählen" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="24h">Mindestens 24h im Voraus</SelectItem>
        <SelectItem value="48h">Mindestens 48h im Voraus</SelectItem>
        <SelectItem value="72h">Mindestens 72h im Voraus</SelectItem>
      </SelectContent>
    </Select>
  ),
};
