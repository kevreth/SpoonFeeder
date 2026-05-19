---
title: "SpoonFeeder AI Bugfixing Platform — Interface Contract Document"
---

# SpoonFeeder AI Bugfixing Platform — Interface Contract Document

## Purpose
This document is the single authoritative source for all public interfaces introduced by the bugfixing platform. It is the primary context document given to AI Fixer agents when generating patches. Any code that implements or depends on these interfaces must conform exactly to the signatures here. Changes to any interface require a version bump in this document and a corresponding ADR entry.

## Document Version: 1.1 (Phase 5 — AI Repair Constraints)

---

## 1. StorageAdapter

**File:** `src/ts/main/infrastructure/storage/StorageAdapter.ts`  
**Layer:** TypeScript business logic (framework-agnostic)

```ts
export interface StorageAdapter {
  /**
   * Returns the stored value for key, or undefined if not present.
   * Validates schema on read. Runs migration if stored version is stale.
   * Throws if data is schema-invalid or JSON is corrupted.
   */
  get<T>(key: string): Promise<T | undefined>;

  /**
   * Stores value at key.
   * Throws if value is null/undefined.
   * Throws if value fails Zod schema validation for the registered key.
   * Throws if serialized size exceeds the registered quota limit.
   * Emits storage_write telemetry event on success.
   */
  set<T>(key: string, value: T): Promise<void>;

  /**
   * Atomic read-modify-write. Prevents lost-update races on same-key concurrent writes.
   * fn receives current value (or undefined) and must return the new value.
   * The write is serialized per key via a pending Promise chain.
   */
  update<T>(key: string, fn: (val: T | undefined) => T | Promise<T>): Promise<void>;

  /**
   * Removes the key. Emits storage_remove telemetry event.
   */
  remove(key: string): Promise<void>;

  /**
   * Returns all keys currently in storage.
   */
  keys(): Promise<string[]>;

  /**
   * Clears all keys. Emits storage_clear telemetry event.
   */
  clear(): Promise<void>;

  /**
   * Identifies the platform this adapter targets.
   * Used by invariant checks to apply platform-specific rules.
   */
  readonly platform: 'web' | 'android' | 'test';
}
```

**Implementations:**
| Class | Platform | File |
|---|---|---|
| `WebStorageAdapter` | `web` | `infrastructure/storage/WebStorageAdapter.ts` |
| `AndroidStorageAdapter` | `android` | `infrastructure/storage/AndroidStorageAdapter.ts` |
| Test adapter (from `createTestStorageAdapter`) | `test` | `test/support/storage-fixtures.ts` |

**Invariants all implementations must uphold:**
- `set(key, null)` must throw before any write occurs.
- `set(key, value)` where value fails registered schema must throw before any write occurs.
- Every `get`, `set`, `remove`, `clear` must emit a telemetry event.
- `get` on a stale schema version must run the registered migration and rewrite storage before returning.
- `get` on corrupted JSON must throw, not return undefined.

---

## 2. SchemaRegistry

**File:** `src/ts/main/infrastructure/storage/schemas/Registry.ts`

```ts
type SchemaEntry = {
  key: string;
  version: number;          // positive integer; increment on schema change
  schema: z.ZodTypeAny;     // Zod validator for the data payload (not the envelope)
  sensitive?: boolean;      // true = key holds sensitive data (API keys, tokens)
};

export class SchemaRegistry {
  register(entry: SchemaEntry): void;
  registerMigration(
    key: string,
    migration: (data: unknown, fromVersion: number, toVersion: number) => unknown
  ): void;
  getSchema(key: string): z.ZodTypeAny | undefined;
  getVersion(key: string): number;       // returns 1 if key not registered
  getMigration(key: string): ((data: unknown, from: number, to: number) => unknown) | undefined;
  isSensitive(key: string): boolean;
}
```

**Registered SpoonFeeder keys:**

| Key | Storage | Version | Schema type | Sensitive |
|---|---|---|---|---|
| `courseName` | localStorage | 1 | `z.string()` | No |
| `<courseName>` (dynamic) | localStorage | 1 | `SaveDataArraySchema` | No |
| `courses` | sessionStorage | 1 | `z.array(z.string())` | No |
| `random` | sessionStorage | 1 | `z.enum(['true','false'])` | No |
| `transition` | sessionStorage | 1 | `z.enum(['true','false'])` | No |
| `mute` | sessionStorage | 1 | `z.enum(['true','false'])` | No |
| `spoony_api_key` | localStorage | 1 | `z.string()` | **Yes** |
| `spoony_enabled` | localStorage | 1 | `z.enum(['true','false'])` | No |
| `spoony_model` | localStorage | 1 | `z.string()` | No |

**Zod schemas (from `spoonfeederSchemas.ts`):**
```ts
export const SaveDataItemSchema = z.object({
  txt: z.string().min(1),
  result: z.union([z.string(), z.array(z.string()), z.array(z.number())]),
  ts: z.string(),
  cont: z.boolean(),
});
export const SaveDataArraySchema = z.array(SaveDataItemSchema);
export const CourseListingSchema = z.array(z.string());
export const BooleanFlagSchema = z.enum(['true', 'false']);
export const StringSchema = z.string();
```

---

## 3. Clock

**File:** `src/ts/main/infrastructure/clocks/Clock.ts`

```ts
export interface Clock {
  /** Returns current time in milliseconds since Unix epoch. */
  now(): number;

  /** Schedules fn to run after ms milliseconds. Returns a timer ID. */
  setTimeout(fn: () => void, ms: number): number;

  /** Cancels a previously scheduled timer. */
  clearTimeout(id: number): void;

  /**
   * Advances the clock by ms milliseconds, firing any timers that fall within.
   * Only meaningful on FakeClock. RealClock.tick() throws.
   */
  tick(ms: number): void;
}
```

**Implementations:**

| Class | Behaviour | File |
|---|---|---|
| `RealClock` | Delegates to `Date.now()` and `window.setTimeout` | `infrastructure/clocks/RealClock.ts` |
| `FakeClock` | Internal counter; `Map`-backed timer registry; `tick()` advances and fires timers | `infrastructure/clocks/FakeClock.ts` |

**Injection sites (after Phase 4):**
- `timestampNow()` in `saveData/date.ts`
- `sendMessage()` in `spoony/spoonyApi.ts` (AbortController timeout)
- `InvariantRegistry` constructor (for violation timestamps)
- `TelemetryBus` constructor (for event timestamps)
- `WebStorageAdapter` constructor

**Forbidden in business logic:** Direct calls to `Date.now()`, `window.setTimeout`, `window.clearTimeout`, or `setInterval` outside `RealClock` and `FakeClock` implementations.

---

## 4. Rng

**File:** `src/ts/main/infrastructure/random/Rng.ts`

```ts
export interface Rng {
  /** Returns a pseudo-random number in [0, 1). */
  random(): number;

  /** Seeds the generator. Only meaningful on FakeRng. RealRng.seed() throws. */
  seed(value: number): void;
}
```

**Implementations:**

| Class | Algorithm | File |
|---|---|---|
| `RealRng` | `Math.random()` | `infrastructure/random/RealRng.ts` |
| `FakeRng` | mulberry32 | `infrastructure/random/FakeRng.ts` |

**Forbidden in business logic:** Direct calls to `Math.random()` outside `RealRng` implementation.

---

## 5. TelemetryBus

**File:** `src/ts/main/infrastructure/telemetry/TelemetryBus.ts`

```ts
export class TelemetryBus {
  constructor(clock: Clock);

  /**
   * Validates rawEvent against TelemetryEventSchema and appends to ring buffer.
   * If validation fails, appends a telemetry_schema_violation event instead of throwing.
   * Notifies all subscribers synchronously before buffering.
   * timestamp is optional — stamped from injected Clock if omitted.
   */
  emit(rawEvent: Omit<TelemetryEvent, 'timestamp'> & { timestamp?: number }): void;

  /** Registers a subscriber. Returns an unsubscribe function. */
  subscribe(fn: (event: TelemetryEvent) => void): () => void;

  /** Returns a copy of the buffer and clears it. */
  flush(): TelemetryEvent[];

  /** Returns a copy of the buffer without clearing it. */
  snapshot(): TelemetryEvent[];
}
```

**TelemetryEvent schema:**
```ts
export const TelemetryEventSchema = z.object({
  traceId:       z.string(),
  parentTraceId: z.string().optional(),
  subsystem:     z.enum(['storage', 'lifecycle', 'quiz', 'spoony', 'boot', 'invariant']),
  event:         z.string(),
  timestamp:     z.number(),
  platform:      z.enum(['web', 'android']),
  metadata:      z.record(z.unknown()).optional(),
  severity:      z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  patchId:       z.string().optional(),
});
export type TelemetryEvent = z.infer<typeof TelemetryEventSchema>;
```

**Required emission points:**

| Emitter | Events |
|---|---|
| `StorageAdapter` (all implementations) | `storage_read`, `storage_read_miss`, `storage_write`, `storage_remove`, `storage_clear` |
| `InvariantRegistry` | `invariant_violation` |
| `dispatch2` | `state_transition` |
| `sendMessage` (Spoony) | `spoony_request_sent`, `spoony_response_received`, `spoony_error` |
| Quasar boot | `boot_start`, `boot_complete` |

---

## 6. InvariantRegistry

**File:** `src/ts/main/infrastructure/invariants/InvariantRegistry.ts`

```ts
export type InvariantSeverity = 'low' | 'high' | 'critical';
export type InvariantSubsystem = 'storage' | 'lifecycle' | 'quiz' | 'spoony' | 'boot' | 'invariant';

export type Invariant = {
  id: string;
  subsystem: InvariantSubsystem;
  description: string;
  severity: InvariantSeverity;
  check: () => void | Promise<void>;  // throws on violation
};

export type InvariantViolation = {
  invariantId: string;
  subsystem: InvariantSubsystem;
  severity: InvariantSeverity;
  message: string;
  timestamp: number;
};

export class InvariantRegistry {
  constructor(clock: Clock, platform: 'web' | 'android', telemetry?: TelemetryBus);

  /** Registers an invariant. Invariants are checked in registration order. */
  register(inv: Invariant): void;

  /**
   * Runs all registered invariants (or a subsystem subset).
   * By default throws on first violation. Pass throwOnViolation: false to collect all.
   * Always emits invariant_violation telemetry on any failure.
   */
  assertAll(options?: { subsystem?: InvariantSubsystem; throwOnViolation?: boolean }): Promise<void>;

  getViolations(): InvariantViolation[];
  clearViolations(): void;
}
```

**Registered SpoonFeeder invariants:**

| ID | Subsystem | Severity | Description |
|---|---|---|---|
| `storage.null-guard` | storage | critical | No null/undefined value stored |
| `storage.schema-valid` | storage | critical | All registered keys pass Zod schema on read |
| `storage.version-envelope` | storage | high | All registered keys wrapped in `{version, data}` |
| `storage.quota` | storage | high | localStorage usage < 4 MB |
| `storage.sensitive-not-empty` | storage | high | `spoony_api_key` never written as empty string |
| `quiz.end-reachable` | quiz | critical | `SaveDataDispatcher.end()` implemented before END state is reachable |
| `quiz.slides-before-save` | quiz | high | `SaveData.set()` not called before `Json.get()` has slides |
| `lifecycle.no-write-after-teardown` | lifecycle | high | No storage write after component `onUnmounted` (dev builds) |

---

## 7. StateActions & QuizState

**File:** `src/ts/main/quiz/stateActionDispatcher.ts`

```ts
export interface StateActions<T> {
  begin(): T;
  current(): T;
  decorate(): T;
  next(): T;
  end(): T;
}

export type QuizState = 'BEGIN' | 'CURRENT' | 'DECORATE' | 'NEXT' | 'END';

/**
 * Pure function: computes QuizState from slides and saves, dispatches to actions.
 * No internal side effects. Callers are responsible for providing slides and saves.
 * Emits state_transition telemetry event if telemetry is provided.
 */
export function dispatch2<T>(
  actions: StateActions<T>,
  slides: SlideInterface[],
  saves: SaveData[],
  advance: boolean,
  clock?: Clock,
  telemetry?: TelemetryBus,
): T;
```

**State transition table:**

| Condition | QuizState |
|---|---|
| `saves` is empty | `BEGIN` |
| `last(saves).cont === true` and `saves.length === slides.length` | `END` |
| `last(saves).cont === true` and `advance === true` | `NEXT` |
| `last(saves).cont === true` and `advance === false` | `CURRENT` |
| `last(saves).cont === false` | `DECORATE` |

**Implementations of `StateActions`:**

| Class | Handles | File |
|---|---|---|
| `SlideDispatcher` | BEGIN, DECORATE, NEXT, END | `quiz/slideDispatcher.ts` |
| `SaveDataDispatcher` | BEGIN, CURRENT, DECORATE | `dataaccess/saveData/slideDispatcher2.ts` |

---

## 8. QuotaGuard

**File:** `src/ts/main/infrastructure/storage/QuotaGuard.ts`

```ts
export class QuotaGuard {
  /** Register a byte limit for a specific key. */
  setLimit(key: string, bytes: number): void;

  /**
   * Check that serialized does not exceed the registered limit for key.
   * Throws if exceeded. No-op if no limit registered for key.
   */
  guard(key: string, serialized: string): void;
}
```

**Registered SpoonFeeder limits:**

| Key | Limit | Rationale |
|---|---|---|
| `spoony_api_key` | 200 bytes | API keys are short strings; large values indicate corruption |
| `<courseName>` (save data) | 512 KB | Generous cap; a course with 200 slides × realistic answer sizes |

---

## 9. PatchValidationReport

Emitted by `scripts/ai-patch-validate.ts` (run via `yarn ai:validate`). Each rule result has a `status` of `'pass'` or `'fail'`.

```ts
type RuleStatus = 'pass' | 'fail' | 'error';

interface RuleResult {
  ruleId: string;          // e.g. 'type-check', 'scan:storage'
  description: string;
  status: RuleStatus;
  durationMs: number;
  output: string;          // trimmed stdout+stderr from the rule command
}

interface PatchValidationReport {
  timestamp: number;         // Unix epoch ms
  passed: boolean;           // true only when all rules pass
  failedRules: string[];     // ruleIds of failed rules (empty when passed)
  results: RuleResult[];
}
```

**Rules evaluated (in order):**

| Rule ID | Command | Gate |
|---|---|---|
| `type-check` | `yarn type-check` | Zero type errors |
| `lint` | `yarn lint --max-warnings 0` | Zero lint warnings |
| `scan:storage` | `node scripts/storage-key-audit.ts` | Zero direct storage violations |
| `scan:sideeffects` | `node scripts/side-effect-scanner.ts` | Zero bare setTimeout/Date.now violations |
| `scan:security` | `node scripts/security-scan.ts` | Zero security violations |
| `scan:deps` | `npx dependency-cruiser …` | Zero forbidden dependency crossings |
| `test:unit` | `yarn test:unit` | All unit + property tests pass |

Auto-merge requires `passed === true`. Any `failedRules` entry routes to human review.

---

## 10. Confidence Score Schema

Emitted by the Risk Agent after every AI patch. All fields are required.

```ts
type ConfidenceScore = {
  bug_reproduced: boolean;
  reproduction_determinism: number;       // 0–1
  invariants_added: number;
  storage_invariants_passed: boolean;     // InvariantRegistry.assertAll({ subsystem: 'storage' })
  mutation_score: number;                 // 0–1; from StrykerJS
  e2e_tests_passed: boolean;
  differential_deviations: number;        // count from differential-replay.ts
  blast_radius: 'low' | 'medium' | 'high';
  confidence: number;                     // 0–1; computed by Risk Agent
  patch_constraints_violated: string[];   // rule IDs from ai-patch-validate.ts
  security_scan_passed: boolean;
  type_safety_passed: boolean;
  performance_regression: 'none' | 'minor' | 'significant';
  accessibility_preservation_passed: boolean;
  new_dependencies_added: boolean;
};
```

**Auto-merge gate:** `confidence ≥ 0.85` AND `patch_constraints_violated` is empty AND all boolean fields are `true` AND `performance_regression === 'none'` AND `new_dependencies_added === false`.

Any failing condition routes to human review. See `docs/ai.bugfix.security.spoonfeeder.md` for the mandatory human escalation categories that override the confidence gate entirely.

---

## Appendix: File → Interface Map

| File | Exports |
|---|---|
| `infrastructure/storage/StorageAdapter.ts` | `StorageAdapter` |
| `infrastructure/storage/schemas/Registry.ts` | `SchemaRegistry`, `SchemaEntry` |
| `infrastructure/storage/schemas/spoonfeederSchemas.ts` | `SaveDataItemSchema`, `SaveDataArraySchema`, `CourseListingSchema`, `BooleanFlagSchema`, `StringSchema`, `registerSpoonFeederSchemas` |
| `infrastructure/storage/QuotaGuard.ts` | `QuotaGuard` |
| `infrastructure/storage/factory.ts` | `createLocalStorageAdapter`, `createSessionStorageAdapter` |
| `infrastructure/clocks/Clock.ts` | `Clock` |
| `infrastructure/clocks/RealClock.ts` | `RealClock` |
| `infrastructure/clocks/FakeClock.ts` | `FakeClock` |
| `infrastructure/random/Rng.ts` | `Rng` |
| `infrastructure/random/RealRng.ts` | `RealRng` |
| `infrastructure/random/FakeRng.ts` | `FakeRng` |
| `infrastructure/telemetry/TelemetryEventSchema.ts` | `TelemetryEventSchema`, `TelemetryEvent` |
| `infrastructure/telemetry/TelemetryBus.ts` | `TelemetryBus` |
| `infrastructure/invariants/types.ts` | `Invariant`, `InvariantViolation`, `InvariantSeverity`, `InvariantSubsystem` |
| `infrastructure/invariants/InvariantRegistry.ts` | `InvariantRegistry` |
| `quiz/stateActionDispatcher.ts` | `StateActions`, `QuizState`, `dispatch2` |
| `scripts/ai-patch-validate.ts` | `PatchValidationReport`, `RuleResult` (runtime types, not exported) |
| `scripts/differential-replay.ts` | `ReplayReport`, `StorageSnapshot` (runtime types, not exported) |
| `cypress/support/telemetry-commands.ts` | `cy.snapshotStorage()`, `cy.assertNoConsoleErrors()` |
