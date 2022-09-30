import { expect, it } from 'vitest';
import { Json } from '../main/globals';
import { SlideFactory } from '../main/quiz/slide/slideFactory';
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
    const slide = SlideFactory.getInstance(slideStr) as SlideInterface;
    slides.push(slide);
  });
  return slides;
}
it('testSetGet', () => {
  const slides: SlideInterface[] = makeSlideArray();
  Json.set(slides);
  const arr = Json.get();
  expect(arr.length).toEqual(slideTypes.length);
});
it('testCount', () => {
  const slides: SlideInterface[] = makeSlideArray();
  Json.set(slides);
  const expected = 3;
  for (let i = 0; i < expected; i++) Json.getSlide();
  const actual = Json.count();
  expect(actual).toEqual(expected);
});
