import { AboutContent } from '@/components/sections/about-content';
import { defaultLanguage, siteCopy } from '@/config/i18n';

import type { Metadata } from 'next';

const copy = siteCopy[defaultLanguage];

export const metadata: Metadata = {
  title: `${copy.about.title} · FACODI`,
  description: copy.about.description,
};

export default function AboutPage() {
  return <AboutContent />;
}
