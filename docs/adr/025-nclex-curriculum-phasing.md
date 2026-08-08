---
title: "ADR-025: NCLEX-RN Curriculum Phasing — Atomic Primary Learning, Disposable Format Unit, Full-Depth Simulation"
status: "Accepted"
date: "2026-08-06"
relates_to: "PRD-004-ngn-exercise-types.md, PRD-005-nclex-rn-course-content.md, PRD-006-nclex-exam-simulation.md"
---

## Context

Real NCLEX-RN uses complex NGN item formats (matrix, bowtie, cloze, extended drag-and-drop, case-study clusters) that don't exist in SpoonFeeder today. Using them throughout primary learning would gate all NCLEX-RN content authoring on a large exercise-type framework epic (PRD-004) landing first.

## Alternatives Considered

- **Use NGN-format items throughout primary learning**, matching the real exam's format mix from the start. Rejected — introduces UI/format complexity as extraneous cognitive load while a learner is still mastering content, and blocks all content authoring on the full exercise-type epic finishing first.
- **Decompose every NGN item into separate atomic questions everywhere**, permanently (e.g. a matrix's rows become standalone MC questions with no unified presentation anywhere). Rejected as the sole approach — loses the format-familiarity value of practicing the actual exam presentation, and for bowtie/case-study specifically, loses the shared-scenario framing that is itself part of what's being tested.
- **Three-phase curriculum** (selected): primary learning uses only atomic types, one concept at a time, per SpoonFeeder's existing design principle; a dedicated NGN Item Formats unit, using deliberately elementary/disposable content, teaches the new formats' interaction mechanics in isolation; practice-exam simulation then uses the full aggregate/linked-group types at real clinical depth.

## Decision

NCLEX-RN content is phased into three stages:
1. **Primary learning** — atomic types only (`mc`, `ma`, `bool`, `gap`, `sort`, `vocab`, `imap`, `info`), full clinical depth, all 8 NCSBN subcategories.
2. **NGN Item Formats unit** — the new aggregate/linked-group types from PRD-004, disposable elementary content, format practice only.
3. **Practice-exam simulation** — aggregate/linked-group types, full clinical depth, standalone content.

## Rationale

Separates content mastery from format familiarity, avoiding extraneous cognitive load during primary learning while still giving learners dedicated, low-stakes practice with the real exam's interaction patterns before they matter for a timed simulation. It also decouples most content authoring (phase 1) from the exercise-type framework epic (PRD-004), since phase 1 needs no new types and can proceed immediately.

## Consequences

Phase 2's content is intentionally not representative of real exam difficulty or topic coverage — this must be documented clearly for anyone authoring or reviewing it, so it isn't mistaken for undertested primary content. Phase 3 content authoring is fully blocked on PRD-004 landing, and is authored independently of phase 1 (no shared content, per ADR-026) — some clinical topics may effectively be written twice by different authors, with no system-enforced consistency between the two versions.
