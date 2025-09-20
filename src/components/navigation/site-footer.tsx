'use client';

import Link from 'next/link';

import { useSiteText } from '@/lib/hooks/use-site-text';

const footerLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/sobre' },
  { key: 'projects', href: '/projetos' },
  { key: 'contact', href: '/contato' },
] as const;

export function SiteFooter() {
  const { text } = useSiteText();

  return (
    <footer className="mt-16 border-t border-border/60 bg-background/80">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-highlight/40 shadow-soft">
              <span aria-hidden className="text-xl">
                🎓
              </span>
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">
                {text.site.title}
              </p>
              <p className="text-sm text-foreground/80">{text.site.tagline}</p>
            </div>
          </div>
          <p className="max-w-xl text-sm text-foreground/70">{text.footer.mission}</p>
        </div>
        <div className="grid gap-6 text-sm">
          <nav aria-label="Rodapé" className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
              Navegação
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    className="text-sm text-foreground/80 transition-colors hover:text-accent"
                    href={link.href}
                  >
                    {text.navigation[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
              Contato
            </p>
            <p className="text-sm text-foreground/80">{text.footer.contactCta}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 bg-background/60">
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs text-foreground/60">
          {text.footer.rights}
        </p>
      </div>
    </footer>
  );
}
