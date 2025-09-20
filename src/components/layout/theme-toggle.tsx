'use client'

import { MoonStar, SunMedium } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme-provider'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <Button
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
    >
      {isDark ? <SunMedium className="h-5 w-5" aria-hidden /> : <MoonStar className="h-5 w-5" aria-hidden />}
    </Button>
  )
}
