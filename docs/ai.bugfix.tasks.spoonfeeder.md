# SpoonFeeder AI Bugfixing Platform — Phase Task Breakdown

## How to use this document
Each task is a discrete, reviewable unit of work. Check a task off only when:
1. The code is written and compiles under `yarn type-check`.
2. `yarn lint` passes.
3. `yarn test:unit` passes.
4. The phase gate (if applicable) passes.

Tasks within a phase are ordered. Do not start a task until all preceding tasks in the same phase are checked.

---

## Phase 1 — Infrastructure Foundation

**Goal:** Add the new infrastructure layer without touching any existing business logic. Zero behavioral changes.

### Clocks
- [ ] Create `src/ts/main/infrastructure/clocks/Clock.ts` — define `Clock` interface (`now`, `setTimeout`, `clearTimeout`, `tick`)
- [ ] Create `src/ts/main/infrastructure/clocks/RealClock.ts` — implement `Clock` using `Date.now()` and `window.setTimeout`
- [ ] Create `src/ts/main/infrastructure/clocks/FakeClock.ts` — implement `Clock` using internal counter and `Map`-backed timer registry; include `reset()`
- [ ] Write unit tests for `FakeClock`: `now()` advances via `tick()`, timers fire at correct time, `clearTimeout` cancels, `reset()` clears state

### Random
- [ ] Create `src/ts/main/infrastructure/random/Rng.ts` — define `Rng` interface (`random`, `seed`)
- [ ] Create `src/ts/main/infrastructure/random/RealRng.ts` — wraps `Math.random()`; `seed()` throws
- [ ] Create `src/ts/main/infrastructure/random/FakeRng.ts` — mulberry32 seeded PRNG; deterministic across runs
- [ ] Write unit tests for `FakeRng`: same seed produces same sequence, sequence differs across seeds

### Schema Registry
- [ ] Create `src/ts/main/infrastructure/storage/schemas/Registry.ts` — `SchemaRegistry` class with `register`, `registerMigration`, `getSchema`, `getVersion`, `getMigration`, `isSensitive`
- [ ] Create `src/ts/main/infrastructure/storage/schemas/spoonfeederSchemas.ts` — Zod schemas for all 9 keys; `registerSpoonFeederSchemas()` function
- [ ] Write unit tests for `SchemaRegistry`: register, retrieve schema, retrieve version, sensitive flag, missing key returns undefined

### Telemetry
- [ ] Create `src/ts/main/infrastructure/telemetry/TelemetryEventSchema.ts` — Zod schema for `TelemetryEvent`; export `TelemetryEvent` type
- [ ] Create `src/ts/main/infrastructure/telemetry/TelemetryBus.ts` — ring buffer (max 1000), `emit`, `subscribe`, `flush`, `snapshot`; malformed events stored as `telemetry_schema_violation` rather than thrown
- [ ] Write unit tests for `TelemetryBus`: emit valid event, emit malformed event produces violation record, subscriber receives event, unsubscribe works, buffer wraps at max size, `flush` clears buffer

### Invariant Engine
- [ ] Create `src/ts/main/infrastructure/invariants/types.ts` — `Invariant`, `InvariantViolation`, `InvariantSeverity`, `InvariantSubsystem` types
- [ ] Create `src/ts/main/infrastructure/invariants/InvariantRegistry.ts` — `register`, `assertAll` (with subsystem filter and `throwOnViolation` option), `getViolations`, `clearViolations`; emits telemetry on violation
- [ ] Write unit tests for `InvariantRegistry`: passing invariant does not add violation, failing invariant adds violation and emits telemetry, subsystem filter works, `throwOnViolation: false` collects without throwing

### Storage Abstraction
- [ ] Create `src/ts/main/infrastructure/storage/StorageAdapter.ts` — `StorageAdapter` interface
- [ ] Create `src/ts/main/infrastructure/storage/QuotaGuard.ts` — `setLimit`, `guard`
- [ ] Create `src/ts/main/infrastructure/storage/WebStorageAdapter.ts` — implements `StorageAdapter` for a given `Storage` target; schema validation on read/write; version envelope `{version, data}`; atomic `update` via per-key Promise chain; quota guard; telemetry on every operation
- [ ] Create `src/ts/main/infrastructure/storage/AndroidStorageAdapter.ts` — implements `StorageAdapter` using `@capacitor/preferences`; same validation and envelope logic
- [ ] Create `src/ts/main/infrastructure/storage/factory.ts` — `createLocalStorageAdapter` and `createSessionStorageAdapter` using `Capacitor.getPlatform()` for dispatch
- [ ] Write unit tests for `WebStorageAdapter`: `set` validates schema, `set` null throws, `get` returns undefined for missing key, `get` triggers migration when version stale, `get` throws on corrupted JSON, `update` serialises concurrent writes, `remove` emits telemetry, quota exceeded throws
- [ ] Write unit tests for `SchemaRegistry` + `WebStorageAdapter` integration: write with registered schema passes, write with wrong shape throws, read migrates stale version and rewrites storage

### Test Infrastructure
- [ ] Create `src/ts/test/support/deterministic-setup.ts` — `beforeEach`/`afterEach` hooks that reset `FakeClock` and `FakeRng`; export `testClock`, `testRng`, `TEST_SEED`, `TEST_NOW`
- [ ] Create `src/ts/test/support/storage-fixtures.ts` — `createTestStorageAdapter(registry?)` returning `Map`-backed adapter with schema validation and `__dump()`

### Static Analysis
- [ ] Install `dependency-cruiser` (`yarn add -D dependency-cruiser`)
- [ ] Create `analysis/dependency-cruiser.config.js` — `no-circular` rule (error) and `no-direct-webstorage` rule (error: imports of `webPersistence` from outside `infrastructure/storage` are forbidden)
- [ ] Add `scan:deps` script to `package.json`: `dependency-cruiser --config analysis/dependency-cruiser.config.js src/ts`
- [ ] Confirm `yarn scan:deps` passes against current codebase (no violations yet — existing code predates the rule; baseline violations are documented in the gap analysis)

### Phase 1 Gate
- [x] `yarn type-check` passes
- [x] `yarn lint` passes
- [x] `yarn test:unit` passes — 168 tests across 47 files (all pre-existing + 13 new infrastructure tests)
- [ ] `yarn test:e2e` passes — not yet run; requires dev server
- [x] New infrastructure unit tests pass (FakeClock, FakeRng, SchemaRegistry, TelemetryBus, InvariantRegistry, WebStorageAdapter)
- [x] `yarn scan:deps` — passes (runs, reports expected violations; 3 `no-direct-webstorage` pre-migration, 2 `no-circular` pre-existing; config renamed to `.cjs` due to `"type": "module"` in package.json)

**Notes:**
- `AndroidStorageAdapter` deferred — `@capacitor/preferences` not installed (see ADR 005)
- `vitest.config.ts` introduced; `test:unit` script simplified to `vitest --run` (environment and setupFiles now in config)
- Zod 4 API difference discovered: `z.record()` requires two arguments (`z.record(z.string(), z.unknown())`), not one

---

## Phase 2 — Automated Gap Analysis

**Goal:** Run all scanners and produce a ranked subsystem report. No code changes to business logic.

### Scanner Scripts
- [ ] Create `scripts/storage-key-audit.ts` — AST search for `localStorage`, `sessionStorage`, `WebStorageVariable`, `WebStorageFlag` outside `src/ts/main/infrastructure/storage`; output: file path, line number, key name
- [ ] Create `scripts/boolean-cluster-scanner.ts` — AST search for interfaces/classes with ≥3 boolean fields; output: type name, file, field names
- [ ] Create `scripts/side-effect-scanner.ts` — AST search for `Date.now()`, `Math.random()`, `setTimeout`, `clearTimeout`, `setInterval` outside `infrastructure/clocks` and `infrastructure/random`; output: file, line, call expression
- [ ] Create `scripts/security-scan.ts` — AST search for `eval`, `new Function`, `innerHTML` assignments, hardcoded strings matching API key patterns; output: file, line, pattern matched
- [ ] Create `scripts/perf-scan.ts` — AST search for unbounded loops (`while(true)`, `for(;;)`), synchronous `JSON.parse` in async functions outside adapter layer; output: file, line
- [ ] Add scanner scripts to `package.json`: `scan:storage`, `scan:security`, `scan:sideeffects`, `scan:clusters`, `scan:perf`

### Gap Report
- [ ] Run all five scanners; capture output
- [ ] Produce `docs/ai.bugfix.gap-report.spoonfeeder.md` — ranked subsystem list by bug-proneness (storage key count × boolean clusters × side-effect violations); this is a generated artefact, not a hand-written document

### Phase 2 Gate
- [x] All five scanner scripts execute without runtime error
- [x] Gap report produced — `docs/ai.bugfix.gap-report.spoonfeeder.md`
- [x] No new business logic changes

**Unexpected findings:**
- `makeSlidesStrategyGap.ts` has 2 `setTimeout` calls — added to Phase 4 scope
- `TelemetryBus.ts` has 1 `Date.now()` fallback — intentional; address in Phase 6
- 2 pre-existing circular dependency cycles found by `dependency-cruiser` — address in Phase 4 alongside `dispatch2` refactor

---

## Phase 3 — Storage Abstraction & Schema Enforcement

**Goal:** Migrate all direct storage access to `StorageAdapter`. Zero behavioral changes.

### Session Storage Keys (`random`, `transition`, `mute`, `courses`)
- [ ] Refactor `webStorage.ts`: replace `WebStorageFlag` instances with injected `StorageAdapter` (session); update `RANDOM`, `TRANSITION`, `MUTE`, `COURSES` to use adapter
- [ ] Refactor `clearCourseListing`, `setCourseListing`, `getCourseListing`, `clearSessionStorage` to be async and use adapter
- [ ] Update all callers of these functions to `await`

### Local Storage Keys (`courseName`, save data)
- [ ] Refactor `webStorage.ts`: replace `COURSE_NAME` `WebStorageVariable` with injected `StorageAdapter` (local); make `get`/`set` async
- [ ] Refactor `setSaveData`, `getSaveData` to use adapter; register per-course key dynamically when course loads
- [ ] Refactor `SaveData.get()`, `SaveData.set()`, `SaveData.replace()`, `SaveData.setContinueTrue()` to be async and use adapter
- [ ] Update `slideDispatcher.ts`, `currentSlide.ts`, `slideDispatcher2.ts` to `await` all `SaveData` calls

### Spoony Storage Keys (`spoony_api_key`, `spoony_enabled`, `spoony_model`)
- [ ] Refactor `spoonyStorage.ts`: replace `WebStorageVariable` instances with injected `StorageAdapter` (local); make all accessors async

### Invariant Registration
- [ ] Create `src/ts/main/infrastructure/invariants/checks/storageChecks.ts` — register storage invariants: null guard, schema validity, quota check, version envelope present
- [ ] Create `src/ts/main/infrastructure/invariants/checks/lifecycleChecks.ts` — register lifecycle invariants: no storage write after component teardown (dev builds only)
- [ ] Create `src/ts/main/infrastructure/invariants/checks/quizChecks.ts` — register quiz invariant: END state reachable from `_getCurrentSlide` when `SaveDataDispatcher.end()` is not implemented

### Dependency Cruiser Gate
- [ ] Run `yarn scan:deps` — `no-direct-webstorage` rule now reports zero violations
- [ ] Run `yarn scan:storage` — reports zero direct `localStorage`/`sessionStorage` usages outside adapter

### Phase 3 Gate
- [ ] `yarn scan:storage` reports zero violations
- [ ] `yarn scan:deps` `no-direct-webstorage` rule reports zero violations
- [ ] `yarn type-check` passes
- [ ] `yarn lint` passes
- [ ] `yarn test:unit` passes
- [ ] `yarn test:e2e` passes

---

## Phase 4 — Incremental Subsystem & Invariant Migration

**Goal:** Migrate three priority subsystems; add property tests; confirm mutation score.

### Install Mutation Testing
- [ ] Install `@stryker-mutator/core` and `@stryker-mutator/vitest-runner` (`yarn add -D`)
- [ ] Create `stryker.config.mjs`
- [ ] Add `test:mutation` script to `package.json`
- [ ] Confirm StrykerJS runs against `src/ts/main/dataaccess/**/*.ts`

### Priority 1: SaveData Subsystem
- [ ] Inject `Clock` into `timestampNow` (remove direct `Date.now()` call); update callers
- [ ] Write property tests (`saveData.property.test.ts`): arbitrary sequences of `set`/`remove`/`update` preserve schema validity
- [ ] Add Cypress storage snapshot assertion to `example.cy.ts` using `cy.snapshotStorage()`
- [ ] Run StrykerJS against `SaveData` subsystem; confirm mutation score ≥ 70%

### Priority 2: StateActionDispatcher Subsystem
- [ ] Export `QuizState` as a discriminated union from `stateActionDispatcher.ts`
- [ ] Refactor `dispatch2` to accept `slides`, `saves`, `clock`, `telemetry` as parameters (remove internal `Json.get()` and `SaveData.get()` calls)
- [ ] Update both call sites (`showSlides`, `_getCurrentSlide`) to pass data explicitly
- [ ] Add telemetry emission on every state transition inside `dispatch2`
- [ ] Fix `SaveDataDispatcher.end()` — implement correct behaviour (return results slide or equivalent) rather than throwing
- [ ] Write property tests (`stateActionDispatcher.property.test.ts`): arbitrary slide/save sequences produce a valid `QuizState`; `END` state only reached when `saves.length === slides.length`
- [ ] Confirm quiz invariant (`quizChecks.ts`) no longer fires after fix
- [ ] Run StrykerJS against `stateActionDispatcher.ts`; confirm mutation score ≥ 70%

### Priority 3: Spoony Subsystem
- [ ] Inject `Clock` into `sendMessage` in `spoonyApi.ts` — replace direct `setTimeout`/`clearTimeout` with `clock.setTimeout`/`clock.clearTimeout`
- [ ] Write property tests (`spoonyApi.property.test.ts`): arbitrary message history sequences do not exceed `MAX_USER_MESSAGE_LENGTH`; all error paths return typed `SpoonyApiResult`
- [ ] Add security finding to register: `spoony_api_key` stored as plain text (see `docs/ai.bugfix.security.spoonfeeder.md`)
- [ ] Run StrykerJS against `spoonyApi.ts`; confirm mutation score ≥ 70%

### Phase 4 Gate
- [ ] Mutation score ≥ 70% for all three migrated subsystems
- [ ] `yarn scan:sideeffects` reports zero `Date.now()`/`setTimeout` violations in migrated subsystems
- [ ] All property tests pass with seed 42
- [ ] `yarn type-check` passes
- [ ] `yarn lint` passes
- [ ] `yarn test:unit` passes
- [ ] `yarn test:e2e` passes

---

## Phase 5 — AI Repair Constraints

**Goal:** Wire the patch validation pipeline; replace the Cypress error catch-all.

### Patch Validation
- [ ] Create `scripts/ai-patch-validate.ts` — orchestrates all scanners against a diff; outputs structured JSON with per-rule pass/fail
- [ ] Add `ai:validate` script to `package.json`
- [ ] Document the confidence score schema in `docs/ai.bugfix.interfaces.spoonfeeder.md` (update existing)
- [ ] Add `verify` script to `package.json` combining: `type-check`, `lint`, `test:unit`, `test:property`, `scan:security`, `scan:storage`, `scan:sideeffects`, `scan:deps`, `test:e2e`

### Differential Replay
- [ ] Create `cypress/support/telemetry-commands.ts` — `cy.snapshotStorage()` and `cy.assertNoConsoleErrors()` commands
- [ ] Update `cypress/support/e2e.ts` — install `console.error` interceptor that populates `win.__consoleErrors`; remove `Cypress.on('uncaught:exception', () => false)` catch-all; add targeted suppression for known third-party errors by message pattern only
- [ ] Create `scripts/differential-replay.ts` — runs Cypress against baseline and patch; diffs storage snapshots via `microdiff`; outputs deviation count and structured report
- [ ] Add `test:baseline` and `test:diff` scripts to `package.json`
- [ ] Record baseline snapshot for `example.cy.ts` and commit to `cypress/replay/baselines/`

### Phase 5 Gate
- [ ] `yarn ai:validate` runs without crashing
- [ ] `yarn verify` passes end-to-end
- [ ] Baseline snapshot committed
- [ ] `yarn test:diff` reports zero deviations against baseline

---

## Phase 6 — Self-Consistency Audit

**Goal:** Run all semantic scanners against the infrastructure code itself; fix any violations.

- [ ] Run `yarn scan:sideeffects` scoped to `src/ts/main/infrastructure` — confirm zero `Date.now()`/`setTimeout` calls outside injected adapters
- [ ] Run `yarn scan:storage` scoped to `src/ts/main/infrastructure` — confirm zero direct `localStorage` calls outside `WebStorageAdapter`
- [ ] Run `yarn scan:security` scoped to `src/ts/main/infrastructure` — confirm zero `eval`, unsafe `innerHTML`, or hardcoded secrets
- [ ] Run `knip` — confirm zero unused exports in infrastructure
- [ ] Run `yarn scan:clusters` scoped to `src/ts/main/infrastructure` — confirm no boolean clusters in infrastructure state objects
- [ ] Run `yarn scan:deps` scoped to `src/ts/main/infrastructure` — confirm no dependency cycles within infrastructure
- [ ] Fix any violations found above
- [ ] Update `docs/ai.bugfix.migration.spoonfeeder.md` — mark all rows complete

### Phase 6 Gate
- [ ] All self-consistency scanner runs report zero violations
- [ ] `yarn verify` passes
- [ ] Migration compatibility matrix fully green
- [ ] ADRs written for any decisions made during Phase 6 that weren't anticipated earlier
