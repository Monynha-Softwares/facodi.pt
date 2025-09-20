'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteText } from '@/lib/site-text';

const featureItems = [
  {
    title: 'Currículos vivos',
    description: 'Trilhas conectadas aos planos oficiais com atualização contínua e curadoria da comunidade.'
  },
  {
    title: 'Conteúdo público',
    description: 'Aulas e materiais do YouTube, blogs e podcasts organizados por tópicos e objetivos de aprendizagem.'
  },
  {
    title: 'Progresso transparente',
    description: 'Acompanhe playlists concluídas e retome de onde parou com um painel simples e acessível.'
  }
];

export function HomeView() {
  const { copy } = useSiteText();

  return (
    <div className="space-y-16">
      <section className="grid gap-10 rounded-2xl border border-border/70 bg-card/70 p-8 shadow-soft backdrop-blur lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{copy.hero.title}</h1>
          <p className="text-lg text-foreground/80">{copy.hero.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/projetos">{copy.hero.ctaPrimary}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="https://monynha.com" target="_blank" rel="noreferrer">
                {copy.hero.ctaSecondary}
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-[3/2] w-full">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/60 via-secondary/40 to-transparent blur-3xl" />
          <Image
            src="/images/hero-abstract.svg"
            alt="Ilustração abstrata representando conexões de aprendizagem"
            fill
            className="rounded-3xl object-cover"
            priority
          />
        </div>
      </section>
      <section aria-labelledby="features-heading" className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 id="features-heading" className="text-3xl font-semibold">
            Porque o FACODI é diferente
          </h2>
          <p className="text-base text-foreground/80">
            Combinamos curadoria humana com ferramentas abertas para oferecer jornadas inclusivas que cabem no seu tempo e no seu bolso.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featureItems.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-primary/40 bg-primary/10 p-8 text-center shadow-soft">
        <h2 className="text-2xl font-semibold">Explicação curta do FACODI</h2>
        <p className="mx-auto mt-3 max-w-3xl text-base text-foreground/80">
          O FACODI é um portal EAD gratuito que transforma currículos oficiais em trilhas de estudo baseadas em conteúdo público (como YouTube), com organização por cursos, disciplinas e tópicos e um acompanhamento simples de progresso.
        </p>
      </section>
    </div>
  );
}
