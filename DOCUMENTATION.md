# 📜 My Secret Garden - Documentazione Tecnica Completa

> Questo documento contiene tutte le informazioni necessarie per ricostruire il sito web "My Secret Garden" da zero.

---

## 📑 Indice

1. [Panoramica Progetto](#1-panoramica-progetto)
2. [Sistema di Design](#2-sistema-di-design)
3. [Sistema Multilingua](#3-sistema-multilingua)
4. [Architettura Menu Dinamico](#4-architettura-menu-dinamico)
5. [Sistema Festività e Chiusure](#5-sistema-festività-e-chiusure)
6. [Componenti Principali](#6-componenti-principali)
7. [Pagine Secondarie](#7-pagine-secondarie)
8. [Sicurezza Implementata](#8-sicurezza-implementata)
9. [Configurazione Ambiente](#9-configurazione-ambiente)
10. [Checklist Implementazione](#10-checklist-implementazione)

---

## 1. Panoramica Progetto

### 1.1 Stack Tecnologico

| Tecnologia | Versione | Scopo |
|------------|----------|-------|
| React | ^18.3.1 | Framework UI |
| Vite | Latest | Build tool e dev server |
| TypeScript | Latest | Type safety |
| Tailwind CSS | Latest | Styling utility-first |
| shadcn/ui | Latest | Componenti UI |
| Lovable Cloud | - | Backend (Supabase) |
| React Router | ^6.30.1 | Routing |
| TanStack Query | ^5.83.0 | Data fetching |
| Embla Carousel | ^8.6.0 | Carousel hero |

### 1.2 Struttura Cartelle

```
src/
├── assets/                    # Immagini e risorse statiche
│   ├── hero-food.jpg
│   ├── hero-garden.jpg
│   ├── hero-interior.jpg
│   ├── sri-chinmoy-*.jpg     # Immagini artista spirituale
│   ├── *-bowl.jpg            # Foto piatti
│   └── logo-secret-garden.png
├── components/
│   ├── ui/                   # Componenti shadcn/ui
│   ├── Hero.tsx              # Carousel hero
│   ├── Navigation.tsx        # Navbar responsive
│   ├── MenuSection.tsx       # Sezione menu completa
│   ├── DailyMenuCard.tsx     # Card menu giornaliero
│   ├── WeeklyMenuDialog.tsx  # Accordion menu settimanale
│   ├── GallerySection.tsx    # Galleria immagini
│   ├── Reviews.tsx           # Recensioni Google
│   ├── Footer.tsx            # Footer con info
│   ├── FloatingCallButton.tsx # Bottone chiamata mobile
│   └── ...
├── contexts/
│   └── LanguageContext.tsx   # Contesto multilingua DE/EN
├── data/
│   ├── menuData.ts           # Dati statici menu fallback
│   ├── klassikerData.ts      # Menu classici fissi
│   ├── holidaysData.ts       # Festività e chiusure
│   └── productData.ts        # Prodotti in vendita
├── hooks/
│   ├── useWeeklyMenu.ts      # Hook menu dinamico
│   ├── useScrollReveal.ts    # Animazioni scroll
│   └── use-mobile.tsx        # Rilevamento mobile
├── pages/
│   ├── Index.tsx             # Home page
│   ├── AboutUs.tsx           # Chi siamo
│   ├── Inspiration.tsx       # Ispirazione spirituale
│   ├── Contact.tsx           # Contatti
│   ├── Privacy.tsx           # Privacy policy
│   └── Impressum.tsx         # Impressum
├── services/
│   └── googleSheetsService.ts # Servizio fetch menu
├── config/
│   ├── googleSheets.ts       # Configurazione sheets
│   └── site.ts               # ✅ Configurazione centralizzata sito
├── lib/
│   └── openStatus.ts         # ✅ Helper stato aperto/chiuso
└── integrations/
    └── supabase/
        ├── client.ts         # Client Supabase (auto-generato)
        └── types.ts          # Tipi DB (auto-generato)

supabase/
└── functions/
    └── get-daily-menu/
        └── index.ts          # Edge function menu
```

### 1.3 Dipendenze Principali

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1",
    "@tanstack/react-query": "^5.83.0",
    "@supabase/supabase-js": "^2.87.1",
    "embla-carousel-react": "^8.6.0",
    "embla-carousel-autoplay": "^8.6.0",
    "lucide-react": "^0.462.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "date-fns": "^3.6.0",
    "sonner": "^1.7.4",
    "zod": "^3.25.76"
  }
}
```

---

## 2. Sistema di Design

### 2.1 Filosofia del Brand

> **"Botanico e spiritualmente ispirato"** - Riflette la filosofia di Sri Chinmoy di pace e semplicità.

Elementi chiave:
- Natura e botanica
- Spiritualità sottile (non religiosa)
- Calma e contemplazione
- Semplicità ed eleganza

### 2.2 Font

Aggiungi in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
```

| Font | Uso | Classe Tailwind |
|------|-----|-----------------|
| Caveat | Titoli, quote handwritten | `font-caveat` |
| Cormorant Garamond | Titoli eleganti | `font-cormorant` |
| Lora | Testo corpo | `font-lora` |
| Work Sans | UI, navigazione | `font-sans` |

Configurazione `tailwind.config.ts`:

```typescript
fontFamily: {
  sans: ['Work Sans', 'sans-serif'],
  serif: ['Lora', 'Georgia', 'serif'],
  caveat: ['Caveat', 'cursive'],
  cormorant: ['Cormorant Garamond', 'serif'],
  lora: ['Lora', 'serif'],
},
```

### 2.3 Palette Colori

Tutti i colori sono in formato **HSL** per flessibilità.

#### Light Mode (Default)

```css
:root {
  /* Background e Foreground */
  --background: 45 33% 94%;           /* Crema caldo #F5F1E3 */
  --foreground: 30 8% 12%;            /* Quasi nero #1E1C1A */
  
  /* Colori Primari */
  --primary: 91 37% 47%;              /* Verde botanico #74A84B */
  --primary-foreground: 45 33% 96%;   /* Testo su primario */
  --primary-glow: 91 45% 60%;         /* Verde chiaro glow */
  
  /* Colori Accento */
  --accent: 91 30% 85%;               /* Verde pallido */
  --accent-foreground: 91 37% 30%;    /* Testo su accento */
  
  /* Blu Spirituale */
  --blue: 226 47% 26%;                /* Blu profondo #243260 */
  --blue-light: 226 40% 40%;          /* Blu più chiaro */
  
  /* Stati UI */
  --muted: 45 20% 88%;
  --muted-foreground: 30 8% 40%;
  --border: 45 20% 82%;
  --ring: 91 37% 47%;
  
  /* Componenti */
  --card: 45 33% 96%;
  --card-foreground: 30 8% 12%;
  --popover: 45 33% 98%;
  --popover-foreground: 30 8% 12%;
  
  /* Semantici */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
}
```

#### Dark Mode

```css
.dark {
  --background: 30 15% 8%;            /* Quasi nero caldo */
  --foreground: 45 20% 92%;           /* Crema chiaro */
  
  --primary: 91 45% 55%;              /* Verde più brillante */
  --primary-foreground: 30 15% 8%;
  
  --blue: 226 50% 45%;                /* Blu più luminoso */
  
  --card: 30 12% 12%;
  --card-foreground: 45 20% 92%;
  
  --muted: 30 10% 18%;
  --muted-foreground: 45 15% 65%;
  --border: 30 10% 20%;
}
```

### 2.4 Gradienti

```css
:root {
  --gradient-primary: linear-gradient(
    135deg, 
    hsl(91 37% 47%), 
    hsl(91 45% 60%)
  );
  
  --gradient-hero: linear-gradient(
    to bottom,
    transparent 0%,
    hsl(30 8% 12% / 0.3) 50%,
    hsl(30 8% 12% / 0.7) 100%
  );
  
  --gradient-card: linear-gradient(
    180deg,
    hsl(45 33% 96%),
    hsl(45 30% 92%)
  );
}
```

### 2.5 Ombre

```css
:root {
  --shadow-soft: 0 4px 20px -4px hsl(30 8% 12% / 0.08);
  --shadow-botanical: 0 8px 30px -8px hsl(91 37% 47% / 0.15);
  --shadow-elegant: 0 10px 40px -10px hsl(30 8% 12% / 0.12);
}
```

### 2.6 Filosofia del Movimento

> **"Il movimento deve essere sentito, non visto."**

#### Regole Ferree ❌

- ❌ Nessun parallax
- ❌ Nessun zoom
- ❌ Nessuna animazione automatica al caricamento
- ❌ Massimo UN elemento animato per sezione
- ❌ Nessun effetto teatrale

#### Effetti Permessi ✅

- ✅ Fade-in lento (0.8s - 1.2s)
- ✅ Cambi di opacità sottili
- ✅ Micro-delay tra blocchi di testo (stagger)
- ✅ Transizioni smooth su hover

#### Animazioni CSS

```css
/* Fade-in base */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Float delicato (per decorazioni) */
@keyframes gentle-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Reveal con movimento minimo */
@keyframes smooth-reveal {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Classi utility */
.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-smooth-reveal {
  animation: smooth-reveal 1s ease-out forwards;
}

/* Stagger per children */
.stagger-children > * {
  opacity: 0;
  animation: smooth-reveal 0.8s ease-out forwards;
}
.stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
/* ... fino a 6 */
```

---

## 3. Sistema Multilingua

### 3.1 Contesto Lingua

File: `src/contexts/LanguageContext.tsx`

```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (de: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // 1. Check localStorage
    const saved = localStorage.getItem('preferred-language') as Language;
    if (saved === 'de' || saved === 'en') return saved;
    
    // 2. Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('de')) return 'de';
    
    // 3. Default to English
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Helper per traduzioni inline
  const t = (de: string, en: string): string => {
    return language === 'de' ? de : en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
```

### 3.2 Utilizzo nei Componenti

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { language, t } = useLanguage();
  
  return (
    <div>
      {/* Traduzione inline */}
      <h1>{t('Willkommen', 'Welcome')}</h1>
      
      {/* Condizionale per contenuti complessi */}
      {language === 'de' ? (
        <p>Testo lungo in tedesco...</p>
      ) : (
        <p>Long English text...</p>
      )}
    </div>
  );
}
```

### 3.3 Switcher Lingua

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <button
      onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
      className="text-sm font-medium hover:text-primary transition-colors"
    >
      {language === 'de' ? 'EN' : 'DE'}
    </button>
  );
}
```

### 3.4 Traduzioni Chiave

| Sezione | Tedesco | Inglese |
|---------|---------|---------|
| Nav - Menu | Speisekarte | Menu |
| Nav - Chi siamo | Über Uns | About Us |
| Nav - Ispirazione | Inspiration | Inspiration |
| Nav - Contatto | Kontakt | Contact |
| Hero - Sottotitolo | Vegetarisches Restaurant | Vegetarian Restaurant |
| Hero - CTA | Anrufen | Call Us |
| Menu - Oggi | Heute frisch gekocht | Fresh Today |
| Menu - Settimana | Ein Blick auf diese Woche | This Week's Menu |
| Menu - Classici | Unsere Klassiker | Our Classics |
| Menu - Zuppa | Suppe | Soup |
| Domenica | Tag der Ruhe | Day of Rest |
| Footer - Orari | Öffnungszeiten | Opening Hours |

---

## 4. Architettura Menu Dinamico

### 4.1 Diagramma Flusso

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Browser   │────▶│  Edge Function   │────▶│  Google Sheets  │
│  (Frontend) │◀────│ get-daily-menu   │◀────│   (Database)    │
└─────────────┘     └──────────────────┘     └─────────────────┘
       │                     │
       │                     │
       ▼                     ▼
 ┌───────────┐        ┌───────────┐
 │ LocalStore│        │ Memory    │
 │ Cache 5m  │        │ Cache 15m │
 └───────────┘        └───────────┘
       │
       ▼
 ┌───────────┐
 │ Fallback  │
 │ Static    │
 └───────────┘
```

### 4.2 Struttura Google Sheets

**Nome Foglio:** `Wochenkarte` (o configurabile)

| Riga | A | B | C | D | E | F | G | H |
|------|---|---|---|---|---|---|---|---|
| 1 | Period | | | | | | | |
| 2 | 6-10. Januar 2025 | | | | | | | |
| 3 | | | | | | | | |
| 4 | **Tag** | **Suppe DE** | **Suppe EN** | **Grün DE** | **Grün EN** | **Blau DE** | **Blau EN** | |
| 5 | Montag | Kürbissuppe | Pumpkin Soup | Gemüse-Curry | Veggie Curry | Pasta Primavera | Pasta Primavera | |
| 6 | Dienstag | Tomatensuppe | Tomato Soup | Buddha Bowl | Buddha Bowl | Risotto | Risotto | |
| ... | ... | ... | ... | ... | ... | ... | ... | |

**Regole:**
- Riga 2, Colonna A: Periodo (es. "6-10. Januar 2025")
- Da riga 5: Dati giornalieri
- Colonne dispari (B, D, F): Tedesco
- Colonne pari (C, E, G): Inglese
- Colonna A: Nome giorno

### 4.3 Edge Function

File: `supabase/functions/get-daily-menu/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// ✅ CORS origins - lista whitelist + controllo più sicuro
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
  "https://lovable.dev",
  // Aggiungi dominio produzione quando noto, es:
  // "https://mysecretgarden.at",
];

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // richieste server-to-server
  if (ALLOWED_ORIGINS.includes(origin)) return true;

  // ✅ Controllo sicuro: URL parsing + endsWith (blocca evil.lovable.app.evil.com)
  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith(".lovable.app")) return true;
    if (hostname.endsWith(".lovable.dev")) return true;
  } catch {
    return false;
  }
  return false;
}

// ✅ Rate limiter con cleanup per evitare memory leak
const rateLimitMap = new Map<string, { count: number; resetTime: number; lastSeen: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 60;

// Anti-leak: pulizia periodica e cap mappa
let lastRateCleanup = 0;
const RATE_CLEANUP_INTERVAL = 10 * 60 * 1000; // ogni 10 min
const RATE_ENTRY_TTL = 2 * RATE_LIMIT_WINDOW_MS;
const RATE_MAP_MAX = 5000;

function getClientIP(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function cleanupRateLimitMap(now: number) {
  if (now - lastRateCleanup < RATE_CLEANUP_INTERVAL) return;
  lastRateCleanup = now;

  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime + RATE_ENTRY_TTL || now - data.lastSeen > RATE_ENTRY_TTL) {
      rateLimitMap.delete(ip);
    }
  }

  if (rateLimitMap.size > RATE_MAP_MAX) {
    const entries = [...rateLimitMap.entries()].sort((a, b) => a[1].lastSeen - b[1].lastSeen);
    const toDrop = entries.length - RATE_MAP_MAX;
    for (let i = 0; i < toDrop; i++) rateLimitMap.delete(entries[i][0]);
  }
}

// Cache in memoria
let menuCache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minuti

// Sanitizzazione input
function sanitizeText(text: unknown, maxLength: number = 500): string {
  if (typeof text !== 'string') return '';
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .substring(0, maxLength);
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  
  // ✅ Reject origini non permesse
  if (!isOriginAllowed(origin)) {
    console.warn("Origin not allowed:", origin);
    return new Response(
      JSON.stringify({ error: "Origin not allowed" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting con cleanup
  const clientIP = getClientIP(req);
  const now = Date.now();
  cleanupRateLimitMap(now);
  
  // ... resto della logica (vedi codice completo nel repo)
});
```

### 4.4 Servizio Frontend

File: `src/services/googleSheetsService.ts`

```typescript
import { supabase } from "@/integrations/supabase/client";

interface MenuDay {
  day: { de: string; en: string };
  soup: { de: string; en: string };
  green: { de: string; en: string };
  greenNote?: { de: string; en: string };
  blue: { de: string; en: string };
  blueNote?: { de: string; en: string };
}

interface WeeklyMenu {
  period: string;
  days: MenuDay[];
}

const CACHE_KEY = 'weekly_menu_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minuti

interface CachedMenu {
  data: WeeklyMenu;
  timestamp: number;
}

export async function fetchMenuFromSheets(): Promise<WeeklyMenu> {
  // Check cache locale
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const cachedData: CachedMenu = JSON.parse(cached);
      if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return cachedData.data;
      }
    } catch (e) {
      // Cache invalida, continua con fetch
    }
  }
  
  // Chiama edge function
  const { data, error } = await supabase.functions.invoke('get-daily-menu');
  
  if (error) throw new Error('EDGE_FUNCTION_ERROR');
  if (!data?.success || !data?.data) throw new Error('NO_MENU_DATA');
  
  const menuData: WeeklyMenu = data.data;

  // Salva in cache locale
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: menuData,
    timestamp: Date.now()
  }));
  
  return menuData;
}

export function clearMenuCache() {
  localStorage.removeItem(CACHE_KEY);
}
```

### 4.5 Hook useWeeklyMenu

File: `src/hooks/useWeeklyMenu.ts`

```typescript
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMenuFromSheets, clearMenuCache } from "@/services/googleSheetsService";
import { weeklyMenu as fallbackMenu } from "@/data/menuData";

export function useWeeklyMenu() {
  const [menu, setMenu] = useState(fallbackMenu);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Soft refresh su focus/online/visibilità, NON ogni 30s
  const SOFT_REFRESH_MIN_GAP = 10 * 60 * 1000; // 10 min
  const HEARTBEAT_INTERVAL = 15 * 60 * 1000;   // 15 min
  const lastSoftRefreshRef = useRef<number>(0);

  const loadMenu = useCallback(
    async (opts?: { force?: boolean; silent?: boolean }) => {
      const force = opts?.force ?? false;
      const silent = opts?.silent ?? false;

      try {
        if (!silent) setIsLoading(true);
        setError(null);
        if (force) clearMenuCache();
        const data = await fetchMenuFromSheets();
        setMenu(data);
      } catch (err) {
        console.error("Failed to load menu:", err);
        setError("Failed to load latest menu");
        setMenu(fallbackMenu);
      } finally {
        if (!silent) setIsLoading(false);
      }
    },
    []
  );

  const softRefresh = useCallback(() => {
    const now = Date.now();
    if (now - lastSoftRefreshRef.current < SOFT_REFRESH_MIN_GAP) return;
    loadMenu({ silent: true });
    lastSoftRefreshRef.current = now;
  }, [loadMenu]);

  useEffect(() => {
    loadMenu();
    lastSoftRefreshRef.current = Date.now();

    const onVisibility = () => {
      if (document.visibilityState === "visible") softRefresh();
    };

    window.addEventListener("focus", softRefresh);
    window.addEventListener("online", softRefresh);
    document.addEventListener("visibilitychange", onVisibility);

    const interval = setInterval(() => softRefresh(), HEARTBEAT_INTERVAL);

    return () => {
      window.removeEventListener("focus", softRefresh);
      window.removeEventListener("online", softRefresh);
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(interval);
    };
  }, [loadMenu, softRefresh]);

  const refresh = () => loadMenu({ force: true });

  return { menu, isLoading, error, refresh };
}
```

### 4.6 Dati Fallback Statici

File: `src/data/menuData.ts`

```typescript
export const weeklyMenu = {
  period: "Beispielwoche",
  days: [
    {
      day: { de: "Montag", en: "Monday" },
      soup: { de: "Gemüsesuppe", en: "Vegetable Soup" },
      green: { de: "Buddha Bowl", en: "Buddha Bowl" },
      blue: { de: "Pasta Primavera", en: "Pasta Primavera" }
    },
    // ... altri giorni
  ]
};
```

---

## 5. Sistema Festività e Chiusure

### 5.1 Struttura Dati

File: `src/data/holidaysData.ts`

```typescript
export interface Holiday {
  date: string;  // Formato: "MM-DD" o "YYYY-MM-DD"
  name: {
    de: string;
    en: string;
  };
  message: {
    de: string;
    en: string;
  };
}

export const holidays: Holiday[] = [
  {
    date: "12-24",
    name: { de: "Heiligabend", en: "Christmas Eve" },
    message: { 
      de: "Wir wünschen Ihnen frohe Weihnachten!", 
      en: "We wish you a Merry Christmas!" 
    }
  },
  {
    date: "12-25",
    name: { de: "1. Weihnachtstag", en: "Christmas Day" },
    message: { 
      de: "Wir wünschen Ihnen frohe Weihnachten!", 
      en: "We wish you a Merry Christmas!" 
    }
  },
  {
    date: "12-26",
    name: { de: "2. Weihnachtstag", en: "Boxing Day" },
    message: { 
      de: "Wir wünschen Ihnen frohe Weihnachten!", 
      en: "We wish you a Merry Christmas!" 
    }
  },
  {
    date: "01-01",
    name: { de: "Neujahr", en: "New Year's Day" },
    message: { 
      de: "Wir wünschen Ihnen ein frohes neues Jahr!", 
      en: "We wish you a Happy New Year!" 
    }
  }
];
```

### 5.2 Funzioni Helper

```typescript
// Ottieni festività per oggi
export function getTodayHoliday(): Holiday | null {
  const today = new Date();
  const monthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return holidays.find(h => h.date === monthDay || h.date.endsWith(monthDay)) || null;
}

// Ottieni festività per data specifica
export function getHolidayForDate(date: Date): Holiday | null {
  const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return holidays.find(h => h.date === monthDay || h.date.endsWith(monthDay)) || null;
}

// Check se è domenica
export function isSundayByName(dayName: string): boolean {
  const sundayNames = ['sonntag', 'sunday', 'domenica'];
  return sundayNames.includes(dayName.toLowerCase());
}

// Calcola data da periodo menu
export function getDateForMenuDay(period: string, dayIndex: number): Date | null {
  // Parse "6-10. Januar 2025" -> Date
  const match = period.match(/(\d+)-\d+\.\s*(\w+)\s*(\d{4})?/);
  if (!match) return null;
  
  const startDay = parseInt(match[1]);
  const monthName = match[2];
  const year = match[3] ? parseInt(match[3]) : new Date().getFullYear();
  
  const months: Record<string, number> = {
    'januar': 0, 'january': 0,
    'februar': 1, 'february': 1,
    'märz': 2, 'march': 2,
    'april': 3,
    'mai': 4, 'may': 4,
    'juni': 5, 'june': 5,
    'juli': 6, 'july': 6,
    'august': 7,
    'september': 8,
    'oktober': 9, 'october': 9,
    'november': 10,
    'dezember': 11, 'december': 11
  };
  
  const month = months[monthName.toLowerCase()];
  if (month === undefined) return null;
  
  return new Date(year, month, startDay + dayIndex);
}
```

### 5.3 Comportamento Domenica

Quando il giorno corrente è domenica:

1. **Menu Giornaliero**: Mostra "Tag der Ruhe - Geschlossen"
2. **Accordion Settimanale**: Cambia titolo in "Was dich nächste Woche erwartet"
3. **Preview**: Mostra anteprima del menu di lunedì prossimo

```tsx
// Nel componente DailyMenuCard
const today = new Date();
const isSunday = today.getDay() === 0;
const holiday = getTodayHoliday();

if (isSunday) {
  return (
    <div className="text-center py-8">
      <h3 className="font-caveat text-2xl text-primary mb-2">
        {language === 'de' ? 'Sonntag' : 'Sunday'}
      </h3>
      <p className="text-muted-foreground">
        {language === 'de' ? 'Tag der Ruhe — Geschlossen' : 'Day of Rest — Closed'}
      </p>
    </div>
  );
}

if (holiday) {
  return (
    <div className="text-center py-8">
      <h3 className="font-caveat text-2xl text-primary mb-2">
        {holiday.name[language]}
      </h3>
      <p className="text-muted-foreground">
        {holiday.message[language]}
      </p>
    </div>
  );
}
```

### 5.4 Integrazione con Menu Settimanale

```tsx
// Nel WeeklyMenuDialog
const isSundayToday = new Date().getDay() === 0;

// Titolo condizionale
const accordionTitle = isSundayToday
  ? (language === 'de' ? 'Was dich nächste Woche erwartet' : "What awaits you next week")
  : (language === 'de' ? 'Ein Blick auf diese Woche' : "This Week's Menu");

// Skip domenica nella lista giorni
{menu.days.map((day, index) => {
  const dayDate = getDateForMenuDay(menu.period, index);
  const holiday = dayDate ? getHolidayForDate(dayDate) : null;
  const isSunday = isSundayByName(day.day.de);
  
  if (isSunday) return null; // Non mostrare domenica
  
  if (holiday) {
    return (
      <div key={index} className="py-4 border-b border-border/50">
        <p className="font-medium">{day.day[language]}</p>
        <p className="text-muted-foreground italic">{holiday.message[language]}</p>
      </div>
    );
  }
  
  return (
    <div key={index}>
      {/* Menu normale */}
    </div>
  );
})}
```

---

## 6. Componenti Principali

### 6.0 Configurazione Centralizzata SITE

File: `src/config/site.ts`

```typescript
import type { OpeningHours } from "@/lib/openStatus";

export const SITE = {
  name: "My Secret Garden",

  // ✅ UNICO numero telefono (testo visibile)
  phoneDisplay: "01 586 28 39",

  // ✅ UNICO numero per tel: (formato internazionale)
  phoneTel: "+4315862839",

  // Indirizzo
  addressShort: "Mariahilferstraße 45, Im Raimundhof – 1060 Wien",

  // Google Maps link
  mapsUrl: "https://www.google.com/maps/place/My+Secret+Garden/@48.1975697,16.3515233,17z/",

  // Orari (Mo–Sa 11:00–19:00, So chiuso)
  openingHours: {
    mon: { open: "11:00", close: "19:00" },
    tue: { open: "11:00", close: "19:00" },
    wed: { open: "11:00", close: "19:00" },
    thu: { open: "11:00", close: "19:00" },
    fri: { open: "11:00", close: "19:00" },
    sat: { open: "11:00", close: "19:00" },
    sun: null,
  } satisfies OpeningHours,
} as const;
```

### 6.0.1 Helper Stato Aperto/Chiuso

File: `src/lib/openStatus.ts`

```typescript
export type Slot = { open: string; close: string };
export type OpeningHours = {
  mon: Slot | null;
  tue: Slot | null;
  wed: Slot | null;
  thu: Slot | null;
  fri: Slot | null;
  sat: Slot | null;
  sun: Slot | null;
};

function toMinutes(hhmm: string): number {
  const [hh, mm] = hhmm.split(":").map(Number);
  return hh * 60 + mm;
}

function getViennaParts(date = new Date()): { weekday: string; minutes: number } {
  const dtf = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Vienna",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = dtf.formatToParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");

  return { weekday, minutes: hour * 60 + minute };
}

function weekdayKey(weekdayShort: string): keyof OpeningHours {
  const map: Record<string, keyof OpeningHours> = {
    Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu",
    Fri: "fri", Sat: "sat", Sun: "sun",
  };
  return map[weekdayShort] ?? "mon";
}

export function getOpenStatus(hours: OpeningHours, now = new Date()) {
  const { weekday, minutes } = getViennaParts(now);
  const key = weekdayKey(weekday);
  const slot = hours[key];

  if (!slot) {
    return { isOpen: false, closesAt: null as string | null };
  }

  const openM = toMinutes(slot.open);
  const closeM = toMinutes(slot.close);
  const isOpen = minutes >= openM && minutes < closeM;

  return {
    isOpen,
    closesAt: isOpen ? slot.close : null,
  };
}
```

### 6.1 Hero

File: `src/components/Hero.tsx`

**Caratteristiche:**
- Carousel Embla con 3 immagini
- ✅ Autoplay rispetta `prefers-reduced-motion`
- ✅ `stopOnInteraction: true` (non combatte l'utente)
- ✅ Chip "Jetzt geöffnet" / "Jetzt geschlossen" (timezone Vienna)
- ✅ CTA: Anrufen (primary) + Wegbeschreibung (secondary)
- ✅ Dots con `aria-label` e `aria-current`
- Usa `SITE` per telefono e mapsUrl

```tsx
import { useState, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";
import { getOpenStatus } from "@/lib/openStatus";

// ... imports immagini

export function Hero() {
  const { language, t } = useLanguage();
  
  // ✅ Rispetta prefers-reduced-motion
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    mq.addEventListener?.("change", (e) => setReduceMotion(e.matches));
  }, []);

  const plugins = useMemo(() => {
    if (reduceMotion) return [];
    return [Autoplay({ delay: 7000, stopOnInteraction: true })];
  }, [reduceMotion]);

  // ✅ Stato aperto/chiuso in tempo reale (timezone Vienna)
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  const status = getOpenStatus(SITE.openingHours, now);

  return (
    <section className="relative h-screen">
      {/* Carousel + Overlay */}
      
      {/* Contenuto */}
      <div className="...">
        <h1>{SITE.name}</h1>
        <p>{t("Vegetarisches Restaurant", "Vegetarian Restaurant")}</p>
        
        {/* ✅ Chip stato */}
        <span className={status.isOpen ? "bg-green-500/20" : "bg-red-500/20"}>
          {status.isOpen ? t("Jetzt geöffnet", "Open now") : t("Jetzt geschlossen", "Closed now")}
        </span>
        {status.isOpen && status.closesAt && (
          <span>• {t("schließt um", "closes at")} {status.closesAt}</span>
        )}
        
        {/* ✅ CTA */}
        <Button onClick={() => window.location.href = `tel:${SITE.phoneTel}`}>
          <Phone /> {t("Anrufen", "Call Us")}
        </Button>
        <Button variant="outline" asChild>
          <a href={SITE.mapsUrl}><MapPin /> {t("Wegbeschreibung", "Directions")}</a>
        </Button>
      </div>
      
      {/* ✅ Dots con a11y */}
      {slides.map((_, i) => (
        <button
          aria-label={t(`Slide ${i+1} anzeigen`, `Show slide ${i+1}`)}
          aria-current={i === current ? "true" : undefined}
        />
      ))}
    </section>
  );
}
```

### 6.2 Navigation

File: `src/components/Navigation.tsx`

**Caratteristiche:**
- Nascosta durante hero, appare su scroll
- Desktop: link orizzontali + language switcher
- Mobile: hamburger menu con drawer
- Sticky top con blur background

```tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

const navItems = [
  { path: '/', labelDe: 'Home', labelEn: 'Home' },
  { path: '/#menu', labelDe: 'Speisekarte', labelEn: 'Menu' },
  { path: '/about', labelDe: 'Über Uns', labelEn: 'About Us' },
  { path: '/inspiration', labelDe: 'Inspiration', labelEn: 'Inspiration' },
  { path: '/contact', labelDe: 'Kontakt', labelEn: 'Contact' },
];

interface NavigationProps {
  visible?: boolean;
}

export function Navigation({ visible = true }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  if (!visible) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-caveat text-2xl text-primary">
          My Secret Garden
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t(item.labelDe, item.labelEn)}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40">
          <div className="flex flex-col p-4 gap-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="text-lg py-2 border-b border-border/30"
                onClick={() => setIsOpen(false)}
              >
                {t(item.labelDe, item.labelEn)}
              </Link>
            ))}
            <div className="pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
```

### 6.3 MenuSection

File: `src/components/MenuSection.tsx`

**Struttura:**
1. Titolo "Heute frisch gekocht" + Menu giornaliero
2. Testo transizione "Nicht alles bleibt..."
3. Accordion menu settimanale (chiuso di default)
4. Sezione "Unsere Klassiker" (piatti fissi)

```tsx
import { useLanguage } from '@/contexts/LanguageContext';
import { useWeeklyMenu } from '@/hooks/useWeeklyMenu';
import { DailyMenuCard } from './DailyMenuCard';
import { WeeklyMenuDialog } from './WeeklyMenuDialog';
import { klassikerItems } from '@/data/klassikerData';

export function MenuSection() {
  const { t, language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();

  return (
    <section id="menu" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        
        {/* Titolo */}
        <h2 className="font-caveat text-4xl text-center text-primary mb-8">
          {t('Heute frisch gekocht', 'Fresh Today')}
        </h2>

        {/* Menu Giornaliero */}
        <DailyMenuCard menu={menu} isLoading={isLoading} />

        {/* Transizione */}
        <p className="text-center text-muted-foreground my-12 font-lora italic">
          {t(
            'Nicht alles bleibt – aber manches kehrt immer wieder.',
            "Not everything stays – but some things always return."
          )}
        </p>

        {/* Accordion Settimanale */}
        <WeeklyMenuDialog menu={menu} />

        {/* Classici */}
        <div className="mt-16">
          <h3 className="font-caveat text-3xl text-center text-primary mb-8">
            {t('Unsere Klassiker', 'Our Classics')}
          </h3>
          <div className="grid gap-6">
            {klassikerItems.map((item, i) => (
              <div key={i} className="flex justify-between items-start border-b border-border/30 pb-4">
                <div>
                  <h4 className="font-medium">{item.name[language]}</h4>
                  <p className="text-sm text-muted-foreground">{item.description[language]}</p>
                </div>
                <span className="text-primary font-medium">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
```

### 6.4 GallerySection

File: `src/components/GallerySection.tsx`

**Caratteristiche:**
- Layout organico (non griglia rigida)
- Quote Sri Chinmoy opzionale
- Mobile: 1 immagine per riga con occasionali coppie
- Desktop: 2-3 colonne

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

import gardenReal from '@/assets/garden-real.jpg';
import interiorReal from '@/assets/interior-real.jpg';
import foodBowl from '@/assets/food-bowl-real.jpg';
import teamReal from '@/assets/team-real.jpg';

const images = [gardenReal, interiorReal, foodBowl, teamReal];

export function GallerySection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        
        {/* Quote opzionale */}
        <blockquote className="text-center mb-12 max-w-2xl mx-auto">
          <p className="font-caveat text-2xl text-primary italic">
            {t(
              '"Die Schönheit liegt in der Einfachheit."',
              '"Beauty lies in simplicity."'
            )}
          </p>
          <cite className="text-sm text-muted-foreground mt-2 block">
            — Sri Chinmoy
          </cite>
        </blockquote>

        {/* Galleria */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div 
              key={i}
              className={`overflow-hidden rounded-lg ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img 
                src={src} 
                alt="" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
```

### 6.5 Footer

File: `src/components/Footer.tsx`

**Nota:** Il footer attuale è più semplice e minimalista, con dati reali.

```tsx
import { Heart, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          
          {/* Brand */}
          <p className="text-lg font-caveat text-primary-foreground/90">
            My Secret Garden
          </p>
          
          {/* Address - one line */}
          <p className="text-sm text-primary-foreground/70 font-work">
            Mariahilferstraße 45, Im Raimundhof – 1060 Wien
          </p>
          
          {/* Hours - synthetic */}
          <p className="text-sm text-primary-foreground/60 font-work">
            {language === "de" ? "Mo–Sa 11:00–19:00" : "Mon–Sat 11:00–19:00"}
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4">
            <a href="https://www.instagram.com/mysecretgarden_vienna/" ...>
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/secretgardencafewien" ...>
              <Facebook className="w-4 h-4" />
            </a>
          </div>
          
          {/* Links */}
          <div className="flex items-center justify-center gap-6 text-sm font-work">
            <Link to="/contact">{language === "de" ? "Kontakt" : "Contact"}</Link>
            <a href="https://www.google.com/maps/place/My+Secret+Garden/...">Google Maps</a>
            <Link to="/privacy">{language === "de" ? "Datenschutz" : "Privacy"}</Link>
            <Link to="/impressum">Impressum</Link>
          </div>
          
          {/* Made with love */}
          <div className="pt-4 border-t border-primary-foreground/10">
            <div className="flex items-center justify-center gap-2 text-xs text-primary-foreground/50">
              <span>Made with</span>
              <Heart className="w-3 h-3 fill-accent text-accent" />
              <span>in Wien</span>
            </div>
            <p className="text-xs text-primary-foreground/40 mt-2">
              © {new Date().getFullYear()} My Secret Garden
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

### 6.6 FloatingCallButton

File: `src/components/FloatingCallButton.tsx`

✅ **Usa `SITE` per numero telefono centralizzato.**

```tsx
import { Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";

export function FloatingCallButton() {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  if (!isMobile) return null;

  return (
    <a
      href={`tel:${SITE.phoneTel}`}
      className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      aria-label={t("Anrufen", "Call Us")}
      title={SITE.phoneDisplay}
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
```

---

## 7. Pagine Secondarie

### 7.1 About Us (`/about`)

**Struttura:**
1. Manifesto frase ("Ein Raum für Ruhe und Begegnung.")
2. Paragrafo descrittivo
3. Pausa visiva
4. Frase poetica
5. Sezione prodotti
6. Frase di chiusura
7. Link a Inspiration

### 7.2 Inspiration (`/inspiration`)

Pagina dedicata a Sri Chinmoy con:
- Biografia breve
- Filosofia
- Connessione con il ristorante
- Galleria opere d'arte

### 7.3 Contact (`/contact`)

- Mappa (opzionale)
- Form contatto
- Info orari
- Numero telefono

### 7.4 Privacy (`/privacy`)

Privacy policy standard GDPR.

### 7.5 Impressum (`/impressum`)

Informazioni legali richieste in Germania/Svizzera.

---

## 8. Sicurezza Implementata

### 8.1 Rate Limiting con Cleanup

```typescript
// Edge function: 60 richieste/minuto per IP
// ✅ Con cleanup periodico per evitare memory leak
const rateLimitMap = new Map<string, { count: number; resetTime: number; lastSeen: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 60;
const RATE_CLEANUP_INTERVAL = 10 * 60 * 1000; // ogni 10 min
const RATE_ENTRY_TTL = 2 * RATE_LIMIT_WINDOW_MS;
const RATE_MAP_MAX = 5000; // cap hard

function cleanupRateLimitMap(now: number) {
  // Rimuovi entry vecchie e applica cap
}
```

### 8.2 CORS Sicuro

```typescript
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
  "https://lovable.dev",
  // Aggiungi dominio produzione quando noto
];

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // server-to-server
  if (ALLOWED_ORIGINS.includes(origin)) return true;

  // ✅ Controllo sicuro con URL parsing + endsWith
  // Blocca trucchi tipo evil.lovable.app.evil.com
  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith(".lovable.app")) return true;
    if (hostname.endsWith(".lovable.dev")) return true;
  } catch {
    return false;
  }
  return false;
}
```

### 8.3 Sanitizzazione Input

```typescript
function sanitizeText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')      // Rimuovi HTML
    .replace(/javascript:/gi, '') // Rimuovi JS
    .replace(/on\w+=/gi, '')      // Rimuovi event handlers
    .slice(0, 500)                // Limite lunghezza
    .trim();
}
```

### 8.4 Nessuna API Key Esposta

- `GOOGLE_SHEET_ID` è un secret lato server
- Nessuna chiave API nel codice frontend
- Sheet è pubblico in sola lettura

### 8.5 Cache Multi-Livello

- **Server (Edge Function)**: 15 minuti in memoria
- **Client (localStorage)**: 5 minuti
- **Stale Cache**: Fallback se fetch fallisce

---

## 9. Configurazione Ambiente

### 9.1 Variabili d'Ambiente

File `.env` (auto-generato da Lovable):

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
VITE_SUPABASE_PROJECT_ID=xxxxx
```

### 9.2 Secrets Lovable Cloud

Configurati tramite dashboard o CLI:

| Nome | Descrizione |
|------|-------------|
| `GOOGLE_SHEET_ID` | ID del foglio Google Sheets con menu |
| `SUPABASE_URL` | URL progetto Supabase (auto) |
| `SUPABASE_ANON_KEY` | Chiave anonima Supabase (auto) |
| `SUPABASE_SERVICE_ROLE_KEY` | Chiave admin Supabase (auto) |

### 9.3 Google Sheets Setup

1. Crea nuovo foglio Google Sheets
2. Struttura come da sezione 4.2
3. Imposta condivisione: "Chiunque con il link può visualizzare"
4. Copia ID dal URL: `https://docs.google.com/spreadsheets/d/[QUESTO_È_L_ID]/edit`
5. Aggiungi come secret `GOOGLE_SHEET_ID`

---

## 10. Checklist Implementazione

### Fase 1: Setup Progetto
- [ ] Crea nuovo progetto Vite + React + TypeScript
- [ ] Installa Tailwind CSS e configura
- [ ] Installa shadcn/ui
- [ ] Attiva Lovable Cloud
- [ ] Aggiungi font Google in index.html
- [ ] Configura tailwind.config.ts con font e colori
- [ ] Copia stili in index.css

### Fase 2: Struttura Base
- [ ] Crea struttura cartelle
- [ ] Configura React Router
- [ ] Implementa LanguageContext
- [ ] Crea componenti UI base (Button, Card, etc.)

### Fase 3: Componenti Core
- [ ] Hero con Embla Carousel
- [ ] Navigation responsive
- [ ] Footer
- [ ] FloatingCallButton

### Fase 4: Sistema Menu
- [ ] Crea dati fallback statici
- [ ] Configura Google Sheets
- [ ] Implementa Edge Function get-daily-menu
- [ ] Crea googleSheetsService
- [ ] Implementa hook useWeeklyMenu
- [ ] Crea DailyMenuCard
- [ ] Crea WeeklyMenuDialog
- [ ] Implementa MenuSection

### Fase 5: Festività
- [ ] Crea holidaysData.ts
- [ ] Implementa helper functions
- [ ] Integra check domenica
- [ ] Integra check festività nel menu

### Fase 6: Pagine Secondarie
- [ ] About Us
- [ ] Inspiration
- [ ] Contact
- [ ] Privacy
- [ ] Impressum

### Fase 7: Rifinitura
- [ ] Reviews section
- [ ] GallerySection
- [ ] InstagramCTA
- [ ] HomeClosing
- [ ] Animazioni fade-in

### Fase 8: Testing & Deploy
- [ ] Test responsive su tutti i dispositivi
- [ ] Test multilingua DE/EN
- [ ] Verifica caricamento menu da Sheets
- [ ] Test festività e domeniche
- [ ] Verifica performance Lighthouse
- [ ] Deploy produzione

---

## Appendice: Asset Richiesti

### Immagini Hero
- `hero-food.jpg` - Piatto in primo piano
- `hero-garden.jpg` - Giardino/esterno
- `hero-interior.jpg` - Interno ristorante

### Immagini Piatti
- `korean-bowl.jpg`
- `minnesota-bowl.jpg`
- `alpenpolenta.jpg`
- `food-bowl-real.jpg`
- `food-detail-real.jpg`

### Immagini Sri Chinmoy
- `sri-chinmoy-portrait.jpg`
- `sri-chinmoy-flowers.jpg`
- `sri-chinmoy-birds.jpg`
- `sri-chinmoy-waves.jpg`
- `sri-chinmoy-abstract.jpg`

### Decorazioni
- `lotus-minimal.png`
- `mandala-minimal.png`
- `blossom-minimal.png`

### Logo
- `logo-secret-garden.png`

---

> **Ultimo aggiornamento:** Dicembre 2024 (rev. 31/12/2024)
> 
> **Changelog recente:**
> - ✅ Numero telefono centralizzato in `SITE` (`01 586 28 39`)
> - ✅ CORS più sicuro (URL parsing + endsWith invece di includes)
> - ✅ Rate limit map con cleanup periodico (evita memory leak)
> - ✅ useWeeklyMenu: soft refresh invece di 30s polling
> - ✅ Hero: chip "Jetzt geöffnet/geschlossen" con timezone Vienna
> - ✅ Hero: rispetta prefers-reduced-motion, stopOnInteraction
> - ✅ Orari aggiornati: Mo–Sa 11:00–19:00
> 
> Questo documento è stato generato automaticamente e contiene tutte le specifiche tecniche per ricreare il sito "My Secret Garden" da zero.
