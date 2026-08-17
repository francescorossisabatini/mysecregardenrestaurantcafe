import { defineMcp } from "@lovable.dev/mcp-js";
import getTodaysMenu from "./tools/get-todays-menu";
import getWeeklyMenu from "./tools/get-weekly-menu";
import getClassicsMenu from "./tools/get-classics-menu";
import getVisitInfo from "./tools/get-visit-info";

export default defineMcp({
  name: "secret-garden-vegan",
  title: "Secret Garden Vegan",
  version: "0.1.0",
  instructions:
    "Public tools for My Secret Garden, a vegetarian and vegan cafe restaurant in Vienna (Mariahilferstraße 45, Im Raimundhof). Use get_todays_menu for today's dishes, get_weekly_menu for the whole week, get_classics_menu for the permanent dishes, cakes and drinks, and get_visit_info for address, opening hours and directions.",
  tools: [getTodaysMenu, getWeeklyMenu, getClassicsMenu, getVisitInfo],
});
