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
