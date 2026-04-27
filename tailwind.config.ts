import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        'ui':      ['0.875rem', { lineHeight: '1.5' }],
        'body':    ['1rem',     { lineHeight: '1.7' }],
        'section': ['1.313rem', { lineHeight: '1.3' }],
        'hero':    ['3rem',     { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      fontFamily: {
        'caveat': ['Caveat', 'Brush Script MT', 'cursive'],
        'lora': ['Lora', 'Georgia', 'Times New Roman', 'serif'],
        'cormorant': ['Cormorant Garamond', 'Garamond', 'Georgia', 'serif'],
        'work': ['Work Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: "hsl(var(--semantic-warning))",
        success: "hsl(var(--semantic-success))",
        brand: {
          star: "hsl(var(--semantic-warning))",
        },
        state: {
          vegan: 'var(--color-vegan)',
          glutenFree: 'var(--color-gluten-free)',
          bio: 'var(--color-bio)',
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "hsl(var(--accent-light))",
        },
        blue: {
          DEFAULT: "hsl(var(--blue))",
          foreground: "hsl(var(--blue-foreground))",
        },
        cream: "hsl(var(--cream))",
        daily: "hsl(var(--daily-card))",
        dailyAlt: "hsl(var(--daily-card-alt))",
        klassiker: "hsl(var(--klassiker-card))",
        badgeWood: "hsl(var(--badge-wood))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg:      "var(--radius)",
        md:      "var(--radius)",
        sm:      "var(--radius)",
        full:    "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
            opacity: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          to: {
            height: "0",
            opacity: "0",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-hero": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hero-background": {
          "0%": { opacity: "0", transform: "scale(1.04)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "status-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "skeleton-shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 250ms cubic-bezier(0, 0, 0.2, 1)",
        "accordion-up": "accordion-up 250ms cubic-bezier(0.4, 0, 1, 1)",
        "fade-in": "fade-in 250ms cubic-bezier(0, 0, 0.2, 1) forwards",
        "fade-in-hero": "fade-in-hero 400ms cubic-bezier(0, 0, 0.2, 1) 200ms forwards",
        "hero-background": "hero-background 400ms cubic-bezier(0, 0, 0.2, 1) forwards",
        "status-pulse": "status-pulse 2400ms cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "skeleton-shimmer": "skeleton-shimmer 1200ms linear infinite",
        "slide-up": "slide-up 300ms cubic-bezier(0, 0, 0.2, 1)",
        "float": "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-subtle': 'var(--gradient-subtle)',
        'gradient-green': 'var(--gradient-green)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'elevated': 'var(--shadow-elevated)',
        'card': 'var(--shadow-card)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--transition-smooth)',
      },
      transitionDuration: {
        instant: "100ms",
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
