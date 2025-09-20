import type { Metadata } from 'next';
import { ClipboardCheck, Cog, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { resolveSiteText } from '@/config/i18n';

const site = resolveSiteText();

const roadmapItems = [
  {
    quarter: 'Q1 2025',
    icon: ClipboardCheck,
    title: 'Sincronização automática de progresso',
    description: 'Checkpoint por aula com Supabase, histórico pessoal e badges compartilháveis.'
  },
  {
    quarter: 'Q2 2025',
    icon: Cog,
    title: 'Painel de mentoria e clubes',
    description: 'Match entre estudantes e mentores, calendário de sessões ao vivo e materiais guiados.'
  },
  {
    quarter: 'Q3 2025',
    icon: Rocket,
    title: 'Experiências imersivas',
    description: 'Laboratórios multiusuário, simulações gamificadas e desafios de portfólio com feedback coletivo.'
  }
];

export const metadata: Metadata = {
  title: `${site.title} · Roadmap`,
  description:
    'Conheça o roadmap da FACODI e saiba quais funcionalidades estamos construindo para a comunidade.',
  openGraph: {
    title: `${site.title} · Roadmap`,
    description: 'Transparência total sobre as próximas entregas da comunidade FACODI.',
    url: 'https://facodi.pt/roadmap'
  }
};

export default function RoadmapPage(): JSX.Element {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-secondary-500">Visão</p>
        <h1 className="font-display text-4xl font-semibold text-foreground">Roadmap público</h1>
        <p className="max-w-2xl text-base text-foreground/75">
          Transparência radical sobre o que estamos desenvolvendo, com foco em experiência de aprendizado e ferramentas para a comunidade.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {roadmapItems.map(({ quarter, title, description, icon: Icon }) => (
          <Card key={title} className="h-full">
            <CardHeader className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-500/80">{quarter}</span>
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary-500/10 text-secondary-500">
                <Icon className="size-6" aria-hidden />
              </span>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
