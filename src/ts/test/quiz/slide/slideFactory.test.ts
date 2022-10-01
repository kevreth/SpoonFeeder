import { expect, it } from 'vitest';
import { SlideFactory } from '../../../main/quiz/slide/slideFactory';
import { Mc } from '../../../main/quiz/slide/slideType/mc';
it('testGetInstance', () => {
  const slide = SlideFactory.getInstance('mc');
  expect(slide).toBeInstanceOf(Mc);
});
