'use client'

import Link from 'next/link'

import { useSiteText } from '@/hooks/use-site-text'

const FOOTER_LINKS = [
  { key: 'about', href: '/sobre' },
  { key: 'projects', href: '/projetos' },
  { key: 'contact', href: '/contato' }
] as const

export const SiteFooter = () => {
  const { text } = useSiteText()

  return (
    <footer aria-label="Rodapé" className="border-t border-border/60 bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-foreground">{text.siteTitle}</p>
          <p className="max-w-xl text-sm text-muted-foreground">{text.siteDescription}</p>
        </div>
        <nav aria-label="Links institucionais" className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
          {FOOTER_LINKS.map((link) => (
            <Link className="hover:text-primary" key={link.key} href={link.href}>
              {text.navigation[link.key]}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border/40 bg-background/90 px-6 py-4 text-center text-xs text-muted-foreground">
        {text.footer.rights}
      </div>
    </footer>
  )
}
