import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { featuredCourses } from '@/data/courses';

export function CourseGrid(): JSX.Element {
  return (
    <section
      aria-labelledby="courses-heading"
      className="mx-auto mt-24 w-full max-w-6xl space-y-10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-500">Currículos abertos</p>
          <h2 id="courses-heading" className="font-display text-3xl font-semibold text-foreground">
            Trilhas em destaque
          </h2>
        </div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 transition hover:text-primary-400"
        >
          Ver catálogo completo
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {featuredCourses.map((course) => (
          <Card key={course.code}>
            <CardHeader>
              <div className="inline-flex items-center justify-between text-xs uppercase tracking-[0.3em] text-primary-500/80">
                <span>{course.code}</span>
                <span>{course.degree}</span>
              </div>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{course.summary}</p>
              <ul className="space-y-2 text-sm text-foreground/70">
                {course.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 size-2 rounded-full bg-secondary-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
