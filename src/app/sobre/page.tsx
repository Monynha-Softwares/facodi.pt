import type { Metadata } from 'next';

import { AboutView } from '@/components/about/about-view';
import { defaultLocale, siteCopy } from '@/config/i18n';

const copy = siteCopy[defaultLocale];

export const metadata: Metadata = {
  title: `${copy.navigation.about} — FACODI`,
  description: copy.about.description
};

export default function AboutPage() {
  return <AboutView />;
}
