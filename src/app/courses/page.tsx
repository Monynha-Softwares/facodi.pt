import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { featuredCourses } from '@/data/courses';
import { resolveSiteText } from '@/config/i18n';

const site = resolveSiteText();

export const metadata: Metadata = {
  title: `${site.title} · Cursos`,
  description:
    'Confira o catálogo de cursos FACODI com playlists abertas, resultados de aprendizagem e planos curriculares completos.',
  openGraph: {
    title: `${site.title} · Cursos`,
    description:
      'Explore currículos gratuitos com playlists públicas, planos de estudo semanais e conteúdos colaborativos da comunidade FACODI.',
    url: 'https://facodi.pt/courses'
  }
};

export default function CoursesPage(): JSX.Element {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-secondary-500">Catálogo</p>
        <h1 className="font-display text-4xl font-semibold text-foreground">Cursos disponíveis</h1>
        <p className="max-w-2xl text-base text-foreground/75">
          Currículos completos prontos para estudo independente, com playlists anotadas e objetivos de aprendizagem claros.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {featuredCourses.map((course) => (
          <Card key={course.code} className="flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">{course.name}</CardTitle>
              <p className="text-sm uppercase tracking-[0.3em] text-primary-500/70">
                {course.code} · {course.degree} · {course.duration} · {course.ects} ECTS
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{course.summary}</p>
              <div className="space-y-1 text-sm text-foreground/70">
                {course.highlights.map((item) => (
                  <p key={item} className="flex items-center gap-2">
                    <PlayCircle className="size-4 text-secondary-500" aria-hidden />
                    {item}
                  </p>
                ))}
              </div>
              <Button variant="secondary" className="w-fit">
                <Link href={`mailto:contato@monynha.com?subject=FACODI%20${course.code}`} className="inline-flex items-center gap-2">
                  Quero saber mais
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
