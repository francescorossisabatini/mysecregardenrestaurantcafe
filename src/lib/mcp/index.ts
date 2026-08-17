import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getTodaysMenu from "./tools/get-todays-menu";
import getWeeklyMenu from "./tools/get-weekly-menu";
import getClassicsMenu from "./tools/get-classics-menu";
import getVisitInfo from "./tools/get-visit-info";

// Direct Supabase host is required as OAuth issuer (never the proxy URL).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "secret-garden-vegan",
  title: "Secret Garden Vegan",
  version: "0.1.0",
  instructions:
    "Public tools for My Secret Garden, a vegetarian and vegan cafe restaurant in Vienna (Mariahilferstraße 45, Im Raimundhof). Use get_todays_menu for today's dishes, get_weekly_menu for the whole week, get_classics_menu for the permanent dishes, cakes and drinks, and get_visit_info for address, opening hours and directions.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getTodaysMenu, getWeeklyMenu, getClassicsMenu, getVisitInfo],
});
