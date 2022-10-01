import { expect, it } from 'vitest';
import { MC } from '../../../main/quiz/slide/slideFactory';
import { Mc } from '../../../main/quiz/slide/slideType/mc';
it('testGetInstance', () => {
  const slide = MC();
  expect(slide).toBeInstanceOf(Mc);
});
