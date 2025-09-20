import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buildPageMetadata, defaultLocale } from '@/config/i18n'

const metadataInfo = buildPageMetadata(defaultLocale, 'home')

export const metadata: Metadata = {
  title: metadataInfo.title,
  description: metadataInfo.description
}

const highlights = [
  {
    title: 'Comunidades criativas',
    description:
      'Projetos colaborativos com coletivos e organizações que impulsionam habilidades digitais em territórios periféricos.'
  },
  {
    title: 'Aprendizagem aberta',
    description:
      'Currículos vivos, trilhas e workshops abertos que combinam tecnologia, design e impacto social.'
  },
  {
    title: 'Tecnologia responsável',
    description: 'Boas práticas de acessibilidade, privacidade e governança de dados desde o primeiro protótipo.'
  }
] as const

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-background via-background to-background/80">
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(67,56,202,0.25),_transparent_60%)]" />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-20 text-center md:flex-row md:items-start md:text-left">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
              Educação • Comunidade • Código aberto
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Experiências digitais que aproximam pessoas e futuros possíveis
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Na FACODI exploramos tecnologia, criatividade e cidadania com programas livres, laboratórios de prototipagem e projetos de impacto. Tudo com foco em acessibilidade, inclusão e sustentabilidade.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/projetos">Conheça os projetos</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contato">Vamos conversar</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <Image
              alt="Ilustração abstrata com gradientes azuis e roxos"
              className="w-full rounded-3xl shadow-soft"
              height={400}
              priority
              src="/images/hero-illustration.svg"
              width={600}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          {highlights.map((highlight) => (
            <Card key={highlight.title}>
              <CardHeader>
                <CardTitle>{highlight.title}</CardTitle>
                <CardDescription>{highlight.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[2fr,3fr]">
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-semibold text-foreground">Laboratórios que conectam pesquisa e prática</h2>
            <p className="text-base text-muted-foreground">
              Cada frente da FACODI é organizada em comunidades de prática que documentam processos, compartilham ferramentas e constroem produtos digitais acessíveis. Os laboratórios funcionam como espaços de experimentação contínua com mentoria coletiva e avaliação aberta.
            </p>
            <p className="text-base text-muted-foreground">
              Além das jornadas formativas, facilitamos residências criativas, programas com escolas públicas, hackdays e publicações abertas. A plataforma integra conteúdos em português, espanhol, inglês e francês para fortalecer redes plurilíngues.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Currículos vivos</CardTitle>
                <CardDescription>
                  Trilhas modulares e recursos multimídia que acompanham as transformações das tecnologias emergentes.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Mentorias coletivas</CardTitle>
                <CardDescription>
                  Encontros síncronos e assíncronos com especialistas convidades para apoiar projetos colaborativos.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="h-full sm:col-span-2">
              <CardHeader>
                <CardTitle>Infraestrutura aberta</CardTitle>
                <CardDescription>
                  Stack baseada em software livre, design system compartilhado e ferramentas de governança distribuída.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Estamos consolidando integrações com plataformas comunitárias, analytics ético e automações de acessibilidade para garantir experiências consistentes e responsáveis em todos os pontos de contato.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
