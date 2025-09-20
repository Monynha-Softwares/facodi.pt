'use client';

import Link from 'next/link';

import { useSiteText } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ProjectsContent() {
  const text = useSiteText();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
      <header className="space-y-4">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground-light dark:text-foreground-dark">
          {text.projects.title}
        </h1>
        <p className="text-lg text-muted-light dark:text-muted-dark">{text.projects.description}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {text.projects.featured.map((project, index) => (
          <Card key={project}>
            <CardHeader>
              <CardTitle>{project}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{text.about.valueDetails[index % text.about.valueDetails.length]}</CardDescription>
            </CardContent>
            <CardContent>
              <Button variant="ghost" className="px-0" asChild>
                <Link href="/contato">{text.contact.submit}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
