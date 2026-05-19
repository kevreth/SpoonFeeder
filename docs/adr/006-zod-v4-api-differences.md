---
title: "ADR 006 — Zod v4 API differences affecting infrastructure code"
---

# ADR 006 — Zod v4 API differences affecting infrastructure code

## Status
Accepted

## Context
The project has Zod `4.4.3` installed. ADR 003 selected Zod based on its v3 API, which is what the PRD code examples were written against. Zod 4 is largely backward-compatible but contains breaking changes that affect the infrastructure code.

## Breaking changes encountered

### `z.record()` requires two arguments in Zod 4

**v3 (PRD as written):**
```ts
z.record(z.unknown())  // keys implicitly z.string()
```

**v4 (required):**
```ts
z.record(z.string(), z.unknown())  // both key and value schemas required
```

This affected `TelemetryEventSchema.ts` where `metadata` was defined as `z.record(z.unknown())`. Fixed to `z.record(z.string(), z.unknown())`.

## Impact

Any AI-generated patch that uses `z.record(valueSchema)` without a key schema will fail `yarn type-check`. The patch validator (`scripts/ai-patch-validate.ts`, Phase 5) should include a rule that catches single-argument `z.record()` calls.

## Other Zod 4 changes to be aware of

The following v3 patterns are also changed in v4 and may affect future infrastructure code:

| Pattern | v3 | v4 |
|---|---|---|
| Record type | `z.record(valueSchema)` | `z.record(keySchema, valueSchema)` |
| String email | `z.string().email()` | `z.email()` (top-level) |
| String URL | `z.string().url()` | `z.url()` (top-level) |
| Object merge | `schemaA.merge(schemaB)` | `z.merge(schemaA, schemaB)` or spread |
| Error map | `{ errorMap: ... }` | `{ error: ... }` |

The v3 compatibility layer (`import { z } from 'zod/v3'`) is available if a specific v3 pattern is needed and the v4 equivalent is unclear. Prefer v4 native patterns in new code.

## Decision
Use Zod v4 native API throughout. Update any PRD code examples that used v3 patterns when implementing them. Document any additional v4 differences encountered during later phases in this ADR.
