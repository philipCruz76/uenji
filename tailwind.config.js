const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      desktop: "900px",
      tablet: "600px",
      mobile: "400px",
    },
    extend: {
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
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      keyframes: {
        "rotating-text-desktop": {
          "0%,100%": { top: "0%" },
          "20%": { top: "0%" },
          "25%": { top: "-50px" },
          "45%": { top: "-50px" },
          "50%": { top: "-100px" },
          "70%": { top: "-100px" },
          "75%": { top: "-150px" },
          "95%": { top: "-150px" },
        },
        "rotating-text-mobile": {
          "0%,100%": { top: "0%" },
          "20%": { top: "0%" },
          "25%": { top: "-40px" },
          "45%": { top: "-40px" },
          "50%": { top: "-80px" },
          "70%": { top: "-80px" },
          "75%": { top: "-120px" },
          "95%": { top: "-120px" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out ",
        "accordion-up": "accordion-up 0.1s ease-in",
        "rotating-text-desktop": "rotating-text-desktop 10s ease infinite",
        "rotating-text-mobile": "rotating-text-mobile 10s ease infinite",
        wiggle: "wiggle 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("postcss-import")],
};
