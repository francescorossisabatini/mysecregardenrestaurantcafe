import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ChefHat, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

const StaffHub = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { menu, isLoading: isMenuLoading, refresh } = useWeeklyMenu();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);

      if (!data.session?.user) {
        setIsChecking(false);
        return;
      }

      const { data: allowed } = await supabase.rpc("is_staff_user", {
        _user_id: data.session.user.id,
      });

      setIsStaff(allowed);
      setIsChecking(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (!isChecking && !session) return <Navigate to="/staff/login" replace />;

  if (!isChecking && session && !isStaff) {
    return (
      <div className="min-h-screen bg-section-soft px-4 py-12">
          <SEOHead title="Staff Hub" description="Restricted staff area." path="/staff" noindex />
        <main className="mx-auto max-w-xl rounded-lg border border-border/70 bg-card/90 p-6 text-center shadow-card">
          <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="font-cormorant text-3xl font-semibold text-foreground">Unauthorized access</h1>
          <p className="mt-3 font-work text-sm text-muted-foreground">This account is not enabled for staff access yet.</p>
          <Button onClick={signOut} className="mt-6">Sign out</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section-soft">
      <SEOHead title="Staff Hub" description="Current menu, ingredients and internal notes." path="/staff" noindex />
      <main className="container mx-auto px-4 py-8 md:py-10">
        <header className="mb-8 flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-primary">My Secret Garden</p>
            <h1 className="mt-2 font-cormorant text-4xl font-semibold text-foreground md:text-5xl">Staff Hub</h1>
            <p className="mt-2 font-work text-sm text-muted-foreground">Current menu, ingredients and internal notes.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>

        {error && <p className="mb-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 font-work text-sm text-destructive">{error}</p>}

        <section className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card">
            <ChefHat className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <p className="font-work text-sm text-muted-foreground">Menu days</p>
            <strong className="font-cormorant text-4xl text-foreground">{menu.days.length}</strong>
          </div>
        </section>

        <div className="grid gap-8">
          <aside className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <section className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-cormorant text-3xl font-semibold text-foreground">Dishes and ingredients</h2>
                <Button variant="outline" size="sm" onClick={refresh}>Sync</Button>
              </div>
              <div className="grid gap-4">
                {isMenuLoading ? <p className="font-work text-sm text-muted-foreground">Loading menu…</p> : menu.days.map((day) => (
                  <article key={day.day.de} className="rounded-md bg-background/70 p-4">
                    <h3 className="font-work text-xs font-semibold uppercase tracking-[0.1em] text-primary">{day.day.de}</h3>
                    {[
                      { label: "Soup", name: day.soup.en || day.soup.de, meta: day.soupMeta },
                      { label: "Green dish", name: day.green.de, meta: day.greenMeta },
                      { label: "Blue dish", name: day.blue.de, meta: day.blueMeta },
                    ].map((dish) => (
                      <div key={`${day.day.de}-${dish.label}`} className="mt-3 border-t border-border/60 pt-3">
                        <p className="font-work text-xs font-semibold text-muted-foreground">{dish.label}</p>
                        <p className="font-work text-sm font-medium text-foreground">{dish.name}</p>
                        {dish.meta?.ingredientsMain?.length ? <p className="mt-1 font-work text-xs text-muted-foreground">Ingredients: {dish.meta.ingredientsMain.join(", ")}</p> : null}
                        {dish.meta?.allergens?.length ? <p className="mt-1 font-work text-xs text-muted-foreground">Allergens: {dish.meta.allergens.join(", ")}</p> : null}
                      </div>
                    ))}
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:p-6">
              <h2 className="font-cormorant text-3xl font-semibold text-foreground">Cakes</h2>
              <p className="mt-2 font-work text-sm leading-relaxed text-muted-foreground">
                This section is ready for cake requests. We can activate it once products, minimum notice and order fields are defined.
              </p>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default StaffHub;
