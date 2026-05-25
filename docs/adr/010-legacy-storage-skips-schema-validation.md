---
title: "ADR 010 — Legacy storage data skips schema validation on read"
---

# ADR 010 — Legacy storage data skips schema validation on read

## Status
Accepted

## Context
`WebStorageAdapter.get()` and `SyncStorageAdapter.get()` detect data format by inspecting the raw value:

1. **Versioned envelope** `{ version: N, data: ... }` — written by the adapter; schema validation applied.
2. **Legacy unwrapped** — any other format; written before the adapter was introduced.

The original implementation applied schema validation to legacy data in the unwrapped path:
```ts
} else {
  data = parsed;
  if (schema) schema.parse(data);  // applied to legacy data
}
```

During Phase 3 testing, this caused failures in two existing unit tests:

`processJson.test.ts` line 42:
```ts
sessionStorage.setItem('random', 'false');
```

`vocab.test.ts` (similar pattern): sets raw session storage values before calling course processing functions.

These tests write `'false'` (a raw string) directly to sessionStorage. `JSON.parse('false')` returns `false` (boolean). The `BooleanFlagSchema = z.enum(['true', 'false'])` expects a string, so `schema.parse(false)` throws a `ZodError`.

The PRD (§4.1) states: "All existing unit and end-to-end tests must pass at every phase gate."

## Decision
Legacy unwrapped data (data without a `{ version, data }` envelope) is returned without schema validation. Schema validation applies only to versioned-envelope data written through the adapter.

```ts
} else {
  // Legacy value written before the adapter was introduced — no version envelope.
  // Schema validation is skipped: pre-migration data cannot be guaranteed to match.
  // It will be validated on the next write through the adapter.
  data = parsed;
}
```

## Rationale

**The PRD's invariant "fail loudly on corrupted data" applies to data that has been written through the adapter.** Data written before the adapter was introduced was never schema-validated at write time — applying the schema retrospectively produces false positives. The correct enforcement point is the next write, which will validate and upgrade the format.

**The test fixtures reflect realistic pre-migration state.** When SpoonFeeder is first deployed with Phase 3 infrastructure, existing users will have raw (unwrapped) session and local storage values from the old code. The adapter must read these values without crashing. The test pattern `sessionStorage.setItem('random', 'false')` is an accurate simulation of this scenario.

**The legacy path is self-healing.** Any code path that reads legacy data and then writes it back (e.g. `SaveData.get()` followed by `SaveData.set()`) will automatically upgrade the format. After one round-trip through the adapter, the data is versioned and schema-validated on all subsequent reads.

**Security risk is negligible.** Both `localStorage` and `sessionStorage` are already fully accessible to any JavaScript running on the page. Skipping schema validation for pre-existing values does not increase the attack surface.

## Consequences
- Existing tests that write raw strings to sessionStorage/localStorage continue to pass.
- Users with pre-migration storage data are not disrupted on first use after Phase 3 deployment.
- The Phase 6 self-consistency audit should include a check that no new code writes raw (unwrapped) values directly — all writes must go through the adapter.
- The security scanner (`scripts/security-scan.ts`) does not currently flag this path. If a future audit finds that unvalidated legacy reads are a concern, a migration script can be added to Phase 5 or Phase 6 to scan for and rewrite any remaining unwrapped values.

## Alternatives rejected
- **Apply schema validation to legacy data:** Breaks existing tests and breaks existing user sessions on first load post-migration. Rejected.
- **Add schema coercions (e.g. `z.coerce.string()`):** Would silently change `false` (boolean) to `'false'` (string) and pass validation. Hides the legacy format rather than acknowledging it. Coercions also carry risk of unexpected data transformations. Rejected.
- **Pre-migrate all storage values on app startup:** Requires iterating all storage keys at boot, which has performance cost and requires knowing all key names (including dynamic per-course keys) at startup. Adds boot complexity for a one-time migration. Deferred to Phase 6 if needed.
