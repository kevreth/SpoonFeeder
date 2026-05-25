---
title: "ADR 015 — Cypress Differential Replay Pipeline"
status: "Accepted"
phase: "5 — AI Repair Constraints"
date: "2026-05-07"
---

# ADR 015 — Cypress Differential Replay Pipeline

## Context

AI patches may introduce storage-layer regressions that pass unit tests but alter the shape or content of what gets written to localStorage/sessionStorage during a real user session. The E2E test suite (Cypress) exercises the full session flow; snapshotting storage at the end provides a high-signal regression check.

We need:
1. A way to capture the final storage state of a Cypress run
2. A committed baseline that represents correct behaviour
3. A diff command that flags any deviation introduced by a patch

## Decision

### Storage snapshot commands (`cypress/support/telemetry-commands.ts`)

Add `cy.snapshotStorage()` — reads all keys from both `localStorage` and `sessionStorage` in the test browser window and returns a `StorageSnapshot` object.

Add `cy.assertNoConsoleErrors()` — reads `win.__consoleErrors` (populated by the console interceptor in `e2e.ts`) and asserts it is empty.

### Console interceptor (`cypress/support/e2e.ts`)

A `beforeEach` hook wraps `window.console.error` before each test to accumulate non-third-party errors in `win.__consoleErrors`. Third-party errors are filtered by a `KNOWN_THIRD_PARTY_PATTERNS` allowlist (MathJax, AsciiDoctor). This replaces the previous blanket `Cypress.on('uncaught:exception', () => false)` in `example.cy.ts` with a targeted suppression approach that only silences known patterns (ResizeObserver loop, non-Error promise rejections).

### Baseline file (`cypress/replay/baselines/example.cy.json`)

The spec writes its final storage state when `Cypress.env('recordSnapshot')` is truthy. `yarn test:baseline` passes this env flag. The baseline file is committed to version control; a patch that changes storage behaviour produces a diff.

### `scripts/differential-replay.ts`

Two modes:
- `--record`: runs Cypress with `recordSnapshot=true`, writes the resulting snapshot to the baseline path
- `--diff`: runs Cypress, reads `current-snapshot.json`, diffs against the committed baseline using `microdiff`, emits a `ReplayReport` JSON, exits 1 on any deviation

`microdiff` was chosen over deep-equal for its structured diff output (path + type + old/new values) which gives the Risk Agent actionable detail.

## Alternatives Considered

**Cypress-image-snapshot (visual diffing).** Catches UI regressions but misses storage mutations that don't affect appearance. Storage diff is lower noise and more directly relevant to the bugfixing platform's concern.

**Jest-based storage comparison.** Unit tests already cover storage shape. The E2E layer is needed to capture state produced by the *full interaction sequence* (slide progression, quiz answers, spoony calls), not just individual module outputs.

**Always record, never commit the baseline.** Without a committed baseline there is nothing to diff against across patch generations. Committing the baseline makes the regression gate objective.

## Consequences

- `yarn test:baseline` must be re-run whenever intentional storage changes are made (new key, format change). The updated baseline should be committed alongside the code change.
- `yarn test:diff` is part of the Phase 5 gate but requires Cypress (and therefore a running dev server). In the current container environment, this gate is verified only on machines with Cypress installed (`libnspr4` and its dependencies). The ADR records this known limitation.
- `cy.assertNoConsoleErrors()` is available in all specs but is not yet called in `example.cy.ts`. It should be added when the team is confident third-party error patterns are fully enumerated.
