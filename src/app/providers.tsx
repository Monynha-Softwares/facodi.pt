'use client';

import { type ReactNode } from 'react';

import { ThemeProvider } from '@/components/theme/theme-provider';
import { SiteTextProvider } from '@/lib/site-text';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SiteTextProvider>{children}</SiteTextProvider>
    </ThemeProvider>
  );
}
