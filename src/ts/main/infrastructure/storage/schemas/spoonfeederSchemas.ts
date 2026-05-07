import { z } from 'zod';
import type { SchemaRegistry } from './Registry';

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
  // Per-course save data keys are registered dynamically at course load time
  // using registry.register({ key: courseName, version: 1, schema: SaveDataArraySchema })
}

/** Register the save data schema for a specific course name. Called when a course is loaded. */
export function registerCourseSchema(registry: SchemaRegistry, courseName: string): void {
  registry.register({ key: courseName, version: 1, schema: SaveDataArraySchema });
}
