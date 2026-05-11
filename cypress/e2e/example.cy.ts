import { runFullJourney } from './functions';

const KNOWN_UNCAUGHT_PATTERNS: RegExp[] = [
  /ResizeObserver loop/i,
  /Non-Error promise rejection/i,
];
Cypress.on('uncaught:exception', (err) => {
  console.log('Uncaught exception:', err.message);
  return !KNOWN_UNCAUGHT_PATTERNS.some((p) => p.test(err.message));
});

describe('Cypress Testing', () => {
  it('visits the app root url', () => {
    runFullJourney();
  });
});
export {}; //stops lint warning
