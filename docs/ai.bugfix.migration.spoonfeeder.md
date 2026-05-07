# SpoonFeeder AI Bugfixing Platform — Migration Compatibility Matrix

## Purpose
Tracks which modules and storage keys have been migrated from raw `WebStorageVariable`/`WebStorageFlag`/direct `localStorage` access to the `StorageAdapter` layer. Updated at the end of each phase. A row is "complete" only when the Phase 3 gate passes for that module.

**Legend:**
- `Not started` — module still uses raw storage access
- `In progress` — partially migrated; mixed usage
- `Complete` — all storage access routed through `StorageAdapter`; gate passed
- `N/A` — module has no storage access

---

## Module Migration Status

| Module | Storage Keys Owned | Phase 3 Status | Phase 4 Status | Notes |
|---|---|---|---|---|
| `dataaccess/webstorage/webStorage.ts` | `courseName`, `<courseName>` (save data), `courses`, `random`, `transition`, `mute` | Not started | Not started | Primary migration target; 6 of 9 keys live here |
| `dataaccess/persistence/webPersistence.ts` | (provides `WebStorageVariable`, `WebStorageFlag` — no own keys) | Not started | Not started | Will become internal implementation detail of `WebStorageAdapter`; remove or deprecate after Phase 3 |
| `dataaccess/saveData/saveData.ts` | Reads/writes via `getSaveData`/`setSaveData` (defers to `webStorage.ts`) | Not started | Not started | `SaveData.get()`, `set()`, `replace()`, `setContinueTrue()` must all become async |
| `dataaccess/saveData/date.ts` | None (time only) | N/A | Not started | `timestampNow()` uses `Date.now()` directly; inject `Clock` in Phase 4 |
| `spoony/spoonyStorage.ts` | `spoony_api_key`, `spoony_enabled`, `spoony_model` | Not started | Not started | Sensitive key `spoony_api_key` — see security register |
| `spoony/spoonyApi.ts` | None (network only) | N/A | Not started | `setTimeout` used directly; inject `Clock` in Phase 4 |
| `quiz/stateActionDispatcher.ts` | None (reads via `Json` and `SaveData` singletons) | N/A | Not started | `dispatch2` must become pure (Phase 4); `QuizState` must be exported |
| `quiz/slideDispatcher.ts` | None (uses `SaveData` and `Json` singletons) | N/A | Not started | Caller of `dispatch2`; must pass data explicitly after Phase 4 |
| `dataaccess/saveData/currentSlide.ts` | None (uses `SaveData` and `Json` singletons) | N/A | Not started | Caller of `dispatch2`; must pass data explicitly after Phase 4 |
| `dataaccess/saveData/slideDispatcher2.ts` | None (uses `Json` singleton internally) | N/A | Not started | `SaveDataDispatcher.end()` and `.next()` must be implemented |
| `dataaccess/saveData/saveFile.ts` | None (`Json` is in-memory only) | N/A | N/A | No storage access; no migration needed |
| `slide/explanation.ts` | None | N/A | N/A | No storage access |
| `course/` (all files) | None | N/A | N/A | Course data loaded from YAML; no localStorage access |
| `slidetype/` (all files) | None | N/A | N/A | No direct storage access (confirm via `yarn scan:storage`) |
| `vue/mediator.ts` | None directly (delegates to TS layer) | N/A | Not started | Must `await` all storage calls once TS layer is async |
| `vue/composables/` | None directly | N/A | N/A | Depend on mediator; no own storage access |

---

## Storage Key Registry Status

| Key | Storage | Registered in `SchemaRegistry` | Adapter Migration | Phase |
|---|---|---|---|---|
| `courseName` | localStorage | Not registered | Not migrated | Phase 1 (register) / Phase 3 (migrate) |
| `<courseName>` (dynamic) | localStorage | Not registered | Not migrated | Phase 1 (register) / Phase 3 (migrate) |
| `courses` | sessionStorage | Not registered | Not migrated | Phase 1 (register) / Phase 3 (migrate) |
| `random` | sessionStorage | Not registered | Not migrated | Phase 1 (register) / Phase 3 (migrate) |
| `transition` | sessionStorage | Not registered | Not migrated | Phase 1 (register) / Phase 3 (migrate) |
| `mute` | sessionStorage | Not registered | Not migrated | Phase 1 (register) / Phase 3 (migrate) |
| `spoony_api_key` | localStorage | Not registered | Not migrated | Phase 1 (register) / Phase 3 (migrate) |
| `spoony_enabled` | localStorage | Not registered | Not migrated | Phase 1 (register) / Phase 3 (migrate) |
| `spoony_model` | localStorage | Not registered | Not migrated | Phase 1 (register) / Phase 3 (migrate) |

---

## Side-Effect Injection Status

| Call site | Violation | Phase | Status |
|---|---|---|---|
| `date.ts:18` — `new Date(Date.now())` | Direct `Date.now()` | Phase 4 | Not started |
| `spoonyApi.ts:71` — `setTimeout(() => controller.abort(), 15000)` | Direct `setTimeout` | Phase 4 | Not started |
| `spoonyApi.ts:96` — `clearTimeout(timeoutId)` | Direct `clearTimeout` | Phase 4 | Not started |

---

## Invariant Registration Status

| Invariant ID | Subsystem | Registered | Tested | Phase |
|---|---|---|---|---|
| `storage.null-guard` | storage | No | No | Phase 3 |
| `storage.schema-valid` | storage | No | No | Phase 3 |
| `storage.version-envelope` | storage | No | No | Phase 3 |
| `storage.quota` | storage | No | No | Phase 3 |
| `storage.sensitive-not-empty` | storage | No | No | Phase 3 |
| `quiz.end-reachable` | quiz | No | No | Phase 4 |
| `quiz.slides-before-save` | quiz | No | No | Phase 4 |
| `lifecycle.no-write-after-teardown` | lifecycle | No | No | Phase 3 |

---

## Phase Gate Tracker

| Phase | Description | Status | Date Completed |
|---|---|---|---|
| Phase 1 | Infrastructure foundation | Not started | — |
| Phase 2 | Automated gap analysis | Not started | — |
| Phase 3 | Storage abstraction & schema enforcement | Not started | — |
| Phase 4 | Incremental subsystem & invariant migration | Not started | — |
| Phase 5 | AI repair constraints | Not started | — |
| Phase 6 | Self-consistency audit | Not started | — |

---

## Scan Baseline (Phase 2 output — fill in after running scanners)

| Scanner | Violations at Baseline | Target (Phase 3/4 gate) |
|---|---|---|
| `yarn scan:storage` | TBD | 0 |
| `yarn scan:sideeffects` | TBD | 0 in migrated subsystems |
| `yarn scan:security` | TBD | 0 |
| `yarn scan:clusters` | TBD | Documented and triaged |
| `yarn scan:deps` (`no-direct-webstorage`) | TBD | 0 |
| `yarn scan:deps` (`no-circular`) | TBD | 0 |
