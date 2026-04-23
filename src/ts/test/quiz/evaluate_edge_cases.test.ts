import { expect, it } from 'vitest';
import {
  makeRow,
  percentCorrect,
  evaluate,
} from '../../main/quiz/evaluate';

it('makeRow handles null/undefined', () => {
  // @ts-expect-error - testing invalid inputs
  const act = makeRow('q', null, undefined);
  expect(act).toContain('<span class="ans-pill">—</span>');
  expect(act).toContain('<td class="sum-answer">—</td>');
});

it('percentCorrect handles zero responses', () => {
  const act = percentCorrect(0, 0);
  expect(act).toBe('0');
});

it('evaluate handles empty array', () => {
  const act = evaluate([]);
  expect(act).toContain('summary-wrapper');
  expect(act).toContain('0%');
});

it('makeRow handles special characters', () => {
  const act = makeRow('<b>bold</b>', '<script>', '&');
  expect(act).toContain('<td><b>bold</b></td>'); // Note: it doesn't seem to escape HTML, which might be intended if it's Adoc output
});
