import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';
import { tokens } from './src/styles/theme';

const withOpacity = (variableName: string) => `rgb(var(--color-${variableName}) / <alpha-value>)`;

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: tokens.palette.primary,
        secondary: tokens.palette.secondary,
        accent: tokens.palette.accent,
        neutral: tokens.palette.neutral,
        background: withOpacity('background'),
        foreground: withOpacity('foreground'),
        muted: withOpacity('muted'),
        card: withOpacity('card'),
        border: withOpacity('border'),
        ring: withOpacity('ring')
      },
      fontFamily: {
        sans: [...tokens.typography.sans],
        display: [...tokens.typography.display],
        mono: [...tokens.typography.mono]
      },
      borderRadius: tokens.radii,
      boxShadow: {
        sm: tokens.shadows.sm,
        DEFAULT: tokens.shadows.DEFAULT,
        md: tokens.shadows.md,
        lg: tokens.shadows.lg
      }
    }
  },
  plugins: [animatePlugin]
};

export default config;
