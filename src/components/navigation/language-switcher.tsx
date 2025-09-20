"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type ChangeEvent } from "react";

import { useTranslations } from "@/components/layout/translation-provider";
import { locales, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, messages } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Locale>(locale);

  useEffect(() => {
    setSelected(locale);
  }, [locale]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Locale;
    setSelected(value);
    const segments = pathname?.split("/").filter(Boolean) ?? [];
    const nextSegments = segments.length > 0 ? [...segments] : [];

    if (nextSegments.length === 0) {
      nextSegments.push(value);
    } else {
      nextSegments[0] = value;
    }

    const nextPath = `/${nextSegments.join("/")}`;
    startTransition(() => {
      router.push(nextPath);
    });
  };

  return (
    <label className="flex items-center gap-2 text-sm font-medium" htmlFor="language-switcher">
      {messages.navigation.language}
      <select
        id="language-switcher"
        className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        value={selected}
        onChange={handleChange}
        aria-label={messages.navigation.language}
        disabled={isPending}
      >
        {locales.map((entry) => (
          <option key={entry} value={entry} className="text-foreground">
            {messages.language[entry]}
          </option>
        ))}
      </select>
    </label>
  );
}
