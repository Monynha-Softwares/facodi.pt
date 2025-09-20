'use client';

import { ContactForm } from '@/components/contact/contact-form';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSiteText } from '@/lib/site-text';

const faqs = [
  {
    question: 'Quem pode contribuir com o FACODI?',
    answer: 'Educadores, estudantes e qualquer pessoa interessada em organizar conteúdo público podem colaborar via GitHub.'
  },
  {
    question: 'O FACODI possui certificados?',
    answer: 'Ainda não. Estamos focados em trilhas de aprendizagem abertas, mas estudamos parcerias com universidades comunitárias.'
  }
];

export function ContactView() {
  const { copy } = useSiteText();

  return (
    <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-6">
        <header className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">{copy.contact.title}</h1>
          <p className="text-lg text-foreground/80">{copy.contact.description}</p>
        </header>
        <ContactForm />
      </section>
      <aside aria-label="Perguntas frequentes" className="space-y-4">
        {faqs.map((item) => (
          <Card key={item.question} className="bg-card/70">
            <CardHeader>
              <CardTitle>{item.question}</CardTitle>
              <CardDescription className="text-sm text-foreground/80">{item.answer}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </aside>
    </div>
  );
}
