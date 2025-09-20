export const themeTokens = {
  colors: {
    brand: {
      50: '#f3e8ff',
      100: '#e0caff',
      200: '#c7a6ff',
      300: '#ae83ff',
      400: '#9460ff',
      500: '#7c3aed',
      600: '#662bc5',
      700: '#52209e',
      800: '#3d1677',
      900: '#280d51',
    },
    accent: '#f97316',
    background: {
      light: '#f8f6ff',
      dark: '#090217',
    },
    surface: {
      light: '#ffffff',
      dark: '#131022',
    },
    muted: {
      light: '#e9e5f7',
      dark: '#2a2443',
    },
    border: {
      light: '#d7d0ef',
      dark: '#3d335c',
    },
    foreground: {
      light: '#150826',
      dark: '#f5f3ff',
    },
  },
  radius: {
    none: '0px',
    sm: '0.25rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.75rem',
    '3xl': '2.5rem',
    full: '9999px',
  },
  shadows: {
    soft: '0 20px 45px -25px rgba(124, 58, 237, 0.4)',
    subtle: '0 12px 35px -20px rgba(15, 23, 42, 0.35)',
    ring: '0 0 0 3px rgba(124, 58, 237, 0.35)',
  },
};

export const THEME_STORAGE_KEY = 'monynha.theme';
export const LANGUAGE_STORAGE_KEY = 'monynha.lang';
