import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_reservation",
  title: "Update a reservation request",
  description:
    "Confirm, decline or cancel a reservation request (Anfrage) and optionally add an internal staff note. Staff access only.",
  inputSchema: {
    id: z.string().uuid().describe("The reservation request id, as returned by list_reservations."),
    status: z
      .enum(["new", "confirmed", "declined", "cancelled"])
      .optional()
      .describe("New status for the request."),
    staff_notes: z.string().max(1000).optional().describe("Internal note visible only to staff."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, status, staff_notes }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    if (!status && staff_notes === undefined) {
      return {
        content: [{ type: "text", text: "Nothing to update: provide status and/or staff_notes." }],
        isError: true,
      };
    }

    const patch: Record<string, unknown> = {};
    if (status) patch.status = status;
    if (staff_notes !== undefined) patch.staff_notes = staff_notes;

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("reservation_requests")
      .update(patch)
      .eq("id", id)
      .select("id, full_name, reservation_date, reservation_time, party_size, status, staff_notes")
      .maybeSingle();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) {
      return {
        content: [{ type: "text", text: "No reservation was updated. Check the id and your staff permissions." }],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Updated: ${data.reservation_date} ${String(data.reservation_time).slice(0, 5)} - ${data.full_name} (${data.party_size} pax) is now "${data.status}".${data.staff_notes ? ` Staff note: ${data.staff_notes}` : ""}`,
        },
      ],
      structuredContent: { reservation: data },
    };
  },
});
