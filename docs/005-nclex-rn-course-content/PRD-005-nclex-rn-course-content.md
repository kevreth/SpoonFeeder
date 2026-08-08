---
title: "PRD-005: NCLEX-RN Course — Primary Learning Content & NGN Format Unit"
repo: "spoonfeeder/SpoonFeeder"
created: "2026-08-06"
status: "Active"
priority: "High"
---

## Problem

No SpoonFeeder course currently covers NCLEX-RN. The objective is a full-featured test-prep package comprehensive enough that a learner needs nothing else — full coverage of the NCSBN test plan, at real depth, without relying on copyrighted test-prep material.

## Scope

**In scope:**
- A new course (`src/courses/nclex-rn/`) covering all 4 top-level NCSBN Client Needs categories and their 8 subcategories, using only SpoonFeeder's existing atomic exercise types (`mc`, `ma`, `bool`, `gap`, `sort`, `vocab`, `imap`, `info`) — no aggregate/linked-group types here (see ADR-025 on phasing).
- A dedicated "NGN Item Formats" unit, positioned after primary-content mastery and before practice exams, teaching the interaction mechanics of PRD-004's 6 new format types using deliberately elementary, disposable example content — not required to be exam-representative or clinically deep (see ADR-025).
- Original reference material: lab-value tables, dosage-calculation practice, common mnemonics.

**Out of scope:**
- Any adaptation of copyrighted third-party test-prep material (see ADR-024).
- Practice-exam content and timed/simulated delivery (PRD-006).
- Any reference or link between this course's content and PRD-006's practice-exam content (see ADR-026) — independent authoring only, duplication accepted where topics overlap.
- New exercise-type engineering — PRD-004 is a dependency for the NGN Item Formats unit only; every other unit in this course needs no new types and can proceed immediately.

## Content sourcing

All content is either (a) structured against NCSBN's publicly published NCLEX-RN test plan — category/subcategory definitions and weighting, which is public exam-format documentation, not copyrighted item content — or (b) written originally, referencing public clinical/nursing-practice guidelines. No copyrighted test-prep publisher content is adapted, reworded, or otherwise derived from. See ADR-024.

## Content coverage

NCSBN Client Needs categories, each requiring full-depth original content:

| Category | Subcategories |
|---|---|
| Safe and Effective Care Environment | Management of Care; Safety and Infection Control |
| Health Promotion and Maintenance | — |
| Psychosocial Integrity | — |
| Physiological Integrity | Basic Care and Comfort; Pharmacological and Parenteral Therapies; Reduction of Risk Potential; Physiological Adaptation |

## Success Criteria

- All 8 subcategories have original content at a depth comparable to commercial prep-course coverage (structure/weighting comparable to NCSBN's published test-plan percentages).
- The NGN Item Formats unit exercises all 6 new PRD-004 types (plus bowtie and case-study cluster) at least once each.
- Zero content items traceable to a specific copyrighted publisher's item bank.
- The course loads and plays through `quasar dev` / `COURSE=nclex-rn` without errors; save/score behavior verified against the existing `dataaccess` layer.

## Testing

- `yarn test:unit` coverage for any course-loading edge cases specific to this course's content shape.
- Manual/e2e smoke run of the full course via Cypress, confirming every unit (including the NGN Item Formats unit) completes and scores correctly.
- Content-accuracy review (human, nursing-domain) — out of engineering scope but required as a non-engineering gate before this epic is marked Complete.
