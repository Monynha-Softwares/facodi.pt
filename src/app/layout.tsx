import './globals.css';

import type { Metadata } from 'next';
import { Inter,Plus_Jakarta_Sans } from 'next/font/google';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { SkipToContent } from '@/components/shared/skip-to-content';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeStyles } from '@/components/theme-styles';
import { defaultLanguage, siteTexts } from '@/config/i18n';
import { SiteTextProvider } from '@/hooks/use-site-text';
import { cn } from '@/lib/utils';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const heading = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });

const baseMetadata = siteTexts[defaultLanguage].metadata;
const site = siteTexts[defaultLanguage].site;

export const metadata: Metadata = {
  metadataBase: new URL('https://facodi.pt'),
  title: {
    default: baseMetadata.defaultTitle,
    template: `%s | ${site.title}`
  },
  description: baseMetadata.defaultDescription,
  openGraph: {
    title: baseMetadata.defaultTitle,
    description: baseMetadata.defaultDescription,
    type: 'website',
    siteName: site.title,
    locale: 'pt_PT'
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.defaultTitle,
    description: baseMetadata.defaultDescription
  },
  alternates: {
    canonical: '/'
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const className = cn(
  'flex min-h-screen flex-col bg-background font-sans text-foreground antialiased',
  sans.variable,
  heading.variable
);

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang={defaultLanguage} suppressHydrationWarning>
    <head>
      <ThemeStyles />
    </head>
    <body className={className}>
      <SiteTextProvider>
        <ThemeProvider>
          <SkipToContent />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </SiteTextProvider>
    </body>
  </html>
);

export default RootLayout;
