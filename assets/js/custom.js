(function () {
    const storageKey = 'facodi-theme';
    const root = document.documentElement;
    const themeToggleSelector = '[data-theme-toggle]';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const readStoredTheme = () => {
        try {
            return localStorage.getItem(storageKey);
        } catch (error) {
            return null;
        }
    };

    const writeStoredTheme = (value) => {
        try {
            localStorage.setItem(storageKey, value);
        } catch (error) {
            /* noop */
        }
    };

    const updateToggleUi = (theme) => {
        const toggle = document.querySelector(themeToggleSelector);
        if (!toggle) {
            return;
        }

        const lightLabel = toggle.getAttribute('data-theme-light') || 'Light';
        const darkLabel = toggle.getAttribute('data-theme-dark') || 'Dark';
        const textTarget = toggle.querySelector('.facodi-theme-toggle__text');

        if (textTarget) {
            textTarget.textContent = theme === 'dark' ? darkLabel : lightLabel;
        }

        toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    };

    const applyTheme = (theme, persist = true) => {
        const normalized = theme === 'dark' ? 'dark' : 'light';
        root.dataset.theme = normalized;
        root.style.colorScheme = normalized;

        if (persist) {
            writeStoredTheme(normalized);
        }

        updateToggleUi(normalized);
    };

    const resolveTheme = () => {
        const stored = readStoredTheme();
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }

        const current = root.dataset.theme;
        if (current === 'light' || current === 'dark') {
            return current;
        }

        return prefersDark.matches ? 'dark' : 'light';
    };

    const initThemeToggle = () => {
        const toggle = document.querySelector(themeToggleSelector);
        if (!toggle) {
            return;
        }

        toggle.addEventListener('click', () => {
            const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    };

    const bindSystemPreferenceListener = () => {
        const handleChange = (event) => {
            const stored = readStoredTheme();
            if (stored === 'light' || stored === 'dark') {
                return;
            }

            const nextTheme = event.matches ? 'dark' : 'light';
            applyTheme(nextTheme, false);
        };

        if (typeof prefersDark.addEventListener === 'function') {
            prefersDark.addEventListener('change', handleChange);
        } else if (typeof prefersDark.addListener === 'function') {
            prefersDark.addListener(handleChange);
        }
    };

    const init = () => {
        const initialTheme = resolveTheme();
        applyTheme(initialTheme, false);
        updateToggleUi(initialTheme);
        initThemeToggle();
        bindSystemPreferenceListener();
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
