import { makeButton } from '../main/quiz/buttons';
import { expect, it } from 'vitest';
it('makeButton', () => {
  const str = makeButton('ABC', 'DEF', 'HIJ');
  expect(str).toContain('id="ABC"');
  expect(str).toContain('class="DEF"');
  expect(str).toContain('>HIJ<');
  expect(str).toBeDefined();
  expect(str).not.to.be.empty;
  expect(str).to.be.string;
});
