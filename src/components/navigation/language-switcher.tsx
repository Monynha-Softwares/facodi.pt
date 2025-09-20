'use client';

import { useTransition } from 'react';

import { useSiteText } from '@/lib/hooks/use-site-text';

const languageLabels: Record<string, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

const fieldLabels: Record<string, string> = {
  pt: 'Idioma do site',
  en: 'Site language',
  es: 'Idioma del sitio',
  fr: 'Langue du site',
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useSiteText();
  const [isPending, startTransition] = useTransition();
  const fieldLabel = fieldLabels[locale] ?? fieldLabels.pt;

  return (
    <label
      className="flex items-center gap-2 text-xs font-medium text-foreground/80"
      htmlFor="site-language"
    >
      <span className="sr-only">{fieldLabel}</span>
      <select
        id="site-language"
        name="language"
        aria-label={fieldLabel}
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as typeof locale;
          startTransition(() => setLocale(nextLocale));
        }}
        className="h-10 rounded-[var(--radius-xl)] border border-border/60 bg-background/80 px-3 text-xs font-semibold uppercase tracking-wide text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        disabled={isPending}
      >
        {Object.entries(languageLabels).map(([value, label]) => (
          <option key={value} value={value} className="text-foreground">
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
