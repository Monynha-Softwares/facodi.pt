import type { Metadata } from 'next';

import { HomeView } from '@/components/home/home-view';
import { defaultLocale, siteCopy } from '@/config/i18n';

const copy = siteCopy[defaultLocale];

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt',
      'en-US': '/en',
      'es-ES': '/es',
      'fr-FR': '/fr'
    }
  }
};

export default function Page() {
  return <HomeView />;
}
