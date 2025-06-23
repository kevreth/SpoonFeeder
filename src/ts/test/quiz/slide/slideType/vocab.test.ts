import { beforeEach, expect, it, vi } from 'vitest';
import { Slide, VOCAB } from '../../../../main/slidetype/mediator';
import {
  Vocab,
  generateQuestions,
} from '../../../../main/slidetype/types/vocab/slideTypeVocab';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'vocab';
  public processJson(): void {
    const param = VOCAB();
    param.list = new Object({ key1: 'value1', key2: 'value2' }) as Map<
      string,
      string
    >;
    param.isExercise = true;
    const testable = test.getTestable() as Vocab;
    testable.setProperties(param);
    expect(testable.type).toEqual('vocab');
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
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

sessionStorage.setItem('random', 'false');
const MAP: Map<string, string> = new Map([
  ['term1', 'def1'],
  ['term2', 'def2'],
  ['term3', 'def3'],
  ['term4', 'def4'],
  ['term5', 'def5'],
]);
it('generateQuestions', () => {
  const result = generateQuestions(MAP);
  expect(result).not.toBeNull();
  expect(result.length).toBe(5);
  expect(result[0][0]).not.toBeNull();
  expect(result[0][1]).not.toBeNull();
  expect(result[0][2].length).toBe(4);
  expect(result[0][0]).toMatch(/def/);
  expect(result[0][1]).toMatch(/term/);
});
