---
title: "AI-Native Bugfixing Platform — Gap Analysis for SpoonFeeder"
---

# AI-Native Bugfixing Platform — Gap Analysis for SpoonFeeder

## Document Status
Draft v1.0 — Self-Contained Gap Analysis

## Target Project Summary

**SpoonFeeder** is a Quasar v2 (Vue 3, Composition API, Vite) programmatic-instruction SPA. It delivers 20+ YAML-defined courses as interactive slide-and-question sequences. The same codebase targets Web (SPA) and Android (via Capacitor).

| Attribute | Value |
|---|---|
| Language | TypeScript (strict mode) |
| Framework | Quasar v2 / Vue 3 |
| Build | Vite (via `@quasar/app-vite`) |
| Package manager | yarn 4 |
| Targets | Web SPA, Android (Capacitor) |
| State / Persistence | `localStorage` + `sessionStorage` via thin `WebStorageVariable`/`WebStorageFlag` wrappers |
| Unit testing | Vitest + jsdom |
| E2E testing | Cypress |
| Type checking | `vue-tsc` |
| Linting | ESLint + Prettier |
| Dead-code audit | `knip` |
| Circular dependency check | `dpdm` |
| CI/CD | None (all verification runs locally via yarn scripts) |
| Telemetry / Observability | None |
| Property-based tests | None |
| Mutation tests | None |

---

## Infrastructure Layer Gap Analysis

| Abstract Layer | SpoonFeeder Status | Action | Justification |
|---|---|---|---|
| **Persistence Abstraction** | `WebStorageVariable` (wraps `localStorage`/`sessionStorage`) and `WebStorageFlag` (boolean specialisation) exist but expose no unified interface, no schema validation, no version envelope, no atomic `update`, and no quota guard. `SaveData.get()` calls raw `JSON.parse` with no validation. | **ADAPT** | The abstract principle requires a unified interface with schema-validated writes, versioned data, atomic `update`, and quota guards. The thin wrappers must be promoted to a full `StorageAdapter` interface with platform-specific implementations for Web and Android (Capacitor). |
| **Invariant Engine** | Absent. No runtime invariant checking anywhere in the codebase. | **INTRODUCE** | The abstract principle requires an `InvariantRegistry` with check functions run after persistence writes, after lifecycle events, and after E2E flows. |
| **Telemetry & Trace System** | Absent. No structured telemetry, no event bus, no replay traces. | **INTRODUCE** | The abstract principle requires a structured, machine-parseable telemetry bus. Because SpoonFeeder has no backend, this is implemented as a zero-backend in-memory ring buffer (identical to the client-side domain requirement). |
| **Deterministic Execution (Clock, Random, Scheduling)** | `date.ts` calls `new Date(Date.now())` directly. `spoonyApi.ts` calls `setTimeout` directly (hardcoded 15 000 ms timeout). No injectable `Clock` or `Rng` abstractions exist. | **INTRODUCE** | The abstract principle forbids direct global time/timer calls in business logic. A `Clock` interface with `RealClock` and `FakeClock` must be introduced and injected into `date.ts`, `spoonyApi.ts`, and any other site that calls `Date.now()` or `setTimeout`. |
| **Replay Infrastructure** | Absent. No trace recording, no baseline snapshots, no comparison tooling. | **INTRODUCE** | The abstract principle requires replay traces (telemetry events + persistence snapshots) that can reproduce a failing scenario deterministically. Built on top of Cypress storage snapshots and the `TelemetryBus`. |
| **Semantic Analysis & Patch Validation** | Partially present: `dpdm` (circular deps), `knip` (dead code), `vue-tsc` (type safety), ESLint + Prettier (style). Missing: boolean cluster scanner, side-effect scanner, storage key audit, security scanner, property-based tests, mutation tests. | **ADAPT** (existing tools) + **INTRODUCE** (missing scanners) | The abstract principle requires the full scanner suite. Existing tools satisfy the dependency-cycle, dead-code, and type-safety layers; the remaining scanners must be introduced as scripts. |

---

## Verification Layer Gap Analysis

| Verification Layer | Target Tool | Status | Action |
|---|---|---|---|
| **Storage Invariants** | None | Missing | INTRODUCE: `InvariantRegistry` + `storageChecks.ts`; run after every `StorageAdapter` write/remove and in Cypress `afterEach`. |
| **UI / Lifecycle Invariants** | None | Missing | INTRODUCE: `InvariantRegistry` + `lifecycleChecks.ts`; run after Vue component `onUnmounted` (dev builds) and after Quasar boot. |
| **Behavioral E2E Tests** | Cypress | Exists (one large `example.cy.ts` flow covering the full "test" course) | ADAPT: instrument with `cy.snapshotStorage()` and telemetry assertions; suppress `uncaught:exception` swallowing (currently `return false` hides errors from the platform). |
| **Property-Based Tests** | None | Missing | INTRODUCE: `fast-check` (already compatible with Vitest + jsdom). |
| **Unit Tests** | Vitest + jsdom | Exists — `src/ts/test/` covers quiz, slides, buttons, course loading, save data, Spoony | ADAPT: add deterministic clock/storage setup file so existing tests become reproducible without modification. |
| **Mutation Tests** | None | Missing | INTRODUCE: `@stryker-mutator/core` + `@stryker-mutator/vitest-runner`. Gate for Phase 4 subsystem migration completion. |
| **Differential Replay** | None | Missing | INTRODUCE: `scripts/differential-replay.ts` diffing Cypress storage snapshots using `microdiff`; telemetry event-order comparison. |

---

## Concrete Storage Key Inventory (Phase 2 audit baseline)

The following keys are written directly via `localStorage` or `sessionStorage` without schema validation or version tracking:

| Key | Storage | Type (inferred) | Written by |
|---|---|---|---|
| `courseName` | `localStorage` | `string` | `webStorage.ts` → `COURSE_NAME.set()` |
| `<courseName>` (e.g. `"test"`) | `localStorage` | `JSON.stringify(SaveData[])` | `webStorage.ts` → `setSaveData()` |
| `spoony_api_key` | `localStorage` | `string` | `spoonyStorage.ts` → `SPOONY_API_KEY.set()` |
| `spoony_enabled` | `localStorage` | `"true"` \| `"false"` | `spoonyStorage.ts` → `SPOONY_ENABLED.set()` |
| `spoony_model` | `localStorage` | `string` | `spoonyStorage.ts` → `SPOONY_MODEL.set()` |
| `courses` | `sessionStorage` | `JSON.stringify(string[])` | `webStorage.ts` → `setCourseListing()` |
| `random` | `sessionStorage` | `"true"` \| `"false"` | `webStorage.ts` → `RANDOM.set()/.clear()` |
| `transition` | `sessionStorage` | `"true"` \| `"false"` | `webStorage.ts` → `TRANSITION.set()/.clear()` |
| `mute` | `sessionStorage` | `"true"` \| `"false"` | `webStorage.ts` → `MUTE.set()/.clear()` |

All nine keys lack schema registration, version envelopes, and null guards. The `<courseName>` keys are the most critical: they store the student's entire answer history and are read with a bare `JSON.parse` that will propagate corruption silently.

---

## Direct Global API Violations (Phase 2 side-effect scanner baseline)

| File | Violation |
|---|---|
| `src/ts/main/dataaccess/saveData/date.ts` | `Date.now()` called directly inside `timestampNow()` |
| `src/ts/main/spoony/spoonyApi.ts` | `setTimeout` / `clearTimeout` called directly (AbortController timeout) |
| `src/ts/main/dataaccess/persistence/webPersistence.ts` | Direct `Storage.setItem` / `getItem` / `removeItem` (thin wrapper, not behind interface) |
| `src/ts/main/dataaccess/webstorage/webStorage.ts` | Direct `sessionStorage.clear()` and `WebStorageVariable` construction with raw `Storage` reference |
| `src/ts/main/slidetype/types/gap/makeSlidesStrategyGap.ts` | Direct `localStorage` / `sessionStorage` (confirm via audit script) |

---

## Boolean Cluster Candidates (Phase 2 boolean cluster scanner baseline)

| File | Cluster |
|---|---|
| `src/ts/main/slide/slideInterface.ts` | `cont: boolean`, `isExercise: boolean`, `immediateConclusion: boolean` co-exist in `SlideInterface` — three boolean flags on one object that may encode implicit states |
| `src/ts/main/dataaccess/saveData/saveData.ts` | `cont: boolean` in `SaveData` is a completion flag that conflates "answered" and "continue-clicked" states |

These are candidates for conversion to discriminated unions during Phase 4 FSM migration.

---

## Missing Packages (to be introduced)

```bash
# Runtime
yarn add zod microdiff

# Development
yarn add -D fast-check
yarn add -D @stryker-mutator/core @stryker-mutator/vitest-runner
yarn add -D dependency-cruiser
```

`dpdm` (circular deps) and `knip` (dead code) are already present.  
`@sinonjs/fake-timers` is **not** needed because `FakeClock` and `FakeRng` will be implemented as plain TypeScript classes compatible with Vitest's jsdom environment — no global timer patching required for the business-logic layer.

---

## Summary Risk Assessment

| Risk | Severity | Notes |
|---|---|---|
| `SaveData` JSON round-trip with no schema guard | High | Silent corruption on schema drift; student answer history lost |
| `spoony_api_key` stored as plain string in `localStorage` | High | API key visible in DevTools; no encryption at rest |
| `Date.now()` in `timestampNow()` makes save-data timestamps nondeterministic in tests | Medium | Blocks deterministic property tests on `SaveData` |
| No invariant engine means impossible states (e.g. `cont=true` with no matching slide) silently propagate | Medium | Observed in `SaveDataDispatcher.next()` — `throw new Error('Method not implemented.')` |
| `Cypress.on('uncaught:exception', () => false)` swallows all runtime errors in E2E | Medium | Masks real bugs; must be replaced with targeted suppression |
| No mutation tests | Medium | Test suite quality unverified; AI patches may add passing-but-ineffective tests |
