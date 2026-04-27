import { FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LockKeyhole, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

const STAFF_USERNAME_EMAIL: Record<string, string> = {
  staffprova: "staffprova@secretgardenrestaurant.at",
  stafftest: "stafftest@secretgardenrestaurant.at",
};

const StaffLogin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsChecking(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const email = STAFF_USERNAME_EMAIL[username.trim().toLowerCase()];
    if (!email) {
      setIsSubmitting(false);
      setError("Access denied. Check your username and password.");
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);

    if (loginError) {
      setError("Access denied. Check your username and password.");
      return;
    }

    navigate("/staff", { replace: true });
  };

  if (!isChecking && session) return <Navigate to="/staff" replace />;

  return (
    <div className="min-h-screen bg-section-soft px-4 py-12">
      <SEOHead title="Staff Login" description="Restricted staff access for My Secret Garden." path="/staff/login" noindex />
      <main className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <section className="w-full rounded-lg border border-border/70 bg-card/90 p-6 shadow-card md:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LockKeyhole className="h-5 w-5" aria-hidden="true" />
            </div>
            <h1 className="font-cormorant text-4xl font-semibold text-foreground">Staff Hub</h1>
            <p className="mt-2 font-work text-sm leading-relaxed text-muted-foreground">
              Restricted access for the team.
            </p>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 font-work text-sm text-foreground">
              Username
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  autoComplete="username"
                  className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </label>
            <label className="grid gap-2 font-work text-sm text-foreground">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <Button type="submit" disabled={isSubmitting} className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
            {error && <p className="font-work text-sm text-destructive">{error}</p>}
          </form>
        </section>
      </main>
    </div>
  );
};

export default StaffLogin;
