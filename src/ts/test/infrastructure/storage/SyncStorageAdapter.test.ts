import { describe, it, expect, beforeEach } from 'vitest';
import { z } from 'zod';
import { SyncStorageAdapter } from '../../../main/infrastructure/storage/SyncStorageAdapter';
import { SchemaRegistry } from '../../../main/infrastructure/storage/schemas/Registry';
import { QuotaGuard } from '../../../main/infrastructure/storage/QuotaGuard';
import { TelemetryBus } from '../../../main/infrastructure/telemetry/TelemetryBus';
import { FakeClock } from '../../../main/infrastructure/clocks/FakeClock';

function makeAdapter(target: Storage = localStorage) {
  const registry = new SchemaRegistry();
  const quota = new QuotaGuard();
  const clock = new FakeClock();
  clock.reset(1000);
  const bus = new TelemetryBus(clock);
  const adapter = new SyncStorageAdapter(target, registry, quota, clock, bus);
  return { adapter, registry, quota, clock, bus };
}

describe('SyncStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('returns undefined for a missing key', () => {
    const { adapter } = makeAdapter();
    expect(adapter.get('missing')).toBeUndefined();
  });

  it('stores and retrieves a value', () => {
    const { adapter } = makeAdapter();
    adapter.set('key1', 'hello');
    expect(adapter.get('key1')).toBe('hello');
  });

  it('reads legacy unwrapped values without error', () => {
    const { adapter } = makeAdapter();
    localStorage.setItem('legacy', JSON.stringify('raw value'));
    expect(adapter.get('legacy')).toBe('raw value');
  });

  it('returns undefined and clears the key on corrupted JSON instead of throwing', () => {
    const { adapter, bus } = makeAdapter();
    localStorage.setItem('bad', 'not-json{{{');
    expect(() => adapter.get('bad')).not.toThrow();
    expect(adapter.get('bad')).toBeUndefined();
    expect(localStorage.getItem('bad')).toBeNull();
    const ev = bus.snapshot().find((e) => e.event === 'storage_corruption_detected');
    expect(ev?.severity).toBe('error');
    expect(ev?.metadata?.key).toBe('bad');
  });

  it('returns undefined and clears the key when schema validation fails on read', () => {
    const { adapter, registry, bus } = makeAdapter();
    localStorage.setItem('typed', JSON.stringify({ version: 1, data: 'wrong' }));
    registry.register({ key: 'typed', version: 1, schema: z.number() });
    expect(() => adapter.get('typed')).not.toThrow();
    expect(adapter.get('typed')).toBeUndefined();
    expect(localStorage.getItem('typed')).toBeNull();
    expect(bus.snapshot().some((e) => e.event === 'storage_corruption_detected')).toBe(true);
  });

  it('returns undefined and clears the key when migration is missing for stale version', () => {
    const { adapter, registry, bus } = makeAdapter();
    registry.register({ key: 'migrated', version: 2, schema: z.string() });
    localStorage.setItem('migrated', JSON.stringify({ version: 1, data: 'old' }));
    expect(() => adapter.get('migrated')).not.toThrow();
    expect(adapter.get('migrated')).toBeUndefined();
    expect(localStorage.getItem('migrated')).toBeNull();
    const ev = bus.snapshot().find((e) => e.event === 'storage_corruption_detected');
    expect(ev?.metadata?.reason).toContain('missing migration');
  });

  it('runs migration when stored version is stale', () => {
    const { adapter, registry } = makeAdapter();
    registry.register({ key: 'migrated', version: 2, schema: z.object({ v: z.number() }) });
    registry.registerMigration('migrated', (data) => ({ v: (data as { x: number }).x * 2 }));
    localStorage.setItem('migrated', JSON.stringify({ version: 1, data: { x: 5 } }));
    const result = adapter.get<{ v: number }>('migrated');
    expect(result?.v).toBe(10);
    const stored = JSON.parse(localStorage.getItem('migrated')!);
    expect(stored.version).toBe(2);
  });

  it('throws on set of null', () => {
    const { adapter } = makeAdapter();
    expect(() => adapter.set('key', null)).toThrow('null/undefined prohibited');
  });

  it('platform is web', () => {
    const { adapter } = makeAdapter();
    expect(adapter.platform).toBe('web');
  });
});
