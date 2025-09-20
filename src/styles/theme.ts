export type ThemeName = 'light' | 'dark'

export const radius = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px'
}

export const shadows = {
  soft: '0 20px 45px -25px rgba(15, 23, 42, 0.45)',
  subtle: '0 12px 30px -20px rgba(15, 23, 42, 0.35)',
  focus: '0 0 0 3px rgba(99, 102, 241, 0.35)'
}

export const palette = {
  primary: '#4338ca',
  secondary: '#0ea5e9',
  accent: '#f97316',
  success: '#16a34a',
  danger: '#ef4444',
  warning: '#facc15',
  neutral: '#1f2937'
}

export const themes: Record<ThemeName, Record<string, string>> = {
  light: {
    '--background': '#f8fafc',
    '--foreground': '#0f172a',
    '--muted': '#e2e8f0',
    '--muted-foreground': '#334155',
    '--card': '#ffffff',
    '--card-foreground': '#0f172a',
    '--popover': '#ffffff',
    '--popover-foreground': '#0f172a',
    '--primary': palette.primary,
    '--primary-foreground': '#f8fafc',
    '--secondary': palette.secondary,
    '--secondary-foreground': '#f8fafc',
    '--accent': palette.accent,
    '--accent-foreground': '#0f172a',
    '--border': '#cbd5f5',
    '--input': '#cbd5f5',
    '--ring': 'rgba(99, 102, 241, 0.4)',
    '--success': palette.success,
    '--danger': palette.danger,
    '--warning': palette.warning,
    '--shadow-soft': shadows.soft,
    '--shadow-subtle': shadows.subtle,
    '--shadow-focus': shadows.focus
  },
  dark: {
    '--background': '#0f172a',
    '--foreground': '#f8fafc',
    '--muted': '#1e293b',
    '--muted-foreground': '#cbd5f5',
    '--card': '#111827',
    '--card-foreground': '#f8fafc',
    '--popover': '#111827',
    '--popover-foreground': '#f8fafc',
    '--primary': palette.primary,
    '--primary-foreground': '#f8fafc',
    '--secondary': palette.secondary,
    '--secondary-foreground': '#0f172a',
    '--accent': palette.accent,
    '--accent-foreground': '#0f172a',
    '--border': '#1e293b',
    '--input': '#1e293b',
    '--ring': 'rgba(129, 140, 248, 0.55)',
    '--success': palette.success,
    '--danger': palette.danger,
    '--warning': palette.warning,
    '--shadow-soft': shadows.soft,
    '--shadow-subtle': shadows.subtle,
    '--shadow-focus': shadows.focus
  }
}

export const fontFamilies = {
  display: 'var(--font-sora)',
  body: 'var(--font-inter)'
}

export const THEME_STORAGE_KEY = 'facodi-theme'

export const LANGUAGE_STORAGE_KEY = 'facodi-language'

export const themeNames: ThemeName[] = ['light', 'dark']

export const applyThemeToDocument = (themeName: ThemeName) => {
  if (typeof document === 'undefined') return

  const theme = themes[themeName]
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
  document.documentElement.dataset.theme = themeName
}
