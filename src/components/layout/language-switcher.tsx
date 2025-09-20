'use client'

import type { ChangeEvent } from 'react'

import { locales, type Locale } from '@/config/i18n'
import { useSiteText } from '@/hooks/use-site-text'

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useSiteText()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Locale
    setLocale(value)
  }

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
      <span className="sr-only">Idioma do site</span>
      <select
        aria-label="Selecionar idioma"
        className="rounded-lg border border-border bg-card/80 px-3 py-2 text-sm text-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onChange={handleChange}
        value={locale}
      >
        {locales.map((option) => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  )
}
