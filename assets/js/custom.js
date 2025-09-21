const THEME_STORAGE_KEY = 'facodi-theme-preference';
const LOCALE_STORAGE_KEY = 'facodi-locale-preference';
const I18N_SCRIPT_ID = 'facodi-translations';
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function readStoredValue(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function storeValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Ignore persistence failures (e.g., private mode restrictions).
  }
}

function readStoredTheme() {
  return readStoredValue(THEME_STORAGE_KEY);
}

function storeTheme(value) {
  storeValue(THEME_STORAGE_KEY, value);
}

function applyTheme(value, persist = true) {
  const theme = value === 'dark' ? 'dark' : 'light';
  if (root) {
    root.dataset.theme = theme;
  }
  if (persist) {
    storeTheme(theme);
  }
  const toggle = document.querySelector('[data-facodi-theme-toggle]');
  if (toggle) {
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
}

function initTheme() {
  const stored = readStoredTheme();
  const initial = stored || (root ? root.dataset.theme : null) || (prefersDark.matches ? 'dark' : 'light');
  applyTheme(initial, false);

  const toggle = document.querySelector('[data-facodi-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextTheme = root && root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  const syncSystemPreference = (event) => {
    if (!readStoredTheme()) {
      applyTheme(event.matches ? 'dark' : 'light', false);
    }
  };

  if (typeof prefersDark.addEventListener === 'function') {
    prefersDark.addEventListener('change', syncSystemPreference);
  } else if (typeof prefersDark.addListener === 'function') {
    prefersDark.addListener(syncSystemPreference);
  }
}

function parseJSONSafe(value) {
  if (typeof value !== 'string') {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

function getI18nConfig() {
  if (window.facodiI18nConfig) {
    return window.facodiI18nConfig;
  }

  const script = document.getElementById(I18N_SCRIPT_ID);
  const payload = script ? parseJSONSafe(script.textContent || '') : null;
  const config = {
    defaultLocale: 'pt',
    locales: [],
    translations: {},
  };

  if (payload && typeof payload === 'object') {
    if (typeof payload.defaultLocale === 'string' && payload.defaultLocale.trim() !== '') {
      config.defaultLocale = payload.defaultLocale.trim();
    }
    if (Array.isArray(payload.locales)) {
      config.locales = payload.locales;
    }
    if (payload.translations && typeof payload.translations === 'object') {
      config.translations = payload.translations;
    }
  }

  window.facodiI18nConfig = config;
  return config;
}

function resolveLocale(requestedLocale, config) {
  const translations = config.translations || {};
  if (requestedLocale && translations[requestedLocale]) {
    return requestedLocale;
  }
  if (config.defaultLocale && translations[config.defaultLocale]) {
    return config.defaultLocale;
  }
  const availableLocales = Object.keys(translations);
  if (availableLocales.length > 0) {
    return availableLocales[0];
  }
  return config.defaultLocale || 'pt';
}

function readStoredLocale(config) {
  const stored = readStoredValue(LOCALE_STORAGE_KEY);
  if (typeof stored === 'string' && stored) {
    return resolveLocale(stored, config);
  }
  return resolveLocale(config.defaultLocale, config);
}

function storeLocale(locale) {
  storeValue(LOCALE_STORAGE_KEY, locale);
}

function formatTemplate(template, vars) {
  if (typeof template !== 'string') {
    return undefined;
  }
  if (!vars) {
    return template;
  }
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      return String(vars[key]);
    }
    return '';
  });
}

function getElementVars(element) {
  const raw = element.getAttribute('data-i18n-vars');
  if (!raw) {
    return null;
  }
  const parsed = parseJSONSafe(raw);
  if (!parsed || typeof parsed !== 'object') {
    return null;
  }
  return parsed;
}

function resolveTranslationValue(key, localeTranslations, fallbackTranslations) {
  if (localeTranslations && Object.prototype.hasOwnProperty.call(localeTranslations, key)) {
    return localeTranslations[key];
  }
  if (fallbackTranslations && Object.prototype.hasOwnProperty.call(fallbackTranslations, key)) {
    return fallbackTranslations[key];
  }
  return undefined;
}

function applyTranslations(locale, options = {}) {
  const config = getI18nConfig();
  const translationsByLocale = config.translations || {};
  const resolvedLocale = resolveLocale(locale, config);
  const localeTranslations = translationsByLocale[resolvedLocale] || {};
  const fallbackTranslations = translationsByLocale[config.defaultLocale] || {};
  const persist = options.persist !== false;
  const emitEvent = options.emitEvent !== false;

  if (persist) {
    storeLocale(resolvedLocale);
  }

  window.facodiActiveLocale = resolvedLocale;
  window.facodiActiveTranslations = localeTranslations;

  if (root) {
    root.lang = resolvedLocale;
  }
  const body = document.body;
  if (body) {
    body.dataset.lang = resolvedLocale;
  }

  const select = document.querySelector('[data-facodi-language-select]');
  if (select && select.value !== resolvedLocale) {
    select.value = resolvedLocale;
  }

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (!key) {
      return;
    }
    const translationTemplate = resolveTranslationValue(key, localeTranslations, fallbackTranslations);
    if (typeof translationTemplate !== 'string') {
      return;
    }
    const vars = getElementVars(element);
    const formatted = formatTemplate(translationTemplate, vars);
    if (formatted !== undefined) {
      if (element.getAttribute('data-i18n-html') === 'true') {
        element.innerHTML = formatted;
      } else {
        element.textContent = formatted;
      }
    }

    const attrSpec = element.getAttribute('data-i18n-attr');
    if (attrSpec) {
      attrSpec
        .split(',')
        .map((segment) => segment.trim())
        .filter(Boolean)
        .forEach((segment) => {
          const parts = segment.split(':');
          const attrName = parts[0] ? parts[0].trim() : '';
          if (!attrName) {
            return;
          }
          const attrKey = (parts[1] ? parts[1].trim() : '') || key;
          const attrTemplate = resolveTranslationValue(attrKey, localeTranslations, fallbackTranslations);
          if (typeof attrTemplate !== 'string') {
            return;
          }
          const attrValue = formatTemplate(attrTemplate, vars);
          if (attrValue !== undefined) {
            element.setAttribute(attrName, attrValue);
          }
        });
    }
  });

  if (emitEvent) {
    try {
      const event = new CustomEvent('facodi:locale-change', {
        detail: {
          locale: resolvedLocale,
          translations: localeTranslations,
        },
      });
      document.dispatchEvent(event);
    } catch (error) {
      // Ignore environments without CustomEvent support.
    }
  }

  return resolvedLocale;
}

function initLanguageSwitcher() {
  const config = getI18nConfig();
  const select = document.querySelector('[data-facodi-language-select]');
  const initialLocale = readStoredLocale(config);

  applyTranslations(initialLocale, { persist: false });

  if (select) {
    select.value = initialLocale;
    select.addEventListener('change', (event) => {
      const value = typeof event.target.value === 'string' ? event.target.value : '';
      applyTranslations(value);
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguageSwitcher();
});

window.facodiApplyLocale = (locale, options) => applyTranslations(locale, options || {});
window.facodiGetI18nConfig = getI18nConfig;
