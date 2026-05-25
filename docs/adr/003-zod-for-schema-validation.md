---
title: "ADR 003 — Zod for storage schema validation"
---

# ADR 003 — Zod for storage schema validation

## Status
Accepted

## Context
The platform requires runtime schema validation on every storage read and write. The validator must:
- Parse and validate arbitrary JSON payloads at runtime
- Produce typed TypeScript output (the validated value is typed, not `unknown`)
- Produce readable error messages when validation fails
- Be composable (schemas built from primitives, arrays, unions, objects)
- Work in the browser without a compilation step
- Have no peer dependencies

Libraries evaluated:
- **Zod** — TypeScript-first schema declaration and validation
- **Valibot** — modular, tree-shakeable alternative to Zod
- **TypeBox** — JSON Schema-based; generates JSON Schema alongside TypeScript types
- **Hand-rolled validation** — custom type guards per schema

## Decision
Zod.

## Rationale

**Already the de-facto standard for this use case.** Zod has become the standard validation library for TypeScript projects that need runtime type safety. The Quasar / Vue ecosystem, tRPC, React Hook Form, and most major TypeScript ORMs integrate with Zod. Future contributors will almost certainly know it.

**`safeParse` for non-throwing validation.** The `TelemetryBus` uses `TelemetryEventSchema.safeParse(event)` to validate events without throwing — malformed events produce a `telemetry_schema_violation` record instead of crashing the bus. This pattern is idiomatic in Zod and would require custom wrapper code with alternatives.

**Type inference is the correct direction.** Zod schemas are the source of truth; TypeScript types are derived from them via `z.infer<typeof Schema>`. This prevents the classic bug where a TypeScript interface and a runtime validator diverge silently. The `SaveDataItemSchema`, `CourseListingSchema`, and `TelemetryEventSchema` types are all inferred from their Zod counterparts.

**Readable error output.** When a storage write fails schema validation, `z.ZodError` produces a structured list of issues with field paths — useful for the Auditor agent's finding output and for developer debugging.

**Bundle size is acceptable.** Zod v3 adds approximately 8 KB (gzipped) to the bundle. For a courseware app that already bundles AsciiDoctor, MathJax, highlight.js, and Handlebars, this is negligible.

## Consequences
- `zod` is added as a runtime dependency (`yarn add zod`).
- All `SchemaEntry` validators are `z.ZodTypeAny` instances. The registry does not accept plain type guards or JSON Schema objects.
- When a schema must change, the Zod schema is updated, the version number is bumped, and a migration function is registered. The TypeScript type is regenerated automatically via `z.infer`.
- AI patches that modify Zod schemas without bumping the version are rejected by `scripts/ai-patch-validate.ts`.

## Alternatives rejected
- **Valibot**: modular tree-shaking is appealing but the API surface is less familiar and the ecosystem integrations are fewer. Bundle size savings are not significant given the existing bundle composition. Rejected.
- **TypeBox**: generates JSON Schema, which adds a useful portability layer but is unnecessary here — there is no JSON Schema consumer (no OpenAPI, no ajv). The additional complexity is not justified. Rejected.
- **Hand-rolled type guards**: require manual maintenance in parallel with TypeScript interfaces. The classic divergence bug (interface says `cont: boolean`, guard checks `typeof cont === 'string'`) is exactly the class of error this platform is designed to prevent. Rejected.
