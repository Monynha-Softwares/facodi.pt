const THEME_STORAGE_KEY = 'facodi-theme-preference';
const LANGUAGE_STORAGE_KEY = 'facodi-language-preference';
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const defaultLocale = (root.dataset.defaultLocale || root.lang || 'pt').toLowerCase();

function decodeHtml(value) {
  if (typeof value !== 'string') {
    return value;
  }
  const div = document.createElement('div');
  div.innerHTML = value;
  return div.textContent;
}

function parseJsonScript(id) {
  const element = document.getElementById(id);
  if (!element) {
    return null;
  }
  try {
    return JSON.parse(element.textContent || 'null');
  } catch (error) {
    return null;
  }
}

const translations = parseJsonScript('facodi-i18n') || {};
const localeConfig = parseJsonScript('facodi-language-config') || [];
window.facodiTranslationsData = translations;

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function storeTheme(value) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, value);
  } catch (error) {
    // Ignore storage errors (e.g., private mode).
  }
}

function applyTheme(value, persist = true) {
  const theme = value === 'dark' ? 'dark' : 'light';
  root.dataset.theme = theme;
  if (persist) {
    storeTheme(theme);
  }
  const toggle = document.querySelector('[data-facodi-theme-toggle]');
  if (toggle) {
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
}

function normalizeLanguage(value) {
  if (!value && value !== 0) {
    return '';
  }
  return String(value).trim().toLowerCase();
}

function readStoredLanguage() {
  try {
    return normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
  } catch (error) {
    return '';
  }
}

function storeLanguage(value) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
  } catch (error) {
    // Ignore storage errors.
  }
}

function getAvailableLocales() {
  if (Array.isArray(localeConfig) && localeConfig.length) {
    return localeConfig;
  }
  const code = root.lang || defaultLocale;
  return [{ code: normalizeLanguage(code), label: code.toUpperCase() }];
}

function getDefaultLanguage() {
  const locales = getAvailableLocales();
  const preferred = locales.find((item) => item && (item.default || item.isDefault));
  if (preferred) {
    return normalizeLanguage(preferred.code || preferred.Code);
  }
  return defaultLocale;
}

function getSupportedLanguage(value) {
  const lang = normalizeLanguage(value);
  if (lang && translations[lang]) {
    return lang;
  }
  const short = lang.split('-')[0];
  if (short && translations[short]) {
    return short;
  }
  return '';
}

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search || '');
  const queryLang = getSupportedLanguage(params.get('lang'));
  if (queryLang) {
    return queryLang;
  }
  const stored = getSupportedLanguage(readStoredLanguage());
  if (stored) {
    return stored;
  }
  const navigatorLang = getSupportedLanguage((navigator.language || navigator.userLanguage || '').toLowerCase());
  if (navigatorLang) {
    return navigatorLang;
  }
  return getSupportedLanguage(defaultLocale) || Object.keys(translations)[0] || defaultLocale;
}

function getTranslationMap(language) {
  const lang = normalizeLanguage(language);
  if (translations[lang]) {
    return translations[lang];
  }
  const short = lang.split('-')[0];
  if (translations[short]) {
    return translations[short];
  }
  return translations[defaultLocale] || {};
}

function replacePlaceholders(template, options) {
  if (typeof template !== 'string') {
    return template;
  }
  const values = options || {};
  return template.replace(/\{\{\s*\.?([A-Za-z0-9_]+)\s*\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      return String(values[key]);
    }
    return match;
  });
}

function parseOptions(attributeValue) {
  if (!attributeValue) {
    return {};
  }
  try {
    const decoded = decodeHtml(attributeValue);
    return JSON.parse(decoded);
  } catch (error) {
    return {};
  }
}

function renderTranslation(key, language, options) {
  if (!key) {
    return null;
  }
  const map = getTranslationMap(language);
  const fallbackMap = getTranslationMap(defaultLocale);
  let value = map[key];
  if (value === undefined) {
    value = fallbackMap[key];
  }
  if (value === undefined) {
    return null;
  }
  return replacePlaceholders(value, options);
}

function applyElementTranslation(element, language) {
  const key = element.getAttribute('data-i18n');
  if (!key) {
    return;
  }
  const options = parseOptions(element.getAttribute('data-i18n-options'));
  const isHtml = element.hasAttribute('data-i18n-html');
  const value = renderTranslation(key, language, options);
  if (value === null) {
    return;
  }
  if (isHtml) {
    element.innerHTML = value;
  } else {
    element.textContent = value;
  }
}

function applyAttributeTranslations(element, language) {
  const spec = element.getAttribute('data-i18n-attr');
  if (!spec) {
    return;
  }
  const options = parseOptions(element.getAttribute('data-i18n-options'));
  const parts = spec.split(',');
  parts.forEach((entry) => {
    const [attrNameRaw, keyRaw] = entry.split(':');
    const attrName = attrNameRaw ? attrNameRaw.trim() : '';
    const key = keyRaw ? keyRaw.trim() : '';
    if (!attrName || !key) {
      return;
    }
    const value = renderTranslation(key, language, options);
    if (value !== null) {
      element.setAttribute(attrName, value);
    }
  });
}

function setDocumentLanguage(language) {
  const lang = normalizeLanguage(language) || defaultLocale;
  root.lang = lang;
  root.dataset.locale = lang;
  const body = document.body;
  if (body) {
    body.dataset.lang = lang;
  }
  window.facodiCurrentLocale = lang;
}

function applyTranslations(language) {
  const lang = normalizeLanguage(language) || defaultLocale;
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => applyElementTranslation(element, lang));

  const attrElements = document.querySelectorAll('[data-i18n-attr]');
  attrElements.forEach((element) => applyAttributeTranslations(element, lang));

  const select = document.querySelector('[data-facodi-language-select]');
  if (select && normalizeLanguage(select.value) !== lang) {
    select.value = lang;
  }

  setDocumentLanguage(lang);
  document.dispatchEvent(new CustomEvent('facodi:language-change', { detail: { language: lang } }));
}

function setLanguage(language, { persist = true } = {}) {
  const supported = getSupportedLanguage(language) || getDefaultLanguage();
  applyTranslations(supported);
  if (persist) {
    storeLanguage(supported);
  }
}

function initLanguageSystem() {
  const select = document.querySelector('[data-facodi-language-select]');
  const initial = getInitialLanguage();
  setLanguage(initial, { persist: false });

  if (select) {
    const locales = getAvailableLocales();
    const hasOption = locales.some((item) => normalizeLanguage(item.code || item.Code) === normalizeLanguage(select.value));
    if (!hasOption && locales.length) {
      select.value = normalizeLanguage(locales[0].code || locales[0].Code || defaultLocale);
    }
    select.addEventListener('change', (event) => {
      const target = normalizeLanguage(event.target.value);
      if (target) {
        setLanguage(target);
      }
    });
  }
}

function initTheme() {
  const stored = readStoredTheme();
  const initial = stored || root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');
  applyTheme(initial, false);

  const toggle = document.querySelector('[data-facodi-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
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

function refreshDynamicContent() {
  if (!window.facodiLoaders) {
    return;
  }
  const body = document.body || {};
  const dataset = body.dataset || {};
  const context = Object.assign({}, dataset, window.facodiPageContext || {});
  if (context.course) {
    window.facodiLoaders.loadCoursePage(context.course, context.plan || context.planVersion);
  }
  if (context.uc) {
    window.facodiLoaders.loadUCPage(context.uc);
  }
  if (context.topic) {
    window.facodiLoaders.loadTopicPage(context.topic);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initLanguageSystem();
  initTheme();
  document.addEventListener('facodi:language-change', refreshDynamicContent);
});
