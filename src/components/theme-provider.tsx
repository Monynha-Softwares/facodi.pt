'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

import type { SupportedColorMode } from '@/styles/theme';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: SupportedColorMode;
};

export const ThemeProvider = ({ children, defaultTheme = 'light' }: ThemeProviderProps) => (
  <NextThemeProvider
    attribute="class"
    defaultTheme={defaultTheme}
    enableSystem
    storageKey="facodi:theme"
    disableTransitionOnChange
  >
    {children}
  </NextThemeProvider>
);
