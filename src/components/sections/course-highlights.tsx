import { BookOpen, Code2, Sparkles } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const courseTracks = [
    {
        title: 'Engenharia de Software Comunitária',
        description: 'Base sólida de algoritmos, estruturas de dados e práticas modernas utilizando playlists e projetos colaborativos.',
        icon: Code2,
        url: '#'
    },
    {
        title: 'Dados & Inteligência Artificial',
        description: 'Sequência de matemática aplicada, estatística, fundamentos de IA e machine learning com ferramentas acessíveis.',
        icon: Sparkles,
        url: '#'
    },
    {
        title: 'Fundamentos para Devs Iniciantes',
        description: 'Introdução guiada à lógica de programação, versionamento, web e comunidades para quem está começando.',
        icon: BookOpen,
        url: '#'
    }
] as const;

export function CourseHighlightsSection(): JSX.Element {
    return (
        <section className="container mt-24" id="cursos">
            <div className="mb-10 flex flex-col gap-4 text-center">
                <h2 className="font-display text-3xl font-semibold text-foreground">Trilhas vivas para aprender com a comunidade</h2>
                <p className="mx-auto max-w-2xl text-base text-muted-foreground">Cada curso é composto por unidades curriculares com conteúdos abertos, playlists em PT-BR e materiais complementares revisados pela Monynha.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courseTracks.map((track) => {
                    const Icon = track.icon;
                    return (
                        <Card key={track.title} className="h-full border-border/40 bg-card/80">
                            <CardHeader className="flex flex-row items-start gap-4">
                                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                                    <Icon className="size-6" aria-hidden />
                                </span>
                                <div>
                                    <CardTitle>{track.title}</CardTitle>
                                    <CardDescription>{track.description}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <a href={track.url} className="inline-flex items-center text-sm font-semibold text-primary transition hover:text-secondary">
                                    Ver trilha completa
                                </a>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}
