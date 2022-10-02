import { beforeEach, it } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { VOCAB } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest<string[]> {
  public processJson(): void {
    throw new Error('Method not implemented.');
  }
  public makeSlides(): void {
    throw new Error('Method not implemented.');
  }
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
