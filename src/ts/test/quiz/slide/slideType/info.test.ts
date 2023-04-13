import { beforeEach, expect, it, vi } from 'vitest';
import { INFO } from '../../../../main/quiz/slide/slideFactory';
import type { Slide } from '../../../../main/quiz/slide/slide';
import { Info } from '../../../../main/quiz/slide/slideType/info/slideTypeInfo';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'info';
  public processJson(): void {
    const param = INFO();
    param.txt = 'no';
    const testable = test.getTestable();
    testable.processJson(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.txt).toEqual(param.txt);
  }
  protected factory(): Slide {
    const createHtml = vi.fn();
    const makeSlides = vi.fn();
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Info(this.type, createHtml, makeSlides, evaluate, result);
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
it('makeSlides', () => {
  test.makeSlides();
});
it('result', () => {
  test.result();
});
