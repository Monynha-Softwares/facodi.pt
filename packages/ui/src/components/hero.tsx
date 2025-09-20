import Link from "next/link";
import * as React from "react";

import { Button } from "./button";

export interface HeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  illustration?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  onCtaClick,
  illustration,
}) => {
  const button = (
    <Button size="lg" onClick={onCtaClick} asChild={Boolean(ctaHref)}>
      {ctaHref ? <Link href={ctaHref}>{ctaLabel}</Link> : ctaLabel}
    </Button>
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-10 shadow-lg">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
            Educação comunitária, gratuita e aberta
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
          {button}
        </div>
        <div className="relative mx-auto flex h-64 w-full max-w-sm items-center justify-center">
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary/40 via-secondary/30 to-secondary/10 blur-3xl" />
          {illustration ?? (
            <span className="text-6xl" role="img" aria-label="Cachorro caramelo feliz">
              🐕
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
