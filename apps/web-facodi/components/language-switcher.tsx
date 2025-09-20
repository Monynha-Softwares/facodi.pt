"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

import { locales, localeLabels, type Locale } from "@monynha/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextLocale = event.target.value as Locale;
      if (nextLocale === currentLocale) return;

      const segments = pathname.split("/").filter(Boolean);
      if (segments.length === 0) {
        router.push(`/${nextLocale}`);
        return;
      }

      segments[0] = nextLocale;
      router.push(`/${segments.join("/")}`);
    },
    [currentLocale, pathname, router]
  );

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="rounded-xl border border-primary/20 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      aria-label="Selecionar idioma"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeLabels[locale]}
        </option>
      ))}
    </select>
  );
}
