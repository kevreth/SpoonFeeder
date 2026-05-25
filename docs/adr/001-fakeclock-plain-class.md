---
title: "ADR 001 — FakeClock as a plain TypeScript class rather than @sinonjs/fake-timers"
---

# ADR 001 — FakeClock as a plain TypeScript class rather than @sinonjs/fake-timers

## Status
Accepted

## Context
The platform requires deterministic time and timer control in unit tests. Two approaches were evaluated:

**Option A: `@sinonjs/fake-timers`**
A well-known library that installs fake implementations of `Date`, `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`, and related globals by monkey-patching them onto `globalThis`. Used by Jest, Sinon, and many large projects.

**Option B: `FakeClock` — a plain TypeScript class implementing the `Clock` interface**
A minimal implementation (< 40 lines) with an internal counter and a `Map`-backed timer registry. Injected into business logic via the `Clock` interface rather than patching globals.

## Decision
Option B: plain `FakeClock` class.

## Rationale

**Injection, not patching.** The platform requires that `Clock` be injected into every site that needs time (`timestampNow`, `spoonyApi`, adapters, invariant registry). If the injection discipline is maintained, no global patching is needed — the fake clock reaches exactly the code under test and nothing else. `@sinonjs/fake-timers` patches `globalThis`, which means it affects every timer in the jsdom environment including Vue internals, Vitest's own scheduler, and third-party library timers. This increases test fragility and requires careful `install`/`uninstall` lifecycle management.

**Vitest compatibility.** Vitest has its own fake-timer implementation (`vi.useFakeTimers()`), which internally uses `@sinonjs/fake-timers`. Running two fake-timer implementations simultaneously produces subtle conflicts. Adding `@sinonjs/fake-timers` as a direct dependency introduces version coupling with Vitest's internal dependency.

**Simplicity.** SpoonFeeder's timer usage is narrow: one `AbortController` timeout in `spoonyApi.ts` and one `Date.now()` call in `date.ts`. A 40-line `FakeClock` covers both cases with no external dependency.

**Debuggability.** When a `FakeClock` test fails, the failure trace points to the clock's own source. When `@sinonjs/fake-timers` fails, the trace often points into library internals that are hard to interpret.

## Consequences
- One fewer runtime dependency.
- Business logic cannot use `Date.now()`, `setTimeout`, etc. directly — it must accept an injected `Clock`. This is enforced by `scripts/side-effect-scanner.ts`. Violation is a Phase 6 gate failure.
- `FakeClock.tick()` only fires timers registered through the injected `Clock`. If a third-party library inside a unit test sets a real `setTimeout`, it is not affected by `tick()`. This is by design — third-party timers are side effects outside the test boundary.
- If global timer patching is ever needed (e.g., for testing a third-party integration), `vi.useFakeTimers()` from Vitest is the correct tool, not `@sinonjs/fake-timers` directly.

## Alternatives rejected
- **Vitest's `vi.useFakeTimers()`**: appropriate for tests that cannot use injection (e.g., testing legacy code before Phase 4 migration). Not used as the primary mechanism because it does not enforce the injection discipline the platform is trying to build.
- **`@sinonjs/fake-timers` directly**: see Rationale above.
