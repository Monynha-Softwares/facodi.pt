'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useSiteText } from '@/hooks/use-site-text';

export const HeroSection = () => {
  const { copy } = useSiteText();

  return (
    <section className="relative overflow-hidden rounded-[calc(var(--radius-xl)*1.2)] border border-border/60 bg-hero-gradient px-6 py-16 text-primary-foreground shadow-glow">
      <div className="absolute inset-y-0 right-0 hidden max-w-sm translate-x-1/4 md:block">
        <Image
          src="/images/monynha-mascot.svg"
          alt="Cachorro caramelo estudando com um laptop"
          fill
          className="object-contain"
          priority
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 280px, 0px"
        />
      </div>
      <div className="relative z-10 flex max-w-2xl flex-col gap-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
          {copy.footer.community}
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
          {copy.site.tagline}
        </h1>
        <p className="max-w-xl text-base text-white/90 md:text-lg">{copy.site.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contato">{copy.navigation.contact}</Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="border border-white/40 bg-white/10 text-white hover:bg-white/20">
            <Link href="/projetos">{copy.navigation.projects}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
