'use client';

import { cn } from '@/lib/utils';

const baseClass = 'sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-soft';

export const SkipToContent = () => (
  <a className={cn(baseClass)} href="#main-content">
    Ir para o conteúdo principal
  </a>
);
