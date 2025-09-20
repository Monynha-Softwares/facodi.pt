"use client";

import Link from "next/link";

import { useTranslations } from "@/components/layout/translation-provider";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { locale, messages } = useTranslations();

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-muted">404</p>
        <h1 className="text-4xl font-bold">{messages.errors.notFound.title}</h1>
        <p className="max-w-xl text-muted">{messages.errors.notFound.description}</p>
      </div>
      <Button asChild>
        <Link href={`/${locale}`}>{messages.hero.primaryCta}</Link>
      </Button>
    </div>
  );
}
