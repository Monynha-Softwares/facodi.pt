'use client';

import type { Route } from 'next';
import Link from 'next/link';

import { useSiteText } from '@/hooks/use-site-text';

export const SiteFooter = () => {
  const { copy } = useSiteText();
  const year = new Date().getFullYear();

  const links: Array<{ href: Route; label: string }> = [
    { href: '/', label: copy.navigation.home },
    { href: '/sobre', label: copy.navigation.about },
    { href: '/projetos', label: copy.navigation.projects },
    { href: '/contato', label: copy.navigation.contact }
  ];

  return (
    <footer className="border-t border-border/60 bg-background/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:justify-between md:px-6">
        <div className="max-w-xl space-y-3">
          <p className="text-xs uppercase tracking-wide text-primary">{copy.footer.community}</p>
          <p className="font-heading text-2xl font-semibold leading-tight">{copy.site.description}</p>
          <p className="text-sm text-muted-foreground">{copy.footer.mission}</p>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-foreground">{copy.navigation.menu}</span>
          <nav className="flex flex-wrap gap-2 text-sm text-muted-foreground" aria-label={copy.navigation.menu}>
            {links.map((link) => (
              <Link key={link.href} className="rounded-lg px-3 py-1 transition hover:bg-muted/40" href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-muted-foreground">© {year} {copy.site.title}. {copy.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};
