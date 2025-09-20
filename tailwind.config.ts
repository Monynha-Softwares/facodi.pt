import type { Config } from 'tailwindcss';
import { themeTokens } from './src/styles/theme';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: themeTokens.colors.brand,
        accent: themeTokens.colors.accent,
        background: themeTokens.colors.background,
        surface: themeTokens.colors.surface,
        muted: themeTokens.colors.muted,
        border: themeTokens.colors.border,
        foreground: themeTokens.colors.foreground,
      },
      borderRadius: themeTokens.radius,
      boxShadow: themeTokens.shadows,
    },
  },
  plugins: [],
};

export default config;
