import { beforeEach, it } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { GAP } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest<Array<string>> {
  public processJson(): void {
    throw new Error('Method not implemented.');
  }
  public makeSlides(): void {
    throw new Error('Method not implemented.');
  }
  protected factory(): Slide<Array<string>> {
    return GAP();
  }
}
const test = new Test();
beforeEach(() => {
  test.beforeEach();
});
it('getSetValues', () => {
  test.getSetValues();
});
