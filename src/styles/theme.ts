export const themeTokens = {
  colors: {
    background: {
      light: '#f9f7ff',
      dark: '#080c16'
    },
    foreground: {
      light: '#111827',
      dark: '#f8fafc'
    },
    muted: {
      light: '#e9e6fb',
      dark: '#1f2431'
    },
    border: {
      light: '#d9d6fe',
      dark: '#312e81'
    },
    primary: {
      light: '#7c3aed',
      dark: '#a855f7'
    },
    primaryForeground: {
      light: '#fdf4ff',
      dark: '#1c052b'
    },
    secondary: {
      light: '#0ea5e9',
      dark: '#38bdf8'
    },
    secondaryForeground: {
      light: '#0f172a',
      dark: '#e0f2fe'
    },
    card: {
      light: '#ffffff',
      dark: '#0f172a'
    },
    cardForeground: {
      light: '#111827',
      dark: '#f1f5f9'
    },
    focus: {
      light: '#f97316',
      dark: '#fb923c'
    },
    success: {
      light: '#22c55e',
      dark: '#4ade80'
    },
    warning: {
      light: '#facc15',
      dark: '#facc15'
    }
  },
  radii: {
    base: '1rem',
    xl: '1.5rem',
    full: '9999px'
  },
  shadows: {
    soft: {
      light: '0 24px 64px -32px rgba(124, 58, 237, 0.35)',
      dark: '0 24px 64px -32px rgba(168, 85, 247, 0.45)'
    }
  },
  typography: {
    fontFamily: {
      sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular']
    }
  }
} as const;

export type ThemeTokens = typeof themeTokens;
