---
title: "TSK-004: NGN Exercise Types — Aggregate & Linked-Group Question Formats"
prd: "PRD-004-ngn-exercise-types.md"
created: "2026-08-06"
status: "TODO"
---

## Setup

- [ ] **T-010** Confirm current `ResultReturnType` / `EvaluateType` call sites (`Slide.evaluate()`, `evaluateAnswer.ts`) and write characterization tests locking today's boolean behavior before touching them.

## Core: Result/Evaluate widening (extended SATA groundwork)

- [ ] **T-020** Widen `ResultReturnType` to carry a fractional/partial score without breaking existing `boolean | boolean[]` consumers.
- [ ] **T-030** Add a `Result.PARTIAL` strategy (proportion of correct selections made, penalized for incorrect selections — exact scoring formula TBD against real NCLEX partial-credit rules).
- [ ] **T-040** Update `Slide.evaluate()`'s cast and `evaluateAnswer.ts`'s live pass/fail collapse to handle the new return shape.
- [ ] **T-050** Regression-test all 9 existing types against the widened types.

## Extended Multiple Response

- [ ] **T-060** `ExtendedMa` slideType/factory, reusing `ChoiceExercise.vue`, wired to `Result.PARTIAL`.
- [ ] **T-070** YAML authoring support for a fixed "select N" target, reconciled with `ma`'s existing `numans` semantics if they diverge.
- [ ] **T-080** Unit + e2e coverage.

## Extended Drag-and-Drop (bins)

- [ ] **T-090** `slideTypeBins.ts` / `factoryBins.ts`.
- [ ] **T-100** `BinsExercise.vue`, generalizing `gap`'s multi-zone `VueDraggable` + `put` predicate to N-capacity bins.
- [ ] **T-110** Unit + e2e coverage.

## Cloze — dropdown in text

- [ ] **T-120** `slideTypeClozeText.ts` / `factoryClozeText.ts`, `Evaluate.GAP` / `Result.CORRELATED`.
- [ ] **T-130** `ClozeTextExercise.vue` — inline dropdown rendering within AsciiDoc-processed prose.
- [ ] **T-140** Unit + e2e coverage.

## Cloze — dropdown in table

- [ ] **T-150** `slideTypeClozeTable.ts` / `factoryClozeTable.ts`.
- [ ] **T-160** `ClozeTableExercise.vue`.
- [ ] **T-170** Unit + e2e coverage.

## Matrix/grid — single response

- [ ] **T-180** `slideTypeMatrixSingle.ts` / `factoryMatrixSingle.ts`.
- [ ] **T-190** `MatrixSingleExercise.vue` — radio-button grid.
- [ ] **T-200** Unit + e2e coverage.

## Matrix/grid — multiple response

- [ ] **T-210** `slideTypeMatrixMulti.ts` / `factoryMatrixMulti.ts`.
- [ ] **T-220** `MatrixMultiExercise.vue` — checkbox grid.
- [ ] **T-230** Unit + e2e coverage.

## Linked item group (core mechanism)

- [ ] **T-240** Design the linked-group container: shared context/header block plus an ordered list of sub-items, each an existing slide type, each scored independently.
- [ ] **T-250** Course-loader support for expanding a linked-group YAML entry into its sub-items while preserving group membership and order — distinct from `vocab`'s flatten-and-forget; group identity and shared context must survive into the quiz driver.
- [ ] **T-260** Support mid-sequence context updates ("trending").
- [ ] **T-270** Support an optional per-sub-item tag field (used by case-study clusters for CJMM step labeling; unused by bowtie).
- [ ] **T-280** Unit + e2e coverage for a minimal (2-item) and larger (6-item) group.

## Bowtie

- [ ] **T-290** Author the bowtie shape as a fixed 3-item linked group (`mc` + `ma[numans=2]` + `ma[numans=2]`).
- [ ] **T-300** `BowtieLayout.vue` — diagram presentation wrapping the linked-group mechanism.
- [ ] **T-310** Unit + e2e coverage.

## Case-study / trend item cluster

- [ ] **T-320** Author the cluster shape as a linked group with CJMM step tags.
- [ ] **T-330** `ClusterExercise.vue` — scenario panel + step-rail presentation.
- [ ] **T-340** Unit + e2e coverage, including a context update mid-cluster.

## Validation

- [ ] **T-900** `yarn type-check` — 0 errors.
- [ ] **T-910** `yarn lint` — 0 errors.
- [ ] **T-920** `yarn circular` — no new circular dependencies.
- [ ] **T-930** `yarn test:unit` — 0 failures, including new-type and widened-strategy regression tests.
- [ ] **T-940** `yarn test:e2e` — 0 failures.
- [ ] **T-950** Differential replay snapshot comparison (`yarn test:e2e:snapshot`) against baseline — no unexpected storage-shape deviation for existing course content.
