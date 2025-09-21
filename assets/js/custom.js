const THEME_STORAGE_KEY = 'facodi-theme-preference';
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

function initGoogleTranslate() {
  const wrapper = document.querySelector('[data-facodi-google-translate]');
  if (!wrapper) {
    return;
  }

  const scriptId = 'facodi-google-translate-script';
  if (document.getElementById(scriptId)) {
    return;
  }

  const labelElement = wrapper.querySelector('[data-facodi-google-translate-label]');
  const labelText = labelElement ? labelElement.textContent.trim() : '';
  const labelId = labelElement ? labelElement.id : '';

  const applyStyling = () => {
    const gadget = wrapper.querySelector('.goog-te-gadget');
    if (!gadget) {
      return false;
    }

    gadget.classList.add('facodi-translate__gadget');

    const icon = gadget.querySelector('.goog-te-gadget-icon');
    if (icon) {
      icon.remove();
    }

    gadget.querySelectorAll('span').forEach((span) => {
      span.style.display = 'none';
      span.setAttribute('aria-hidden', 'true');
    });

    const select = gadget.querySelector('select.goog-te-combo');
    if (!select) {
      return false;
    }

    select.classList.add('facodi-navbar__select', 'facodi-navbar__select--translator');
    if (labelText) {
      select.setAttribute('aria-label', labelText);
    }
    if (labelId) {
      select.setAttribute('aria-labelledby', labelId);
    }

    return true;
  };

  window.googleTranslateElementInit = () => {
    if (!window.google || !window.google.translate) {
      return;
    }

    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'pt',
        includedLanguages: 'en,es,fr',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      'facodi-google-translate',
    );

    const observer = new MutationObserver(() => {
      if (applyStyling()) {
        observer.disconnect();
      }
    });

    observer.observe(wrapper, { childList: true, subtree: true });
    applyStyling();
  };

  const script = document.createElement('script');
  script.id = scriptId;
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.defer = true;
  document.head.appendChild(script);
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguageSwitcher();
  initGoogleTranslate();
});
