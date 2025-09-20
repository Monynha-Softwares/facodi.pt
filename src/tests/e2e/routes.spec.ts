import { test, expect } from '@playwright/test'

const routes = ['/', '/sobre', '/projetos', '/contato'] as const

test.describe('Rotas principais', () => {
  for (const route of routes) {
    test(`carrega ${route}`, async ({ page }) => {
      const response = await page.goto(route)
      expect(response?.ok()).toBeTruthy()
      await expect(page.locator('main')).toBeVisible()
    })
  }
})
