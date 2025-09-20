import { ArrowRight, GraduationCap, Library, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getDictionary(locale);

  return (
    <div className="container space-y-24 py-16">
      <section className="grid gap-12 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/30 px-4 py-2 text-sm font-semibold text-secondary-foreground">
            <Sparkles className="h-4 w-4" aria-hidden />
            {messages.brand.tagline}
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {messages.hero.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted">{messages.hero.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href={`/${locale}/components`}>
                {messages.hero.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button variant="secondary" asChild size="lg">
              <Link href={`/${locale}/components`}>{messages.hero.secondaryCta}</Link>
            </Button>
          </div>
          <dl className="grid gap-6 sm:grid-cols-3">
            {[
              messages.hero.stats.students,
              messages.hero.stats.courses,
              messages.hero.stats.playlists,
            ].map((item) => (
              <div key={item} className="rounded-lg border border-border bg-surface p-4">
                <dt className="text-xs uppercase text-muted">{messages.brand.name}</dt>
                <dd className="text-lg font-semibold">{item}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 p-8 shadow-lg">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{messages.sections.ecosystem.title}</h2>
            <p className="text-sm text-muted">{messages.sections.ecosystem.description}</p>
            <ul className="space-y-3 text-sm text-foreground/80">
              {messages.sections.resources.items.map((item) => (
                <li key={item.title} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  {item.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="resources-heading" className="space-y-10">
        <div className="max-w-3xl space-y-2">
          <h2 id="resources-heading" className="text-3xl font-semibold">
            {messages.sections.resources.title}
          </h2>
          <p className="text-muted">{messages.sections.community.description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Library className="h-5 w-5" aria-hidden />
                {messages.sections.resources.items[0].title}
              </CardTitle>
              <CardDescription>{messages.sections.resources.items[0].description}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" aria-hidden />
                {messages.sections.resources.items[1].title}
              </CardTitle>
              <CardDescription>{messages.sections.resources.items[1].description}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" aria-hidden />
                {messages.sections.resources.items[2].title}
              </CardTitle>
              <CardDescription>{messages.sections.resources.items[2].description}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-background via-surface to-background p-10 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{messages.sections.community.title}</h2>
            <p className="text-muted">{messages.sections.community.description}</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{messages.sections.community.supabase.title}</CardTitle>
              <CardDescription>{messages.sections.community.supabase.line1}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted">
              <p>{messages.sections.community.supabase.line2}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
