'use client';

import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useSiteText } from '@/hooks/use-site-text';
import { cn } from '@/lib/utils';

const navItems = [
    { key: 'home', href: '#top' },
    { key: 'courses', href: '#cursos' },
    { key: 'about', href: '#sobre' },
    { key: 'contact', href: '#contato' }
] as const;

export function Navbar(): JSX.Element {
    const { copy } = useSiteText();

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-border/60 bg-background/80 px-6 py-4 shadow-soft">
                <Link href="/" className="flex items-center gap-2" aria-label="FACODI — voltar ao início">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-brand">
                        <GraduationCap className="size-5" aria-hidden />
                    </span>
                    <span className="font-display text-xl font-semibold">FACODI</span>
                </Link>
                <nav aria-label="Principal" className="hidden items-center gap-6 text-sm font-medium md:flex">
                    {navItems.map((item) => (
                        <Link key={item.key} href={item.href} className={cn('rounded-full px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground')}>
                            {copy.navigation[item.key]}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <Button asChild className="hidden md:inline-flex" size="sm">
                        <Link href="#cursos">{copy.navigation.courses}</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
