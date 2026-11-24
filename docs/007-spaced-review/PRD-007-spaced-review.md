---
title: "PRD-007: Spaced Review — Per-Exercise Scheduling & Due Reviews"
repo: "spoonfeeder/SpoonFeeder"
created: "2026-11-24"
status: "Active"
priority: "Medium — extends the shipped review system (ADR-018); independent of PRD-005/006"
---

## Problem

SpoonFeeder's review system (`docs/review.prd.md`, ADR-018) samples exercises at lesson, unit and course boundaries, weighting previously wrong answers. It has no concept of *when* an item should next be reviewed. Retention depends on the learner choosing to open the Reviews menu, and on boundary prompts that only appear once, at the moment a scope is completed.

CTX-002 grounds Axis 2 (consolidation) in successive relearning (Rawson & Dunlosky), which requires retesting the same atomic fact at spaced intervals until it is durable. Today SpoonFeeder implements the retesting but not the spacing. The original review PRD explicitly deferred this ("Spaced repetition scheduling (future release)", and "Per-exercise review history" as a non-goal). This epic delivers that deferred release.

## Scope

**In scope:**
- A per-exercise schedule: each reviewable exercise has a box (interval level) and a due date, stored locally per course.
- Schedule updates driven by answer correctness. This covers answers given in review sessions and the learner's first answer in the main course.
- A new **Due** review scope in `ReviewMenu` that samples only exercises whose due date has passed, most overdue first.
- A due-count indicator so the learner can see how many items are waiting, both in `ReviewMenu` and on the course entry point.
- Supersession of the two review-PRD non-goals named above. `docs/review.prd.md` is updated to point to this PRD.

**Out of scope:**
- Learner self-rating of recall confidence (see "Rating-based vs. correctness-based scheduling" below).
- FSRS, SM-2 or any parameter-fitted algorithm. v1 uses a fixed interval ladder.
- Notifications, reminders, or calendar integration.
- Cross-device sync or any server-side storage (ADR-004, zero-backend).
- Anki or other flashcard export.
- AI-generated questions or adaptive difficulty.
- Changes to course YAML. No new fields, no IDs, no references (ADR-026).
- Per-module mastery dashboards. The schedule data enables these, but displaying them is a follow-up epic.

## Design

### Schedule model

Each tracked exercise has an entry:

```typescript
interface ScheduleEntry {
  key: string;        // stable exercise identifier — see "Keying"
  box: number;        // 0 (new/lapsed) … 5 (top)
  due: number;        // Unix ms of the local-day start on or after which it is due
  lastSeen: number;   // Unix ms of last answer
  streak: number;     // consecutive correct answers (resets on a wrong answer)
}
```

Stored under `srs_<courseName>` as `Record<string, ScheduleEntry>` (Zod schema registered in `spoonfeederSchemas.ts`, per ADR-003). Review sessions and `SaveData` are not modified. All time comes from the injected `Clock` (ADR-011), never `Date.now()`.

### Interval ladder

| Box | Interval until due after a correct answer |
|---|---|
| 0 → 1 | 1 day |
| 1 → 2 | 3 days |
| 2 → 3 | 7 days |
| 3 → 4 | 14 days |
| 4 → 5 | 30 days |
| 5 (stays) | 60 days |

- **Correct:** `box = min(box + 1, 5)`, `streak += 1`, `due` = next-box interval from today.
- **Incorrect:** `box = 0`, `streak = 0`, `due` = today (eligible for the very next due review). Dropping to 0 rather than demoting one box follows the retest-to-criterion rationale in CTX-002: a missed item restarts its climb.
- Multi-response exercises (`gap`, `ma`, `sort`, matrix types) count as correct only if every response is correct, matching the existing wrong-answer classification (`evaluation.correct === evaluation.responses`).
- A box-5 entry with `streak ≥ 2` at box 5 is considered **mastered** for display purposes. Mastery has no gating effect on anything in v1.

Intervals are a constant table in one module so a later epic can tune or replace it without touching callers.

### Keying

The schedule key is the exercise's `txt`, already the unique identifier for `SaveData` (see CLAUDE.md, "SlideInterface Fields"). Consequences, all accepted:
- Editing an exercise's `txt` orphans its entry; a new entry starts at box 0. Orphans are pruned on course load by comparing keys against the loaded Course tree.
- Vocab: review sessions convert `vocab` lists to synthetic `mc` items keyed by term, while main-course vocab saves are keyed by definition (review PRD §11.8). Scheduling uses a distinct namespaced key, `vocab:<term>`, per term, so each term is scheduled independently and never collides with a `SaveData` key.
- Exercise types not reviewable under the review PRD §10 (`imap`, `info`) are never scheduled.

### Sources of schedule updates

1. **Review sessions:** after each answered slide, apply the correct/incorrect rule to that slide's key. Applying per answered slide (not at session completion) means a quit or refresh does not discard scheduling work. Resuming a draft continues at `currentIndex`, so no slide is applied twice.
2. **First main-course answer:** the first time a reviewable exercise is answered in the main course and has no schedule entry, create one (correct → box 1 with a 1-day interval; incorrect → box 0, due today). Later main-course re-answers do not alter the schedule, so the schedule reflects retrieval over time, not replays of the lesson.
3. **Lazy seeding for existing learners:** on first load after this feature ships, exercises with an existing `SaveData` record but no schedule entry are seeded as in (2), using the saved result's correctness and a `lastSeen` of the save's timestamp if available, otherwise today. This avoids discarding existing progress.

### Due review

- Pool: every scheduled entry with `due ≤ today` and a matching live exercise. Unlocking rules in the review PRD §9 still apply: only exercises from completed scopes can appear.
- Selection: sorted by most overdue first, ties broken randomly (app `Rng`). Default sample size 10, capped at 20. This replaces the bucket-fill algorithm only for the Due scope; focused and cumulative reviews are unchanged.
- Delivery uses the existing review session pipeline (`ReviewSession.vue`, draft persistence, forward-only navigation, no writes to course `SaveData`).
- Completion appends a `ReviewRecord` with a new `scopeType: 'due'` and `scopeKey: 'due'`. The Zod schema is extended accordingly. `ReviewMenu` displays Due's last score and review count like any other scope.
- When nothing is due, the Due entry is shown disabled with the next due date.
- Due reviews follow the same tone constraint as all feedback: encouraging, never punitive (`docs/prd.gamification.md`). Lapsed items are described as "ready for another look", not "overdue".

### Rating-based vs. correctness-based scheduling

An external tutoring system examined during this work (see Future Considerations) lets learners rate recall and uses the rating to pick the next review date. This epic deliberately derives scheduling from correctness only. SpoonFeeder's exercises are auto-graded, so a self-rating adds friction and subjectivity to a signal the app already has. A confidence-rating extension can be revisited if learners report the fixed ladder feels wrong.

## Success Criteria

- Answering a reviewable exercise correctly in a review session advances its box and due date per the ladder; answering incorrectly resets it to box 0 and due today.
- A Due review contains only items whose due date has passed, ordered most overdue first, capped at 20, and never includes items from locked scopes.
- Quitting or refreshing mid-session preserves schedule updates for already-answered slides, and resuming never double-applies a slide.
- Existing learners with prior `SaveData` see due items on first load after upgrade without losing any data.
- Editing course content so an exercise's `txt` changes leaves no orphan entries after the next course load.
- No change to course YAML, `SaveData` shape, or the no-cross-referencing constraint (ADR-026).
- Differential replay snapshot comparison shows the only storage change is the new `srs_<courseName>` key and the extended review-record schema.
- `make` passes locally: lint, type-check, unit tests and coverage.

## Testing

- Unit tests for the interval ladder: every box transition on correct and incorrect, multi-response exercises, ladder-cap behavior, and mastery flag.
- Unit tests for key derivation, including vocab namespacing and exclusion of non-reviewable types.
- Unit tests for Due selection: overdue ordering, tie randomization via a seeded `Rng`, the 20-item cap, locked-scope exclusion, and an empty pool.
- Unit tests for lazy seeding from existing `SaveData` and for orphan pruning.
- Unit tests for schedule persistence: Zod validation, corrupt-data fallback, and idempotence on draft resume.
- Fake-clock tests (ADR-001, ADR-011) for local-day boundaries, including across midnight and daylight-saving transitions.
- Component tests for `ReviewMenu` Due entry states (due, none due, locked) and the due-count indicator.
- e2e coverage of a full Due review: answer correctly and incorrectly, reload, confirm the due count and the next-due date change as expected.
- Differential replay snapshot (ADR-015) taken before and after to confirm only the intended storage keys changed.

## Future Considerations

- **DeepTutor (HKUDS/DeepTutor, https://github.com/HKUDS/DeepTutor)** — an LLM-driven personalized tutoring platform, compared against SpoonFeeder during the planning of this epic. Its direct-pedagogy features overlap with this PRD (a question bank with recall-rated review dates, mastery paths with per-topic mastery evidence, weak-area review) and those informed this design. Most of the rest depends on LLMs or a server and conflicts with SpoonFeeder's authored, offline, explicit-instruction approach. It is worth examining again later for further ideas, in particular:
  - how its mastery gate and mastery-evidence rules work, as input to a per-module mastery dashboard;
  - how its question generation and scoring work, which were not documented in the sources reviewed;
  - Anki export from notebook flashcards;
  - whether its `SKILL.md` skills system could assist course authoring (a possible input to the forthcoming course-creator's guide referenced in CTX-002).

  The comparison used the README (partially summarized) and the landing page only. The documentation site (docs.deeptutor.info) and the source code were not examined.
- Per-module mastery view built on schedule data.
- Tuning or replacing the fixed ladder (for example with FSRS) once real usage data exists.
- Optional learner confidence rating.
- Flashcard export for `vocab` and `gap` items.
