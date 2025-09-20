'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSiteText } from '@/hooks/use-site-text';

type FormStatus = 'idle' | 'success' | 'error';

export const ContactForm = () => {
  const { copy } = useSiteText();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();

    if (!name || !email || !message) {
      setStatus('error');
      setIsSubmitting(false);
      return;
    }

    const emailValid = /\S+@\S+\.\S+/.test(email);
    if (!emailValid) {
      setStatus('error');
      setIsSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus('success');
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <Label htmlFor="name" requiredIndicator>
          {copy.forms.contact.nameLabel}
        </Label>
        <Input id="name" name="name" autoComplete="name" placeholder="Seu nome" required />
      </div>
      <div>
        <Label htmlFor="email" requiredIndicator>
          {copy.forms.contact.emailLabel}
        </Label>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="nome@email.com" required />
      </div>
      <div>
        <Label htmlFor="message" requiredIndicator>
          {copy.forms.contact.messageLabel}
        </Label>
        <Textarea id="message" name="message" placeholder="Como podemos colaborar?" required />
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando…' : copy.forms.contact.submit}
      </Button>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {status === 'success' ? copy.forms.contact.success : null}
        {status === 'error' ? copy.forms.contact.error : null}
      </p>
    </form>
  );
};
