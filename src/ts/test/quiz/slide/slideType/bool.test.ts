import { JSDOM } from 'jsdom';
import { beforeEach, expect, it, vi } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { Bool } from '../../../../main/quiz/slide/slideType/bool';
import { BOOL } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';

class Test extends SlideTest<string> {
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
    const createHtml = vi.fn();
    const makeSlides = vi.fn();
    const evaluate = vi.fn();
    const result = vi.fn();
    const testable = new Bool('bool', createHtml, makeSlides, evaluate, result);
    const spy = vi.spyOn(testable, 'makeSlidesStrategy');
    const dom = new JSDOM();
    testable.makeSlides(dom.window.document);
    expect(spy).toHaveBeenCalled();
  }
  protected factory(): Slide<string> {
    return BOOL();
  }
}
const test = new Test();
beforeEach(() => {
  test.setUp();
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
