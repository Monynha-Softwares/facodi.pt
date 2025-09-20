'use client';

import Link from 'next/link';

import { useSiteText } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';

export function NotFoundContent() {
  const text = useSiteText();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
        404
      </span>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground-light dark:text-foreground-dark">
        {text.notFound.title}
      </h1>
      <p className="max-w-xl text-lg text-muted-light dark:text-muted-dark">{text.notFound.description}</p>
      <Button asChild size="lg">
        <Link href="/">{text.notFound.cta}</Link>
      </Button>
    </div>
  );
}
