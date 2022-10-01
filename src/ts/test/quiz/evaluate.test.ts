import { expect, it } from 'vitest';
import { Evaluation } from '../../main/quiz/evaluate';
it('percentCorrect', () => {
  const actual = Evaluation.percentCorrect(5, 8);
  expect(actual).toBe('63');
});
it('evaluate', () => {
  return;
});
