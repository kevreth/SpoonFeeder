import './commands';
import './telemetry-commands';

/**
 * Intercept console.error before each test so assertNoConsoleErrors() can inspect it.
 * Errors from known third-party libraries are suppressed by message pattern.
 */
const KNOWN_THIRD_PARTY_PATTERNS: RegExp[] = [
  // MathJax logs non-fatal configuration messages as errors in some environments
  /MathJax/i,
  // AsciiDoctor warns about missing stylesheets in jsdom contexts
  /asciidoctor/i,
];

beforeEach(() => {
  cy.window().then((win) => {
    (win as unknown as { __consoleErrors: string[] }).__consoleErrors = [];
    const original = win.console.error.bind(win.console);
    win.console.error = (...args: unknown[]) => {
      const message = args.map(String).join(' ');
      const isKnown = KNOWN_THIRD_PARTY_PATTERNS.some((p) => p.test(message));
      if (!isKnown) {
        (win as unknown as { __consoleErrors: string[] }).__consoleErrors.push(message);
      }
      original(...args);
    };
  });
});
