export type ThemeMode = 'light' | 'dark';

type ThemeColorScale = {
  background: string;
  foreground: string;
  accent: string;
  accentForeground: string;
  highlight: string;
  highlightForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
};

type ThemeTokens = {
  colors: Record<ThemeMode, ThemeColorScale>;
  radii: {
    xl: string;
    xxl: string;
  };
  shadows: {
    soft: string;
    focus: string;
  };
};

export const themeTokens: ThemeTokens = {
  colors: {
    light: {
      background: '249 250 251',
      foreground: '11 17 32',
      accent: '99 102 241',
      accentForeground: '248 250 252',
      highlight: '217 163 115',
      highlightForeground: '17 24 39',
      muted: '224 231 255',
      mutedForeground: '49 46 129',
      border: '226 232 240',
      ring: '129 140 248',
    },
    dark: {
      background: '11 17 32',
      foreground: '226 232 240',
      accent: '129 140 248',
      accentForeground: '11 17 32',
      highlight: '233 196 106',
      highlightForeground: '17 24 39',
      muted: '31 41 55',
      mutedForeground: '191 219 254',
      border: '51 65 85',
      ring: '196 181 253',
    },
  },
  radii: {
    xl: '1.25rem',
    xxl: '1.75rem',
  },
  shadows: {
    soft: '0 30px 70px -30px rgba(99, 102, 241, 0.35)',
    focus: '0 0 0 4px rgba(233, 196, 106, 0.45)',
  },
};

export const themeName = 'Monynha';
