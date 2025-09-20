'use client';

import { useSiteText } from '@/lib/hooks/use-site-text';

import { Card } from '../ui/card';

export function HighlightsSection() {
  const { text } = useSiteText();

  return (
    <section aria-labelledby="destaques" className="mt-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground/70">
            Monynha vibes
          </p>
          <h2 id="destaques" className="text-2xl font-semibold">
            Trilhas guiadas pelo mascote caramelo
          </h2>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {text.home.highlights.map((highlight) => (
          <Card key={highlight.title} className="h-full">
            <Card.Header>
              <Card.Title>{highlight.title}</Card.Title>
              <Card.Description>{highlight.description}</Card.Description>
            </Card.Header>
          </Card>
        ))}
      </div>
    </section>
  );
}
