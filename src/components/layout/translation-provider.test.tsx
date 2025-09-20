import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import pt from "@/i18n/pt.json";

import { TranslationProvider, useTranslations } from "./translation-provider";

describe("TranslationProvider", () => {
  it("exposes translation strings", () => {
    function TestComponent() {
      const { t } = useTranslations();
      return <span>{t("hero.primaryCta")}</span>;
    }

    render(
      <TranslationProvider locale="pt" messages={pt}>
        <TestComponent />
      </TranslationProvider>,
    );

    expect(screen.getByText(pt.hero.primaryCta)).toBeInTheDocument();
  });
});
