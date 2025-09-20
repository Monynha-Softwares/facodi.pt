'use client';

import { useContext } from 'react';

import { SiteTextContext } from '@/components/providers/site-text-provider';

export function useSiteText() {
  const context = useContext(SiteTextContext);

  if (!context) {
    throw new Error('useSiteText must be used within a SiteTextProvider');
  }

  return context;
}
