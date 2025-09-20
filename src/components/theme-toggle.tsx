'use client';

import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="text-foreground"
    >
      {isMounted ? (
        isDark ? (
          <MoonStar aria-hidden className="h-5 w-5" />
        ) : (
          <Sun aria-hidden className="h-5 w-5" />
        )
      ) : (
        <Sun aria-hidden className="h-5 w-5 animate-pulse" />
      )}
    </Button>
  );
}
