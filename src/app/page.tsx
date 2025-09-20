import { HomeContent } from '@/components/sections/home-content';
import { defaultLanguage, siteCopy } from '@/config/i18n';

import type { Metadata } from 'next';

const meta = siteCopy[defaultLanguage];

export const metadata: Metadata = {
  title: meta.meta.title,
  description: meta.meta.description,
};

export default function HomePage() {
  return <HomeContent />;
}
