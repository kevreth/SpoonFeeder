import { expect, it } from 'vitest';
import { Json } from '../main/quiz/datalayer/globals';
import { getInstance } from '../main/quiz/datalayer/slideFactory';
import type { SlideInterface } from '../main/quiz/slideInterface';
const slideTypes = [
  'bool',
  'gap',
  'imap',
  'info',
  'mc',
  'select',
  'sort',
  'vocab',
];
function makeSlideArray() {
  const slides: SlideInterface[] = [];
  slideTypes.forEach((slideStr) => {
    const slide = getInstance(slideStr) as SlideInterface;
    slides.push(slide);
  });
  return slides;
}
function reset() {
  Json.set(new Array<SlideInterface>());
}
it('testSet_Get', () => {
  reset();
  const slides: SlideInterface[] = makeSlideArray();
  Json.set(slides);
  const arr = Json.get();
  expect(arr.length).toEqual(slideTypes.length);
});
it('testCount_GetSlide', () => {
  reset();
  const slides: SlideInterface[] = makeSlideArray();
  Json.set(slides);
  const expected = 3;
  for (let i = 0; i < expected; i++) Json.getSlide();
  const actual = Json.count();
  expect(actual).toEqual(expected);
});
it('testReset', () => {
  reset();
  const slides: SlideInterface[] = makeSlideArray();
  Json.set(slides);
  const times = 3;
  for (let i = 0; i < times; i++) Json.getSlide();
  Json.reset();
  const actual = Json.count();
  const expected = 0;
  expect(actual).toEqual(expected);
});
