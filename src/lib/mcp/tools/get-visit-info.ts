import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

// Kept inline (not imported from src/config/site.ts) so this tool stays
// dependency-free and import-safe inside the bundled edge function.
const INFO = {
  name: "My Secret Garden",
  address: "Mariahilferstraße 45, Im Raimundhof, 1060 Wien, Austria",
  phone: "+43 1 586 28 39",
  hours: "Monday to Saturday 11:00-19:00. Sunday and public holidays closed.",
  website: "https://secretgardenrestaurant.at",
  de: {
    finding:
      "Wir liegen im Innenhof des Raimundhofs. Vom Gehsteig durch den Torbogen, dann links. Der Garten öffnet sich hinter der Einfahrt.",
    service: "Du bestellst direkt am Tresen, suchst dir deinen Platz und wir bringen dir das Essen.",
    transport: "U-Bahn: U3 Neubaugasse, 2 Gehminuten. Parken: Wipark Windmühlgasse 22-24, erste Stunde geschenkt.",
    kitchen: "Vegetarische und vegane Küche, viele glutenfreie Gerichte, bio und saisonal.",
  },
  en: {
    finding:
      "We are in the courtyard of Raimundhof. From the street, walk through the archway and turn left; the garden opens up behind the entrance.",
    service: "Order at the counter, pick your seat, and we bring the food to you.",
    transport: "Metro U3 Neubaugasse, 2 minutes on foot. Parking: Wipark Windmühlgasse 22-24, first hour on us.",
    kitchen: "Vegetarian and vegan kitchen, many gluten-free dishes, organic and seasonal.",
  },
} as const;

function openNow(): { open: boolean; note: string } {
  const vienna = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Vienna" }));
  const day = vienna.getDay();
  const minutes = vienna.getHours() * 60 + vienna.getMinutes();
  const open = day !== 0 && minutes >= 11 * 60 && minutes < 19 * 60;
  return {
    open,
    note: open ? "Open right now (Vienna time)." : "Closed right now (Vienna time).",
  };
}

export default defineTool({
  name: "get_visit_info",
  title: "Visit info",
  description:
    "Get address, opening hours, current open/closed status, phone number and directions for My Secret Garden, a vegetarian and vegan restaurant in Vienna.",
  inputSchema: {
    language: z.enum(["de", "en"]).default("de").describe("Language of the notes: German (de) or English (en)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ language }) => {
    const lang = language ?? "de";
    const status = openNow();
    const localized = INFO[lang];
    const text = [
      INFO.name,
      INFO.address,
      `Phone: ${INFO.phone}`,
      `Hours: ${INFO.hours}`,
      status.note,
      localized.kitchen,
      localized.finding,
      localized.service,
      localized.transport,
      INFO.website,
    ].join("\n");
    return {
      content: [{ type: "text", text }],
      structuredContent: {
        name: INFO.name,
        address: INFO.address,
        phone: INFO.phone,
        hours: INFO.hours,
        openNow: status.open,
        website: INFO.website,
      },
    };
  },
});
