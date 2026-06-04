---
title: "TSK-003: Review-Path Vue Conversion & Legacy-Renderer Removal"
prd: "PRD-003-review-vue-conversion.md"
created: "2026-06-05"
status: "TODO"
---

# TSK-003: Review-Path Vue Conversion & Legacy-Renderer Removal

Do not start until PRD-001 is complete and merged. Execute top-to-bottom.

---

## Review conversion

- [ ] **T-010** Drive review through the slide store: have `ReviewSession.vue`
  render the PRD-001 exercise component switcher (same `exerciseComponent` map
  as `IndexPage.vue`) instead of `controller.start(document)` + `makeSlides`.
- [ ] **T-020** Replace `ReviewSessionController`'s imperative
  render/conclude/continue with a review-specific answer/continue handler that
  reuses `evaluateAnswer` + `slide.evaluate()` and preserves results collection,
  scoring, and the summary screen.
- [ ] **T-030** Remove the `slide.conclude` monkey-patch and the
  `insertReviewContinueButton`/`renderCurrent` DOM code.
- [ ] **T-040** Update `review.cy.ts` to the new component `data-cy` hooks (lockstep).

## Legacy-renderer removal

- [ ] **T-050** Delete `makeSlidesStrategy*.ts` and `createHtml*.ts` (all types).
- [ ] **T-060** Delete `createPageContent.ts`; remove `slide.makeSlides`/`decorate`
  abstract methods and per-type implementations.
- [ ] **T-070** Remove the `#content`/`#slide` divs from `IndexPage.vue`.

## Dependency removal

- [ ] **T-080** Remove npm `jquery` + `@types/jquery`: swap `saveData.ts` `extend`
  for `[...(raw as SaveData[])]` (NOT `Object.assign`); remove the `extend`
  re-export (`dataaccess/index.ts`) and `append`/`empty` re-exports
  (`slidetype/index.ts`); delete `import $ from 'jquery'` + wrappers from
  `src/ts/main/index.ts`; remove both from `package.json`.
- [ ] **T-090** Remove `gsap` from `package.json` and all imports.
- [ ] **T-100** Remove `mobile-drag-drop` from `package.json` and the index.ts re-exports.

## Validation

- [ ] **T-110** ✓ `yarn test:all` — 0 failures
- [ ] **T-120** No source references to `jquery`/`gsap`/`mobile-drag-drop`/`#content`/
  `makeSlides`/`createPageContent`
- [ ] **T-130** Differential replay snapshot unchanged
