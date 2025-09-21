(function () {
  const storageKey = 'facodi-theme';
  const root = document.documentElement;
  const toggleSelector = '[data-facodi-theme-toggle]';
  const labelSelector = '[data-facodi-theme-toggle-label]';

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (err) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (err) {
      /* noop */
    }
  }

  function prefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function updateToggleButtons(theme) {
    const isDark = theme === 'dark';
    document.querySelectorAll(toggleSelector).forEach((btn) => {
      btn.setAttribute('aria-pressed', String(isDark));
      btn.dataset.theme = theme;
      const label = btn.querySelector(labelSelector);
      const darkLabel = btn.getAttribute('data-theme-dark-label');
      const lightLabel = btn.getAttribute('data-theme-light-label');
      if (label) {
        label.textContent = isDark ? lightLabel || '' : darkLabel || '';
      }
    });
  }

  function applyTheme(theme, persist = true) {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', normalized);
    root.classList.toggle('theme-dark', normalized === 'dark');
    if (persist) {
      setStoredTheme(normalized);
    }
    updateToggleButtons(normalized);
  }

  function initTheme() {
    const stored = getStoredTheme();
    const initial = stored || (prefersDark() ? 'dark' : 'light');
    applyTheme(initial, false);

    document.querySelectorAll(toggleSelector).forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (event) => {
      if (getStoredTheme()) {
        return;
      }
      applyTheme(event.matches ? 'dark' : 'light', false);
    });

    window.addEventListener('storage', (event) => {
      if (event.key === storageKey && event.newValue) {
        applyTheme(event.newValue, false);
      }
    });
  }

  function initLanguageSwitcher() {
    const switchers = document.querySelectorAll('[data-facodi-language-switcher]');
    if (!switchers.length) {
      return;
    }

    switchers.forEach((details) => {
      details.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (link) {
          details.removeAttribute('open');
        }
      });
    });

    document.addEventListener('click', (event) => {
      switchers.forEach((details) => {
        if (!details.contains(event.target)) {
          details.removeAttribute('open');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguageSwitcher();
  });
})();
