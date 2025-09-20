'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LanguageSwitcher } from '@/components/language-switcher';
import { useSiteText } from '@/components/providers/language-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const routes = [
  { href: '/', key: 'home' },
  { href: '/sobre', key: 'about' },
  { href: '/projetos', key: 'projects' },
  { href: '/contato', key: 'contact' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const text = useSiteText();

  return (
    <header className="sticky top-0 z-50 border-b border-border-light/60 bg-background-light/80 backdrop-blur-md transition dark:border-border-dark/60 dark:bg-background-dark/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-foreground-light dark:text-foreground-dark">
            {text.meta.title}
          </Link>
        </div>
        <nav aria-label="Navegação principal" className="hidden items-center gap-6 md:flex">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.key}
                href={route.href}
                className={cn(
                  'text-sm font-medium text-foreground-light transition hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-foreground-dark',
                  isActive && 'text-brand-600 dark:text-brand-400',
                )}
              >
                {text.navigation[route.key]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/contato"
            className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'hidden md:inline-flex')}
          >
            {text.navigation.contact}
          </Link>
        </div>
      </div>
    </header>
  );
}
