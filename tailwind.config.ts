import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "rgb(var(--accent-light) / <alpha-value>)",
          dark: "rgb(var(--accent-dark) / <alpha-value>)",
        },
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
        brand: {
          dark: "rgb(var(--brand-dark) / <alpha-value>)",
          background: "rgb(var(--brand-background) / <alpha-value>)",
          surface: "rgb(var(--brand-surface) / <alpha-value>)",
          surfaceLight: "rgb(var(--brand-surface-light) / <alpha-value>)",
          purple: "rgb(var(--brand-purple) / <alpha-value>)",
          purpleLight: "rgb(var(--brand-purple-light) / <alpha-value>)",
          accent: "rgb(var(--brand-accent) / <alpha-value>)",
          green: "rgb(var(--brand-green) / <alpha-value>)",
          blue: "rgb(var(--brand-blue) / <alpha-value>)",
          accentGreen: "rgb(var(--brand-accent-green) / <alpha-value>)",
          accentYellow: "rgb(var(--brand-accent-yellow) / <alpha-value>)",
          accentPurple: "rgb(var(--brand-accent-purple) / <alpha-value>)",
          accentPurpleDark: "rgb(var(--brand-accent-purple-dark) / <alpha-value>)",
          text: "rgb(var(--brand-text) / <alpha-value>)",
          textMuted: "rgb(var(--brand-text-muted) / <alpha-value>)",
          error: "rgb(var(--brand-error) / <alpha-value>)",
          success: "rgb(var(--brand-success) / <alpha-value>)",
          warning: "rgb(var(--brand-warning) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
