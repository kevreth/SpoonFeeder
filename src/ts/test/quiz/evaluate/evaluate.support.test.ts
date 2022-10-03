import { expect, it } from 'vitest';
import {
  makeRow,
  numbering,
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
  const expected = '63';
  expect(actual).toBe(expected);
});
it('numbering', () => {
  const str = '%N%%N%%N%';
  const actual = numbering(3, str);
  const expected = '123';
  expect(actual).toBe(expected);
});
it('summary', () => {
  const actual = summary(8, 5, '63');
  const expected =
    'NUMBER OF QUESTIONS: 8<br>\nNUMBER CORRECT: 5<br>\nPERCENT CORRECT: 63%';
  expect(actual).toBe(expected);
});
