'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useSiteText } from '@/lib/hooks/use-site-text';

import { buttonVariants } from '../ui/button';

export function NotFoundContent() {
  const { text } = useSiteText();

  return (
    <section className="flex flex-col items-center gap-6 text-center">
      <Image
        src="/images/mascote-confuso.svg"
        alt="Cachorro caramelo confuso"
        width={240}
        height={240}
        className="drop-shadow-[0_20px_45px_rgba(99,102,241,0.25)]"
      />
      <h1 className="text-3xl font-semibold">{text.metadata.notFound.title}</h1>
      <p className="max-w-xl text-foreground/70">{text.metadata.notFound.description}</p>
      <Link className={buttonVariants({ size: 'lg' })} href="/">
        {text.navigation.home}
      </Link>
    </section>
  );
}
