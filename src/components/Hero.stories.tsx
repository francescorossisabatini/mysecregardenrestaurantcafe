import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hero } from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Fascia d'ingresso, non hero a schermo pieno. Rating e stato aperto/chiuso vengono " +
          "da SITE e da un hook che legge il menu del giorno — in questa preview lo stato " +
          "aperto/chiuso riflette l'orario reale al momento in cui apri la pagina.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {};
