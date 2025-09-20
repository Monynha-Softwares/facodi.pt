'use client'

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

import { THEME_STORAGE_KEY, applyThemeToDocument, themeNames, type ThemeName } from '@/styles/theme'

type ThemeContextValue = {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const isTheme = (value: string): value is ThemeName => themeNames.includes(value as ThemeName)

const getPreferredTheme = (): ThemeName => {
  if (typeof window === 'undefined') {
    return 'light'
  }
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored && isTheme(stored)) {
    return stored
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeName>('light')

  useEffect(() => {
    const initial = getPreferredTheme()
    setThemeState(initial)
    applyThemeToDocument(initial)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    applyThemeToDocument(theme)
  }, [theme])

  const setTheme = useCallback((value: ThemeName) => {
    setThemeState(value)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((previous) => (previous === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme
    }),
    [theme, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
