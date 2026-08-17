import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { fetchWeeklyMenu, formatDay } from "../menuSource";

export default defineTool({
  name: "get_weekly_menu",
  title: "Weekly menu",
  description:
    "Get the current weekly changing menu (soup, green and blue dish per day) of My Secret Garden in Vienna.",
  inputSchema: {
    language: z
      .enum(["de", "en"])
      .default("de")
      .describe("Language of the dish names: German (de) or English (en)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ language }) => {
    const lang = language ?? "de";
    try {
      const menu = await fetchWeeklyMenu();
      if (!menu) {
        return {
          content: [
            { type: "text", text: "The weekly menu is not published right now. Come visit us or call +43 1 586 28 39." },
          ],
        };
      }
      const text = [`Weekly menu (${menu.period})`, ...menu.days.map((d) => formatDay(d, lang))].join("\n\n");
      return { content: [{ type: "text", text }], structuredContent: { period: menu.period, days: menu.days } };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Menu not available right now: ${(error as Error).message}` }],
        isError: true,
      };
    }
  },
});
