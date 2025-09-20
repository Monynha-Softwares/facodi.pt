import type pt from "@/i18n/pt.json";

export const locales = ["pt", "en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

export type Messages = typeof pt;
