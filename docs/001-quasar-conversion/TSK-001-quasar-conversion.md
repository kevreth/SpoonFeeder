---
title: "TSK-001: Exercise Rendering — Quasar Conversion & Immediate Quality Fixes"
prd: "PRD-001-quasar-conversion.md"
created: "2026-06-05"
status: "TODO"
---

# TSK-001: Exercise Rendering — Quasar Conversion & Immediate Quality Fixes

Each item is atomic — one branch, one PR. Execute top-to-bottom.
`yarn test:all` milestones are marked with ✓ — do not proceed past them until the run is clean.

---

## Conventions

- **Component location:** exercise components live under `src/vue/components/exercise/` (the repo's Vue presentation layer per `CLAUDE.md`). Framework-agnostic helpers (e.g. `processOptions`) live under `src/ts/main/` / `src/ts/utils/`.
- **E2E selector lockstep:** converting an exercise type to a Vue component replaces the legacy DOM that `cypress/e2e/example.cy.ts` asserts against (`#btn0`, `#continueBtn`, `#ans0`, `#w4`, `startOver`, `#content`). To keep each phase's `yarn test:all` gate green, **every new exercise component exposes stable `data-cy` hooks** (e.g. `data-cy="option-N"`, `data-cy="continue"`, `data-cy="done"`, `data-cy="word-N"`, `data-cy="end-screen"`), and the wiring task for each phase **updates `example.cy.ts` to target those hooks in lockstep**. See [ADR-022](../adr/022-e2e-selector-lockstep.md). `review.cy.ts` already uses `data-cy` and needs no change.
- **Cypress prerequisite (containerized runs):** the e2e gate needs the Cypress binary installed and executable. If `yarn cypress verify` fails with "executable not found" / missing execute permission, run `yarn cypress install` then `chmod -R u+x "$(yarn cypress cache path 2>/dev/null || echo ~/.cache/Cypress)"/*/Cypress` before the first `yarn test:all`.

---

## Foundation

- [ ] **T-010** Create `src/css/tokens.css` with all design token CSS custom properties from PRD-001 (colors, transitions, spacing). Import in `src/css/app.scss`. No component changes.

- [ ] **T-020** Create `src/vue/components/exercise/ContinueButton.vue`
  - `visible: boolean` prop; `display: none` when false
  - Appears with `--sf-transition-appear` CSS transition
  - `--sf-color-primary` fill; emits `click`
  - Standalone only — not wired up yet

- [ ] **T-030** Create `src/vue/components/exercise/FeedbackStatement.vue`
  - Props: `state: 'idle' | 'correct' | 'incorrect'`, `intensity: 'low' | 'medium' | 'high'` (default `'medium'`)
  - Randomised positive messages on correct; encouraging messages on incorrect; nothing on idle
  - Text color: `--sf-color-correct` / `--sf-color-incorrect`
  - Standalone only — not wired up yet

- [ ] **T-040** Create `src/ts/utils/processOptions.ts`
  - `processOptions(options: string[]): AnswerOption[]`
  - `AnswerOption = { type: 'text'; label: string } | { type: 'image'; label: string; src: string }`
  - `<img>` strings → extract `src`, derive `label` from filename stem
  - Include unit tests

- [ ] **T-050** Create `src/vue/stores/slideStore.ts` (Pinia)
  - `currentSlide: ref<SlideInterface | null>`, `currentSlideType: ref<string | null>`
  - `setSlide(slide, type)` action
  - Include unit test confirming `setSlide` updates both refs

---

## Core Architecture

- [ ] **T-060** Refactor `src/ts/main/quiz/slideDispatcher.ts`
  - `begin()`, `next()`, `decorate()` call `store.setSlide(slide, slide.type)` instead of `slide.makeSlides(doc)`
  - `end()` sets a `quizComplete` flag on the store instead of `doc.body.innerHTML`
  - `hideExplainIcon(doc)` calls removed (explain state is now reactive)
  - `doc: Document` constructor param retained only if still needed by remaining code; remove if not
  - Existing unit tests must still pass

- [ ] **T-070** Refactor `IndexPage.vue` — replace `#content`
  - Add `<audio ref="audioEl" />` (hidden) to template
  - Add `showExplain: ref(false)`, `explainText: ref('')`, `quizComplete: ref(false)` state
  - Replace `<div id="content"></div>` with `<component :is="exerciseComponent" :slide="currentSlide" @answer="handleAnswer" @continue="handleContinue" />`
  - Add end-screen: `<div v-if="quizComplete" v-html="endScreenHtml" />` where `endScreenHtml` is `evaluate(Json.get())`
  - `exerciseComponent` computed: maps `currentSlideType` to component (placeholder `div` until phase tasks wire real components)
  - `handleAnswer({ selected, correct })`: `slide.setRes(selected)`, `audioPlayer.playAudio(correct)`, `void slide.saveData()`, update explain state
  - `handleContinue`: calls existing `dispatch2` / advance logic
  - Instantiate `AudioPlayer` with `audioEl` ref
  - `#content` must not be referenced anywhere after this task

- [ ] **T-075** ✓ `yarn test:all` — 0 failures before proceeding

---

## Phase 1 — MC / MA / Bool

- [ ] **T-080** Create `src/vue/components/exercise/ChoiceExercise.vue`
  - Props: `slide: SlideInterface`, `multiple: boolean`
  - Emits: `answer({ selected: string | string[], correct: boolean })`, `continue`
  - Use `processOptions()` (T-040) to render options
  - Full-width `QBtn`, `--sf-color-surface-raised` fill, `--sf-color-primary` border, `--sf-min-touch` min-height
  - Image options: `<img>` inside `QBtn`
  - MA selection: `ref<Set<number>>` for toggled indices — separate from feedback state
  - Per-option feedback state: `ref<'idle' | 'correct' | 'incorrect' | 'dimmed'>` — CSS class only, no inline style
  - Transitions: correct → `--sf-color-correct`, incorrect → `--sf-color-incorrect`, unselected → 50% opacity
  - Includes `<FeedbackStatement>` (T-030) and `<ContinueButton>` (T-020)
  - Calls `postRender(document)` in `onMounted` and in a `watch` on `slide` for MathJax
  - Determines correctness via `evaluateAnswer(slide, selected)` helper (see T-060 for extraction)
  - Standalone — not wired to store yet

- [ ] **T-090** Wire `mc` and `bool` into `exerciseComponent` map in `IndexPage.vue`
  - `mc` → `ChoiceExercise` with `:multiple="false"`
  - `bool` → `ChoiceExercise` with `:multiple="false"`
  - Old `mc` and `bool` rendering paths removed (or marked dead — cleaned up in T-190)
  - Add `data-cy` hooks to `ChoiceExercise` (`option-N`, `continue`, `done`) and update the `mc`/`bool` assertions in `cypress/e2e/example.cy.ts` from `#btn0`/`#continueBtn` to the new hooks (lockstep — see Conventions)
  - Regression: answer correctly, answer incorrectly, continue advances slide for both types

- [ ] **T-100** Wire `ma` into `exerciseComponent` map
  - `ma` → `ChoiceExercise` with `:multiple="true"`
  - Verify multi-select, Done button, correct/incorrect states
  - Old `ma` rendering path removed
  - Update the `ma` assertions in `cypress/e2e/example.cy.ts` to the `ChoiceExercise` `data-cy` hooks (lockstep)

- [ ] **T-105** ✓ `yarn test:all` — 0 failures before proceeding

---

## Phase 2 — Info

- [ ] **T-110** Create `src/vue/components/exercise/InfoExercise.vue` and retire `conclude.ts` DOM injection
  - AsciiDoc `v-html` output wrapped in `QCard` (`--sf-color-surface`)
  - `ContinueButton` always visible (info slides: no answer required)
  - On mount: call `handleAnswer({ selected: '', correct: true })` to trigger audio/saveData path correctly for `immediateConclusion` slides
  - Calls `postRender(document)` in `onMounted`
  - Remove `continueButton()` and `showExplainIcon()` DOM injection from `conclude.ts` — replaced by reactive `ContinueButton.vue` and `showExplain` state in `IndexPage.vue`
  - Wire `info` into component map, remove old rendering path
  - Add `data-cy` hooks to `InfoExercise` (`continue`) and update the `info` assertions in `cypress/e2e/example.cy.ts` (lockstep)

- [ ] **T-115** ✓ `yarn test:all` — 0 failures before proceeding

---

## Phase 3 — Select

- [ ] **T-120** Create `src/vue/components/exercise/SelectExercise.vue`
  - `slide.txt` split into word tokens; each rendered as a clickable `<span>` (or `QChip`)
  - `ref<Set<number>>` tracks selected word indices; words toggle on/off
  - Done button collects selected indices → emits `answer`
  - Post-answer CSS classes (not inline style):
    - `.sf-word-correct` — correctly selected: `text-decoration: underline`, color `--sf-color-correct`
    - `.sf-word-incorrect` — incorrectly selected: `text-decoration: line-through`, color `--sf-color-incorrect`
    - `.sf-word-missed` — not selected but should be: `text-decoration: underline`, color `--sf-color-correct`
  - Includes `ContinueButton` and `FeedbackStatement`
  - Wire `select` into component map, remove old rendering path
  - Add `data-cy` hooks to `SelectExercise` (`word-N`, `done`, `continue`) and update the `select` assertions in `cypress/e2e/example.cy.ts` (replaces `#w4`/`#w5`/`#w6`) (lockstep)

- [ ] **T-125** ✓ `yarn test:all` — 0 failures before proceeding

---

## Phase 4 — Vocab

- [ ] **T-130** Verify vocab works end-to-end via `ChoiceExercise`
  - Run through a vocab exercise in the test course (or a course with vocab slides)
  - Confirm all MC children render, answer, and save correctly
  - Confirm `slideTypeVocab.decorate()` is never called — add a comment to that method noting it is unreachable in the Vue rendering path
  - No new code expected; file a follow-up if vocab is broken

---

## Phase 5 — Gap / Sort

- [ ] **T-140** Gap token theme fix (safe isolated patch — can be applied any time before T-150)
  - In existing gap rendering code, replace `background: #E6F1FB` and `color: #0C447C` with `var(--sf-color-token-bg)` and `var(--sf-color-token-text)`
  - Style change only — no structural change

- [ ] **T-150** Create `src/vue/components/exercise/GapExercise.vue`
  - Install `vue-draggable-plus` (used by sort too — install once here)
  - Token pool and gap slots as two `<VueDraggable>` lists with `group` option for cross-list DnD
  - Each gap slot accepts at most one token
  - SortableJS handles mobile touch — no custom touch event code
  - Tokens styled with `--sf-color-token-*` design tokens
  - Post-answer: gap slot background transitions to `--sf-color-correct` or `--sf-color-incorrect`
  - Remove `mobile-drag-drop` from `package.json` after wiring
  - Includes `ContinueButton` and `FeedbackStatement`
  - Wire `gap` into component map, remove old rendering path
  - Add `data-cy` hooks to `GapExercise` (token/slot/`done`/`continue`) and update the `gap` assertions in `cypress/e2e/example.cy.ts` (lockstep)

- [ ] **T-160** Create `src/vue/components/exercise/SortExercise.vue` + remove GSAP
  - `<VueDraggable>` reorderable list with `animation: 200` (replaces `gsap.to(el, { y })`)
  - Vue `<Transition>` on mount for fade-in (replaces `gsap.to(container, { autoAlpha: 1 })`)
  - CSS class `.sf-sort-dragging` on dragged item: `transform: scale(1.05); box-shadow: …` (replaces GSAP drag shadow)
  - `will-change: transform` on list items (replaces `force3D: true`)
  - Done button collects current order → emits `answer`
  - Remove `gsap` from `package.json`
  - Includes `ContinueButton` and `FeedbackStatement`
  - Wire `sort` into component map, remove old rendering path
  - Add `data-cy` hooks to `SortExercise` (item/`done`/`continue`) and update the `sort` assertions in `cypress/e2e/example.cy.ts` (lockstep)

- [ ] **T-165** ✓ `yarn test:all` — 0 failures before proceeding

---

## Phase 6 — Imap

- [ ] **T-170** Create `src/vue/components/exercise/ImapExercise.vue`
  - `slide.img` holds the SVG path
  - On `onMounted`: inject SVG via `SVGInjector` into the container ref (or `fetch` + `v-html` — see DEC-001)
  - After injection, discover child element IDs; store as `ref<string[]> shapeIds`
  - Click on shape → emits `answer({ selected: shapeId, correct })`
  - Post-answer: toggle CSS classes `.shape_correct` / `.shape_incorrect`, remove `.shape`
  - Includes `ContinueButton`
  - Wire `imap` into component map, remove old rendering path
  - Add `data-cy` hooks to `ImapExercise` (shape/`continue`) and update the `imap` assertions in `cypress/e2e/example.cy.ts` (lockstep)

- [ ] **T-175** ✓ `yarn test:all` — 0 failures before proceeding

---

## Cleanup

- [ ] **T-180** Remove the npm `jquery` package entirely
  - The only `jquery` import is `src/ts/main/index.ts`, which exports three wrappers: `append`, `empty`, `extend`
  - `append` / `empty` are used only by `createPageContent.ts` (the rendering path) — they disappear with T-190
  - `extend` is used only by `src/ts/main/dataaccess/saveData/saveData.ts` (lines ~30, ~71): `extend<Array<SaveData>>(new Array<SaveData>(), raw)` is a shallow array copy. Replace each with `[...(raw as SaveData[])]` (do **not** use `Object.assign` — it skips the non-enumerable `length`). Covered by `saveData.property.test.ts`
  - Remove the `extend` re-export from `src/ts/main/dataaccess/index.ts` and the `append`/`empty` re-exports from `src/ts/main/slidetype/index.ts`
  - Delete the `import $ from 'jquery'` and the three wrappers from `src/ts/main/index.ts`
  - Remove `jquery` **and** `@types/jquery` from `package.json`
  - **Out of scope (deferred to epic 002):** the global `lib/jquery.min.js` loaded in `index.html` is a *separate* jQuery used by course-content inline scripts (`$('#table0').load(...)` in ~9 `course.yml` files + test-course HTML). It is NOT the npm package and stays in this epic. See [PRD-002](../002-global-jquery-removal/PRD-002-global-jquery-removal.md)

- [ ] **T-190** Remove old rendering infrastructure
  - Remove `makeSlidesStrategy*.ts` files (DOM injection layer — no longer called)
  - Remove `createHtml*.ts` files (HTML string builders — no longer called)
  - Remove `createPageContent()` and related jQuery wrappers
  - Remove `startOverButton()` DOM injection if replaced by Vue end-screen
  - Verify no slide type falls through to any old rendering path
  - Note: `@tanem/svg-injector` is retained (called from `ImapExercise.vue` `onMounted`)

---

## Validation

- [ ] **T-195** ✓ `yarn test:all` — 0 failures (final gate)
- [ ] **T-200** `gsap` absent from `package.json` and all source imports
- [ ] **T-210** `jquery` and `@types/jquery` absent from `package.json`; no `import ... 'jquery'` anywhere in `src/`. (The global `lib/jquery.min.js` in `index.html` remains — deferred to epic 002.)
- [ ] **T-220** `#content` not referenced in any source file
- [ ] **T-230** Differential replay snapshot matches baseline (see CLAUDE.md — Differential Replay Pipeline)
