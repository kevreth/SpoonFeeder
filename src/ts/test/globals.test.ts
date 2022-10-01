import { expect, it } from 'vitest';
import { Json } from '../main/globals';
import { getInstance } from '../main/quiz/slide/slideFactory';
import { SlideInterface } from '../main/quiz/SlideInterface';
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
it('testGetNumSlides', () => {
  reset();
  const slides: SlideInterface[] = makeSlideArray();
  Json.set(slides);
  const expected = slides.length;
  const actual = Json.getNumSlides();
  expect(actual).toEqual(expected);
});
it('testPush', () => {
  reset();
  slideTypes.forEach((slideStr) => {
    const slide = getInstance(slideStr) as SlideInterface;
    Json.push(slide);
  });
  const expected = slideTypes.length;
  const actual = Json.getNumSlides();
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
it('testGetSlideByTxt', () => {
  reset();
  const slides: SlideInterface[] = makeSlideArray();
  slides[4].txt = 'A';
  Json.set(slides);
  const slide = Json.getSlideByTxt('A');
  expect(slide).not.toBeNull();
});
