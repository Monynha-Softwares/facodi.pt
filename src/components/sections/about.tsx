import { CheckCircle2, HeartHandshake, Layers3 } from 'lucide-react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const pillars = [
    {
        icon: CheckCircle2,
        title: 'Qualidade aberta',
        description: 'Curadoria contínua de playlists em PT-BR, guias de estudo e materiais escritos para cada unidade curricular.'
    },
    {
        icon: Layers3,
        title: 'Arquitetura transparente',
        description: 'Todo o conteúdo versionado em Markdown, sincronizado com Supabase e acessível via API pública.'
    },
    {
        icon: HeartHandshake,
        title: 'Comunidade acolhedora',
        description: 'Mentorias, grupos de apoio e eventos para conectar estudantes e profissionais em formação.'
    }
] as const;

export function AboutSection(): JSX.Element {
    return (
        <section className="container mt-24" id="sobre">
            <div className="grid gap-12 lg:grid-cols-[3fr,2fr]">
                <div className="space-y-5">
                    <h2 className="font-display text-3xl font-semibold text-foreground">Um ecossistema aberto inspirado na cultura Monynha</h2>
                    <p className="text-base text-muted-foreground">FACODI nasceu do desejo de tornar o ensino superior mais humano, acessível e documentado. Cada trilha é construída com carinho por quem vive a realidade da tecnologia brasileira, com foco em diversidade e impacto social.</p>
                    <p className="text-base text-muted-foreground">A plataforma combina Supabase, Next.js e tokens de design vibrantes para oferecer uma experiência consistente em qualquer dispositivo, com atenção às boas práticas de acessibilidade e SEO.</p>
                </div>
                <div className="grid gap-4">
                    {pillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <Card key={pillar.title} className="border-none bg-card/90 shadow-soft">
                                <CardHeader className="flex flex-row items-start gap-4">
                                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary/20 text-secondary">
                                        <Icon className="size-6" aria-hidden />
                                    </span>
                                    <div>
                                        <CardTitle>{pillar.title}</CardTitle>
                                        <CardDescription>{pillar.description}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
