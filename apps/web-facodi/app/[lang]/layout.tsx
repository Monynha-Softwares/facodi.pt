import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { siteConfig } from "@monynha/config";
import { locales, t, type Locale } from "@monynha/i18n";
import { Button } from "@monynha/ui";

import { LanguageSwitcher } from "../../components/language-switcher";

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang as Locale;

  if (!locales.includes(lang)) {
    notFound();
  }

  return (
    <body className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href={`/${lang}`} className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-gradient text-2xl shadow-md">
              🐕
            </span>
            <div className="text-left">
              <span className="block text-xs font-medium uppercase tracking-[0.3em] text-primary/80">
                FACODI
              </span>
              <span className="font-heading text-base font-semibold text-foreground">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href={`/${lang}/cursos`} className="text-foreground/80 hover:text-foreground">
              {t(lang, "nav.courses")}
            </Link>
            <Link href={`/${lang}/sobre`} className="text-foreground/80 hover:text-foreground">
              {t(lang, "nav.about")}
            </Link>
            <Link
              href="https://discord.gg/monynha"
              className="text-foreground/80 hover:text-foreground"
            >
              {t(lang, "nav.community")}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="https://github.com/monynha/facodi" target="_blank" rel="noreferrer">
                GitHub
              </Link>
            </Button>
            <LanguageSwitcher currentLocale={lang} />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-12">{children}</main>
      <footer className="border-t border-primary/10 bg-white/80 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            {siteConfig.name} · {siteConfig.tagline}
          </p>
          <p>
            <span className="font-semibold">Contato:</span> <a href={siteConfig.contact}>{siteConfig.contact}</a>
          </p>
        </div>
      </footer>
    </body>
  );
}
