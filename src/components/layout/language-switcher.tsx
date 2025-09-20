'use client';

import { ChangeEvent } from 'react';
import { supportedLocales, type SiteLocale } from '@/config/i18n';
import { useSiteText } from '@/hooks/use-site-text';

const localeNames: Record<SiteLocale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français'
};

export function LanguageSwitcher(): JSX.Element {
  const { locale, setLocale, labels } = useSiteText();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as SiteLocale);
  };

  return (
    <label className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80">
      <span className="sr-only">{labels.nav.language}</span>
      <select
        aria-label={labels.nav.language}
        onChange={handleChange}
        value={locale}
        className="rounded-2xl border border-border/50 bg-card/70 px-3 py-2 text-sm font-medium shadow-inner shadow-primary-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {supportedLocales.map((code) => (
          <option key={code} value={code} className="text-foreground">
            {localeNames[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
