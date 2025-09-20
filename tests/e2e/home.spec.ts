import { expect, test } from "@playwright/test";

const locales = ["pt", "en", "fr", "es"] as const;

test.describe("Home page", () => {
  for (const locale of locales) {
    test(`renders hero for ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(
        page.getByRole("link", { name: /Explorar|Explore|Explorer|Explorar/ }),
      ).toBeVisible();
    });
  }

  test("switches language", async ({ page }) => {
    await page.goto("/pt");
    await page.selectOption("#language-switcher", "en");
    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByRole("heading", { name: /A living platform/i })).toBeVisible();
  });
});
