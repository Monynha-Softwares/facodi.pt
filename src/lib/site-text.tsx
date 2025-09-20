'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { Locale, SiteCopy } from '@/config/i18n';
import { defaultLocale, siteCopy } from '@/config/i18n';

const STORAGE_KEY = 'facodi:locale';

type SiteTextContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  copy: SiteCopy;
};

const SiteTextContext = createContext<SiteTextContextValue | null>(null);

export function SiteTextProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const persisted = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (persisted && siteCopy[persisted]) {
      setLocale(persisted);
      return;
    }

    const browserLang = window.navigator?.language?.slice(0, 2) as Locale | undefined;
    if (browserLang && siteCopy[browserLang]) {
      setLocale(browserLang);
    }
  }, []);

  const handleSetLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    }
  };

  const value = useMemo<SiteTextContextValue>(
    () => ({
      locale,
      setLocale: handleSetLocale,
      copy: siteCopy[locale]
    }),
    [locale]
  );

  return <SiteTextContext.Provider value={value}>{children}</SiteTextContext.Provider>;
}

export function useSiteText() {
  const context = useContext(SiteTextContext);

  if (!context) {
    throw new Error('useSiteText must be used within a SiteTextProvider');
  }

  return context;
}

export function useAvailableLocales(): Locale[] {
  return useMemo(() => Object.keys(siteCopy) as Locale[], []);
}
