import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { expect, it } from 'vitest';
import { ProcessJson } from '../../main/course/courseData/processJson';
import type { Course } from '../../main/course/index';

// Regression coverage for the nclex-rn course specifically: its unit count,
// nesting depth, and per-unit content density (some units fully authored,
// none left as bare name-only stubs) differ enough from the "test" course
// that a structural mistake here (e.g. a unit missing `lessons`) would not
// be caught by any other existing test.
it('src/courses/nclex-rn/course.yml loads without throwing and produces exercises', () => {
  const doc = load(
    readFileSync('src/courses/nclex-rn/course.yml', 'utf8'),
  ) as Course;
  const slides = ProcessJson.processJson(doc);
  expect(slides.length).toBeGreaterThan(0);
  expect(slides.some((s) => s.isExercise)).toBe(true);
});
