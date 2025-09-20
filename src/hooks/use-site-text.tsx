'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { defaultLanguage, type InterfaceCopy, type SiteLanguage,siteTexts, supportedLanguages } from '@/config/i18n';

const STORAGE_KEY = 'facodi:language';

type SiteTextContextValue = {
  language: SiteLanguage;
  copy: InterfaceCopy;
  setLanguage: (language: SiteLanguage) => void;
};

const SiteTextContext = createContext<SiteTextContextValue | undefined>(undefined);

export const SiteTextProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<SiteLanguage>(defaultLanguage);

  useEffect(() => {
    const stored = typeof window === 'undefined' ? null : window.localStorage.getItem(STORAGE_KEY);
    if (stored && supportedLanguages.includes(stored as SiteLanguage)) {
      setLanguageState(stored as SiteLanguage);
    }
  }, []);

  const setLanguage = useCallback((next: SiteLanguage) => {
    if (!supportedLanguages.includes(next)) {
      return;
    }
    setLanguageState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const copy = useMemo(() => siteTexts[language], [language]);

  const value = useMemo(() => ({ language, copy, setLanguage }), [language, copy, setLanguage]);

  return <SiteTextContext.Provider value={value}>{children}</SiteTextContext.Provider>;
};

export const useSiteText = () => {
  const context = useContext(SiteTextContext);
  if (!context) {
    throw new Error('useSiteText must be used within a SiteTextProvider');
  }
  return context;
};
