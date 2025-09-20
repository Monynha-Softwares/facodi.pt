import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buildPageMetadata, defaultLocale } from '@/config/i18n'

const ContactForm = dynamic(() => import('@/components/forms/contact-form').then((mod) => mod.ContactForm), {
  loading: () => <p className="text-sm text-muted-foreground">Carregando formulário…</p>,
  ssr: false
})

const metadataInfo = buildPageMetadata(defaultLocale, 'contact')

export const metadata: Metadata = {
  title: metadataInfo.title,
  description: metadataInfo.description
}

const contactChannels = [
  {
    title: 'E-mail institucional',
    description: 'contato@facodi.pt — respondemos em até 3 dias úteis com uma proposta personalizada.'
  },
  {
    title: 'Redes comunitárias',
    description: 'Participamos de fóruns abertos e grupos focados em tecnologia, cultura e educação em múltiplos idiomas.'
  }
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
      <section className="space-y-3 text-center">
        <h1 className="font-display text-4xl font-semibold text-foreground">Vamos criar juntas?</h1>
        <p className="text-lg text-muted-foreground">
          Compartilhe sua ideia de projeto, demanda de formação ou parceria institucional. Retornamos com possibilidades alinhadas ao nosso manifesto.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Fale com a FACODI</CardTitle>
          <CardDescription>Preencha o formulário para iniciar uma conversa com nossa equipe.</CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>

      <section className="grid gap-6 md:grid-cols-2">
        {contactChannels.map((channel) => (
          <Card key={channel.title}>
            <CardHeader>
              <CardTitle>{channel.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{channel.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
