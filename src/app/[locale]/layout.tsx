import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LanguageSetter } from "@/components/layout/language-setter";
import { TranslationProvider } from "@/components/layout/translation-provider";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!isLocale(locale)) {
    return {};
  }

  const messages = await getDictionary(locale);

  return {
    title: {
      default: messages.brand.name,
      template: `%s · ${messages.brand.name}`,
    },
    description: messages.hero.subtitle,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((entry) => [entry, `/${entry}`])),
    },
    openGraph: {
      title: messages.hero.title,
      description: messages.hero.subtitle,
      locale,
      siteName: messages.brand.name,
      type: "website",
      emails: [messages.contact.primary, messages.contact.support],
    },
  } satisfies Metadata;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getDictionary(locale);

  return (
    <TranslationProvider locale={locale} messages={messages}>
      <LanguageSetter locale={locale} />
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </TranslationProvider>
  );
}
