import { expect, it } from 'vitest';
import { Quiz } from '../main/quiz';
// import { JSDOM } from 'jsdom';
// const DOC = new JSDOM('<!DOCTYPE html><body></body>').window.document;

it('testMakeYamlFilename', () => {
  const actual = Quiz.makeYamlFilename('courseName');
  const expected = '../../../src/courses/courseName/course.yml';
  expect(actual).toEqual(expected);
});
// it('testSlides', () => {
//   Quiz.slides('test', DOC);
// });
