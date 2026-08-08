---
title: "TSK-006: NCLEX-RN Practice Exam & Timed Simulation Mode"
prd: "PRD-006-nclex-exam-simulation.md"
created: "2026-08-06"
status: "TODO"
---

## Setup

- [ ] **T-010** Confirm PRD-004 types are complete/available before starting simulation-mode-specific item authoring.

## Timed exam mode (new capability)

- [ ] **T-020** Timer/countdown mechanism in the quiz driver.
- [ ] **T-030** Auto-submit on expiry.
- [ ] **T-040** Exam-length configuration — fixed question count, mapping linked groups to their real per-item weight rather than counting each sub-item separately.
- [ ] **T-050** Score/report screen at exam completion.

## Practice exam content

- [ ] **T-060** Author standalone practice-exam questions per NCSBN subcategory, independent of PRD-005 content, using PRD-004's aggregate/linked-group types at full clinical depth.

## Validation

- [ ] **T-900** `yarn type-check` / `yarn lint` — 0 errors.
- [ ] **T-910** `yarn test:unit` — 0 failures.
- [ ] **T-920** `yarn test:e2e` — 0 failures, including a full timed-exam e2e run.
- [ ] **T-930** Differential replay snapshot comparison.
