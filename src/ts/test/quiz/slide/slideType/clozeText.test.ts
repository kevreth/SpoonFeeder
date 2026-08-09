import { beforeEach, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import { AnswerType, CLOZE_TEXT, ClozeText } from '../../../../main/slidetype/index';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'cloze-text';
  public processJson(): void {
    const param = CLOZE_TEXT();
    param.txt =
      'The nurse anticipates the client is experiencing (1). The action is (2).';
    param.choices = [
      ['diabetic ketoacidosis', 'hypoglycemia'],
      ['initiate IV fluids', 'administer insulin'],
    ];
    param.ans = ['diabetic ketoacidosis', 'initiate IV fluids'] as AnswerType;
    param.isExercise = true;
    const testable = test.getTestable() as ClozeText;
    testable.setProperties(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.txt).toEqual(param.txt);
    expect(testable.choices).toEqual(param.choices);
    expect(testable.ans).toEqual(param.ans);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
    const evaluate = vi.fn();
    const result = vi.fn();
    return new ClozeText(this.type, evaluate, result);
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
it('getAnswerCount reflects the number of blanks', () => {
  const slide = CLOZE_TEXT();
  slide.ans = ['a', 'b', 'c'] as AnswerType;
  expect(slide.getAnswerCount()).toEqual(3);
});
