import { beforeEach, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import { EMA, Ema } from '../../../../main/slidetype/index';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'ema';
  public processJson(): void {
    const param = EMA();
    param.txt = 'Select the findings that indicate improving perfusion.';
    param.o = ['a', 'b', 'c', 'd'];
    param.numans = 2;
    param.isExercise = true;
    const testable = test.getTestable() as Ema;
    testable.setProperties(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.txt).toEqual(param.txt);
    expect(testable.ans).toEqual(['a', 'b']);
    expect(testable.numans).toEqual(2);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Ema(this.type, evaluate, result);
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
it('result', () => {
  test.result();
});
