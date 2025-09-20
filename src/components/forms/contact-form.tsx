'use client';

import { useId, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormState {
    status: 'idle' | 'loading' | 'success' | 'error';
    error?: string;
}

export function ContactForm(): JSX.Element {
    const formId = useId();
    const [state, setState] = useState<FormState>({ status: 'idle' });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setState({ status: 'loading' });

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const message = String(formData.get('message') || '').trim();

        if (!name || !email || !message) {
            setState({ status: 'error', error: 'Preencha todos os campos obrigatórios.' });
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 600));

        event.currentTarget.reset();
        setState({ status: 'success' });
    }

    return (
        <form aria-labelledby={`${formId}-title`} className="space-y-4 rounded-3xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <h3 id={`${formId}-title`} className="font-display text-xl font-semibold text-foreground">
                    Vamos conversar
                </h3>
                <p className="text-sm text-muted-foreground">Envie uma mensagem e retornaremos com materiais, mentorias ou ajuda comunitária.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-muted-foreground">
                    Nome completo
                    <Input name="name" autoComplete="name" placeholder="Seu nome" required />
                </label>
                <label className="space-y-1 text-sm font-medium text-muted-foreground">
                    E-mail
                    <Input name="email" type="email" autoComplete="email" placeholder="voce@email.com" required />
                </label>
            </div>
            <label className="space-y-1 text-sm font-medium text-muted-foreground">
                Mensagem
                <Textarea name="message" placeholder="Conte pra gente como podemos ajudar" required />
            </label>
            <div className="flex items-center justify-between gap-3">
                <Button type="submit" disabled={state.status === 'loading'}>
                    {state.status === 'loading' ? 'Enviando…' : 'Enviar mensagem'}
                </Button>
                {state.status === 'error' && <p className="text-sm text-destructive">{state.error}</p>}
                {state.status === 'success' && <p className="text-sm text-primary">Recebido! Entraremos em contato em breve.</p>}
            </div>
        </form>
    );
}
