---
title: "ADR-019: Include imap in the 100% Vue Conversion Scope"
status: "Accepted"
date: "2026-06-05"
relates_to: "PRD-001-quasar-conversion.md"
---

## Context

The original Quasar conversion PRD (draft) excluded `imap` from scope with the note "treat as out of scope until scoped separately." `imap` renders a clickable SVG image map using `@tanem/svg-injector` to inline an SVG asynchronously, then discovers child element IDs at runtime to attach click listeners. The stated goal is now 100% Vue rendering with the `#content` div eliminated.

If `imap` is excluded, it must continue using the old `innerHTML` / `makeSlidesStrategy` rendering path indefinitely, which:
1. Directly conflicts with the 100% Vue goal
2. Prevents the cleanup task (T-190) from fully removing the old rendering infrastructure
3. Leaves a permanent exception that new contributors must know about

## Alternatives Considered

**Option A: Exclude imap, keep old path as a permanent exception**
- Pro: zero work for imap
- Con: "100% Vue" goal becomes "99% Vue"; old infrastructure cannot be fully removed; ongoing maintenance burden

**Option B: Exclude imap, stub it with a placeholder Vue component**
- Pro: infrastructure can be cleaned up; imap deferred without blocking cleanup
- Con: imap silently broken for users until a follow-up; requires scheduling

**Option C: Include imap in this epic (chosen)**
- The async SVG injection pattern maps cleanly to Vue's `onMounted` lifecycle hook
- `SVGInjector` is called once from `onMounted`; after the callback, child IDs are stored in a `ref<string[]>`; `v-for` renders click targets or a single `@click.capture` delegate handles them
- Complexity is moderate and bounded — it is not a DnD type
- Enables complete removal of the old rendering infrastructure in this epic

## Decision

Include `imap` as Phase 6 of the conversion. Implement `ImapExercise.vue` with async SVG injection from `onMounted`.

## Rationale

The complexity of the `imap` Vue component is lower than `gap` (no DnD, no mobile touch concerns). The async injection pattern is a known Vue pattern. Excluding it would permanently compromise the stated goal and force a follow-up epic for a single exercise type. Including it closes the loop cleanly.

## Consequences

- `@tanem/svg-injector` dependency retained (called from Vue component, not old rendering path)
- Old `makeSlidesStrategyImap.ts` and `createHtmlImap.ts` can be removed in T-190
- Cleanup task T-190 can be unconditional — no imap exception needed
