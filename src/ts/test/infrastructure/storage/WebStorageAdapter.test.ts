import { describe, it, expect, beforeEach } from 'vitest';
import { z } from 'zod';
import { WebStorageAdapter } from '../../../main/infrastructure/storage/WebStorageAdapter';
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
  const adapter = new WebStorageAdapter(target, registry, quota, clock, bus);
  return { adapter, registry, quota, clock, bus };
}

describe('WebStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('returns undefined for a missing key', async () => {
    const { adapter } = makeAdapter();
    expect(await adapter.get('missing')).toBeUndefined();
  });

  it('emits storage_read_miss telemetry for missing key', async () => {
    const { adapter, bus } = makeAdapter();
    await adapter.get('missing');
    expect(bus.snapshot().some((e) => e.event === 'storage_read_miss')).toBe(true);
  });

  it('stores and retrieves a value', async () => {
    const { adapter } = makeAdapter();
    await adapter.set('key1', 'hello');
    expect(await adapter.get('key1')).toBe('hello');
  });

  it('emits storage_write and storage_read telemetry', async () => {
    const { adapter, bus } = makeAdapter();
    await adapter.set('key1', 'v');
    await adapter.get('key1');
    const events = bus.snapshot().map((e) => e.event);
    expect(events).toContain('storage_write');
    expect(events).toContain('storage_read');
  });

  it('validates schema on write', async () => {
    const { adapter, registry } = makeAdapter();
    registry.register({ key: 'typed', version: 1, schema: z.number() });
    await expect(adapter.set('typed', 'not a number' as unknown as number)).rejects.toThrow();
  });

  it('validates schema on read', async () => {
    const { adapter, registry } = makeAdapter();
    // Write raw invalid data directly to bypass adapter
    localStorage.setItem('typed', JSON.stringify({ version: 1, data: 'wrong' }));
    registry.register({ key: 'typed', version: 1, schema: z.number() });
    await expect(adapter.get('typed')).rejects.toThrow();
  });

  it('throws on set of null', async () => {
    const { adapter } = makeAdapter();
    await expect(adapter.set('key', null)).rejects.toThrow('null/undefined prohibited');
  });

  it('throws on set of undefined', async () => {
    const { adapter } = makeAdapter();
    await expect(adapter.set('key', undefined)).rejects.toThrow('null/undefined prohibited');
  });

  it('returns undefined and removes the key on corrupted JSON', async () => {
    const { adapter, bus } = makeAdapter();
    localStorage.setItem('bad', 'not-json{{{');
    await expect(adapter.get('bad')).resolves.toBeUndefined();
    expect(localStorage.getItem('bad')).toBeNull();
    const ev = bus.snapshot().find((e) => e.event === 'storage_corruption_detected');
    expect(ev?.severity).toBe('error');
    expect(ev?.metadata?.key).toBe('bad');
  });

  it('runs migration when stored version is stale', async () => {
    const { adapter, registry } = makeAdapter();
    registry.register({ key: 'migrated', version: 2, schema: z.object({ v: z.number() }) });
    registry.registerMigration('migrated', (data) => ({ v: (data as { x: number }).x * 2 }));
    localStorage.setItem('migrated', JSON.stringify({ version: 1, data: { x: 5 } }));
    const result = await adapter.get<{ v: number }>('migrated');
    expect(result?.v).toBe(10);
    // Rewritten with new version
    const stored = JSON.parse(localStorage.getItem('migrated')!);
    expect(stored.version).toBe(2);
  });

  it('throws if migration is missing for stale version', async () => {
    const { adapter, registry } = makeAdapter();
    registry.register({ key: 'migrated', version: 2, schema: z.string() });
    localStorage.setItem('migrated', JSON.stringify({ version: 1, data: 'old' }));
    await expect(adapter.get('migrated')).rejects.toThrow('missing migration');
  });

  it('reads legacy unwrapped values without error', async () => {
    const { adapter } = makeAdapter();
    localStorage.setItem('legacy', JSON.stringify('raw value'));
    expect(await adapter.get('legacy')).toBe('raw value');
  });

  it('remove deletes the key and emits telemetry', async () => {
    const { adapter, bus } = makeAdapter();
    await adapter.set('key', 'val');
    await adapter.remove('key');
    expect(await adapter.get('key')).toBeUndefined();
    expect(bus.snapshot().some((e) => e.event === 'storage_remove')).toBe(true);
  });

  it('clear removes all keys and emits telemetry', async () => {
    const { adapter, bus } = makeAdapter();
    await adapter.set('a', '1');
    await adapter.set('b', '2');
    await adapter.clear();
    expect(await adapter.keys()).toHaveLength(0);
    expect(bus.snapshot().some((e) => e.event === 'storage_clear')).toBe(true);
  });

  it('QuotaGuard throws when limit exceeded', async () => {
    const { adapter, quota } = makeAdapter();
    quota.setLimit('big', 10);
    await expect(adapter.set('big', 'this string is too long for the limit')).rejects.toThrow(
      'QuotaGuard'
    );
  });

  it('update applies read-modify-write atomically', async () => {
    const { adapter } = makeAdapter();
    await adapter.set('counter', 0);
    await adapter.update<number>('counter', (v) => (v ?? 0) + 1);
    expect(await adapter.get<number>('counter')).toBe(1);
  });

  it('update on missing key passes undefined to fn', async () => {
    const { adapter } = makeAdapter();
    await adapter.update<string>('new', (v) => v ?? 'default');
    expect(await adapter.get<string>('new')).toBe('default');
  });

  it('platform is web', () => {
    const { adapter } = makeAdapter();
    expect(adapter.platform).toBe('web');
  });
});
