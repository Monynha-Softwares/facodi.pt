'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import type { RouteKey } from '@/config/i18n'
import { useSiteText } from '@/hooks/use-site-text'
import { cn } from '@/lib/utils'

import { LanguageSwitcher } from './language-switcher'
import { ThemeToggle } from './theme-toggle'

const NAV_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/sobre' },
  { key: 'projects', href: '/projetos' },
  { key: 'contact', href: '/contato' }
] satisfies Array<{ key: RouteKey; href: Route }>

export const SiteHeader = () => {
  const { text } = useSiteText()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link className="font-display text-xl font-semibold text-foreground" href="/">
          {text.siteTitle}
        </Link>
        <nav aria-label="Menu principal" className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={key}
              className={cn(
                'rounded-md px-2 py-1 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                pathname === href ? 'text-primary' : 'text-foreground'
              )}
              href={href}
            >
              {text.navigation[key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button asChild className="hidden md:inline-flex" size="sm" variant="secondary">
            <Link href="/contato">{text.navigation.contact}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
