import { expect, it } from 'vitest';
import { Mc } from '../../main/quiz/slide/slideType/mc';
import { getInstance } from '../../main/quiz/slideFactory';
it('testGetInstance', () => {
  const slide = getInstance('mc');
  expect(slide).toBeInstanceOf(Mc);
});
