import { expect, it } from 'vitest';
import { SaveData } from '../../../main/quiz/slide/saveData';
const expected_saved = new Array<SaveData>();
expected_saved.push(new SaveData('ans1', 'res1', '200001010000', false));
expected_saved.push(new SaveData('ans2', 'res2', '200001010001', false));
expected_saved.push(new SaveData('ans3', 'res3', '200001010002', false));
it('find_scalar', () => {
  const idx = SaveData.find('ans2', expected_saved);
  expect(idx).toEqual(1);
});
