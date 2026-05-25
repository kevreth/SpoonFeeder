---
title: "ADR 002 — Two WebStorageAdapter instances (localStorage + sessionStorage) rather than a single unified adapter"
---

# ADR 002 — Two WebStorageAdapter instances (localStorage + sessionStorage) rather than a single unified adapter

## Status
Accepted

## Context
SpoonFeeder uses both `localStorage` (for persistent data: course name, save data, Spoony settings) and `sessionStorage` (for ephemeral flags: `random`, `transition`, `mute`, and the course listing).

Two design options were evaluated for the `WebStorageAdapter`:

**Option A: Single adapter, `target: Storage` as a constructor parameter**
The `WebStorageAdapter` accepts either `localStorage` or `sessionStorage` as its `target`. The factory creates two instances: one for each backing store. Callers choose which instance to use based on whether the data is persistent or ephemeral.

**Option B: Single adapter that internally manages both stores**
One `StorageAdapter` instance handles all keys, routing each key to the correct backing store based on a registered metadata field (e.g., `{ key: 'random', storage: 'session' }`).

## Decision
Option A: two `WebStorageAdapter` instances, one per `Storage` target.

## Rationale

**Single responsibility.** Each adapter instance wraps exactly one `Storage` object. This matches the browser's own model: `localStorage` and `sessionStorage` are distinct objects with distinct lifetime semantics, not two namespaces within one store. An adapter that manages both is responsible for routing logic that doesn't belong to it.

**Testability.** The `Map`-backed test adapter (`createTestStorageAdapter`) maps cleanly to one real storage target. If the production adapter managed both stores, the test fixture would need to replicate both, adding complexity and making tests harder to read.

**Clear ownership.** The factory functions `createLocalStorageAdapter` and `createSessionStorageAdapter` make the distinction explicit at the construction site. Callers know exactly which store they are reading from and writing to. With Option B, callers pass a key and trust the adapter to route it correctly, which hides the storage tier from the call site.

**Invariant simplicity.** The quota invariant (`storage.quota`) applies only to `localStorage`. If one adapter manages both, the invariant check must introspect whether the key belongs to the persistent or ephemeral store. With two adapters, the localStorage adapter registers the quota invariant; the sessionStorage adapter does not.

**Android compatibility.** On Android, `@capacitor/preferences` is a single persistent store — there is no session-scoped equivalent. The `AndroidStorageAdapter` maps naturally to `createLocalStorageAdapter`. Session-scoped keys (`random`, `transition`, `mute`, `courses`) on Android either use the same Capacitor store with a `session_` prefix or are held in-memory only. This decision is deferred; having two factory functions makes the Android-specific override localised to `factory.ts`.

## Consequences
- Two `StorageAdapter` instances must be passed wherever both localStorage and sessionStorage keys are used. In practice, `webStorage.ts` is the only module that owns both, so the two instances are injected once at the module boundary.
- The `platform` discriminant on `StorageAdapter` is `'web'` for both instances. This is correct — both targets are Web platform APIs. If distinction is needed, a subtype discriminant (e.g., `storageTarget: 'local' | 'session'`) can be added to `WebStorageAdapter` without changing the interface.
- `clearSessionStorage()` (currently a direct `sessionStorage.clear()`) maps to `sessionStorageAdapter.clear()`. No change in semantics.

## Alternatives rejected
- **Option B (unified routing adapter)**: hides storage tier at call sites, complicates invariants, and breaks the single-responsibility principle. Rejected.
- **A single adapter with `storageTarget` on each `SchemaEntry`**: moves routing into `SchemaRegistry`. The registry's job is schema validation, not storage routing. Mixing concerns makes both harder to reason about. Rejected.
