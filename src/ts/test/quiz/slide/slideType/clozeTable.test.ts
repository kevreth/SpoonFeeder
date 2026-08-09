import { beforeEach, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import { AnswerType, CLOZE_TABLE, ClozeTable } from '../../../../main/slidetype/index';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'cloze-table';
  public processJson(): void {
    const param = CLOZE_TABLE();
    param.txt = 'For each finding, select the interpretation.';
    param.o = ['Fundus firm, midline, at umbilicus', 'Fundus boggy, displaced to the right'];
    param.choices = [
      ['Expected', 'Unexpected', 'Notify provider immediately'],
      ['Expected', 'Unexpected', 'Notify provider immediately'],
    ];
    param.ans = ['Expected', 'Notify provider immediately'] as AnswerType;
    param.isExercise = true;
    const testable = test.getTestable() as ClozeTable;
    testable.setProperties(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.o).toEqual(param.o);
    expect(testable.choices).toEqual(param.choices);
    expect(testable.ans).toEqual(param.ans);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
    const evaluate = vi.fn();
    const result = vi.fn();
    return new ClozeTable(this.type, evaluate, result);
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
it('getAnswerCount reflects the number of rows', () => {
  const slide = CLOZE_TABLE();
  slide.ans = ['a', 'b', 'c'] as AnswerType;
  expect(slide.getAnswerCount()).toEqual(3);
});
