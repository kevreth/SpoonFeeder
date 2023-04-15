import { beforeEach, expect, it, vi } from 'vitest';
import type { Slide } from '../../../../main/slide/slide';
import { IMAP } from '../../../../main/slide/slideType/imap/factoryImap';
import { Imap } from '../../../../main/slide/slideType/imap/slideTypeImap';
import { SlideTest } from '../../slide.test';
class Test extends SlideTest {
  type = 'imap';
  public processJson(): void {
    const param = IMAP();
    param.txt = 'no';
    param.ans = 'no';
    param.img = 'img';
    param.isExercise = true;
    const testable = test.getTestable() as Imap;
    testable.img = 'img';
    testable.setProperties(param);
    expect(testable.type).toEqual(param.type);
    expect(testable.txt).toEqual(param.txt);
    expect(testable.ans).toEqual(param.ans);
    expect(testable.img).toEqual(param.img);
    expect(testable.isExercise).toEqual(param.isExercise);
  }
  protected factory(): Slide {
    const createHtml = vi.fn();
    const makeSlides = vi.fn();
    const evaluate = vi.fn();
    const result = vi.fn();
    return new Imap(this.type, createHtml, makeSlides, evaluate, result);
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
