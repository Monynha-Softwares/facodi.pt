import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', heading: /Construindo tecnologia/i },
  { path: '/sobre', heading: /FACODI/i },
  { path: '/projetos', heading: /Projetos/i },
  { path: '/contato', heading: /Vamos conversar/i },
];

test.describe('Rotas principais', () => {
  for (const route of routes) {
    test(`renderiza ${route.path}`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(route.heading);
    });
  }
});
