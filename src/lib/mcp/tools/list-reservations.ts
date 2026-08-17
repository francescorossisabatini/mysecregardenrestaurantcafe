import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_reservations",
  title: "List reservation requests",
  description:
    "List table reservation requests (Anfragen) for My Secret Garden. Staff access only. Filter by status or date range.",
  inputSchema: {
    status: z
      .enum(["new", "confirmed", "declined", "cancelled", "all"])
      .default("new")
      .describe("Filter by status. Use 'all' for every request."),
    from_date: z.string().optional().describe("Only requests on or after this date (YYYY-MM-DD)."),
    to_date: z.string().optional().describe("Only requests on or before this date (YYYY-MM-DD)."),
    limit: z.number().int().min(1).max(100).default(25).describe("Maximum number of requests to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, from_date, to_date, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("reservation_requests")
      .select(
        "id, full_name, contact, reservation_date, reservation_time, party_size, seating_area, notes, staff_notes, status, language, created_at",
      )
      .order("reservation_date", { ascending: true })
      .order("reservation_time", { ascending: true })
      .limit(limit ?? 25);

    if (status && status !== "all") query = query.eq("status", status);
    if (from_date) query = query.gte("reservation_date", from_date);
    if (to_date) query = query.lte("reservation_date", to_date);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data?.length) {
      return { content: [{ type: "text", text: "No reservation requests match these filters." }] };
    }

    const text = data
      .map(
        (r) =>
          `${r.reservation_date} ${String(r.reservation_time).slice(0, 5)} - ${r.full_name} (${r.party_size} pax, ${r.seating_area})\n  contact: ${r.contact}\n  status: ${r.status}${r.notes ? `\n  guest note: ${r.notes}` : ""}${r.staff_notes ? `\n  staff note: ${r.staff_notes}` : ""}\n  id: ${r.id}`,
      )
      .join("\n\n");

    return { content: [{ type: "text", text }], structuredContent: { reservations: data } };
  },
});
