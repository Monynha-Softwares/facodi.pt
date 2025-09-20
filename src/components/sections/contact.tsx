import { MessageCircleHeart } from 'lucide-react';

import { ContactForm } from '@/components/forms/contact-form';

export function ContactSection(): JSX.Element {
    return (
        <section className="container mt-24" id="contato" aria-labelledby="contato-title">
            <div className="grid gap-10 lg:grid-cols-[2fr,3fr]">
                <div className="space-y-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold text-primary">
                        <MessageCircleHeart className="size-4" aria-hidden /> Comunidade presente
                    </span>
                    <h2 id="contato-title" className="font-display text-3xl font-semibold text-foreground">
                        Mentorias, estudos guiados e acolhimento para continuar aprendendo.
                    </h2>
                    <p className="text-base text-muted-foreground">Entre em contato para participar de grupos de estudo, contribuir com playlists ou solicitar apoio em sua jornada. O time FACODI responde em até 48h úteis.</p>
                </div>
                <ContactForm />
            </div>
        </section>
    );
}
