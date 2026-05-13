# ADR 012 — Clock added only to MakeSlidesTypeGap, not the base MakeSlidesType

## Status
Accepted

## Context
`MakeSlidesType` is an intersection type that unifies all slide strategy signatures:

```ts
export type MakeSlidesType = MakeSlidesTypeGap
  & MakeSlidesTypeImap & MakeSlidesTypeInfo & MakeSlidesTypeMa
  & MakeSlidesTypeMc  & MakeSlidesTypeSelect & MakeSlidesTypeSort
  & MakeSlidesTypeVocab;
```

Each concrete `Slide` subclass holds its strategy as `this.makeSlidesStrategy: MakeSlidesType` and calls it from `makeSlides(doc: Document): void`. The gap slide is the only type that uses `setTimeout` — the other six types have no timer logic.

Two options were considered for threading `Clock` into the gap strategy:

**Option A — Extend only `MakeSlidesTypeGap`** with a `clock` parameter; cast at the call site in `Gap.makeSlides()`:

```ts
// in slideTypeGap.ts
(this.makeSlidesStrategy as MakeSlidesTypeGap)(
  txt, ans, createHtml, maxWidthStrategy, doc, this, appClock
);
```

**Option B — Extend the base `MakeSlidesType`** with an optional `clock?: Clock` parameter, so every strategy receives (and ignores) a clock.

## Decision
Use **Option A**: extend only `MakeSlidesTypeGap` and cast at the call site.

## Rationale

**Option B would silently propagate clock to 6 strategies that have no use for it.**  The six non-gap strategies (`info`, `mc`, `ma`, `select`, `sort`, `vocab`) would either accept and ignore a clock parameter (dead code) or need test updates that verify a clock is passed even though they never call it.

**Option A keeps non-gap strategies unchanged.**  Their type signatures, implementations, and tests are completely unaffected.

**The cast is safe and narrow.** `Gap.makeSlides()` is the only code path that calls the strategy with 7 arguments. The `MakeSlidesTypeGap` type is the authoritative spec for that 7-argument form. The intersection type `MakeSlidesType` already means "a function callable as any of these forms"; casting to the gap-specific form within gap's own method is consistent with that semantics.

**The cast is visible in the source.** `as MakeSlidesTypeGap` is an explicit annotation, not a suppressed type error. A future reader can trace why the 7th argument appears only in `Gap.makeSlides()`.

## Consequences
- Only `makeSlides` in `slideTypeGap.ts` passes `clock`; all other `makeSlides` implementations are unmodified.
- `makeSlidesStrategyGap.test.ts` can call `makeSlidesStrategyGap(...)` directly with a `FakeClock` without touching any other strategy type.
- If a future slide type needs clock injection, the same pattern applies: extend its specific `MakeSlidesType<Name>` and cast at its own call site.
