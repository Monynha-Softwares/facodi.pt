'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = mounted ? resolvedTheme ?? theme : 'light';
  const isDark = current === 'dark';

  return (
    <Button
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="border-border/60 bg-background/70 text-foreground shadow-none backdrop-blur"
    >
      {isDark ? <Sun size={18} aria-hidden className="text-warning" /> : <Moon size={18} aria-hidden />}
      <span className="sr-only">{isDark ? 'Tema claro' : 'Tema escuro'}</span>
    </Button>
  );
}
