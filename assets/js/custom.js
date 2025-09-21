const THEME_STORAGE_KEY = 'facodi-theme-preference';
const LANGUAGE_STORAGE_KEY = 'facodi-language-preference';
const GOOGLE_TRANSLATE_SCRIPT_ID = 'facodi-google-translate-script';
const LOG_PREFIX = '[FACODI]';

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

function parseJsonScript(id) {
  const script = document.getElementById(id);
  if (!script) {
    return null;
  }
  const content = script.textContent || script.innerText;
  if (!content) {
    return null;
  }
  try {
    return JSON.parse(content);
  } catch (error) {
    console.warn(`${LOG_PREFIX} Falha ao analisar script JSON #${id}.`, error);
    return null;
  }
}

const translationsPayload = parseJsonScript('facodi-translations') || {};
const AVAILABLE_LOCALES = Array.isArray(translationsPayload.locales)
  ? translationsPayload.locales.filter((locale) => locale && typeof locale.code === 'string')
  : [];
const AVAILABLE_CODES = AVAILABLE_LOCALES.map((locale) => locale.code);

function resolveLocale(code, fallback) {
  if (code && AVAILABLE_CODES.includes(code)) {
    return code;
  }
  if (fallback && AVAILABLE_CODES.includes(fallback)) {
    return fallback;
  }
  if (AVAILABLE_CODES.length > 0) {
    return AVAILABLE_CODES[0];
  }
  return 'pt';
}

const DEFAULT_LOCALE = resolveLocale(translationsPayload.defaultLocale, 'pt');
const FALLBACK_LOCALE = resolveLocale(translationsPayload.fallbackLocale, DEFAULT_LOCALE);
const MESSAGES_BY_LOCALE = translationsPayload.messages || {};

function readStoredLocale() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
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

function getLocaleConfig(code) {
  return AVAILABLE_LOCALES.find((locale) => locale.code === code) || null;
}

function getGoogleCode(locale) {
  const info = getLocaleConfig(locale);
  if (info && typeof info.googleCode === 'string' && info.googleCode.trim() !== '') {
    return info.googleCode;
  }
  return locale;
}

function translateTemplate(template, context) {
  if (!context) {
    return template;
  }
  return template.replace(/{{\s*\.([A-Za-z0-9_]+)\s*}}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(context, key)) {
      const value = context[key];
      return value === undefined || value === null ? '' : String(value);
    }
    return '';
  });
}

function getMessage(locale, key) {
  const messages = MESSAGES_BY_LOCALE[locale];
  if (!messages) {
    return undefined;
  }
  return messages[key];
}

function translateMessage(key, options = {}) {
  if (!key) {
    return '';
  }
  const { locale = currentLocale, context, fallback } = options;
  const targetLocale = resolveLocale(locale, FALLBACK_LOCALE);
  let template = getMessage(targetLocale, key);
  if (template === undefined && targetLocale !== FALLBACK_LOCALE) {
    template = getMessage(FALLBACK_LOCALE, key);
  }
  if (template === undefined && FALLBACK_LOCALE !== DEFAULT_LOCALE) {
    template = getMessage(DEFAULT_LOCALE, key);
  }
  if (template === undefined) {
    template = fallback;
  }
  if (template === undefined) {
    return '';
  }
  return translateTemplate(String(template), context);
}

function parseContextAttribute(value) {
  if (!value) {
    return undefined;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn(`${LOG_PREFIX} Falha ao analisar contexto de tradução.`, error);
    return undefined;
  }
}

function camelToKebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function applyTranslationToElement(element, locale) {
  if (!element) {
    return;
  }
  const key = element.dataset.i18nKey;
  if (key) {
    const context = parseContextAttribute(element.getAttribute('data-i18n-context'));
    const translation = translateMessage(key, { locale, context });
    if (element.dataset.i18nHtml === 'true') {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  }
  Object.keys(element.dataset).forEach((dataKey) => {
    if (!dataKey.startsWith('i18nAttr')) {
      return;
    }
    const suffix = dataKey.substring('i18nAttr'.length);
    if (!suffix) {
      return;
    }
    const attrName = camelToKebab(suffix);
    if (!attrName) {
      return;
    }
    const attrKey = element.dataset[dataKey];
    if (!attrKey) {
      return;
    }
    const contextAttr = element.getAttribute(`data-i18n-context-${attrName}`);
    const attrContext = parseContextAttribute(contextAttr);
    const value = translateMessage(attrKey, { locale, context: attrContext });
    element.setAttribute(attrName, value);
  });
}

function applyTranslations(locale) {
  const elements = document.querySelectorAll('[data-i18n-key], [data-i18n-watch="true"]');
  elements.forEach((element) => applyTranslationToElement(element, locale));
}

function updateDocumentLanguage(locale) {
  if (document.documentElement) {
    document.documentElement.setAttribute('lang', locale);
  }
  if (document.body) {
    document.body.dataset.lang = locale;
  }
}

const languageChangeListeners = new Set();
let currentLocale = resolveLocale(readStoredLocale(), DEFAULT_LOCALE);
let googleTranslateRequested = false;
let googleTranslateReady = false;
let pendingGoogleLocale = null;

function notifyLanguageChange(locale) {
  languageChangeListeners.forEach((listener) => {
    try {
      listener(locale);
    } catch (error) {
      console.warn(`${LOG_PREFIX} Falha ao notificar alteração de idioma.`, error);
    }
  });
}

function setGoogleTranslateLanguage(locale) {
  const normalized = resolveLocale(locale, DEFAULT_LOCALE);
  const googleCode = normalized === DEFAULT_LOCALE ? '' : getGoogleCode(normalized);
  pendingGoogleLocale = googleCode;
  if (!googleTranslateRequested) {
    loadGoogleTranslateScript();
  }
  if (!googleTranslateRequested) {
    return;
  }
  if (!googleTranslateReady) {
    return;
  }
  const container = document.getElementById('facodi-google-translate');
  const combo = container ? container.querySelector('select.goog-te-combo') : document.querySelector('.goog-te-combo');
  if (!combo) {
    return;
  }
  if (combo.value === googleCode) {
    return;
  }
  combo.value = googleCode;
  combo.dispatchEvent(new Event('change'));
  pendingGoogleLocale = null;
}

function applyAutoTranslationForPage(locale) {
  const body = document.body;
  if (!body) {
    return;
  }
  const dataset = body.dataset || {};
  const isCourseContext = Boolean(dataset.course || dataset.uc || dataset.topic);
  const targetLocale = isCourseContext ? DEFAULT_LOCALE : locale;
  setGoogleTranslateLanguage(targetLocale);
}

function loadGoogleTranslateScript() {
  if (googleTranslateRequested) {
    return;
  }
  const languages = AVAILABLE_LOCALES.filter((locale) => locale.code !== DEFAULT_LOCALE)
    .map((locale) => getGoogleCode(locale.code))
    .filter((code, index, array) => code && array.indexOf(code) === index);
  if (languages.length === 0) {
    return;
  }
  googleTranslateRequested = true;
  const script = document.createElement('script');
  script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
  script.src = `https://translate.googleapis.com/translate_a/element.js?cb=facodiGoogleTranslateInit&hl=${DEFAULT_LOCALE}`;
  script.defer = true;
  document.body.appendChild(script);
  window.facodiGoogleTranslateInit = () => {
    try {
      /* global google */
      new google.translate.TranslateElement(
        {
          pageLanguage: DEFAULT_LOCALE,
          includedLanguages: languages.join(','),
          autoDisplay: false,
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'facodi-google-translate',
      );
      googleTranslateReady = true;
      if (pendingGoogleLocale !== null) {
        const combo = document.querySelector('#facodi-google-translate select.goog-te-combo');
        if (combo) {
          combo.value = pendingGoogleLocale;
          combo.dispatchEvent(new Event('change'));
          pendingGoogleLocale = null;
        }
      }
    } catch (error) {
      console.warn(`${LOG_PREFIX} Falha ao inicializar Google Tradutor.`, error);
    }
  };
}

function setLocale(locale) {
  const normalized = resolveLocale(locale, DEFAULT_LOCALE);
  if (normalized === currentLocale) {
    applyTranslations(normalized);
    applyAutoTranslationForPage(normalized);
    return;
  }
  currentLocale = normalized;
  updateDocumentLanguage(currentLocale);
  applyTranslations(currentLocale);
  applyAutoTranslationForPage(currentLocale);
  storeLocale(currentLocale);
  notifyLanguageChange(currentLocale);
}

function getLocale() {
  return currentLocale;
}

const facodiI18n = {
  defaultLocale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  getLocale,
  setLocale,
  t(key, options = {}) {
    const opts = { ...options };
    if (!opts.locale) {
      opts.locale = currentLocale;
    }
    return translateMessage(key, opts);
  },
  onChange(callback) {
    if (typeof callback === 'function') {
      languageChangeListeners.add(callback);
    }
  },
  offChange(callback) {
    if (typeof callback === 'function') {
      languageChangeListeners.delete(callback);
    }
  },
};

window.facodiI18n = facodiI18n;

function initLanguageSwitcher() {
  const select = document.querySelector('[data-facodi-language-select]');
  if (!select) {
    return;
  }
  const syncSelect = (locale) => {
    if (select.value !== locale) {
      select.value = locale;
    }
  };
  syncSelect(currentLocale);
  facodiI18n.onChange(syncSelect);
  select.addEventListener('change', (event) => {
    const { value } = event.target;
    setLocale(value);
  });
}

function initI18n() {
  updateDocumentLanguage(currentLocale);
  applyTranslations(currentLocale);
  initLanguageSwitcher();
  loadGoogleTranslateScript();
  applyAutoTranslationForPage(currentLocale);
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n();
});
