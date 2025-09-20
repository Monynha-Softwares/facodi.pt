'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useSiteText } from '@/hooks/use-site-text';

export function ThemeToggle(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const {
    labels: {
      nav: { theme: themeLabel }
    }
  } = useSiteText();

  const isDark = theme === 'dark';

  return (
    <Button
      aria-label={themeLabel}
      variant="ghost"
      size="sm"
      className="rounded-full border-border/40 bg-card/60 px-3"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </Button>
  );
}
