import { beforeEach, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import { AnswerType, BINS, Bins } from '../../../../main/slidetype/index';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'bins';
  public processJson(): void {
    const param = BINS();
    param.txt = 'Categorize each finding.';
    param.o = ['fever', 'normal pulse', 'high fever', 'low bp'];
    param.bins = ['Expected', 'Report to Provider'];
    param.ans = ['Report to Provider', 'Expected', 'Report to Provider', 'Report to Provider'] as AnswerType;
    param.isExercise = true;
    const testable = test.getTestable() as Bins;
    testable.setProperties(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.txt).toEqual(param.txt);
    expect(testable.bins).toEqual(param.bins);
    expect(testable.ans).toEqual(param.ans);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Bins(this.type, evaluate, result);
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
it('getAnswerCount reflects the number of items', () => {
  const slide = BINS();
  slide.ans = ['a', 'b', 'a', 'a'] as AnswerType;
  expect(slide.getAnswerCount()).toEqual(4);
});
