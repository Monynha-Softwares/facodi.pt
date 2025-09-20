'use client';

import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteText } from '@/hooks/use-site-text';

export const ContactIntro = () => {
  const { copy } = useSiteText();

  return (
    <CardHeader>
      <CardTitle>{copy.forms.contact.title}</CardTitle>
      <CardDescription>{copy.forms.contact.description}</CardDescription>
    </CardHeader>
  );
};
