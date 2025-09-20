'use client';

import { MoonStar, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function ThemeToggle(): JSX.Element {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <Button aria-label="Alternar tema" size="icon" variant="ghost">
                <SunMedium className="size-5" aria-hidden />
            </Button>
        );
    }

    const isDark = theme === 'dark';

    return (
        <Button aria-label={isDark ? 'Usar tema claro' : 'Usar tema escuro'} onClick={() => setTheme(isDark ? 'light' : 'dark')} size="icon" variant="ghost">
            {isDark ?
                <MoonStar className="size-5" aria-hidden />
            :   <SunMedium className="size-5" aria-hidden />}
        </Button>
    );
}
