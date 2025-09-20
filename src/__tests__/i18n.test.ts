import { describe, expect, it } from 'vitest';

import { defaultLocale, getSiteCopy, supportedLocales } from '@/config/i18n';

describe('site copy configuration', () => {
    it('retorna metadados no idioma padrão', () => {
        const copy = getSiteCopy(defaultLocale);

        expect(copy.locale).toBe('pt');
        expect(copy.meta.title).toContain('FACODI');
    });

    it('permite percorrer todos os idiomas suportados', () => {
        const locales = new Set(supportedLocales);

        supportedLocales.forEach((locale) => {
            const copy = getSiteCopy(locale);
            expect(locales.has(copy.locale)).toBe(true);
            expect(copy.meta.title.length).toBeGreaterThan(0);
        });
    });
});
