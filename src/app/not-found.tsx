'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useSiteText } from '@/hooks/use-site-text';

const NotFoundPage = () => {
  const { copy } = useSiteText();
  const notFoundCopy = copy.metadata.notFound;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 py-24 text-center">
      <div className="relative h-60 w-60">
        <Image fill src="/images/monynha-mascot.svg" alt="Cachorro caramelo confuso segurando um mapa" className="object-contain" />
      </div>
      <div className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold text-foreground">{notFoundCopy.title}</h1>
        <p className="text-base text-muted-foreground">{notFoundCopy.description}</p>
        <Button asChild size="lg">
          <Link href="/">{copy.navigation.home}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
