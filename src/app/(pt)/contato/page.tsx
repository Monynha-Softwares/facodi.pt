import type { Metadata } from 'next';

import { ContactContent } from '@/components/sections/contact-content';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata('contact');

export default function ContactPage() {
  return <ContactContent />;
}
