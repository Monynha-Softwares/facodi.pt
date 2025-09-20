'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContactFormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const initialState: ContactFormState = {
  status: 'idle',
  message: ''
};

export function ContactSection(): JSX.Element {
  const [formState, setFormState] = useState<ContactFormState>(initialState);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !message) {
      setFormState({ status: 'error', message: 'Preencha todos os campos para enviar sua mensagem.' });
      return;
    }

    setFormState({ status: 'loading', message: '' });

    await new Promise((resolve) => setTimeout(resolve, 900));

    setFormState({
      status: 'success',
      message: 'Recebemos sua mensagem! Vamos responder em até 2 dias úteis.'
    });
    formElement.reset();
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto mt-24 w-full max-w-4xl"
    >
      <Card>
        <CardHeader className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-secondary-500">Fale com a equipe</p>
          <CardTitle id="contact-heading" className="text-3xl">
            Vamos co-criar experiências educacionais memoráveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-2 text-left">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Nome
              </label>
              <Input id="name" name="name" autoComplete="name" placeholder="Seu nome" required />
            </div>
            <div className="grid gap-2 text-left">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                E-mail
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                required
              />
            </div>
            <div className="grid gap-2 text-left">
              <label htmlFor="message" className="text-sm font-semibold text-foreground">
                Como podemos ajudar?
              </label>
              <Textarea id="message" name="message" placeholder="Compartilhe sua ideia ou dúvida" required rows={5} />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" size="lg" className="min-w-48" disabled={formState.status === 'loading'}>
                {formState.status === 'loading' ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Enviando…
                  </span>
                ) : (
                  'Enviar mensagem'
                )}
              </Button>
              {formState.status === 'error' && (
                <p role="alert" className="text-sm font-medium text-accent-500">
                  {formState.message}
                </p>
              )}
              {formState.status === 'success' && (
                <p role="status" className="inline-flex items-center gap-2 text-sm font-medium text-secondary-500">
                  <CheckCircle2 className="size-4" aria-hidden />
                  {formState.message}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
