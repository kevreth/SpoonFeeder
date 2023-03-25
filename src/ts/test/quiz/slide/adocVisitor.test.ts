import { Arrow } from 'mathjax-full/ts/output/chtml/Notation';
import { expect, it } from 'vitest';
import { stdReplacement, optionsReplacement } from '../../../main/quiz/slide/adocVisitor';
import { MA } from '../../../main/quiz/slideFactory';
it('testMa', () => {
  const clazz = MA();
  clazz.txt = 'svg=test';
  clazz.exp = `
  . Explanation:
  * point 1
  * point 2
  * point 3
  `;
  clazz.ref = `
  . References:
  * ref 1
  * ref 2
  * ref 3
  `;
  stdReplacement(clazz);
  expect(clazz.txt).toContain('mcButton');
  expect(clazz.txt).toContain('test.svg');
  expect(clazz.exp).toContain('li');
  expect(clazz.exp).toContain('ol');
  expect(clazz.exp).toContain('ul');
  expect(clazz.ref).toContain('li');
  expect(clazz.ref).toContain('ol');
  expect(clazz.ref).toContain('ul');
});
it('testOptions', () => {
  const exp = ['svg=test','table=test1','string']
  const arr = optionsReplacement(exp);
  expect(arr[0]).toContain('test.svg');
  expect(arr[1]).toContain('.load');
  expect(arr[2]).toEqual('string');
});
