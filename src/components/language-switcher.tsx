'use client';

import { useTransition } from 'react';

import { useLanguage } from '@/components/providers/language-provider';
import { languages, type LanguageCode } from '@/config/i18n';
import { cn } from '@/lib/utils';

const labels: Record<LanguageCode, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [pending, startTransition] = useTransition();

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="language-switcher">
        Selecionar idioma
      </label>
      <select
        id="language-switcher"
        className={cn(
          'appearance-none rounded-2xl border border-border-light bg-surface-light py-2 pl-3 pr-10 text-sm font-medium text-foreground-light shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-border-dark dark:bg-surface-dark dark:text-foreground-dark',
          pending && 'opacity-70',
        )}
        value={language}
        onChange={(event) =>
          startTransition(() => setLanguage(event.target.value as LanguageCode))
        }
      >
        {languages.map((code) => (
          <option key={code} value={code}>
            {labels[code]}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-light dark:text-muted-dark">
        ▼
      </span>
    </div>
  );
}
