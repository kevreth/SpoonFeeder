import { runFullJourney } from './functions';

const KNOWN_UNCAUGHT_PATTERNS: RegExp[] = [
  /ResizeObserver loop/i,
  /Non-Error promise rejection/i,
];
Cypress.on('uncaught:exception', (err) => {
  console.log('Uncaught exception:', err.message);
  return !KNOWN_UNCAUGHT_PATTERNS.some((p) => p.test(err.message));
});

describe('Storage Snapshot', () => {
  it('runs the full journey and writes a storage snapshot', () => {
    runFullJourney();
    cy.snapshotStorage().then((snapshot) => {
      cy.writeFile(
        'cypress/replay/current-snapshot.json',
        JSON.stringify(snapshot, null, 2),
      );
    });
  });
});

export {};
