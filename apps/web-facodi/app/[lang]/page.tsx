import Link from "next/link";
import { notFound } from "next/navigation";

import { locales, t, type Locale } from "@monynha/i18n";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
  Hero,
  Button,
} from "@monynha/ui";
import { fetchCourses } from "@monynha/supabase";

export default async function LocaleHomePage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang as Locale;

  if (!locales.includes(lang)) {
    notFound();
  }

  const courses = await fetchCourses();

  return (
    <div className="space-y-12">
      <Hero
        title={t(lang, "hero.title")}
        subtitle={t(lang, "hero.subtitle")}
        ctaLabel={t(lang, "hero.cta")}
        ctaHref={`/${lang}/cursos`}
      />

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              {t(lang, "courses.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              Conheça os cursos comunitários disponíveis para estudo autodirigido.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href={`/${lang}/cursos`}>{t(lang, "nav.courses")}</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {courses.length === 0 && (
            <p className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 text-sm text-muted-foreground">
              {t(lang, "courses.empty")}
            </p>
          )}

          {courses.map((course) => (
            <Card key={course.code} className="flex flex-col justify-between">
              <div className="space-y-3">
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>
                  {course.summary ?? "Este curso ainda não possui um resumo."}
                </CardDescription>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {course.degree && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                      {course.degree}
                    </span>
                  )}
                  {course.plan_version && (
                    <span className="rounded-full bg-secondary/10 px-3 py-1 font-medium text-secondary">
                      Plano {course.plan_version}
                    </span>
                  )}
                  {course.language && (
                    <span className="rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground">
                      {course.language}
                    </span>
                  )}
                </div>
              </div>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  {course.ects_total ? `${course.ects_total} ECTS` : "Carga horária flexível"}
                </div>
                <Button asChild size="sm">
                  <Link href={`/${lang}/cursos/${course.code.toLowerCase()}`}>
                    Ver curso
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
