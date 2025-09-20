import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { TranslationProvider } from "@/components/layout/translation-provider";
import pt from "@/i18n/pt.json";

import { DesignSystemShowcase } from "./design-system-showcase";

const renderWithProviders = (ui: ReactNode) =>
  render(
    <TranslationProvider locale="pt" messages={pt}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {ui}
      </ThemeProvider>
    </TranslationProvider>,
  );

describe("DesignSystemShowcase", () => {
  it("renders core sections", () => {
    renderWithProviders(<DesignSystemShowcase />);

    expect(screen.getByText(pt.designSystem.colors.title)).toBeInTheDocument();
    expect(screen.getByText(pt.designSystem.components.title)).toBeInTheDocument();
    expect(screen.getByText(pt.designSystem.spacing.title)).toBeInTheDocument();
  });
});
