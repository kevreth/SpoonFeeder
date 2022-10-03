import { beforeEach, expect, it, vi } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { Mc } from '../../../../main/quiz/slide/slideType/mc';
import { MC } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest<string> {
  type = 'mc';
  public processJson(): void {
    const param = MC();
    param.txt = 'yes';
    param.ans = 'yes';
    param.o = ['yes', 'no'];
    const testable = test.getTestable() as Mc;
    testable.processJson(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.txt).toEqual(param.txt);
    expect(testable.ans).toEqual(param.ans);
    expect(testable.o).toEqual(param.o);
  }
  protected factory(): Slide<string> {
    const createHtml = vi.fn();
    const makeSlides = vi.fn();
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Mc(this.type, createHtml, makeSlides, evaluate, result);
  }
}
const test = new Test();
beforeEach(() => {
  test.beforeEach();
});
it('processJson', () => {
  test.processJson();
});
it('getSetValues', () => {
  test.getSetValues();
});
it('getSetValues', () => {
  test.makeSlides();
});
