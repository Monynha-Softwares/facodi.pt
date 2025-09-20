export type ThemeMode = 'light' | 'dark';

export const palette = {
  primary: {
    50: '#f4f0ff',
    100: '#e3d7ff',
    200: '#c7b0ff',
    300: '#ab88ff',
    400: '#905fff',
    500: '#7436ff',
    600: '#5a28d6',
    700: '#431fa5',
    800: '#2d146f',
    900: '#1a0b42'
  },
  secondary: {
    50: '#f0f9ff',
    100: '#d6edff',
    200: '#a8d9ff',
    300: '#7ac4ff',
    400: '#4badff',
    500: '#2196f3',
    600: '#1477c0',
    700: '#0d5a90',
    800: '#083d60',
    900: '#041f30'
  },
  accent: {
    50: '#fff8ed',
    100: '#ffe8c2',
    200: '#ffd18a',
    300: '#ffb752',
    400: '#ff9f24',
    500: '#ff8600',
    600: '#cc6900',
    700: '#994d00',
    800: '#663200',
    900: '#331900'
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5f5',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  }
} as const;

export const typography = {
  sans: ['"Inter"', 'system-ui', 'sans-serif'],
  display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'monospace']
} as const;

export const radii = {
  none: '0',
  sm: '0.5rem',
  DEFAULT: '1rem',
  md: '1.25rem',
  lg: '1.75rem',
  xl: '2.25rem',
  '2xl': '2.5rem',
  full: '9999px'
} as const;

export const shadows = {
  sm: '0 4px 12px -4px rgba(46, 24, 87, 0.2)',
  DEFAULT: '0 14px 40px -20px rgba(41, 3, 113, 0.45)',
  md: '0 16px 45px -15px rgba(10, 60, 120, 0.35)',
  lg: '0 20px 60px -12px rgba(116, 54, 255, 0.35)'
} as const;

export const themeModes: Record<ThemeMode, Record<string, string>> = {
  light: {
    background: '248 250 252',
    foreground: '15 23 42',
    muted: '226 232 240',
    card: '255 255 255',
    border: '99 102 241 / 0.15',
    ring: '144 95 255'
  },
  dark: {
    background: '9 7 18',
    foreground: '248 250 252',
    muted: '148 163 184 / 0.2',
    card: '15 23 42 / 0.85',
    border: '116 54 255 / 0.3',
    ring: '122 196 255'
  }
};

export const tokens = {
  palette,
  typography,
  radii,
  shadows,
  themeModes
};

export type SiteTokens = typeof tokens;
