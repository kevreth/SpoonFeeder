---
title: "TSK-005: NCLEX-RN Course — Primary Learning Content & NGN Format Unit"
prd: "PRD-005-nclex-rn-course-content.md"
created: "2026-08-06"
status: "TODO"
---

## Setup

- [ ] **T-010** Scaffold `src/courses/nclex-rn/course.yml` and directory structure per existing course conventions.
- [ ] **T-020** Confirm PRD-004 dependency status before starting the NGN Item Formats unit specifically — every other unit below is unblocked immediately.

## Safe and Effective Care Environment

- [ ] **T-030** Management of Care unit — original content, atomic types only.
- [ ] **T-040** Safety and Infection Control unit — original content, atomic types only.

## Health Promotion and Maintenance

- [ ] **T-050** Unit content — original, atomic types only.

## Psychosocial Integrity

- [ ] **T-060** Unit content — original, atomic types only.

## Physiological Integrity

- [ ] **T-070** Basic Care and Comfort unit.
- [ ] **T-080** Pharmacological and Parenteral Therapies unit.
- [ ] **T-090** Reduction of Risk Potential unit.
- [ ] **T-100** Physiological Adaptation unit.

## Reference material

- [ ] **T-110** Lab-values reference slides.
- [ ] **T-120** Dosage-calculation practice slides.

## NGN Item Formats unit (depends on PRD-004)

- [ ] **T-130** Author disposable elementary examples for each PRD-004 type: extended SATA, bins, cloze-text, cloze-table, matrix-single, matrix-multi, bowtie, case-study cluster.
- [ ] **T-140** Orientation/explanatory slides (`info` type) framing the unit's purpose for the learner.

## Validation

- [ ] **T-900** `yarn type-check` / `yarn lint` — 0 errors.
- [ ] **T-910** `yarn test:unit` — 0 failures.
- [ ] **T-920** `yarn test:e2e` full-course smoke run — 0 failures.
- [ ] **T-930** Human content-accuracy review sign-off (non-engineering gate).
