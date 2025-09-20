"use client";

import { createContext, useContext, useMemo } from "react";

import type { Locale, Messages } from "@/lib/i18n/config";

interface TranslationContextValue {
  locale: Locale;
  messages: Messages;
  t: (path: string) => string;
}

const TranslationContext = createContext<TranslationContextValue | undefined>(undefined);

const getValue = (messages: Messages, path: string): string => {
  return path.split(".").reduce<unknown>((accumulator, segment) => {
    if (typeof accumulator !== "object" || accumulator === null) {
      return undefined;
    }

    return (accumulator as Record<string, unknown>)[segment];
  }, messages) as string;
};

export function TranslationProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const value = useMemo<TranslationContextValue>(() => {
    const translate = (path: string) => {
      const result = getValue(messages, path);
      if (typeof result === "string") {
        return result;
      }

      throw new Error(`Missing translation: ${path}`);
    };

    return { locale, messages, t: translate };
  }, [locale, messages]);

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function useTranslations() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslations must be used within TranslationProvider");
  }

  return context;
}
