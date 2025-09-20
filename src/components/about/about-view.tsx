'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteText } from '@/lib/site-text';

export function AboutView() {
  const { copy } = useSiteText();

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">{copy.about.title}</h1>
        <p className="text-lg text-foreground/80">{copy.about.description}</p>
      </header>
      <section aria-labelledby="mission-heading" className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle id="mission-heading">{copy.about.mission}</CardTitle>
            <CardDescription>
              A Monynha Softwares coordena o FACODI garantindo curadoria contínua, processos transparentes e foco em acessibilidade.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{copy.about.vision}</CardTitle>
            <CardDescription>
              Trabalhamos em rede com educadores, comunidades e voluntários para manter as trilhas atualizadas e relevantes.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
      <section className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold">Explicação curta da Monynha Softwares</h2>
        <p className="mt-3 text-base text-foreground/80">
          A Monynha Softwares é a guarda-chuva de produtos e sites com um padrão visual e técnico unificado — design minimalista e vibrante, acessibilidade, documentação clara e automação de qualidade para experiências consistentes.
        </p>
      </section>
    </article>
  );
}
