import { beforeEach, expect, it, vi } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { Vocab } from '../../../../main/quiz/slide/slideType/vocab';
import { VOCAB } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest<string[]> {
  type = 'vocab';
  public processJson(): void {
    const param = VOCAB();
    param.list = new Object({ key1: 'value1', key2: 'value2' }) as Map<
      string,
      string
    >;
    param.isExercise = true;
    const testable = test.getTestable() as Vocab;
    testable.processJson(param);
    expect(testable.type).toEqual('vocab');
    expect(testable.ans[0]).toEqual('key1');
    expect(testable.txt[1]).toEqual('value2');
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide<string[]> {
    const createHtml = vi.fn();
    const makeSlides = vi.fn();
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Vocab(this.type, createHtml, makeSlides, evaluate, result);
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
