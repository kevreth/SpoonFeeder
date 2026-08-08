---
title: "PRD-006: NCLEX-RN Practice Exam & Timed Simulation Mode"
repo: "spoonfeeder/SpoonFeeder"
created: "2026-08-06"
status: "Active"
priority: "Medium — depends on PRD-004; benefits from PRD-005 being underway"
---

## Problem

SpoonFeeder has no timed or simulated-exam delivery mode. Real NCLEX-RN test prep requires practice under exam-like conditions — timed, using the actual NGN item formats — in addition to content mastery.

## Scope

**In scope:**
- A timed/simulated exam mode — a new capability; SpoonFeeder does not currently support timing.
- Standalone practice-exam question content, authored independently of PRD-005's primary-learning content (no cross-referencing — see ADR-026), using PRD-004's aggregate/linked-group types at full clinical depth (not the disposable difficulty of PRD-005's NGN Item Formats unit).
- Exam-length/item-count accounting that treats a linked group (e.g. a 6-item case-study cluster) as the appropriate number of scored items relative to real NCLEX exam structure, rather than counting each sub-item as a separate exam question.

**Out of scope:**
- New exercise types (PRD-004 dependency).
- Adaptive/CAT-style item-difficulty selection. Explicitly deferred — this epic targets fixed-length timed simulation, not true computerized-adaptive testing. Flag as a candidate future epic if desired.

## Success Criteria

- A learner can start a timed practice exam, answer a fixed-length set of questions spanning both atomic and aggregate/linked-group types, and receive a score/report within the time limit or upon early submission.
- Practice-exam content covers all 8 NCSBN subcategories, authored independently of PRD-005's primary-learning content.
- No course-loader reference/lookup mechanism is introduced anywhere in this epic (consistent with ADR-026).

## Testing

- Unit tests for the timing mechanism (start, countdown, auto-submit on expiry).
- e2e coverage for a full timed practice-exam run, including at least one linked-group item.
- Differential replay snapshot comparison to confirm timed-mode save/score data doesn't corrupt or unexpectedly diverge from the existing storage schema.
