import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '@/app/globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { defaultLocale, resolveSiteText } from '@/config/i18n';
import { ThemeProvider } from '@/providers/theme-provider';
import { SiteTextProvider } from '@/providers/site-text-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const jetBrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const site = resolveSiteText(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL('https://facodi.pt'),
  title: site.meta.title,
  description: site.meta.description,
  keywords: site.meta.keywords.split(',').map((keyword) => keyword.trim()),
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: 'https://facodi.pt',
    siteName: site.title,
    locale: 'pt_PT',
    type: 'website'
  },
  alternates: {
    canonical: '/',
    languages: {
      'pt-PT': '/',
      'en-US': '/en',
      'es-ES': '/es',
      'fr-FR': '/fr'
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrains.variable} bg-background font-sans text-foreground`}>
        <ThemeProvider>
          <SiteTextProvider>
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
              <a
                href="#conteudo-principal"
                className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-primary-500 focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
              >
                Pular para o conteúdo principal
              </a>
              <Navbar />
              <main id="conteudo-principal" className="flex-1">
                <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12">{children}</div>
              </main>
              <Footer />
            </div>
          </SiteTextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
