import { expect, it } from 'vitest';
import { getInstance } from '../../main/quiz/datalayer/slideFactory';
import { Mc } from '../../main/quiz/slide/slideType/slideTypeMc';
it('testGetInstance', () => {
  const slide = getInstance('mc');
  expect(slide).toBeInstanceOf(Mc);
});
