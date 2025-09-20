'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  defaultLocale,
  resolveSiteText,
  supportedLocales,
  type SiteLabels,
  type SiteLocale
} from '@/config/i18n';

export interface SiteTextContextValue {
  locale: SiteLocale;
  labels: SiteLabels;
  setLocale: (locale: SiteLocale) => void;
}

const STORAGE_KEY = 'facodi.site-locale';

export const SiteTextContext = createContext<SiteTextContextValue | undefined>(undefined);

export function SiteTextProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [locale, setLocaleState] = useState<SiteLocale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as SiteLocale | null;
    if (stored && supportedLocales.includes(stored)) {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: SiteLocale) => {
    if (!supportedLocales.includes(next)) {
      return;
    }
    setLocaleState(next);
  }, []);

  const value = useMemo<SiteTextContextValue>(
    () => ({
      locale,
      labels: resolveSiteText(locale),
      setLocale
    }),
    [locale, setLocale]
  );

  return <SiteTextContext.Provider value={value}>{children}</SiteTextContext.Provider>;
}
