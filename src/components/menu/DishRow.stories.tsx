import type { Meta, StoryObj } from "@storybook/react-vite";
import { DishRow } from "./DishRow";

const meta: Meta<typeof DishRow> = {
  title: "Components/Card",
  component: DishRow,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DishRow>;

export const Default: Story = {
  args: {
    name: "Kürbis-Curry",
    description: "Mit Kokosmilch, Reis und frischem Koriander.",
    price: "12,50 €",
    language: "de",
    dietary: { vegan: true, glutenFree: true },
  },
};

export const ConTuttiIBadgeDietary: Story = {
  args: {
    name: "Linsen-Eintopf",
    description: "Bio-Linsen, Wurzelgemüse, Kreuzkümmel.",
    price: "10,90 €",
    language: "de",
    dietary: { vegan: true, glutenFree: true, bio: true },
  },
};

export const Nuovo: Story = {
  args: {
    name: "Herbst-Salat",
    description: "Kürbis, Walnüsse, Feta, Granatapfel.",
    price: "9,50 €",
    language: "de",
    isNew: true,
    dietary: { vegan: false, glutenFree: true },
  },
};

export const NonDisponibile: Story = {
  args: {
    name: "Sommer-Gazpacho",
    description: "Nur in der Saison verfügbar.",
    language: "de",
    isUnavailable: true,
  },
};

export const ConEtichetta: Story = {
  args: {
    name: "Tagessuppe",
    description: "Wechselt täglich, frag an der Theke nach.",
    price: "6,50 €",
    language: "de",
    kicker: { label: "ZUPPA", tone: "blue" },
    dietary: { vegan: true },
  },
};
