// tests/setup.js
// Test setup and global utilities for FACODI tests
import { vi } from 'vitest';

// Mock window.marked if needed
global.marked = {
  parse: (md) => `<p>${md}</p>`,
};

// Mock console methods for clean test output
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};
