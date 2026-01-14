const THEME_STORAGE_KEY = 'facodi-theme-preference';
const LANGUAGE_STORAGE_KEY = 'facodi-language-preference';
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Ignore storage errors (e.g., privacy mode).
  }
}

function applyTheme(value, persist = true) {
  const theme = value === 'dark' ? 'dark' : 'light';
  root.dataset.theme = theme;
  if (persist) {
    safeStorageSet(THEME_STORAGE_KEY, theme);
  }
  const toggle = document.querySelector('[data-facodi-theme-toggle]');
  if (toggle) {
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
}

function initTheme() {
  const stored = safeStorageGet(THEME_STORAGE_KEY);
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
    if (!safeStorageGet(THEME_STORAGE_KEY)) {
      applyTheme(event.matches ? 'dark' : 'light', false);
    }
  };

  if (typeof prefersDark.addEventListener === 'function') {
    prefersDark.addEventListener('change', syncSystemPreference);
  } else if (typeof prefersDark.addListener === 'function') {
    prefersDark.addListener(syncSystemPreference);
  }
}

function initSheet() {
  const sheet = document.querySelector('[data-facodi-sheet]');
  const trigger = document.querySelector('[data-facodi-sheet-trigger]');
  if (!sheet || !trigger) {
    return;
  }

  const dialog = sheet.querySelector('[data-facodi-sheet-dialog]');
  if (!dialog) {
    return;
  }

  const closeButtons = sheet.querySelectorAll('[data-facodi-sheet-close]');
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');
  let lastActiveElement = null;

  const setState = (state) => {
    sheet.setAttribute('data-state', state);
    trigger.setAttribute('aria-expanded', state === 'open' ? 'true' : 'false');
    document.body.classList.toggle('facodi-sheet-open', state === 'open');
  };

  const openSheet = () => {
    if (sheet.getAttribute('data-state') === 'open') {
      return;
    }
    lastActiveElement = document.activeElement;
    setState('open');
    window.setTimeout(() => {
      const focusables = dialog.querySelectorAll(focusableSelectors);
      const focusTarget = focusables.length ? focusables[0] : dialog;
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
      }
    }, 0);
  };

  const closeSheet = () => {
    if (sheet.getAttribute('data-state') !== 'open') {
      return;
    }
    setState('closed');
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  };

  trigger.addEventListener('click', () => {
    if (sheet.getAttribute('data-state') === 'open') {
      closeSheet();
    } else {
      openSheet();
    }
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeSheet);
  });

  document.addEventListener('keydown', (event) => {
    if (sheet.getAttribute('data-state') !== 'open') {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSheet();
      return;
    }
    if (event.key !== 'Tab') {
      return;
    }
    const focusables = Array.from(dialog.querySelectorAll(focusableSelectors)).filter((el) => !el.hasAttribute('disabled'));
    if (!focusables.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const mediaQuery = window.matchMedia('(min-width: 992px)');
  const handleMediaChange = (event) => {
    if (event.matches) {
      closeSheet();
    }
  };

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleMediaChange);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(handleMediaChange);
  }
}

function parseJSONScript(id) {
  const script = document.getElementById(id);
  if (!script) {
    return null;
  }
  try {
    return JSON.parse(script.textContent || '{}');
  } catch (error) {
    console.warn('[FACODI] Falha ao analisar JSON embutido', id, error);
    return null;
  }
}

function createI18nManager() {
  const data = parseJSONScript('facodi-i18n');
  if (!data || typeof data !== 'object') {
    return null;
  }

  const translations = data.translations || {};
  const languages = Array.isArray(data.languages) ? data.languages : [];
  const defaultLocale = typeof data.default === 'string' && data.default ? data.default : (languages[0] && languages[0].code) || 'pt';
  const languageMap = new Map();

  languages.forEach((language) => {
    if (!language || !language.code) {
      return;
    }
    languageMap.set(language.code, {
      code: language.code,
      label: language.label || language.code.toUpperCase(),
      tag: language.tag || language.code,
      autoTranslate: Boolean(language.autoTranslate),
      isDefault: Boolean(language.isDefault),
    });
  });

  if (!languageMap.size) {
    languageMap.set(defaultLocale, {
      code: defaultLocale,
      label: defaultLocale.toUpperCase(),
      tag: defaultLocale,
      autoTranslate: false,
      isDefault: true,
    });
  }

  const attrPrefix = 'data-i18n-attr-';
  const listeners = new Set();
  const googleState = { ready: false, pending: null, element: null };

  const parseArgs = (value) => {
    if (!value) {
      return {};
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      console.warn('[FACODI] Falha ao analisar argumentos de tradução', value, error);
      return {};
    }
  };

  const formatTemplate = (template, args = {}) => {
    if (typeof template !== 'string' || !template) {
      return '';
    }
    return template.replace(/{{\s*\.([A-Za-z0-9_]+)\s*}}/g, (match, key) => {
      if (Object.prototype.hasOwnProperty.call(args, key)) {
        const value = args[key];
        return value === undefined || value === null ? '' : String(value);
      }
      return '';
    });
  };

  const getDictionary = (lang) => translations[lang] || {};

  const translate = (key, args = {}, langCode) => {
    if (!key) {
      return '';
    }
    const lang = langCode || currentLanguage;
    let template = getDictionary(lang)[key];
    if (!template && lang !== defaultLocale) {
      template = getDictionary(defaultLocale)[key];
    }
    if (!template && lang !== 'pt') {
      template = getDictionary('pt')[key];
    }
    return formatTemplate(template, args);
  };

  const applyAttributes = (element, args) => {
    Array.from(element.attributes).forEach((attribute) => {
      if (!attribute.name.startsWith(attrPrefix)) {
        return;
      }
      const targetName = attribute.name.slice(attrPrefix.length);
      if (!targetName) {
        return;
      }
      const targetKey = attribute.value;
      const translated = translate(targetKey, args);
      if (translated !== undefined) {
        element.setAttribute(targetName, translated);
      }
    });
  };

  const applyTranslations = () => {
    const elements = document.querySelectorAll('[data-i18n-key]');
    elements.forEach((element) => {
      const key = element.getAttribute('data-i18n-key');
      if (!key) {
        return;
      }
      const mode = element.getAttribute('data-i18n-mode') || 'text';
      const argsValue = element.getAttribute('data-i18n-args');
      const args = parseArgs(argsValue);
      const translated = translate(key, args);
      if (mode === 'html') {
        element.innerHTML = translated;
      } else {
        element.textContent = translated;
      }
      applyAttributes(element, args);
    });

    const attrOnlyElements = document.querySelectorAll('[data-i18n-attr-aria-label], [data-i18n-attr-title]');
    attrOnlyElements.forEach((element) => {
      if (element.hasAttribute('data-i18n-key')) {
        return;
      }
      const args = parseArgs(element.getAttribute('data-i18n-args'));
      applyAttributes(element, args);
    });
  };

  const resolveInitialLanguage = () => {
    const stored = safeStorageGet(LANGUAGE_STORAGE_KEY);
    if (stored && languageMap.has(stored)) {
      return stored;
    }
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang) {
      for (const language of languageMap.values()) {
        const code = (language.code || '').toLowerCase();
        const tag = (language.tag || '').toLowerCase();
        if (code && (browserLang === code || browserLang.startsWith(`${code}-`))) {
          return language.code;
        }
        if (tag && browserLang === tag) {
          return language.code;
        }
      }
    }
    for (const language of languageMap.values()) {
      if (language.isDefault) {
        return language.code;
      }
    }
    return defaultLocale;
  };

  const updateDocumentLanguage = () => {
    const meta = languageMap.get(currentLanguage);
    const tag = (meta && meta.tag) || currentLanguage || defaultLocale;
    root.setAttribute('lang', tag);
    root.dataset.lang = currentLanguage;
    if (document.body) {
      document.body.dataset.lang = currentLanguage;
    }
  };

  const applyGoogleTranslate = (targetLang) => {
    if (!googleState.ready) {
      googleState.pending = targetLang;
      return;
    }
    const combo = document.querySelector('.goog-te-combo');
    if (!combo) {
      googleState.pending = targetLang;
      return;
    }
    const value = targetLang || '';
    if (combo.value === value) {
      return;
    }
    combo.value = value;
    combo.dispatchEvent(new Event('change'));
  };

  const handleGoogleTranslate = () => {
    const current = languageMap.get(currentLanguage);
    const shouldTranslate = current && current.autoTranslate && current.code !== defaultLocale;
    applyGoogleTranslate(shouldTranslate ? current.code : '');
  };

  let api;

  const setLanguage = (value) => {
    const target = languageMap.has(value) ? value : defaultLocale;
    if (target === currentLanguage) {
      handleGoogleTranslate();
      return;
    }
    currentLanguage = target;
    safeStorageSet(LANGUAGE_STORAGE_KEY, target);
    updateDocumentLanguage();
    applyTranslations();
    handleGoogleTranslate();
    listeners.forEach((callback) => {
      try {
        callback(target);
      } catch (error) {
        console.warn('[FACODI] Erro ao notificar mudança de idioma', error);
      }
    });
    if (api) {
      document.dispatchEvent(new CustomEvent('facodi:i18n-change', { detail: { manager: api, language: target } }));
    }
  };

  const onChange = (callback) => {
    if (typeof callback === 'function') {
      listeners.add(callback);
    }
    return () => listeners.delete(callback);
  };

  const registerGoogleElement = () => {
    if (!window.google || !window.google.translate) {
      return;
    }
    const included = languages
      .filter((language) => language && language.autoTranslate && language.code && language.code !== defaultLocale)
      .map((language) => language.code)
      .join(',');
    if (!googleState.element) {
      googleState.element = new window.google.translate.TranslateElement(
        {
          pageLanguage: defaultLocale,
          includedLanguages: included || undefined,
          autoDisplay: false,
        },
        'facodi-google-translate',
      );
    }
    googleState.ready = true;
    if (googleState.pending !== null) {
      applyGoogleTranslate(googleState.pending);
      googleState.pending = null;
    } else {
      handleGoogleTranslate();
    }
  };

  let currentLanguage = resolveInitialLanguage();
  updateDocumentLanguage();
  applyTranslations();

  api = {
    data,
    translations,
    languages,
    defaultLocale,
    getCurrentLanguage: () => currentLanguage,
    translate,
    applyTranslations,
    setLanguage,
    onChange,
    registerGoogleElement,
    applyGoogleTranslate,
  };

  return api;
}

function initLanguage() {
  const manager = createI18nManager();
  if (!manager) {
    return;
  }
  window.facodiI18n = manager;
  document.dispatchEvent(new CustomEvent('facodi:i18n-ready', { detail: { manager } }));
  document.dispatchEvent(new CustomEvent('facodi:i18n-change', { detail: { manager, language: manager.getCurrentLanguage() } }));

  const select = document.querySelector('[data-facodi-language-select]');
  if (select) {
    const updateSelect = (value) => {
      const option = Array.from(select.options).find((item) => item.value === value);
      if (option) {
        option.selected = true;
      } else if (select.options.length) {
        select.selectedIndex = 0;
      }
    };
    updateSelect(manager.getCurrentLanguage());
    select.addEventListener('change', (event) => {
      const value = event.target.value;
      manager.setLanguage(value);
    });
    manager.onChange((value) => {
      updateSelect(value);
    });
  }

  if (typeof window.google !== 'undefined' && window.google.translate) {
    manager.registerGoogleElement();
  }
}

window.facodiGoogleTranslateInit = function facodiGoogleTranslateInit() {
  if (window.facodiI18n && typeof window.facodiI18n.registerGoogleElement === 'function') {
    window.facodiI18n.registerGoogleElement();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSheet();
  initLanguage();
});
