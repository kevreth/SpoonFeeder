# ADR 004 — Zero-backend telemetry (in-memory ring buffer, no external service)

## Status
Accepted

## Context
The platform requires structured telemetry to support differential replay, invariant correlation, and AI patch confidence scoring. Two broad approaches were evaluated:

**Option A: Zero-backend telemetry**
Events are buffered in an in-memory ring buffer (`TelemetryBus`). No network calls. Events are consumed by tests (via `TelemetryBus.snapshot()`), Cypress (via `cy.window()`), and differential replay scripts (via `flush()`). Events are lost on page reload.

**Option B: Backend telemetry service**
Events are sent to an external service — Sentry, Datadog RUM, LogRocket, Honeycomb, or a custom endpoint — in real time. Events are persisted and queryable across sessions.

## Decision
Option A: zero-backend, in-memory ring buffer.

## Rationale

**SpoonFeeder has no backend.** There is no server to receive events. Introducing a third-party telemetry service would be the first external infrastructure dependency in what is currently a fully static, deployable SPA. That is a significant architectural addition that is out of scope for the bugfixing platform.

**Privacy.** SpoonFeeder stores student quiz answers in localStorage. Sending telemetry events that include storage operation metadata (key names, operation types) to an external service raises GDPR and FERPA concerns that would require a data processing agreement, a privacy policy update, and user consent UI. The zero-backend approach avoids this entirely — no student data leaves the browser.

**The primary use case is test-time, not production.** The three platform use cases that drive the telemetry requirement are:
1. Deterministic replay — needs events during test runs, not production
2. Differential regression — needs event sequences from two Cypress runs, not live users
3. Invariant correlation — needs preceding events when an invariant fires, not historical aggregation

All three are satisfied by the ring buffer. None require persistence across page reloads or aggregation across users.

**Extensibility is preserved.** `TelemetryBus.subscribe(fn)` allows any consumer to receive events synchronously as they are emitted. Adding production telemetry later requires one new subscriber that batches and flushes to a chosen endpoint. The bus, adapters, and invariant engine are unchanged. This is the correct extension point.

**Cost and complexity.** Operating a telemetry backend — even a managed SaaS — introduces cost, credential management, data retention policies, and integration maintenance. For a courseware app with no commercial SLA, this overhead is not justified.

## Consequences
- Events are ephemeral. A production crash is not automatically captured. Developers debugging a production issue must reproduce it locally in Cypress with telemetry enabled.
- The ring buffer capacity is 1000 events. Long Cypress flows or high-frequency storage operations may wrap the buffer. If this becomes a problem, the capacity can be increased or `flush()` called at Cypress `afterEach`.
- `TelemetryBus` has no batching, retry, or backoff logic. If a subscriber throws, the exception propagates synchronously through `emit()`. Subscribers must be defensive.
- When/if a backend is introduced (e.g., Supabase for progress tracking), a `RemoteReporter` subscriber should be added to `TelemetryBus`. The bus is already designed for this via the `subscribe` API. A new ADR should document that decision.

## Alternatives rejected
- **Sentry**: excellent for error monitoring but adds ~30 KB to the bundle, requires a DSN configuration, and sends data off-device. The primary use case (test-time replay) does not benefit from it. Rejected.
- **LogRocket / FullStory**: session replay tools that record DOM mutations. Heavyweight, privacy-sensitive, subscription cost. Not aligned with the structured-event model the platform uses. Rejected.
- **Custom analytics endpoint**: would require building and hosting a receiver. No backend exists and building one is out of scope. Rejected.
- **`console.log` as telemetry**: unstructured; cannot be machine-parsed; cannot be diffed; cannot feed the confidence score formula. Rejected as the primary telemetry mechanism (permitted as supplementary developer logging in development builds only).
