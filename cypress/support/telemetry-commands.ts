/**
 * Phase 5 Cypress commands for telemetry and storage snapshotting.
 * Imported by e2e.ts so these commands are available in all spec files.
 */

export interface StorageSnapshot {
  local: Record<string, string | null>;
  session: Record<string, string | null>;
}

Cypress.Commands.add('snapshotStorage', () => {
  return cy.window().then((win) => {
    const local: Record<string, string | null> = {};
    for (let i = 0; i < win.localStorage.length; i++) {
      const key = win.localStorage.key(i)!;
      local[key] = win.localStorage.getItem(key);
    }
    const session: Record<string, string | null> = {};
    for (let i = 0; i < win.sessionStorage.length; i++) {
      const key = win.sessionStorage.key(i)!;
      session[key] = win.sessionStorage.getItem(key);
    }
    return { local, session } as StorageSnapshot;
  });
});

Cypress.Commands.add('assertNoConsoleErrors', () => {
  return cy.window().then((win) => {
    const errors: string[] = (win as unknown as { __consoleErrors?: string[] }).__consoleErrors ?? [];
    expect(errors, 'console.error calls').to.have.length(0);
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Returns a snapshot of both localStorage and sessionStorage key/value pairs.
       * Used by the differential replay pipeline to detect storage deviations.
       */
      snapshotStorage(): Chainable<StorageSnapshot>;

      /**
       * Asserts that no console.error calls occurred since the page loaded.
       * Requires the console.error interceptor installed in e2e.ts beforeEach.
       */
      assertNoConsoleErrors(): Chainable<void>;
    }
  }
}
