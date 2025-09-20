import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

import { radius, shadows } from './src/styles/theme'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        warning: 'var(--warning)'
      },
      borderRadius: {
        lg: radius.lg,
        md: radius.md,
        sm: radius.sm,
        xl: radius.xl,
        full: radius.full
      },
      boxShadow: {
        soft: shadows.soft,
        subtle: shadows.subtle,
        focus: shadows.focus
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-sora)', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}

export default config
