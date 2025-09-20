export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeLabels: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export const localizedPaths: Record<Locale, { home: string; courses: string }> = {
  pt: { home: "/pt", courses: "/pt/cursos" },
  en: { home: "/en", courses: "/en/courses" },
  es: { home: "/es", courses: "/es/cursos" },
};
