'use client';

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { defaultLocale, getSiteCopy, supportedLocales, type SiteLocale } from '@/config/i18n';

export type SiteTextContextValue = {
    locale: SiteLocale;
    setLocale: (locale: SiteLocale) => void;
    copy: ReturnType<typeof getSiteCopy>;
};

const STORAGE_KEY = 'facodi.site-locale';

export const SiteTextContext = createContext<SiteTextContextValue | undefined>(undefined);

export function SiteTextProvider({ children }: { children: ReactNode }): JSX.Element {
    const [locale, setLocaleState] = useState<SiteLocale>(defaultLocale);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored && supportedLocales.includes(stored as SiteLocale)) {
            setLocaleState(stored as SiteLocale);
        }
    }, []);

    const setLocale = useCallback((next: SiteLocale) => {
        setLocaleState(next);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, next);
        }
    }, []);

    const copy = useMemo(() => getSiteCopy(locale), [locale]);

    const value = useMemo<SiteTextContextValue>(
        () => ({
            locale,
            setLocale,
            copy
        }),
        [copy, locale, setLocale]
    );

    return <SiteTextContext.Provider value={value}>{children}</SiteTextContext.Provider>;
}
