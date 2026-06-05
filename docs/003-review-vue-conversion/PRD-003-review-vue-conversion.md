---
title: "PRD-003: Review-Path Vue Conversion & Legacy-Renderer Removal"
repo: "spoonfeeder/SpoonFeeder"
created: "2026-06-05"
status: "Complete"
priority: "After PRD-001"
---

# PRD-003: Review-Path Vue Conversion & Legacy-Renderer Removal

## Problem

PRD-001 converts the **main quiz path** to Vue components driven by a Pinia
store, but the **review system** (ADR-018 — `ReviewSessionController` +
`ReviewSession.vue`) still renders through the legacy imperative path:
`slide.makeSlides(document)` → `makeSlidesStrategy<Type>` →
`createPageContent()` → jQuery `append`/`empty` into `#content`, with a
monkey-patched `slide.conclude` that calls `slide.decorate(doc)` and
`show/hideExplainIcon`. The legacy `sort` renderer also imports `gsap`, and
`mobile-drag-drop` is re-exported from `src/ts/main/index.ts`.

Because the review path keeps the legacy renderer alive, PRD-001 cannot delete
it or remove the npm `jquery`/`gsap`/`mobile-drag-drop` packages or the
`#content`/`#slide` divs. This epic finishes the job: convert review to the
PRD-001 Vue components, then remove the legacy renderer entirely. See ADR-023.

## Scope

### In scope
- Rework `ReviewSessionController`/`ReviewSession.vue` to render review slides
  through the PRD-001 Vue exercise components (`ChoiceExercise`, `InfoExercise`,
  `SelectExercise`, `GapExercise`, `SortExercise`, `ImapExercise`) + the slide
  store, with a review-specific answer/continue handler that preserves the
  current results-collection and summary behaviour
- Delete the legacy renderer: `makeSlidesStrategy*.ts`, `createHtml*.ts`,
  `createPageContent.ts`, and the now-unused `slide.makeSlides`/`decorate`
  abstract methods and per-type implementations
- Remove npm `jquery` + `@types/jquery` (swap the `saveData.ts` `extend` for
  spread; clean up re-exports — see PRD-001 T-180 for the exact mechanics)
- Remove `gsap` and `mobile-drag-drop` from `package.json`
- Remove the `#content`/`#slide` divs from `IndexPage.vue`

### Out of scope
- The global `lib/jquery.min.js` for course content (PRD-002)
- Any new review features beyond rendering parity

## Success Criteria
- [x] Review sessions render via the PRD-001 Vue components; `review.cy.ts` passes
- [x] `slide.makeSlides`/`decorate` and the `makeSlidesStrategy*`/`createHtml*`/
      `createPageContent` files are deleted; no source references them
- [x] npm `jquery` + `@types/jquery`, `gsap`, and `mobile-drag-drop` absent from
      `package.json`; no `import ... 'jquery'/'gsap'/'mobile-drag-drop'` in `src/`
- [x] `#content` not referenced in any source file
- [x] `yarn test:all` passes; differential replay snapshot unchanged (modulo `ts`)

## Testing
- E2E (`review.cy.ts`) must cover the full review flow (prompt → session →
  answer → summary) against the new component `data-cy` hooks
- Differential replay: review must not change observable storage state
