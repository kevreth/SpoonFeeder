---
title: "SpoonFeeder AI Bugfixing Platform — Phase 2 Gap Report"
---

# SpoonFeeder AI Bugfixing Platform — Phase 2 Gap Report

Generated: 2026-05-07  
Scanner baseline captured after Phase 1 infrastructure installation.

## Scanner Results Summary

| Scanner | Violations | Severity | Phase cleared |
|---|---|---|---|
| `yarn scan:storage` | 11 | — | Phase 3 |
| `yarn scan:sideeffects` | 6 | — | Phase 4 (per subsystem) |
| `yarn scan:security` | 0 errors, 4 warnings | warn | Phase 4 |
| `yarn scan:clusters` | 1 | — | Phase 4 |
| `yarn scan:deps` (no-direct-webstorage) | 3 | error | Phase 3 |
| `yarn scan:deps` (no-circular) | 2 | error | Pre-existing; address separately |

---

## 1. Storage Key Audit (`yarn scan:storage`)

**11 violations** — all in `main/dataaccess/webstorage/webStorage.ts` and `main/spoony/spoonyStorage.ts`.

| File | Line | Violation |
|---|---|---|
| `main/dataaccess/webstorage/webStorage.ts` | 2 | `new WebStorageVariable('courses', sessionStorage)` |
| `main/dataaccess/webstorage/webStorage.ts` | 3 | `new WebStorageFlag('random', sessionStorage)` |
| `main/dataaccess/webstorage/webStorage.ts` | 4 | `new WebStorageFlag('transition', sessionStorage)` |
| `main/dataaccess/webstorage/webStorage.ts` | 5 | `new WebStorageFlag('mute', sessionStorage)` |
| `main/dataaccess/webstorage/webStorage.ts` | 6 | `new WebStorageVariable('courseName', localStorage)` |
| `main/dataaccess/webstorage/webStorage.ts` | 8 | `sessionStorage.clear()` |
| `main/dataaccess/webstorage/webStorage.ts` | 20 | `new WebStorageVariable(courseName, localStorage).set(json)` — dynamic key |
| `main/dataaccess/webstorage/webStorage.ts` | 23 | `new WebStorageVariable(courseName, localStorage).get()` — dynamic key |
| `main/spoony/spoonyStorage.ts` | 4 | `new WebStorageVariable('spoony_api_key', localStorage)` |
| `main/spoony/spoonyStorage.ts` | 5 | `new WebStorageVariable('spoony_enabled', localStorage)` |
| `main/spoony/spoonyStorage.ts` | 6 | `new WebStorageVariable('spoony_model', localStorage)` |

**Phase 3 target:** `yarn scan:storage` reports zero violations.

---

## 2. Side-Effect Violations (`yarn scan:sideeffects`)

**6 violations** across 3 files. One is intentional infrastructure code; the rest are Phase 4 migration targets.

| File | Line | Violation | Action |
|---|---|---|---|
| `main/dataaccess/saveData/date.ts` | 18 | `Date.now()` in `timestampNow()` | Inject `Clock` — Phase 4 |
| `main/infrastructure/telemetry/TelemetryBus.ts` | 18 | `Date.now()` fallback when no clock provided | Known: production fallback. Fix in Phase 6 self-consistency audit. |
| `main/slidetype/types/gap/makeSlidesStrategyGap.ts` | 120 | `setTimeout(() => concludeOnce(), 0)` | Inject `Clock` — Phase 4 |
| `main/slidetype/types/gap/makeSlidesStrategyGap.ts` | 261 | `setTimeout(() => concludeOnce(), 0)` | Inject `Clock` — Phase 4 |
| `main/spoony/spoonyApi.ts` | 72 | `setTimeout(() => controller.abort(), 15000)` | Inject `Clock` — Phase 4 |
| `main/spoony/spoonyApi.ts` | 96 | `clearTimeout(timeoutId)` | Inject `Clock` — Phase 4 |

**Note on `TelemetryBus.ts`:** The `Date.now()` fallback is intentional — the bus must emit events even in production contexts where no `FakeClock` is injected. This will be evaluated and addressed in Phase 6. The `exempt` list for the scanner should be updated when Phase 6 begins to scope the scan to specific migrated files rather than the whole codebase.

**Note on `makeSlidesStrategyGap.ts`:** Two `setTimeout` calls not anticipated in gap analysis — added to Phase 4 migration scope.

---

## 3. Security Scan (`yarn scan:security`)

**0 errors, 4 warnings** — no blocking issues.

| File | Line | Pattern | Notes |
|---|---|---|---|
| `main/quiz/slideDispatcher.ts` | 47 | `innerHTML` assignment | `evaluate(json)` renders score summary HTML; content is app-generated, not user input. Low risk. |
| `main/slidetype/types/gap/makeSlidesStrategyGap.ts` | 151 | `innerHTML` assignment | Renders `fillText` from YAML course content into DOM. Content is trusted (YAML author). Low risk. |
| `main/slidetype/types/gap/makeSlidesStrategyGap.ts` | 164 | `innerHTML` assignment | Renders a number string into DOM. No user input. Low risk. |
| `main/slidetype/types/gap/slideTypeGap.ts` | 44 | `innerHTML` assignment | Renders stored `response` back into DOM. Medium risk — user-provided answer text. |

**Action:** `slideTypeGap.ts:44` deserves sanitization review. The `response` field comes from user drag-drop interaction, not free-text input, so XSS is unlikely but worth confirming. No changes required before Phase 3.

---

## 4. Boolean Cluster Scan (`yarn scan:clusters`)

**1 cluster** found.

| File | Line | Type | Boolean fields |
|---|---|---|---|
| `slide/slideInterface.ts` | 11 | `SlideInterface` | `cont`, `isExercise`, `immediateConclusion` |

**Analysis:** `cont` (has the user continued past this slide), `isExercise` (distinguishes exercises from info slides), and `immediateConclusion` (whether to show result immediately on answer) encode independent boolean facts. They are not an implicit state machine — `isExercise` and `immediateConclusion` are configuration set at slide construction, not runtime state. `cont` is runtime state.

**Recommendation:** Separate `cont` (runtime, mutated) from `isExercise` and `immediateConclusion` (static, configuration) at the type level. Not a Phase 3 or 4 blocker, but should be addressed during `SlideInterface` migration.

---

## 5. Dependency Cycle Violations (`yarn scan:deps` — `no-circular`)

**2 pre-existing cycles** not previously detected by `dpdm` (which only scanned `quiz/quiz.ts`).

**Cycle 1:**
```
dataaccess/index.ts
  → quiz/slideDispatcher.ts
  → quiz/evaluate.ts
  → dataaccess/index.ts
```

**Cycle 2:**
```
dataaccess/index.ts
  → dataaccess/saveData/slideDispatcher2.ts
  → quiz/slideDispatcher.ts
  → quiz/evaluate.ts
  → dataaccess/index.ts
```

**Root cause:** `dataaccess/index.ts` re-exports from both `quiz/` and `dataaccess/` subsystems, creating an import loop. The `quiz/evaluate.ts` import of `dataaccess/index.ts` closes the cycle.

**Action:** Not a Phase 3 blocker. Breaking these cycles is part of the `dispatch2` refactor in Phase 4 — when `stateActionDispatcher` becomes pure and no longer calls `SaveData.get()` internally, the cross-layer dependency is eliminated. Add to Phase 4 task list.

---

## 6. Performance Scan (`yarn scan:perf`)

**3 flagged items** — all `JSON.parse` calls, none in unbounded loops.

| File | Assessment |
|---|---|
| `dataaccess/saveData/saveData.ts` — `JSON.parse(data)` | Synchronous, called per user interaction. Acceptable. Will gain schema validation in Phase 3. |
| `dataaccess/webstorage/webStorage.ts` — `JSON.parse(COURSES.get())` | Synchronous, called during course load. Acceptable. |
| `infrastructure/storage/WebStorageAdapter.ts` — `JSON.parse(raw)` | Inside `async get()`. Synchronous parse inside an async method is acceptable for localStorage (synchronous storage). |

No performance blockers found.

---

## Subsystem Priority Ranking

Ranked by migration complexity and bug risk:

| Priority | Subsystem | Risk factors |
|---|---|---|
| 1 | **SaveData** (`saveData.ts`, `webStorage.ts`) | 8 storage violations, unvalidated JSON parse, Date.now() injection needed |
| 2 | **StateActionDispatcher** (`stateActionDispatcher.ts`, `slideDispatcher.ts`) | Pre-existing circular deps, `end()`/`next()` throw bugs, needs pure-function refactor |
| 3 | **Spoony** (`spoonyApi.ts`, `spoonyStorage.ts`) | 3 storage violations, 2 setTimeout violations, security finding SF-001 (plain-text API key) |
| 4 | **Gap slide type** (`makeSlidesStrategyGap.ts`) | 2 unexpected setTimeout violations, 2 innerHTML warnings |
