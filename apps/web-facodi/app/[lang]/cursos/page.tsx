import Link from "next/link";
import { notFound } from "next/navigation";

import { locales, t, type Locale } from "@monynha/i18n";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
  Button,
} from "@monynha/ui";
import { fetchCourses } from "@monynha/supabase";

export default async function CoursesPage({
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
    <section className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-semibold">{t(lang, "nav.courses")}</h1>
        <p className="text-muted-foreground">
          Explore o catálogo de cursos abertos da FACODI. Cada curso reúne unidades curriculares, materiais comunitários e playlists colaborativas.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.code} className="flex flex-col justify-between">
            <div className="space-y-3">
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>
                {course.summary ?? "Este curso ainda não possui um resumo."}
              </CardDescription>
            </div>
            <CardFooter>
              <span className="text-sm text-muted-foreground">
                {course.plan_version ? `Plano ${course.plan_version}` : "Plano em construção"}
              </span>
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
  );
}
