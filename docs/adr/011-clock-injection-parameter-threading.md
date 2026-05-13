# ADR 011 — Clock injection via explicit parameter threading

## Status
Accepted

## Context
Phase 4 migrates three call sites that use global time primitives:

| Site | Global call | Replaced with |
|------|-------------|---------------|
| `date.ts: timestampNow()` | `Date.now()` | `clock.now()` |
| `makeSlidesStrategyGap.ts` (×2) | `setTimeout(fn, 0)` | `clock.setTimeout(fn, 0)` |
| `spoonyApi.ts: sendMessage()` | `setTimeout` / `clearTimeout` | `clock.setTimeout` / `clock.clearTimeout` |

The `Clock` interface (`infrastructure/clocks/Clock.ts`) was defined in Phase 1 and already had a `FakeClock` implementation. The question was _how_ to wire the clock to each call site.

Four patterns were considered:

1. **Module-level singleton import** — each file imports `appClock` from `storageInit.ts` and calls `appClock.now()` directly.
2. **Explicit parameter threading** — each function that needs a clock accepts `clock: Clock` as a parameter; production callers pass `appClock`, tests pass `FakeClock`.
3. **Currying / partial application** — export factory functions that close over a clock (`makeSendMessage(clock)(...)`).
4. **Dependency injection container** — register `Clock` in a DI container; each class resolves it at construction time.

## Decision
Use **explicit parameter threading** for all three sites.

- `timestampNow(clock: Clock): string`
- `makeSlidesStrategyGap(..., clock: Clock): void`
- `sendMessage(params: SendMessageParams, clock: Clock): Promise<SpoonyApiResult>`

Production call sites pass `appClock`. Tests pass an injected `FakeClock`.

## Rationale

**Against module-level singleton import**: this is what Phase 4 is replacing. The call sites would still be coupled to a single global clock, making tests that depend on time non-deterministic. The scanner would still flag `Date.now()` as a violation.

**Against currying**: introduces a new factory-function layer that all callers must adapt to. The gap strategy is stored as a strategy object on `Slide`; replacing `makeSlidesStrategyGap` with a factory result would require rethinking the factory registry.

**Against DI container**: no DI framework exists in this codebase, and introducing one for three call sites would be disproportionate. The codebase is deliberately framework-agnostic.

**For explicit parameter threading**:
- Zero new abstractions — the existing `Clock` interface is used directly.
- Tests can pass `FakeClock` without any module-level setup or mocking.
- The parameter appears in the function signature, making the dependency visible at the type level.
- `FakeClock.tick(ms)` enables deterministic, synchronous testing of timeout behaviour without real async delays.
- Consistent with how `Clock` is already used in `TelemetryBus` (constructor injection).

The added parameter is at the _end_ of each function's parameter list so that existing call sites with named arguments are minimally disrupted.

## Consequences
- `sendMessage` tests can verify the 15 s abort fires by calling `clock.tick(15_001)` — no real timer or `vi.useFakeTimers()` needed.
- `makeSlidesStrategyGap` tests can verify `concludeOnce` fires after a drop by calling `clock.tick(1)`.
- `timestampNow` produces deterministic output in tests (`TEST_NOW` from `deterministic-setup.ts`).
- The `side-effect-scanner.ts` regex was tightened to exclude `.setTimeout` (injected calls) while still flagging bare `setTimeout` (global calls). Negative lookbehind `(?<!\.)` distinguishes the two forms.
- `yarn scan:sideeffects` reports zero violations in all three migrated subsystems. The one remaining violation is `TelemetryBus.ts:18` (`Date.now()` as a fallback), which is intentional and deferred to Phase 6.
