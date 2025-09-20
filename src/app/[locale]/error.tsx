"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useTranslations } from "@/components/layout/translation-provider";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale, messages } = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-muted">500</p>
        <h1 className="text-4xl font-bold">{messages.errors.server.title}</h1>
        <p className="max-w-xl text-muted">{messages.errors.server.description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={reset}>
          {messages.errors.retry}
        </Button>
        <Button variant="secondary" asChild>
          <Link href={`/${locale}`}>{messages.hero.primaryCta}</Link>
        </Button>
      </div>
    </div>
  );
}
