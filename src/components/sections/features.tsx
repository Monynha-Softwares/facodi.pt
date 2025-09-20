import { Lightbulb, ShieldCheck, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const featureItems = [
  {
    icon: Users,
    title: 'Comunidade acolhedora',
    description:
      'Mentoria colaborativa, grupos de estudo temáticos e encontros mensais com especialistas convidados.'
  },
  {
    icon: Lightbulb,
    title: 'Trilhas vivas',
    description:
      'Curadoria contínua das playlists e materiais para manter o currículo atualizado, vibrante e relevante.'
  },
  {
    icon: ShieldCheck,
    title: 'Acessibilidade por padrão',
    description:
      'Design com contraste AA, navegação por teclado, legendas e materiais em texto alternativo para todos.'
  }
];

export function Features(): JSX.Element {
  return (
    <section aria-labelledby="features-heading" className="mx-auto mt-24 w-full max-w-6xl">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-secondary-500">Experiência Monynha</p>
        <h2 id="features-heading" className="font-display text-3xl font-semibold text-foreground">
          Aprendizado que abraça, emociona e transforma
        </h2>
        <p className="mx-auto max-w-2xl text-base text-foreground/75">
          Cada detalhe da plataforma foi pensado para oferecer uma jornada inclusiva, documentada e com DX de primeira para quem
          constrói e quem aprende.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {featureItems.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="h-full">
            <CardHeader className="flex flex-col gap-4">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500">
                <Icon className="size-6" aria-hidden />
              </span>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
