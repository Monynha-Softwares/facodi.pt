import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import tailwindcssAnimate from "tailwindcss-animate";

import { tailwindPreset } from "@monynha/config";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  presets: [tailwindPreset],
  theme: {
    extend: {
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7C3AED 0%, #0EA5E9 100%)",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
};

export default config;
