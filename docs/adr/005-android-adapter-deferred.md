---
title: "ADR 005 — AndroidStorageAdapter deferred; dependency-cruiser install blocked by disk space"
---

# ADR 005 — AndroidStorageAdapter deferred; dependency-cruiser install blocked by disk space

## Status
Accepted

## Context

Two items from the Phase 1 plan could not be completed as specified:

### 1. AndroidStorageAdapter

The PRD specifies an `AndroidStorageAdapter` backed by `@capacitor/preferences` as a Phase 1 deliverable. On inspection of the project:

- No `@capacitor/*` packages appear in `package.json` dependencies.
- No `capacitor.config.ts` or `capacitor.config.json` exists in the project root.
- No `@capacitor` packages are present in `node_modules/`.

The Android build script (`quasar build -m capacitor -T android`) invokes Capacitor at the Quasar CLI level, but Capacitor's JavaScript packages are not part of the SpoonFeeder npm dependency tree in this environment. Importing `@capacitor/preferences` would produce a compile error.

### 2. dependency-cruiser installation

`yarn add -D dependency-cruiser` fails with `ENOSPC: no space left on device` when writing to the yarn berry cache at `/home/llm/.yarn/berry/cache/`. The `/home/llm` filesystem (`/dev/nvme0n1p2`, 108 GB) is 100% full. This is a shared host volume — it cannot be freed within the container.

## Decisions

### AndroidStorageAdapter: deferred to post-Capacitor-setup

The `factory.ts` implementation contains a comment stub marking the Android adapter path:

```ts
// Android support requires @capacitor/preferences — not yet installed.
// When Capacitor packages are added, replace with:
//   import { AndroidStorageAdapter } from './AndroidStorageAdapter';
//   if (Capacitor.getPlatform() === 'android') return new AndroidStorageAdapter(...)
```

`AndroidStorageAdapter.ts` will be authored in a follow-up once `@capacitor/core` and `@capacitor/preferences` are added to `package.json`. The `StorageAdapter` interface is unchanged — the Android adapter will implement it identically to the web adapter.

**Migration compatibility matrix:** The Android adapter row in `ai.bugfix.migration.spoonfeeder.md` is marked "Blocked — @capacitor/preferences not installed."

### dependency-cruiser: install deferred; scan:deps uses npx

The `scan:deps` script is updated to use `npx dependency-cruiser` rather than a locally installed binary. When disk space is available:

```bash
yarn add -D dependency-cruiser
```

Until then, `npx dependency-cruiser` will download and run the package on demand if network access and `/tmp` space permit. The Phase 1 gate for `yarn scan:deps` is waived for this environment; it must pass before Phase 3 begins.

The `no-direct-webstorage` rule (the primary rule motivating dependency-cruiser) enforces the Phase 3 migration gate — it is not needed until existing code is being migrated away from `webPersistence.ts`. The absence of the tool does not block Phase 1 or Phase 2.

**Resolved:** Disk space was freed and `dependency-cruiser` installed successfully. The config file was renamed from `.js` to `.cjs` because the project has `"type": "module"` in `package.json`, which causes `.js` files to be interpreted as ES modules (incompatible with `module.exports` syntax). The `scan:deps` script updated accordingly.

## Consequences

- Phase 1 gate is met on all criteria except `yarn scan:deps` (disk space blocker, not a code defect).
- Phase 3 cannot begin until `yarn scan:deps` passes, which requires either disk space freed or `dependency-cruiser` installed via an alternative mechanism.
- The Android adapter and its tests are out of scope until Capacitor packages are installed. When they are, the `AndroidStorageAdapter` should be authored following the same pattern as `WebStorageAdapter` and tested using a mock for `Preferences.get`/`set`.
