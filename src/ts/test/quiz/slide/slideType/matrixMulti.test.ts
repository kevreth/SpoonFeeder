import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import {
  AnswerType,
  MATRIX_MULTI,
  MatrixMulti,
  canonicalizeColumnIndices,
} from '../../../../main/slidetype/index';
import { SlideTest } from '../../slide.test';

describe('canonicalizeColumnIndices', () => {
  it('sorts indices numerically and joins with commas', () => {
    expect(canonicalizeColumnIndices([2, 0, 1])).toBe('0,1,2');
  });
  it('returns an empty string for no indices', () => {
    expect(canonicalizeColumnIndices([])).toBe('');
  });
});

class Test extends SlideTest {
  type = 'matrix-multi';
  public processJson(): void {
    const param = MATRIX_MULTI();
    param.txt = 'Select all body systems each finding may indicate.';
    param.o = ['Blood pressure 168/112 mmHg', 'Hyperreflexia with clonus'];
    param.cols = ['Cardiovascular', 'Renal', 'Neurological'];
    // Authored out of order to exercise canonicalization in setProperties.
    param.ans = ['1,0', '2'] as AnswerType;
    param.isExercise = true;
    const testable = test.getTestable() as MatrixMulti;
    testable.setProperties(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.o).toEqual(param.o);
    expect(testable.cols).toEqual(param.cols);
    expect(testable.ans).toEqual(['0,1', '2']);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
    const evaluate = vi.fn();
    const result = vi.fn();
    return new MatrixMulti(this.type, evaluate, result);
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
  const slide = MATRIX_MULTI();
  slide.ans = ['0', '1,2', ''] as AnswerType;
  expect(slide.getAnswerCount()).toEqual(3);
});
