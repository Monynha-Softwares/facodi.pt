import { notFound } from "next/navigation";

import { locales, t, type Locale } from "@monynha/i18n";
import { Card, CardDescription, CardTitle } from "@monynha/ui";

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale;

  if (!locales.includes(lang)) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-semibold">{t(lang, "nav.about")}</h1>
        <p className="text-muted-foreground">{t(lang, "about.description")}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardTitle>{t(lang, "about.community.title")}</CardTitle>
          <CardDescription>{t(lang, "about.community.body")}</CardDescription>
        </Card>
        <Card>
          <CardTitle>{t(lang, "about.accessibility.title")}</CardTitle>
          <CardDescription>{t(lang, "about.accessibility.body")}</CardDescription>
        </Card>
      </div>
    </section>
  );
}
