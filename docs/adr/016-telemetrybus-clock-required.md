# ADR 016 — TelemetryBus Clock Made Required (Phase 5 Acceleration)

**Status:** Accepted  
**Phase:** 5 — AI Repair Constraints (brought forward from Phase 6)  
**Date:** 2026-05-07

## Context

`TelemetryBus` was introduced in Phase 1 with an optional `clock?: Clock` constructor parameter and a `Date.now()` fallback:

```ts
timestamp: rawEvent.timestamp ?? this.clock?.now() ?? Date.now()
```

This was flagged in Phase 2 by `scan:sideeffects` as a known violation and deferred to Phase 6. Phase 5 adds `scan:sideeffects` to the `verify` script. A failing `verify` blocks the Phase 5 gate.

The fix is trivial because all four `TelemetryBus` instantiation sites already pass a clock explicitly:
- `storageInit.ts`: `new TelemetryBus(appClock)`
- `TelemetryBus.test.ts`, `InvariantRegistry.test.ts`, `WebStorageAdapter.test.ts`: pass `FakeClock`

## Decision

Remove the optional modifier from the `clock` parameter and drop the `Date.now()` fallback:

```ts
// Before
constructor(private clock?: Clock) {}
timestamp: rawEvent.timestamp ?? this.clock?.now() ?? Date.now()

// After
constructor(private clock: Clock) {}
timestamp: rawEvent.timestamp ?? this.clock.now()
```

Update the interface document (`ai.bugfix.interfaces.spoonfeeder.md`) to reflect `constructor(clock: Clock)`.

## Alternatives Considered

**Keep optional and add TelemetryBus to scanner exemptions.** Exempting infrastructure files would defeat the purpose of Phase 6 self-consistency checks. The exemption list would hide a real violation.

**Defer to Phase 6.** Possible, but requires excluding `scan:sideeffects` from `verify` until Phase 6 or accepting a permanently-failing `verify`. Neither is acceptable.

## Consequences

- `scan:sideeffects` now reports zero violations across the entire codebase.
- `yarn verify` passes without any exclusions.
- Any future code that creates `TelemetryBus` must supply a clock — the compiler enforces this.
- Phase 6's self-consistency audit for `infrastructure/telemetry` is trivially satisfied for this file.
