import { beforeEach, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/quiz/slide';
import { Mc } from '../../../../main/quiz/slide/slideType/mc';
import { MC } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'mc';
  public processJson(): void {
    const param = MC();
    param.txt = 'yes';
    param.ans = 'yes';
    param.o = ['yes', 'no'];
    param.isExercise = true;
    const testable = test.getTestable() as Mc;
    testable.processJson(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.txt).toEqual(`<p>${param.txt}</p>\n`);
    expect(testable.ans).toEqual(`<p>${param.ans}</p>\n`);
    expect(testable.o).toEqual(['<p>yes</p>\n','<p>no</p>\n']);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
    const createHtml = vi.fn();
    const makeSlides = vi.fn();
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Mc(this.type, createHtml, makeSlides, evaluate, result);
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
it('makeSlides', () => {
  test.makeSlides();
});
it('result', () => {
  test.result();
});
