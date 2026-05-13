# Task List: Quasar Conversion & Immediate Quality Fixes

Each task is atomic — one branch, one PR. Feed to Claude Code one at a time.

---

## Foundation

### TASK-01: Design token CSS variables

Create `src/css/tokens.css` defining all CSS custom properties from the PRD:

- Color tokens (`--sf-color-primary`, `--sf-color-correct`, `--sf-color-incorrect`, `--sf-color-surface`, `--sf-color-surface-raised`, `--sf-color-on-surface`, `--sf-color-token-bg`, `--sf-color-token-text`, `--sf-color-token-border`)
- Transition tokens (`--sf-transition-feedback`, `--sf-transition-appear`)
- Spacing/sizing tokens (`--sf-gap-answer`, `--sf-radius-button`, `--sf-radius-token`, `--sf-min-touch`)

Import this file in `src/css/app.scss`. No component changes yet.

---

### TASK-02: ContinueButton component

Create `src/components/exercise/ContinueButton.vue`.

- Accepts a `visible: boolean` prop
- Hidden (not just invisible — `display: none`) when `visible` is false
- Appears with a CSS transition using `--sf-transition-appear` when shown
- Styled with `--sf-color-primary` fill
- Emits `click` event
- Does not replace the existing continue button yet — standalone component only

---

### TASK-03: FeedbackStatement component

Create `src/components/exercise/FeedbackStatement.vue`.

- Props: `state: 'idle' | 'correct' | 'incorrect'`, `intensity: 'low' | 'medium' | 'high'` (default `'medium'`)
- Shows nothing when `state` is `'idle'`
- Shows a short randomised positive message when `'correct'` (e.g. "Correct!", "Well done!", "Exactly right!")
- Shows a short encouraging message when `'incorrect'` (e.g. "Not quite — keep going", "Almost!")
- Text color: `--sf-color-correct` or `--sf-color-incorrect` matching state
- Standalone component only — not wired up yet

---

## Phase 1 — MC/MA

### TASK-04: Image option pre-processor utility

Create `src/ts/utils/processOptions.ts`.

A pure function `processOptions(options: string[]): AnswerOption[]` where:

```ts
type AnswerOption =
  | { type: 'text'; label: string }
  | { type: 'image'; label: string; src: string };
```

- If option string is an `<img>` tag: extract `src`, derive `label` from filename stem (e.g. `bus.svg` → `bus`)
- Otherwise: return as `{ type: 'text', label: string }`

Include unit tests.

---

### TASK-05: ChoiceExercise component (mc/ma)

Create `src/components/exercise/ChoiceExercise.vue`.

Props:

```ts
slide: SlideInterface;
multiple: boolean; // false = mc, true = ma
```

Emits:

```ts
emit('answer', { selected: string | string[], correct: boolean })
emit('continue')
```

Requirements:

- Use `processOptions()` from TASK-04 to render options
- Each option is a full-width `QBtn` with dark fill (`--sf-color-surface-raised`), `--sf-color-primary` border
- Image options: render `<img>` inside `QBtn`
- Min height: `--sf-min-touch` (44px)
- Answer state per option: `ref<'idle' | 'correct' | 'incorrect' | 'dimmed'>` — drives CSS class, not inline style
- Correct: background transitions to `--sf-color-correct` over `--sf-transition-feedback`
- Incorrect: background transitions to `--sf-color-incorrect`
- Unselected options dim to 50% opacity after answer revealed
- Includes `<FeedbackStatement>` (TASK-03) below the question
- Includes `<ContinueButton>` (TASK-02) shown after answering
- Does not replace old rendering yet — standalone only

---

### TASK-06: Wire ChoiceExercise into mediator for mc

Replace the existing `mc` rendering path in the mediator with `<ChoiceExercise :slide="slide" :multiple="false">`.

- Listen for `answer` emit → pass to existing `conclude()` / scoring logic
- Listen for `continue` emit → advance slide
- Old `mc` rendering path removed
- Regression test: answer correctly, answer incorrectly, continue advances slide

---

### TASK-07: Wire ChoiceExercise into mediator for ma

Same as TASK-06 but for `ma` (`:multiple="true"`). Separate task because ma has multi-select logic that may need extra care.

---

## Phase 2 — Info

### TASK-08: InfoExercise component

Create `src/components/exercise/InfoExercise.vue`.

- Wraps AsciiDoc `v-html` output in a `QCard` styled with `--sf-color-surface`
- Includes `<ContinueButton>` (always visible on info slides — no answer required)
- Wire into mediator, remove old `info` rendering path

---

## Phase 3 — Bool / Select

### TASK-09: Wire bool into ChoiceExercise

`bool` is `mc` with exactly 2 options (True/False). Reuse `ChoiceExercise` with `:multiple="false"`. Wire into mediator, remove old `bool` rendering path.

---

### TASK-10: SelectExercise component

Create `src/components/exercise/SelectExercise.vue` for the `select` type (clickable inline spans).

- Render sentence with clickable spans using `QChip` or styled `<span>`
- Feedback applied reactively using design tokens
- Wire into mediator, remove old `select` rendering path

---

## Phase 5 — Gap / Sort

### TASK-11: Gap token theme fix

In the existing gap exercise (before full Vue conversion), replace `background: #E6F1FB` and `color: #0C447C` with `--sf-color-token-bg` and `--sf-color-token-text`. This is a targeted style fix only — no component restructure.

---

### TASK-12: GapExercise Vue component

Create `src/components/exercise/GapExercise.vue` replacing the existing imperative gap implementation.

- Tokens styled with `--sf-color-token-*` design tokens
- DnD via `vue-draggable-plus`
- Feedback and continue via shared components
- Wire into mediator, remove old gap rendering path

---

### TASK-13: SortExercise Vue component + GSAP removal

Create `src/components/exercise/SortExercise.vue` replacing the existing GSAP-based sort implementation.

- Remove `gsap` and `gsap/dist/Draggable` dependencies entirely
- DnD via `vue-draggable-plus` (same library as gap — install once in TASK-12)
- Position animations via CSS transitions
- Wire into mediator, remove old sort rendering path
- Verify `gsap` no longer appears in `package.json` or any import

---

## Cleanup

### TASK-14: Remove old rendering infrastructure

After all exercise types are converted:

- Remove any remaining `innerHTML` injection in the slide/exercise rendering path
- Remove any imperative DOM patching (`querySelector`, `addEventListener`) from exercise rendering
- Remove the old continue button injection logic
- Verify no exercise type falls through to the old rendering path

---

## Order of execution

```
TASK-01 → TASK-02 → TASK-03 → TASK-04 → TASK-05 → TASK-06 → TASK-07
                                                              ↓
                                                         TASK-08 → TASK-09 → TASK-10
                                                                              ↓
                                                                    TASK-11 → TASK-12 → TASK-13 → TASK-14
```

TASK-11 (gap style fix) can be done any time before TASK-12 — it's a safe isolated change.
