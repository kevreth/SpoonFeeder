---
title: "PRD-001: Exercise Rendering — Quasar Conversion & Immediate Quality Fixes"
repo: "spoonfeeder/SpoonFeeder"
created: "2026-06-05"
status: "Active"
priority: "1 — prerequisite for all gamification PRD sections"
---

# PRD-001: Exercise Rendering — Quasar Conversion & Immediate Quality Fixes

## Problem

SpoonFeeder's exercise rendering system generates raw HTML strings, injects them via `innerHTML` into a `#content` div, then patches the DOM imperatively with jQuery, event listeners, and inline `style` mutations. This is the root cause of four high-visibility quality problems (Section 1 of the Gamification PRD) and the main barrier to consistent theming, accessibility, and future feature work.

The specific problems:
- Answer buttons use hardcoded colors that clash on dark backgrounds
- Correct/incorrect feedback snaps instantly (no transition)
- Touch targets are too small on mobile
- Image answer options render as raw `<img>` HTML instead of image buttons

These cannot be patched in isolation — they require replacing the rendering system.

---

## Scope

### In scope

- 100% Vue rendering: replace the `#content` div with a dynamic Vue component switcher driven by a Pinia store
- All exercise types: `mc`, `ma`, `bool`, `info`, `select`, `gap`, `sort`, `imap`, `vocab`
- Eliminate `innerHTML` injection, jQuery, imperative DOM patching, and inline `style` mutation from the exercise path
- Remove GSAP (used only by `sort`) and the `mobile-drag-drop` polyfill (superseded by SortableJS)
- Establish a component pattern for future exercise types
- Resolve the four immediate quality issues as a natural outcome of the conversion

### Out of scope

- Quiz evaluation, scoring, and persistence logic — the TS layer (`quiz/`, `slide/conclude/`, `dataaccess/`) stays framework-agnostic and is called from Vue, not replaced
- Gamification mechanics (stars, streaks, quests) — Gamification PRD Sections 3–6
- Skinning system and skin file format — Gamification PRD Section 7
- Vocab spaced repetition — Gamification PRD Section 8.4
- Accessibility audit — deferred until after conversion

---

## Architecture — Reactive Store & `#content` Replacement

The central change is decoupling `SlideDispatcher` from the DOM.

**Current flow:** `SlideDispatcher.begin()` / `next()` / `decorate()` → `slide.makeSlides(doc)` → jQuery appends HTML into `#content` → imperative event listeners attached.

**New flow:**

1. A Pinia store (`useSlideStore`) holds `currentSlide: SlideInterface | null` and `currentSlideType: string | null`
2. `SlideDispatcher` calls `store.setSlide(slide, slide.type)` instead of `slide.makeSlides(doc)`
3. `IndexPage.vue` replaces `<div id="content"></div>` with a dynamic component:
   ```vue
   <component :is="exerciseComponent" :slide="currentSlide"
     @answer="handleAnswer" @continue="handleContinue" />
   ```
4. `exerciseComponent` is a computed mapping `currentSlideType` to the appropriate Vue component
5. `handleAnswer({ selected, correct })` in `IndexPage.vue`:
   - Calls `slide.setRes(selected)` and `void slide.saveData()` (existing TS logic)
   - Triggers `audioPlayer.playAudio(correct)` via a hidden `<audio ref="audioEl">` in the template
   - Sets `showExplain.value = !!slide.exp` and `explainText.value = slide.exp ?? ''`
6. `handleContinue` calls the existing `dispatch2` / advance logic

**`slide.decorate(doc)` is NOT called** on Vue-rendered slides — that method manipulates DOM nodes that no longer exist. Exercise components own all visual feedback state reactively. Correctness is determined by the component using a thin `evaluateAnswer(slide, response): boolean` helper extracted from the TS evaluation layer (see ADR-019).

**Audio:** Hidden `<audio ref="audioEl" />` in `IndexPage.vue`; `AudioPlayer` instantiated there.

**Explain icon:** `showExplain: ref(false)` and `explainText: ref('')` in `IndexPage.vue`; rendered as a Vue component.

**End screen:** `SlideDispatcher.end()` sets a `quizComplete: ref(true)` flag; `IndexPage.vue` renders the end screen via `v-if` with the `evaluate(json)` result in `v-html`.

**MathJax:** Each exercise component calls `postRender(document)` in `onMounted` and in a `watch` on the `slide` prop so equations typeset after Vue renders.

---

## Design Tokens

All visual values use CSS custom properties defined in `src/css/tokens.css`.

```css
/* Color */
--sf-color-primary:        #00b4d8;  /* cyan — interactive elements */
--sf-color-correct:        #4caf50;  /* green — correct answer state */
--sf-color-incorrect:      #f44336;  /* red — incorrect answer state */
--sf-color-surface:        #1a1a2e;  /* dark card background */
--sf-color-surface-raised: #16213e;  /* slightly elevated surface */
--sf-color-on-surface:     #e0e0e0;  /* primary text on dark bg */
--sf-color-token-bg:       #1e3a5f;  /* gap fill token background */
--sf-color-token-text:     #90caf9;  /* gap fill token text */
--sf-color-token-border:   #42a5f5;  /* gap fill token border */

/* Transitions */
--sf-transition-feedback:  280ms ease-out;
--sf-transition-appear:    200ms ease-out;

/* Spacing / sizing */
--sf-gap-answer:           10px;
--sf-radius-button:        8px;
--sf-radius-token:         6px;
--sf-min-touch:            44px;  /* minimum tap target — accessibility requirement */
```

---

## Conversion Sequence

Each phase is independently deployable. The old rendering path stays live until the replacement is complete and tested. `yarn test:all` is run after each phase before proceeding.

### Phase 1 — `mc`, `ma`, `bool`

**Component:** `ChoiceExercise.vue` (unified; `multiple: boolean` prop)

Props: `slide: SlideInterface`, `multiple: boolean`
Emits: `answer({ selected: string | string[], correct: boolean })`, `continue`

- Options rendered via `processOptions()` utility (strips `<img>` HTML → `{ type, label, src }`)
- Full-width `QBtn`, dark fill (`--sf-color-surface-raised`), `--sf-color-primary` border, min-height `--sf-min-touch`
- MA selection tracking: `ref<Set<number>>` for toggled options — separate from post-answer feedback state
- Per-option feedback state: `ref<'idle' | 'correct' | 'incorrect' | 'dimmed'>` — CSS class, not inline style
- Correct → background transitions to `--sf-color-correct`; incorrect → `--sf-color-incorrect`; unselected → 50% opacity
- `bool` reuses the same component with `multiple: false` and exactly 2 options

### Phase 2 — `info`

**Component:** `InfoExercise.vue`

- AsciiDoc output in `v-html` inside a `QCard` (`--sf-color-surface`)
- `ContinueButton` always visible — no answer required
- `handleAnswer` called on mount with `{ selected: '', correct: true }` (info slides use `immediateConclusion`)

This phase also retires the old DOM injection calls in `conclude.ts` (`continueButton()`, `showExplainIcon()`), replacing them with the reactive Vue equivalents established in the core architecture task.

### Phase 3 — `select`

**Component:** `SelectExercise.vue`

- `slide.txt` sentence split into word tokens; each rendered as a clickable `<span>`
- `ref<Set<number>>` tracks selected word indices (toggleable, multi-select)
- Done button submits selected indices
- Post-answer CSS classes (not inline style):
  - `.sf-word-correct` — correctly selected: `text-decoration: underline`, color `--sf-color-correct`
  - `.sf-word-incorrect` — incorrectly selected: `text-decoration: line-through`, color `--sf-color-incorrect`
  - `.sf-word-missed` — not selected but should be: `text-decoration: underline`, color `--sf-color-correct`

### Phase 4 — `vocab`

`vocab` decomposes at runtime into MC child slides via `VocabFactory` (delegates to `CreateHtml.MC` / `MakeSlidesStrategy.MC`). Once `mc` is converted, vocab works without a dedicated component. This phase is verification only.

Note: `slideTypeVocab.decorate()` throws `Error('Method not implemented.')` — a pre-existing bug. Confirm it is never called in the new path and document the finding.

### Phase 5 — `gap`, `sort`

**`gap` — Component:** `GapExercise.vue`

- `vue-draggable-plus` (SortableJS) with `group` option for cross-list DnD: tokens drag from a pool into individual gap slots
- Each slot accepts at most one token
- SortableJS handles mobile touch natively — custom `touchstart`/`touchmove`/`touchend` code removed
- `mobile-drag-drop` polyfill removed from `package.json`
- Tokens styled with `--sf-color-token-*` design tokens

**`sort` — Component:** `SortExercise.vue` (see ADR-019 for GSAP replacement rationale)

| GSAP call | Replacement |
|---|---|
| `gsap.to(container, { autoAlpha: 1 })` | Vue `<Transition>` on mount |
| `gsap.to(el, { scale: 1.1, boxShadow })` | CSS class `.sf-sort-dragging` on drag start |
| `gsap.to(el, { y: targetY })` | SortableJS `animation: 200` option |
| `force3D: true` | `will-change: transform` on list items |

`gsap` removed from `package.json` after this phase.

### Phase 6 — `imap`

**Component:** `ImapExercise.vue` (see ADR-019 for scope inclusion rationale)

- On `onMounted`: inject SVG via `SVGInjector` called with the container ref (or native `fetch` + `v-html` — implementer's choice; see DEC-001)
- After injection, discover child element IDs; store as `ref<string[]>`
- Click on shape → emits `answer({ selected: shapeId, correct })`
- Feedback via CSS class toggle: `.shape_correct` / `.shape_incorrect`, remove `.shape` (same class names as current implementation)

---

## Shared Components

### `ContinueButton.vue`

- `visible: boolean` prop — `display: none` when false
- Appears with CSS transition using `--sf-transition-appear`
- `--sf-color-primary` fill
- Emits `click`

### `FeedbackStatement.vue`

- Props: `state: 'idle' | 'correct' | 'incorrect'`, `intensity: 'low' | 'medium' | 'high'` (default `'medium'`)
- Randomised positive messages on correct; encouraging messages on incorrect
- Text color: `--sf-color-correct` or `--sf-color-incorrect`
- `intensity` groundwork for skinning PRD (only `'medium'` implemented for now)

---

## Success Criteria

### Phase 1 (mc/ma/bool)
- [ ] Buttons use design token colors, not hardcoded hex
- [ ] Correct/incorrect feedback uses a CSS transition, not an instant snap
- [ ] Buttons meet 44px minimum touch target height
- [ ] Image options render as image buttons, not raw `<img>` HTML
- [ ] No `innerHTML` injection in mc/ma/bool rendering path
- [ ] Reinforcement statement appears after answering
- [ ] Continue button appears with transition after answering

### Phase 2 (info)
- [ ] Info content renders in a dark-themed `QCard`
- [ ] No visual regression on AsciiDoc content

### Phase 3 (select)
- [ ] Word spans are interactive and toggleable
- [ ] Text-decoration feedback applied via CSS classes, not inline style

### Phase 5 (gap/sort)
- [ ] Gap tokens use `--sf-color-token-*` — no `#E6F1FB` or `#0C447C`
- [ ] Gap cross-list DnD works on both desktop and mobile
- [ ] `mobile-drag-drop` removed from `package.json`
- [ ] `gsap` absent from `package.json` and all imports

### Phase 6 (imap)
- [ ] Clickable SVG shapes emit the correct answer
- [ ] Correct/incorrect CSS classes applied reactively

### All phases
- [ ] `#content` div replaced — no exercise type uses `innerHTML` injection
- [ ] jQuery (`$`) absent from all exercise rendering code
- [ ] TS quiz/scoring/persistence layer has zero Vue/Quasar imports
- [ ] All visual values reference CSS custom properties
- [ ] Audio feedback plays on answer (correct and incorrect)
- [ ] Explain text shown after answering when `slide.exp` is non-empty
- [ ] `skin.feedbackIntensity` prop accepted by `FeedbackStatement` (even if only `'medium'` implemented)
- [ ] `yarn test:all` passes after each phase

---

## Testing

- **Unit tests** required for `processOptions` (TASK-04) and the Pinia slide store (TASK-05)
- **E2E tests** (Cypress) must cover the full answer → feedback → continue flow for each exercise type; the existing test suite exercises this via the test course
- **Differential replay** (see CLAUDE.md): record a baseline snapshot before conversion, re-run after each phase, diff against baseline to confirm no silent save-data regressions

---

## Open Questions

1. **`imap` SVG injection approach:** keep `@tanem/svg-injector` called from `onMounted`, or replace with native `fetch` + `v-html`? Either is acceptable — see DEC-001.
2. **Unified or separate mc/ma components?** Unified (`multiple` prop) recommended; revisit if ma layout diverges significantly.
3. **Reinforcement text location:** inside exercise component (recommended for encapsulation) or shared overlay managed by mediator?
