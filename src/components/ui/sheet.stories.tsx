import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Button } from "./button";

const meta: Meta = {
  title: "Components/Sheet",
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Menü öffnen</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Secret Garden</SheetTitle>
          <SheetDescription>Vegetarisch. Vegan. Versteckt im Herzen Wiens.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
