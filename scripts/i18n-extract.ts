import { readFileSync } from "fs";
import { join } from "path";

import { locales, type Locale } from "@/lib/i18n/config";

const flatten = (value: unknown, prefix = ""): Record<string, string> => {
  if (typeof value === "string") {
    return { [prefix]: value };
  }

  if (Array.isArray(value)) {
    return value.reduce<Record<string, string>>((accumulator, item, index) => {
      Object.entries(flatten(item, `${prefix}[${index}]`)).forEach(([key, nested]) => {
        accumulator[key] = nested;
      });
      return accumulator;
    }, {});
  }

  if (typeof value === "object" && value !== null) {
    return Object.entries(value).reduce<Record<string, string>>((accumulator, [key, nested]) => {
      Object.entries(flatten(nested, prefix ? `${prefix}.${key}` : key)).forEach(
        ([childKey, nestedValue]) => {
          accumulator[childKey] = nestedValue;
        },
      );
      return accumulator;
    }, {});
  }

  return {};
};

const dictionaries = locales.reduce<Record<Locale, Record<string, string>>>(
  (accumulator, locale) => {
    const content = readFileSync(join(process.cwd(), "src", "i18n", `${locale}.json`), "utf8");
    accumulator[locale] = flatten(JSON.parse(content));
    return accumulator;
  },
  {} as Record<Locale, Record<string, string>>,
);

const reference = dictionaries.pt;

for (const locale of locales) {
  const map = dictionaries[locale];
  const missing = Object.keys(reference).filter((key) => !(key in map));
  const extra = Object.keys(map).filter((key) => !(key in reference));

  if (missing.length > 0) {
    throw new Error(`Locale ${locale} is missing keys: ${missing.join(", ")}`);
  }

  if (extra.length > 0) {
    console.warn(`Locale ${locale} has extra keys: ${extra.join(", ")}`);
  }

  const translated = Object.values(map).filter((value) => value.trim().length > 0);
  const coverage = translated.length / Object.keys(reference).length;

  if (coverage < 0.95) {
    throw new Error(`Locale ${locale} coverage below 95%: ${(coverage * 100).toFixed(2)}%`);
  }
}

console.info("All locale files are aligned and above coverage threshold.");
