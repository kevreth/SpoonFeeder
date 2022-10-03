import { expect, it } from 'vitest';
import {
  makeRow,
  percentCorrect,
  summary,
} from '../../../main/quiz/evaluate/evaluate.support';
it('makeRow', () => {
  const actual = makeRow('q', 'a', 'c');
  const expected = '<tr><td>q</td><td>%N%.</td><td>a</td><td>c</td></tr>';
  expect(actual).toBe(expected);
});
it('percentCorrect', () => {
  const actual = percentCorrect(5, 8);
  expect(actual).toBe('63');
});
it('evaluate', () => {
  return;
});
it('summary', () => {
  const actual = summary(8, 5, '63');
  const expected =
    'NUMBER OF QUESTIONS: 8<br>\nNUMBER CORRECT: 5<br>\nPERCENT CORRECT: 63%';
  expect(actual).toBe(expected);
});
