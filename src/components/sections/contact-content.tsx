'use client';

import { Mail, MessageCircle } from 'lucide-react';

import { useSiteText } from '@/lib/hooks/use-site-text';

import { ContactForm } from '../contact/contact-form';
import { Card } from '../ui/card';

export function ContactContent() {
  const { text } = useSiteText();

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
      <div className="space-y-6">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground/70">
            Contato
          </p>
          <h1 className="text-3xl font-semibold md:text-4xl">{text.metadata.contact.title}</h1>
          <p className="text-foreground/80">{text.contact.intro}</p>
        </header>
        <div className="space-y-4">
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center gap-3 text-base">
                <Mail aria-hidden className="h-5 w-5 text-accent" />
                contato@monynha.dev
              </Card.Title>
              <Card.Description>
                Responderemos com carinho caramelo e orientações sobre como colaborar com o FACODI.
              </Card.Description>
            </Card.Header>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center gap-3 text-base">
                <MessageCircle aria-hidden className="h-5 w-5 text-accent" />
                Comunidade FACODI
              </Card.Title>
              <Card.Description>
                Participe das conversas sobre currículos abertos e veja como o mascote guia novas
                trilhas.
              </Card.Description>
            </Card.Header>
          </Card>
        </div>
      </div>
      <div className="rounded-[var(--radius-2xl)] border border-border/70 bg-background/80 p-6 shadow-soft">
        <ContactForm />
      </div>
    </div>
  );
}
