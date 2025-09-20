'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useSiteText } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function HomeContent() {
  const text = useSiteText();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <section className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-brand-600/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-600">
            {text.home.hero.eyebrow}
          </span>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground-light md:text-5xl dark:text-foreground-dark">
            {text.home.hero.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-light dark:text-muted-dark">
            {text.home.hero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/projetos">
              <Button size="lg">{text.home.hero.primaryCta}</Button>
            </Link>
            <Link href="/sobre">
              <Button variant="secondary" size="lg">
                {text.home.hero.secondaryCta}
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-brand-500/40 via-transparent to-accent/20 blur-3xl" />
          <Image
            src="/monynha-orb.svg"
            alt="Ilustração abstrata com formas circulares coloridas"
            width={360}
            height={360}
            className="relative drop-shadow-xl"
            priority
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {text.home.highlights.map((item, index) => (
          <Card key={item}>
            <CardHeader>
              <CardTitle>{item}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{text.about.values[index] ?? text.about.mission}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
