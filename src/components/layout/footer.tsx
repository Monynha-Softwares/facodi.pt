'use client';

import Link from 'next/link';

import { useSiteText } from '@/hooks/use-site-text';

const communityLinks = [
    { label: 'GitHub', href: 'https://github.com/Monynha-Softwares', external: true },
    { label: 'Discord', href: 'https://discord.gg/monynha', external: true },
    { label: 'Notion', href: 'https://facodi.notion.site', external: true }
] as const;

export function Footer(): JSX.Element {
    const { copy } = useSiteText();

    return (
        <footer className="mt-24 bg-card/60 py-14" id="rodape">
            <div className="container grid gap-10 md:grid-cols-[2fr,1fr]">
                <div className="space-y-4">
                    <h2 className="font-display text-2xl font-semibold text-foreground">FACODI</h2>
                    <p className="max-w-xl text-base text-muted-foreground">{copy.footer.mission}</p>
                    <p className="text-sm text-muted-foreground">{copy.footer.legal}</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Comunidade</h3>
                    <ul className="space-y-2">
                        {communityLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="text-sm text-foreground transition-colors hover:text-primary" target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
