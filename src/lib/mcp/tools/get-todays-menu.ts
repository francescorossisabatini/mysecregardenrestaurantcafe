import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { fetchWeeklyMenu, formatDay, pickToday } from "../menuSource";

export default defineTool({
  name: "get_todays_menu",
  title: "Today's menu",
  description:
    "Get today's daily dishes (soup, green and blue dish) at My Secret Garden in Vienna. Sunday is closed.",
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
      const today = menu ? pickToday(menu) : null;
      if (!today) {
        return {
          content: [
            {
              type: "text",
              text: "No daily menu for today. We are closed on Sundays and public holidays; the new weekly menu goes online on Monday morning.",
            },
          ],
        };
      }
      return {
        content: [{ type: "text", text: formatDay(today, lang) }],
        structuredContent: { day: today },
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Menu not available right now: ${(error as Error).message}` }],
        isError: true,
      };
    }
  },
});
