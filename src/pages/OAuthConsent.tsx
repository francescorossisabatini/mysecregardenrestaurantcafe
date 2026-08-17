import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type AuthorizationDetails = {
  client?: { name?: string; redirect_uri?: string } | null;
  scope?: string | null;
  redirect_url?: string | null;
  redirect_to?: string | null;
};

type OAuthNamespace = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

// The auth.oauth namespace is still beta in supabase-js, so it is typed locally.
const oauth = () => (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/staff/login?next=" + encodeURIComponent(next);
        return;
      }
      if (active) setEmail(sess.session.user.email ?? null);

      const { data, error: detailsError } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (detailsError) {
        setError(detailsError.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error: decisionError } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (decisionError) {
      setBusy(false);
      setError(decisionError.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  };

  const clientName = details?.client?.name ?? "an app";

  return (
    <div className="min-h-screen bg-background px-4 py-16 font-work text-foreground" lang="en">
      <main className="mx-auto flex max-w-md flex-col justify-center">
        <section className="w-full rounded-md border border-border bg-card p-6 shadow-card md:p-8">
          {error ? (
            <>
              <h1 className="font-work text-2xl font-extrabold">Connection request failed</h1>
              <p className="mt-3 text-sm text-muted-foreground">{error}</p>
            </>
          ) : !details ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <>
              <h1 className="font-work text-2xl font-extrabold">
                Connect {clientName} to My Secret Garden
              </h1>
              {email && (
                <p className="mt-2 text-sm text-muted-foreground">Signed in as {email}</p>
              )}
              <p className="mt-4 text-sm leading-relaxed">
                {clientName} will be able to call this app&apos;s enabled tools while you are signed in.
              </p>
              {details.client?.redirect_uri && (
                <p className="mt-2 break-all text-xs text-muted-foreground">
                  Redirect: {details.client.redirect_uri}
                </p>
              )}
              {details.scope && (
                <p className="mt-2 text-xs text-muted-foreground">Requested access: {details.scope}</p>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                This does not bypass this app&apos;s permissions or backend policies.
              </p>
              <div className="mt-8 flex gap-3">
                <Button disabled={busy} onClick={() => decide(true)} className="flex-1">
                  Approve
                </Button>
                <Button
                  disabled={busy}
                  variant="outline"
                  onClick={() => decide(false)}
                  className="flex-1"
                >
                  Cancel connection
                </Button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default OAuthConsent;
