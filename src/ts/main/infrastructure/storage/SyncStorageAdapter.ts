import type { Clock } from '../clocks/Clock';
import type { TelemetryBus } from '../telemetry/TelemetryBus';
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

/**
 * Synchronous storage wrapper for use with browser Storage APIs (localStorage/sessionStorage).
 * Provides schema validation, version envelope, quota guard, and telemetry — identically to
 * WebStorageAdapter — but without the async interface. Suitable only for Web targets where
 * the underlying Storage API is guaranteed synchronous.
 */
export class SyncStorageAdapter {
  readonly platform = 'web' as const;

  constructor(
    private target: Storage,
    private registry: SchemaRegistry,
    private quota: QuotaGuard,
    private clock: Clock,
    private telemetry: TelemetryBus
  ) {}

  get<T>(key: string): T | undefined {
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
      this.reportCorruption(key, 'corrupted JSON');
      return undefined;
    }

    const registeredVersion = this.registry.getVersion(key);
    const schema = this.registry.getSchema(key);
    let data: unknown;

    try {
      if (isVersionedEnvelope(parsed)) {
        if (parsed.version !== registeredVersion) {
          const migrate = this.registry.getMigration(key);
          if (!migrate) {
            throw new Error(
              `missing migration v${parsed.version} → v${registeredVersion}`
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
    } catch (e) {
      this.reportCorruption(key, e instanceof Error ? e.message : String(e));
      return undefined;
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

  private reportCorruption(key: string, reason: string): void {
    this.target.removeItem(key);
    console.error(
      `[SyncStorageAdapter] ${reason} at key "${key}" — key cleared, user may need to re-enter data`
    );
    this.telemetry.emit({
      traceId: `storage-corrupt-${key}`,
      subsystem: 'storage',
      event: 'storage_corruption_detected',
      severity: 'error',
      timestamp: this.clock.now(),
      platform: this.platform,
      metadata: { key, reason },
    });
  }

  set<T>(key: string, value: T): void {
    if (value === null || value === undefined) {
      throw new Error(`SyncStorageAdapter: null/undefined prohibited at key "${key}"`);
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
        throw Object.assign(new Error(`SyncStorageAdapter: quota exceeded for key "${key}"`), {
          cause: e,
        });
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

  remove(key: string): void {
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

  clear(): void {
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
