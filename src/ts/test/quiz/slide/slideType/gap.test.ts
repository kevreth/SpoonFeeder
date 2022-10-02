import { beforeEach, it } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { GAP } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
export class GapTest extends SlideTest<Array<string>> {
  protected factory(): Slide<Array<string>> {
    return GAP();
  }
}
const test = new GapTest();
beforeEach(() => {
  test.setUp();
});
it('getSetValues', () => {
  test.getSetValues();
});
