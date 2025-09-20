import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import { themeTokens } from './src/styles/theme';

const toCssVarName = (token: string) => `--color-${token}`;

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
    './src/styles/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)'
        },
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)'
        },
        focus: 'var(--color-focus)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)'
      },
      fontFamily: {
        sans: themeTokens.typography.fontFamily.sans,
        mono: themeTokens.typography.fontFamily.mono
      },
      boxShadow: {
        soft: 'var(--shadow-soft)'
      },
      borderRadius: {
        lg: 'var(--radius-base)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-xl)',
        full: 'var(--radius-full)'
      }
    }
  },
  plugins: [
    plugin(({ addBase }) => {
      const lightColors: Record<string, string> = {};
      const darkColors: Record<string, string> = {};

      Object.entries(themeTokens.colors).forEach(([token, value]) => {
        lightColors[toCssVarName(token)] = value.light;
        darkColors[toCssVarName(token)] = value.dark;

        if ('primaryForeground' === token || 'secondaryForeground' === token || 'cardForeground' === token) {
          const name = token.replace('Foreground', '-foreground');
          lightColors[`--color-${name}`] = value.light;
          darkColors[`--color-${name}`] = value.dark;
        }
      });

      lightColors['--radius-base'] = themeTokens.radii.base;
      lightColors['--radius-xl'] = themeTokens.radii.xl;
      lightColors['--radius-full'] = themeTokens.radii.full;
      lightColors['--shadow-soft'] = themeTokens.shadows.soft.light;

      darkColors['--radius-base'] = themeTokens.radii.base;
      darkColors['--radius-xl'] = themeTokens.radii.xl;
      darkColors['--radius-full'] = themeTokens.radii.full;
      darkColors['--shadow-soft'] = themeTokens.shadows.soft.dark;

      addBase({
        ':root': lightColors,
        '.dark': darkColors
      });
    })
  ]
};

export default config;
