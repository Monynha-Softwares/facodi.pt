import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', heading: 'Educação comunitária, gratuita e aberta.' },
  { path: '/sobre', heading: 'Sobre a FACODI' },
  { path: '/projetos', heading: 'Projetos em destaque' },
  { path: '/contato', heading: 'Converse com a gente' }
];

test.describe('Smoke navigation', () => {
  for (const route of routes) {
    test(`renders ${route.path}`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole('heading', { name: route.heading })).toBeVisible();
    });
  }

  test('renders not-found page for unknown route', async ({ page }) => {
    await page.goto('/rota-inexistente');
    await expect(page.getByText('Página não encontrada')).toBeVisible();
  });
});
