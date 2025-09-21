const THEME_STORAGE_KEY = 'facodi-theme-preference';
const LANGUAGE_STORAGE_KEY = 'facodi-language-preference';
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

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

function readTranslations() {
  const script = document.getElementById('facodi-i18n');
  if (!script) {
    return {};
  }
  try {
    const raw = script.textContent || script.innerText || '{}';
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.warn('[FACODI] Falha ao analisar o mapa de traduções.', error);
    return {};
  }
}

function readStoredLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function storeLanguage(value) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
  } catch (error) {
    // Ignore storage errors.
  }
}

function getDefaultLocale(translations) {
  const htmlLang = (document.documentElement && document.documentElement.lang) || '';
  const bodyLang = (document.body && document.body.dataset && document.body.dataset.lang) || '';
  if (htmlLang && translations[htmlLang]) {
    return htmlLang;
  }
  if (bodyLang && translations[bodyLang]) {
    return bodyLang;
  }
  const locales = Object.keys(translations);
  return locales.length ? locales[0] : 'pt';
}

function updateLanguageSelect(language) {
  const select = document.querySelector('[data-facodi-language-select]');
  if (!select) {
    return;
  }
  const option = Array.from(select.options).find((item) => item.value === language);
  if (option) {
    select.value = language;
  }
}

function parseArgsAttr(element) {
  const raw = element.getAttribute('data-i18n-args');
  if (!raw) {
    return {};
  }
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
}

function resolveTranslation(key, lang, translations, fallbackLang) {
  if (!key) {
    return '';
  }
  const langMap = translations[lang] || {};
  if (Object.prototype.hasOwnProperty.call(langMap, key)) {
    return langMap[key];
  }
  const fallbackMap = translations[fallbackLang] || {};
  if (Object.prototype.hasOwnProperty.call(fallbackMap, key)) {
    return fallbackMap[key];
  }
  return key;
}

function renderTemplate(template, args) {
  if (typeof template !== 'string') {
    return '';
  }
  return template.replace(/\{\{\s*\.(\w+)\s*\}\}/g, (_, name) => {
    if (Object.prototype.hasOwnProperty.call(args, name)) {
      const value = args[name];
      return value === null || value === undefined ? '' : String(value);
    }
    return '';
  });
}

function buildArgs(element, lang, translations, fallbackLang) {
  const args = Object.assign({}, parseArgsAttr(element));

  if (!Object.prototype.hasOwnProperty.call(args, 'Count') && element.hasAttribute('data-i18n-count')) {
    const rawCount = element.getAttribute('data-i18n-count');
    const parsedCount = Number.parseFloat(rawCount);
    args.Count = Number.isNaN(parsedCount) ? rawCount : parsedCount;
  }

  const singularKey = element.getAttribute('data-i18n-unit-singular');
  const pluralKey = element.getAttribute('data-i18n-unit-plural');
  if ((singularKey || pluralKey) && !Object.prototype.hasOwnProperty.call(args, 'UnitsLabel')) {
    const countValue = Number(args.Count);
    const isSingular = Number.isFinite(countValue) ? countValue === 1 : String(args.Count) === '1';
    const targetKey = isSingular ? singularKey : pluralKey;
    if (targetKey) {
      args.UnitsLabel = resolveTranslation(targetKey, lang, translations, fallbackLang);
    }
  }

  if (!Object.prototype.hasOwnProperty.call(args, 'StrongOpen') && element.hasAttribute('data-i18n-strong')) {
    args.StrongOpen = '<strong>';
    args.StrongClose = '</strong>';
  }

  return args;
}

function applyTranslations(lang, translations, fallbackLang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const template = resolveTranslation(key, lang, translations, fallbackLang);
    const args = buildArgs(element, lang, translations, fallbackLang);
    const rendered = renderTemplate(template, args);
    if (element.getAttribute('data-i18n-html') === 'true') {
      element.innerHTML = rendered;
    } else {
      element.textContent = rendered;
    }
  });
}

function initLanguage(translations) {
  const fallbackLang = getDefaultLocale(translations);
  const stored = readStoredLanguage();
  const initial = stored && translations[stored] ? stored : fallbackLang;
  applyLanguage(initial, { persist: false, silent: true });

  function applyLanguage(language, options = {}) {
    const { persist = true, silent = false } = options;
    const target = translations[language] ? language : fallbackLang;
    if (persist) {
      storeLanguage(target);
    }
    if (document.documentElement) {
      document.documentElement.lang = target;
    }
    if (document.body) {
      document.body.dataset.lang = target;
    }
    updateLanguageSelect(target);
    applyTranslations(target, translations, fallbackLang);
    window.facodiCurrentLanguage = target;
    window.facodiActiveTranslations = translations[target] || translations[fallbackLang] || {};
    if (!silent) {
      window.dispatchEvent(new CustomEvent('facodi:language-change', {
        detail: {
          lang: target,
          translations: window.facodiActiveTranslations,
        },
      }));
    }
  }

  window.facodiApplyLanguage = applyLanguage;
  updateLanguageSelect(initial);
  window.facodiCurrentLanguage = initial;
  window.facodiActiveTranslations = translations[initial] || translations[fallbackLang] || {};
}

function initLanguageSwitcher() {
  const select = document.querySelector('[data-facodi-language-select]');
  if (!select) {
    return;
  }

  select.addEventListener('change', (event) => {
    const value = String(event.target.value || '').trim();
    if (value && typeof window.facodiApplyLanguage === 'function') {
      window.facodiApplyLanguage(value, { persist: true, silent: false });
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  const translations = readTranslations();
  window.facodiTranslations = translations;
  initLanguage(translations);
  initLanguageSwitcher();
});
