(function () {
    const CONFIG_ID = 'facodi-config';
    const THEME_STORAGE_KEY = 'facodi.theme';
    const LOCALE_STORAGE_KEY = 'facodi.locale';
    const SUPPORTED_THEMES = new Set(['light', 'dark']);

    const translationsCache = new Map();
    let fallbackTranslations = null;
    let fallbackLocale = 'pt';
    let currentTranslations = null;
    let currentLocale = 'pt';
    let i18nPath = '/i18n/';
    const localeOptions = new Map();

    function safeParseConfig() {
        const node = document.getElementById(CONFIG_ID);
        if (!node) return {};
        try {
            return JSON.parse(node.textContent || '{}');
        } catch (error) {
            console.warn('FACODI: unable to parse configuration payload', error);
            return {};
        }
    }

    function normaliseLocale(locale) {
        return (locale || '').toLowerCase();
    }

    function safeGetItem(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function safeSetItem(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            /* no-op */
        }
    }

    function buildLocaleUrl(locale) {
        const fileName = `${locale}.json`;
        try {
            const base = new URL(i18nPath, window.location.origin);
            return new URL(fileName, base).toString();
        } catch (error) {
            const prefix = i18nPath.endsWith('/') ? i18nPath : `${i18nPath}/`;
            return `${prefix}${fileName}`;
        }
    }

    async function loadTranslations(locale) {
        const normalised = normaliseLocale(locale);
        if (!translationsCache.has(normalised)) {
            const url = buildLocaleUrl(normalised);
            const request = fetch(url, { cache: 'no-cache' })
                .then((response) => (response.ok ? response.json() : null))
                .catch(() => null);
            translationsCache.set(normalised, request);
        }
        const result = await translationsCache.get(normalised);
        return result || null;
    }

    let fallbackPromise = null;
    function ensureFallback() {
        if (fallbackTranslations) {
            return Promise.resolve(fallbackTranslations);
        }
        if (!fallbackPromise) {
            fallbackPromise = loadTranslations(fallbackLocale).then((payload) => {
                fallbackTranslations = payload || {};
                return fallbackTranslations;
            });
        }
        return fallbackPromise;
    }

    function translateKey(key, fallbackValue) {
        if (!key) {
            return fallbackValue;
        }
        const path = key.split('.');
        const resolve = (source) =>
            path.reduce((acc, part) => {
                if (acc && Object.prototype.hasOwnProperty.call(acc, part)) {
                    return acc[part];
                }
                return undefined;
            }, source);

        if (currentTranslations) {
            const value = resolve(currentTranslations);
            if (value !== undefined) {
                return value;
            }
        }

        if (fallbackTranslations) {
            const fallback = resolve(fallbackTranslations);
            if (fallback !== undefined) {
                return fallback;
            }
        }

        return fallbackValue;
    }

    function applyTranslationToElement(element) {
        const key = element.dataset.i18nKey;
        if (!key) {
            return;
        }
        const fallback = element.textContent ? element.textContent.trim() : '';
        const translation = translateKey(key, fallback);
        if (translation === undefined || translation === null) {
            return;
        }
        const attrRaw = element.dataset.i18nAttr || '';
        const attributes = attrRaw
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

        if (attributes.length > 0) {
            attributes.forEach((attr) => {
                element.setAttribute(attr, translation);
            });
        } else {
            element.textContent = translation;
        }
    }

    function applyTranslationsToPage() {
        document.querySelectorAll('[data-i18n-key]').forEach(applyTranslationToElement);
        updateThemeToggle(currentTheme);
    }

    function updateLanguageMenu(locale) {
        const normalised = normaliseLocale(locale);
        document.querySelectorAll('[data-locale-option]').forEach((button) => {
            const option = normaliseLocale(button.dataset.localeOption);
            if (!option) {
                return;
            }
            if (option === normalised) {
                button.setAttribute('aria-current', 'true');
            } else {
                button.removeAttribute('aria-current');
            }
        });
    }

    function updateDocumentLanguage(locale) {
        if (!locale) {
            return;
        }
        document.documentElement.setAttribute('lang', locale);
    }

    async function setLocale(locale, options = {}) {
        const target = localeOptions.has(normaliseLocale(locale)) ? normaliseLocale(locale) : fallbackLocale;
        const translationPayload = await loadTranslations(target);
        await ensureFallback();

        currentLocale = target;
        currentTranslations = translationPayload || fallbackTranslations;

        if (options.persist !== false) {
            safeSetItem(LOCALE_STORAGE_KEY, currentLocale);
        }

        updateDocumentLanguage(currentLocale);
        updateLanguageMenu(currentLocale);
        applyTranslationsToPage();
    }

    function isExplicitTheme(value) {
        return SUPPORTED_THEMES.has(value);
    }

    function getSystemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    let currentTheme = 'light';

    function updateThemeToggle(theme) {
        const toggle = document.querySelector('[data-theme-toggle]');
        if (!toggle) {
            return;
        }
        toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        const labelKey = theme === 'dark' ? toggle.dataset.themeLabelLight : toggle.dataset.themeLabelDark;
        const fallback = theme === 'dark' ? 'Enable light mode' : 'Enable dark mode';
        const label = translateKey(labelKey, fallback);
        if (label) {
            toggle.setAttribute('aria-label', label);
        }

        toggle.querySelectorAll('[data-theme-text]').forEach((node) => {
            const state = node.getAttribute('data-theme-text');
            const key = state === 'light' ? toggle.dataset.themeLabelLight : toggle.dataset.themeLabelDark;
            const textFallback = node.textContent ? node.textContent.trim() : fallback;
            const message = translateKey(key, textFallback || fallback);
            if (message) {
                node.textContent = message;
            }
            const shouldShow = state === 'dark' ? theme === 'light' : theme === 'dark';
            node.hidden = !shouldShow;
        });
    }

    function applyTheme(theme, { persist } = {}) {
        const nextTheme = SUPPORTED_THEMES.has(theme) ? theme : getSystemTheme();
        currentTheme = nextTheme;
        const root = document.documentElement;
        root.setAttribute('data-theme', nextTheme);
        root.style.colorScheme = nextTheme === 'dark' ? 'dark' : 'light';
        if (persist) {
            safeSetItem(THEME_STORAGE_KEY, nextTheme);
        }
        updateThemeToggle(nextTheme);
    }

    function initTheme() {
        const storedTheme = safeGetItem(THEME_STORAGE_KEY);
        if (isExplicitTheme(storedTheme)) {
            applyTheme(storedTheme, { persist: false });
        } else {
            applyTheme(getSystemTheme(), { persist: false });
        }

        const themeToggle = document.querySelector('[data-theme-toggle]');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const next = currentTheme === 'dark' ? 'light' : 'dark';
                applyTheme(next, { persist: true });
            });
        }

        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', (event) => {
                    const stored = safeGetItem(THEME_STORAGE_KEY);
                    if (!isExplicitTheme(stored)) {
                        applyTheme(event.matches ? 'dark' : 'light', { persist: false });
                    }
                });
            }
        }
    }

    function initLocaleMenu() {
        document.querySelectorAll('[data-locale-option]').forEach((button) => {
            button.addEventListener('click', () => {
                const requested = button.dataset.localeOption;
                if (!requested) {
                    return;
                }
                setLocale(requested, { persist: true });
            });
        });
    }

    function bootstrap() {
        const config = safeParseConfig();
        if (config && config.i18n) {
            const { default: defaultLocale, options = [], path } = config.i18n;
            if (typeof defaultLocale === 'string') {
                fallbackLocale = normaliseLocale(defaultLocale);
            }
            if (Array.isArray(options)) {
                options.forEach((entry) => {
                    const code = normaliseLocale(entry.code || entry.Code);
                    if (!code) {
                        return;
                    }
                    localeOptions.set(code, { code, label: entry.label || entry.Label || code });
                });
            }
            if (typeof path === 'string') {
                i18nPath = path;
            }
        }

        if (!localeOptions.has(fallbackLocale)) {
            localeOptions.set(fallbackLocale, { code: fallbackLocale, label: fallbackLocale });
        }

        initTheme();
        initLocaleMenu();

        ensureFallback().then(() => {
            const storedLocaleRaw = safeGetItem(LOCALE_STORAGE_KEY);
            const storedLocale = normaliseLocale(storedLocaleRaw);
            const hasStored = localeOptions.has(storedLocale);
            const initialLocale = hasStored ? storedLocale : fallbackLocale;
            if (!localeOptions.has(initialLocale)) {
                localeOptions.set(initialLocale, { code: initialLocale, label: initialLocale });
            }
            const shouldPersist = hasStored || Boolean(storedLocaleRaw);
            setLocale(initialLocale, { persist: shouldPersist });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
        bootstrap();
    }
})();
