import { JSDOM } from 'jsdom';
import { expect, it, vi } from 'vitest';
import type { Slide } from '../../main/quiz/slide';
import type { AnswerType } from '../../main/quiz/slide/strategies/resultStrategy';
import { MC, VOCAB } from '../../main/quiz/slideFactory';
import type { SlideInterfaceTest } from '../../test/quiz/slideInterface.test';
import { AbstractTest } from '../abstractTest';
export abstract class SlideTest<T extends AnswerType>
  extends AbstractTest<Slide<T>>
  implements SlideInterfaceTest
{
  public abstract processJson(): void;
  type!: string;
  public evaluate(): void {
    const testable = this.getTestable();
    const spy = vi.spyOn(testable, 'evaluate');
    testable.evaluate();
    expect(spy).toHaveBeenCalled();
  }
  public result(): void {
    const testable = this.getTestable();
    const spy = vi.spyOn(testable, 'result');
    testable.result();
    expect(spy).toHaveBeenCalled();
  }
  public getSetValues() {
    const sv = this.getTestable().getSetValues();
    expect(sv.result).not.toBeNull();
    expect(sv.result).not.toBeNull();
    expect(sv.result).not.toBeNull();
  }
  public makeSlides(): void {
    const testable = this.getTestable();
    const spy = vi.spyOn(testable, 'makeSlidesStrategy');
    const dom = new JSDOM();
    testable.makeSlides(dom.window.document);
    expect(spy).toHaveBeenCalled();
  }
  // This code is an experiment in creating testable classes
  // using just a string name of a class. That way the
  //subclasses won't have to do it.
  // public factory(): Slide<T> {
  //   const createHtml = vi.fn();
  //   const makeSlides = vi.fn();
  //   const evaluate = vi.fn();
  //   const result = vi.fn();
  //   return this.getInstance(
  //     this.type,
  //     createHtml,
  //     makeSlides,
  //     evaluate,
  //     result
  //   );
  // }
  // public getInstance(type: any, ...args: any[]) {
  //   type = type.charAt(0).toUpperCase() + type.slice(1);
  //   const newInstance = new (<any>window)[type]();
  //   newInstance.constructor(newInstance, ...args);
  //   return newInstance;
  // }
}
it('saveData', () => {
  const slide = MC();
  slide.txt = 'value';
  slide.res = 'key';
  slide.saveData();
  // const saved = SaveData.get();
  //verify data
});
//These should be moved to slideType files.
it('getAnswerCountSingle'),
  () => {
    const slide = MC();
    const actual = slide.getAnswerCount();
    expect(actual).toEqual(1);
  };
it('getAnswerCountMultiple'),
  () => {
    const slide = VOCAB();
    slide.ans = ['a', 'b', 'c'];
    const actual = slide.getAnswerCount();
    expect(actual).toEqual(3);
  };
