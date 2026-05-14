import React, { useState, lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MobileMenuProvider } from "@/contexts/MobileMenuContext";
import { useHtmlLang } from "@/hooks/useHtmlLang";
import { CookieConsent } from "@/components/CookieConsent";
import { InstallPrompt } from "@/components/InstallPrompt";
import { ScrollToTop } from "./components/ScrollToTop";

// Critical: Load Index immediately for fast FCP
import Index from "./pages/Index";

// Lazy load non-critical pages to reduce initial bundle
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Impressum = lazy(() => import("./pages/Impressum"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactPage = lazy(() => import("./pages/Contact"));
const LinkPage = lazy(() => import("./pages/Link"));
const MenuPage = lazy(() => import("./pages/Menu"));
const ReservationPreview = lazy(() => import("./pages/ReservationPreview"));
const StaffLogin = lazy(() => import("./pages/StaffLogin"));
const StaffKitchen = lazy(() => import("./pages/StaffKitchen"));
const GalleryPage = lazy(() => import("./pages/Gallery"));

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

    window._uxa?.push(["trackPageview", pagePath]);
  }, [location.pathname, location.search]);

  return null;
};


function AppContent() {
  useHtmlLang();

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
        if (location.pathname === "/" && index === 0) return;

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
    <BrowserRouter>
      <RouteAnalytics />
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<Suspense fallback={<PageLoader />}><AboutUs /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
        <Route path="/visit" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
        <Route path="/menu" element={<Suspense fallback={<PageLoader />}><MenuPage /></Suspense>} />
        <Route path="/gallery" element={<Suspense fallback={<PageLoader />}><GalleryPage /></Suspense>} />
        <Route path="/reservation-preview" element={<Suspense fallback={<PageLoader />}><ReservationPreview /></Suspense>} />
        <Route path="/staff/login" element={<Suspense fallback={<PageLoader />}><StaffLogin /></Suspense>} />
        <Route path="/staff" element={<Suspense fallback={<PageLoader />}><StaffKitchen /></Suspense>} />
        <Route path="/staff/kitchen" element={<Navigate to="/staff" replace />} />
        <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><Privacy /></Suspense>} />
        <Route path="/impressum" element={<Suspense fallback={<PageLoader />}><Impressum /></Suspense>} />
        <Route path="/wochenkarte" element={<Navigate to="/menu" replace />} />
        <Route path="/speisekarte" element={<Navigate to="/menu" replace />} />
        <Route path="/link" element={<Suspense fallback={<PageLoader />}><LinkPage /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Routes>
      <CookieConsent />
      <InstallPrompt />
    </BrowserRouter>
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
      <LanguageProvider>
        <MobileMenuProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </MobileMenuProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
