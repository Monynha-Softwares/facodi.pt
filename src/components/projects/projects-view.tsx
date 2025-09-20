'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteText } from '@/lib/site-text';

const projectItems = [
  {
    name: 'FACODI Portal',
    description: 'Plataforma principal com trilhas curriculares, playlists públicas e acompanhamento de progresso.'
  },
  {
    name: 'Monynha Docs',
    description: 'Documentação viva com padrões de design, tokens e guidelines técnicas para todo o ecossistema.'
  },
  {
    name: 'Monynha Lab',
    description: 'Experimentos abertos em acessibilidade, automação e templates para acelerar novos produtos.'
  }
];

export function ProjectsView() {
  const { copy } = useSiteText();

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">{copy.projects.title}</h1>
        <p className="text-lg text-foreground/80">{copy.projects.description}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {projectItems.map((project) => (
          <Card key={project.name} className="flex h-full flex-col">
            <CardHeader className="flex flex-1 flex-col">
              <CardTitle>{project.name}</CardTitle>
              <CardDescription className="flex-1 text-base">
                {project.description}
              </CardDescription>
              <span className="mt-4 text-sm font-semibold text-primary">Em breve</span>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
