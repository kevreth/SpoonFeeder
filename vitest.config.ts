import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/ts/test/support/deterministic-setup.ts'],
    reporters: ['default'],
  },
});
