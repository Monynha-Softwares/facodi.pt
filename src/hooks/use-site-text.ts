'use client';

import { useContext } from 'react';
import { SiteTextContext } from '@/providers/site-text-provider';

export function useSiteText() {
  const context = useContext(SiteTextContext);
  if (!context) {
    throw new Error('useSiteText deve ser utilizado dentro de SiteTextProvider');
  }
  return context;
}
