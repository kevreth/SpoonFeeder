import type { StorageAdapter } from '../../main/infrastructure/storage/StorageAdapter';
import type { SchemaRegistry } from '../../main/infrastructure/storage/schemas/Registry';

type TestStorageAdapter = StorageAdapter & { __dump(): Record<string, unknown> };

export function createTestStorageAdapter(registry?: SchemaRegistry): TestStorageAdapter {
  const store = new Map<string, { version: number; data: unknown }>();

  const adapter: TestStorageAdapter = {
    platform: 'test' as unknown as 'web',

    async get<T>(key: string): Promise<T | undefined> {
      const wrapped = store.get(key);
      if (wrapped === undefined) return undefined;
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

    async remove(key: string): Promise<void> {
      store.delete(key);
    },

    async keys(): Promise<string[]> {
      return Array.from(store.keys());
    },

    async clear(): Promise<void> {
      store.clear();
    },

    __dump(): Record<string, unknown> {
      return Object.fromEntries(Array.from(store.entries()).map(([k, v]) => [k, v.data]));
    },
  };

  return adapter;
}
