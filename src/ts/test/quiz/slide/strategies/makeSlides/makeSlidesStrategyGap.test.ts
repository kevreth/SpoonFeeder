import { expect, it } from 'vitest';
import {
  fills,
  gaps,
} from '../../../../../main/quiz/slide/strategies/makeSlidesStrategy/makeSlidesStrategyGap';
const question = 'text (1) text (2) text (3)';
const ans = ['ans1', 'ans2', 'ans3'];
it('fills', () => {
  const result = fills(ans);
  expect(result).not.toBeNull();
  // expect(result).toHTMLValidate();
  expect(result).toContain('fill0');
  expect(result).toContain('fill2');
});
it('gaps', () => {
  const result = gaps(ans.length, question);
  expect(result).not.toBeNull();
  // expect(result).toHTMLValidate();
  expect(result).toContain('(1) text');
  expect(result).toContain('(3)');
});
// it('createHtml', () => {
// 	const result = new Gap().createHtml(ans, question);
// 	expect(result).not.toBeNull();
// 	// expect(result).toHTMLValidate();
// 	expect(result).toContain('fill0');
// 	expect(result).toContain('fill2');
// 	expect(result).toContain('ans1');
// 	expect(result).toContain('ans3');
// 	expect(result).toContain('(1) text');
// 	expect(result).toContain('(3)');
// });
