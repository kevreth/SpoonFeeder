import { expect, it } from 'vitest';
import { stdReplacement } from '../../../main/quiz/slide/adocVisitor';
import { MA } from '../../../main/quiz/slideFactory';
it('testMa', () => {
  const clazz = MA();
  clazz.ans = 'yes';
  clazz.exp = `
  . Explanation:
  * point 1
  * point 2
  * point 3
  `
  clazz.ref = `
  . References:
  * ref 1
  * ref 2
  * ref 3
  `
  stdReplacement(clazz);
  expect(clazz.exp).toContain('li');
  expect(clazz.exp).toContain('ol');
  expect(clazz.exp).toContain('ul');
  expect(clazz.ref).toContain('li');
  expect(clazz.ref).toContain('ol');
  expect(clazz.ref).toContain('ul');
});
