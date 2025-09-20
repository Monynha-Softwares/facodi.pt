'use client';

import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteText } from '@/hooks/use-site-text';

const highlights = [
    {
        title: 'Currículos completos',
        description: 'Trilhas estruturadas com inspirações em universidades públicas e materiais abertos.'
    },
    {
        title: 'Playlists selecionadas',
        description: 'Conteúdo em vídeo e texto curado pela comunidade para cada etapa da jornada.'
    },
    {
        title: 'Progresso transparente',
        description: 'Checklist amigável para acompanhar o que você já estudou e o que vem a seguir.'
    }
] as const;

export function HeroSection(): JSX.Element {
    const { copy } = useSiteText();

    return (
        <section className="container pt-24" id="top">
            <div className="grid items-center gap-12 lg:grid-cols-[3fr,2fr]">
                <div className="space-y-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm font-semibold text-secondary">
                        <PlayCircle className="size-4" aria-hidden /> Ensino superior acessível
                    </span>
                    <div className="space-y-4">
                        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Comunidade que transforma conteúdo aberto em jornadas universitárias.</h1>
                        <p className="max-w-xl text-lg text-muted-foreground">{copy.meta.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <Button asChild size="lg">
                            <Link href="#cursos">
                                Comece agora <ArrowRight className="ml-2 size-5" aria-hidden />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="ghost">
                            <Link href="#sobre">Saiba mais sobre o projeto</Link>
                        </Button>
                    </div>
                </div>
                <div className="grid gap-4">
                    {highlights.map((item) => (
                        <Card key={item.title} className="border-none bg-card/80 shadow-brand/40">
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
