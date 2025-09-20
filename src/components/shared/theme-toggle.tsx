'use client';

import { MoonStar, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useSiteText } from '@/hooks/use-site-text';

export const ThemeToggle = () => {
  const { copy } = useSiteText();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const label = mounted ? (isDark ? `${copy.navigation.themeToggle} (dark)` : `${copy.navigation.themeToggle} (light)`) : copy.navigation.themeToggle;

  return (
    <Button
      aria-label={label}
      title={label}
      variant="ghost"
      size="icon"
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative"
    >
      <SunMedium className="h-5 w-5 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
      <MoonStar className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
    </Button>
  );
};
