import { expect, it } from 'vitest';
import { substitute } from '../../../main/quiz/datalayer/handlebars';
it('substitute', () => {
  const txt = 'A svg=asdf B table=qwerty C dist=zxcv D';
  const exp = "A {{{svg 'asdf'}}} B {{{table 'qwerty'}}} C dist=zxcv D";
  const act = substitute(txt);
  expect(act).toEqual(exp);
});
