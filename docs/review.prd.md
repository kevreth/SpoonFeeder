---
title: "SpoonFeeder Review System — PRD"
---

# SpoonFeeder Review System — PRD

## 1. Overview

A review system that automatically generates quiz sessions from existing course exercises at lesson, unit, and course boundaries. Reviews can also be launched on demand at any time. The system samples exercises with priority toward previously wrong answers, persists only aggregate scores, and requires no changes to course YAML files.

---

## 2. Goals

- Reinforce learning by periodically presenting exercises from completed content
- Surface weak areas automatically (wrong answers are weighted higher in exercise selection)
- Keep reviews short at the lesson and unit level; comprehensive at the course level
- Persist scores without duplicating per-exercise answer data into a separate store
- Work entirely offline — all questions come from content already loaded in the browser

---

## 3. Non-Goals

- AI-generated questions
- Server-side storage or sync
- Instructor analytics
- Cross-device progress
- Spaced repetition scheduling (future release)
- Exporting review scores
- Per-exercise review history

---

## 4. Terminology

| Term | Definition |
|---|---|
| **Scope** | A content boundary a review covers: a specific lesson, a specific unit, or the full course |
| **Focused review** | Covers only the exercises belonging to the current lesson or unit |
| **Cumulative review** | Covers all exercises from the start of the course through the end of the current scope |
| **Review session** | One run through a sampled set of review exercises |
| **ReviewRecord** | The persisted outcome of one completed session: scope, type, score, date |
| **Boundary** | The position in the slide sequence where a lesson, unit, or the course ends |
| **Boundary map** | A lookup structure built at course-load time that maps slide indices to scope boundaries |

---

## 5. User Stories

1. As a learner finishing a lesson, I see a prompt offering a short review of that lesson's exercises, which I can accept or skip.
2. As a learner finishing a unit, I see a prompt offering a focused unit review or a cumulative review of all content so far, which I can accept or skip.
3. As a learner finishing the course, I see a prompt offering a comprehensive review of all course exercises.
4. As a learner, I can access a Reviews menu at any time to launch a review for any scope I have already passed through.
5. As a learner, I can see my most recent score for any previously reviewed scope.

---

## 6. Review Types

### 6.1 Focused Review
Draws exercises exclusively from the current scope (one lesson's exercises, or one unit's exercises across all its lessons).

### 6.2 Cumulative Review
Draws exercises from the entire course up to and including the end of the current scope.

Both types are offered at every automatic lesson and unit boundary prompt. The user selects which one to take, or skips.

At the **course boundary**, focused and cumulative are identical (the scope is the whole course), so only one option is presented: "Review the full course."

---

## 7. Sample Sizes

| Scope | Sample size |
|---|---|
| Lesson | 5 |
| Unit | 10 |
| Course | All reviewable exercises (no cap) |

If fewer exercises are available than the target sample size, all available exercises are used.

A review prompt is **not shown** when a scope contains zero reviewable exercises (e.g., a lesson composed entirely of info slides).

---

## 8. Automatic Trigger Points

### 8.1 When Prompts Appear

The mediator detects a boundary crossing after each slide advance using the boundary map. A `ReviewPrompt` is displayed when the user completes the last exercise slide before a lesson, unit, or course boundary — specifically, before the title slide injected by `JsonProcessor` at the start of the next scope, or at the end of the last slide in the course.

### 8.2 Prompt Content

Question counts shown in prompts are the **actual computed counts** (capped at the sample size, but possibly lower if the scope has fewer reviewable exercises than the target). The counts are computed before the prompt is displayed.

**Lesson boundary prompt** (when scope has ≥ 1 reviewable exercise):
> "Lesson [N] — [Name] complete."
> - [ ] Review this lesson ([X] questions)
> - [ ] Review all content so far ([Y] questions)
> - [ ] Skip

**Unit boundary prompt** (when scope has ≥ 1 reviewable exercise):
> "Unit [N] — [Name] complete."
> - [ ] Review this unit ([X] questions)
> - [ ] Review all content so far ([Y] questions)
> - [ ] Skip

**Course boundary prompt**:
> "Course complete."
> - [ ] Review the full course ([N] questions)
> - [ ] Skip

### 8.3 Boundary Sequencing

When the user completes the last lesson of a unit, two prompts appear sequentially:
1. Lesson boundary prompt (accepted or skipped)
2. Unit boundary prompt (accepted or skipped)

When the user completes the last unit of the course, two prompts appear sequentially:
1. Unit boundary prompt (accepted or skipped)
2. Course boundary prompt (accepted or skipped)

In the extreme case of a single-lesson, single-unit course, three prompts would appear at the end (lesson → unit → course). This is correct behavior.

Prompts are not merged or skipped based on what preceding prompts were shown.

---

## 9. Unlocking

Reviews are gated. A scope is **locked** until the user completes it; a locked scope cannot be launched from `ReviewMenu` and its automatic prompt is not shown.

### 9.1 Completion Criteria

| Scope | Completed when |
|---|---|
| Lesson | The user has crossed the lesson boundary — i.e., advanced to the slide that begins the next lesson, next unit, or the course end |
| Unit | The user has crossed the unit boundary — i.e., advanced to the slide that begins the next unit or the course end |
| Course | The user has crossed the course boundary — i.e., reached and advanced past the final slide of the course |

Completion is determined from the boundary map. A scope is complete when the user's highest reached slide index is ≥ the boundary's slide index.

Answering exercises is not required for completion; progressing through the content is sufficient. This matches how the automatic prompt is triggered.

### 9.2 Effect on Automatic Prompts

Automatic prompts are inherently gated — they appear only when the boundary is crossed — so the unlocking rule adds no additional logic to the prompt flow.

### 9.3 Effect on ReviewMenu

`ReviewMenu` shows **all** lesson, unit, and course scopes defined in the course. Scopes the user has not yet completed are displayed but marked as locked (visually disabled; launch buttons absent). Completed scopes show their most-recent score (if any) and are launchable.

This lets learners see the full structure of the course and the reviews ahead of them, without granting access before the content is finished.

---

## 10. User-Initiated Reviews

A **Reviews** entry in the course navigation UI (always visible, implementation location determined during Vue development) opens `ReviewMenu`. For each completed scope, the user can choose **focused** or **cumulative** and launch a session. These options are the same as those offered in the automatic prompt. The user's most recent score for that scope and a count of how many times it has been reviewed are shown alongside the scope name.

Locked scopes are visible in the menu but not launchable (see §9.3).

---

## 10. Exercise Types

### 10.1 Included in Reviews

| Type | Notes |
|---|---|
| `mc` | Used as-is |
| `ma` | Used as-is |
| `gap` | Used as-is |
| `sort` | Used as-is |
| `bool` | Used as-is |
| `select` | Used as-is |
| `vocab` | Converted to MC (see §11) |

### 10.2 Excluded from Reviews

| Type | Reason |
|---|---|
| `imap` | Image map interaction requires original image context |
| `info` | Not an exercise |

---

## 11. Vocab-to-MC Conversion

Vocab exercises are converted to fresh MC questions at review-session generation time. This conversion is separate from the existing `Vocab.setProperties()` expansion used during the main course.

### 11.1 Question Direction

The **term is the prompt**; the **definition is the correct answer**. This is the reverse of the main-course vocab direction (which shows the definition and asks for the term). The distinction keeps review questions perceptually fresh.

### 11.2 Number of Questions Generated

`⌈n/5⌉` questions are generated per vocab exercise, where n is the number of entries in `list`.

| n | Questions |
|---|---|
| 1–3 | Skipped (insufficient for 3 distractors — see §11.3) |
| 4 | 1 |
| 5 | 1 |
| 6–10 | 2 |
| 11–15 | 3 |

### 11.3 Minimum List Size

A vocab exercise is skipped entirely if `list.size < 4`. At least 4 entries are required to form one valid question (1 correct definition + 3 distractor definitions).

### 11.4 Synthetic Slide Structure

Each generated question is a synthetic `SlideInterface` with:
- `type`: `'mc'`
- `txt`: the term string (e.g., `"active"`)
- `ans`: the term's definition (e.g., `"something that is currently in use"`)
- `o`: an array of four definitions — the correct definition plus three randomly selected definitions from other entries in the same list, shuffled

`txt` is set to the term string. This does not conflict with main-course `SaveData`, which keys vocab entries by definition string.

### 11.5 Term Selection

Terms are selected randomly without replacement across the questions generated from a single vocab exercise. For example, a 10-term list generates 2 questions using 2 distinct terms.

### 11.6 Distractor Selection

For each question, 3 distractor definitions are drawn randomly without replacement from the definitions of the remaining terms in the same list. Definitions are assumed to be unique within a list.

### 11.7 Shuffling

Review vocab question generation always shuffles options and selects terms randomly, independent of the course-wide `RANDOM` flag. The app `Rng` is used.

### 11.8 Wrong-Answer Weighting Not Available for Vocab

Main-course vocab slides store `SaveData` entries keyed by **definition** (the question text used in the main-course direction). Review vocab-to-MC questions are keyed by **term**. These keys do not overlap, so no main-course save record maps to a review vocab question. All synthesized vocab-to-MC slides fall into the Unanswered bucket during exercise selection (§12, step 3).

---

## 12. Exercise Selection Algorithm

Given a pool of raw `SlideInterface` exercises (from a scope) and the current `SaveData[]`:

1. **Expand vocab**: Apply the vocab-to-MC conversion (§11) to any `vocab` exercises in the pool. Other types are used as-is.
2. **Filter**: Retain only types listed in §10.1. Discard everything else.
3. **Classify** each exercise into one of three buckets:
   - **Wrong**: the slide's `txt` is in `SaveData`, and evaluating the saved result against `slide.ans` produces at least one incorrect response
   - **Correct**: the slide's `txt` is in `SaveData`, and all responses are correct
   - **Unanswered**: the slide's `txt` is not in `SaveData` — includes all synthesized vocab-to-MC slides, which are never keyed in `SaveData`
4. **Shuffle** each bucket independently using the app `Rng`.
5. **Fill** the sample sequentially: Wrong → Unanswered → Correct, until the target sample size is reached or all exercises are exhausted.
6. **Shuffle** the final sample before presenting.

Wrong-answer classification reuses the `ScoreProcessor.exercise()` pattern: load the saved result into the slide via `slide.setResults()`, then call `slide.evaluate()`.

---

## 13. Review Session Behavior

### 13.1 Navigation

Review sessions are **forward-only**. The user cannot navigate back to a previous review slide.

### 13.2 Per-Slide Behavior

Each review slide is rendered using the existing slide rendering pipeline (same components and evaluation logic as the main course). The user submits an answer and sees the immediate evaluation (correct/incorrect) and explanation if one exists, then advances.

Review slides **do not write to course `SaveData`**. The session uses a standalone in-memory flow controller (not the main course `Quiz` / `stateActionDispatcher`). Results are accumulated in Vue reactive state for the duration of the session. The flow controller must not call `slide.saveData()` at any point; it collects results directly from `slide.evaluate()` after the user submits an answer.

### 13.3 In-Progress Persistence

Review session state is written to storage after every slide advance (including after the user submits their answer to the current slide). This ensures a page refresh does not discard work in progress.

The persisted state includes:
- `scopeKey`, `scopeLabel`, `reviewType`
- The ordered list of slides for this session in serialized form (see §14.3)
- The index of the current slide (the next unanswered slide)
- The results collected for slides already answered

### 13.4 Abandonment and Resume

On course load, if a draft session exists in storage for the current course, the user is offered two options:
> "You have an unfinished review of [scopeLabel]. Resume or discard?"
> - [ ] Resume
> - [ ] Discard

Selecting **Resume** restores the session from the stored state and continues from the current slide index.

Selecting **Discard** clears the draft session from storage and proceeds with normal course navigation. No `ReviewRecord` is written.

If the user explicitly quits a session mid-way using a "Quit review" control inside `ReviewSession.vue`, the draft session is cleared from storage and no `ReviewRecord` is written.

Only one draft session exists at a time per course. Starting a new review (from a prompt or the menu) overwrites any existing draft.

### 13.5 Score Summary

On completing all slides, a summary screen displays:
> "X out of Y correct (Z%)"

The user can return to the course from this screen. At this point:
1. The draft session key is cleared from storage.
2. The `ReviewRecord` is appended to the course review history.

---

## 14. Storage

### 14.1 Completed Session: ReviewRecord

```typescript
interface ReviewRecord {
  scopeKey: string;        // stable identifier — see §14.4
  scopeType: 'lesson' | 'unit' | 'course';
  unitIndex: number;       // zero-based index of the unit in course.yml
  unitName: string;        // e.g. "Introduction"
  lessonIndex?: number;    // present for lesson-scope reviews
  lessonName?: string;     // e.g. "Prerequisites"
  reviewType: 'focused' | 'cumulative';
  date: number;            // Unix timestamp (ms) from Clock.now()
  correct: number;
  total: number;
}
```

`scopeKey` remains as a compact query key. The explicit `unitName`/`lessonName` fields are the human-readable record of exactly what content the review covered, independent of any future reordering of course YAML.

Stored under key `reviews_<courseName>` as `ReviewRecord[]` (append-only). Schema: `ReviewRecordArraySchema` (Zod), registered in `spoonfeederSchemas.ts`.

### 14.2 In-Progress Session: ReviewDraftState

```typescript
interface SerializedSlide {
  // For slides from the course (mc, ma, gap, sort, bool, select):
  sourceTxt: string;          // the slide's txt — used to look up the live SlideInterface
  // For synthesized vocab-to-MC slides:
  vocabTerm?: string;         // the term (becomes txt of the synthetic slide)
  vocabAns?: string;          // the correct definition
  vocabOptions?: string[];    // all four options in shuffled display order
}

interface SlideResult {
  slideTxt: string;           // txt of the answered slide
  correct: number;            // number of correct responses (≥ 0)
  total: number;              // total responses expected (≥ 1)
}

interface ReviewDraftState {
  scopeKey: string;
  scopeType: 'lesson' | 'unit' | 'course';
  unitIndex: number;
  unitName: string;
  lessonIndex?: number;
  lessonName?: string;
  reviewType: 'focused' | 'cumulative';
  slides: SerializedSlide[];  // full ordered session, fixed at session start
  currentIndex: number;       // index of the next unanswered slide
  results: SlideResult[];     // one entry per answered slide, in order
}
```

Stored under key `review_draft_<courseName>` in localStorage via `StorageAdapter`. Overwritten after every slide advance. Cleared on session completion or explicit discard. Schema: `ReviewDraftStateSchema` (Zod), registered in `spoonfeederSchemas.ts`.

Non-vocab slides are reconstructed on resume by looking up `sourceTxt` in the live `Course` tree (which is always re-loaded on page load). Vocab-to-MC slides are reconstructed entirely from the stored `vocabTerm`, `vocabAns`, and `vocabOptions` fields — no re-randomization occurs.

### 14.3 Storage Keys Summary

| Key | Content | Lifecycle |
|---|---|---|
| `reviews_<courseName>` | `ReviewRecord[]` — completed sessions | Append-only; never cleared |
| `review_draft_<courseName>` | `ReviewDraftState` — one in-progress session | Written per slide advance; cleared on completion or discard |

### 14.4 Scope Key Format

| Scope | Key format | Example |
|---|---|---|
| Lesson | `u{unitIndex}_l{lessonIndex}` | `u0_l2` |
| Unit | `u{unitIndex}` | `u1` |
| Course | `course` | `course` |

Indices are zero-based, matching the order in `course.yml`.

### 14.5 History Display

`ReviewMenu` shows, for each scope: the most recent score ("8/10 — 80%") and the number of times reviewed ("3 reviews"). Full per-session history is not shown in v1.

---

## 15. Architecture

### 15.1 New TypeScript Module: `src/ts/main/review/`

| File | Responsibility |
|---|---|
| `reviewTypes.ts` | `ReviewRecord`, `ReviewDraftState`, `SerializedSlide`, `SlideResult`, `ReviewScope`, `ScopeType` types |
| `reviewExtractor.ts` | `DivisionProcessor` that walks the `Course` tree and produces the boundary map; on-demand pool extraction for a given scope |
| `reviewSelector.ts` | Vocab-to-MC conversion, type filtering, wrong-answer classification, bucket sampling, serialization of the sampled slide list to `SerializedSlide[]` |
| `reviewStorage.ts` | Append `ReviewRecord`; read/write/clear `ReviewDraftState`; fetch most-recent record per scope; reconstruct live slides from `SerializedSlide[]` using the Course tree |
| `index.ts` | Barrel export |

### 15.2 `mediator.ts` Changes

On course load, after `ProcessJson.processJson()` produces the flat `SlideInterface[]`, the mediator calls `reviewExtractor` to produce a **boundary map**: `Array<{ slideIndex: number; scopeKey: string; scopeType: 'lesson' | 'unit' | 'course'; unitIndex: number; unitName: string; lessonIndex?: number; lessonName?: string }>` marking where each boundary falls in the flat array. The boundary map is computed eagerly at course-load time and is small (one entry per lesson/unit/course boundary).

The mediator tracks the user's **highest reached slide index** (persisted to session storage so it survives page refresh). A scope is unlocked when `highestReachedIndex >= boundary.slideIndex` for that scope's entry in the boundary map.

Exercise pools are **not** precomputed at course-load time. When the user accepts a review (from a prompt or the menu), `reviewSelector` walks the `Course` tree on demand to collect and sample exercises for the requested scope. This avoids holding large pool arrays in memory for courses with many lessons and units.

After each slide advance, the mediator checks whether the new index matches a boundary in the map. If so, it sets reactive state (`pendingReviews: ReviewScope[]`) that causes `ReviewPrompt` to render. Multiple boundaries at the same position (e.g., last lesson of last unit) produce multiple entries and therefore multiple sequential prompts.

### 15.3 New Vue Components

| Component | Description |
|---|---|
| `ReviewPrompt.vue` | Interstitial shown at automatic boundaries; presents focused, cumulative, and skip options; emits an event to launch a `ReviewSession` or dismiss |
| `ReviewSession.vue` | Runs a review session; renders each slide in sequence; accumulates results in reactive state; shows score summary on completion; emits a `ReviewRecord` to be persisted |
| `ReviewMenu.vue` | Lists all passed-boundary scopes with most-recent scores and review counts; allows launching a focused or cumulative session for any scope |

`ReviewPrompt` is displayed as an overlay/modal that blocks course navigation while visible. It is dismissible via Skip.

### 15.4 Storage Schema Changes

`spoonfeederSchemas.ts` registers two keys dynamically when the course loads (same pattern as the per-course save data key):
- `reviews_<courseName>` → `ReviewRecordArraySchema`
- `review_draft_<courseName>` → `ReviewDraftStateSchema`

---

## 16. Boundary Map Construction

The boundary map is built by a second pass over the `Course` tree (not the flat slide array) using a counting `DivisionProcessor`. This processor tracks the cumulative slide count as it visits each node — matching the title-slide injection logic of `JsonProcessor` — and records the slide index at each `lesson_end` and `unit_end` callback (and `course_end` for the course boundary).

The resulting boundary map is a deterministic function of the course structure and requires no DOM access or async I/O.

---

## 17. Implementation Phases

### Phase A — TypeScript Core (no Vue)
- `reviewTypes.ts`
- `reviewExtractor.ts` (Course tree walker + boundary map producer)
- `reviewSelector.ts` (vocab conversion + selection algorithm)
- `reviewStorage.ts`
- Unit tests for all four modules

### Phase B — Automatic Triggers
- Boundary map integration in `mediator.ts`
- `ReviewPrompt.vue`
- `ReviewSession.vue` (minimal: forward-only slide flow, in-memory scoring, summary screen)
- `ReviewRecord` persistence on session complete

### Phase C — User-Initiated Reviews
- `ReviewMenu.vue`
- Navigation entry point in the existing UI
- Score history display in `ReviewMenu`

---

## 18. Out of Scope (v1)

- Spaced repetition scheduling
- Review scores appearing in the main course summary/score screen
- Per-exercise answer history within a review
- Cross-scope reviews (mixing content from non-adjacent units)
- Review notifications or reminders
- Export of review data
