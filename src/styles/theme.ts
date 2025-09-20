export type SiteTheme = {
  colors: {
    light: Record<string, string>;
    dark: Record<string, string>;
    gradients: Record<string, string>;
  };
  radii: Record<string, string>;
  shadows: Record<string, string>;
};

export const themeTokens: SiteTheme = {
  colors: {
    light: {
      background: '240 33% 99%',
      foreground: '222 47% 11%',
      primary: '248 95% 70%',
      'primary-foreground': '226 100% 98%',
      accent: '35 66% 67%',
      'accent-foreground': '24 42% 30%',
      muted: '219 36% 87%',
      'muted-foreground': '222 18% 34%',
      border: '220 36% 85%',
      ring: '248 95% 70%',
      card: '0 0% 100%',
      'card-foreground': '222 47% 11%'
    },
    dark: {
      background: '222 63% 8%',
      foreground: '213 31% 91%',
      primary: '251 95% 76%',
      'primary-foreground': '226 100% 10%',
      accent: '35 66% 57%',
      'accent-foreground': '26 52% 16%',
      muted: '224 29% 17%',
      'muted-foreground': '215 20% 65%',
      border: '224 29% 24%',
      ring: '251 95% 76%',
      card: '224 29% 17%',
      'card-foreground': '213 31% 91%'
    },
    gradients: {
      primary: '248 95% 70%',
      secondary: '215 83% 55%',
      accent: '35 66% 57%'
    }
  },
  radii: {
    xl: '1.25rem',
    lg: '1rem',
    md: '0.75rem',
    pill: '9999px'
  },
  shadows: {
    soft: '0 25px 50px -25px rgba(79, 70, 229, 0.35)',
    glow: '0 0 60px -30px rgba(223, 180, 105, 0.6)'
  }
};

const toCssVariables = (values: Record<string, string>, prefix = '') =>
  Object.entries(values)
    .map(([key, value]) => `  --${prefix}${key}: ${value};`)
    .join('\n');

export const themeCssVariables = `:root {\n${toCssVariables(themeTokens.colors.light)}\n${toCssVariables(themeTokens.radii, 'radius-')}\n${toCssVariables(themeTokens.shadows, 'shadow-')}\n${toCssVariables(themeTokens.colors.gradients, 'gradient-')}\n}\n\n.dark {\n${toCssVariables(themeTokens.colors.dark)}\n${toCssVariables(themeTokens.radii, 'radius-')}\n${toCssVariables(themeTokens.shadows, 'shadow-')}\n${toCssVariables(themeTokens.colors.gradients, 'gradient-')}\n}`;

export type SupportedColorMode = 'light' | 'dark';
