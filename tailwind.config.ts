import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem" },
      // Only large breakpoints are listed on purpose: the container is full
      // width below lg and caps at 1140px from lg up. Listing sm/md as "100%"
      // emits an invalid `@media (min-width: 100%)` rule.
      screens: { lg: "1140px", xl: "1140px", "2xl": "1140px" },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1C192A",
          50: "#F4F3F7",
          100: "#EDECF1",
          200: "#D6D3DF",
          300: "#8B8797",
          400: "#4A4658",
          500: "#1C192A",
          600: "#171425",
          700: "#12101C",
        },
        orange: {
          DEFAULT: "#F28D3D",
          50: "#FFF6EE",
          100: "#FDE9D6",
          200: "#FBD0A6",
          300: "#F8B374",
          500: "#F28D3D",
          600: "#D97A2C",
        },
        gold: { DEFAULT: "#FCDF09", 500: "#FCDF09" },
        sky: { DEFAULT: "#2B69D8", 500: "#2B69D8", 600: "#2154B0" },
        cream: "#FAFAF7",
        line: "#E4E2EA",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.035em", tighter: "-0.022em" },
      borderRadius: { DEFAULT: "10px", lg: "14px", xl: "18px", "2xl": "24px", "3xl": "32px" },
      boxShadow: {
        soft: "0 4px 24px rgba(28,25,42,0.06)",
        elevated: "0 18px 48px rgba(28,25,42,0.12)",
        glow: "0 0 0 1px rgba(242,141,61,0.16), 0 10px 34px rgba(242,141,61,0.20)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(110deg,#2B69D8 0%,#F28D3D 60%,#FCDF09 100%)",
        "warm-gradient": "linear-gradient(110deg,#F28D3D 0%,#FCDF09 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.22,1,.36,1) forwards",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
