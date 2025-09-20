'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { defaultLanguage, languages, type LanguageCode, siteCopy } from '@/config/i18n';
import { LANGUAGE_STORAGE_KEY } from '@/styles/theme';

const LanguageContext = createContext<{
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  available: LanguageCode[];
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null;
    if (stored && languages.includes(stored)) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      available: [...languages],
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}

export function useSiteText() {
  const { language } = useLanguage();
  return siteCopy[language];
}
