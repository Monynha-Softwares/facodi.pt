'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { defaultLocale, locales, messages, type Locale } from '@/config/i18n'
import { LANGUAGE_STORAGE_KEY } from '@/styles/theme'

type LocaleMessages = (typeof messages)[Locale]

type SiteTextContextValue = {
  locale: Locale
  setLocale: (value: Locale) => void
  text: LocaleMessages
}

const SiteTextContext = createContext<SiteTextContextValue | null>(null)

const isLocale = (value: string): value is Locale => locales.includes(value as Locale)

export const SiteTextProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (storedLanguage && isLocale(storedLanguage)) {
      setLocale(storedLanguage)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
  }, [locale])

  const value = useMemo<SiteTextContextValue>(() => ({
    locale,
    setLocale,
    text: messages[locale]
  }), [locale])

  return <SiteTextContext.Provider value={value}>{children}</SiteTextContext.Provider>
}

export const useSiteText = () => {
  const context = useContext(SiteTextContext)
  if (!context) {
    throw new Error('useSiteText must be used within a SiteTextProvider')
  }
  return context
}
