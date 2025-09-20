export const designTokens = {
    palette: {
        primary: {
            base: '328 86% 56%',
            foreground: '318 100% 97%'
        },
        secondary: {
            base: '258 89% 66%',
            foreground: '260 100% 98%'
        },
        accent: {
            base: '190 92% 46%',
            foreground: '188 100% 97%'
        },
        neutral: {
            background: '0 0% 100%',
            foreground: '222 26% 16%',
            subtle: '222 33% 96%',
            border: '220 14% 83%'
        },
        neutralDark: {
            background: '220 27% 8%',
            foreground: '210 33% 95%',
            subtle: '220 23% 14%',
            border: '219 14% 28%'
        },
        destructive: {
            base: '348 94% 61%',
            foreground: '348 100% 97%'
        }
    },
    fonts: {
        sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: 'Space Grotesk, Inter, system-ui, sans-serif',
        mono: "JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace"
    },
    radius: {
        base: '1.25rem',
        pill: '9999px'
    },
    shadows: {
        brand: '0 25px 55px -25px rgba(233, 30, 99, 0.55)',
        soft: '0 18px 40px -20px rgba(15, 23, 42, 0.45)'
    }
} as const;

export const themeVariables = {
    light: {
        '--color-background': designTokens.palette.neutral.background,
        '--color-foreground': designTokens.palette.neutral.foreground,
        '--color-muted': designTokens.palette.neutral.subtle,
        '--color-muted-foreground': '222 15% 36%',
        '--color-card': designTokens.palette.neutral.background,
        '--color-card-foreground': designTokens.palette.neutral.foreground,
        '--color-border': designTokens.palette.neutral.border,
        '--color-input': '222 16% 88%',
        '--color-primary': designTokens.palette.primary.base,
        '--color-primary-foreground': designTokens.palette.primary.foreground,
        '--color-secondary': designTokens.palette.secondary.base,
        '--color-secondary-foreground': designTokens.palette.secondary.foreground,
        '--color-accent': designTokens.palette.accent.base,
        '--color-accent-foreground': designTokens.palette.accent.foreground,
        '--color-destructive': designTokens.palette.destructive.base,
        '--color-destructive-foreground': designTokens.palette.destructive.foreground,
        '--radius': designTokens.radius.base
    },
    dark: {
        '--color-background': designTokens.palette.neutralDark.background,
        '--color-foreground': designTokens.palette.neutralDark.foreground,
        '--color-muted': designTokens.palette.neutralDark.subtle,
        '--color-muted-foreground': '213 14% 68%',
        '--color-card': '222 24% 11%',
        '--color-card-foreground': designTokens.palette.neutralDark.foreground,
        '--color-border': designTokens.palette.neutralDark.border,
        '--color-input': '220 16% 27%',
        '--color-primary': designTokens.palette.primary.base,
        '--color-primary-foreground': designTokens.palette.primary.foreground,
        '--color-secondary': designTokens.palette.secondary.base,
        '--color-secondary-foreground': designTokens.palette.secondary.foreground,
        '--color-accent': designTokens.palette.accent.base,
        '--color-accent-foreground': designTokens.palette.accent.foreground,
        '--color-destructive': designTokens.palette.destructive.base,
        '--color-destructive-foreground': designTokens.palette.destructive.foreground,
        '--radius': designTokens.radius.base
    }
} as const;

export type ThemeMode = keyof typeof themeVariables;

export const themeFontVariables = {
    '--font-sans': designTokens.fonts.sans,
    '--font-display': designTokens.fonts.display,
    '--font-mono': designTokens.fonts.mono
} as const;

export const getThemeVariables = (mode: ThemeMode): Record<string, string> => ({
    ...themeFontVariables,
    ...themeVariables[mode]
});
