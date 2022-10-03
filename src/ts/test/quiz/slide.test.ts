import { JSDOM } from 'jsdom';
import { expect, it, vi } from 'vitest';
import { Slide } from '../../main/quiz/slide';
import { AnswerType } from '../../main/quiz/slide/strategies/result';
import { SlideInterfaceTest } from '../../test/quiz/slideInterface.test';
import { AbstractTest } from '../abstractTest';

// public result(): void {
//   const testable = this.getTestable();
//   const actual:ResultReturnType = testable.result();
//   testable.ans:string = "1";
//   testable.res:string = "1";
//   expect(actual.).toEqual(0);
// }

// interface merging to avoid re-declaring inherited members
// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
export interface SlideTest<T extends AnswerType> extends SlideInterfaceTest {}
export abstract class SlideTest<T extends AnswerType>
  extends AbstractTest<Slide<T>>
  implements SlideInterfaceTest
{
  type!: string;
  public evaluate(): void {
    const testable = this.getTestable();
    const spy = vi.spyOn(testable, 'evaluate');
    testable.evaluate();
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
  //   console.log(type);
  //   const newInstance = new (<any>window)[type]();
  //   newInstance.constructor(newInstance, ...args);
  //   return newInstance;
  // }
}
it('shutup', () => {
  expect(0).toEqual(0);
});
