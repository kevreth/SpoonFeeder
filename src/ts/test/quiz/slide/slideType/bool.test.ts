import { JSDOM } from 'jsdom';
import { beforeEach, expect, it /*, vi*/ } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { BOOL } from '../../../../main/quiz/slideFactory';
import { SlideTest } from '../../slide.test';
const DOC = new JSDOM('<!DOCTYPE html><body></body>').window.document;
class Test extends SlideTest<string> {
  // spy = vi.spyOn(this.testable,'spy');
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
    return;
    const testable = test.getTestable();
    testable.makeSlides(DOC);
    //incomplete test
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
