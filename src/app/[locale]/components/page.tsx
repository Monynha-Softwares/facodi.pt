import { notFound } from "next/navigation";

import { DesignSystemShowcase } from "@/components/shared/design-system-showcase";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ComponentsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getDictionary(locale);

  return (
    <div className="container space-y-12 py-16">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{messages.navigation.components}</h1>
        <p className="max-w-3xl text-lg text-muted">{messages.sections.components.description}</p>
      </section>
      <DesignSystemShowcase />
    </div>
  );
}
