import { expect, it } from 'vitest';
import { Evaluation } from '../../main/quiz/evaluate';
it('makeRow', () => {
  const actual = Evaluation.makeRow('q', 'a', 'c');
  const expected = '<tr><td>q</td><td>%N%.</td><td>a</td><td>c</td></tr>';
  expect(actual).toBe(expected);
});
it('percentCorrect', () => {
  const actual = Evaluation.percentCorrect(5, 8);
  expect(actual).toBe('63');
});
it('evaluate', () => {
  return;
});
it('summary', () => {
  const actual = Evaluation.summary(8, 5);
  const expected =
    'NUMBER OF QUESTIONS: 8<br>\nNUMBER CORRECT: 5<br>\nPERCENT CORRECT: 63%';
  expect(actual).toBe(expected);
});
