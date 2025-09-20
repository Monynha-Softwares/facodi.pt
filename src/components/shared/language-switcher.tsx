'use client';

import { type SiteLanguage,supportedLanguages } from '@/config/i18n';
import { useSiteText } from '@/hooks/use-site-text';
import { cn } from '@/lib/utils';

const languageLabels: Record<SiteLanguage, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français'
};

export const LanguageSwitcher = () => {
  const { language, setLanguage, copy } = useSiteText();

  return (
    <label className="relative">
      <span className="sr-only">{copy.navigation.language}</span>
      <select
        aria-label={copy.navigation.language}
        className={cn(
          'h-10 min-w-[120px] rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        )}
        value={language}
        onChange={(event) => setLanguage(event.target.value as SiteLanguage)}
      >
        {supportedLanguages.map((item) => (
          <option key={item} value={item}>
            {languageLabels[item]}
          </option>
        ))}
      </select>
    </label>
  );
};
