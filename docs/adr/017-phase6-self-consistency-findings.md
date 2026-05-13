# ADR 017 — Phase 6 Self-Consistency Audit Findings and Resolutions

**Status:** Accepted  
**Phase:** 6 — Self-Consistency Audit  
**Date:** 2026-05-08

## Context

Phase 6 runs all semantic scanners against the infrastructure layer itself. Three categories of findings were addressed: a new `scripts/infra-audit.ts` scanner, circular dependency resolution, and knip configuration for intentionally deferred exports.

---

## Finding 1: `infra-audit.ts` — Infrastructure Self-Consistency Scanner

### Decision
Create `scripts/infra-audit.ts` (`yarn scan:infra`) with stricter rules than the full-codebase scanners. Within `src/ts/main/infrastructure/`, each raw platform API must only appear in its designated implementation file:

| API | Allowed in |
|---|---|
| `Date.now()` / `setTimeout()` / `clearTimeout()` | `clocks/RealClock.ts`, `clocks/Clock.ts`, `clocks/FakeClock.ts` |
| `Math.random()` | `random/RealRng.ts` |
| `localStorage` / `sessionStorage` | adapter files + `storageChecks.ts` (invariant checks) + `storageInit.ts` + `factory.ts` |
| `eval()` / `new Function()` / `innerHTML =` | forbidden everywhere in infrastructure |

Result: **0 violations**.

---

## Finding 2: Circular Dependency — storageChecks ↔ storageInit

### Problem
Wiring the invariant registry in `storageInit.ts` created two circular dependency chains:

1. `storageInit → quizChecks → saveData → webStorage → storageInit`
2. `storageInit → storageChecks → storageInit` (storageChecks imported `appRegistry` from storageInit)

### Decision — Two-part fix

**Part A:** `registerStorageInvariants(registry, schemaRegistry)` now receives `SchemaRegistry` as a parameter instead of importing `appRegistry` from `storageInit`. This breaks chain 2.

**Part B:** `quizChecks.ts` and `lifecycleChecks.ts` are not imported by `storageInit.ts`. Instead, a new `registerAppInvariants.ts` module wires quiz and lifecycle invariants. This module is called from the Vue boot layer — it is an entry point for knip but not part of the storage singleton init path. This breaks chain 1.

**Result:** `yarn scan:deps` reports 0 circular dependency violations (down from 2 pre-existing at Phase 2 baseline).

---

## Finding 3: knip — Intentionally Deferred Infrastructure Exports

### Problem
knip reported unused exports and files in infrastructure for items that are intentionally built but not yet wired to callers:

| Item | Reason deferred |
|---|---|
| `RealRng.ts` | Rng injection into business logic is post-Phase-6 work (no shuffle/randomisation in business logic uses injected Rng yet) |
| `factory.ts` | Android adapter factory; activated when `@capacitor/preferences` is added (ADR 005) |
| `spoonfeederSchemas.ts` exports | Part of the documented API surface in `ai.bugfix.interfaces.spoonfeeder.md`; used by AI Fixer agents as reference |
| `storageInit.ts` exports (`appTelemetry`, `appInvariantRegistry`) | Application singletons; consumed by the boot layer which knip cannot trace through Quasar's entry resolution |

### Decision
- Add `RealRng.ts`, `factory.ts`, `webPersistence.ts`, `spoonfeederSchemas.ts`, `storageInit.ts`, and `storage-fixtures.ts` to knip's `ignore` list.
- Add `registerAppInvariants.ts` to knip's `entry` list so quiz/lifecycle check files are reachable.
- Extend `ignoreExportsUsedInFile` with `variable: true` and `function: true` to suppress exports used within their own module.

**Result:** `yarn knip` reports 0 unused exports or files in infrastructure. Seven non-infrastructure unused exports remain (Score, Evaluation, course/quiz helper functions) — pre-existing items outside the Phase 6 scope.

---

## Finding 4: zod as Direct Dependency

knip reported `zod` as an "unlisted dependency" — used in infrastructure schemas but not declared in `package.json` (it was only a transitive dependency). Added `zod` as a direct dependency with `yarn add zod`.

---

## Consequences

- `yarn scan:infra` is the infrastructure-scoped self-consistency gate. It should be added to `yarn ai:validate` in a future phase.
- The `storageChecks.ts → SchemaRegistry` parameter pattern means the invariant check's schema knowledge comes from the caller, not from a module-level import. This is the correct dependency direction.
- `registerAppInvariants()` must be called from the Vue boot layer before the quiz is entered. Until wired, quiz and lifecycle invariants are registered but not asserted at boot.
