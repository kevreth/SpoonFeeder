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

const ScopeTypeSchema = z.enum(['lesson', 'unit', 'course']);
const ReviewTypeSchema = z.enum(['focused', 'cumulative']);

export const ReviewRecordSchema = z.object({
  scopeKey: z.string(),
  scopeType: ScopeTypeSchema,
  unitIndex: z.number(),
  unitName: z.string(),
  lessonIndex: z.number().optional(),
  lessonName: z.string().optional(),
  reviewType: ReviewTypeSchema,
  date: z.number(),
  correct: z.number(),
  total: z.number(),
});

export const ReviewRecordArraySchema = z.array(ReviewRecordSchema);

export const SerializedSlideSchema = z.object({
  sourceTxt: z.string().optional(),
  vocabTerm: z.string().optional(),
  vocabAns: z.string().optional(),
  vocabOptions: z.array(z.string()).optional(),
});

export const SlideResultSchema = z.object({
  slideTxt: z.string(),
  correct: z.number(),
  total: z.number(),
});

export const ReviewDraftStateSchema = z.object({
  scopeKey: z.string(),
  scopeType: ScopeTypeSchema,
  unitIndex: z.number(),
  unitName: z.string(),
  lessonIndex: z.number().optional(),
  lessonName: z.string().optional(),
  reviewType: ReviewTypeSchema,
  slides: z.array(SerializedSlideSchema),
  currentIndex: z.number(),
  results: z.array(SlideResultSchema),
});

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

/** Register review schemas for a specific course name. Called when a course is loaded. */
export function registerReviewSchemas(registry: SchemaRegistry, courseName: string): void {
  registry.register({ key: `reviews_${courseName}`, version: 1, schema: ReviewRecordArraySchema });
  registry.register({
    key: `review_draft_${courseName}`,
    version: 1,
    schema: ReviewDraftStateSchema,
  });
}
