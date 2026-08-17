import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { klassikerMenu, type KlassikerItem } from "@/data/klassikerData";

function formatItem(item: KlassikerItem, lang: "de" | "en"): string {
  const flags = [
    item.isVegan ? "vegan" : null,
    item.isGlutenFree ? "gluten-free" : null,
    item.isBio ? "bio" : null,
  ].filter(Boolean);
  const desc = item.description?.[lang];
  return `- ${item.name[lang]} — ${item.price} €${flags.length ? ` [${flags.join(", ")}]` : ""}${
    desc ? `\n    ${desc}` : ""
  }`;
}

export default defineTool({
  name: "get_classics_menu",
  title: "Classics, cakes and drinks",
  description:
    "Get the permanent menu of My Secret Garden: warm dishes, salads, cakes and drinks that are available almost every day.",
  inputSchema: {
    language: z.enum(["de", "en"]).default("de").describe("Language of the menu: German (de) or English (en)."),
    category: z
      .string()
      .optional()
      .describe("Optional category filter, e.g. 'salate', 'kuchen', 'getraenke', 'warm'. Omit for the full menu."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ language, category }) => {
    const lang = language ?? "de";
    const needle = category?.trim().toLowerCase();
    const categories = klassikerMenu.categories.filter((cat) => {
      if (!needle) return true;
      return (
        cat.id.toLowerCase().includes(needle) ||
        cat.name.de.toLowerCase().includes(needle) ||
        cat.name.en.toLowerCase().includes(needle)
      );
    });

    if (categories.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No category matches "${category}". Available: ${klassikerMenu.categories
              .map((c) => c.id)
              .join(", ")}.`,
          },
        ],
        isError: true,
      };
    }

    const blocks = categories.map((cat) => {
      const direct = (cat.items ?? []).map((i) => formatItem(i, lang));
      const subs = (cat.subcategories ?? []).map((sub) =>
        [`  ${sub.name[lang]}${sub.sizeNote ? ` (${sub.sizeNote})` : ""}`, ...sub.items.map((i) => `  ${formatItem(i, lang)}`)].join("\n"),
      );
      return [`${cat.name[lang]}`, ...direct, ...subs].join("\n");
    });

    return {
      content: [{ type: "text", text: [klassikerMenu.title[lang], "", ...blocks].join("\n\n") }],
      structuredContent: { categories },
    };
  },
});
