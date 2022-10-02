import { expect, it } from 'vitest';
import { INFO } from '../../main/quiz/slide/slideFactory';
it('getSetValues', () => {
  const info = INFO();
  const sv = info.getSetValues();
  expect(sv.result).not.toBeNull();
  expect(sv.result).not.toBeNull();
  expect(sv.result).not.toBeNull();
});
