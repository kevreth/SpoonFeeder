import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import {
  AnswerType,
  BOWTIE,
  Bowtie,
  buildBowtieAnswer,
} from '../../../../main/slidetype/index';
import { SlideTest } from '../../slide.test';

describe('buildBowtieAnswer', () => {
  it('sorts each branch pair independently, leaving the condition alone', () => {
    expect(buildBowtieAnswer('sepsis', ['b', 'a'], ['y', 'x'])).toEqual([
      'sepsis',
      'a',
      'b',
      'x',
      'y',
    ]);
  });
});

class Test extends SlideTest {
  type = 'bowtie';
  public processJson(): void {
    const param = BOWTIE();
    param.txt = 'Complete the diagram for this client.';
    param.o = ['Early sepsis', 'Hypovolemia'];
    param.bowtieActions = ['Obtain blood cultures', 'Increase IV fluids', 'Discontinue IV'];
    param.bowtieMonitors = ['Serum lactate', 'Urine output', 'Deep tendon reflexes'];
    // Authored out of branch order to exercise canonicalization.
    param.ans = [
      'Early sepsis',
      'Increase IV fluids',
      'Obtain blood cultures',
      'Urine output',
      'Serum lactate',
    ] as AnswerType;
    param.isExercise = true;
    const testable = test.getTestable() as Bowtie;
    testable.setProperties(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.o).toEqual(param.o);
    expect(testable.bowtieActions).toEqual(param.bowtieActions);
    expect(testable.bowtieMonitors).toEqual(param.bowtieMonitors);
    expect(testable.ans).toEqual([
      'Early sepsis',
      'Increase IV fluids',
      'Obtain blood cultures',
      'Serum lactate',
      'Urine output',
    ]);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Bowtie(this.type, evaluate, result);
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
it('getAnswerCount is always 5 (condition + 2 actions + 2 monitors)', () => {
  const slide = BOWTIE();
  slide.ans = ['a', 'b', 'c', 'd', 'e'] as AnswerType;
  expect(slide.getAnswerCount()).toEqual(5);
});
