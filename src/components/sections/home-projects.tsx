'use client';

import { useSiteText } from '@/lib/hooks/use-site-text';

import { Card } from '../ui/card';

export function HomeProjectsTeaser() {
  const { text } = useSiteText();

  return (
    <section className="grid gap-6 md:grid-cols-3" aria-labelledby="ecosistema-monynha">
      <div className="md:col-span-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground/70">
          Ecossistema
        </p>
        <h2 id="ecosistema-monynha" className="text-2xl font-semibold">
          Produtos conectados pela Monynha Softwares
        </h2>
      </div>
      {text.projects.cards.map((card) => (
        <Card key={card.title} className="h-full">
          <Card.Header>
            <Card.Title>{card.title}</Card.Title>
            <Card.Description>{card.description}</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-sm font-semibold text-accent">{card.linkLabel}</p>
          </Card.Content>
        </Card>
      ))}
    </section>
  );
}
