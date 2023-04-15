import { expect, it } from 'vitest';
import { Mc } from '../../main/slide/slideType/mc/slideTypeMc';
import { getInstance } from '../../main/slide/slideType/slideFactory';
it('testGetInstance', () => {
  const slide = getInstance('mc');
  expect(slide).toBeInstanceOf(Mc);
});
