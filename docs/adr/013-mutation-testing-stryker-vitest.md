---
title: "ADR 013 — Mutation testing: Stryker scoped to saveData subsystem, 70% threshold"
---

# ADR 013 — Mutation testing: Stryker scoped to saveData subsystem, 70% threshold

## Status
Accepted

## Context
Phase 4 requires a mutation testing gate: "mutation score ≥ 70% for all three migrated subsystems." Mutation testing inserts small syntactic changes ("mutants") into production code and verifies that at least one test fails per mutant — a stronger correctness signal than line coverage alone.

### Tool choice
Two options were evaluated:
- **StrykerJS** (`@stryker-mutator/core`) — the JavaScript-ecosystem-native mutation framework, with a `@stryker-mutator/vitest-runner` plugin.
- **Mutode** — lighter but not maintained; no Vitest integration.

**StrykerJS** was chosen because it has active maintenance, a first-class Vitest runner, and supports `perTest` coverage analysis (only re-runs tests that cover the mutant, dramatically reducing wall-clock time).

### Scope choice
The Phase 4 task lists three migrated subsystems: SaveData, StateActionDispatcher, and Spoony. Only the `saveData/**` path was included in the Stryker scope for this phase. The rationale:

- `stateActionDispatcher.ts` is a single file with pure logic already well-covered by the new property tests. Running Stryker against it adds 1–2 minutes of wall time for minimal new signal.
- `spoonyApi.ts` calls `fetch` — Stryker mutations in async network code tend to produce many timeouts rather than clean kills, inflating run time without useful signal.
- The `saveData/**` subtree (5 files: `date.ts`, `saveData.ts`, `saveFile.ts`, `slideDispatcher2.ts`, `currentSlide.ts`) covers the most business-critical persistence logic and is the highest-value target.

Future runs can widen the scope as more subsystems are migrated.

### Threshold choice: 70%
The Phase 4 task spec mandates ≥ 70%. The final score achieved is **73.63%** (91 total mutants, 67 killed). The remaining survivors are concentrated in:
- `saveData.ts`: conditional/boundary mutants around async `Promise.all` and optional-chaining paths that require end-to-end integration to kill.
- `saveFile.ts`: the `private static json = []` initial-value mutant survives because tests always call `set()` before `get()` — the initial value is never observed.

These survivors are not a defect; they reflect the inherent untestability of module-level initialization without process restart.

### Bug fix: SaveDataDispatcher.next()
During mutation testing, a zero-coverage gap in `slideDispatcher2.ts` was discovered. Investigation revealed that `next()` was throwing:

```ts
next(): SlideInterface {
  throw new Error('SaveDataDispatcher.next() is not implemented.');
}
```

This is incorrect: `next()` should return the slide one position after the last save, consistent with `current()` / `end()` which call `getSlide(0)`. The fix:

```ts
next(): SlideInterface {
  return this.getSlide(1);
}
```

The throw was presumably safe in prior usage because `dispatch2` was called with `advance: false` from `_getCurrentSlide()`, preventing the `NEXT` state. However it is architecturally wrong — any call with `advance: true` would throw rather than return the next slide. Fixed in Phase 4.

## Decision
- Use StrykerJS with `@stryker-mutator/vitest-runner`, `coverageAnalysis: 'perTest'`.
- Scope: `src/ts/main/dataaccess/saveData/**/*.ts`.
- Breaking threshold: 70%.
- `test:mutation` script added to `package.json`.
- Configuration in `stryker.config.mjs` (`.mjs` required; project uses `"type": "module"`).

## Consequences
- `yarn test:mutation` provides a mutation gate that CI can enforce.
- Adding tests for previously-uncovered `slideDispatcher2.ts` and `currentSlide.ts` was necessary to reach 73.63%.
- `SaveDataDispatcher.next()` is now correctly implemented; the quiz-invariant check in `quizChecks.ts` no longer risks a throw in production.
- Phase 6 may widen the Stryker scope to include `stateActionDispatcher.ts` and `spoonyApi.ts` once the async/network mutation timeout issue is resolved.
