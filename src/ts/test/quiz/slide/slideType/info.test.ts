import { beforeEach, it } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { INFO } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest<string> {
  public processJson(): void {
    throw new Error('Method not implemented.');
  }
  public makeSlides(): void {
    throw new Error('Method not implemented.');
  }
  protected factory(): Slide<string> {
    return INFO();
  }
}
const test = new Test();
beforeEach(() => {
  test.beforeEach();
});
it('getSetValues', () => {
  test.getSetValues();
});
