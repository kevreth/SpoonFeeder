import { beforeEach, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import { INFO } from '../../../../main/slide/slideType/info/factoryInfo';
import { Info } from '../../../../main/slide/slideType/info/slideTypeInfo';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'info';
  public processJson(): void {
    const param = INFO();
    param.txt = 'no';
    const testable = test.getTestable();
    testable.setProperties(param);
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
