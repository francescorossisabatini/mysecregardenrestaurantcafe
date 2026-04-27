import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response("Missing backend setup", { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const email = "stafftest@secretgardenrestaurant.at";
  const password = "Vacanza1!";

  const { data: usersData, error: listError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (listError) {
    return new Response(listError.message, { status: 500 });
  }

  const existing = usersData.users.find((user) => user.email?.toLowerCase() === email);
  const userResult = existing
    ? await admin.auth.admin.updateUserById(existing.id, {
        password,
        email_confirm: true,
        user_metadata: { username: "stafftest" },
      })
    : await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { username: "stafftest" },
      });

  if (userResult.error || !userResult.data.user) {
    return new Response(userResult.error?.message || "User setup failed", { status: 500 });
  }

  const { error: roleError } = await admin
    .from("user_roles")
    .upsert({ user_id: userResult.data.user.id, role: "staff" }, { onConflict: "user_id,role" });

  if (roleError) {
    return new Response(roleError.message, { status: 500 });
  }

  return Response.json({ ok: true });
});
