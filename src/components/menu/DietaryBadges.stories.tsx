import type { Meta, StoryObj } from "@storybook/react-vite";
import { DietaryBadges } from "./DietaryBadges";

/**
 * Legge le etichette dal testo del piatto stesso (parseDietaryLabels), non da
 * flag separati — un piatto che dice "vegan" nel testo le mostra da solo.
 * Fino al 20/09/2026 c'era una classe CSS `lowercase` che minuscolizzava
 * anche "Zutaten" (sostantivo tedesco, va sempre maiuscolo) dentro "ohne
 * glutenhaltige Zutaten" — rimossa, le stringhe sorgente erano già corrette.
 * Prima di questo giro esistevano 3 implementazioni divergenti (Home, /menu
 * oggi, /menu settimana); questo è l'unico componente condiviso rimasto.
 */
const meta: Meta<typeof DietaryBadges> = {
  title: "Components/Dietary Badges",
  component: DietaryBadges,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Etichette dietetiche (vegan / ohne glutenhaltige Zutaten / bio) sotto un piatto, " +
          "derivate dal testo del piatto. Fonte di verità: src/components/menu/DietaryBadges.tsx, " +
          "usato sia da DishRow.tsx sia dalle card piatto di MenuSection.tsx e HomeMenuPreview.tsx.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DietaryBadges>;

export const Vegan: Story = {
  args: {
    text: "Korean Bowl, vegan. Reis, eingelegtes Gemüse, Sesam, Gochujang.",
    language: "de",
  },
};

export const VeganUndGlutenfrei: Story = {
  args: {
    text: "Indisches Dal, vegan, glutenfrei. Cremige rote Linsen mit indischen Gewürzen.",
    language: "de",
  },
};

export const AlleDrei: Story = {
  args: {
    text: "Secret Garden Salat mit Tofu, vegan, bio, glutenfrei.",
    language: "de",
  },
};

export const English: Story = {
  args: {
    text: "Secret Garden Salad with Tofu, vegan, bio, gluten free.",
    language: "en",
  },
};

export const KeineEtiketten: Story = {
  name: "Keine Etiketten (render null)",
  args: {
    text: "Schoko Mousse Torte. Luftige Schokoladenmousse-Torte.",
    language: "de",
  },
};
