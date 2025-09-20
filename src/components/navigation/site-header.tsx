'use client';

import type { Route } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';

import type { NavigationKey } from '@/config/i18n';
import { useSiteText } from '@/lib/hooks/use-site-text';

import { LanguageSwitcher } from './language-switcher';

const ThemeToggle = dynamic(
  async () => {
    const themeModule = await import('../theme-toggle');
    return themeModule.ThemeToggle;
  },
  { ssr: false },
);

const navigationEntries = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/sobre' },
  { key: 'projects', href: '/projetos' },
  { key: 'contact', href: '/contato' },
] as const satisfies readonly { key: NavigationKey; href: Route }[];

type NavigationEntry = (typeof navigationEntries)[number];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { text } = useSiteText();
  const activeEntry =
    navigationEntries.find((entry) =>
      entry.href === '/' ? pathname === '/' : pathname.startsWith(entry.href),
    ) ?? navigationEntries[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3" aria-label={text.site.title}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-highlight/40 shadow-soft">
            <span aria-hidden className="text-2xl">
              🐶
            </span>
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">
              {text.site.title}
            </span>
            <span className="text-sm text-foreground/80">{text.site.tagline}</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {navigationEntries.map((entry) => {
            const isActive =
              entry.href === '/' ? pathname === '/' : pathname.startsWith(entry.href);
            return (
              <Link
                key={entry.key}
                href={entry.href}
                className={`text-sm font-semibold transition-colors hover:text-accent ${
                  isActive ? 'text-accent' : 'text-foreground/80'
                }`}
              >
                {text.navigation[entry.key]}
              </Link>
            );
          })}
        </nav>
        <div className="md:hidden">
          <label className="sr-only" htmlFor="mobile-nav">
            Navegação mobile
          </label>
          <select
            id="mobile-nav"
            className="h-10 rounded-[var(--radius-xl)] border border-border/60 bg-background/80 px-3 text-xs font-semibold text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={activeEntry.href}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const nextEntry: NavigationEntry | undefined = navigationEntries.find(
                (entry) => entry.href === event.target.value,
              );

              if (nextEntry) {
                router.push(nextEntry.href);
              }
            }}
          >
            {navigationEntries.map((entry) => (
              <option key={entry.key} value={entry.href}>
                {text.navigation[entry.key]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
