'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSiteText } from '@/lib/site-text';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Informe seu nome completo.'),
  email: z.string().email('Informe um e-mail válido.'),
  message: z.string().min(10, 'Descreva sua mensagem com pelo menos 10 caracteres.')
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { copy } = useSiteText();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async (_values: ContactValues) => {
    try {
      setStatus('idle');
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-border bg-card/80 p-6 shadow-soft"
      noValidate
    >
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
          {copy.contact.nameLabel}
        </label>
        <Input
          id="contact-name"
          autoComplete="name"
          {...register('name')}
          aria-invalid={Boolean(errors.name)}
          className={cn(errors.name && 'border-focus')}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-warning" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          {copy.contact.emailLabel}
        </label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register('email')}
          aria-invalid={Boolean(errors.email)}
          className={cn(errors.email && 'border-focus')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-warning" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          {copy.contact.messageLabel}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className={cn(
            'w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-soft transition-all placeholder:text-muted focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30',
            errors.message && 'border-focus'
          )}
          {...register('message')}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-warning" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Enviando…' : copy.contact.submitLabel}
      </Button>
      {status === 'success' && (
        <p className="text-sm text-success" role="status">
          {copy.contact.success}
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-warning" role="status">
          {copy.contact.error}
        </p>
      )}
    </form>
  );
}
