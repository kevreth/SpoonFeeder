import { JSDOM } from 'jsdom';
import { beforeEach, expect, it, vi } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { Bool } from '../../../../main/quiz/slide/slideType/bool';
import { BOOL } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';

class Test extends SlideTest<string> {
  type = 'bool';
  public processJson(): void {
    const param = BOOL();
    param.txt = 'no';
    param.ans = 'no';
    const testable = test.getTestable();
    testable.processJson(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.txt).toEqual(param.txt);
    expect(testable.ans).toEqual(param.ans);
  }
  public makeSlides(): void {
    const testable = test.getTestable();
    const spy = vi.spyOn(testable, 'makeSlidesStrategy');
    const dom = new JSDOM();
    testable.makeSlides(dom.window.document);
    expect(spy).toHaveBeenCalled();
  }
  protected factory(): Slide<string> {
    const createHtml = vi.fn();
    const makeSlides = vi.fn();
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Bool('bool', createHtml, makeSlides, evaluate, result);
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
it('getSetValues', () => {
  test.makeSlides();
});
