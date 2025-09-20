'use client';

import Image from 'next/image';

import { useSiteText } from '@/lib/hooks/use-site-text';

import { Card } from '../ui/card';

export function AboutContent() {
  const { text } = useSiteText();

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground/70">
          Sobre o FACODI
        </p>
        <h1 className="text-3xl font-semibold md:text-4xl">{text.metadata.about.title}</h1>
        <p className="max-w-2xl text-foreground/80">{text.about.intro}</p>
      </header>
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">{text.about.mission}</h2>
          <p className="text-base text-foreground/80">
            {text.site.description} O cachorro caramelo é nosso guia para manter a narrativa
            acolhedora e acessível.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {text.about.values.map((value) => (
              <Card key={value.title} className="h-full bg-background/70">
                <Card.Header>
                  <Card.Title>{value.title}</Card.Title>
                  <Card.Description>{value.description}</Card.Description>
                </Card.Header>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/mascote-chapeu.svg"
            alt="Cachorro caramelo com chapéu de formando"
            width={320}
            height={320}
            className="drop-shadow-[0_20px_45px_rgba(233,196,106,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}
