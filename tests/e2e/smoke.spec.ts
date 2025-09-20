import { expect, test } from '@playwright/test';

const routes = ['/', '/sobre', '/projetos', '/contato'];

test.describe('FACODI pages', () => {
  for (const route of routes) {
    test(`renders ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      await expect(page).toHaveTitle(/FACODI/);
    });
  }
});
