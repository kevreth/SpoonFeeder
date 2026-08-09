import { beforeEach, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import {
  AnswerType,
  MATRIX_SINGLE,
  MatrixSingle,
} from '../../../../main/slidetype/index';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'matrix-single';
  public processJson(): void {
    const param = MATRIX_SINGLE();
    param.txt = 'For each action, select whether it is indicated.';
    param.o = ['Prepare for cardioversion', 'Restrict all oral fluids'];
    param.cols = ['Indicated', 'Contraindicated', 'Non-essential'];
    param.ans = ['Indicated', 'Contraindicated'] as AnswerType;
    param.isExercise = true;
    const testable = test.getTestable() as MatrixSingle;
    testable.setProperties(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.o).toEqual(param.o);
    expect(testable.cols).toEqual(param.cols);
    expect(testable.ans).toEqual(param.ans);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
    const evaluate = vi.fn();
    const result = vi.fn();
    return new MatrixSingle(this.type, evaluate, result);
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
  const slide = MATRIX_SINGLE();
  slide.ans = ['a', 'b', 'c'] as AnswerType;
  expect(slide.getAnswerCount()).toEqual(3);
});
