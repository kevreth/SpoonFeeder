# AI-Native Bug Remediation, Verification & Regression-Containment Platform — SpoonFeeder

## Document Status
Draft v1.0 — Concrete Implementation for SpoonFeeder (Quasar v2 / Vue 3 / Web + Android)

---

## 1. Executive Summary

This specification defines a complete AI-native bug discovery, remediation, and regression-prevention platform for **SpoonFeeder** — a Quasar v2 / Vue 3 programmatic-instruction SPA that targets Web and Android (Capacitor), uses `localStorage`/`sessionStorage` for all persistence, and has no backend.

The concrete platform introduces:

1. A **Cross-Platform Storage Abstraction** (`StorageAdapter`) with Zod-schema-validated, versioned state across Web (`localStorage`/`sessionStorage`) and Android (`@capacitor/preferences`), replacing the current bare `WebStorageVariable`/`WebStorageFlag` wrappers.
2. A **Lightweight Invariant Engine** enforcing storage integrity, lifecycle correctness, and impossible-state detection at Quasar boot, Vue component teardown, and Cypress E2E boundaries.
3. A **Zero-Backend Telemetry & Trace System** producing deterministic replay traces via an in-memory ring buffer and Cypress streaming reporters.
4. **Deterministic Execution Infrastructure** using plain `FakeClock` and `FakeRng` TypeScript classes for time and randomness isolation, injected into `timestampNow`, `spoonyApi`, and any other direct `Date.now()`/`setTimeout` sites.
5. **Property-Based & Mutation Testing** via `fast-check` and StrykerJS to expose edge-case regressions in storage key sequences and subsystem transitions.
6. **Semantic Patch Validation** constraining AI-generated fixes through `dependency-cruiser`, custom AST scanners, and patch-gate scripts.
7. **Differential Replay** using Cypress storage snapshots, telemetry event sequences, and `microdiff` comparison.

The system transforms SpoonFeeder from:
- implicit behavioral semantics, hidden storage mutations, and nondeterministic debugging

into:
- explicit operational models, machine-readable semantics, deterministic replayable execution, AI-constrained repair infrastructure, and property-driven verification.

### 1.1 Exact Package Manifest

```bash
# Runtime dependencies
yarn add zod microdiff

# Development dependencies
yarn add -D fast-check
yarn add -D @stryker-mutator/core @stryker-mutator/vitest-runner
yarn add -D dependency-cruiser
```

`dpdm` (circular-dependency checking) and `knip` (dead-code detection) are already in `devDependencies` and require no installation.  
`@sinonjs/fake-timers` is intentionally excluded: `FakeClock` is implemented as a plain TypeScript class requiring no global timer patching, which is safer inside Vitest's jsdom environment.

---

## 2. Strategic Goals

### 2.1 Deterministic Reproducibility
Every bug must become reproducible via:
- replay traces (telemetry event sequences + storage snapshots)
- deterministic timestamps via injected `Clock` (replacing `Date.now()` in `timestampNow`)
- deterministic `AbortController` timeouts via injected `Clock` (replacing direct `setTimeout` in `spoonyApi.ts`)
- deterministic random seeds via injected `Rng`
- isolated storage fixtures per test via a `Map`-backed `StorageAdapter`

### 2.2 Persistence-Centric Correctness
The storage boundary is the source of truth for state that survives page reloads, session boundaries, or Android app restarts. The system must guarantee:
- Zod-schema-validated writes
- quota guards (Web: 5–10 MB `localStorage`; Android: OS-managed)
- serialization safety via versioned JSON envelope `{ version, data }`
- schema version migration on read when stored version differs from registered version
- no raw `localStorage.setItem` / `sessionStorage.setItem` calls outside the `StorageAdapter` layer

### 2.3 AI-Constrained Repair
AI-generated repairs must be constrained by:
- storage schema legality (Zod parse must pass before write)
- invariant preservation
- semantic contracts
- pure transition rules (for migrated subsystems)
- replay equivalence
- side-effect boundaries (`Clock`, `Rng`, `StorageAdapter` injection required)
- security boundaries (no API key leakage, no injection)
- type safety boundaries
- performance budgets

### 2.4 Environment Parity
Identical invariant coverage and behavioral semantics must be maintained across Web and Android through platform-specific adapters behind the unified `StorageAdapter` interface. The `platform` discriminant (`'web' | 'android' | 'test'`) on every adapter enables platform-specific invariant checks.

### 2.5 Deep Operational Observability
All major behavior becomes observable via:
- structured telemetry events via `TelemetryBus`
- storage operation logs (every read, write, remove, clear)
- Quasar boot lifecycle logs
- Spoony API call logs (request sent, response received, error)
- quiz state transition logs
- error and unhandled-rejection logs

### 2.6 Security-by-Default
AI patches must not introduce:
- XSS vectors, injection attacks, or unsafe eval
- hardcoded API keys or credentials
- prototype pollution
- unsafe deserialization
- bypass of existing security controls

Additionally, the existing `spoony_api_key` stored as plain text in `localStorage` is flagged as a security concern; migration to an encrypted storage slot is a human-escalation item.

### 2.7 Human-in-the-Loop Escalation
Certain categories of change must always trigger human review, regardless of machine confidence score. (See §7.4.)

---

## 3. Non-Goals

The platform MUST NOT:
- rewrite the entire SpoonFeeder codebase in one pass.
- introduce monolithic centralized finite state machines.
- alter externally observable behavior (slide rendering, answer evaluation, save-data format) during migration.
- replace human judgment for security or privacy changes (especially API key handling).
- require backend servers or cloud infrastructure; telemetry remains zero-backend.
- change the existing `yarn test:all` pipeline before Phase 1 is complete.
- introduce a global Pinia store or Vuex; Pinia is already present but intentionally minimal.

---

## 4. Core Architectural Principles

### 4.1 Incremental Adoption
- Infrastructure is added subsystem-by-subsystem.
- Legacy `WebStorageVariable`/`WebStorageFlag` calls coexist with the abstraction layer until each subsystem is migrated.
- All existing Vitest unit tests and Cypress E2E tests must pass at every phase gate.

### 4.2 Explicit State & Storage Contracts
- Hidden subsystem state is forbidden in migrated code.
- Storage keys must be registered with a Zod schema and a version number before first use.
- State transitions (where explicitly modeled) must be pure, deterministic, and serializable.

### 4.3 Side-Effect Isolation
- All side effects execute outside transition logic.
- Side effects include: storage IO, network IO (Spoony API), timers, Capacitor bridge calls, DOM mutations.
- Transition logic returns a new state and a list of effects; effects are executed by an `EffectScheduler`.

### 4.4 Machine-Readable Semantics
- Operational semantics exposed via structured telemetry events and invariant metadata.
- Telemetry events are machine-parseable, Zod-validated, and versioned.
- Human-readable `console.log` strings are permitted in development builds only.

### 4.5 Behavioral Preservation
- Public composable APIs, storage formats, and slide/quiz behavior must remain stable during migration.
- AI patches must preserve externally observable behavior (slide rendering, evaluation results, save-data persistence) except where the bug fix itself constitutes an intentional change.

### 4.6 Documentation Parity
- When an AI patch changes behavior, it must update inline comments, invariant descriptions, and subsystem documentation.

### 4.7 Build System Stability
- AI patches must not break compilation (`yarn type-check`), bundling (`quasar build`), or static analysis (`yarn lint`).

---

## 5. Verification Layers

> **Brittleness vs. Fragility:**
> **Brittleness** measures how likely a layer is to break when implementation details change (but behavior is correct). **Fragility** measures how likely a layer is to fail due to environmental or timing factors. Both axes matter when weighting verification coverage.

| Priority | Layer | Concrete Tool | Purpose | Brittleness |
|---|---|---|---|---|
| 1 | **Storage Invariants** | `InvariantRegistry` + `storageChecks.ts` | Prevent corruption, quota errors, schema drift | Low |
| 2 | **UI / Lifecycle Invariants** | `InvariantRegistry` + `lifecycleChecks.ts` | No mutation after teardown, legal sequence enforcement | Low |
| 3 | **Behavioral E2E Tests** | Cypress | Full quiz flows on Web | Medium |
| 4 | **Property-Based Tests** | `fast-check` + Vitest | Arbitrary storage sequence robustness | Medium |
| 5 | **Unit Tests** | Vitest + jsdom | Local logic correctness | High |
| 6 | **Mutation Tests** | StrykerJS + `@stryker-mutator/vitest-runner` | Verify tests detect real behavioral changes | Meta |
| 7 | **Differential Replay** | `scripts/differential-replay.ts` + Cypress | Regression detection via snapshot comparison | Low brittleness / High fragility |

---

## 6. Infrastructure Layers (Concrete)

### 6.1 Cross-Platform Storage Abstraction & Contracts

**Problem:** `WebStorageVariable` and `WebStorageFlag` are thin wrappers with no interface, no schema validation, no versioning, and no atomic update. `SaveData.get()` calls `JSON.parse` on raw `localStorage` strings. Nine storage keys lack corruption guards.

**Files:**
```
src/ts/main/infrastructure/storage/StorageAdapter.ts
src/ts/main/infrastructure/storage/WebStorageAdapter.ts
src/ts/main/infrastructure/storage/AndroidStorageAdapter.ts
src/ts/main/infrastructure/storage/QuotaGuard.ts
src/ts/main/infrastructure/storage/factory.ts
src/ts/main/infrastructure/storage/schemas/Registry.ts
src/ts/main/infrastructure/storage/schemas/migrations/
```

**Interface:**
```ts
// src/ts/main/infrastructure/storage/StorageAdapter.ts
export interface StorageAdapter {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T): Promise<void>;
  /** Atomic read-modify-write. Prevents race conditions on same-key concurrent writes. */
  update<T>(key: string, fn: (val: T | undefined) => T | Promise<T>): Promise<void>;
  remove(key: string): Promise<void>;
  keys(): Promise<string[]>;
  clear(): Promise<void>;
  readonly platform: 'web' | 'android' | 'test';
}
```

**Schema Registry:**
```ts
// src/ts/main/infrastructure/storage/schemas/Registry.ts
import { z } from 'zod';

type SchemaEntry = {
  key: string;
  version: number;
  schema: z.ZodTypeAny;
  sensitive?: boolean;
};

export class SchemaRegistry {
  private entries = new Map<string, SchemaEntry>();
  private migrations = new Map<
    string,
    (data: unknown, fromVersion: number, toVersion: number) => unknown
  >();

  register(entry: SchemaEntry): void {
    this.entries.set(entry.key, entry);
  }

  registerMigration(
    key: string,
    migration: (data: unknown, fromVersion: number, toVersion: number) => unknown
  ): void {
    this.migrations.set(key, migration);
  }

  getSchema(key: string): z.ZodTypeAny | undefined {
    return this.entries.get(key)?.schema;
  }

  getVersion(key: string): number {
    return this.entries.get(key)?.version ?? 1;
  }

  getMigration(key: string) {
    return this.migrations.get(key);
  }

  isSensitive(key: string): boolean {
    return this.entries.get(key)?.sensitive ?? false;
  }
}
```

**SpoonFeeder Storage Schema Registrations:**
```ts
// src/ts/main/infrastructure/storage/schemas/spoonfeederSchemas.ts
import { z } from 'zod';
import { SchemaRegistry } from './Registry';

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

export function registerSpoonFeederSchemas(registry: SchemaRegistry): void {
  registry.register({ key: 'courseName', version: 1, schema: StringSchema });
  registry.register({ key: 'courses', version: 1, schema: CourseListingSchema });
  registry.register({ key: 'random', version: 1, schema: BooleanFlagSchema });
  registry.register({ key: 'transition', version: 1, schema: BooleanFlagSchema });
  registry.register({ key: 'mute', version: 1, schema: BooleanFlagSchema });
  registry.register({ key: 'spoony_api_key', version: 1, schema: StringSchema, sensitive: true });
  registry.register({ key: 'spoony_enabled', version: 1, schema: BooleanFlagSchema });
  registry.register({ key: 'spoony_model', version: 1, schema: StringSchema });
  // Per-course save data: key is the course name (e.g. "test")
  // Registered dynamically when a course is loaded:
  // registry.register({ key: courseName, version: 1, schema: SaveDataArraySchema });
}
```

**Web Adapter (localStorage + sessionStorage):**
```ts
// src/ts/main/infrastructure/storage/WebStorageAdapter.ts
import { StorageAdapter } from './StorageAdapter';
import { SchemaRegistry } from './schemas/Registry';
import { QuotaGuard } from './QuotaGuard';
import { Clock } from '../clocks/Clock';
import { TelemetryBus } from '../telemetry/TelemetryBus';

export class WebStorageAdapter implements StorageAdapter {
  readonly platform = 'web' as const;
  private pending = new Map<string, Promise<unknown>>();

  constructor(
    private target: Storage,  // localStorage or sessionStorage
    private registry: SchemaRegistry,
    private quota: QuotaGuard,
    private clock: Clock,
    private telemetry: TelemetryBus,
  ) {}

  async get<T>(key: string): Promise<T | undefined> {
    const raw = this.target.getItem(key);
    if (raw === null) {
      this.telemetry.emit({ traceId: `storage-miss-${key}`, subsystem: 'storage', event: 'storage_read_miss', timestamp: this.clock.now(), platform: this.platform, metadata: { key } });
      return undefined;
    }
    let parsed: unknown;
    try { parsed = JSON.parse(raw); } catch {
      throw new Error(`StorageAdapter: corrupted JSON at key "${key}"`);
    }
    const registeredVersion = this.registry.getVersion(key);
    let data: unknown;
    if (parsed && typeof parsed === 'object' && 'version' in parsed && 'data' in parsed) {
      const wrapped = parsed as { version: number; data: unknown };
      if (wrapped.version !== registeredVersion) {
        const migrate = this.registry.getMigration(key);
        if (!migrate) throw new Error(`StorageAdapter: missing migration for "${key}" v${wrapped.version} → v${registeredVersion}`);
        data = migrate(wrapped.data, wrapped.version, registeredVersion);
        const schema = this.registry.getSchema(key);
        if (schema) schema.parse(data);
        this.target.setItem(key, JSON.stringify({ version: registeredVersion, data }));
      } else {
        data = wrapped.data;
        const schema = this.registry.getSchema(key);
        if (schema) schema.parse(data);
      }
    } else {
      // Legacy unwrapped value (pre-migration)
      data = parsed;
      const schema = this.registry.getSchema(key);
      if (schema) schema.parse(data);
    }
    this.telemetry.emit({ traceId: `storage-get-${key}`, subsystem: 'storage', event: 'storage_read', timestamp: this.clock.now(), platform: this.platform, metadata: { key } });
    return data as T;
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (value === null || value === undefined) {
      throw new Error(`StorageAdapter: null/undefined prohibited at key "${key}"`);
    }
    const schema = this.registry.getSchema(key);
    if (schema) schema.parse(value);
    const version = this.registry.getVersion(key);
    const serialized = JSON.stringify({ version, data: value });
    this.quota.guard(key, serialized);
    try {
      this.target.setItem(key, serialized);
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        throw new Error(`StorageAdapter: quota exceeded for key "${key}"`);
      }
      throw e;
    }
    this.telemetry.emit({ traceId: `storage-set-${key}`, subsystem: 'storage', event: 'storage_write', timestamp: this.clock.now(), platform: this.platform, metadata: { key } });
  }

  async update<T>(key: string, fn: (val: T | undefined) => T | Promise<T>): Promise<void> {
    const previous = this.pending.get(key) ?? Promise.resolve();
    const operation = previous.then(async () => {
      const current = await this.get<T>(key);
      const next = await fn(current);
      await this.set<T>(key, next);
    });
    this.pending.set(key, operation);
    operation.finally(() => {
      if (this.pending.get(key) === operation) this.pending.delete(key);
    });
    await operation;
  }

  async remove(key: string): Promise<void> {
    this.target.removeItem(key);
    this.telemetry.emit({ traceId: `storage-remove-${key}`, subsystem: 'storage', event: 'storage_remove', timestamp: this.clock.now(), platform: this.platform, metadata: { key } });
  }

  async keys(): Promise<string[]> {
    return Array.from({ length: this.target.length }, (_, i) => this.target.key(i)!);
  }

  async clear(): Promise<void> {
    this.target.clear();
    this.telemetry.emit({ traceId: 'storage-clear', subsystem: 'storage', event: 'storage_clear', timestamp: this.clock.now(), platform: this.platform });
  }
}
```

**Android (Capacitor Preferences) Adapter:**
```ts
// src/ts/main/infrastructure/storage/AndroidStorageAdapter.ts
import { Preferences } from '@capacitor/preferences';
import { StorageAdapter } from './StorageAdapter';
import { SchemaRegistry } from './schemas/Registry';
import { QuotaGuard } from './QuotaGuard';
import { Clock } from '../clocks/Clock';
import { TelemetryBus } from '../telemetry/TelemetryBus';

export class AndroidStorageAdapter implements StorageAdapter {
  readonly platform = 'android' as const;

  constructor(
    private registry: SchemaRegistry,
    private quota: QuotaGuard,
    private clock: Clock,
    private telemetry: TelemetryBus,
  ) {}

  async get<T>(key: string): Promise<T | undefined> {
    const { value } = await Preferences.get({ key });
    if (value === null) {
      this.telemetry.emit({ traceId: `storage-miss-${key}`, subsystem: 'storage', event: 'storage_read_miss', timestamp: this.clock.now(), platform: this.platform, metadata: { key } });
      return undefined;
    }
    let parsed: unknown;
    try { parsed = JSON.parse(value); } catch {
      throw new Error(`StorageAdapter: corrupted JSON at key "${key}"`);
    }
    const registeredVersion = this.registry.getVersion(key);
    let data: unknown;
    if (parsed && typeof parsed === 'object' && 'version' in parsed && 'data' in parsed) {
      const wrapped = parsed as { version: number; data: unknown };
      if (wrapped.version !== registeredVersion) {
        const migrate = this.registry.getMigration(key);
        if (!migrate) throw new Error(`StorageAdapter: missing migration for "${key}" v${wrapped.version} → v${registeredVersion}`);
        data = migrate(wrapped.data, wrapped.version, registeredVersion);
        const schema = this.registry.getSchema(key);
        if (schema) schema.parse(data);
        await Preferences.set({ key, value: JSON.stringify({ version: registeredVersion, data }) });
      } else {
        data = wrapped.data;
        const schema = this.registry.getSchema(key);
        if (schema) schema.parse(data);
      }
    } else {
      data = parsed;
      const schema = this.registry.getSchema(key);
      if (schema) schema.parse(data);
    }
    this.telemetry.emit({ traceId: `storage-get-${key}`, subsystem: 'storage', event: 'storage_read', timestamp: this.clock.now(), platform: this.platform, metadata: { key } });
    return data as T;
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (value === null || value === undefined) {
      throw new Error(`StorageAdapter: null/undefined prohibited at key "${key}"`);
    }
    const schema = this.registry.getSchema(key);
    if (schema) schema.parse(value);
    const version = this.registry.getVersion(key);
    const serialized = JSON.stringify({ version, data: value });
    this.quota.guard(key, serialized);
    await Preferences.set({ key, value: serialized });
    this.telemetry.emit({ traceId: `storage-set-${key}`, subsystem: 'storage', event: 'storage_write', timestamp: this.clock.now(), platform: this.platform, metadata: { key } });
  }

  async update<T>(key: string, fn: (val: T | undefined) => T | Promise<T>): Promise<void> {
    const current = await this.get<T>(key);
    const next = await fn(current);
    await this.set<T>(key, next);
  }

  async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
    this.telemetry.emit({ traceId: `storage-remove-${key}`, subsystem: 'storage', event: 'storage_remove', timestamp: this.clock.now(), platform: this.platform, metadata: { key } });
  }

  async keys(): Promise<string[]> {
    const { keys } = await Preferences.keys();
    return keys;
  }

  async clear(): Promise<void> {
    await Preferences.clear();
    this.telemetry.emit({ traceId: 'storage-clear', subsystem: 'storage', event: 'storage_clear', timestamp: this.clock.now(), platform: this.platform });
  }
}
```

**Quota Guard:**
```ts
// src/ts/main/infrastructure/storage/QuotaGuard.ts
export class QuotaGuard {
  private limits = new Map<string, number>();

  setLimit(key: string, bytes: number): void {
    this.limits.set(key, bytes);
  }

  guard(key: string, serialized: string): void {
    const limit = this.limits.get(key);
    if (limit !== undefined && serialized.length > limit) {
      throw new Error(`QuotaGuard: key "${key}" exceeds ${limit} byte limit (${serialized.length})`);
    }
  }
}
```

**Platform Factory:**
```ts
// src/ts/main/infrastructure/storage/factory.ts
import { Capacitor } from '@capacitor/core';
import { StorageAdapter } from './StorageAdapter';
import { WebStorageAdapter } from './WebStorageAdapter';
import { AndroidStorageAdapter } from './AndroidStorageAdapter';
import { SchemaRegistry } from './schemas/Registry';
import { QuotaGuard } from './QuotaGuard';
import { Clock } from '../clocks/Clock';
import { TelemetryBus } from '../telemetry/TelemetryBus';

export function createLocalStorageAdapter(
  registry: SchemaRegistry,
  quota: QuotaGuard,
  clock: Clock,
  telemetry: TelemetryBus,
): StorageAdapter {
  if (Capacitor.getPlatform() === 'android') {
    return new AndroidStorageAdapter(registry, quota, clock, telemetry);
  }
  return new WebStorageAdapter(localStorage, registry, quota, clock, telemetry);
}

export function createSessionStorageAdapter(
  registry: SchemaRegistry,
  quota: QuotaGuard,
  clock: Clock,
  telemetry: TelemetryBus,
): StorageAdapter {
  // sessionStorage is web-only; Android uses the same Capacitor adapter
  return new WebStorageAdapter(sessionStorage, registry, quota, clock, telemetry);
}
```

**Storage Invariants (enforced by adapters and `InvariantRegistry`):**
- All writes must pass Zod schema validation before being persisted.
- `null` or `undefined` must never be stored.
- Serialized payload must not exceed quota limits.
- Schema version must be stored in a `{ version, data }` envelope and validated on every read.
- Stale schema versions must trigger a registered migration before returning data.
- Corrupted or schema-invalid data on read must throw — not silently propagate.
- `spoony_api_key` must only be written when explicitly set by the user (no empty-string writes).

### 6.2 Lightweight Invariant Engine

**Files:**
```
src/ts/main/infrastructure/invariants/types.ts
src/ts/main/infrastructure/invariants/InvariantRegistry.ts
src/ts/main/infrastructure/invariants/checks/storageChecks.ts
src/ts/main/infrastructure/invariants/checks/lifecycleChecks.ts
src/ts/main/infrastructure/invariants/checks/quizChecks.ts
```

**Types:**
```ts
// src/ts/main/infrastructure/invariants/types.ts
export type InvariantSeverity = 'low' | 'high' | 'critical';
export type InvariantSubsystem = 'storage' | 'lifecycle' | 'quiz' | 'spoony' | 'boot' | 'invariant';

export type Invariant = {
  id: string;
  subsystem: InvariantSubsystem;
  description: string;
  severity: InvariantSeverity;
  check: () => void | Promise<void>;
};

export type InvariantViolation = {
  invariantId: string;
  subsystem: InvariantSubsystem;
  severity: InvariantSeverity;
  message: string;
  timestamp: number;
};
```

**Registry:**
```ts
// src/ts/main/infrastructure/invariants/InvariantRegistry.ts
import { Invariant, InvariantViolation, InvariantSubsystem } from './types';
import { Clock } from '../clocks/Clock';
import { TelemetryBus } from '../telemetry/TelemetryBus';

export class InvariantRegistry {
  private invariants: Invariant[] = [];
  private violations: InvariantViolation[] = [];

  constructor(
    private clock: Clock,
    private platform: 'web' | 'android',
    private telemetry?: TelemetryBus,
  ) {}

  register(inv: Invariant): void {
    this.invariants.push(inv);
  }

  async assertAll(options?: { subsystem?: InvariantSubsystem; throwOnViolation?: boolean }): Promise<void> {
    const subset = options?.subsystem
      ? this.invariants.filter(i => i.subsystem === options.subsystem)
      : this.invariants;

    for (const inv of subset) {
      try {
        await inv.check();
      } catch (e) {
        const violation: InvariantViolation = {
          invariantId: inv.id,
          subsystem: inv.subsystem,
          severity: inv.severity,
          message: e instanceof Error ? e.message : String(e),
          timestamp: this.clock.now(),
        };
        this.violations.push(violation);
        this.telemetry?.emit({
          traceId: `inv-${inv.id}`,
          subsystem: 'invariant',
          event: 'invariant_violation',
          timestamp: this.clock.now(),
          platform: this.platform,
          severity: inv.severity === 'critical' ? 'error' : 'warn',
          metadata: { invariantId: inv.id, message: violation.message },
        });
        if (options?.throwOnViolation !== false) throw e;
      }
    }
  }

  getViolations(): InvariantViolation[] { return [...this.violations]; }
  clearViolations(): void { this.violations = []; }
}
```

**SpoonFeeder Invariant Categories:**
- **Schema invariant:** All `localStorage` keys with registered schemas contain valid `{ version, data }` envelopes.
- **SaveData invariant:** The `SaveData[]` array for the active course is schema-valid; `cont: true` entries have a matching slide in the current course listing.
- **Lifecycle invariant:** Storage is not mutated after a Vue component `onUnmounted` has fired (dev builds).
- **Quota invariant:** Total `localStorage` usage remains below 4 MB (conservative guard below browser 5–10 MB limits).
- **Spoony invariant:** `spoony_api_key` is never written as an empty string.
- **Quiz invariant:** `Json.get()` contains at least one slide before `SaveData.set()` is called.

**Integration Points:**
- After every `StorageAdapter` `set` / `remove` / `clear`.
- After Quasar boot initialization completes.
- In Cypress `afterEach` hook.
- After Vue component `onUnmounted` in development builds.
- After any AI-generated patch application in test mode.
- After Android `App.addListener('appStateChange')` resume events.

### 6.3 Telemetry & Trace System

**Files:**
```
src/ts/main/infrastructure/telemetry/TelemetryEventSchema.ts
src/ts/main/infrastructure/telemetry/TelemetryBus.ts
src/ts/main/infrastructure/telemetry/reporters/VitestReporter.ts
```

**Schema:**
```ts
// src/ts/main/infrastructure/telemetry/TelemetryEventSchema.ts
import { z } from 'zod';

export const TelemetryEventSchema = z.object({
  traceId: z.string(),
  parentTraceId: z.string().optional(),
  subsystem: z.enum(['storage', 'lifecycle', 'quiz', 'spoony', 'boot', 'invariant']),
  event: z.string(),
  timestamp: z.number(),
  platform: z.enum(['web', 'android']),
  metadata: z.record(z.unknown()).optional(),
  severity: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  patchId: z.string().optional(),
});

export type TelemetryEvent = z.infer<typeof TelemetryEventSchema>;
```

**Bus:**
```ts
// src/ts/main/infrastructure/telemetry/TelemetryBus.ts
import { TelemetryEvent, TelemetryEventSchema } from './TelemetryEventSchema';
import { Clock } from '../clocks/Clock';

export class TelemetryBus {
  private buffer: TelemetryEvent[] = [];
  private readonly maxSize = 1000;
  private subscribers: ((event: TelemetryEvent) => void)[] = [];

  constructor(private clock?: Clock) {}

  emit(rawEvent: Omit<TelemetryEvent, 'timestamp'> & { timestamp?: number }): void {
    const stamped = { ...rawEvent, timestamp: rawEvent.timestamp ?? this.clock?.now() ?? Date.now() };
    const parsed = TelemetryEventSchema.safeParse(stamped);
    if (!parsed.success) {
      const fallback: TelemetryEvent = {
        traceId: 'malformed',
        subsystem: 'invariant',
        event: 'telemetry_schema_violation',
        timestamp: stamped.timestamp,
        platform: (stamped.platform as TelemetryEvent['platform']) ?? 'web',
        severity: 'error',
        metadata: { issues: parsed.error.issues },
      };
      this.buffer.push(fallback);
      if (this.buffer.length > this.maxSize) this.buffer.shift();
      return;
    }
    const validated = parsed.data;
    this.subscribers.forEach(fn => fn(validated));
    this.buffer.push(validated);
    if (this.buffer.length > this.maxSize) this.buffer.shift();
  }

  subscribe(fn: (event: TelemetryEvent) => void): () => void {
    this.subscribers.push(fn);
    return () => { this.subscribers = this.subscribers.filter(s => s !== fn); };
  }

  flush(): TelemetryEvent[] { const copy = [...this.buffer]; this.buffer = []; return copy; }
  snapshot(): TelemetryEvent[] { return [...this.buffer]; }
}
```

**Required Emission Points:**
- Every `StorageAdapter` read / write / remove / clear.
- Quasar boot start and complete.
- Spoony API request sent, response received, error.
- Quiz state transitions (BEGIN → CURRENT → NEXT → END).
- Every invariant check pass and violation.
- Every unhandled promise rejection and `console.error`.
- Every AI patch application (before/after hash).

### 6.4 Deterministic Execution Infrastructure

**Files:**
```
src/ts/main/infrastructure/clocks/Clock.ts
src/ts/main/infrastructure/clocks/RealClock.ts
src/ts/main/infrastructure/clocks/FakeClock.ts
src/ts/main/infrastructure/random/Rng.ts
src/ts/main/infrastructure/random/RealRng.ts
src/ts/main/infrastructure/random/FakeRng.ts
src/ts/test/support/deterministic-setup.ts
src/ts/test/support/storage-fixtures.ts
```

**Clock Interface:**
```ts
// src/ts/main/infrastructure/clocks/Clock.ts
export interface Clock {
  now(): number;
  setTimeout(fn: () => void, ms: number): number;
  clearTimeout(id: number): void;
  tick(ms: number): void;
}
```

**FakeClock:**
```ts
// src/ts/main/infrastructure/clocks/FakeClock.ts
import { Clock } from './Clock';

export class FakeClock implements Clock {
  private time = 0;
  private timers = new Map<number, { fn: () => void; fireAt: number }>();
  private nextId = 1;

  now(): number { return this.time; }

  setTimeout(fn: () => void, ms: number): number {
    const id = this.nextId++;
    this.timers.set(id, { fn, fireAt: this.time + ms });
    return id;
  }

  clearTimeout(id: number): void { this.timers.delete(id); }

  tick(ms: number): void {
    this.time += ms;
    for (const [id, t] of this.timers) {
      if (t.fireAt <= this.time) {
        this.timers.delete(id);
        t.fn();
      }
    }
  }

  reset(): void { this.time = 0; this.timers.clear(); this.nextId = 1; }
}
```

**FakeRng (mulberry32):**
```ts
// src/ts/main/infrastructure/random/FakeRng.ts
import { Rng } from './Rng';

export class FakeRng implements Rng {
  private state = 0;
  seed(value: number): void { this.state = value >>> 0; }
  random(): number {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}
```

**Test Storage Fixture (Map-backed, schema-validating):**
```ts
// src/ts/test/support/storage-fixtures.ts
import { StorageAdapter } from 'main/infrastructure/storage/StorageAdapter';
import { SchemaRegistry } from 'main/infrastructure/storage/schemas/Registry';

export function createTestStorageAdapter(
  registry?: SchemaRegistry
): StorageAdapter & { __dump(): Record<string, unknown> } {
  const store = new Map<string, { version: number; data: unknown }>();
  const adapter: StorageAdapter & { __dump(): Record<string, unknown> } = {
    platform: 'test' as unknown as 'web',
    async get<T>(key: string): Promise<T | undefined> {
      const wrapped = store.get(key);
      if (!wrapped) return undefined;
      const schema = registry?.getSchema(key);
      if (schema) schema.parse(wrapped.data);
      return wrapped.data as T;
    },
    async set<T>(key: string, value: T): Promise<void> {
      if (value === null || value === undefined) {
        throw new Error(`StorageAdapter: null/undefined prohibited at key "${key}"`);
      }
      const schema = registry?.getSchema(key);
      if (schema) schema.parse(value);
      const version = registry?.getVersion(key) ?? 1;
      store.set(key, { version, data: value });
    },
    async update<T>(key: string, fn: (val: T | undefined) => T | Promise<T>): Promise<void> {
      const current = await adapter.get<T>(key);
      const next = await fn(current);
      await adapter.set<T>(key, next);
    },
    async remove(key: string): Promise<void> { store.delete(key); },
    async keys(): Promise<string[]> { return Array.from(store.keys()); },
    async clear(): Promise<void> { store.clear(); },
    __dump(): Record<string, unknown> {
      return Object.fromEntries(Array.from(store.entries()).map(([k, v]) => [k, v.data]));
    },
  };
  return adapter;
}
```

**Vitest Setup:**
```ts
// src/ts/test/support/deterministic-setup.ts
import { beforeEach, afterEach } from 'vitest';
import { FakeClock } from 'main/infrastructure/clocks/FakeClock';
import { FakeRng } from 'main/infrastructure/random/FakeRng';

export const testClock = new FakeClock();
export const testRng = new FakeRng();
export const TEST_SEED = 42;
export const TEST_NOW = 1715064000000; // 2024-05-07T12:00:00Z

beforeEach(() => {
  testClock.reset();
  testClock.tick(TEST_NOW);
  testRng.seed(TEST_SEED);
});

afterEach(() => {
  testClock.reset();
});
```

**Forbidden in Business Logic:**
- Direct `Date.now()`, `Math.random()`, `setTimeout`, `clearTimeout` calls.
- Direct `localStorage.setItem`, `sessionStorage.setItem`, or `Preferences.set` calls outside adapter implementations.
- Must use injected `clock`, `rng`, and `storageAdapter`.

### 6.5 Property-Based Testing

**Package:** `fast-check`

**Pattern:**
```ts
// src/ts/test/quiz/saveData.property.test.ts
import { describe, it } from 'vitest';
import fc from 'fast-check';
import { createTestStorageAdapter } from '../support/storage-fixtures';
import { SaveDataArraySchema } from 'main/infrastructure/storage/schemas/spoonfeederSchemas';
import { SchemaRegistry } from 'main/infrastructure/storage/schemas/Registry';

const registry = new SchemaRegistry();
registry.register({ key: 'testCourse', version: 1, schema: SaveDataArraySchema });

const saveDataItemArbitrary = fc.record({
  txt: fc.string({ minLength: 1, maxLength: 200 }),
  result: fc.oneof(fc.string(), fc.array(fc.string()), fc.array(fc.integer())),
  ts: fc.string({ minLength: 14, maxLength: 14 }),
  cont: fc.boolean(),
});

describe('SaveData storage', () => {
  it('remains schema-valid for all sequences of set and remove operations', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.oneof(
          fc.record({ action: fc.constant('set'), value: fc.array(saveDataItemArbitrary) }),
          fc.record({ action: fc.constant('remove') }),
        )),
        async (actions) => {
          const storage = createTestStorageAdapter(registry);
          for (const action of actions) {
            if (action.action === 'set') {
              await storage.set('testCourse', action.value);
            } else {
              await storage.remove('testCourse');
            }
          }
          const raw = await storage.get('testCourse');
          if (raw !== undefined) {
            SaveDataArraySchema.parse(raw);
          }
        }
      ),
      { numRuns: 500, seed: 42 }
    );
  });
});
```

**Pattern Statement:** For all sequences of legal storage operations, the persisted state must remain schema-valid and subsystem invariants must hold.

### 6.6 Mutation Testing

**Packages:** `@stryker-mutator/core` + `@stryker-mutator/vitest-runner`

**Config:** `stryker.config.mjs`
```js
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
  testRunner: 'vitest',
  vitest: { configFile: 'vitest.config.ts' },
  reporters: ['html', 'clear-text', 'progress'],
  mutate: [
    'src/ts/main/dataaccess/**/*.ts',
    'src/ts/main/quiz/**/*.ts',
    '!src/ts/main/**/*.test.ts',
    '!src/ts/main/**/*.property.test.ts',
  ],
  thresholds: { high: 80, low: 70, break: 70 },
};
```

Mutation testing is a Phase 4 gate (subsystem migration completion), not an incremental patch gate.

### 6.7 Semantic Analysis & Patch Validation

**Existing tools (ADAPT):**
- `dpdm` — circular dependency check on `quiz.ts` (already wired as `yarn circular`)
- `knip` — dead-code and unused-export detection (already present)
- `vue-tsc` — TypeScript type safety
- ESLint + Prettier — style and lint

**New tools (INTRODUCE):**
- `dependency-cruiser` — enforces the no-direct-storage rule across all non-infrastructure source files
- Custom scripts for boolean cluster detection, side-effect scanning, security scanning

**Files:**
```
analysis/dependency-cruiser.config.js
scripts/storage-key-audit.ts
scripts/boolean-cluster-scanner.ts
scripts/side-effect-scanner.ts
scripts/security-scan.ts
scripts/perf-scan.ts
scripts/ai-patch-validate.ts
```

**Dependency Cruiser Config:**
```js
// analysis/dependency-cruiser.config.js
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-direct-webstorage',
      comment: 'All localStorage/sessionStorage access must go through StorageAdapter',
      severity: 'error',
      from: { path: '^src/ts/(?!main/infrastructure/storage)' },
      to: { path: '^src/ts/main/dataaccess/persistence/webPersistence' },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsConfig: { fileName: './tsconfig.json' },
  },
};
```

**Patch Validation Rules — `scripts/ai-patch-validate.ts`:**
An AI patch is rejected if it:
- Introduces new dependency cycles (checked via `dependency-cruiser`).
- Introduces new boolean clusters (≥3 boolean fields on one state object).
- Bypasses `StorageAdapter` by calling `localStorage.setItem`, `sessionStorage.setItem`, `Preferences.set`, or constructing `WebStorageVariable`/`WebStorageFlag` outside `src/ts/main/infrastructure/storage`.
- Removes or disables invariant checks.
- Removes or disables telemetry emission.
- Changes Zod schemas without bumping the registered version number.
- Adds `Date.now()`, `Math.random()`, `setTimeout`, or `clearTimeout` outside injected adapters.
- Introduces `any`, unsafe type assertions, or `@ts-ignore`.
- Introduces `eval`, `new Function`, unsafe `innerHTML`, hardcoded API keys, or prototype pollution.
- Adds new third-party dependencies without explicit approval.
- Leaves dead code or unused exports (checked via `knip`).
- Breaks `yarn lint`, `yarn type-check`, or `yarn test:unit`.
- Removes or weakens `aria-*` attributes or keyboard handlers without replacement.
- Introduces unbounded loops or synchronous blocking in async paths.

### 6.8 Differential Replay & Regression Containment

**Package:** `microdiff`

**Script:** `scripts/differential-replay.ts`

Runs the Cypress `example.cy.ts` suite against the baseline branch and the patched branch, then compares:
- Storage snapshots via `microdiff` (local storage dumps at `afterEach`).
- Telemetry event order (timing deviations triaged per-event-type).
- `console.error` counts.
- Unhandled rejection counts.

**Replay Trace Format:**
```ts
type ReplayTrace = {
  seed: number;
  platform: 'web' | 'android';
  telemetrySchemaVersion: number;
  events: TelemetryEvent[];
  storageSnapshot: Record<string, unknown>;
  invariantViolations: InvariantViolation[];
};
```

**Cypress Storage Snapshot Command:**
```ts
// cypress/support/telemetry-commands.ts
Cypress.Commands.add('snapshotStorage', () => {
  cy.window().then((win) => {
    const dump: Record<string, unknown> = {};
    for (let i = 0; i < win.localStorage.length; i++) {
      const k = win.localStorage.key(i)!;
      try { dump[k] = JSON.parse(win.localStorage.getItem(k)!); } catch { dump[k] = win.localStorage.getItem(k); }
    }
    cy.writeFile(
      `cypress/replay/snapshots/${Cypress.currentTest.titlePath.join('--')}.storage.json`,
      dump
    );
  });
});
```

**Deviation Triage:** Timing deviations must be triaged against per-event-type thresholds. Storage state deviations outside the intended behavioral change are flagged and block auto-merge.

### 6.9 Error Handling & Recovery Contracts

- All AI patches must preserve or improve error handling.
- `SaveData.get()` must throw on parse failure (currently silently crashes on corrupted data).
- Storage write failures must not leave the application in a partially updated state; the `update` method's serialized per-key queue prevents same-key race conditions.
- Spoony API calls already use `AbortController`; after migration the timeout must use injected `Clock.setTimeout`.
- Unhandled promise rejections must not increase; the Cypress `uncaught:exception` catch-all (`return false`) must be replaced with targeted suppression of known third-party library errors only.
- Retry logic in Spoony must use exponential backoff with jitter (not currently present); AI patches that add retry logic must implement backoff with `AbortController` cancellation on component teardown.

### 6.10 Concurrency & Race Condition Model

- `WebStorageAdapter.update` serializes per-key writes via a `pending` `Map<string, Promise>` chain.
- The Android `AndroidStorageAdapter.update` does not serialize (single-threaded JS on Android is safe, but the pattern should be consistent — a future revision should add the same pending chain).
- Cross-tab `storage` events on Web must not trigger infinite write loops; adapters must guard against re-processing their own writes.
- Vue `watchEffect` cleanup functions and `AbortController` are the canonical patterns for cancelling in-flight Spoony API calls on component teardown.

### 6.11 Rollback & Feature Flag Infrastructure

- Prior storage schema versions must remain readable for at least one release cycle via registered migration functions.
- Telemetry events include a `patchId` field so production issues can be correlated with specific AI patches.
- AI patches that alter quiz evaluation or save-data schema may be guarded behind a URL query-param feature flag (`?ff=patch-id`) for staged rollout.

---

## 7. AI Repair Pipeline Specification

### 7.1 Agent Roles & Responsibilities

| Agent | Responsibility | Input | Output |
|---|---|---|---|
| **Auditor** | Find bugs via static analysis, property test failures, invariant violations | Codebase, dependency graph, mutation report | Structured finding JSON |
| **Reproducer** | Generate deterministic failing trace | Finding | Replay trace + seed |
| **Instrumenter** | Add telemetry and invariants around affected area | Finding location | Instrumented code diff |
| **Specifier** | Define formal invariants for the affected subsystem | Trace + code | Invariant definitions |
| **Fixer** | Generate minimal patch | Trace + invariants | Patch diff |
| **Verifier** | Run property tests, mutation tests, differential replay | Patch diff | Verification report |
| **Risk Agent** | Blast radius analysis | Patch diff + dependency graph | Confidence score |
| **Documenter** | Update inline comments and subsystem docs | Patch diff | Documentation diff |
| **Cleanup Agent** | Remove dead code, unused imports, revert temporary instrumentation | Patch diff | Cleanup diff |

**Never let the same agent self-certify.**

### 7.2 Confidence Score Schema

Every fix must emit:
```json
{
  "bug_reproduced": true,
  "reproduction_determinism": 0.94,
  "invariants_added": 2,
  "storage_invariants_passed": true,
  "mutation_score": 0.82,
  "e2e_tests_passed": true,
  "differential_deviations": 0,
  "blast_radius": "low",
  "confidence": 0.88,
  "patch_constraints_violated": [],
  "security_scan_passed": true,
  "type_safety_passed": true,
  "performance_regression": "none",
  "accessibility_preservation_passed": true,
  "new_dependencies_added": false
}
```

`storage_invariants_passed` maps to the `InvariantRegistry.assertAll({ subsystem: 'storage' })` result.

**Gate:** Patches with `confidence` < 0.85, any constraint violations, or any failed security/type/performance/accessibility scan require human approval.

### 7.3 Constraints on AI-Generated Patches

**Allowed:**
- Modify transition logic inside explicit state models (migrated subsystems).
- Add/modify Zod schemas with version bump and registered migration.
- Add invariant checks.
- Add telemetry events.
- Modify effect handlers (functions that call storage, network, or native APIs).
- Add guards and null-safety checks.
- Add error handling boundaries.
- Add `AbortController` cancellation logic for in-flight Spoony requests.

**Forbidden:**
- Direct `localStorage.setItem`, `sessionStorage.setItem`, or `Preferences.set` calls outside `StorageAdapter` implementations.
- Direct `Date.now()`, `Math.random()`, `setTimeout`, or `clearTimeout` calls outside injected adapters.
- Removing invariant checks.
- Removing telemetry emission.
- Introducing hidden mutable state outside injected adapters.
- Changing storage keys without schema registration.
- Introducing `any`, unsafe type assertions, or `@ts-ignore`.
- Introducing `eval`, `new Function`, unsafe `innerHTML`, hardcoded API keys, or prototype pollution.
- Adding new third-party dependencies without explicit approval.
- Leaving dead code, unused imports, or unreachable branches.
- Breaking `yarn lint`, `yarn type-check`, or `yarn test:unit`.
- Removing or weakening `aria-*` attributes or keyboard handlers.
- Introducing unbounded loops or synchronous blocking in async paths.
- Bypassing error handling boundaries.

### 7.4 Mandatory Human Escalation Categories

Regardless of confidence score, the following changes MUST NOT be auto-merged:
- Changes to Spoony API key storage or handling (currently stored as plain `localStorage` string — migration to encrypted storage is a security escalation).
- Changes to authentication or authorization logic.
- Changes affecting student data retention or privacy (save data purge, export).
- Changes to financial transactions, pricing, or billing logic.
- Patches that introduce a significant performance regression (>10% increase in execution time or memory usage).
- Breaking changes to the `SaveData` array schema or `courseName`-keyed save-data format.
- Patches that modify the patch validation rules themselves.
- Patches that the differential replay flags with storage state deviations.

### 7.5 LLM Context Window & Scale Strategy

- If a composable or TypeScript module exceeds the LLM's effective context window, decompose via the dependency graph before repair.
- The Fixer agent receives only the affected module, its direct dependencies, and the relevant invariant definitions.
- Cross-module fixes proceed via a coordinator agent that validates interface consistency across patch boundaries.
- If a patch explanation exceeds the token budget, split into smaller incremental fixes.
- SpoonFeeder-specific: treat `SaveData` + `webStorage.ts` + `webPersistence.ts` as one logical repair unit (they are tightly coupled); treat `spoonyApi.ts` + `spoonyStorage.ts` as another.

---

## 8. Domain & Platform Considerations

SpoonFeeder is a **client-side application** in the sense of the domain matrix: state persists through a browser/device storage layer (not a backend database), the application is single-page, and there is no server component. The primary domain is §8.2 (Client-Side Applications) of the abstract principles.

### 8.1 Universal Principles

The following apply without adaptation:
- **Deterministic Reproducibility** — replay traces, deterministic clocks, isolated fixtures.
- **AI-Constrained Repair** — invariant preservation, semantic contracts, side-effect boundaries, security boundaries.
- **Invariant-Driven Verification** — runtime checks are more stable than unit tests.
- **Semantic Patch Validation** — dependency cycles, boolean clusters, dead code, and secret scanning.
- **Human-in-the-Loop Escalation** — API key handling, student data privacy, financial logic always require human review.

### 8.2 Storage Adapter Pattern

| Platform | Adapter | Underlying API | Sync / Async | Quota |
|---|---|---|---|---|
| Web (SPA) | `WebStorageAdapter(localStorage, ...)` | `localStorage` | Sync | 5–10 MB; throws `QuotaExceededError` |
| Web (session) | `WebStorageAdapter(sessionStorage, ...)` | `sessionStorage` | Sync | Tab-scoped; no persistent quota concern |
| Android | `AndroidStorageAdapter` | `@capacitor/preferences` | Async | OS-managed |

**Platform Detection:** `Capacitor.getPlatform()` inside `factory.ts`.

### 8.3 Lifecycle Invariants per Platform

**Web:**
- No storage mutation during `beforeunload`.
- Cross-tab `storage` events must not trigger infinite write loops.
- `visibilitychange` must flush pending async storage writes when hidden.

**Android (Capacitor):**
- `App.addListener('appStateChange')` `pause` event must flush pending writes.
- `resume` event must re-validate storage schema (OS may have evicted memory).
- Capacitor plugin calls must not occur before `Capacitor.isNativePlatform()` is confirmed.

### 8.4 Server-Side / Embedded

Not applicable. SpoonFeeder has no backend and does not target safety-critical embedded hardware.

### 8.5 Spoony AI Tutor — Special Considerations

The Spoony subsystem makes external network calls to `gen.pollinations.ai`. This is the only side-effecting network subsystem.

- `sendMessage` in `spoonyApi.ts` must accept an injected `Clock` for its `AbortController` timeout.
- Spoony API key (`spoony_api_key`) is stored in plain `localStorage` — a human-escalation security finding. Encryption at rest (Web Crypto API or Capacitor Biometrics) is out of scope for Phase 1 but must be flagged.
- Spoony conversation history (`SpoonyMessage[]`) is currently held in-memory only; if persistence is added, it must go through `StorageAdapter` with a registered schema.

---

## 9. Exact Directory Structure

```
src/ts/main/
  infrastructure/
    storage/
      StorageAdapter.ts
      WebStorageAdapter.ts
      AndroidStorageAdapter.ts
      QuotaGuard.ts
      factory.ts
      schemas/
        Registry.ts
        spoonfeederSchemas.ts
        migrations/
    invariants/
      types.ts
      InvariantRegistry.ts
      checks/
        storageChecks.ts
        lifecycleChecks.ts
        quizChecks.ts
    telemetry/
      TelemetryEventSchema.ts
      TelemetryBus.ts
      reporters/
        VitestReporter.ts
    clocks/
      Clock.ts
      RealClock.ts
      FakeClock.ts
    random/
      Rng.ts
      RealRng.ts
      FakeRng.ts
    replay/
      ReplayTrace.ts
      TraceRecorder.ts
    effects/
      EffectScheduler.ts
      types.ts

src/ts/test/
  support/
    deterministic-setup.ts
    storage-fixtures.ts
  quiz/
    saveData.property.test.ts
    stateActionDispatcher.property.test.ts
  spoony/
    spoonyApi.property.test.ts
  replay/
    traces/
    baselines/
    snapshots/

cypress/
  e2e/
    example.cy.ts           (existing — adapt)
    invariants.cy.ts        (new)
  support/
    commands.ts             (existing)
    e2e.ts                  (existing — adapt)
    telemetry-commands.ts   (new)
  replay/
    snapshots/
    baselines/

analysis/
  dependency-cruiser.config.js

scripts/
  ai-patch-validate.ts
  differential-replay.ts
  storage-key-audit.ts
  boolean-cluster-scanner.ts
  side-effect-scanner.ts
  security-scan.ts
  perf-scan.ts
  generate-invariant-report.ts
```

---

## 10. Migration Strategy with Concrete Gates

### Phase 1 — Infrastructure Foundation (No Behavioral Changes)

1. Implement `StorageAdapter` interface + `WebStorageAdapter` (localStorage and sessionStorage variants) + `Map`-backed test adapter.
2. Implement `SchemaRegistry` with Zod and register all nine SpoonFeeder storage keys.
3. Implement `TelemetryBus` and `InvariantRegistry`.
4. Add `FakeClock`, `RealClock`, `FakeRng`, `RealRng`.
5. Create `src/ts/test/support/deterministic-setup.ts` with clock + storage isolation.
6. Configure `dependency-cruiser` with the `no-circular` and `no-direct-webstorage` rules.
7. Confirm all existing `yarn type-check`, `yarn lint`, `yarn test:unit`, and `yarn test:e2e` pass.

**Gate:** All existing Vitest and Cypress tests pass; `yarn type-check` and `yarn lint` pass; `dependency-cruiser` runs without errors.

### Phase 2 — Automated Gap Analysis

1. Run `scripts/storage-key-audit.ts` to find all direct `localStorage.setItem`, `sessionStorage.setItem`, `WebStorageVariable`, and `WebStorageFlag` usages outside `src/ts/main/infrastructure/storage`.
2. Run `scripts/boolean-cluster-scanner.ts` on `src/ts/main/dataaccess` and `src/ts/main/quiz`.
3. Run `scripts/side-effect-scanner.ts` to find `Date.now()`, `Math.random()`, `setTimeout` in business logic.
4. Run `scripts/security-scan.ts` to find `eval`, unsafe `innerHTML`, and hardcoded API keys.
5. Generate ranked subsystem report by bug-proneness.

### Phase 3 — Storage Abstraction & Schema Enforcement

1. Migrate `webStorage.ts` (`COURSE_NAME`, `setSaveData`, `getSaveData`, `setCourseListing`, `getCourseListing`, `clearCourseListing`, `clearSessionStorage`) to use `StorageAdapter`.
2. Migrate `spoonyStorage.ts` (`SPOONY_API_KEY`, `SPOONY_ENABLED`, `SPOONY_MODEL`) to use `StorageAdapter`.
3. Register per-course save data keys dynamically when a course is loaded.
4. Add storage invariant checks in `InvariantRegistry`.
5. Ensure all Cypress E2E tests still pass.

**Gate:** `scripts/storage-key-audit.ts` reports zero direct `localStorage`/`sessionStorage` usages outside the adapter layer.

### Phase 4 — Incremental Subsystem & Invariant Migration

**Priority 1: SaveData subsystem**
1. Inject `Clock` into `timestampNow` (replaces `Date.now()`).
2. Add `SaveData` schema invariants.
3. Add `fast-check` property tests for `SaveData` storage operations.
4. Add Cypress workflow with storage snapshot assertions.
5. Run StrykerJS; gate at mutation score ≥ 70%.

**Priority 2: StateActionDispatcher subsystem**
1. Model `RefreshState` as an explicit discriminated union (not just an internal enum).
2. Add quiz invariants (`quizChecks.ts`): `SaveDataDispatcher.next()` and `.end()` must not throw in reachable states.
3. Add property tests for arbitrary quiz state sequences.

**Priority 3: Spoony subsystem**
1. Inject `Clock` into `spoonyApi.ts` `AbortController` timeout.
2. Add `fast-check` property tests for message-sequence robustness.
3. Flag `spoony_api_key` plain-text storage as a human-escalation security finding.

**Gate per subsystem:** Mutation score ≥ 70% (StrykerJS).

### Phase 5 — AI Repair Constraints

1. Enforce `scripts/ai-patch-validate.ts` rules on any AI-generated diff.
2. Require confidence score ≥ 0.85 for auto-merge.
3. Integrate differential replay into local verification pipeline.
4. Adapt Cypress `example.cy.ts` `uncaught:exception` handler: remove `return false` catch-all; suppress only known third-party errors by message pattern.

### Phase 6 — Self-Consistency Audit

1. Verify every §6 requirement has a concrete implementation.
2. Run all semantic scanners against `src/ts/main/infrastructure` itself:
   - `scripts/side-effect-scanner.ts` — no `Date.now()` or `setTimeout` outside injected adapters in infrastructure code.
   - `scripts/security-scan.ts` — no hardcoded keys or `eval` in infrastructure.
   - `scripts/storage-key-audit.ts` — no direct `localStorage` calls outside `WebStorageAdapter`.
   - `knip` — no orphaned exports in infrastructure.
   - `scripts/boolean-cluster-scanner.ts` — no boolean clusters in infrastructure state objects.
   - `dependency-cruiser` — no new dependency cycles within infrastructure.
3. Fix any violations where infrastructure code breaks the rules it enforces.

**Gate:** All infrastructure self-consistency checks pass.

---

## 11. Testing Standards

### 11.1 Existing Tests
All existing Vitest unit tests (`src/ts/test/`) and Cypress E2E tests (`cypress/e2e/example.cy.ts`) MUST pass at every phase gate.

### 11.2 New Test Categories

**Storage Property Tests:** For all sequences of `set` / `remove` / `update` operations on a storage key, the resulting data must pass Zod schema validation. Quota boundary conditions explored via `fast-check` size arbitraries.

**Transition Coverage Tests (migrated subsystems):** All legal `RefreshState` transitions reachable; illegal transitions rejected by guards.

**Replay Tests:** A recorded trace from a failed `fast-check` run reproduces identically when played back with the same seed.

**Differential Tests:** Baseline vs. patched storage snapshots must match except for intended behavioral changes.

**Invariant Stability Tests:** `InvariantRegistry.assertAll()` must pass after every Cypress workflow.

**Flakiness Detection:** Any test producing different results across three consecutive runs with identical seeds must be quarantined as an infrastructure bug.

### 11.3 End-to-End Behavioral Oracle

Instrument Cypress to:
- Fail on `console.error` (except targeted suppressions for known third-party errors).
- Fail on unhandled promise rejections.
- Collect telemetry event sequence via `cy.window()` access to `TelemetryBus.snapshot()`.
- Snapshot storage state via `cy.snapshotStorage()` at end of each test.
- Assert no orphan `setTimeout` after test completes (tracked via `Clock` instrumentation).
- Assert no accessibility regressions (use `cypress-axe` if added; flag removal of ARIA attributes otherwise).

---

## 12. Metrics & Deliverables

### 12.1 Reliability Metrics
- Flaky test rate (target: < 1%).
- Replay success rate (target: > 98%).
- Invariant violation frequency in development.
- Regression frequency per release.

### 12.2 AI Effectiveness Metrics
- Repair success rate.
- Semantic patch size (AST node delta).
- Invariant preservation rate.
- Mutation score of AI-generated tests.
- False positive rate of the Auditor agent.

### 12.3 Observability Metrics
- Storage operation trace coverage (target: 100% of `StorageAdapter` methods).
- Subsystem transition coverage (for migrated subsystems).
- Invariant check coverage.
- Schema registration coverage (all storage keys registered: target 100%).
- Telemetry schema version compatibility rate.

### 12.4 Security & Quality Metrics
- Security scan pass rate for AI patches.
- Type safety regression rate.
- Performance budget adherence.
- Accessibility preservation rate.

### 12.5 Final Deliverables
1. **Infrastructure:** `StorageAdapter`, `SchemaRegistry`, `InvariantRegistry`, `TelemetryBus`, `FakeClock`, `FakeRng`, `TraceRecorder`.
2. **Schema Registrations:** All nine SpoonFeeder storage keys registered with Zod schemas and version numbers.
3. **Analysis Tools:** `dependency-cruiser` config, `storage-key-audit.ts`, `boolean-cluster-scanner.ts`, `side-effect-scanner.ts`, `security-scan.ts`, `perf-scan.ts`, `ai-patch-validate.ts`.
4. **Testing Harness:** `fast-check` property tests for `SaveData`, `StateActionDispatcher`, and Spoony; `differential-replay.ts`; StrykerJS config; deterministic test setup file.
5. **Migration:** At least 3 subsystems migrated (`SaveData`, `StateActionDispatcher`, Spoony) with invariants, property tests, telemetry, and storage schemas.
6. **Documentation:** AI agent constraint manifest, patch validation checklist, confidence score template, mandatory escalation categories.

---

## 13. Hard Constraints for AI Patches

### MUST NOT
- Rewrite the entire SpoonFeeder codebase.
- Centralize all quiz state into a monolithic machine.
- Break public composable APIs or Vue component interfaces.
- Change the on-disk `SaveData` JSON format without a registered migration.
- Alter production slide rendering or answer evaluation behavior during migration.
- Introduce XSS, injection, unsafe eval, or hardcoded secrets.
- Introduce `any`, unsafe type assertions, or `@ts-ignore`.
- Add new third-party dependencies without explicit approval.
- Leave dead code, unused imports, or unreachable branches.
- Break `yarn lint`, `yarn type-check`, or `yarn test:unit`.
- Remove or weaken `aria-*` attributes or keyboard handlers without replacement.
- Introduce unbounded loops or synchronous blocking in async paths.
- Bypass error handling boundaries.
- Remove or disable invariant checks.
- Remove or disable telemetry emission.

### MUST
- Preserve incremental migration (legacy `WebStorageVariable`/`WebStorageFlag` code coexists until migrated).
- Preserve determinism via injected `Clock` and `Rng`.
- Preserve replayability via `TelemetryBus` and storage snapshots.
- Preserve subsystem isolation (quiz, save data, spoony are independent units).
- Preserve traceability via `patchId` in telemetry.
- Preserve invariant enforcement at every phase gate.
- Preserve or improve error handling.
- Preserve type safety (strict TypeScript with `vue-tsc`).
- Preserve accessibility.
- Update documentation when behavior changes.
- Pass all security, type safety, performance, and dead-code scans.
- Respect mandatory human escalation categories.

---

## Package.json Script Additions

```json
{
  "scripts": {
    "test:property": "vitest run --config vitest.config.ts src/ts/test/**/*.property.test.ts",
    "test:mutation": "stryker run",
    "test:baseline": "npx cypress run --env saveBaseline=true",
    "test:diff": "node scripts/differential-replay.ts",
    "scan:storage": "node scripts/storage-key-audit.ts",
    "scan:security": "node scripts/security-scan.ts",
    "scan:sideeffects": "node scripts/side-effect-scanner.ts",
    "scan:clusters": "node scripts/boolean-cluster-scanner.ts",
    "scan:deps": "npx dependency-cruiser --config analysis/dependency-cruiser.config.js src/ts",
    "ai:validate": "node scripts/ai-patch-validate.ts",
    "verify": "yarn type-check && yarn lint && yarn test:unit && yarn test:property && yarn scan:security && yarn scan:storage && yarn scan:sideeffects && yarn scan:deps && yarn test:e2e"
  }
}
```

`test:mutation` is excluded from `verify` because mutation testing is a Phase 4 subsystem-migration gate, not an incremental patch gate.

---

*End of concrete implementation PRD for SpoonFeeder. This document is self-contained. A developer on SpoonFeeder can implement the bugfixing platform using only this document, without reading any abstract principles or prior example.*
