---
title: "ADR-022: E2E Selector Lockstep via data-cy Hooks During the Quasar Conversion"
status: "Accepted"
date: "2026-06-05"
relates_to: "PRD-001-quasar-conversion.md"
---

## Context

The Quasar conversion (PRD-001) replaces the legacy `#content` + jQuery rendering with Vue components, one exercise type at a time. Each phase ends at a `yarn test:all` gate that **must** pass before proceeding, and `test:all` includes the Cypress E2E suite (`test:e2e`).

The full-journey spec `cypress/e2e/example.cy.ts` asserts against the exact DOM the conversion removes — it selects `#btn0`, `#continueBtn`, `#ans0/1/2`, `#w4/5/6`, and `startOver`, with **zero `data-cy` hooks**. The moment a type is converted (e.g. Phase 1 `T-090`), those selectors stop matching and the spec — and therefore the gate — goes red. (`review.cy.ts` already uses `data-cy` and is unaffected.)

The original TSK did not budget any e2e maintenance, creating a contradiction: the thing being replaced is the thing the gate tests.

## Alternatives Considered

**Option A: Preserve legacy element IDs on the new components**
- Give each Vue component the same IDs the old DOM had (`btn0`, `continueBtn`, `ans0`, …) so existing specs pass untouched
- Pro: zero spec changes
- Con: pollutes clean Vue components with positional string IDs; fights the conversion's stated goal of removing imperative ID-driven DOM; brittle for `ma`/`gap`/`sort` where structure diverges

**Option B: Rewrite the entire e2e suite once, at the end**
- Convert all types first, fix e2e in a final task
- Pro: components stay clean during conversion
- Con: the suite is red across every intermediate phase, so the per-phase gate is meaningless until the very end — defeats the whole "independently deployable, tested per phase" design

**Option C: data-cy hooks + lockstep spec updates (chosen)**
- Each new component exposes stable `data-cy` attributes; the phase's wiring task updates `example.cy.ts` to target them in the same step
- Pro: gate stays green every phase; components carry only semantic, testing-intended hooks; selectors decouple from layout
- Con: each phase touches both the component and the spec (small, bounded extra work)

## Decision

Adopt Option C. Every exercise component created in PRD-001 exposes stable `data-cy` hooks (e.g. `option-N`, `continue`, `done`, `word-N`, shape/token identifiers, `end-screen`). The wiring task for each phase updates the corresponding `example.cy.ts` assertions from legacy ID selectors to the `data-cy` hooks **in lockstep**, so the per-phase `yarn test:all` gate stays green.

## Rationale

`data-cy` is the conventional Cypress contract for decoupling tests from presentational markup. It keeps the per-phase gate genuinely meaningful (Option B's fatal flaw) without contaminating the new components with legacy positional IDs (Option A's cost). The extra per-phase work is small and localized to the type being converted.

## Consequences

- Each phase's wiring task gains a bounded e2e-update sub-task (added to TSK-001 `T-090`–`T-170`)
- E2E selectors become resilient to future markup/skinning changes (supports the later skinning PRD)
- A consistent `data-cy` vocabulary is established for all future exercise types
- `review.cy.ts` needs no change; only `example.cy.ts` is touched
