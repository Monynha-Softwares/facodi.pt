import type { Config } from "tailwindcss";

export const tailwindPreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        background: "hsl(210 40% 98%)",
        foreground: "hsl(222 84% 4%)",
        muted: {
          DEFAULT: "hsl(214 32% 91%)",
          foreground: "hsl(215 20% 30%)",
        },
        primary: {
          DEFAULT: "#7C3AED",
          foreground: "#F9FAFB",
        },
        secondary: {
          DEFAULT: "#0EA5E9",
          foreground: "#F8FAFC",
        },
        accent: {
          DEFAULT: "#FB923C",
          foreground: "#0F172A",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "hsl(222 47% 11%)",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2.25rem",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        md: "0 12px 30px -15px rgba(76, 29, 149, 0.35)",
      },
    },
  },
};
