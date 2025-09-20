import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/page-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { defaultLanguage, getMetadata } from '@/config/i18n';

export const metadata: Metadata = {
  title: getMetadata(defaultLanguage, 'about').title,
  description: getMetadata(defaultLanguage, 'about').description,
  openGraph: {
    title: getMetadata(defaultLanguage, 'about').title,
    description: getMetadata(defaultLanguage, 'about').description
  }
};

const principles = [
  {
    id: 'comunidade',
    title: 'Comunidade em primeiro lugar',
    description: 'Decisões, produtos e serviços são co-desenhados com estudantes, educadores e parceiros institucionais.'
  },
  {
    id: 'abertura',
    title: 'Abertura radical',
    description: 'Licenças abertas, governança transparente e documentação pública em português garantem acesso para todas as pessoas.'
  },
  {
    id: 'aprendizado',
    title: 'Aprendizado contínuo',
    description: 'Combinamos dados, feedback qualitativo e avaliação participativa para evoluir experiências formativas.'
  }
];

const SobrePage = () => (
  <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-12 md:px-6 md:py-16">
    <PageHero metadataKey="about">
      <p className="text-base text-muted-foreground">
        Somos uma comunidade aberta que aproxima universidade, território e tecnologia para criar soluções educacionais inclusivas. A FACODI é feita por pessoas que acreditam na força da colaboração e na criatividade coletiva.
      </p>
    </PageHero>
      <section aria-labelledby="principios" className="space-y-6">
        <div>
          <h2 id="principios" className="font-heading text-2xl font-semibold text-foreground">
            Princípios que nos guiam
          </h2>
          <p className="text-sm text-muted-foreground">
            Cada iniciativa considera inclusão, sustentabilidade e impacto social em todas as etapas.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section aria-labelledby="metodologia" className="space-y-4">
        <h2 id="metodologia" className="font-heading text-2xl font-semibold text-foreground">
          Como trabalhamos
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>Laboratórios de prototipação rápida conectando estudantes a desafios reais.</li>
          <li>Programas de residência tecnológica com mentoria multidisciplinar.</li>
          <li>Documentação aberta com guias, tutoriais e histórias de aprendizagem.</li>
          <li>Rotas de pesquisa e extensão integradas às demandas da comunidade.</li>
        </ul>
      </section>
  </div>
);

export default SobrePage;
