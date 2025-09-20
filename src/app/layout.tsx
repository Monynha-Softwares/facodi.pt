import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { SiteFooter } from '@/components/navigation/site-footer';
import { SiteHeader } from '@/components/navigation/site-header';
import { SiteTextProvider } from '@/components/providers/site-text-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { baseMetadata } from '@/lib/metadata';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = baseMetadata;

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${fontSans.variable} min-h-screen bg-background text-foreground`}>
        <ThemeProvider>
          <SiteTextProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12" role="main">
                {children}
              </main>
              <SiteFooter />
            </div>
          </SiteTextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
