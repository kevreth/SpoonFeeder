import { expect, it } from 'vitest';
import { getInstance } from '../../main/slide/slideFactory';
import { Mc } from '../../main/slide/slideType/mc/slideTypeMc';
it('testGetInstance', () => {
  const slide = getInstance('mc');
  expect(slide).toBeInstanceOf(Mc);
});
