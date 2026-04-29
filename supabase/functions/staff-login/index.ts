import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const STAFF_USERNAME_EMAIL: Record<string, string> = {
  staffprova: "staffprova@secretgardenrestaurant.at",
  stafftest: "stafftest@secretgardenrestaurant.at",
};

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 8;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const normalizeUsername = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 80) : "";

const getClientKey = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("cf-connecting-ip") || "unknown";

const isRateLimited = (key: string) => {
  const now = Date.now();
  for (const [entryKey, value] of attempts) {
    if (value.resetAt <= now) attempts.delete(entryKey);
  }

  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_ATTEMPTS;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  if (isRateLimited(getClientKey(req))) {
    return json({ error: "Too many attempts. Please try again later." }, 429);
  }

  try {
    const body = await req.json().catch(() => null) as { username?: unknown; password?: unknown } | null;
    const username = normalizeUsername(body?.username);
    const password = typeof body?.password === "string" ? body.password : "";

    if (!username || password.length < 1 || password.length > 256) {
      return json({ error: "Access denied. Check your username and password." }, 400);
    }

    const email = STAFF_USERNAME_EMAIL[username];
    if (!email) {
      return json({ error: "Access denied. Check your username and password." }, 401);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      return json({ error: "Backend configuration missing" }, 500);
    }

    const authClient = createClient(supabaseUrl, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: signInData, error: signInError } = await authClient.auth.signInWithPassword({ email, password });
    if (signInError || !signInData.session || !signInData.user) {
      return json({ error: "Access denied. Check your username and password." }, 401);
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: roles, error: roleError } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", signInData.user.id)
      .in("role", ["admin", "staff"]);

    if (roleError || !roles?.length) {
      await authClient.auth.signOut();
      return json({ error: "Access denied. Check your username and password." }, 403);
    }

    return json({
      access_token: signInData.session.access_token,
      refresh_token: signInData.session.refresh_token,
      expires_at: signInData.session.expires_at,
    });
  } catch (_error) {
    return json({ error: "Unable to sign in right now." }, 500);
  }
});