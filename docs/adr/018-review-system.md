---
title: "ADR 018 — Review System Implementation"
status: "Accepted"
date: "2026-05-10"
---

# ADR 018 — Review System Implementation

## Context

Implements the Review System described in `docs/review.prd.md` across three phases:

- **Phase A** — TypeScript core: `reviewTypes`, `reviewExtractor`, `reviewSelector`, `reviewStorage`, unit tests
- **Phase B** — Automatic triggers: boundary map wiring in `mediator.ts`, `ReviewPrompt.vue`, `ReviewSession.vue`
- **Phase C** — User-initiated reviews: `ReviewMenu.vue`, hamburger menu entry, scope-unlock tracking

Several non-obvious decisions arose during implementation that are not captured in the PRD.

---

## Decision 1: Module-Level Reactive Singleton for Cross-Layout State

### Problem

`ReviewMenu.vue` is mounted inside `MenuOverlay`, which is a sibling of `IndexPage` under `MainLayout`. There is no parent-child relationship between them, so props/emits cannot carry the launch signal from `DropList` (inside `MenuOverlay`) to `IndexPage`.

### Options Considered

| Option | Rejected because |
|---|---|
| Pinia store | Adds Pinia boilerplate for two refs; Pinia stores in this project are intentionally minimal — most state lives in mediator/composables |
| Custom event bus | No built-in event bus in Vue 3; a separate EventEmitter import adds a dependency |
| Module-level reactive singleton | No new dependency; directly importable by any component; idiomatic for small cross-cutting state |

### Decision

`src/vue/composables/reviewMenuState.ts` exports two module-level `ref()`s:

```typescript
export const reviewMenuOpen = ref(false);
export const reviewLaunchPending = ref<ReviewLaunchRequest | null>(null);
```

`DropList` sets `reviewMenuOpen = true`; `MenuOverlay` mounts `ReviewMenu` when it is true; `ReviewMenu` sets `reviewLaunchPending` and clears `reviewMenuOpen`; `IndexPage` watches `reviewLaunchPending` and calls `runReviewSession`.

---

## Decision 2: `nextTick()` Between Sequential Boundary Prompts

### Problem

When the user completes the last lesson of the last unit, three boundaries fire in sequence (lesson → unit → course). The `IndexPage` loop sets `showPrompt.value = false`, then immediately `true` for the next boundary in the same microtask. Vue batches these updates and only processes the final value (`true`), so the prompt DOM element is never removed between prompts. Cypress's `should('not.exist')` assertion therefore always failed.

### Decision

Insert `await nextTick()` after `showPrompt.value = false` before continuing the boundary loop:

```typescript
showPrompt.value = false;
await nextTick(); // flush Vue's removal before showing the next prompt
if (choice === 'skip') continue;
```

This ensures Vue removes the component from the DOM before the next iteration sets `showPrompt.value = true`. The `not.exist` check was also removed from `skipReviewPrompt()` in the Cypress helpers because even with `nextTick()`, the next prompt re-appears immediately after the flush and Cypress polling consistently sees `true`.

---

## Decision 3: ProgressTable Remounting via `v-if`

### Problem

`OverlayTable.vue` rendered `<ProgressTable>` unconditionally. `ProgressTable` computed `Score.summary(CourseFile.get())` at setup time — which is page load, before the course is loaded. The computed data was permanently empty, making lesson 2's exercises invisible in the Progress dialog.

### Decision

Add `v-if="props.showOverlay"` to `<ProgressTable>`:

```html
<ProgressTable v-if="props.showOverlay" style="cursor: auto" />
```

This destroys and recreates the component each time the Progress dialog opens. `CourseFile.get()` is always populated by the time the user opens the dialog, so `Score.summary()` runs against live data. No caching or reactive Course ref was needed; remounting is sufficient and low-cost for a summary table.

---

## Decision 4: Scope Unlocking via sessionStorage

### Problem

`ReviewMenu` needs to know which scopes the user has already reached so it can lock/unlock them. The boundary map only records slide indices; it does not track how far the user has navigated.

### Options Considered

| Option | Rejected because |
|---|---|
| Store highest-reached index in localStorage | Unlock state is session-relative — if the user re-opens the course in a new tab, they start from the beginning; persisting unlock defeats the intent |
| Query `SaveData` to infer progress | Answering exercises is not required for scope completion (per PRD §9.1); a user who clicks through without answering would appear locked |
| Track in mediator reactive state | Lost on page refresh; inconsistent with the draft-state resume model |

### Decision

`reviewStorage.ts` exports `getHighestReachedIndex` / `setHighestReachedIndex` backed by `sessionStorage` under key `highest_reached_<courseName>`. `IndexPage` calls `setHighestReachedIndex(nextSlideIndex, courseName)` in the pre-advance hook on every slide advance. `ReviewMenu` reads this on mount and compares each boundary's `slideIndex` against it to determine locked state.

sessionStorage is appropriate: it is cleared when the tab closes, survives page refresh within the session, and requires no Zod schema registration (it holds a single integer string, not structured data).

---

## Decision 5: DataTransfer Sharing in Cypress Gap Tests

### Problem

The gap drag-and-drop test in `review.cy.ts` created separate `new DataTransfer()` instances for the `dragstart` and `drop` triggers. The `drop` handler in `makeSlidesStrategyGap.ts` calls `event.dataTransfer.getData('text')` on the drop's `DataTransfer` — which had no data set — so `getElementById('')` returned `null`, crashing with `Cannot read properties of null (reading 'style')`.

### Decision

Use the shared `dragDrop()` helper from `cypress/e2e/functions.ts`, which creates one `DataTransfer` instance and passes it to both the `dragstart` and `drop` triggers. The helper already existed for the main-course gap tests; the review test was not using it.

---

## Decision 6: E2E Infrastructure Fixes

Three separate issues were resolved to make `yarn test:e2e` reliable on this host:

### 6.1 ENOSPC — inotify Watcher Limit

The Vite dev server (chokidar) exhausts `fs.inotify.max_user_watches` on this host, crashing before Cypress can connect.

**Fix:** Prefix both `test:e2e` scripts with `CHOKIDAR_USEPOLLING=true` (stat polling, no inotify descriptors). Also set `server.watch = { usePolling: true }` in `quasar.config.cjs`'s `extendViteConf` so `quasar dev` respects polling when run directly. `cypress.config.cjs` timeouts raised (`defaultCommandTimeout: 10s`, `pageLoadTimeout: 30s`) to absorb the extra CPU overhead from polling.

### 6.2 Audio Playback During Tests

`AudioPlayer.playAudio()` fires on every answer, causing audible feedback during Cypress runs.

**Fix:** Stub `HTMLMediaElement.prototype.play` in `cypress/support/e2e.ts` via the `window:before:load` event (which fires on the real app window before any app scripts run). Additionally set `sessionStorage.mute = 'true'` in the same hook so the app's own `MUTE` guard returns early before reaching the stub. The `--mute-audio` Chrome launch flag was tried first but caused a spurious headed browser window to open.

### 6.3 Spurious Headed Browser on `yarn test:e2e`

`quasar.config.cjs` had `devServer.open: true`, which pops a browser window whenever `quasar dev` starts — including the dev server launched by `start-server-and-test`.

**Fix:** `open: !process.env.CHOKIDAR_USEPOLLING`. The test scripts already set this env var, so the browser is suppressed during `test:e2e` while normal `quasar dev` invocations still open a browser.

---

## Decision 7: Test Course — Lesson 2 Addition

The test course had only one lesson (one unit), producing no lesson or unit boundary prompts. Review E2E tests require at least two lessons to exercise the prompt flow.

Two mc exercises were added as a second lesson (`Lesson 2`) in `src/courses/test/course.yml`:

- "Which planet is closest to the Sun?" → Mercury
- "What is the chemical symbol for water?" → H2O

These were chosen to be fully predictable (both mc, one correct answer each) so the focused-review "shows score" test can assert a deterministic result without branching on slide type. The end-of-course stat assertions in `functions.ts` were updated from 17/11/65% to 19/13/68% to account for the two new exercises.

---

## Consequences

- `reviewMenuState.ts` is a module singleton — it is shared across all component instances in the app. If the app ever runs multiple concurrent course views (currently not supported), this state would need to move to a Pinia store.
- `getHighestReachedIndex` / `setHighestReachedIndex` are not in `spoonfeederSchemas.ts` and are not validated by the storage invariant system. The stored value is a plain integer string; schema registration is not warranted.
- The `not.exist` check between sequential boundary prompts is intentionally absent from `skipReviewPrompt()`. Tests relying on the absence of the prompt element between back-to-back firings will always be flaky; downstream assertions on subsequent prompt content provide the equivalent correctness guarantee.
- `CHOKIDAR_USEPOLLING=true` increases CPU usage during E2E test runs. If the host's inotify limit is raised (`sysctl fs.inotify.max_user_watches`), the polling workaround can be removed from `package.json` and `quasar.config.cjs`.
