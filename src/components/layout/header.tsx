"use client";

import Link from "next/link";

import { useTranslations } from "@/components/layout/translation-provider";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  const { locale, messages } = useTranslations();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <a
        href="#main-content"
        className="absolute left-4 top-4 -translate-y-16 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {messages.navigation.skip}
      </a>
      <div className="container flex items-center justify-between gap-6 py-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-lg font-semibold"
          aria-label={messages.brand.tagline}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            MF
          </span>
          <span>{messages.brand.name}</span>
        </Link>
        <nav
          className="hidden items-center gap-6 text-sm font-medium md:flex"
          aria-label={messages.navigation.main}
        >
          <Link
            href={`/${locale}`}
            className="text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {messages.navigation.home}
          </Link>
          <Link
            href={`/${locale}/components`}
            className="text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {messages.navigation.components}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild>
            <Link href="https://github.com/monynha" target="_blank" rel="noopener noreferrer">
              {messages.navigation.github}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
