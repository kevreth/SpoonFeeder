# PRD: Exercise Rendering — Quasar Conversion & Immediate Quality Fixes

**Status:** Draft  
**Scope:** Sections 1 & 2 of the Gamification PRD (these are inseparable)  
**Prerequisite for:** All other gamification PRD sections

---

## Background

SpoonFeeder's exercise rendering system generates raw HTML strings, injects them via `innerHTML`, then patches the DOM imperatively with event listeners and inline style changes. This is the root cause of four high-visibility quality problems (Section 1 of the Gamification PRD) and the main barrier to consistent theming, accessibility, and future feature work.

Sections 1 and 2 of the Gamification PRD are treated as a single deliverable. The quality fixes cannot be applied as patches to the existing system — they must be delivered as part of the Quasar component conversion.

---

## Goals

1. Eliminate all `innerHTML` exercise rendering and imperative DOM patching
2. Replace with Quasar/Vue components receiving `SlideInterface` props and emitting answer events
3. Resolve the four immediate quality issues as a natural outcome of the conversion
4. Preserve the existing TS business logic layer untouched (`quiz/`, `slide/`, `slidetype/`)
5. Establish a component pattern that all future exercise types can follow

---

## Non-Goals

- Converting the TS business logic layer to Vue — it stays framework-agnostic
- Implementing gamification mechanics (stars, streaks, quests) — those are later PRDs
- Changing course YAML format or slide data structures
- Implementing new exercise types

---

## Design Tokens

All visual values must use CSS custom properties, not hardcoded colors or sizes. The token system is the foundation for the skinning PRD.

```css
/* Color */
--sf-color-primary: #00b4d8; /* cyan — interactive elements */
--sf-color-correct: #4caf50; /* green — correct answer state */
--sf-color-incorrect: #f44336; /* red — incorrect answer state */
--sf-color-surface: #1a1a2e; /* dark card background */
--sf-color-surface-raised: #16213e; /* slightly elevated surface */
--sf-color-on-surface: #e0e0e0; /* primary text on dark bg */
--sf-color-token-bg: #1e3a5f; /* gap fill token background */
--sf-color-token-text: #90caf9; /* gap fill token text */
--sf-color-token-border: #42a5f5; /* gap fill token border */

/* Feedback transition */
--sf-transition-feedback: 280ms ease-out;
--sf-transition-appear: 200ms ease-out;

/* Spacing */
--sf-gap-answer: 10px; /* gap between answer options */
--sf-radius-button: 8px;
--sf-radius-token: 6px;

/* Touch targets */
--sf-min-touch: 44px; /* minimum tap target size — accessibility requirement */
```

---

## Conversion Sequence

Each phase is independently deployable. The old rendering path stays live until the replacement is complete and tested.

### Phase 1 — `mc` and `ma` (Multiple Choice / Multiple Answer)

Highest visual impact. Most common exercise type.

**Component:** `McExercise.vue` / `MaExercise.vue` (or a unified `ChoiceExercise.vue` with a `multiple` prop)

**Props:**

```ts
interface ChoiceExerciseProps {
  slide: SlideInterface;
  multiple: boolean; // false = mc, true = ma
}
```

**Emits:**

```ts
emit('answer', { selected: string | string[], correct: boolean })
```

**Requirements:**

Answer buttons:

- Full-width `QBtn` with `unelevated` variant and dark fill (`--sf-color-surface-raised`)
- Border: 1px `--sf-color-primary` at rest
- Text: `--sf-color-on-surface`
- Hover/active: Quasar ripple + slight border brightness increase
- Min height: `--sf-min-touch` (44px) on all platforms
- When options are `<img>` tags: render as image buttons (img inside QBtn), not text. Strip raw HTML — receive pre-processed label/src pairs from the mediator

Feedback states (applied via reactive class, not inline style):

- Correct: background transitions to `--sf-color-correct` over `--sf-transition-feedback`
- Incorrect: background transitions to `--sf-color-incorrect` over `--sf-transition-feedback`
- Unselected buttons: fade to 50% opacity when another answer is revealed correct
- No instant color snap — all state changes are transitioned

`conclude()` / `decorate()` logic moves from imperative DOM patching into Vue reactive state (`ref<'idle' | 'correct' | 'incorrect'>` per option).

---

### Phase 2 — `info`

**Component:** `InfoExercise.vue`

- Continues to use `v-html` for AsciiDoc-rendered output (no change in rendering logic)
- Wraps output in a styled `QCard` using design tokens
- Continue button delivered via slot or sibling component (see Continue Button section below)

---

### Phase 3 — `bool` and `select`

**`bool`:** Two-option variant of `ChoiceExercise.vue` (True/False). Reuse the same component with `multiple: false` and exactly 2 options.

**`select`:** Inline text with underlined clickable spans. Each span is a `QChip` or styled `span` that accepts click. Feedback applied reactively.

---

### Phase 4 — `vocab`

Scope expanded per Gamification PRD Section 8.4. Separate PRD to be written. Placeholder component for now.

---

### Phase 5 — `gap` and `sort`

DnD types. Existing implementations run in parallel until Vue replacements are ready.

**`gap`:** Token drag-and-drop into blank slots.

- Tokens: styled per design tokens (`--sf-color-token-bg`, `--sf-color-token-text`, `--sf-color-token-border`)
- No more `background: #E6F1FB` / `color: #0C447C` (light-mode clash)
- DnD: Quasar-compatible library (e.g. `vue-draggable-plus`)

**`sort`:** Reorderable list.

- GSAP removed as part of this phase, not before
- Replace with `vue-draggable-plus` (wraps SortableJS)
- Position animations replaced with CSS transitions

---

## Shared Components

### Continue Button

Currently injected at the bottom of `#slide` via direct DOM manipulation after every answer. Replaced with a persistent Vue component.

**Component:** `ContinueButton.vue`

Requirements:

- Fixed position within the slide layout, not appended procedurally
- Hidden (not just invisible) until an answer is submitted
- Appears with a smooth transition (`--sf-transition-appear`) when shown
- Consistent position across all exercise types
- Styled with `--sf-color-primary` fill, dark text

```vue
<ContinueButton v-if="answered" @click="emit('continue')" />
```

### Correct/Incorrect Feedback

Beyond the button color change, every answered exercise shows a reinforcement moment.

Requirements:

- A brief animation on the answer button on submit (scale pulse on correct, shake on incorrect)
- A summary statement below the question after answering:
  - Correct: short positive reinforcement ("Correct!", "Well done!", varied)
  - Incorrect: encouraging tone ("Not quite — keep going", "Almost!")
  - Never punitive
- Animation duration: ≤400ms — fast enough not to slow the learning pace
- Intensity is controlled by a `skin.feedbackIntensity: 'low' | 'medium' | 'high'` value (groundwork for skinning PRD). Default: `'medium'`

---

## Mediator Integration

The existing mediator (the Vue component or TS class that controls slide progression) must:

1. Pass the current `SlideInterface` as a prop to the active exercise component
2. Listen for the `answer` emit and route to the existing `conclude()` / scoring logic
3. Listen for the `continue` emit and advance the slide
4. Pre-process image options before passing to exercise components: convert `<img src="...">` strings to `{ label: string, src: string }` objects

The mediator must not reach into exercise component internals. All state changes go through props and emits.

---

## Acceptance Criteria

### Phase 1 (mc/ma)

- [ ] MC/MA buttons use design token colors, not `#c5c5c5` or raw CSS keywords
- [ ] Correct/incorrect feedback uses a color transition, not an instant snap
- [ ] Buttons meet 44px minimum touch target height
- [ ] Image answer options render as image buttons, not raw `<img>` HTML
- [ ] No `innerHTML` injection in mc/ma rendering path
- [ ] Reinforcement statement appears after answering
- [ ] Continue button appears with transition after answering, consistent position

### Phase 2 (info)

- [ ] Info slide content renders in a dark-themed QCard
- [ ] No visual regression on AsciiDoc content

### Phase 3 (bool/select)

- [ ] Bool reuses ChoiceExercise with 2 options
- [ ] Select spans are interactive and themed consistently

### Phase 5 (gap)

- [ ] Gap tokens use `--sf-color-token-*` tokens (dark theme)
- [ ] No `#E6F1FB` or `#0C447C` in gap fill rendering
- [ ] GSAP removed from sort (replaced with CSS transitions + SortableJS)

### All phases

- [ ] TS business logic layer (`quiz/`, `slide/`, `slidetype/`) has zero Vue/Quasar imports
- [ ] All design values reference CSS custom properties, not hardcoded colors
- [ ] `skin.feedbackIntensity` prop accepted by feedback component (even if only `'medium'` is implemented now)

---

## Out of Scope for This PRD

- Stars, streaks, quests, milestone animations — Gamification PRD Sections 3–6
- Skinning system and skin file format — Gamification PRD Section 7
- Vocab spaced repetition — Gamification PRD Section 8.4
- Accessibility audit — to be done after conversion, not before
- `imap` exercise type — not mentioned in conversion sequence; treat as out of scope until scoped separately

---

## Open Questions

1. **Unified or separate components for mc/ma?** A `multiple` prop on one component is simpler; separate components are easier to diverge later. Recommend unified unless ma needs substantially different layout.
2. **Where does the reinforcement text live?** Inside each exercise component, or in a shared overlay managed by the mediator? Recommend inside the component for encapsulation.
3. **`imap` conversion timing?** Not in the original sequence. Needs scheduling.
