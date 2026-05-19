---
title: "ADR 007 — SyncStorageAdapter for synchronous flag and string access"
---

# ADR 007 — SyncStorageAdapter for synchronous flag and string access

## Status
Accepted

## Context
The abstract PRD specifies a `StorageAdapter` interface with an async `get<T>(key): Promise<T | undefined>` signature. This is correct for Android (where `@capacitor/preferences` is async) and for the `update` atomic operation (which chains promises per-key).

However, SpoonFeeder has six storage keys — `random`, `transition`, `mute`, `courseName`, `courses`, `spoony_enabled`, `spoony_model` — that are read synchronously from multiple call sites deep in the slide rendering stack:

- `RANDOM.is()` is called inside `slideTypeVocab.makeSlides()`, `slideTypeMc.makeSlides()`, `slideTypeMa.makeSlides()`, `createHtmlSort()`, `slideTypeGap.setProperties()`, and `jsonProcessor.processJson()` — all synchronous functions.
- `MUTE.is()` is called inside `AudioPlayer.playAudio()` and `Slide.conclude()` — both synchronous.
- `COURSE_NAME.get()` is called from `adoc2html()`, `SpoonyChat`, `courseData.ts`, and `saveData.ts`.

Making these calls async would require propagating `async`/`await` through:
- `SlideInterface.makeSlides(doc: Document): void` → `Promise<void>` (and all 9 implementors)
- `SlideInterface.conclude(...)`: void` → `Promise<void>` (and `conclude2`, `AudioPlayer`)
- `adoc2html()` and its callers in AsciiDoc rendering
- The `DivisionProcessor` traversal in `scoreProcessor.ts` and `score.ts`
- `ProgressTable.vue` which calls `Score.summary()` in a synchronous reactive context

This cascade would touch ~30 files and change public interfaces. It violates the Phase 3 constraint: "alter externally observable behavior during migration."

## Decision
Introduce `SyncStorageAdapter` — a synchronous wrapper over browser `Storage` APIs with the same validation, quota guard, and telemetry behavior as `WebStorageAdapter`, but without the async interface.

`SyncStorageAdapter` is **not** an implementation of `StorageAdapter`. It is a parallel type used exclusively for Web targets where the underlying storage API is guaranteed synchronous. It is never used on Android (where the Capacitor adapter is legitimately async).

`storageInit.ts` exposes three singletons:
- `localSync: SyncStorageAdapter` — for flags and strings that need synchronous reads
- `sessionSync: SyncStorageAdapter` — for session-scoped flags
- `localAsync: WebStorageAdapter` — for `SaveData` (complex records, atomic update)

## Rationale

**Browser Storage IS synchronous.** `localStorage.getItem()` and `sessionStorage.getItem()` block the call site synchronously. Wrapping them in a `Promise` does not add asynchrony — the Promise resolves in the same microtask. The async interface exists to support Android's `@capacitor/preferences` (which is genuinely async) and to provide a unified interface across platforms. For Web-only flag reads, the async wrapper provides no benefit.

**The cascade was disproportionate.** The only downstream benefit of making flags async would be schema validation at read time. But the flags (`RANDOM`, `TRANSITION`, `MUTE`) have trivial schemas (`z.enum(['true', 'false'])`), are never null, and are set by the application itself (not user input). The risk of undetected corruption is negligible compared to the cost of touching 30+ files.

**Phase isolation.** Phase 3's goal is to eliminate raw `localStorage`/`sessionStorage` access from business logic. `SyncStorageAdapter` achieves this — business logic uses `localSync`/`sessionSync`, not `localStorage` directly.

## Consequences
- `SyncStorageAdapter` must only be used on Web targets. Android uses `localAsync` (via `WebStorageAdapter` or a future `AndroidStorageAdapter`) for all keys. The `platform` discriminant on `storageInit.ts` singletons ensures this.
- The Phase 6 self-consistency audit must confirm that `SyncStorageAdapter` is never used in Android-only code paths.
- If SpoonFeeder adds a third platform (e.g. Electron), `SyncStorageAdapter` remains appropriate since Electron's `safeStorage` has a synchronous read path.
- `SyncStorageAdapter` does not implement the `update` atomic read-modify-write because synchronous localStorage access cannot race with itself in a single-threaded JavaScript engine. If atomic semantics are ever needed on a synchronous-read key, `localAsync.update()` should be used instead.

## Alternatives rejected
- **Full async cascade:** Would touch ~30 files, change SlideInterface, and cascade into Vue components. Cost far exceeds the benefit for flags with trivial schemas. Rejected.
- **In-memory reactive store (Pinia):** The flags are course-session state that must survive page reload. Storing them only in Pinia would break session persistence. Rejected.
- **Defer flag migration entirely:** Would leave `WebStorageVariable`/`WebStorageFlag` in the codebase and fail the Phase 3 gate. Rejected.
