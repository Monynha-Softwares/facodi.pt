'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { defaultLocale, type Locale, type SiteCopy, siteText } from '@/config/i18n';

const STORAGE_KEY = 'facodi-language';

export interface SiteTextContextValue {
  locale: Locale;
  text: SiteCopy;
  setLocale: (locale: Locale) => void;
}

export const SiteTextContext = createContext<SiteTextContextValue | null>(null);

interface SiteTextProviderProps {
  readonly children: React.ReactNode;
}

function resolveInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && siteText[stored]) {
    return stored;
  }

  const browserLanguage = window.navigator.language.split('-')[0] as Locale;
  if (browserLanguage && siteText[browserLanguage]) {
    return browserLanguage;
  }

  return defaultLocale;
}

export function SiteTextProvider({ children }: SiteTextProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const nextLocale = resolveInitialLocale();
    setLocaleState(nextLocale);
    setIsHydrated(true);
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    }
  }, []);

  const value = useMemo<SiteTextContextValue>(() => {
    const activeLocale = isHydrated ? locale : defaultLocale;
    return {
      locale: activeLocale,
      text: siteText[activeLocale],
      setLocale,
    };
  }, [locale, isHydrated, setLocale]);

  return <SiteTextContext.Provider value={value}>{children}</SiteTextContext.Provider>;
}
