const THEME_STORAGE_KEY = 'facodi-theme-preference';
const LANGUAGE_STORAGE_KEY = 'facodi-language';
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function readJSONScript(id) {
  const node = document.getElementById(id);
  if (!node) {
    return null;
  }
  try {
    const content = node.textContent || '';
    return JSON.parse(content) || null;
  } catch (error) {
    console.warn('[FACODI] Failed to parse JSON script:', id, error);
    return null;
  }
}

const localeConfigRaw = readJSONScript('facodi-locale-config');
const localeConfig = Array.isArray(localeConfigRaw) ? localeConfigRaw : [];
const translationCatalog = readJSONScript('facodi-i18n-catalog') || {};
const languageConfig = readJSONScript('facodi-language-config') || {};
const DEFAULT_LOCALE = languageConfig.defaultLocale || document.documentElement.lang || 'pt';
let currentLocale = DEFAULT_LOCALE;

let resolveGoogleReady;
const googleReady = new Promise((resolve) => {
  resolveGoogleReady = resolve;
});

const localeIndex = localeConfig.reduce((accumulator, entry) => {
  if (entry && entry.code) {
    accumulator[entry.code] = entry;
  }
  return accumulator;
}, {});

function getLocaleEntry(code) {
  if (code && Object.prototype.hasOwnProperty.call(localeIndex, code)) {
    return localeIndex[code];
  }
  return null;
}

function getGoogleLanguageCode(code) {
  const entry = getLocaleEntry(code);
  if (entry && entry.googleCode) {
    return entry.googleCode;
  }
  return code;
}

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

function readStoredLocale() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored || null;
  } catch (error) {
    return null;
  }
}

function storeLocale(value) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
  } catch (error) {
    // Ignore storage errors.
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

function toPascalCase(value) {
  if (!value) {
    return '';
  }
  return String(value)
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

function getDatasetValue(element, placeholder) {
  if (!element || !element.dataset || !placeholder) {
    return undefined;
  }
  const base = placeholder.replace(/[^A-Za-z0-9]+/g, '');
  const pascal = toPascalCase(base);
  const lowerCamel = pascal ? pascal.charAt(0).toLowerCase() + pascal.slice(1) : '';
  const candidates = [
    `i18n${placeholder}`,
    `i18n${base}`,
    `i18n${pascal}`,
    `i18n${lowerCamel}`,
    `i18n${base.toUpperCase()}`,
    `i18n${base.toLowerCase()}`,
    `i18nParam${pascal}`,
    `i18nParam${lowerCamel}`,
  ];
  for (const candidate of candidates) {
    if (Object.prototype.hasOwnProperty.call(element.dataset, candidate)) {
      return element.dataset[candidate];
    }
  }
  return undefined;
}

function replaceTemplatePlaceholders(template, element) {
  if (typeof template !== 'string') {
    return template;
  }
  return template.replace(/{{\s*\.([A-Za-z0-9_]+)\s*}}/g, (match, name) => {
    const value = getDatasetValue(element, name);
    return value !== undefined ? value : '';
  });
}

function getTranslation(locale, key) {
  if (!key) {
    return undefined;
  }
  const catalog = translationCatalog[locale];
  if (catalog && Object.prototype.hasOwnProperty.call(catalog, key)) {
    return catalog[key];
  }
  return undefined;
}

function normalizeLocale(code) {
  if (code && Object.prototype.hasOwnProperty.call(translationCatalog, code)) {
    return code;
  }
  return DEFAULT_LOCALE;
}

function updateTextNodeTranslation(element, locale) {
  const key = element.dataset.i18n;
  if (!key) {
    return;
  }
  if (!Object.prototype.hasOwnProperty.call(element.dataset, 'i18nOriginal')) {
    element.dataset.i18nOriginal = element.innerHTML;
  }
  let template = getTranslation(locale, key);
  if (template === undefined || template === null || template === '') {
    if (locale === DEFAULT_LOCALE) {
      template = element.dataset.i18nOriginal || '';
    } else {
      template = getTranslation(DEFAULT_LOCALE, key) || element.dataset.i18nOriginal || '';
    }
  }
  const rendered = replaceTemplatePlaceholders(template, element);
  element.innerHTML = rendered;
  if (!element.classList.contains('notranslate')) {
    element.classList.add('notranslate');
  }
}

function updateAttributeTranslations(element, locale) {
  if (!element || !element.dataset) {
    return;
  }
  Object.keys(element.dataset).forEach((datasetKey) => {
    if (!datasetKey.startsWith('i18nAttr')) {
      return;
    }
    const translationKey = element.dataset[datasetKey];
    if (!translationKey) {
      return;
    }
    const attrNamePart = datasetKey.slice('i18nAttr'.length);
    if (!attrNamePart) {
      return;
    }
    const attributeName = attrNamePart.replace(/([A-Z])/g, '-$1').toLowerCase();
    const originalKey = `i18nAttrOriginal${attrNamePart}`;
    if (!Object.prototype.hasOwnProperty.call(element.dataset, originalKey)) {
      const originalValue = element.getAttribute(attributeName);
      if (originalValue !== null) {
        element.dataset[originalKey] = originalValue;
      } else {
        element.dataset[originalKey] = '';
      }
    }
    let template = getTranslation(locale, translationKey);
    if (template === undefined || template === null || template === '') {
      if (locale === DEFAULT_LOCALE) {
        element.setAttribute(attributeName, element.dataset[originalKey] || '');
        return;
      }
      template = getTranslation(DEFAULT_LOCALE, translationKey) || element.dataset[originalKey] || '';
    }
    const rendered = replaceTemplatePlaceholders(template, element);
    element.setAttribute(attributeName, rendered);
  });
}

function applyManualTranslations(locale) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => {
    updateTextNodeTranslation(element, locale);
    updateAttributeTranslations(element, locale);
  });
  document.querySelectorAll('[data-i18n-attr-aria-label], [data-i18n-attr-placeholder], [data-i18n-attr-title]').forEach((element) => {
    updateAttributeTranslations(element, locale);
  });
}

function updateLanguageSelect(locale) {
  const select = document.querySelector('[data-facodi-language-select]');
  if (!select) {
    return;
  }
  if (select.value !== locale) {
    select.value = locale;
  }
}

function triggerGoogleTranslate(locale) {
  const targetLocale = normalizeLocale(locale);
  const googleCode = getGoogleLanguageCode(targetLocale);
  const defaultGoogleCode = getGoogleLanguageCode(DEFAULT_LOCALE);

  googleReady.then(() => {
    const combo = document.querySelector('.goog-te-combo');
    if (!combo) {
      return;
    }
    const desired = targetLocale === DEFAULT_LOCALE ? defaultGoogleCode : googleCode;
    if (!desired || combo.value === desired) {
      combo.dispatchEvent(new Event('change'));
      return;
    }
    combo.value = desired;
    combo.dispatchEvent(new Event('change'));
  });
}

function setLocale(locale, options = {}) {
  const normalized = normalizeLocale(locale);
  currentLocale = normalized;
  if (options.persist !== false) {
    storeLocale(normalized);
  }
  document.documentElement.setAttribute('lang', normalized);
  applyManualTranslations(normalized);
  updateLanguageSelect(normalized);
  triggerGoogleTranslate(normalized);
}

window.facodiApplyTranslations = function facodiApplyTranslations() {
  applyManualTranslations(currentLocale);
};

function initLanguageSwitcher() {
  const select = document.querySelector('[data-facodi-language-select]');
  if (!select) {
    return;
  }

  select.addEventListener('change', (event) => {
    const target = event.target.value;
    if (target && typeof target === 'string') {
      setLocale(target, { persist: true });
    }
  });
}

function initLocale() {
  const stored = readStoredLocale();
  if (stored) {
    setLocale(stored, { persist: false });
  } else {
    setLocale(DEFAULT_LOCALE, { persist: false });
  }
}

window.facodiInitGoogleTranslate = function facodiInitGoogleTranslate() {
  const googleLanguages = Array.isArray(languageConfig.googleLanguages) ? languageConfig.googleLanguages : [];
  const defaultGoogleCode = getGoogleLanguageCode(DEFAULT_LOCALE);
  const includedLanguages = googleLanguages
    .filter((code) => code && code !== defaultGoogleCode)
    .join(',');
  if (window.google && window.google.translate) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: defaultGoogleCode,
        includedLanguages,
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element',
    );
  }
  if (typeof resolveGoogleReady === 'function') {
    resolveGoogleReady();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLocale();
  initLanguageSwitcher();
});
