import { expect, it } from 'vitest';
import { Course, Lesson, Module, Unit } from '../../main/quiz/course';
it('test course', () => {
  const division = new Course();
  const children = division.units;
  expect(division).not.toBeNull();
  expect(children).not.toBeNull();
  expect(children).toHaveLength(0);
});
it('test unit', () => {
  const division = new Unit();
  const children = division.lessons;
  expect(division).not.toBeNull();
  expect(children).not.toBeNull();
  expect(children).toHaveLength(0);
});
it('test lesson', () => {
  const division = new Lesson();
  const children = division.modules;
  expect(division).not.toBeNull();
  expect(children).not.toBeNull();
  expect(children).toHaveLength(0);
});
it('test module', () => {
  const division = new Module();
  const inst = division.inst;
  const exercises = division.exercises;
  expect(division).not.toBeNull();
  expect(inst).not.toBeNull();
  expect(exercises).not.toBeNull();
  expect(inst).toHaveLength(0);
  expect(exercises).toHaveLength(0);
});
