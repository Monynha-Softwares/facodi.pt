import type { Metadata } from 'next';

import { NotFoundContent } from '@/components/sections/not-found-content';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata('notFound');

export default function FourOhFour() {
  return <NotFoundContent />;
}
