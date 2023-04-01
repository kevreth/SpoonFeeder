import { beforeEach, expect, it, vi } from 'vitest';
import { SORT } from '../../../../main/quiz/datalayer/slideFactory';
import type { Slide } from '../../../../main/quiz/slide';
import { Sort } from '../../../../main/quiz/slide/slideType/sort';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'sort';
  public processJson(): void {
    const param = SORT();
    param.txt = 'no';
    param.ans = ['no', 'yes'];
    param.isExercise = true;
    const testable = test.getTestable() as Sort;
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
    return new Sort(this.type, createHtml, makeSlides, evaluate, result);
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
