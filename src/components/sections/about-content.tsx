'use client';

import { useSiteText } from '@/components/providers/language-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutContent() {
  const text = useSiteText();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16">
      <header className="space-y-4">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground-light dark:text-foreground-dark">
          {text.about.title}
        </h1>
        <p className="text-lg text-muted-light dark:text-muted-dark">{text.about.description}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Missão</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-foreground-light dark:text-foreground-dark">
              {text.about.mission}
            </CardDescription>
          </CardContent>
        </Card>
        {text.about.values.map((value, index) => (
          <Card key={value}>
            <CardHeader>
              <CardTitle>{value}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{text.about.valueDetails[index]}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
