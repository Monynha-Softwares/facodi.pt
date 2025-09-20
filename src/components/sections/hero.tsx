'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteText } from '@/hooks/use-site-text';

export function Hero(): JSX.Element {
  const {
    labels: { title, description, tagline, heroCta }
  } = useSiteText();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 rounded-[3rem] border border-border/40 bg-card/80 px-8 py-16 text-center shadow-lg shadow-primary-500/10"
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-500">
        <Sparkles className="size-4" aria-hidden />
        <span>{tagline}</span>
      </div>
      <div className="space-y-6">
        <h1
          id="hero-heading"
          className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl"
        >
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-foreground/80">{description}</p>
      </div>
      <Button asChild size="lg" className="shadow-lg shadow-primary-500/30">
        <Link href="/courses">{heroCta}</Link>
      </Button>
    </section>
  );
}
