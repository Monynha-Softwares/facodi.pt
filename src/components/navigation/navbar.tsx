'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAvailableLocales, useSiteText } from '@/lib/site-text';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { copy, locale, setLocale } = useSiteText();
  const pathname = usePathname();
  const locales = useAvailableLocales();

  const links = useMemo(
    () => [
      { href: '/' as const, label: copy.navigation.home },
      { href: '/sobre' as const, label: copy.navigation.about },
      { href: '/projetos' as const, label: copy.navigation.projects },
      { href: '/contato' as const, label: copy.navigation.contact }
    ],
    [copy]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container-safe flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
            F
          </span>
          FACODI
        </Link>
        <nav aria-label="Menu principal" className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none',
                  isActive ? 'text-primary' : 'text-foreground/80'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="locale-switcher">
            Selecionar idioma
          </label>
          <select
            id="locale-switcher"
            className="hidden rounded-2xl border border-border bg-card px-3 py-2 text-sm text-foreground shadow-soft focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 md:block"
            value={locale}
            onChange={(event) => setLocale(event.target.value as typeof locale)}
          >
            {locales.map((value) => (
              <option key={value} value={value}>
                {value.toUpperCase()}
              </option>
            ))}
          </select>
          <ThemeToggle />
          <Button asChild className="md:hidden" variant="secondary">
            <Link href="/contato">{copy.navigation.contact}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
