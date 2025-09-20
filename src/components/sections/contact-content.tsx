'use client';

import { type FormEvent, useState } from 'react';

import { useSiteText } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: ContactFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactContent() {
  const text = useSiteText();
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return;
    }
    setStatus('success');
    setForm(initialState);
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-16">
      <header className="space-y-4">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground-light dark:text-foreground-dark">
          {text.contact.title}
        </h1>
        <p className="text-lg text-muted-light dark:text-muted-dark">{text.contact.description}</p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-border-light bg-surface-light/80 p-8 shadow-subtle dark:border-border-dark dark:bg-surface-dark/80"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-foreground-light dark:text-foreground-dark">
            {text.contact.name}
            <Input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              required
              autoComplete="name"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-foreground-light dark:text-foreground-dark">
            {text.contact.email}
            <Input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              required
              autoComplete="email"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground-light dark:text-foreground-dark">
          {text.contact.subject}
          <Input
            value={form.subject}
            onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
            autoComplete="off"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground-light dark:text-foreground-dark">
          {text.contact.message}
          <Textarea
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            required
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg">
            {text.contact.submit}
          </Button>
          <span aria-live="polite" className="text-sm text-brand-600">
            {status === 'success' ? text.contact.success : '\u00A0'}
          </span>
        </div>
      </form>
    </div>
  );
}
