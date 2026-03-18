import React, { useState, lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MobileMenuProvider } from "@/contexts/MobileMenuContext";
import { useHtmlLang } from "@/hooks/useHtmlLang";
import { CookieConsent } from "@/components/CookieConsent";
import { ScrollToTop } from "./components/ScrollToTop";

// Critical: Load Index immediately for fast FCP
import Index from "./pages/Index";

// Lazy load non-critical pages to reduce initial bundle
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Impressum = lazy(() => import("./pages/Impressum"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactPage = lazy(() => import("./pages/Contact"));
const WeeklySpecials = lazy(() => import("./pages/WeeklySpecials"));
const LinkPage = lazy(() => import("./pages/Link"));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-muted-foreground text-sm font-work">Loading...</p>
    </div>
  </div>
);


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

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<Suspense fallback={<PageLoader />}><AboutUs /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
        <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><Privacy /></Suspense>} />
        <Route path="/impressum" element={<Suspense fallback={<PageLoader />}><Impressum /></Suspense>} />
        <Route path="/wochenkarte" element={<Suspense fallback={<PageLoader />}><WeeklySpecials /></Suspense>} />
        <Route path="/speisekarte" element={<Suspense fallback={<PageLoader />}><WeeklySpecials /></Suspense>} />
        <Route path="/link" element={<Suspense fallback={<PageLoader />}><LinkPage /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Routes>
      <CookieConsent />
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
