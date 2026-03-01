import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: {
          red: "#ff1744",
          redGlow: "#ff1744",
          redDark: "#d50000",
          redLight: "#ff5252",
          purple: "#b388ff",
          cyan: "#18ffff",
        },
        dark: {
          950: "#050507",
          900: "#0a0a0f",
          850: "#0d0d14",
          800: "#12121c",
          700: "#1a1a2e",
          600: "#22223a",
          500: "#2a2a40",
        },
        light: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "border-glow": "border-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        flicker: "flicker 3s infinite alternate",
        "scan-line": "scan-line 8s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "0 0 5px rgba(255, 23, 68, 0.3), 0 0 10px rgba(255, 23, 68, 0.1)" },
          "100%": { boxShadow: "0 0 20px rgba(255, 23, 68, 0.6), 0 0 40px rgba(255, 23, 68, 0.3)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(255, 23, 68, 0.3)" },
          "50%": { borderColor: "rgba(255, 23, 68, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        flicker: {
          "0%, 18%, 22%, 25%, 53%, 57%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.4" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255, 23, 68, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 23, 68, 0.03) 1px, transparent 1px)",
        "grid-pattern-light":
          "linear-gradient(rgba(255, 23, 68, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 23, 68, 0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "50px 50px",
      },
    },
  },
  plugins: [],
};

export default config;
