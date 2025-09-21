const THEME_STORAGE_KEY = 'facodi-theme-preference';
const LOCALE_STORAGE_KEY = 'facodi-locale';
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

let facodiConfig = {
  defaultLocale: 'pt',
  defaultGoogle: 'pt',
  locales: []
};
let facodiTranslations = {};
let currentLocale = 'pt';
let googleTranslateReady = false;
let pendingGoogleTarget = null;

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

function parseJSONContent(element) {
  if (!element) {
    return null;
  }
  const raw = element.textContent || element.innerText || '';
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function normalizeLocaleCode(code) {
  return (code || '').toString().trim().toLowerCase();
}

function loadConfig() {
  const data = parseJSONContent(document.getElementById('facodi-config')) || {};
  const locales = Array.isArray(data.locales) ? data.locales : [];
  const mappedLocales = locales
    .map((entry) => {
      const code = normalizeLocaleCode(entry.code || entry.Code);
      if (!code) {
        return null;
      }
      const label = entry.label || entry.Label || code.toUpperCase();
      const google = normalizeLocaleCode(entry.google || entry.Google || code);
      return { code, label, google: google || code };
    })
    .filter(Boolean);

  if (!mappedLocales.length) {
    mappedLocales.push({ code: 'pt', label: 'Português', google: 'pt' });
  }

  const defaultLocale = normalizeLocaleCode(data.defaultLocale || facodiConfig.defaultLocale || mappedLocales[0].code);
  const defaultEntry = mappedLocales.find((entry) => entry.code === defaultLocale) || mappedLocales[0];

  facodiConfig = {
    defaultLocale: defaultEntry.code,
    defaultGoogle: defaultEntry.google || defaultEntry.code,
    locales: mappedLocales
  };
  currentLocale = facodiConfig.defaultLocale;
}

function loadTranslations() {
  const data = parseJSONContent(document.getElementById('facodi-translations')) || {};
  const entries = Object.keys(data).reduce((acc, locale) => {
    const normalized = normalizeLocaleCode(locale);
    const dictionary = data[locale] || {};
    const mapped = Object.keys(dictionary).reduce((map, key) => {
      const value = dictionary[key];
      if (typeof value === 'string') {
        map[key] = value;
      }
      return map;
    }, {});
    if (normalized) {
      acc[normalized] = mapped;
    }
    return acc;
  }, {});
  facodiTranslations = entries;
}

function getLocaleInfo(locale) {
  const normalized = normalizeLocaleCode(locale);
  return facodiConfig.locales.find((entry) => entry.code === normalized) || null;
}

function readStoredLocale() {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return stored ? normalizeLocaleCode(stored) : null;
  } catch (error) {
    return null;
  }
}

function storeLocale(value) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, value);
  } catch (error) {
    // Ignore persistence errors.
  }
}

function parseVars(element) {
  const raw = element.getAttribute('data-i18n-vars');
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    return Object.keys(parsed).reduce((acc, key) => {
      const value = parsed[key];
      if (value === null || value === undefined) {
        return acc;
      }
      acc[key] = typeof value === 'string' ? value : String(value);
      return acc;
    }, {});
  } catch (error) {
    return null;
  }
}

const PLACEHOLDER_PATTERN = /\{\{\s*\.([A-Za-z0-9_]+)\s*\}\}/g;

function renderTemplate(template, vars) {
  if (typeof template !== 'string' || !vars) {
    return template;
  }
  return template.replace(PLACEHOLDER_PATTERN, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      return vars[key];
    }
    return match;
  });
}

function getTranslation(locale, key) {
  if (!key) {
    return undefined;
  }
  const normalized = normalizeLocaleCode(locale);
  const fallbackLocale = facodiConfig.defaultLocale;
  const primary = facodiTranslations[normalized] || {};
  if (Object.prototype.hasOwnProperty.call(primary, key)) {
    return primary[key];
  }
  const fallback = facodiTranslations[fallbackLocale] || {};
  return fallback[key];
}

function applyTranslations(locale) {
  if (!facodiTranslations || !Object.keys(facodiTranslations).length) {
    return;
  }
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (!key) {
      return;
    }
    const template = getTranslation(locale, key);
    if (typeof template !== 'string') {
      return;
    }
    const vars = parseVars(element);
    const rendered = renderTemplate(template, vars);
    if (element.hasAttribute('data-i18n-html')) {
      element.innerHTML = rendered;
    } else {
      element.textContent = rendered;
    }
  });

  const attrElements = document.querySelectorAll('[data-i18n-attr]');
  attrElements.forEach((element) => {
    const mappingRaw = element.getAttribute('data-i18n-attr');
    if (!mappingRaw) {
      return;
    }
    let mapping;
    try {
      mapping = JSON.parse(mappingRaw);
    } catch (error) {
      return;
    }
    const vars = parseVars(element);
    Object.keys(mapping).forEach((attr) => {
      const attrKey = mapping[attr];
      const template = getTranslation(locale, attrKey);
      if (typeof template !== 'string') {
        return;
      }
      const rendered = renderTemplate(template, vars);
      element.setAttribute(attr, rendered);
    });
  });
}

function updateLocaleIndicators(locale) {
  const normalized = normalizeLocaleCode(locale) || facodiConfig.defaultLocale;
  root.lang = normalized;
  if (document.body) {
    document.body.dataset.lang = normalized;
  }
}

function setSelectValue(locale) {
  const select = document.querySelector('[data-facodi-language-select]');
  if (!select) {
    return;
  }
  const normalized = normalizeLocaleCode(locale);
  const available = facodiConfig.locales.map((entry) => entry.code);
  const target = available.includes(normalized) ? normalized : facodiConfig.defaultLocale;
  select.value = target;
}

function shouldAutoTranslate() {
  const body = document.body;
  if (!body) {
    return false;
  }
  return body.dataset.autoTranslate === 'true';
}

function hideGoogleArtifacts() {
  const bannerFrames = document.querySelectorAll('.goog-te-banner-frame, .goog-te-balloon-frame');
  bannerFrames.forEach((frame) => {
    frame.style.setProperty('display', 'none', 'important');
  });
  document.documentElement.style.top = '0px';
  if (document.body) {
    document.body.style.top = '0px';
  }
}

function applyGoogleTranslation(targetCode) {
  const combo = document.querySelector('.goog-te-combo');
  if (!combo) {
    return false;
  }
  const normalized = normalizeLocaleCode(targetCode);
  const defaultGoogle = normalizeLocaleCode(facodiConfig.defaultGoogle);
  const value = !normalized || normalized === defaultGoogle ? '' : normalized;
  if (combo.value !== value) {
    combo.value = value;
  }
  combo.dispatchEvent(new Event('change'));
  hideGoogleArtifacts();
  pendingGoogleTarget = null;
  return true;
}

function scheduleGoogleTranslation(locale) {
  const shouldTranslate = locale !== facodiConfig.defaultLocale && shouldAutoTranslate();
  const info = getLocaleInfo(locale);
  const target = shouldTranslate ? (info && info.google ? info.google : locale) : facodiConfig.defaultGoogle;
  pendingGoogleTarget = target;
  if (googleTranslateReady) {
    applyGoogleTranslation(target);
  }
}

function markProtectedContent() {
  const body = document.body;
  if (!body) {
    return;
  }
  if (body.dataset.course || body.dataset.uc || body.dataset.topic) {
    const main = document.getElementById('main-content');
    if (main) {
      main.classList.add('notranslate');
      main.setAttribute('translate', 'no');
    }
  }
}

function setLocale(locale) {
  const normalized = normalizeLocaleCode(locale);
  const available = facodiConfig.locales.map((entry) => entry.code);
  const target = available.includes(normalized) ? normalized : facodiConfig.defaultLocale;
  currentLocale = target;
  applyTranslations(target);
  updateLocaleIndicators(target);
  setSelectValue(target);
  storeLocale(target);
  scheduleGoogleTranslation(target);
}

function initLanguageSwitcher() {
  const select = document.querySelector('[data-facodi-language-select]');
  if (!select) {
    return;
  }
  select.addEventListener('change', (event) => {
    setLocale(event.target.value);
  });
}

function initializeLocalization() {
  loadConfig();
  loadTranslations();
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  markProtectedContent();
  initializeLocalization();
  initLanguageSwitcher();
  const storedLocale = readStoredLocale();
  setLocale(storedLocale || facodiConfig.defaultLocale);
});

document.addEventListener('facodi:googleTranslateReady', () => {
  googleTranslateReady = true;
  if (pendingGoogleTarget === null) {
    scheduleGoogleTranslation(currentLocale);
  } else {
    applyGoogleTranslation(pendingGoogleTarget);
  }
  hideGoogleArtifacts();
});
