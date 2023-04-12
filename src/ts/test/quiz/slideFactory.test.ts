import { expect, it } from 'vitest';
import { getInstance } from '../../main/quiz/slide/slideFactory';
import { Mc } from '../../main/quiz/slide/slideType/mc/slideTypeMc';
it('testGetInstance', () => {
  const slide = getInstance('mc');
  expect(slide).toBeInstanceOf(Mc);
});
