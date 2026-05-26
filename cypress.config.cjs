const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    excludeSpecPattern: 'cypress/e2e/snapshot.cy.ts',
    baseUrl: 'http://127.0.0.1:9000',
    allowCypressEnv: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
  },
});
