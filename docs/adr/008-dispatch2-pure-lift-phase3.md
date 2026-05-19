---
title: "ADR 008 — dispatch2 pure-function lift pulled from Phase 4 into Phase 3"
---

# ADR 008 — dispatch2 pure-function lift pulled from Phase 4 into Phase 3

## Status
Accepted

## Context
The Phase 4 task list included as its first Priority 2 item:

> Refactor `dispatch2` to accept `slides`, `saves`, `clock`, `telemetry` as parameters (remove internal `Json.get()` and `SaveData.get()` calls)

The rationale was that this made `dispatch2` a pure function and broke its implicit dependency on static singletons. It was placed in Phase 4 because it was framed as part of the "state machine migration" — an incremental refactor of quiz subsystem behaviour.

During Phase 3, `SaveData.get()` became async. The original `dispatch2` called `SaveData.get()` internally:

```ts
export function dispatch2<T>(actions: StateActions<T>, advance: boolean): T {
  const slides = Json.get();
  const saves = SaveData.get();  // now returns Promise<SaveData[]>
  ...
}
```

If `dispatch2` retained this internal call, it would be forced to become `async`, returning `Promise<T>`. This would cascade to:
- `showSlides()` — needed to await `dispatch2` (already async, but the return type mismatch creates a type error)
- `StateActions<T>` — the `begin()`, `decorate()`, `next()`, `end()` methods return `T`, not `Promise<T>`, causing a mismatch
- All 9 `SlideType` implementations of `StateActions`
- `_getCurrentSlide()`, `getCurrentSlideExplanation()`

The only way to avoid this cascade without the pure-function lift was to keep `SaveData.get()` synchronous inside `dispatch2` while making it async everywhere else — which would require maintaining two code paths.

## Decision
Perform the `dispatch2` pure-function lift in Phase 3, concurrent with the storage migration, rather than deferring it to Phase 4.

The new `dispatch2` signature:
```ts
export function dispatch2<T>(
  actions: StateActions<T>,
  slides: SlideInterface[],
  saves: SaveData[],
  advance: boolean
): T
```

Callers (`showSlides`, `_getCurrentSlide`) load slides and saves before calling `dispatch2`, then pass them as arguments. `dispatch2` remains synchronous. `StateActions<T>` is unchanged.

Additionally, `getQuizState(slides, saves, advance): QuizState` is exported as a standalone pure function for use in invariant checks and property tests.

## Rationale
**The lift was necessary to avoid the async cascade.** Making `dispatch2` async would have forced changes to `StateActions<T>` (a public interface), all nine slide type implementations, and every caller — a larger surface than pulling the Phase 4 task forward.

**The lift had zero behavioral change.** The data that `dispatch2` previously fetched internally (`Json.get()` and `SaveData.get()`) was already available at every call site. The refactor only moved where the reads happen, not what is read.

**Phase 4 retains its original scope.** The remaining Phase 4 Priority 2 work — adding `QuizState` telemetry emission, writing property tests for `getQuizState`, running StrykerJS — is unchanged. The pure-function lift was always just the first step.

## Consequences
- `dispatch2` is now a pure function with no side effects. It can be unit tested without any mock setup.
- `getQuizState` is independently testable and used by `quizChecks.ts` invariant.
- The `SaveDataDispatcher.end()` bug (SF-004) was fixed simultaneously: `end()` now returns `getSlide(0)` instead of throwing, because the `END` state is reachable and the dispatcher must handle it.
- Phase 4's Priority 2 task list is now: add telemetry emission to `dispatch2`, write property tests for `getQuizState`, run StrykerJS.
