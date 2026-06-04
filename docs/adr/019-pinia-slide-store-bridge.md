---
title: "ADR-019: Pinia Store as the SlideDispatcher–Vue Bridge"
status: "Accepted"
date: "2026-06-05"
relates_to: "PRD-001-quasar-conversion.md"
---

## Context

`SlideDispatcher` is a framework-agnostic TypeScript class that drives quiz flow. Currently it calls `slide.makeSlides(doc)` to render slides by injecting HTML into the DOM. The Quasar conversion requires Vue components to own all rendering, but `SlideDispatcher` must continue to control which slide is shown and when.

The challenge: `SlideDispatcher` lives in the TS business logic layer (no Vue imports), but Vue components need to react when it changes the current slide.

## Alternatives Considered

**Option A: Pass reactive refs into SlideDispatcher**
- Pass `Ref<SlideInterface>` into the constructor; dispatcher mutates it directly
- Pro: simple, no store setup
- Con: imports Vue (`Ref`) into the TS layer, violating the framework-agnostic constraint

**Option B: Rewrite SlideDispatcher as a Vue composable**
- Convert the class to `useSlideDispatcher()` with reactive state
- Pro: idiomatic Vue
- Con: significant rewrite; mixes quiz control flow logic with Vue reactivity; harder to unit test in isolation

**Option C: Event bus / mitt**
- Dispatcher emits events; Vue listens
- Pro: fully decoupled
- Con: harder to trace, no typed contract, extra indirection

**Option D: Pinia store (chosen)**
- Dispatcher imports and writes to `useSlideStore()` from `src/vue/stores/slideStore.ts`
- Pro: typed contract, Vue DevTools visibility, easy to unit test, minimal change to dispatcher
- Con: the TS dispatcher gains one import that touches Vue's ecosystem (Pinia); this is an acceptable and narrow coupling

## Decision

Use a Pinia store (`useSlideStore`) as the bridge. `SlideDispatcher.begin()`, `next()`, and `decorate()` call `store.setSlide(slide, type)` instead of `slide.makeSlides(doc)`. `IndexPage.vue` watches `currentSlide` and `currentSlideType` from the store to render the active exercise component.

## Rationale

Option D is the narrowest coupling possible while preserving the dispatcher's role as the state machine. The store acts as a typed, observable contract between the TS layer and Vue. The dispatcher's business logic (slide ordering, save-state restoration, boundary detection) remains unchanged. Unit tests for the dispatcher can mock the store with a simple object.

## Consequences

- `SlideDispatcher` gains a single Pinia import — acceptable; the rest of the TS layer stays pure
- Vue DevTools shows the current slide state, aiding debugging
- Future: if the dispatcher is ever rewritten as a composable, the store interface provides the contract to migrate against
