import type { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buildPageMetadata, defaultLocale } from '@/config/i18n'

const metadataInfo = buildPageMetadata(defaultLocale, 'projects')

export const metadata: Metadata = {
  title: metadataInfo.title,
  description: metadataInfo.description
}

const projects = [
  {
    title: 'Residência FACODI x Territórios Criativos',
    description:
      'Programa híbrido que conecta juventudes periféricas a laboratórios de design de serviços, prototipagem rápida e produção de podcasts.'
  },
  {
    title: 'Caderno Vivo de Acessibilidade Cultural',
    description:
      'Publicação aberta com roteiros, ferramentas e checklists para eventos híbridos acessíveis e seguros.'
  },
  {
    title: 'Rede de Mentoras Transfuturo',
    description:
      'Mentorias coletivas e bolsas de estudo para pessoas trans e travestis em tecnologia e economia criativa.'
  }
] as const

const callsToAction = [
  {
    title: 'Proponha um projeto',
    description: 'Estamos sempre abertas a novas parcerias com organizações, coletivos e pesquisadoras.',
    href: '/contato'
  },
  {
    title: 'Acesse o repositório aberto',
    description: 'Documentação, componentes e experimentos estão disponíveis no GitHub da FACODI.',
    href: 'https://github.com/facodi'
  }
] as const

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">
      <section className="space-y-4 text-center">
        <h1 className="font-display text-4xl font-semibold text-foreground">Projetos em curso</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Cada projeto nasce da escuta ativa com comunidades e instituições parceiras. Documentamos processos para que outras pessoas possam replicar, remixar e evoluir as soluções.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {callsToAction.map((action) => (
          <Card key={action.title}>
            <CardHeader>
              <CardTitle>{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary">
                <a href={action.href} target={action.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  Acessar
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
