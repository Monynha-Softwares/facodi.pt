import Link from 'next/link';

import { HeroSection } from '@/components/sections/hero-section';
import { HighlightsSection } from '@/components/sections/highlights-section';
import { ProjectsPreview } from '@/components/sections/projects-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => (
  <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 md:px-6 md:py-16">
    <HeroSection />
    <HighlightsSection />
    <ProjectsPreview />
    <Card className="bg-card text-foreground">
      <CardHeader>
        <CardTitle>Participe das construções abertas</CardTitle>
        <CardDescription>
          As rodas de co-criação acontecem quinzenalmente. Receba convites e materiais prévios para contribuir com código, design ou facilitação comunitária.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-4">
        <Button asChild size="lg">
          <Link href="/contato">Quero colaborar</Link>
        </Button>
        <p className="text-sm text-muted-foreground">
          Espaços acessíveis com tradução colaborativa, documentação aberta e suporte entre pares.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default HomePage;
