import React, { useState, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MobileMenuProvider } from "@/contexts/MobileMenuContext";
import { useHtmlLang } from "@/hooks/useHtmlLang";
import { useFocusMainOnRouteChange } from "@/hooks/useFocusMainOnRouteChange";
import { CookieConsent } from "@/components/CookieConsent";
import { InstallPrompt } from "@/components/InstallPrompt";
import { ScrollToTop } from "./components/ScrollToTop";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
import { attachTelClickTracking } from "@/lib/trackTelClicks";
import { stripLanguagePrefix } from "@/lib/i18nRoutes";

// Critical: Load Index immediately for fast FCP
import Index from "./pages/Index";

// Lazy load non-critical pages to reduce initial bundle
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const Privacy = lazyWithRetry(() => import("./pages/Privacy"));
const Impressum = lazyWithRetry(() => import("./pages/Impressum"));
const AboutUs = lazyWithRetry(() => import("./pages/AboutUs"));
const ContactPage = lazyWithRetry(() => import("./pages/Contact"));
const LinkPage = lazyWithRetry(() => import("./pages/Link"));
const MenuPage = lazyWithRetry(() => import("./pages/Menu"));
const Login = lazyWithRetry(() => import("./pages/Login"));
const GalleryPage = lazyWithRetry(() => import("./pages/Gallery"));
const OAuthConsent = lazyWithRetry(() => import("./pages/OAuthConsent"));


// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-muted-foreground text-sm font-work">Loading...</p>
    </div>
  </div>
);

const RouteAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;
    const pageLocation = `${window.location.origin}${pagePath}`;

    window.gtag?.("event", "page_view", {
      page_path: pagePath,
      page_location: pageLocation,
      page_title: document.title,
    });

  }, [location.pathname, location.search]);

  return null;
};


function AppContent() {
  useHtmlLang();
  useFocusMainOnRouteChange();

  return <AppRoutes />;
}

// Stesse pagine in due lingue: tedesco alla radice, inglese sotto /en.
// La lingua la decide l'URL (src/lib/i18nRoutes.ts). /login e le pagine
// tecniche esistono solo una volta.
const withLoader = (node: React.ReactNode) => <Suspense fallback={<PageLoader />}>{node}</Suspense>;

const localizedPages: { path: string; element: React.ReactNode }[] = [
  { path: "", element: <Index /> },
  { path: "about", element: withLoader(<AboutUs />) },
  { path: "visit", element: withLoader(<ContactPage />) },
  { path: "menu", element: withLoader(<MenuPage />) },
  { path: "gallery", element: withLoader(<GalleryPage />) },
  { path: "privacy", element: withLoader(<Privacy />) },
  { path: "impressum", element: withLoader(<Impressum />) },
  { path: "link", element: withLoader(<LinkPage />) },
];

// Vecchi indirizzi ancora linkati da fuori (TripAdvisor usa /speisekarte/).
const legacyRedirects: { from: string; to: string }[] = [
  { from: "contact", to: "visit" },
  { from: "wochenkarte", to: "menu" },
  { from: "speisekarte", to: "menu" },
];

const LANGUAGE_BASES = ["", "/en"] as const;

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPct = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPct >= 50 && !window._tracked50) {
        window._tracked50 = true;
        window.gtag?.('event', 'scroll_depth', { event_category: 'engagement', event_label: '50_percent' });
      }
      if (scrollPct >= 90 && !window._tracked90) {
        window._tracked90 = true;
        window.gtag?.('event', 'scroll_depth', { event_category: 'engagement', event_label: '90_percent' });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => attachTelClickTracking(), []);

  useEffect(() => {
    if (!("matchMedia" in window)) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window) || !("MutationObserver" in window)) return;
    const observed = new WeakSet<Element>();
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    const scanSections = () => {
      const sections = Array.from(document.querySelectorAll("section"));
      sections.forEach((section, index) => {
        if (observed.has(section)) return;
        if (stripLanguagePrefix(location.pathname) === "/" && index === 0) return;

        section.classList.add("section-animate");
        observed.add(section);

        if (section.getBoundingClientRect().top < window.innerHeight * 0.9) {
          section.classList.add("in-view");
        } else {
          revealObserver.observe(section);
        }
      });
    };

    scanSections();
    const mutationObserver = new MutationObserver(scanSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <RouteAnalytics />
      <ScrollToTop />
      
      <Routes>
        {LANGUAGE_BASES.flatMap((base) => [
          ...localizedPages.map(({ path, element }) => (
            <Route key={`${base}/${path}`} path={`${base}/${path}`} element={element} />
          )),
          ...legacyRedirects.map(({ from, to }) => (
            <Route key={`${base}/${from}`} path={`${base}/${from}`} element={<Navigate to={`${base}/${to}`} replace />} />
          )),
        ])}
        <Route path="/login" element={withLoader(<Login />)} />
        <Route path="/.lovable/oauth/consent" element={withLoader(<OAuthConsent />)} />
        <Route path="*" element={withLoader(<NotFound />)} />
      </Routes>
      <CookieConsent />
      <InstallPrompt />
    </>
  );
}

function App() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {/* Il router sta fuori dal LanguageProvider: la lingua si legge dall'URL. */}
      <BrowserRouter>
        <LanguageProvider>
          <MobileMenuProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppContent />
            </TooltipProvider>
          </MobileMenuProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
