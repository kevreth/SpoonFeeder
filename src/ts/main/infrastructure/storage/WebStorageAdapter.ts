import type { Clock } from '../clocks/Clock';
import type { TelemetryBus } from '../telemetry/TelemetryBus';
import type { StorageAdapter } from './StorageAdapter';
import type { QuotaGuard } from './QuotaGuard';
import type { SchemaRegistry } from './schemas/Registry';

type VersionedEnvelope = { version: number; data: unknown };

function isVersionedEnvelope(value: unknown): value is VersionedEnvelope {
  return (
    typeof value === 'object' &&
    value !== null &&
    'version' in value &&
    'data' in value &&
    typeof (value as VersionedEnvelope).version === 'number'
  );
}

export class WebStorageAdapter implements StorageAdapter {
  readonly platform = 'web' as const;
  private pending = new Map<string, Promise<void>>();

  constructor(
    private target: Storage,
    private registry: SchemaRegistry,
    private quota: QuotaGuard,
    private clock: Clock,
    private telemetry: TelemetryBus
  ) {}

  async get<T>(key: string): Promise<T | undefined> {
    const raw = this.target.getItem(key);
    if (raw === null) {
      this.telemetry.emit({
        traceId: `storage-miss-${key}`,
        subsystem: 'storage',
        event: 'storage_read_miss',
        timestamp: this.clock.now(),
        platform: this.platform,
        metadata: { key },
      });
      return undefined;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      this.target.removeItem(key);
      console.error(`[StorageAdapter] Corrupted JSON at key "${key}" — key cleared, user may need to re-enter data`);
      this.telemetry.emit({
        traceId: `storage-corrupt-${key}`,
        subsystem: 'storage',
        event: 'storage_corruption_detected',
        severity: 'error',
        timestamp: this.clock.now(),
        platform: this.platform,
        metadata: { key },
      });
      return undefined;
    }

    const registeredVersion = this.registry.getVersion(key);
    const schema = this.registry.getSchema(key);
    let data: unknown;

    if (isVersionedEnvelope(parsed)) {
      if (parsed.version !== registeredVersion) {
        const migrate = this.registry.getMigration(key);
        if (!migrate) {
          throw new Error(
            `StorageAdapter: missing migration for "${key}" v${parsed.version} → v${registeredVersion}`
          );
        }
        data = migrate(parsed.data, parsed.version, registeredVersion);
        if (schema) schema.parse(data);
        this.target.setItem(key, JSON.stringify({ version: registeredVersion, data }));
      } else {
        data = parsed.data;
        if (schema) schema.parse(data);
      }
    } else {
      // Legacy value written before the adapter was introduced — no version envelope.
      // Schema validation is skipped: pre-migration data cannot be guaranteed to match.
      // It will be validated on the next write through the adapter.
      data = parsed;
    }

    this.telemetry.emit({
      traceId: `storage-get-${key}`,
      subsystem: 'storage',
      event: 'storage_read',
      timestamp: this.clock.now(),
      platform: this.platform,
      metadata: { key },
    });
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
        throw Object.assign(new Error(`StorageAdapter: quota exceeded for key "${key}"`), { cause: e });
      }
      throw e;
    }
    this.telemetry.emit({
      traceId: `storage-set-${key}`,
      subsystem: 'storage',
      event: 'storage_write',
      timestamp: this.clock.now(),
      platform: this.platform,
      metadata: { key },
    });
  }

  async update<T>(key: string, fn: (val: T | undefined) => T | Promise<T>): Promise<void> {
    const previous = this.pending.get(key) ?? Promise.resolve();
    const operation = previous.then(async () => {
      const current = await this.get<T>(key);
      const next = await fn(current);
      await this.set<T>(key, next);
    });
    this.pending.set(key, operation);
    void operation.finally(() => {
      if (this.pending.get(key) === operation) this.pending.delete(key);
    });
    await operation;
  }

  async remove(key: string): Promise<void> {
    this.target.removeItem(key);
    this.telemetry.emit({
      traceId: `storage-remove-${key}`,
      subsystem: 'storage',
      event: 'storage_remove',
      timestamp: this.clock.now(),
      platform: this.platform,
      metadata: { key },
    });
  }

  async keys(): Promise<string[]> {
    return Array.from({ length: this.target.length }, (_, i) => this.target.key(i) as string);
  }

  async clear(): Promise<void> {
    this.target.clear();
    this.telemetry.emit({
      traceId: 'storage-clear',
      subsystem: 'storage',
      event: 'storage_clear',
      timestamp: this.clock.now(),
      platform: this.platform,
    });
  }
}
