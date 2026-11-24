---
title: "TSK-007: Spaced Review — Per-Exercise Scheduling & Due Reviews"
prd: "PRD-007-spaced-review.md"
created: "2026-11-24"
status: "TODO"
---

## Setup

- [ ] **T-001** Pull the latest `main` and create branch `feat/007-spaced-review`
- [ ] **T-002** Read `docs/review.prd.md`, ADR-018, ADR-003, ADR-011 and ADR-026 to confirm constraints before changing the review module
- [ ] **T-003** Write `docs/adr/027-spaced-review-ladder-and-keying.md` covering the fixed interval ladder versus SM-2/FSRS, correctness-only scheduling versus self-rating, and `txt`-based keying with the `vocab:<term>` namespace
- [ ] **T-004** Record a baseline storage snapshot with `yarn test:e2e:snapshot` before any code changes (ADR-015)

## Schedule model and storage

- [ ] **T-010** Add `ScheduleEntry` and the interval-ladder constant table (single exported module, no magic numbers elsewhere) in `src/ts/main/review/`
- [ ] **T-020** Add `ScheduleStoreSchema` (Zod) and register it for `srs_<courseName>` in `spoonfeederSchemas.ts`
- [ ] **T-030** Add schedule read/write/clear functions to `reviewStorage.ts`, with corrupt-data fallback to an empty store
- [ ] **T-040** Extend `ScopeType` and the `ReviewRecord` schema to accept `'due'`; confirm existing stored records still validate

## Scheduling logic

- [ ] **T-050** Implement key derivation: slide `txt` for course exercises, `vocab:<term>` for vocab terms, exclusion of non-reviewable types (`imap`, `info`)
- [ ] **T-060** Implement the pure transition function: correct advances the box and streak and sets the due date; incorrect resets to box 0 with due today; multi-response exercises are correct only when every response is correct
- [ ] **T-070** Implement local-day due-date computation using the injected `Clock` (ADR-011), never `Date.now()`
- [ ] **T-080** Implement the mastered flag (box 5 with streak of at least 2) as a derived value, not a stored field
- [ ] **T-090** Implement orphan pruning: drop entries whose keys do not match the loaded Course tree, run on course load
- [ ] **T-100** Implement lazy seeding from existing `SaveData` for exercises with no schedule entry

## Update sources

- [ ] **T-110** Apply the transition per answered slide in the review session flow controller, after each submit and before advance
- [ ] **T-120** Verify draft resume continues from `currentIndex` and never reapplies an already-answered slide
- [ ] **T-130** Create a schedule entry on the first main-course answer of a reviewable exercise; later re-answers must not change the schedule
- [ ] **T-140** Confirm review sessions still do not write course `SaveData`

## Due review

- [ ] **T-150** Implement Due pool extraction: entries with `due` on or before today, matching a live exercise, restricted to completed scopes (review PRD §9)
- [ ] **T-160** Implement Due selection: most overdue first, ties broken with the app `Rng`, default size 10, cap 20
- [ ] **T-170** Wire the Due scope through the existing session pipeline, including draft persistence and `ReviewRecord` append with `scopeKey: 'due'`
- [ ] **T-180** Add the Due entry to `ReviewMenu.vue` with last score, review count, and a disabled state showing the next due date when nothing is due
- [ ] **T-190** Add the due-count indicator to `ReviewMenu.vue` and the course entry point, extending `reviewMenuState.ts` as needed
- [ ] **T-200** Review all new learner-facing copy against the tone rule in `docs/prd.gamification.md`: "ready for another look", never "overdue" or punitive wording

## Tests

- [ ] **T-210** Unit tests for the interval ladder in `src/ts/test/review/`: every box transition on correct and incorrect, ladder cap, multi-response exercises, mastered flag
- [ ] **T-220** Unit tests for key derivation, including vocab namespacing and excluded types
- [ ] **T-230** Unit tests for Due selection: overdue ordering, seeded tie-breaking, 20-item cap, locked-scope exclusion, empty pool
- [ ] **T-240** Unit tests for lazy seeding, orphan pruning, and schedule persistence (Zod validation, corrupt-data fallback, draft-resume idempotence)
- [ ] **T-250** Fake-clock tests for local-day boundaries, including midnight and daylight-saving transitions (ADR-001)
- [ ] **T-260** Component tests for `ReviewMenu` Due states (due, none due, locked scopes) and the due-count indicator
- [ ] **T-270** e2e test of a full Due review: answer correctly and incorrectly, reload, confirm due count and next-due date (keep selectors in lockstep per ADR-022)

## Docs

- [ ] **T-280** Update `docs/review.prd.md` to move the Due scope and scheduling from non-goals to a pointer to PRD-007, and add `scopeType: 'due'` to the storage section
- [ ] **T-290** Update `docs/STATUS.md` if the project's status changes
- [ ] **T-300** Append decisions made during implementation to `DEC-007.jsonl`

## Validation

- [ ] **T-900** Run `make` — lint, type-check and unit tests with 0 failures
- [ ] **T-910** Run `make coverage` — meets the project threshold
- [ ] **T-920** Run `yarn test:e2e` against the dev server on :9000 — 0 failures
- [ ] **T-930** Record a post-change snapshot with `yarn test:e2e:snapshot` and diff against the T-004 baseline; the only differences are the new `srs_<courseName>` key and the extended review-record schema
- [ ] **T-940** Manual smoke test: complete a lesson, answer a review item wrong, then correct, reload, and confirm the Due entry and indicator reflect the scheduled dates
- [ ] **T-950** Confirm the session is on the host, then run `make pipeline` from the workspace root and resolve every open issue for this repo in `/workspace/crucible/dashboard/audit.json`
- [ ] **T-960** Update `docs/RUN.md` with the session entry, set TSK status to Done, and set the PRD status to Complete in the PRD and `REGISTRY.md`
- [ ] **T-970** Commit with a detailed message and push with `git push -u origin feat/007-spaced-review`
