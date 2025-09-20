import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { ContactSection } from '@/components/sections/contact';
import { resolveSiteText } from '@/config/i18n';

const site = resolveSiteText();

export const metadata: Metadata = {
  title: `${site.title} · Contato`,
  description: 'Fale com a equipe Monynha para parcerias, dúvidas e contribuições para o ecossistema FACODI.',
  openGraph: {
    title: `${site.title} · Contato`,
    description: 'Entre em contato com a comunidade para apoiar, contribuir ou tirar dúvidas sobre a FACODI.',
    url: 'https://facodi.pt/contact'
  }
};

export default function ContactPage(): JSX.Element {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-secondary-500">
          <Mail className="size-4" aria-hidden />
          Vamos conversar
        </p>
        <h1 className="font-display text-4xl font-semibold text-foreground">Contato direto</h1>
        <p className="max-w-2xl text-base text-foreground/75">
          Use o formulário para enviar mensagens sobre contribuições, parcerias ou suporte. Nós retornamos em até 48 horas úteis.
        </p>
      </header>
      <ContactSection />
    </div>
  );
}
