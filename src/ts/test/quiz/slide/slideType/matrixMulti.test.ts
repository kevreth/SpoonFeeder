import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import {
  AnswerType,
  MATRIX_MULTI,
  MatrixMulti,
  canonicalizeColumns,
} from '../../../../main/slidetype/index';
import { SlideTest } from '../../slide.test';

describe('canonicalizeColumns', () => {
  it('sorts names alphabetically and joins with commas', () => {
    expect(canonicalizeColumns(['Renal', 'Cardiovascular'])).toBe('Cardiovascular,Renal');
  });
  it('returns an empty string for no names', () => {
    expect(canonicalizeColumns([])).toBe('');
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
    param.ans = ['Renal,Cardiovascular', 'Neurological'] as AnswerType;
    param.isExercise = true;
    const testable = test.getTestable() as MatrixMulti;
    testable.setProperties(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.o).toEqual(param.o);
    expect(testable.cols).toEqual(param.cols);
    expect(testable.ans).toEqual(['Cardiovascular,Renal', 'Neurological']);
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
  slide.ans = ['Cardiovascular', 'Renal,Neurological', ''] as AnswerType;
  expect(slide.getAnswerCount()).toEqual(3);
});
