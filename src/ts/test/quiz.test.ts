import { expect, it } from 'vitest';
import { Quiz } from '../main/quiz';
it('testMakeYamlFilename', () => {
  const actual = Quiz.makeYamlFilename('courseName');
  const expected = '../../../src/courses/courseName/course.yml';
  expect(actual).toEqual(expected);
});
