import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SHEET_ID_REGEX = /^[a-zA-Z0-9_-]{20,}$/;

function extractSheetId(input: string): string | null {
  const trimmed = (input || "").trim();
  if (!trimmed) return null;

  // Full URL?
  const urlMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (urlMatch) return urlMatch[1];

  // Strip any leftover path/query
  const cleaned = trimmed.split("?")[0].split("/")[0].trim();
  if (SHEET_ID_REGEX.test(cleaned)) return cleaned;

  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return new Response(
      JSON.stringify({ success: false, error: "Server not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Auth: derive user from bearer token
  const authHeader = req.headers.get("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData?.user) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  const userId = userData.user.id;

  // Service-role client for staff check + write
  const adminClient = createClient(supabaseUrl, serviceKey);

  const { data: isStaffData, error: staffErr } = await adminClient.rpc("is_staff_user", {
    _user_id: userId,
  });
  if (staffErr || !isStaffData) {
    return new Response(
      JSON.stringify({ success: false, error: "Forbidden" }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Parse body
  let body: { sheetId?: string } = {};
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const sheetId = extractSheetId(body.sheetId || "");
  if (!sheetId) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid Google Sheet ID or URL" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Upsert singleton row
  const now = new Date().toISOString();
  const { error: upsertErr } = await adminClient
    .from("menu_config")
    .upsert(
      {
        singleton: true,
        sheet_id: sheetId,
        loaded_at: now,
        loaded_by: userId,
      },
      { onConflict: "singleton" }
    );

  if (upsertErr) {
    console.error("menu_config upsert error:", upsertErr);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to save sheet ID" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, sheetId, loadedAt: now }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
