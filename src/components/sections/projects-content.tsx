'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { useSiteText } from '@/lib/hooks/use-site-text';

import { buttonVariants } from '../ui/button';
import { Card } from '../ui/card';

export function ProjectsContent() {
  const { text } = useSiteText();

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground/70">
          Produtos Monynha
        </p>
        <h1 className="text-3xl font-semibold md:text-4xl">{text.metadata.projects.title}</h1>
        <p className="max-w-2xl text-foreground/80">{text.projects.intro}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {text.projects.cards.map((card) => (
          <Card key={card.title} className="flex h-full flex-col justify-between">
            <Card.Header>
              <Card.Title>{card.title}</Card.Title>
              <Card.Description>{card.description}</Card.Description>
            </Card.Header>
            <Card.Content>
              <Link className={buttonVariants({ variant: 'ghost', size: 'sm' })} href="#">
                {card.linkLabel}
                <ChevronRight aria-hidden className="h-4 w-4" />
              </Link>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
