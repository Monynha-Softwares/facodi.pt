import type { Metadata } from 'next';

import { defaultLocale, siteText } from '@/config/i18n';

const baseCopy = siteText[defaultLocale];

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://facodi.monynha.dev'),
  title: {
    default: baseCopy.site.title,
    template: `%s · ${baseCopy.site.title}`,
  },
  description: baseCopy.site.description,
  openGraph: {
    type: 'website',
    locale: defaultLocale,
    siteName: baseCopy.site.title,
    title: baseCopy.site.title,
    description: baseCopy.site.description,
    url: 'https://facodi.monynha.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseCopy.site.title,
    description: baseCopy.site.description,
  },
};

export function createPageMetadata(section: keyof typeof baseCopy.metadata): Metadata {
  const metadata = baseCopy.metadata[section];
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: metadata.title,
      description: metadata.description,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: metadata.title,
      description: metadata.description,
    },
  } satisfies Metadata;
}
