import { expect, it } from 'vitest';
import { insertHandlebars } from '../../../main/quiz/datalayer/adoc2html';
it('substitute', () => {
  const txt = 'A svg=asdf B table=qwerty C dist=zxcv D';
  const exp = "A {{{svg 'asdf'}}} B {{{table 'qwerty'}}} C dist=zxcv D";
  const act = insertHandlebars(txt);
  expect(act).toEqual(exp);
});
