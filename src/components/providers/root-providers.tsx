'use client';

import { type ReactNode } from 'react';

import { SiteTextProvider } from '@/components/providers/site-text-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

export function RootProviders({ children }: { children: ReactNode }): JSX.Element {
    return (
        <ThemeProvider>
            <SiteTextProvider>{children}</SiteTextProvider>
        </ThemeProvider>
    );
}
