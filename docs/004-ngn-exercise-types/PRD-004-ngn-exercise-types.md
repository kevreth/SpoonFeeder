---
title: "PRD-004: NGN Exercise Types — Aggregate & Linked-Group Question Formats"
repo: "spoonfeeder/SpoonFeeder"
created: "2026-08-06"
status: "Complete"
priority: "High — blocks the NGN Item Formats unit (PRD-005) and practice-exam simulation (PRD-006)"
---

## Problem

Real NCLEX-RN uses Next Generation NCLEX (NGN) item types that go beyond SpoonFeeder's current nine exercise types (`mc`, `ma`, `bool`, `gap`, `sort`, `vocab`, `imap`, `info`, `select`). A test-prep course that never exposes learners to these formats leaves them unprepared for the actual exam interface, independent of how well they know the underlying content. This epic adds the missing item types to the framework itself, decoupled from any specific course's content.

## Scope

**In scope:**
- Six new format capabilities: extended (partial-credit) multiple response, extended drag-and-drop into categorized bins, cloze dropdown-in-text, cloze dropdown-in-table, matrix/grid (single- and multiple-response).
- A new linked-item-group mechanism (shared context wrapping several independently-scored existing-type sub-items), used to build bowtie and case-study/trend-cluster items.
- Unit and e2e test coverage for all of the above, using minimal fixture content (the "test" course) — not NCLEX-specific content.

**Out of scope:**
- Any NCLEX-specific or clinical content authoring (PRD-005, PRD-006).
- Exam timing, adaptive delivery, or scoring/reporting UI beyond what's needed to prove each type works (PRD-006).
- Any cross-slide reference/lookup mechanism — explicitly rejected, see ADR-026. Every new type's content stays standalone, authored inline.
- Graphic-options (image-based) multiple choice — already supported by the existing `mc` type; no work required.

## Current architecture (context for the implementer)

- Two-file-per-type pattern: `slideType<Name>.ts` (extends `Slide`, implements `setProperties`/`accept` only — `decorate`/`makeSlides` do not exist on the base class) + `factory<Name>.ts` (wires `Evaluate.X`/`Result.X`), registered in `slideFactory.ts` and `slidetype/index.ts`.
- Rendering is Vue-only: a `type → Component` lookup in `src/vue/components/exercise/exerciseComponents.ts`, consumed by both `IndexPage.vue` (quiz flow) and `ReviewSession.vue` (review flow). There is no `createHtml<Name>.ts` DOM-manipulation layer — that pattern is stale/removed.
- `Evaluate` and `Result` are function-typed static members (a strategy-as-function pattern), not classes — see `evaluateStrategy.ts` / `resultStrategy.ts`. `ResultReturnType` is currently `boolean | boolean[]`; partial credit requires widening this type and the two call sites that assume it: `Slide.evaluate()` (casts to `boolean & boolean[]`) and `evaluateAnswer.ts` (collapses arrays to `every(Boolean)` for the live pass/fail flag).
- Drag-and-drop uses `vue-draggable-plus` exclusively. `gap`'s Vue component already runs multiple linked `VueDraggable` zones sharing a named group, with a `put` predicate capping how many items a zone accepts — the direct precedent for bin-categorization drag-and-drop.
- `vocab`'s `set`/`getSlideSet()` mechanism is a **flatten-and-forget** expansion: one YAML entry produces N slides that are spliced directly into the flat slide list with no back-reference to a parent and no shared context object. This is *not* sufficient for shared/evolving context across linked items — the linked-item-group mechanism below is materially new, not a reuse of `vocab`'s pattern.
- No cross-referencing between slides is permitted anywhere in course content (ADR-026). Every new type's content is authored standalone and in full, inline, in its own YAML entry — consistent with how every existing type already works.

## Type inventory & design

### Aggregate types — single slide, one submission, multiple internal judgments

1. **Extended Multiple Response.** Renders through the *existing* `ma` / `ChoiceExercise.vue` component, unchanged. The only new work is a `Result.PARTIAL` strategy plus widening `ResultReturnType` / `Slide.evaluate()` / `evaluateAnswer.ts` to carry a fractional score without breaking the boolean contract every other type still relies on.
2. **Extended Drag-and-Drop (bins).** New type/component generalizing `gap`'s `put`-predicate drop-zone capacity from 1 (a blank) to N (a bin); a source pool plus 2+ labeled target bins.
3. **Cloze — dropdown in text.** New type/component. Evaluation is `Evaluate.GAP` / `Result.CORRELATED`-shaped (independent per-blank correctness, already precedented by `gap`); the new work is rendering inline dropdown controls within flowing AsciiDoc-rendered prose — no dropdown UI exists in the codebase today (`select` is a click-the-word mechanic, not a menu).
4. **Cloze — dropdown in table.** Same evaluation model as (3); the container is a table instead of prose.
5. **Matrix/grid — single response.** New type/component. Each row is an independent single-choice judgment (`CORRELATED`-shaped), rendered as a radio-button grid.
6. **Matrix/grid — multiple response.** New type/component. Each row is an independent multi-choice judgment (`ma`-shaped per row), rendered as a checkbox grid.

### Linked-group mechanism — shared context, multiple independently-scored items

7. **Linked item group (new core mechanism).** A composite slide concept distinct from `vocab`'s flatten-and-forget `set`: a shared context/header block rendered once, wrapping an ordered sequence of ordinary existing-type sub-items (`mc`, `ma`, etc.), each scored independently. Supports optional context updates between sub-items ("trending") and an optional per-sub-item tag (used for CJMM step labeling by case-study clusters; unused by bowtie).
8. **Bowtie.** A fixed-shape, 3-item linked group: one `mc` (condition, center node), two `ma` with `numans: 2` (actions branch, monitor branch), rendered with a bowtie diagram layout. Requires no new `SlideInterface` answer-group fields — it is a thin skin over the linked-group mechanism plus a diagram-specific Vue layout.
9. **Case-study / trend item cluster.** The general form of the linked-group mechanism: roughly 6 sub-items, each tagged with a Clinical Judgment Measurement Model step (Recognize Cues, Analyze Cues, Prioritize Hypotheses, Generate Solutions, Take Actions, Evaluate Outcomes), with shared scenario context that can update between items.

## Success Criteria

- All 6 aggregate/linked-group format capabilities render, capture input, and score correctly in the "test" course, exercised by a unit test per type (mirroring the existing `sort.test.ts` / `gap.test.ts` pattern) plus at least one Cypress e2e path per type.
- The extended-SATA `ResultReturnType` widening does not regress any existing type's live pass/fail flag or post-hoc `Evaluation` summary — the full existing unit and e2e suite passes unchanged.
- The linked-item-group mechanism supports, at minimum, a 3-item group (bowtie) and a 6-item group with per-item tags and at least one mid-sequence context update (case-study cluster), authored entirely in YAML with no course-loader reference/lookup logic.
- No `SlideInterface` field is added that duplicates or requires manual synchronization with another field (consistent with ADR-026).

## Testing

- Unit tests (Vitest) for each new `slideType<Name>.ts` / `factory<Name>.ts`, and for the widened `Result` / `Evaluate` strategies — regression coverage on existing types, not just new-type coverage.
- Component-level or e2e (Cypress) coverage for each new Vue exercise component's interaction: dragging into a bin, opening a dropdown, selecting a matrix cell, completing a linked group end-to-end.
- `yarn circular` re-run after wiring new types into `slidetype/index.ts` to confirm no new circular dependencies are introduced.
- Differential replay snapshot (`yarn test:e2e:snapshot`) before and after, per this repo's storage-safety convention, to confirm the widened `Result`/`Evaluate` types don't silently change storage output for existing course content.
