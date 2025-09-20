'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useSiteText } from '@/lib/hooks/use-site-text';

import { buttonVariants } from '../ui/button';

export function HeroSection() {
  const { text } = useSiteText();

  return (
    <section className="relative overflow-hidden rounded-[var(--radius-3xl)] border border-border/70 bg-background/80 p-10 shadow-soft">
      <div className="hero-gradient absolute inset-0 -z-10 opacity-90" aria-hidden />
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6 text-foreground">
          <p className="inline-flex items-center gap-2 rounded-full bg-highlight/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-highlight-foreground shadow-soft">
            {text.site.tagline}
          </p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            {text.home.heroTitle}
          </h1>
          <p className="max-w-xl text-base text-foreground/80 md:text-lg">
            {text.home.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonVariants({ size: 'lg' })} href="/projetos">
              {text.home.primaryCta}
            </Link>
            <Link className={buttonVariants({ size: 'lg', variant: 'secondary' })} href="/sobre">
              {text.home.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center md:justify-end">
          <Image
            src="/images/mascote-diploma.svg"
            alt="Cachorro caramelo do FACODI segurando um diploma"
            width={420}
            height={360}
            priority
            className="drop-shadow-[0_20px_45px_rgba(99,102,241,0.35)]"
          />
        </div>
      </div>
    </section>
  );
}
