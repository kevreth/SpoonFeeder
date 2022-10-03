import { Evaluation } from 'app/main/quiz/evaluate/evaluate';
import { expect, it } from 'vitest';
import {
  evalBody,
  evalStats,
  makeRow,
  numbering,
  percentCorrect,
  summary,
} from '../../../main/quiz/evaluate/evaluate.support';
import { IMAP, MC } from '../../../main/quiz/slideFactory';
it('makeRow', () => {
  const act = makeRow('q', 'a', 'c');
  const exp = '<tr><td>q</td><td>%N%.</td><td>a</td><td>c</td></tr>';
  expect(act).toBe(exp);
});
it('percentCorrect', () => {
  const act = percentCorrect(5, 8);
  const exp = '63';
  expect(act).toBe(exp);
});
it('numbering', () => {
  const str = '%N%%N%%N%';
  const act = numbering(3, str);
  const exp = '123';
  expect(act).toBe(exp);
});
it('summary', () => {
  const act = summary(8, 5, '63');
  const exp =
    'NUMBER OF QUESTIONS: 8<br>\nNUMBER CORRECT: 5<br>\nPERCENT CORRECT: 63%';
  expect(act).toBe(exp);
});
it('evalBody', () => {
  const slide0 = MC();
  const slide1 = IMAP();
  slide0.ans = '0';
  slide0.res = '0';
  slide0.txt = 'slide0';
  slide0.isExercise = true;
  slide1.ans = '0';
  slide1.res = '0';
  slide1.txt = 'slide1';
  slide1.isExercise = true;
  const slides = [slide0, slide1];
  const act: Evaluation = evalBody(slides);
  expect(act.correct).toBe(2);
  expect(act.responses).toBe(2);
});
it('evalStats', () => {
  const txt = evalStats(1, 2);
  expect(txt).not.toBeNull();
  expect(txt).toContain('NUMBER OF QUESTIONS: 2');
  expect(txt).toContain('NUMBER CORRECT: 1');
  expect(txt).toContain('PERCENT CORRECT: 50%');
});
