import { describe, it, expect, beforeEach } from 'vitest';
import { z } from 'zod';
import { SchemaRegistry } from '../../../main/infrastructure/storage/schemas/Registry';

describe('SchemaRegistry', () => {
  let registry: SchemaRegistry;

  beforeEach(() => {
    registry = new SchemaRegistry();
  });

  it('returns undefined schema for unregistered key', () => {
    expect(registry.getSchema('unknown')).toBeUndefined();
  });

  it('returns version 1 for unregistered key', () => {
    expect(registry.getVersion('unknown')).toBe(1);
  });

  it('returns false for isSensitive on unregistered key', () => {
    expect(registry.isSensitive('unknown')).toBe(false);
  });

  it('retrieves registered schema', () => {
    const schema = z.string();
    registry.register({ key: 'foo', version: 1, schema });
    expect(registry.getSchema('foo')).toBe(schema);
  });

  it('retrieves registered version', () => {
    registry.register({ key: 'foo', version: 3, schema: z.string() });
    expect(registry.getVersion('foo')).toBe(3);
  });

  it('marks sensitive keys correctly', () => {
    registry.register({ key: 'secret', version: 1, schema: z.string(), sensitive: true });
    expect(registry.isSensitive('secret')).toBe(true);
  });

  it('defaults sensitive to false', () => {
    registry.register({ key: 'plain', version: 1, schema: z.string() });
    expect(registry.isSensitive('plain')).toBe(false);
  });

  it('retrieves registered migration', () => {
    const migration = (d: unknown) => d;
    registry.registerMigration('foo', migration);
    expect(registry.getMigration('foo')).toBe(migration);
  });

  it('returns undefined migration for unregistered key', () => {
    expect(registry.getMigration('bar')).toBeUndefined();
  });

  it('overwrites an existing registration', () => {
    registry.register({ key: 'foo', version: 1, schema: z.string() });
    registry.register({ key: 'foo', version: 2, schema: z.number() });
    expect(registry.getVersion('foo')).toBe(2);
  });
});
