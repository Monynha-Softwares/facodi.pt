import { NotFoundContent } from '@/components/sections/not-found-content';
import { defaultLanguage, siteCopy } from '@/config/i18n';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteCopy[defaultLanguage].notFound.title,
  description: siteCopy[defaultLanguage].notFound.description,
};

export default function FourOhFour() {
  return <NotFoundContent />;
}
