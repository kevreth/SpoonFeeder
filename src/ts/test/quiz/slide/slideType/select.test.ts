import { beforeEach, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/quiz/slide';
import { Select } from '../../../../main/quiz/slide/slideType/select';
import { SELECT } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest<number[]> {
  type = 'select';
  public processJson(): void {
    const param = SELECT();
    param.txt = 'test this';
    param.ans = [1];
    param.isExercise = true;
    const testable = test.getTestable() as Select;
    testable.processJson(param);
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
    return new Select(this.type, createHtml, makeSlides, evaluate, result);
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
