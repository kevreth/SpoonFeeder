import { expect, it } from 'vitest';
import { Course, Lesson, Module, Unit } from '../../main/quiz/course';
it('test course', () => {
  const division = new Course();
  const children = division.units;
  const name = division.name;
  expect(division).not.toBeNull();
  expect(children).not.toBeNull();
  expect(children).toHaveLength(0);
  expect(name).toHaveLength(0);
});
it('test unit', () => {
  const division = new Unit();
  const children = division.lessons;
  const name = division.name;
  expect(division).not.toBeNull();
  expect(children).not.toBeNull();
  expect(children).toHaveLength(0);
  expect(name).toHaveLength(0);
});
it('test lesson', () => {
  const division = new Lesson();
  const children = division.modules;
  const name = division.name;
  expect(division).not.toBeNull();
  expect(children).not.toBeNull();
  expect(children).toHaveLength(0);
  expect(name).toHaveLength(0);
});
it('test module', () => {
  const division = new Module();
  const inst = division.inst;
  const exercises = division.exercises;
  const name = division.name;
  expect(division).not.toBeNull();
  expect(name).toHaveLength(0);
  expect(inst).not.toBeNull();
  expect(inst).toHaveLength(0);
  expect(exercises).not.toBeNull();
  expect(exercises).toHaveLength(0);
});
