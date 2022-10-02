import { beforeEach, it } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { VOCAB } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest<string[]> {
  protected factory(): Slide<string[]> {
    return VOCAB();
  }
}
const test = new Test();
beforeEach(() => {
  test.setUp();
});
it('getSetValues', () => {
  test.getSetValues();
});
