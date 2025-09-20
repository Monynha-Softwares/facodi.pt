import './globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Providers } from '@/app/providers';
import { Footer } from '@/components/navigation/footer';
import { Navbar } from '@/components/navigation/navbar';
import { defaultLocale, siteCopy } from '@/config/i18n';
import { monoFont, sansFont } from '@/styles/fonts';

const defaultCopy = siteCopy[defaultLocale];

export const metadata: Metadata = {
  title: defaultCopy.meta.title,
  description: defaultCopy.meta.description,
  metadataBase: new URL('https://facodi.pt'),
  openGraph: {
    title: defaultCopy.meta.title,
    description: defaultCopy.meta.description,
    url: 'https://facodi.pt',
    siteName: 'FACODI',
    locale: 'pt_PT',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultCopy.meta.title,
    description: defaultCopy.meta.description
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body className={`${sansFont.variable} ${monoFont.variable} min-h-screen bg-background font-sans text-foreground`}>
        <Providers>
          <a
            href="#conteudo-principal"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-2xl focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Ir para o conteúdo principal
          </a>
          <Navbar />
          <main id="conteudo-principal" className="container-safe pb-16 pt-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
