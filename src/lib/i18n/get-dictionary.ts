import { cache } from "react";

import { defaultLocale, type Locale, type Messages } from "@/lib/i18n/config";

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  pt: () => import("@/i18n/pt.json").then((module) => module.default as Messages),
  en: () => import("@/i18n/en.json").then((module) => module.default as Messages),
  fr: () => import("@/i18n/fr.json").then((module) => module.default as Messages),
  es: () => import("@/i18n/es.json").then((module) => module.default as Messages),
};

export const getDictionary = cache(async (locale: Locale): Promise<Messages> => {
  const loader = dictionaries[locale] ?? dictionaries[defaultLocale];
  return loader();
});
