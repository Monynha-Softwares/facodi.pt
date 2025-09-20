'use client';

import Link from 'next/link';

import { useSiteText } from '@/lib/site-text';

export function Footer() {
  const { copy } = useSiteText();

  return (
    <footer className="mt-16 border-t border-border/60 bg-background/80">
      <div className="container-safe grid gap-6 py-10 text-sm text-foreground/80 sm:grid-cols-2">
        <div>
          <p className="text-base font-semibold text-foreground">{copy.footer.title}</p>
          <p className="mt-2 max-w-lg text-muted">{copy.footer.description}</p>
        </div>
        <div className="space-y-2 sm:text-right">
          <Link className="block text-foreground transition hover:text-primary" href="/sobre">
            {copy.navigation.about}
          </Link>
          <Link className="block text-foreground transition hover:text-primary" href="/projetos">
            {copy.navigation.projects}
          </Link>
          <Link className="block text-foreground transition hover:text-primary" href="/contato">
            {copy.navigation.contact}
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 bg-background/60 py-4 text-center text-xs text-muted">
        {copy.footer.rights}
      </div>
    </footer>
  );
}
