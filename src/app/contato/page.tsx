import type { Metadata } from 'next';

import { ContactForm } from '@/components/sections/contact-form';
import { ContactIntro } from '@/components/sections/contact-intro';
import { PageHero } from '@/components/sections/page-hero';
import { Card, CardContent } from '@/components/ui/card';
import { defaultLanguage, getMetadata } from '@/config/i18n';

export const metadata: Metadata = {
  title: getMetadata(defaultLanguage, 'contact').title,
  description: getMetadata(defaultLanguage, 'contact').description,
  openGraph: {
    title: getMetadata(defaultLanguage, 'contact').title,
    description: getMetadata(defaultLanguage, 'contact').description
  }
};

const ContatoPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-12 md:flex-row md:px-6 md:py-16">
    <div className="flex-1 space-y-6">
      <PageHero metadataKey="contact" />
      <Card>
        <ContactIntro />
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
    <aside className="w-full space-y-6 rounded-xl border border-border bg-card/70 p-6 shadow-soft md:w-80">
      <h2 className="font-heading text-xl font-semibold text-foreground">Informações rápidas</h2>
      <ul className="space-y-3 text-sm text-muted-foreground">
        <li>
          <strong className="block text-foreground">Tempo de resposta</strong>
          Geralmente respondemos em até 3 dias úteis com um plano de acompanhamento.
        </li>
        <li>
          <strong className="block text-foreground">Canais abertos</strong>
          Encontros quinzenais, Discord e newsletters temáticas.
        </li>
        <li>
          <strong className="block text-foreground">Fuso horário</strong>
          Horário de Lisboa (UTC+0 / UTC+1 no verão).
        </li>
      </ul>
    </aside>
  </div>
);

export default ContatoPage;
