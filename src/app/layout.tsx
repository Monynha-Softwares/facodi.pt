import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';

import '@/styles/globals.css';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { LanguageProvider } from '@/components/providers/language-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { defaultLanguage, siteCopy } from '@/config/i18n';

import type { Metadata } from 'next';

const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

const meta = siteCopy[defaultLanguage].meta;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.openGraphTitle,
    description: meta.openGraphDescription,
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.openGraphTitle,
    description: meta.openGraphDescription,
  },
  metadataBase: new URL('https://facodi.pt'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLanguage} suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} bg-background-light text-foreground-light`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1 bg-gradient-to-b from-background-light via-surface-light/70 to-background-light dark:from-background-dark dark:via-surface-dark/60 dark:to-background-dark">
                {children}
              </main>
              <SiteFooter />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
