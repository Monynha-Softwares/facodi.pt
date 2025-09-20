import type { Metadata } from 'next'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildPageMetadata, defaultLocale } from '@/config/i18n'

const metadataInfo = buildPageMetadata(defaultLocale, 'about')

export const metadata: Metadata = {
  title: metadataInfo.title,
  description: metadataInfo.description
}

const values = [
  {
    title: 'Cuidado radical',
    description:
      'Garantimos ambientes de aprendizagem seguros, com pactos de convivência e apoio emocional contínuo.'
  },
  {
    title: 'Tecnologias plurais',
    description:
      'Construímos soluções que respeitam diversidades culturais, linguísticas e tecnológicas.'
  },
  {
    title: 'Governança aberta',
    description:
      'Decisões compartilhadas com comunidades parceiras e transparência em processos e indicadores.'
  }
] as const

const team = [
  {
    name: 'Monynha Santos',
    role: 'Direção criativa e curadoria pedagógica'
  },
  {
    name: 'Equipe FACODI',
    role: 'Design, pesquisa, desenvolvimento e produção cultural'
  }
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <section className="space-y-4">
        <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
          Quem somos
        </span>
        <h1 className="font-display text-4xl font-semibold text-foreground">Sobre a FACODI</h1>
        <p className="text-lg text-muted-foreground">
          A Faculdade de Codificação Digital nasce da articulação entre cultura digital, educação pública e redes comunitárias.
          Atuamos como laboratório vivo onde experiências artísticas e tecnológicas se encontram para criar soluções em código aberto, acessíveis e alinhadas com justiça social.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title}>
            <CardHeader>
              <CardTitle>{value.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="font-display text-3xl font-semibold text-foreground">Nossa caminhada</h2>
        <div className="space-y-4 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-subtle">
          <p className="text-base text-muted-foreground">
            Desde 2021, co-criamos ações com escolas técnicas, organizações culturais e coletivos periféricos. A FACODI já apoiou mais de 40 projetos comunitários, formou 600 participantes em jornadas livres e lançou publicações que documentam metodologias replicáveis.
          </p>
          <p className="text-base text-muted-foreground">
            Nosso foco está em unir pesquisa aplicada, storytelling e tecnologia responsável para ampliar o acesso a oportunidades na economia digital. Trabalhamos com dados abertos, licenças permissivas e parcerias que fortalecem ecossistemas regionais.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-display text-3xl font-semibold text-foreground">Equipe e colaborações</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {team.map((member) => (
            <Card key={member.name}>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-base text-muted-foreground">
          A governança da FACODI é colaborativa e acolhe residentes, pessoas mentoras e organizações parceiras. Se você deseja construir programas, publicar pesquisas ou promover experiências híbridas conosco, envie uma mensagem via <a className="font-medium text-primary" href="/contato">formulário de contato</a>.
        </p>
      </section>
    </div>
  )
}
