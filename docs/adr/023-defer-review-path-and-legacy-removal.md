---
title: "ADR-023: Defer Review-Path Conversion and Legacy-Renderer Removal to Epic 003"
status: "Accepted"
date: "2026-06-05"
relates_to: "PRD-001-quasar-conversion.md"
---

## Context

PRD-001 plans to convert all exercise rendering to Vue and then delete the
legacy imperative renderer: the npm `jquery` package (`append`/`empty`
wrappers), `gsap`, `mobile-drag-drop`, the `makeSlidesStrategy*` /
`createHtml*` / `createPageContent` files, and the `#content` div.

After PRD-001 was written, the **review system** (ADR-018 —
`ReviewSessionController` + `ReviewSession.vue`) was built. It renders its
slides through the *same* legacy imperative path:

```
ReviewSession.vue onMounted → controller.start(document)
  → renderCurrent() → slide.makeSlides(document)
       → makeSlidesStrategy<Type> → createPageContent() → jQuery append/empty
                                  → (sort) gsap
       → injects into #content / #slide
  → monkey-patches slide.conclude → slide.decorate(doc) + show/hideExplainIcon
```

Converting only the main quiz path to Vue therefore does **not** free the
legacy renderer for deletion — the review feature (with its own passing
`review.cy.ts` e2e) still depends on every piece PRD-001 intended to remove:
`#content`/`#slide`, npm `jquery` (via `createPageContent`), `gsap` (legacy
`sort`), `mobile-drag-drop`, and the `makeSlidesStrategy*`/`createHtml*`/
`createPageContent` files.

## Alternatives Considered

**Option A: Defer review-path conversion + legacy removal to a new epic (chosen)**
- Epic 001 converts only the main quiz path; keep `#content`/`#slide` and the
  legacy renderer alive solely for review. Epic 003 later converts the review
  path to reuse the epic-001 Vue components, then removes the legacy renderer,
  npm `jquery`, `gsap`, `mobile-drag-drop`, and `#content`.
- Pro: low risk; does not touch the working review feature; epic 001 still
  delivers 100% Vue main-path rendering and all four quality fixes; mirrors the
  PRD-002 split.
- Con: the full removal goals slip to a follow-up epic; the legacy renderer and
  npm jQuery/GSAP linger until then.

**Option B: Expand epic 001 to also convert the review path now**
- Rework `ReviewSessionController`/`ReviewSession.vue` to drive the same Vue
  exercise components + store, then remove the legacy renderer fully.
- Pro: satisfies every original PRD-001 success criterion in one epic.
- Con: larger scope and higher risk; reworks a working, separately-specced
  feature (ADR-018) and its e2e mid-conversion.

## Decision

Adopt **Option A**. Epic 001 is re-scoped to the main quiz path. The legacy
renderer, npm `jquery`, `gsap`, `mobile-drag-drop`, and `#content`/`#slide` are
**retained** for the review path and their removal is deferred to **PRD-003
(Review-Path Vue Conversion & Legacy-Renderer Removal)**.

## Rationale

The review system is an independent, working feature with its own ADR and e2e.
Converting it is real net-new work that was never in PRD-001's component list.
Splitting it out keeps epic 001 focused and low-risk while still delivering the
user-visible quality fixes, and lets epic 003 reuse the very Vue exercise
components epic 001 builds — so the eventual review conversion is mostly wiring,
not new component work.

## Consequences

- Epic 001 TSK/PRD are amended: `#content` removal (T-070), npm `jquery`
  removal (T-180), legacy-file deletion (T-190), `gsap` removal (T-200),
  `mobile-drag-drop` removal (T-150 note), and the jQuery/`#content`/`gsap`
  "absent" success criteria are scoped to the main path or deferred to 003.
- `IndexPage.vue` keeps the `#content`/`#slide` divs (review renders into them);
  the main quiz path no longer renders into `#content`. The main Vue exercise
  switcher is hidden while a review session is active so the two renderers do
  not overlap.
- The legacy `makeSlides`/`makeSlidesStrategy*`/`createHtml*`/`createPageContent`
  path stays live and tested via `review.cy.ts` until epic 003.
- npm `jquery` + `@types/jquery`, `gsap`, and `mobile-drag-drop` remain in
  `package.json` after epic 001.
