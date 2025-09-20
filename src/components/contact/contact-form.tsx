'use client';

import { useState } from 'react';

import { useSiteText } from '@/lib/hooks/use-site-text';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

type FormStatus = 'idle' | 'success' | 'error';

export function ContactForm() {
  const { text } = useSiteText();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!name || !email || !message) {
      setStatus('error');
      setIsSubmitting(false);
      return;
    }

    window.setTimeout(() => {
      setStatus('success');
      setIsSubmitting(false);
      event.currentTarget.reset();
    }, 600);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="block text-sm font-medium text-foreground" htmlFor="name">
          Nome
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Seu nome"
          required
          autoComplete="name"
          aria-required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground" htmlFor="email">
          E-mail
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="voce@exemplo.com"
          required
          autoComplete="email"
          aria-required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground" htmlFor="message">
          Mensagem
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Conte como podemos colaborar"
          required
          aria-required
        />
      </div>
      <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando…' : 'Enviar mensagem'}
      </Button>
      <p aria-live="polite" className="text-sm text-foreground/80">
        {status === 'success' && text.contact.success}
        {status === 'error' && text.contact.error}
      </p>
    </form>
  );
}
