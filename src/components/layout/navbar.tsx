'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { GraduationCap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useSiteText } from '@/hooks/use-site-text';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';

export function Navbar(): JSX.Element {
  const pathname = usePathname();
  const {
    labels: { nav, heroCta },
    labels
  } = useSiteText();

  const navLinks: { label: string; href: Route }[] = [
    { label: nav.home, href: '/' },
    { label: nav.courses, href: '/courses' },
    { label: nav.roadmap, href: '/roadmap' },
    { label: nav.contact, href: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-border/50 bg-background/80 px-6 py-4 shadow-sm shadow-primary-500/10">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-2 text-sm font-semibold text-primary-500">
            <GraduationCap className="size-5" aria-hidden />
            <span className="font-display">FACODI</span>
            <span className="sr-only">{labels.title}</span>
          </Link>
          <nav aria-label="Menu principal">
            <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-foreground/80">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'rounded-full px-3 py-2 transition hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      pathname === item.href && 'bg-primary-500/10 text-primary-500'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild className="hidden md:inline-flex">
            <Link href="/courses">{heroCta}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
