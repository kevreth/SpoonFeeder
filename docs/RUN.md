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
