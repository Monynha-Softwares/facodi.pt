'use client';

import { useSiteText } from '@/hooks/use-site-text';
import { getSiteCopy, supportedLocales } from '@/config/i18n';

export function LanguageSwitcher(): JSX.Element {
    const { locale, setLocale } = useSiteText();

    return (
        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="sr-only">Idioma do site</span>
            <select aria-label="Idioma do site" className="rounded-full border border-border bg-background/80 px-3 py-2 text-sm font-medium shadow-soft/30 focus-visible:ring-2 focus-visible:ring-primary" value={locale} onChange={(event) => setLocale(event.target.value as (typeof supportedLocales)[number])}>
                {supportedLocales.map((value) => (
                    <option key={value} value={value}>
                        {getSiteCopy(value).localeName}
                    </option>
                ))}
            </select>
        </label>
    );
}
