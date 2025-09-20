import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: ['class'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                '2xl': '1280px'
            }
        },
        extend: {
            colors: {
                'background': 'hsl(var(--color-background) / <alpha-value>)',
                'foreground': 'hsl(var(--color-foreground) / <alpha-value>)',
                'muted': 'hsl(var(--color-muted) / <alpha-value>)',
                'muted-foreground': 'hsl(var(--color-muted-foreground) / <alpha-value>)',
                'card': 'hsl(var(--color-card) / <alpha-value>)',
                'card-foreground': 'hsl(var(--color-card-foreground) / <alpha-value>)',
                'border': 'hsl(var(--color-border) / <alpha-value>)',
                'input': 'hsl(var(--color-input) / <alpha-value>)',
                'primary': {
                    DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
                    foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)'
                },
                'secondary': {
                    DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
                    foreground: 'hsl(var(--color-secondary-foreground) / <alpha-value>)'
                },
                'accent': {
                    DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
                    foreground: 'hsl(var(--color-accent-foreground) / <alpha-value>)'
                },
                'destructive': {
                    DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)',
                    foreground: 'hsl(var(--color-destructive-foreground) / <alpha-value>)'
                }
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'system-ui'],
                display: ['var(--font-display)', 'var(--font-sans)', 'system-ui'],
                mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace']
            },
            borderRadius: {
                'lg': 'calc(var(--radius) - 4px)',
                'md': 'calc(var(--radius) - 6px)',
                'sm': 'calc(var(--radius) - 8px)',
                'xl': '1.5rem',
                '2xl': '2rem'
            },
            boxShadow: {
                brand: '0 22px 45px -18px rgba(229, 46, 113, 0.45)',
                soft: '0 18px 40px -24px rgba(15, 23, 42, 0.35)'
            }
        }
    },
    plugins: []
};

export default config;
