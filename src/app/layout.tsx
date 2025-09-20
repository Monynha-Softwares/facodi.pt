import type { Metadata } from 'next';
import { JetBrains_Mono, Inter, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { RootProviders } from '@/components/providers/root-providers';
import { defaultLocale, getSiteCopy } from '@/config/i18n';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const jetBrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const defaultCopy = getSiteCopy(defaultLocale);

export const metadata: Metadata = {
    metadataBase: new URL('https://facodi.pt'),
    title: defaultCopy.meta.title,
    description: defaultCopy.meta.description,
    openGraph: {
        title: defaultCopy.meta.ogTitle,
        description: defaultCopy.meta.ogDescription,
        url: 'https://facodi.pt',
        siteName: 'FACODI',
        locale: 'pt_BR',
        type: 'website'
    },
    alternates: {
        canonical: '/',
        languages: {
            pt: '/',
            en: '/en',
            es: '/es',
            fr: '/fr'
        }
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang={defaultLocale} suppressHydrationWarning>
            <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrains.variable} font-sans`}>
                <RootProviders>
                    <div className="relative flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </RootProviders>
            </body>
        </html>
    );
}
