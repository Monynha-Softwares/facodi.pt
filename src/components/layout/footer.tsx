"use client";

import Link from "next/link";

import { useTranslations } from "@/components/layout/translation-provider";

const links = {
  about: "https://monynha.com",
  contact: "mailto:geral@monynha.com",
  github: "https://github.com/monynha",
  privacy: "https://monynha.com/politica-de-privacidade",
};

export function Footer() {
  const { messages } = useTranslations();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container grid gap-8 py-12 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{messages.footer.heading}</h2>
          <p className="max-w-xl text-sm text-muted">{messages.footer.description}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href={`mailto:${messages.contact.primary}`} className="underline">
              {messages.contact.primary}
            </Link>
            <span aria-hidden>·</span>
            <Link href={`mailto:${messages.contact.support}`} className="underline">
              {messages.contact.support}
            </Link>
          </div>
        </div>
        <div className="grid gap-6 md:justify-end">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link
              href={links.about}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              {messages.footer.links.about}
            </Link>
            <Link href={links.contact} className="hover:text-primary">
              {messages.footer.links.contact}
            </Link>
            <Link
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              {messages.footer.links.github}
            </Link>
            <Link
              href={links.privacy}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              {messages.footer.links.privacy}
            </Link>
          </div>
          <form className="flex flex-col gap-2" aria-label={messages.footer.newsletter.title}>
            <label htmlFor="newsletter-email" className="text-sm font-medium">
              {messages.footer.newsletter.title}
            </label>
            <p className="text-sm text-muted">{messages.footer.newsletter.description}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder={messages.forms.emailPlaceholder}
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
                aria-label={messages.forms.email}
              />
              <button
                type="submit"
                className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                disabled
                aria-disabled
              >
                {messages.forms.subscribe}
              </button>
            </div>
            <p className="text-xs text-muted">
              {messages.forms.email} · {messages.forms.success}
            </p>
          </form>
        </div>
      </div>
      <div className="bg-background py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {messages.brand.name}. {messages.footer.rights}
      </div>
    </footer>
  );
}
