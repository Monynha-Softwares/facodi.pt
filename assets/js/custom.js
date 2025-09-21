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

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguageSwitcher();
});
