import { expect, it } from 'vitest';
import { getInstance } from '../../main/slidetype/misc/slideFactory';
import { Mc } from '../../main/slidetype/types/mc/slideTypeMc';
it('testGetInstance', () => {
  const slide = getInstance('mc');
  expect(slide).toBeInstanceOf(Mc);
});
