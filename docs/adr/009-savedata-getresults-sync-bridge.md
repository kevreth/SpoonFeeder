---
title: "ADR 009 — SaveData.getResults() kept synchronous via localSync"
---

# ADR 009 — SaveData.getResults() kept synchronous via localSync

## Status
Accepted

## Context
`SaveData.getResults(slide)` is called from two synchronous paths:

**Path 1: `evaluate.ts → getEvaluationArray()`**
```ts
function getEvaluationArray(slidesArr: SlideInterface[]) {
  for (const slide of slidesArr) {
    if (slide.isExercise) {
      const results = SaveData.getResults(slide);  // sync
      if (results !== '') slide.setResults(results);
      ...
    }
  }
}
```
`evaluate()` returns a `string` (the summary HTML). `SlideDispatcher.end()` calls it synchronously. Making it async would force `end()` to be `async end(): Promise<void>`, which changes `StateActions<void>`, which changes all nine `SlideDispatcher` method signatures.

**Path 2: `scoreProcessor.ts → ScoreProcessor.exercises()`**
```ts
private getResults = SaveData.getResults;  // stored as function reference
```
`ScoreProcessor` is used in `Score.summary()` which is called from `ProgressTable.vue` in a synchronous reactive context. Making `Score.summary()` async would require `ProgressTable.vue` to use an async computed or `onMounted` loader — a Vue reactivity change that extends beyond the Phase 3 scope.

Both paths ultimately compute the course score and summary table. They are read-only; they do not mutate storage.

## Decision
`SaveData.getResults(slide)` reads save data synchronously via `localSync` (the `SyncStorageAdapter` over `localStorage`). It does not go through `localAsync`.

A new pure helper `SaveData.getResultsFromSaves(slide, saves)` is also provided for use in contexts where saves have already been loaded:
```ts
public static getResultsFromSaves(slide: SlideInterface, saves: SaveData[]): AnswerType {
  const idx = SaveData.find(slide.txt, saves);
  return idx >= 0 ? saves[idx].result : '' as AnswerType;
}
```

## Rationale
**`localSync` reads the same data as `localAsync`.** Both adapters point to the same `localStorage` object and use the same `appRegistry`. A value written by `localAsync.set('courseName-key', saves)` is immediately readable by `localSync.get('courseName-key')` — localStorage is synchronous; there is no async cache or buffer.

**Schema validation still applies to writes.** The read-only paths in `getResults` do not validate the schema, but every write to save data goes through `localAsync.set()` which runs `SaveDataArraySchema.parse()` before persisting. A corrupted read is therefore only possible if the data was written before Phase 3 (legacy format) or externally modified — both of which the legacy-read path (ADR 010) already accommodates.

**Deferring the async cascade is correct at Phase 3.** The scoring and summary flows are isolated from the quiz execution flow. They are best refactored as a self-contained Phase 4 or Phase 5 task once the primary data path is stable. Pulling them into Phase 3 would have expanded scope significantly.

## Consequences
- `ScoreProcessor`, `Score`, `evaluate.ts`, and `ProgressTable.vue` require no changes in Phase 3.
- `SaveData.getResults()` is documented as a "synchronous bridge" — it must not be used in any new code. All new code should use `getResultsFromSaves(slide, saves)` with pre-loaded data.
- In Phase 4 or Phase 5, `ScoreProcessor` should be refactored to accept pre-loaded saves via its constructor, eliminating the `getResults` sync bridge and making the scoring flow fully independent of storage.
- The `side-effect-scanner` does not flag `localSync.get()` (it only flags direct `localStorage.getItem()` calls). The scanner's exemption of `main/infrastructure` covers `storageInit.ts`.

## Alternatives rejected
- **Make `evaluate()` async and cascade:** Would change `StateActions<void>`, all nine `SlideType` implementations, `ProgressTable.vue`, and `Score`. Surface too large for Phase 3. Rejected.
- **Pre-load saves in `Score.summary()`:** Would require `Score.summary()` to be async, which propagates to `ProgressTable.vue`. Same cascade as above. Rejected.
- **Cache saves in a module-level variable:** Would introduce hidden mutable state outside the adapter layer — explicitly forbidden by the PRD (§7.3). Rejected.
