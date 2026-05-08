const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    excludeSpecPattern: 'cypress/e2e/snapshot.cy.ts',
    baseUrl: 'http://localhost:9000',
    allowCypressEnv: false,
  },
});
