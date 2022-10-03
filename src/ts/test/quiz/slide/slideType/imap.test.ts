import { beforeEach, expect, it, vi } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { Imap } from '../../../../main/quiz/slide/slideType/imap';
import { IMAP } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest<string> {
  type = 'imap';
  public processJson(): void {
    const param = IMAP();
    param.txt = 'no';
    param.ans = 'no';
    param.isExercise = true;
    const testable = test.getTestable();
    testable.processJson(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.txt).toEqual(param.txt);
    expect(testable.ans).toEqual(param.ans);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide<string> {
    const createHtml = vi.fn();
    const makeSlides = vi.fn();
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Imap(this.type, createHtml, makeSlides, evaluate, result);
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
