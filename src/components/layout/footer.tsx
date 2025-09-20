'use client';

import Link from 'next/link';
import { Github, Heart } from 'lucide-react';
import { useSiteText } from '@/hooks/use-site-text';

export function Footer(): JSX.Element {
  const {
    labels: { footer, title }
  } = useSiteText();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/40 bg-background/70">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-semibold text-primary-500">{title}</h2>
          <p className="max-w-prose text-sm text-foreground/70">{footer.mission}</p>
          <div className="flex items-center gap-3 text-sm text-foreground/70">
            <Heart className="size-4 text-secondary-500" aria-hidden />
            <span>{footer.community}</span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <Link
            href="https://github.com/Monynha-Softwares"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-500 transition hover:bg-primary-500/20"
          >
            <Github className="size-4" aria-hidden />
            GitHub
          </Link>
          <p className="text-xs text-foreground/60">{`${footer.copyright}${year}`}</p>
        </div>
      </div>
    </footer>
  );
}
