import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";

const meta: Meta = {
  title: "Components/Dialog",
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Details & Allergene</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Allergene</DialogTitle>
          <DialogDescription>
            Enthält Gluten, Sellerie. Keine Buchungsgarantie — wir melden uns bei dir.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};
