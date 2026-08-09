---
title: "TSK-004: NGN Exercise Types — Aggregate & Linked-Group Question Formats"
prd: "PRD-004-ngn-exercise-types.md"
created: "2026-08-06"
status: "Done"
---

## Setup

- [x] **T-010** Confirm current `ResultReturnType` / `EvaluateType` call sites (`Slide.evaluate()`, `evaluateAnswer.ts`) and write characterization tests locking today's boolean behavior before touching them.

## Core: Result/Evaluate widening (extended SATA groundwork)

- [x] **T-020** Widen `ResultReturnType` to carry a fractional/partial score without breaking existing `boolean | boolean[]` consumers.
- [x] **T-030** Add a `Result.PARTIAL` strategy — `max(0, correctSelections - incorrectSelections) / totalCorrectAnswers`, floored at 0 (see DEC-004.jsonl).
- [x] **T-040** Update `Slide.evaluate()`'s cast and `evaluateAnswer.ts`'s live pass/fail collapse to handle the new return shape.
- [x] **T-050** Regression-test all 9 existing types against the widened types.

## Extended Multiple Response

- [x] **T-060** `Ema` slideType/factory, reusing `ChoiceExercise.vue` unchanged, wired to `Result.PARTIAL`.
- [x] **T-070** YAML authoring reuses `ma`'s existing `numans` convention (first `numans` entries of `o` are correct) — no divergent syntax needed.
- [x] **T-080** Unit + e2e coverage.

## Extended Drag-and-Drop (bins)

- [x] **T-090** `slideTypeBins.ts` / `factoryBins.ts`.
- [x] **T-100** `BinsExercise.vue`, generalizing `gap`'s multi-zone `VueDraggable` pattern to N-capacity bins (no `put` cap needed — bins hold unlimited items).
- [x] **T-110** Unit + e2e coverage.

## Cloze — dropdown in text

- [x] **T-120** `slideTypeClozeText.ts` / `factoryClozeText.ts`, `Evaluate.GAP` / `Result.CORRELATED`.
- [x] **T-130** `ClozeTextExercise.vue` — inline dropdown rendering within AsciiDoc-processed prose.
- [x] **T-140** Unit + e2e coverage.

## Cloze — dropdown in table

- [x] **T-150** `slideTypeClozeTable.ts` / `factoryClozeTable.ts`.
- [x] **T-160** `ClozeTableExercise.vue`.
- [x] **T-170** Unit + e2e coverage.

## Matrix/grid — single response

- [x] **T-180** `slideTypeMatrixSingle.ts` / `factoryMatrixSingle.ts`.
- [x] **T-190** `MatrixSingleExercise.vue` — radio-button grid.
- [x] **T-200** Unit + e2e coverage.

## Matrix/grid — multiple response

- [x] **T-210** `slideTypeMatrixMulti.ts` / `factoryMatrixMulti.ts` — `ans`/`res` are canonical sorted comma-joined column-index strings per row (`canonicalizeColumnIndices`), since `AnswerType` has no `string[][]` variant.
- [x] **T-220** `MatrixMultiExercise.vue` — checkbox grid, submitted via Done.
- [x] **T-230** Unit + e2e coverage.

## Linked item group (core mechanism)

- [x] **T-240** Implemented as a course-loader special case (`type: cluster`) rather than a registered `SlideType`, to avoid a circular import back through `slideFactory.ts` (see DEC-004.jsonl). `item.set` holds ordinary child slide-YAML blocks.
- [x] **T-250** `jsonProcessor.ts`'s `_expandCluster` runs each child back through `initSlide()` and stamps the result with shared `groupId`/`groupContext`/`groupTag`/`groupIndex`/`groupTotal` metadata — group identity survives into the quiz driver via these fields on each independently-typed child slide.
- [x] **T-260** Mid-sequence context updates ("trending") — a child only needs to specify `groupContext` when it changes; otherwise it inherits the previous child's.
- [x] **T-270** Optional per-sub-item `groupTag` field (CJMM step label for clusters; unused by bowtie).
- [x] **T-280** Unit coverage for a 2-item group (`clusterExpansion.test.ts`) plus e2e coverage; also fixed a related blind spot in `reviewExtractor.ts` (`BoundaryMapBuilder`/`PoolExtractor`) and `scoreProcessor.ts`, which called `initSlide()` directly on cluster items and undercounted them (see DEC-004.jsonl).

## Bowtie

- [x] **T-290** Built as a self-contained aggregate type, not a linked group (see DEC-004.jsonl) — one slide, fixed 5-slot `ans`/`res` array (`buildBowtieAnswer`: condition + 2 sorted actions + 2 sorted monitors), `Evaluate.GAP`/`Result.CORRELATED`.
- [x] **T-300** `BowtieLayout.vue` — condition + both branches on one screen, auto-finalizing once all three parts are complete.
- [x] **T-310** Unit + e2e coverage.

## Case-study / trend item cluster

- [x] **T-320** Authored via the `type: cluster` mechanism (T-240–T-280) with CJMM `groupTag` values per child.
- [x] **T-330** No separate `ClusterExercise.vue` — each child renders through its own existing exercise component (`ChoiceExercise.vue`, etc.), with a shared `GroupContextBanner.vue` rendered above it by `IndexPage.vue` whenever `currentSlide.groupId` is set. Simpler than a monolithic wrapper and reuses already-tested per-type components.
- [x] **T-340** Unit + e2e coverage, including a context carry-forward (the cluster's second child inherits the first's `groupContext`).

## Validation

- [x] **T-900** `yarn type-check` — 0 errors.
- [x] **T-910** `yarn lint` — 0 errors.
- [x] **T-920** `yarn circular` — no circular dependencies.
- [x] **T-930** `yarn test:unit` — 363 tests, 0 failures.
- [x] **T-940** `yarn test:e2e` — 6 tests, 0 failures.
- [x] **T-950** Differential replay snapshot comparison (`yarn test:e2e:snapshot` → `yarn test:baseline` → `yarn test:diff`) — 0 deviations against the regenerated baseline.
