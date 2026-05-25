---
title: "ADR 014 — Patch Validation Pipeline Design"
status: "Accepted"
phase: "5 — AI Repair Constraints"
date: "2026-05-07"
---

# ADR 014 — Patch Validation Pipeline Design

## Context

Phase 5 requires a script that AI patch agents can run to verify that a proposed change satisfies all static and test gates before submission for human review. The script must:

- Run every static scanner and test suite
- Produce structured JSON that the Risk Agent can read programmatically
- Exit with a non-zero code on any failure so CI can reject bad patches

## Decision

Implement `scripts/ai-patch-validate.ts` as a sequential rule runner that:

1. Executes each rule via `child_process.execSync` in a pipe-capturing mode
2. Records exit code, stdout/stderr, and wall-clock duration per rule
3. Emits a `PatchValidationReport` JSON structure (or human-readable text when `--json` is not passed)
4. Exits 0 only when all rules pass

**Rule set (in order):**
`type-check` → `lint` → `scan:storage` → `scan:sideeffects` → `scan:security` → `scan:deps` → `test:unit`

The `--fail-fast` flag stops on the first failure; without it, all rules run and the report captures every failure.

## Alternatives Considered

**Dedicated CI pipeline (GitHub Actions matrix).** Good for parallel execution but requires network access and a CI environment. The patch agent needs to self-validate locally before pushing.

**Wrapping `yarn verify`.** The `verify` script produces human-readable output only; the patch agent needs machine-readable JSON. A thin wrapper around `verify` couldn't capture per-rule status.

**Parallel rule execution.** Would reduce wall time but rules share the file system (type-check and lint both traverse src). Sequential execution avoids interference and produces deterministic ordering in the report.

## Consequences

- `yarn ai:validate` is the single command a patch agent calls before marking a patch ready.
- The `PatchValidationReport.failedRules` array is the authoritative input to the Risk Agent's `patch_constraints_violated` field in `ConfidenceScore`.
- Any new scanner added to `package.json` should also be added to the RULES array in `ai-patch-validate.ts`.
