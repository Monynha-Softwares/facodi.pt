import type { Metadata } from 'next';

import { ContactView } from '@/components/contact/contact-view';
import { defaultLocale, siteCopy } from '@/config/i18n';

const copy = siteCopy[defaultLocale];

export const metadata: Metadata = {
  title: `${copy.navigation.contact} — FACODI`,
  description: copy.contact.description
};

export default function ContactPage() {
  return <ContactView />;
}
