import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['src/tests/e2e/**'],
    include: ['src/tests/**/*.test.ts', 'src/tests/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html']
    }
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  }
})
