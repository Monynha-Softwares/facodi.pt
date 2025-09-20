import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**', '.next/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
