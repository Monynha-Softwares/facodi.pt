'use client';

import type { MetadataKey } from '@/config/i18n';
import { useSiteText } from '@/hooks/use-site-text';

type PageHeroProps = {
  metadataKey: MetadataKey;
  eyebrow?: string;
  children?: React.ReactNode;
};

export const PageHero = ({ metadataKey, eyebrow, children }: PageHeroProps) => {
  const { copy } = useSiteText();
  const data = copy.metadata[metadataKey];

  return (
    <header className="space-y-4">
      {eyebrow ? <p className="text-sm uppercase tracking-wide text-primary">{eyebrow}</p> : null}
      <h1 className="font-heading text-4xl font-semibold text-foreground">{data.title}</h1>
      <p className="text-base text-muted-foreground">{data.description}</p>
      {children}
    </header>
  );
};
