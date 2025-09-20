'use client';

import Link from 'next/link';

import { useSiteText } from '@/components/providers/language-provider';

export function SiteFooter() {
  const text = useSiteText();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-light/60 bg-surface-light/80 py-10 text-sm text-foreground-light backdrop-blur-md dark:border-border-dark/60 dark:bg-surface-dark/80 dark:text-foreground-dark">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-semibold">FACODI · Monynha</p>
          <p className="max-w-xl text-muted-light dark:text-muted-dark">
            {text.footer.note}
          </p>
          <p className="text-xs text-muted-light dark:text-muted-dark">
            {text.footer.rights.replace('{year}', year.toString())}
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-wrap items-center gap-3">
          <Link className="hover:text-brand-600" href="/sobre">
            {text.navigation.about}
          </Link>
          <Link className="hover:text-brand-600" href="/projetos">
            {text.navigation.projects}
          </Link>
          <Link className="hover:text-brand-600" href="/contato">
            {text.navigation.contact}
          </Link>
          <a className="hover:text-brand-600" href="https://github.com/facodi" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
