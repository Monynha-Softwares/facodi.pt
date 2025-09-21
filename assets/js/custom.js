const THEME_STORAGE_KEY = 'facodi-theme-preference';
const GOOGLE_TRANSLATE_STORAGE_KEY = 'facodi-google-translate-target';
const GOOGLE_TRANSLATE_SCRIPT_URL =
  'https://translate.google.com/translate_a/element.js?cb=facodiGoogleTranslateInit';
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

let googleTranslateLoader = null;

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

function readStoredGoogleTarget() {
  try {
    return localStorage.getItem(GOOGLE_TRANSLATE_STORAGE_KEY) || '';
  } catch (error) {
    return '';
  }
}

function storeGoogleTarget(value) {
  try {
    if (value) {
      localStorage.setItem(GOOGLE_TRANSLATE_STORAGE_KEY, value);
    } else {
      localStorage.removeItem(GOOGLE_TRANSLATE_STORAGE_KEY);
    }
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

function loadGoogleTranslateElement(options) {
  const { defaultLanguage, languages, containerId } = options;

  if (!Array.isArray(languages) || languages.length === 0) {
    return Promise.reject(new Error('Google Translate languages are not configured.'));
  }

  if (window.facodiGoogleTranslateElement) {
    return Promise.resolve(window.facodiGoogleTranslateElement);
  }

  if (
    window.google &&
    window.google.translate &&
    typeof window.google.translate.TranslateElement === 'function'
  ) {
    window.facodiGoogleTranslateElement = new window.google.translate.TranslateElement(
      {
        pageLanguage: defaultLanguage,
        includedLanguages: languages.join(','),
        autoDisplay: false,
      },
      containerId
    );
    return Promise.resolve(window.facodiGoogleTranslateElement);
  }

  if (googleTranslateLoader) {
    return googleTranslateLoader;
  }

  googleTranslateLoader = new Promise((resolve, reject) => {
    const cleanup = () => {
      delete window.facodiGoogleTranslateInit;
    };

    window.facodiGoogleTranslateInit = () => {
      try {
        window.facodiGoogleTranslateElement = new window.google.translate.TranslateElement(
          {
            pageLanguage: defaultLanguage,
            includedLanguages: languages.join(','),
            autoDisplay: false,
          },
          containerId
        );
        cleanup();
        resolve(window.facodiGoogleTranslateElement);
      } catch (error) {
        cleanup();
        googleTranslateLoader = null;
        reject(error);
      }
    };

    const script = document.createElement('script');
    script.src = GOOGLE_TRANSLATE_SCRIPT_URL;
    script.async = true;
    script.onerror = () => {
      cleanup();
      googleTranslateLoader = null;
      reject(new Error('Google Translate failed to load'));
    };
    document.head.appendChild(script);
  });

  return googleTranslateLoader;
}

function initGoogleTranslate() {
  const select = document.querySelector('[data-facodi-google-translate-select]');
  const container = document.getElementById('facodi-google-translate-container');

  if (!select || !container) {
    return;
  }

  const languagesAttr = select.getAttribute('data-google-translate-languages') || '';
  const languages = languagesAttr
    .split(',')
    .map((lang) => lang.trim())
    .filter(Boolean);

  if (languages.length === 0) {
    return;
  }

  const defaultLanguage = select.getAttribute('data-default-lang') || 'pt';
  const defaultNote = select.getAttribute('data-note-default') || '';
  const activePrefix = select.getAttribute('data-note-prefix') || '';
  const errorMessage = select.getAttribute('data-error-message') || '';
  const note = document.getElementById('facodi-google-translate-note');

  if (note) {
    note.textContent = defaultNote;
  }

  const updateNote = (value) => {
    if (!note) {
      return;
    }
    note.classList.remove('facodi-navbar__note--error');
    if (!value) {
      note.textContent = defaultNote;
      note.classList.remove('facodi-navbar__note--active');
      return;
    }
    const option = select.querySelector(`option[value="${value}"]`);
    const label = option ? option.textContent.trim() : value;
    const message = activePrefix ? `${activePrefix} ${label}` : label;
    note.textContent = activePrefix ? `${message}.` : message;
    note.classList.add('facodi-navbar__note--active');
  };

  let googleCombo = null;

  const applySelection = (value) => {
    if (!googleCombo) {
      return;
    }
    const targetValue = value || '';
    if (googleCombo.value !== targetValue) {
      googleCombo.value = targetValue;
    }
    googleCombo.dispatchEvent(new Event('change'));
  };

  const storedValue = readStoredGoogleTarget();
  if (storedValue && languages.includes(storedValue)) {
    select.value = storedValue;
    updateNote(storedValue);
  } else {
    select.value = '';
    updateNote('');
    if (storedValue) {
      storeGoogleTarget('');
    }
  }

  const loadPromise = loadGoogleTranslateElement({
    defaultLanguage,
    languages,
    containerId: 'facodi-google-translate-container',
  })
    .then(() => {
      googleCombo =
        container.querySelector('select.goog-te-combo') || document.getElementById('goog-te-combo');

      if (googleCombo) {
        googleCombo.setAttribute('aria-hidden', 'true');
        googleCombo.tabIndex = -1;
      }

      const initial = select.value && languages.includes(select.value) ? select.value : '';
      if (initial !== select.value) {
        select.value = initial;
      }
      updateNote(initial);
      applySelection(initial);
    })
    .catch((error) => {
      if (note) {
        note.textContent = errorMessage || defaultNote;
        note.classList.remove('facodi-navbar__note--active');
        note.classList.add('facodi-navbar__note--error');
      }
      select.setAttribute('disabled', 'true');
      select.setAttribute('aria-disabled', 'true');
      storeGoogleTarget('');
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('FACODI Google Translate failed to initialise.', error);
      }
    });

  select.addEventListener('change', (event) => {
    const value = event.target.value;
    const normalized = value && languages.includes(value) ? value : '';
    if (normalized !== value) {
      select.value = normalized;
    }
    storeGoogleTarget(normalized);
    updateNote(normalized);
    loadPromise
      .then(() => {
        applySelection(normalized);
      })
      .catch(() => {
        // Error already handled when loading the Google Translate script.
      });
  });
}

function initLanguageSwitcher() {
  const select = document.querySelector('[data-facodi-language-select]');
  if (!select) {
    return;
  }

  select.addEventListener('change', (event) => {
    const target = event.target.value;
    if (target && typeof target === 'string') {
      window.location.assign(target);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguageSwitcher();
  initGoogleTranslate();
});
