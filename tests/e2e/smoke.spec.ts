import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', heading: /study with official curriculum guidance/i },
  { path: '/sobre', heading: /about facodi/i },
  { path: '/projetos', heading: /monynha softwares ecosystem/i },
  { path: '/contato', heading: /talk with the facodi team/i }
];

test.describe('FACODI pages', () => {
  for (const route of routes) {
    test(`renders ${route.path}`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator('h1')).toContainText(route.heading);
    });
  }
});
