'use client';

import { CheckCircle2, Headphones, Map, Users } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const highlights = [
  {
    id: 'curriculos-vivos',
    title: 'Currículos vivos',
    description: 'Mapeamos competências em tempo real para conectar estudantes a desafios reais da comunidade.',
    icon: Map
  },
  {
    id: 'mentorias-coletivas',
    title: 'Mentorias coletivas',
    description: 'Grupos de estudo e trilhas guiadas por voluntários e especialistas da rede.',
    icon: Users
  },
  {
    id: 'conteudo-aberto',
    title: 'Conteúdo aberto',
    description: 'Biblioteca multimédia gratuita com playlists, aulas abertas e material interativo.',
    icon: Headphones
  },
  {
    id: 'qualidade',
    title: 'Qualidade acessível',
    description: 'Processos de revisão, testes e análise de acessibilidade garantem experiências consistentes.',
    icon: CheckCircle2
  }
];

export const HighlightsSection = () => (
  <section className="grid gap-4 md:grid-cols-2">
    {highlights.map(({ id, title, description, icon: Icon }) => (
      <Card key={id}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card/70 text-primary shadow-soft">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    ))}
  </section>
);
