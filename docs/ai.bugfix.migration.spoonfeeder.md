---
title: "SpoonFeeder AI Bugfixing Platform — Migration Compatibility Matrix"
---

# SpoonFeeder AI Bugfixing Platform — Migration Compatibility Matrix

## Purpose
Tracks which modules and storage keys have been migrated from raw `WebStorageVariable`/`WebStorageFlag`/direct `localStorage` access to the `StorageAdapter` layer. Updated at the end of each phase.

**Legend:**
- `Not started` — module still uses raw storage access
- `In progress` — partially migrated; mixed usage
- `Complete` — all storage access routed through `StorageAdapter`; gate passed
- `Deferred` — intentionally deferred to a future phase; ADR documents reason
- `N/A` — module has no storage access

---

## Module Migration Status

| Module | Storage Keys Owned | Phase 3 Status | Phase 4 Status | Notes |
|---|---|---|---|---|
| `dataaccess/webstorage/webStorage.ts` | `courseName`, `<courseName>` (save data), `courses`, `random`, `transition`, `mute` | Complete | Complete | Migrated to `SyncStorageAdapter` (localSync/sessionSync) |
| `dataaccess/persistence/webPersistence.ts` | (provides `WebStorageVariable`, `WebStorageFlag` — no own keys) | Complete | N/A | Retained as legacy reference; no longer imported by business logic |
| `dataaccess/saveData/saveData.ts` | Reads/writes via `getSaveData`/`setSaveData` (defers to `webStorage.ts`) | Complete | Complete | All methods async; uses `localAsync` WebStorageAdapter |
| `dataaccess/saveData/date.ts` | None (time only) | N/A | Complete | `timestampNow(clock)` — Clock injected; `Date.now()` removed |
| `spoony/spoonyStorage.ts` | `spoony_api_key`, `spoony_enabled`, `spoony_model` | Complete | Complete | Uses `localSync` SyncStorageAdapter |
| `spoony/spoonyApi.ts` | None (network only) | N/A | Complete | `sendMessage(params, clock)` — Clock injected; bare `setTimeout` removed |
| `quiz/stateActionDispatcher.ts` | None (pure function) | N/A | Complete | `dispatch2` is pure; `QuizState` exported; `getQuizState` lifted out |
| `quiz/slideDispatcher.ts` | None | N/A | Complete | Passes slides/saves explicitly to `dispatch2` |
| `dataaccess/saveData/currentSlide.ts` | None | N/A | Complete | Passes slides/saves explicitly to `dispatch2` |
| `dataaccess/saveData/slideDispatcher2.ts` | None | N/A | Complete | `SaveDataDispatcher.next()` implemented (was throwing) |
| `dataaccess/saveData/saveFile.ts` | None (`Json` is in-memory only) | N/A | N/A | No storage access |
| `slide/explanation.ts` | None | N/A | N/A | No storage access |
| `course/` (all files) | None | N/A | N/A | Course data loaded from YAML; no localStorage access |
| `slidetype/` (all files) | None | N/A | N/A | No direct storage access (confirmed via `yarn scan:storage`) |
| `vue/mediator.ts` | None directly (delegates to TS layer) | N/A | Complete | Awaits all async storage calls; passes `appClock` to API callers |
| `vue/composables/` | None directly | N/A | N/A | Depend on mediator; no own storage access |
| `infrastructure/telemetry/TelemetryBus.ts` | None | N/A | Complete | `clock?: Clock` → `clock: Clock` (required); `Date.now()` fallback removed (Phase 5 acceleration) |

---

## Storage Key Registry Status

| Key | Storage | Registered in `SchemaRegistry` | Adapter Migration | Phase Completed |
|---|---|---|---|---|
| `courseName` | localStorage | Complete | Complete | Phase 1 (register) / Phase 3 (migrate) |
| `<courseName>` (dynamic) | localStorage | Complete | Complete | Phase 1 (register) / Phase 3 (migrate) |
| `courses` | sessionStorage | Complete | Complete | Phase 1 (register) / Phase 3 (migrate) |
| `random` | sessionStorage | Complete | Complete | Phase 1 (register) / Phase 3 (migrate) |
| `transition` | sessionStorage | Complete | Complete | Phase 1 (register) / Phase 3 (migrate) |
| `mute` | sessionStorage | Complete | Complete | Phase 1 (register) / Phase 3 (migrate) |
| `spoony_api_key` | localStorage | Complete | Complete | Phase 1 (register) / Phase 3 (migrate) |
| `spoony_enabled` | localStorage | Complete | Complete | Phase 1 (register) / Phase 3 (migrate) |
| `spoony_model` | localStorage | Complete | Complete | Phase 1 (register) / Phase 3 (migrate) |

---

## Side-Effect Injection Status

| Call site | Violation | Phase | Status |
|---|---|---|---|
| `date.ts` — `new Date(Date.now())` | Direct `Date.now()` | Phase 4 | Complete — `timestampNow(clock: Clock)` |
| `spoonyApi.ts` — `setTimeout(() => controller.abort(), 15000)` | Direct `setTimeout` | Phase 4 | Complete — `clock.setTimeout(...)` |
| `spoonyApi.ts` — `clearTimeout(timeoutId)` | Direct `clearTimeout` | Phase 4 | Complete — `clock.clearTimeout(...)` |
| `makeSlidesStrategyGap.ts` — two `setTimeout(() => concludeOnce(), 0)` | Direct `setTimeout` | Phase 4 | Complete — `clock.setTimeout(...)` |
| `TelemetryBus.ts` — `Date.now()` fallback | Direct `Date.now()` | Phase 5 | Complete — `clock.now()` required; fallback removed |

---

## Invariant Registration Status

| Invariant ID | Subsystem | Registered | Tested | Phase | Notes |
|---|---|---|---|---|---|
| `storage.schema-valid-session` | storage | Complete | Via storageChecks | Phase 3/6 | Registered in storageInit via storageChecks |
| `storage.schema-valid-local` | storage | Complete | Via storageChecks | Phase 3/6 | Registered in storageInit via storageChecks |
| `storage.null-guard` | storage | Complete | Via storageChecks | Phase 3/6 | Registered in storageInit via storageChecks |
| `storage.quota` | storage | Complete | Via storageChecks | Phase 3/6 | Registered in storageInit via storageChecks |
| `storage.sensitive-not-empty` | storage | Complete | Via storageChecks | Phase 3/6 | Registered in storageInit via storageChecks; reads raw localStorage |
| `quiz.slides-before-save` | quiz | Complete | Via quizChecks | Phase 6 | Wired via `registerAppInvariants()` — boot layer |
| `quiz.end-handler-complete` | quiz | Complete | Via quizChecks | Phase 6 | Wired via `registerAppInvariants()` — boot layer |
| `lifecycle.no-write-after-teardown` | lifecycle | Complete | Via lifecycleChecks | Phase 6 | Placeholder; full impl requires Vue onUnmounted instrumentation |

---

## Phase Gate Tracker

| Phase | Description | Status | Date Completed |
|---|---|---|---|
| Phase 1 | Infrastructure foundation | Complete | 2026-05-06 |
| Phase 2 | Automated gap analysis | Complete | 2026-05-06 |
| Phase 3 | Storage abstraction & schema enforcement | Complete | 2026-05-07 |
| Phase 4 | Incremental subsystem & invariant migration | Complete | 2026-05-07 |
| Phase 5 | AI repair constraints | Complete | 2026-05-07 |
| Phase 6 | Self-consistency audit | Complete | 2026-05-08 |

---

## Scan Baseline (Phase 2 — captured 2026-05-07) vs Final State (Phase 6)

| Scanner | Violations at Baseline | Violations at Phase 6 Gate |
|---|---|---|
| `yarn scan:storage` | 11 | 0 |
| `yarn scan:sideeffects` | 6 | 0 |
| `yarn scan:security` | 0 errors, 4 warnings | 0 errors, 4 warnings (known innerHTML — low risk) |
| `yarn scan:clusters` | 1 (SlideInterface — pre-existing) | 1 (unchanged — not infrastructure) |
| `yarn scan:infra` | n/a (new in Phase 6) | 0 |
| `yarn scan:deps` (`no-circular`) | 2 pre-existing cycles | 0 |
| `yarn scan:deps` (`no-direct-webstorage`) | 3 | 0 |
| `yarn knip` (infrastructure) | n/a | 0 unused infrastructure exports |
