import Link from "next/link";
import { notFound } from "next/navigation";

import { locales, t, type Locale } from "@monynha/i18n";
import { Button, Card, CardDescription, CardTitle } from "@monynha/ui";
import { fetchCourseByCode } from "@monynha/supabase";

function renderMarkdown(value?: string | null) {
  if (!value) return null;

  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index} className="text-muted-foreground">
        {paragraph}
      </p>
    ));
}

export default async function CoursePage({
  params,
}: {
  params: { lang: string; code: string };
}) {
  const lang = params.lang as Locale;

  if (!locales.includes(lang)) {
    notFound();
  }

  const normalizedCode = params.code.toUpperCase();
  const course = await fetchCourseByCode(normalizedCode);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <Link href={`/${lang}/cursos`} className="text-sm text-primary">
          ← {t(lang, "nav.courses")}
        </Link>
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-semibold text-foreground">
            {course.name}
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
            {course.code}
          </p>
          <p className="text-lg text-muted-foreground">
            {course.summary ?? "Este curso ainda está sendo preparado."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {course.duration_semesters && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
              {course.duration_semesters} semestres
            </span>
          )}
          {course.ects_total && (
            <span className="rounded-full bg-secondary/10 px-3 py-1 text-secondary">
              {course.ects_total} ECTS
            </span>
          )}
          {course.language && (
            <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
              {course.language}
            </span>
          )}
        </div>
      </header>

      <section className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <article className="space-y-4 rounded-3xl border border-primary/10 bg-white p-8 shadow-lg">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Sobre o curso
          </h2>
          <div className="prose prose-slate max-w-none">
            {renderMarkdown(course.content?.content_md) ?? (
              <p className="text-muted-foreground">
                Este curso ainda não possui descrição detalhada.
              </p>
            )}
          </div>
        </article>

        <aside className="space-y-6">
          <Card>
            <CardTitle>Instituição</CardTitle>
            <CardDescription>
              {course.institution ?? "Comunidade Monynha"}
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Escola</CardTitle>
            <CardDescription>
              {course.school ?? "Faculdade Comunitária Digital"}
            </CardDescription>
          </Card>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="https://discord.gg/monynha" target="_blank" rel="noreferrer">
              Participar da comunidade
            </Link>
          </Button>
        </aside>
      </section>

      <section className="space-y-6">
        <header>
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Unidades curriculares
          </h2>
          <p className="text-sm text-muted-foreground">
            Resultados de aprendizagem e recursos selecionados pela comunidade.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {(course.ucs ?? []).map((uc) => (
            <Card key={uc.code} className="space-y-4">
              <div className="space-y-2">
                <CardTitle>{uc.name}</CardTitle>
                <CardDescription>
                  {uc.description ?? "Descrição em construção."}
                </CardDescription>
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                  Resultados de aprendizagem
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {(uc.outcomes ?? []).map((outcome) => (
                    <li key={outcome.order} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{outcome.outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
