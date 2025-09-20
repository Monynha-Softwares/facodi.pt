import type { Metadata } from 'next'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { defaultLocale, messages } from '@/config/i18n'
import { SiteTextProvider } from '@/hooks/use-site-text'
import { ThemeProvider } from '@/lib/theme-provider'
import { inter, sora } from '@/styles/fonts'

import './globals.css'


const defaultMessages = messages[defaultLocale]

export const metadata: Metadata = {
  metadataBase: new URL('https://facodi.pt'),
  title: {
    default: defaultMessages.metadata.home.title,
    template: `%s | ${defaultMessages.siteTitle}`
  },
  description: defaultMessages.siteDescription,
  openGraph: {
    type: 'website',
    url: 'https://facodi.pt',
    siteName: defaultMessages.siteTitle,
    title: defaultMessages.metadata.home.title,
    description: defaultMessages.siteDescription,
    locale: 'pt_PT'
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultMessages.metadata.home.title,
    description: defaultMessages.siteDescription
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg'
  },
  alternates: {
    canonical: '/'
  }
}

const fontClass = `${inter.variable} ${sora.variable}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body className={fontClass}>
        <SiteTextProvider>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
              <SiteHeader />
              <main className="flex-1 bg-background">{children}</main>
              <SiteFooter />
            </div>
          </ThemeProvider>
        </SiteTextProvider>
      </body>
    </html>
  )
}
