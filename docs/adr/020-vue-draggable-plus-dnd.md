---
title: "ADR-019: vue-draggable-plus (SortableJS) for Gap and Sort DnD, Replacing GSAP"
status: "Accepted"
date: "2026-06-05"
relates_to: "PRD-001-quasar-conversion.md"
---

## Context

Two exercise types use drag-and-drop:

- **`gap`**: tokens drag from a pool into blank slots (cross-list DnD). Current implementation uses HTML5 native drag-drop for desktop plus ~100 lines of custom `touchstart`/`touchmove`/`touchend` with ghost element cloning for mobile. The `mobile-drag-drop` polyfill (`3.0.0-rc.0`) provides partial HTML5 DnD support on iOS.

- **`sort`**: reorderable list. Current implementation uses GSAP 3.15.0 with the `Draggable` plugin for both DnD interaction and position animations (`gsap.to(el, { y: targetY })`), plus GSAP for the mount fade-in and drag shadow effects.

The conversion requires Vue component replacements. The question is which DnD library to use.

## Alternatives Considered

**Option A: Keep GSAP for sort, keep native DnD + custom touch for gap**
- Pro: zero new dependencies
- Con: GSAP is a significant bundle addition for one slide type; custom touch code is ~100 lines of fragile imperative logic; doesn't compose with Vue reactivity

**Option B: Native HTML5 DnD + Vue event handlers for both**
- Pro: no library dependency
- Con: mobile support remains poor without a polyfill; cross-list DnD (gap) requires significant custom code

**Option C: @dnd-kit/vue**
- Pro: React-ecosystem battle-tested
- Con: Vue port is less mature; less community support

**Option D: vue-draggable-plus (chosen)**
- Wraps SortableJS, the most widely-used DnD library in the Vue ecosystem
- Handles both reorder (sort) and cross-list (gap) via the `group` option
- Handles mobile touch natively — no polyfill needed
- SortableJS `animation` option provides position tweening (replaces `gsap.to(el, { y })`)
- GSAP visual effects (shadow, scale, fade) replaced by CSS transitions/classes

## Decision

Use `vue-draggable-plus` for both `gap` and `sort`. Remove `gsap`, `mobile-drag-drop`, and the custom touch handling code.

## Rationale

SortableJS handles the two hard problems (mobile touch, cross-list DnD) that drove the complexity of the current implementations. Its built-in `animation` option replaces the GSAP position tween. The remaining GSAP effects (mount fade, drag shadow, scale) are pure CSS and trivial to replace. Removing GSAP reduces the bundle by ~100 KB (minified).

## Consequences

- `gsap` and `mobile-drag-drop` removed from `package.json`
- `vue-draggable-plus` added
- Custom touch handling code (~100 lines in `makeSlidesStrategyGap.ts`) deleted
- Sort animations are slightly less customisable than GSAP (acceptable; the current animations are simple)
- Future DnD exercise types have a consistent, well-supported library to build on
