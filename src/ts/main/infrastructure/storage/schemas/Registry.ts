import { z } from 'zod';

type SchemaEntry = {
  key: string;
  version: number;
  schema: z.ZodTypeAny;
  sensitive?: boolean;
};

type MigrationFn = (data: unknown, fromVersion: number, toVersion: number) => unknown;

export class SchemaRegistry {
  private entries = new Map<string, SchemaEntry>();
  private migrations = new Map<string, MigrationFn>();

  register(entry: SchemaEntry): void {
    this.entries.set(entry.key, entry);
  }

  registerMigration(key: string, migration: MigrationFn): void {
    this.migrations.set(key, migration);
  }

  getSchema(key: string): z.ZodTypeAny | undefined {
    return this.entries.get(key)?.schema;
  }

  getVersion(key: string): number {
    return this.entries.get(key)?.version ?? 1;
  }

  getMigration(key: string): MigrationFn | undefined {
    return this.migrations.get(key);
  }

  isSensitive(key: string): boolean {
    return this.entries.get(key)?.sensitive ?? false;
  }
}
