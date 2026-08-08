---
title: "ADR-026: No Cross-Referencing Between Course Content Slides"
status: "Accepted"
date: "2026-08-06"
relates_to: "PRD-006-nclex-exam-simulation.md"
---

## Context

Practice-exam questions (PRD-006) conceptually overlap with primary-learning content (PRD-005) — a matrix or bowtie question in a practice exam may cover the same clinical concept as an existing atomic question elsewhere in the course. Building a mechanism for practice-exam content to reference or compose from primary-learning slides, rather than duplicating content by hand, was considered as a way to keep content DRY and avoid drift when source content is edited.

## Alternatives Considered

- **Add an explicit `id` field to `SlideInterface`** for stable cross-referencing. Rejected — course YAML is manually maintained across 20+ courses; manually keeping a synced ID scheme consistent has already been a source of problems for this project, and an ID field reintroduces that exact failure mode.
- **Reference by the existing `txt` field**, which already functions as a de facto unique key for save-data lookup (`saveData.ts`, `saveFile.ts` key off `isEqual(slide.txt, txt)`). Rejected — even without a new field, this requires authors to copy full (potentially multi-line AsciiDoc) question text verbatim into a reference field, and any wording edit silently breaks the link. Judged not meaningfully safer than the ID-field approach in practice.
- **No cross-referencing at all — standalone authoring only.** Selected.

## Decision

No slide, in any course or epic, references another slide's content. Every slide is authored with its full content inline, standalone — exactly how SpoonFeeder's course-authoring model already works today.

## Rationale

Given that course YAML is manually maintained and any synchronization scheme (ID-based or text-based) has already proven to be a maintenance liability for this project, the only reliably safe option is to not introduce cross-slide dependencies at all. This keeps the course-loading pipeline unchanged — no new resolution/lookup pass, no new failure mode around dangling or drifted references.

## Consequences

Content that conceptually overlaps between primary learning and practice exams (or anywhere else) must be authored twice, independently, with no system-enforced consistency. Keeping such content aligned — or deliberately letting it diverge — is a content-authoring/process concern, not something the platform tracks or validates. `txt` uniqueness within a course remains an unenforced but load-bearing assumption for save-data lookup, independent of this decision; it is not addressed here.
