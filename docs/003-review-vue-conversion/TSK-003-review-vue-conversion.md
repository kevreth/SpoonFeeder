---
title: "TSK-003: Review-Path Vue Conversion & Legacy-Renderer Removal"
prd: "PRD-003-review-vue-conversion.md"
created: "2026-06-05"
status: "Done"
---

# TSK-003: Review-Path Vue Conversion & Legacy-Renderer Removal

Do not start until PRD-001 is complete and merged. Execute top-to-bottom.

---

## Review conversion

- [x] **T-010** Drive review through the slide store: have `ReviewSession.vue`
  render the PRD-001 exercise component switcher (same `exerciseComponent` map
  as `IndexPage.vue`) instead of `controller.start(document)` + `makeSlides`.
- [x] **T-020** Replace `ReviewSessionController`'s imperative
  render/conclude/continue with a review-specific answer/continue handler that
  reuses `evaluateAnswer` + `slide.evaluate()` and preserves results collection,
  scoring, and the summary screen.
- [x] **T-030** Remove the `slide.conclude` monkey-patch and the
  `insertReviewContinueButton`/`renderCurrent` DOM code.
- [x] **T-040** Update `review.cy.ts` to the new component `data-cy` hooks (lockstep).

## Legacy-renderer removal

- [x] **T-050** Delete `makeSlidesStrategy*.ts` and `createHtml*.ts` (all types).
- [x] **T-060** Delete `createPageContent.ts`; remove `slide.makeSlides`/`decorate`
  abstract methods and per-type implementations.
- [x] **T-070** Remove the `#content`/`#slide` divs from `IndexPage.vue`.

## Dependency removal

- [x] **T-080** Remove npm `jquery` + `@types/jquery`: swap `saveData.ts` `extend`
  for `[...(raw as SaveData[])]` (NOT `Object.assign`); remove the `extend`
  re-export (`dataaccess/index.ts`) and `append`/`empty` re-exports
  (`slidetype/index.ts`); delete `import $ from 'jquery'` + wrappers from
  `src/ts/main/index.ts`; remove both from `package.json`.
- [x] **T-090** Remove `gsap` from `package.json` and all imports.
- [x] **T-100** Remove `mobile-drag-drop` from `package.json` and the index.ts re-exports.

## Validation

- [x] **T-110** ✓ `yarn test:all` — 0 failures (type-check + lint + 284 unit + 6 e2e)
- [x] **T-120** No source references to `jquery`/`gsap`/`mobile-drag-drop`/`#content`/
  `makeSlides`/`createPageContent`
- [x] **T-130** Differential replay snapshot unchanged (only the wall-clock `ts`
  field differs; all keys/values/structure byte-identical)
