import dynamic from 'next/dynamic';

import { defaultLanguage, siteCopy } from '@/config/i18n';

import type { Metadata } from 'next';

const copy = siteCopy[defaultLanguage];

export const metadata: Metadata = {
  title: `${copy.contact.title} · FACODI`,
  description: copy.contact.description,
};

const ContactContent = dynamic(
  () => import('@/components/sections/contact-content').then((mod) => mod.ContactContent),
  {
    loading: () => (
      <div className="mx-auto max-w-3xl px-4 py-16 text-muted-light dark:text-muted-dark">
        Preparando formulário...
      </div>
    ),
    ssr: false,
  },
);

export default function ContactPage() {
  return <ContactContent />;
}
