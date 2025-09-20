'use client';

import type { Route } from 'next';
import Link from 'next/link';

import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { useSiteText } from '@/hooks/use-site-text';
import { cn } from '@/lib/utils';

const navLinkClass =
  'rounded-lg px-3 py-2 text-sm font-medium text-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export const SiteHeader = () => {
  const { copy } = useSiteText();

  const links: Array<{ href: Route; label: string }> = [
    { href: '/', label: copy.navigation.home },
    { href: '/sobre', label: copy.navigation.about },
    { href: '/projetos', label: copy.navigation.projects },
    { href: '/contato', label: copy.navigation.contact }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-hero-gradient font-heading text-lg text-primary-foreground shadow-glow">
              F
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-base font-semibold">{copy.site.title}</span>
              <span className="text-xs text-muted-foreground">{copy.site.tagline}</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <nav aria-label={copy.navigation.menu} className="mt-3 flex flex-wrap gap-1 text-sm md:justify-center">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn(navLinkClass)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
