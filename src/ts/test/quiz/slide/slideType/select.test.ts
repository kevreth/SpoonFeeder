import { beforeEach, it } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { SELECT } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest<number[]> {
  protected factory(): Slide<number[]> {
    return SELECT();
  }
}
const test = new Test();
beforeEach(() => {
  test.setUp();
});
it('getSetValues', () => {
  test.getSetValues();
});
