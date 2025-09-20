import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/page-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { defaultLanguage, getMetadata } from '@/config/i18n';
import { projects } from '@/lib/projects';

const statusDetails: Record<(typeof projects)[number]['status'], { label: string; description: string }> = {
  ativo: {
    label: 'Em andamento',
    description: 'Projetos com entregas regulares e comunidade ativa.'
  },
  laboratorio: {
    label: 'Laboratório',
    description: 'Explorações experimentais em fase de pesquisa e prototipação.'
  },
  prototipo: {
    label: 'Protótipo',
    description: 'Conceitos validados que buscam colaboradores para avançar para a fase ativa.'
  }
};

export const metadata: Metadata = {
  title: getMetadata(defaultLanguage, 'projects').title,
  description: getMetadata(defaultLanguage, 'projects').description,
  openGraph: {
    title: getMetadata(defaultLanguage, 'projects').title,
    description: getMetadata(defaultLanguage, 'projects').description
  }
};

const ProjetosPage = () => (
  <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 md:px-6 md:py-16">
    <PageHero metadataKey="projects" eyebrow="Portfólio FACODI">
      <p className="max-w-2xl text-base text-muted-foreground">
        Cada projeto nasce de um desafio real partilhado entre estudantes, docentes e comunidades locais. Acompanhe as frentes em andamento e descubra como contribuir com código, documentação, facilitação ou mentoria.
      </p>
    </PageHero>
    <section aria-labelledby="status" className="space-y-4">
      <h2 id="status" className="font-heading text-2xl font-semibold text-foreground">
        Estágios de desenvolvimento
      </h2>
      <dl className="grid gap-4 md:grid-cols-3">
        {Object.entries(statusDetails).map(([status, value]) => (
          <div key={status} className="rounded-xl border border-border bg-card/70 p-4 shadow-soft">
            <dt className="font-heading text-lg font-semibold text-foreground">{value.label}</dt>
            <dd className="mt-2 text-sm text-muted-foreground">{value.description}</dd>
          </div>
        ))}
      </dl>
    </section>
    <section aria-labelledby="lista-projetos" className="space-y-6">
      <h2 id="lista-projetos" className="font-heading text-2xl font-semibold text-foreground">
        Lista de projetos
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="space-y-2">
              <CardTitle>{project.title}</CardTitle>
              <span className="inline-flex w-fit items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                {statusDetails[project.status].label}
              </span>
            </CardHeader>
            <CardContent>
              <CardDescription>{project.summary}</CardDescription>
              {project.link ? (
                <a
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir repositório
                </a>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </div>
);

export default ProjetosPage;
