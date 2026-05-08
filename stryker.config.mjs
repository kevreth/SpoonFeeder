/** @type {import('@stryker-mutator/core').PartialStrykerOptions} */
export default {
  testRunner: 'vitest',
  vitest: {
    configFile: 'vitest.config.ts',
  },
  mutate: [
    'src/ts/main/dataaccess/saveData/**/*.ts',
    '!src/ts/main/dataaccess/saveData/**/*.test.ts',
  ],
  reporters: ['html', 'clear-text', 'progress'],
  coverageAnalysis: 'perTest',
  thresholds: {
    high: 80,
    low: 70,
    break: 70,
  },
  timeoutMS: 30000,
  concurrency: 2,
  disableTypeChecks: true,
};
