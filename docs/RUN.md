# Run Log

Append-only session log. One entry per non-trivial commit set.

---

## 2026-06-05 | SpoonFeeder feat/001-quasar-conversion | 001-quasar-conversion

**What changed:** Implemented epic 001 (Quasar conversion of the exercise
rendering layer), re-scoped to the **main quiz path** after discovering the
review system (ADR-018) still depends on the legacy renderer (ADR-023; new
PRD-003 created for review conversion + legacy/dep removal).

- Foundation: `tokens.css`, `ContinueButton`, `FeedbackStatement`,
  `processOptions` (+tests), Pinia `slideStore` (+tests).
- Core: `SlideDispatcher` decoupled from the DOM → drives `useSlideStore`
  (ADR-019); `IndexPage` renders via a `<component>` switcher with a legacy
  fallback for not-yet-converted types; Vue end screen + start-over.
- Components (all 9 types via Vue): `ChoiceExercise` (mc/ma/bool), `InfoExercise`
  (info + title/nav slides), `SelectExercise`, vocab (verified via mc children),
  `GapExercise` + `SortExercise` (vue-draggable-plus; gap is click-to-place +
  drag), `ImapExercise` (SVGInjector).
- `cypress/e2e` updated in lockstep (data-cy hooks) across `functions.ts`
  (example journey) and `review.cy.ts`; legacy selectors kept for the retained
  review-session renderer.
- Pinia was never installed (quasar.config `sourceFiles.store` pointed at a
  nonexistent path) — fixed.
- Differential replay (T-230): verified storage state is byte-identical to
  pre-implementation `main` (modulo ts); refreshed the stale baseline.

**Gates:** every phase + final `yarn test:all` green — type-check, lint,
306 unit, 6 e2e.

**Deferred (PRD-003):** convert the review path to the new Vue components, then
remove npm `jquery`/`@types/jquery`, `gsap`, `mobile-drag-drop`, the
`makeSlidesStrategy*`/`createHtml*`/`createPageContent` files, and `#content`.

**Not pushed:** commits are local only (no git credentials in the container).

**Next session:** push from host; run host pipeline (`make pipeline`) +
resolve `dashboard/audit.json`; then epic 003.

---

## 2026-06-05 | SpoonFeeder feat/003-review-vue-conversion | 003-review-vue-conversion

**What changed:** Implemented epic 003 — converted the **review path** to the
PRD-001 Vue components and removed the legacy imperative renderer entirely.

- Review: `ReviewSession.vue` now renders review slides through the shared
  `EXERCISE_COMPONENTS` switcher (extracted to
  `src/vue/components/exercise/exerciseComponents.ts`, also used by
  `IndexPage`), holding a local index + result tally; deleted
  `ReviewSessionController` (the `slide.conclude` monkey-patch + `makeSlides`
  DOM render). Review collects `{slideTxt, correct, total}` via `slide.evaluate()`
  on Continue and never calls `slide.saveData()`. `review.cy.ts` updated to the
  component `data-cy` hooks.
- Legacy renderer removed: deleted all `makeSlidesStrategy*.ts`, `createHtml*.ts`,
  `createPageContent.ts`, `conclude/conclude.ts`, and the dead `buttons.ts`/
  `explainIcon.ts`. Dropped `makeSlides`/`decorate`/`mark`/`conclude` from the
  `Slide` base, `SlideType`, `SlideInterface`, all 9 slide types and factories
  (constructor now `(type, evaluateStrategy, resultType)`). Removed the
  `#slide`/`#content` divs from `IndexPage` (now `.sf-slide-surface`).
- Deps removed: npm `jquery` + `@types/jquery` (swapped `saveData.ts` `$.extend`
  for spread), `gsap`, `mobile-drag-drop`.
- Differential replay: post-patch storage snapshot is byte-identical to the
  baseline except the wall-clock `ts` field; refreshed the baseline.

**Gates:** `yarn test:all` green — type-check, lint, 284 unit, 6 e2e (1 journey
+ 5 review). No source refs to `jquery`/`gsap`/`mobile-drag-drop`/`#content`/
`makeSlides`/`createPageContent`.

**Not pushed:** commits are local only (no git credentials in the container).

**Next session:** push from host; run host pipeline (`make pipeline`) +
resolve `dashboard/audit.json`.

---

## 2026-08-09 | SpoonFeeder feat/004-ngn-exercise-types | 004-ngn-exercise-types

**What changed:** Implemented epic 004 — the 8 new Next Generation NCLEX
exercise types plus the underlying framework changes they needed.

- Core widening: `ResultReturnType`/`EvaluateType` widened to carry a
  fractional (0..1) score alongside the existing `boolean`/`boolean[]`
  shapes; added `Result.PARTIAL`/`Evaluate.PARTIAL`. Characterization tests
  written first to lock existing SIMPLE/CORRELATED/GAP/SELECT behavior
  before touching the shared call sites (`Slide.evaluate()`,
  `evaluateAnswer.ts`).
- New aggregate types (single slide, existing GAP/CORRELATED evaluation
  pattern reused throughout): `ema` (extended multiple response — reuses
  `ChoiceExercise.vue` unchanged, only `Result.PARTIAL` is new), `bins`
  (extended drag-and-drop, generalizes `gap`'s multi-zone `VueDraggable`
  pattern to N-capacity bins), `cloze-text`/`cloze-table` (dropdown-based
  cloze, new inline/table dropdown UI), `matrix-single`/`matrix-multi`
  (radio/checkbox grids), `bowtie` (built as a self-contained aggregate
  type rather than a linked group — real NCLEX bowtie items are one screen,
  not sequential; see DEC-004.jsonl).
- Case-study/trend cluster: implemented as a `type: cluster` special case
  in `jsonProcessor.ts` (`_expandCluster`) rather than a registered
  `SlideType`, avoiding a circular import back through `slideFactory.ts`.
  Each child is run through the normal `initSlide()` machinery and stamped
  with shared `groupId`/`groupContext`/`groupTag`/`groupIndex`/`groupTotal`
  metadata; renders via each child's own existing exercise component with a
  new shared `GroupContextBanner.vue` on top (no monolithic cluster
  component). This special-casing had a blind spot: `reviewExtractor.ts`
  and `scoreProcessor.ts` called `initSlide()` directly on cluster items
  and undercounted them — fixed with matching special cases + regression
  tests, caught by the full Cypress e2e run against `review.cy.ts`.
- Found and fixed a real bug via the e2e run (not caught by unit tests):
  five new Vue components initialized state inside `onMounted()`, but the
  template's first render happens before `onMounted` fires — crashed
  outright for `MatrixMultiExercise` (`.has()` on `undefined`). Fixed by
  initializing synchronously in `<script setup>` across all five.
- Test course (`src/courses/test/course.yml`) extended with one slide per
  new type plus a 2-item cluster; `cypress/e2e/functions.ts`'s
  `runFullJourney()` and `review.cy.ts`'s `navigateToLesson1Boundary()`
  extended via a shared `answerNgnTypes()` helper; hardcoded slide-count
  assertions updated (23→32 exercises); snapshot baseline regenerated.

**Gates:** `yarn type-check`, `yarn lint`, `yarn circular` clean; `yarn
test:unit` 363 tests / 0 failures (up from 310); `yarn test:e2e` 6/6
passing; differential replay (`test:e2e:snapshot` → `test:baseline` →
`test:diff`) 0 deviations.

**Deferred:** PRD-005 (NCLEX-RN course content) and PRD-006 (practice exam
simulation) — both were blocked on this epic's types.

**Not pushed yet this session.**

---
