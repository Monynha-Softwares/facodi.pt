import type { Metadata } from 'next';

import { AboutContent } from '@/components/sections/about-content';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata('about');

export default function AboutPage() {
  return <AboutContent />;
}
