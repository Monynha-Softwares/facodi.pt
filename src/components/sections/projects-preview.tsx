'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { projects } from '@/lib/projects';

const statusLabels: Record<(typeof projects)[number]['status'], string> = {
  ativo: 'Em andamento',
  laboratorio: 'Laboratório',
  prototipo: 'Protótipo'
};

export const ProjectsPreview = () => (
  <section aria-labelledby="projects-preview" className="space-y-6">
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 id="projects-preview" className="font-heading text-3xl font-semibold text-foreground">
          Projetos em destaque
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Projetos colaborativos de impacto social, laboratórios experimentais e plataformas abertas que convidam a comunidade a participar.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link href="/projetos">Ver todos os projetos</Link>
      </Button>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader className="gap-2">
            <CardTitle>{project.title}</CardTitle>
            <span className="inline-flex w-fit items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
              {statusLabels[project.status]}
            </span>
          </CardHeader>
          <CardContent>
            <CardDescription>{project.summary}</CardDescription>
            {project.link ? (
              <Button asChild size="sm" variant="ghost" className="mt-4 w-fit px-0 text-primary">
                <a href={project.link} rel="noreferrer" target="_blank">
                  Acompanhar no GitHub
                </a>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);
