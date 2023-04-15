import { beforeEach, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import { BOOL } from '../../../../main/slidetype/types/bool/factoryBool';
import { Bool } from '../../../../main/slidetype/types/bool/slideTypeBool';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'bool';
  public processJson(): void {
    const param = BOOL();
    param.txt = 'no';
    param.ans = 'no';
    param.isExercise = true;
    const testable = test.getTestable();
    testable.setProperties(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.txt).toEqual(param.txt);
    expect(testable.ans).toEqual(param.ans);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
    const createHtml = vi.fn();
    const makeSlides = vi.fn();
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Bool(this.type, createHtml, makeSlides, evaluate, result);
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
